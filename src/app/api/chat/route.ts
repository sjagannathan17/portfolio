import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/assistant";

export const runtime = "nodejs";

type ChatRole = "user" | "assistant";
interface ChatMessage {
  role: ChatRole;
  content: string;
}

const MAX_MESSAGE_LEN = 500;
const MAX_HISTORY = 10;

// Best-effort, in-memory per-IP rate limit. Resets on cold start; not a hard
// guarantee on serverless, just a cheap guard against casual abuse.
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function sanitize(raw: unknown): ChatMessage[] | null {
  if (!Array.isArray(raw)) return null;
  const out: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_HISTORY)) {
    if (!m || typeof m !== "object") continue;
    const role = (m as ChatMessage).role;
    const content = (m as ChatMessage).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const trimmed = content.trim();
    if (!trimmed) continue;
    out.push({ role, content: trimmed.slice(0, MAX_MESSAGE_LEN) });
  }
  return out.length ? out : null;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured yet." },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please slow down and try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = sanitize((body as { messages?: unknown })?.messages);
  if (!messages) {
    return NextResponse.json({ error: "No valid message." }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 250,
        temperature: 0.2,
        system: buildSystemPrompt(),
        messages,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "The assistant is unavailable right now." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply: string | undefined = data?.content?.[0]?.text;
    if (!reply) {
      return NextResponse.json(
        { error: "The assistant is unavailable right now." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch {
    return NextResponse.json(
      { error: "The assistant is unavailable right now." },
      { status: 502 }
    );
  }
}
