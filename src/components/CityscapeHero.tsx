"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { Sky } from "@/components/Sky";
import { Waves } from "@/components/Waves";

type Landmark = {
  id: string;
  label: string;
  desc?: string;
  href?: string;
  external?: boolean;
  src: string;
  width: number;
  height: number;
  h: number;
};

const LANDMARKS: Landmark[] = [
  { id: "bridge", label: "Welcome", desc: "About me", href: "/about", src: "/color-bridge.png", width: 1536, height: 572, h: 0.52 },
  { id: "palace", label: "Education", desc: "Schools & coursework", href: "/about#education", src: "/color-palace.png", width: 1471, height: 751, h: 0.72 },
  { id: "ladies", label: "Experience", desc: "Where I’ve worked", href: "/about#experience", src: "/color-ladies.png", width: 1477, height: 976, h: 0.95 },
  { id: "twinpeaks", label: "Projects", desc: "Work & case studies", href: "/projects", src: "/color-twinpeaks.png", width: 1413, height: 951, h: 0.95 },
  { id: "skills", label: "Skills", desc: "Stack & tools", href: "/about#skills", src: "/color-skills.png", width: 1196, height: 992, h: 0.95 },
  { id: "skystar", label: "Blog", desc: "Writing & notes", href: "https://medium.com/@srinidhi.jagan11", external: true, src: "/color-skystar.png", width: 1013, height: 1001, h: 1.0 },
  { id: "coit", label: "Contact", desc: "Reach me & résumé", href: "/contact", src: "/color-coit.png", width: 895, height: 957, h: 0.9 },
];

type PointLink = { prefix?: string; label: string; href: string; external?: boolean };
type Point = string | PointLink;
type Detail = { title: string; blurb: string; points: Point[]; cta: string };

const DETAILS: Record<string, Detail> = {
  bridge: {
    title: "About Srinidhi",
    blurb: "AI Product Manager building systems that automate knowledge work at scale.",
    points: [
      "MS in Business Analytics — Santa Clara University (3.9 GPA)",
      "Builds RAG pipelines and multi-agent AI systems",
      "Based in Sunnyvale, CA · available Summer 2026",
    ],
    cta: "View full about",
  },
  palace: {
    title: "Education",
    blurb: "Where I studied.",
    points: [
      "MS Business Analytics — Santa Clara University (2024–2026), GPA 3.9",
      "B.E. Electrical & Electronics — SSN College of Engineering",
      "Coursework: GenAI, Deep Learning, NLP, Product Management",
    ],
    cta: "See education",
  },
  ladies: {
    title: "Experience",
    blurb: "Where I've worked.",
    points: [
      "Strategic Analytics Consultant — Flex (AI competitive intelligence)",
      "Graduate Teaching Assistant — Santa Clara University",
      "Product & Data Analytics Engineer — iGreenData (ANZ Bank, ~2.5 yrs)",
    ],
    cta: "See experience",
  },
  twinpeaks: {
    title: "Projects",
    blurb: "Selected work & case studies.",
    points: [
      "PetTriage AI — dual-agent veterinary triage system",
      "Flex Competitive Intelligence platform",
      "LitLens — multi-agent literature-review tool",
    ],
    cta: "Browse projects",
  },
  skills: {
    title: "Skills & Stack",
    blurb: "What I work with.",
    points: [
      "Product: strategy, user research, prioritization",
      "AI/ML: RAG, multi-agent systems, LLM engineering",
      "Tech: Python, TypeScript/React, SQL, FastAPI",
    ],
    cta: "See full stack",
  },
  skystar: {
    title: "Blog",
    blurb: "Writing & notes on AI, product, and building things.",
    points: [],
    cta: "Read on Medium",
  },
  coit: {
    title: "Get in touch",
    blurb: "Open to Summer 2026 AI Product Management internships.",
    points: [
      {
        prefix: "Email: ",
        label: "srinidhi.jagan11@gmail.com",
        href: "mailto:srinidhi.jagan11@gmail.com",
      },
      {
        prefix: "LinkedIn: ",
        label: "/in/srinidhi-jagannathan-876998385",
        href: "https://www.linkedin.com/in/srinidhi-jagannathan-876998385/",
        external: true,
      },
      "Sunnyvale, California",
    ],
    cta: "Contact me",
  },
};

const SH = "clamp(66px, 12vw, 158px)";
const IDLE_BUBBLE = "Hop on — follow me around the city!";

export function CityscapeHero() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const targetX = useMotionValue(0);
  const riderX = useSpring(targetX, { stiffness: 90, damping: 18, mass: 0.9 });

  const [bubble, setBubble] = useState(IDLE_BUBBLE);
  const [facing, setFacing] = useState(1);
  const [riding, setRiding] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [active, setActive] = useState<Landmark | null>(null);

  const facingRef = useRef(1);
  const lastXRef = useRef(0);
  const idleTimer = useRef<number | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const c = containerRef.current;
    if (!c || initialized.current) return;
    const mid = c.getBoundingClientRect().width / 2;
    targetX.set(mid);
    lastXRef.current = mid;
    initialized.current = true;
  }, [targetX]);

  const go = useCallback((lm: Landmark) => setActive(lm), []);

  const followCta = useCallback(() => {
    if (!active?.href) return;
    if (active.external) window.open(active.href, "_blank", "noopener,noreferrer");
    else router.push(active.href);
    setActive(null);
  }, [active, router]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const handleMove = useCallback(
    (clientX: number) => {
      const c = containerRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 24), rect.width - 24);

      const dir = x > lastXRef.current + 1 ? 1 : x < lastXRef.current - 1 ? -1 : facingRef.current;
      if (dir !== facingRef.current) {
        facingRef.current = dir;
        setFacing(dir);
      }
      lastXRef.current = x;
      targetX.set(x);

      setRiding(true);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setRiding(false), 180);
    },
    [targetX]
  );

  useEffect(() => () => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShowIntro(true);
    const t = window.setTimeout(() => setShowIntro(false), 1800);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[60] flex flex-col items-center justify-center bg-gradient-to-b from-[#cdecff] via-[#e9f5ff] to-[#fff3df] px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -110, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.4 }}
          >
            <motion.h2
              className="text-4xl font-bold tracking-tight text-[#1f2a44] sm:text-6xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              Hi, I&apos;m Srinidhi 👋
            </motion.h2>
            <motion.p
              className="mt-3 text-lg text-[#3a4a6b] sm:text-2xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Let&apos;s explore the Bay together
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    <section
      className="relative flex min-h-[calc(100vh-3.5rem)] w-full flex-col overflow-hidden bg-gradient-to-b from-[#cdecff] via-[#e9f5ff] to-[#fff3df]"
      onMouseMove={(e) => handleMove(e.clientX)}
    >
      <div className="pointer-events-none absolute right-[8%] top-[12%] h-28 w-28 rounded-full bg-[#fff7e6] blur-md sm:h-40 sm:w-40" aria-hidden />
      <Sky />

      <div className="relative z-10 px-6 pt-12 text-center sm:pt-16">
        <h1 className="sr-only">Srinidhi Jagannathan — AI Product Manager</h1>
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#5a6b8c]">
          Glide your mouse to roam · Click a landmark to visit
        </p>
      </div>

      <div className="relative z-10 mt-auto w-full">
        {/* Monuments + rider share this coordinate space */}
        <div ref={containerRef} className="relative w-full" style={{ "--sh": SH } as CSSProperties}>
          <div className="flex items-end justify-center">
            {LANDMARKS.map((lm) => (
              <button
                key={lm.id}
                type="button"
                aria-label={lm.desc ? `${lm.label} — ${lm.desc}` : lm.label}
                onClick={() => go(lm)}
                onMouseEnter={() =>
                  setBubble(lm.href ? `Click to visit ${lm.label}!` : `${lm.label}!`)
                }
                onMouseLeave={() => setBubble(IDLE_BUBBLE)}
                className="group relative flex items-end justify-center px-0.5 outline-none sm:px-1"
              >
                {lm.desc && (
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#1f2a44]/85 px-3 py-1 text-[12px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {lm.label}
                  </span>
                )}
                <Image
                  src={lm.src}
                  alt={lm.href ? lm.label : ""}
                  width={lm.width}
                  height={lm.height}
                  priority
                  sizes="(max-width: 768px) 24vw, 260px"
                  style={{ height: `calc(var(--sh) * ${lm.h})`, width: "auto" }}
                  className="object-contain drop-shadow-[0_10px_18px_rgba(31,42,68,0.18)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                />
              </button>
            ))}
          </div>

          {/* The cycling guide follows the cursor */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-30 w-full">
            <motion.div style={{ x: riderX }} className="absolute bottom-0 left-0">
              <div className="relative -translate-x-1/2">
                <div className={riding ? "rider-bob rider-bob--riding" : "rider-bob"}>
                  <div className="absolute bottom-full left-1/2 mb-1 w-[150px] -translate-x-1/2 rounded-2xl bg-white px-3 py-2 text-center text-[12px] font-medium leading-snug text-[#1f2a44] shadow-[0_6px_16px_rgba(31,42,68,0.2)] sm:w-[180px] sm:text-[13px]">
                    {bubble}
                    <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[8px] border-x-transparent border-t-white" />
                  </div>
                  <Image
                    src="/color-rider.png"
                    alt="Your San Francisco cycling guide"
                    width={1111}
                    height={1012}
                    priority
                    style={{ height: "calc(var(--sh) * 0.6)", width: "auto", transform: `scaleX(${facing})` }}
                    className="object-contain drop-shadow-[0_8px_12px_rgba(31,42,68,0.22)]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Beach + realistic moving water (full width, stays put) */}
        <div className="relative z-0 -mt-2 h-[clamp(56px,10vw,96px)] w-full">
          <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#f6e7c6] to-[#ecd6a4]" />
          <Waves className="absolute inset-x-0 bottom-0 h-[72%] w-full" />
        </div>
      </div>
    </section>

    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[65] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={DETAILS[active.id]?.title ?? active.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#1f2a44]/40 backdrop-blur-sm"
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
            >
              ✕
            </button>

            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
              {active.label}
            </p>
            <h2 className="mt-1 text-xl font-bold text-neutral-900">
              {DETAILS[active.id]?.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-900">
              {DETAILS[active.id]?.blurb}
            </p>

            {active.id === "skills" ? (
              <div className="mt-4 space-y-4">
                {skillGroups.map((g) => (
                  <div key={g.title}>
                    <p className="text-[13px] font-semibold text-neutral-900">
                      {g.title}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {g.items.map((it) => (
                        <span
                          key={it}
                          className="rounded-full bg-neutral-100 px-2.5 py-1 text-[12px] text-neutral-900"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : DETAILS[active.id]?.points.length ? (
              <ul className="mt-4 space-y-2">
                {DETAILS[active.id].points.map((p) => {
                  const key = typeof p === "string" ? p : p.label;
                  return (
                    <li key={key} className="flex gap-2 text-[14px] text-neutral-900">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                      {typeof p === "string" ? (
                        <span>{p}</span>
                      ) : (
                        <span>
                          {p.prefix}
                          <a
                            href={p.href}
                            target={p.external ? "_blank" : undefined}
                            rel={p.external ? "noopener noreferrer" : undefined}
                            className="font-medium text-neutral-900 underline underline-offset-2 hover:text-neutral-600"
                          >
                            {p.label}
                          </a>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {active.id !== "skills" &&
              (active.external && active.href ? (
                <a
                  href={active.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActive(null)}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-neutral-900 bg-white px-5 py-2.5 text-[14px] font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                >
                  {DETAILS[active.id]?.cta}
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={followCta}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-neutral-900 bg-white px-5 py-2.5 text-[14px] font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                >
                  {DETAILS[active.id]?.cta}
                  <span aria-hidden>→</span>
                </button>
              ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
