"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SUGGESTED_QUESTIONS } from "@/lib/assistant";

type Role = "user" | "assistant";
interface Message {
  role: Role;
  content: string;
}

const GREETING =
  "Hi! I'm Srinidhi's assistant 👋 Ask me about her background, projects, skills, or availability.";

export function ChatWidget({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => inputRef.current?.focus(), 200);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    setError(null);

    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data?.error ??
            "Something went wrong. Please email srinidhi.jagan11@gmail.com."
        );
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.reply as string },
        ]);
      }
    } catch {
      setError("Something went wrong. Please email srinidhi.jagan11@gmail.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Srinidhi's assistant"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#1f2a44]/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl ring-1 ring-black/5 sm:h-[600px] sm:rounded-3xl"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {/* Header */}
            <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 px-5 py-4">
              <div className="pointer-events-none absolute -right-6 -top-10 h-28 w-28 rounded-full bg-white/15 blur-lg" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-xl ring-1 ring-white/40 backdrop-blur-sm">
                  👋
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold text-white">
                    Chat with Srinidhi
                  </p>
                  <p className="flex items-center gap-1.5 text-[12px] text-white/80">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    AI assistant · usually instant
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close chat"
                  className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-white to-blue-50/50 px-4 py-4"
            >
              <div className="flex items-end gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-[13px]">
                  👋
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[14px] leading-relaxed text-neutral-700 shadow-sm ring-1 ring-black/5">
                  {GREETING}
                </div>
              </div>

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pl-9 pt-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q.question}
                      type="button"
                      onClick={() => send(q.question)}
                      className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[13px] text-blue-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 hover:shadow"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "flex justify-end"
                      : "flex items-end gap-2"
                  }
                >
                  {m.role === "assistant" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-[13px]">
                      👋
                    </div>
                  )}
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-br from-blue-600 to-indigo-600 px-3.5 py-2.5 text-[14px] leading-relaxed text-white shadow-sm"
                        : "max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[14px] leading-relaxed text-neutral-700 shadow-sm ring-1 ring-black/5"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-end gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-[13px]">
                    👋
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-neutral-400"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <p className="pl-9 text-[13px] text-red-600">{error}</p>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex shrink-0 items-center gap-2 border-t border-neutral-100 bg-white px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Ask a question…"
                className="flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 transition-shadow focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md transition-all hover:shadow-lg hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
