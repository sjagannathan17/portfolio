"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  siteConfig,
  museumProjects,
  skillGroups,
  officeWork,
  officeEducation,
  officeTeaching,
  officeCoursework,
  type OfficeEntry,
} from "@/lib/data";
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
  { id: "bridge", label: "Welcome", desc: "About me", src: "/color-bridge.png", width: 1536, height: 572, h: 0.52 },
  { id: "palace", label: "Education", desc: "Schools & coursework", src: "/color-palace.png", width: 1471, height: 751, h: 0.72 },
  { id: "ladies", label: "Experience", desc: "Where I’ve worked", src: "/color-ladies.png", width: 1477, height: 976, h: 0.95 },
  { id: "twinpeaks", label: "Projects", desc: "Work & case studies", src: "/color-twinpeaks.png", width: 1413, height: 951, h: 0.95 },
  { id: "skills", label: "Skills", desc: "Stack & tools", src: "/color-skills.png", width: 1196, height: 992, h: 0.95 },
  { id: "skystar", label: "Blog", desc: "Writing & notes", href: "https://medium.com/@srinidhi.jagan11", external: true, src: "/color-skystar.png", width: 1013, height: 1001, h: 1.0 },
  { id: "coit", label: "Contact", desc: "Reach me", src: "/color-coit.png", width: 895, height: 957, h: 0.9 },
];

type PointLink = { prefix?: string; label: string; href: string; external?: boolean };
type Point = string | PointLink;
type Detail = { title: string; blurb: string; points: Point[]; cta?: string };

const DETAILS: Record<string, Detail> = {
  bridge: {
    title: "Hi, I’m Srinidhi 👋",
    blurb: "",
    points: [],
  },
  palace: {
    title: "Education & Coursework",
    blurb: "Where I studied and what I learned.",
    points: [],
  },
  ladies: {
    title: "Professional Experience",
    blurb: "Where I’ve worked and taught.",
    points: [],
  },
  twinpeaks: {
    title: "Projects",
    blurb: "A gallery of everything I’ve designed, built, and shipped.",
    points: [],
  },
  skills: {
    title: "Skills & Stack",
    blurb: "What I work with.",
    points: [
      "Product: strategy, user research, prioritization",
      "AI/ML: RAG, multi-agent systems, LLM engineering",
      "Tech: Python, TypeScript/React, SQL, FastAPI",
    ],
  },
  skystar: {
    title: "Blog",
    blurb: "Writing & notes on AI, product, and building things.",
    points: [],
    cta: "Read on Medium",
  },
  coit: {
    title: "Get in touch",
    blurb: "Have a role, project, or idea in mind? Let’s talk.",
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
      "📍 Sunnyvale, California",
    ],
  },
};

const ABOUT_PARAGRAPHS: string[] = [
  "Welcome to my small slice of the city.",
  "I’m a Master’s student in Business Analytics at Santa Clara University, AI builder and product manager, and occasional debugger of problems that I accidentally created myself.",
  "Instead of making a traditional portfolio, I built a city. It seemed like a perfectly reasonable idea at the time.",
  "Every landmark represents a different part of my journey. Twin Peaks houses the projects, the Painted Ladies keep my experience neatly organized, and the Palace of Fine Arts is the very serious home of some very hard-earned degrees.",
  "Feel free to wander around. Hover over landmarks to learn what they are, click to dig deeper, and don’t worry about getting lost. The best parts of San Francisco are usually found by accident.",
  "Thanks for visiting. I hope you enjoy this city as much as I enjoyed building it. 🌁",
];

const IDLE_BUBBLE = "Hop on — follow me around the city!";

// Prefix /public assets with the deploy base path (e.g. "/portfolio" on GitHub Pages).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (p: string) => `${BASE}${p}`;

const OFFICE_ENTRIES: Record<string, OfficeEntry[]> = {
  Work: officeWork,
  Education: officeEducation,
  Teaching: officeTeaching,
};
// Which tabs each landmark's modal shows
const TAB_SETS: Record<string, readonly string[]> = {
  ladies: ["Work", "Teaching"],
  palace: ["Education", "Coursework"],
};

export function CityscapeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const targetX = useMotionValue(0);
  const riderX = useSpring(targetX, { stiffness: 90, damping: 18, mass: 0.9 });

  const [bubble, setBubble] = useState(IDLE_BUBBLE);
  const [facing, setFacing] = useState(1);
  const [riding, setRiding] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [active, setActive] = useState<Landmark | null>(null);
  const [officeTab, setOfficeTab] = useState<string>("Work");
  const [menuOpen, setMenuOpen] = useState(false);

  const facingRef = useRef(1);
  const lastXRef = useRef(0);
  const idleTimer = useRef<number | null>(null);
  const initialized = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const c = containerRef.current;
    if (!c || initialized.current) return;
    const mid = c.getBoundingClientRect().width / 2;
    targetX.set(mid);
    lastXRef.current = mid;
    initialized.current = true;
  }, [targetX]);

  const go = useCallback((lm: Landmark) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    if (lm.id === "ladies") setOfficeTab("Work");
    else if (lm.id === "palace") setOfficeTab("Education");
    setActive(lm);
  }, []);

  // Move focus into the modal on open; restore it to the trigger on close.
  useEffect(() => {
    if (!active) return;
    const node = dialogRef.current;
    const trigger = triggerRef.current;
    node?.focus();
    return () => {
      trigger?.focus?.();
    };
  }, [active]);

  const trapFocus = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const activeEl = document.activeElement;
    if (e.shiftKey && (activeEl === first || activeEl === dialogRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && activeEl === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (!active && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, menuOpen]);

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
    if (sessionStorage.getItem("introSeen")) return;
    sessionStorage.setItem("introSeen", "1");
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
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-[#cdecff] via-[#e9f5ff] to-[#fff3df]"
      onMouseMove={(e) => handleMove(e.clientX)}
    >
      <div className="pointer-events-none absolute right-[8%] top-[12%] h-28 w-28 rounded-full bg-[#fff7e6] blur-md sm:h-40 sm:w-40" aria-hidden />
      <Sky />

      <div className="relative z-10 px-6 pt-20 text-center sm:pt-16">
        <h1 className="sr-only">
          Srinidhi Jagannathan — AI Builder &amp; Product, MS Business Analytics at Santa Clara University
        </h1>
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#3a4a6b]">
          <span className="hidden sm:inline">Glide your mouse to roam · Click a landmark to visit</span>
          <span className="sm:hidden">Tap a landmark to explore · or use the menu</span>
        </p>
      </div>

      {/* Crawlable + screen-reader content (the interactive scene above is visual only) */}
      <div className="sr-only">
        <section aria-label="About">
          <h2>About</h2>
          {ABOUT_PARAGRAPHS.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </section>

        <section aria-label="Projects">
          <h2>Projects</h2>
          <ul>
            {museumProjects.map((p) => (
              <li key={p.github}>
                <h3>{p.title}</h3>
                <p>
                  {p.context}
                  {p.date ? ` · ${p.date}` : ""}
                </p>
                <p>{p.description}</p>
                <a href={p.github}>{p.title} on GitHub</a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Experience">
          <h2>Experience</h2>
          <ul>
            {officeWork.map((e) => (
              <li key={`${e.title}-${e.org}`}>
                <h3>
                  {e.title} — {e.org}
                </h3>
                <p>
                  {e.period}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
                {e.points?.length ? (
                  <ul>
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Teaching">
          <h2>Teaching</h2>
          <ul>
            {officeTeaching.map((e) => (
              <li key={`${e.title}-${e.org}`}>
                <h3>
                  {e.title} — {e.org}
                </h3>
                <p>
                  {e.period}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
                {e.points?.length ? (
                  <ul>
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Education">
          <h2>Education</h2>
          <ul>
            {officeEducation.map((e) => (
              <li key={`${e.title}-${e.org}`}>
                <h3>
                  {e.title} — {e.org}
                </h3>
                <p>
                  {e.period}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
              </li>
            ))}
          </ul>
          <h3>Coursework</h3>
          <p>{officeCoursework.join(", ")}</p>
        </section>

        <section aria-label="Skills">
          <h2>Skills</h2>
          {skillGroups.map((g) => (
            <div key={g.title}>
              <h3>{g.title}</h3>
              <p>{g.items.join(", ")}</p>
            </div>
          ))}
        </section>

        <section aria-label="Contact">
          <h2>Contact</h2>
          <p>
            Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p>
            LinkedIn: <a href={siteConfig.linkedin}>{siteConfig.linkedin}</a>
          </p>
          <p>
            GitHub: <a href={siteConfig.github}>{siteConfig.github}</a>
          </p>
          <p>Based in Sunnyvale, California</p>
        </section>
      </div>

      <div className="relative z-10 mt-auto w-full">
        {/* Monuments + rider share this coordinate space */}
        <div ref={containerRef} className="cityscene relative w-full">
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
                  src={asset(lm.src)}
                  alt={lm.href ? lm.label : ""}
                  width={lm.width}
                  height={lm.height}
                  sizes="(max-width: 768px) 24vw, 260px"
                  style={{ height: `calc(var(--sh) * ${lm.h})`, width: "auto" }}
                  className="object-contain drop-shadow-[0_10px_18px_rgba(31,42,68,0.18)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                />
              </button>
            ))}
          </div>

          {/* The cycling guide follows the cursor (desktop only — needs a mouse) */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-30 hidden w-full sm:block">
            <motion.div style={{ x: riderX }} className="absolute bottom-0 left-0">
              <div className="relative -translate-x-1/2">
                <div className={riding ? "rider-bob rider-bob--riding" : "rider-bob"}>
                  <div className="absolute bottom-full left-1/2 mb-1 w-[150px] -translate-x-1/2 rounded-2xl bg-white px-3 py-2 text-center text-[12px] font-medium leading-snug text-[#1f2a44] shadow-[0_6px_16px_rgba(31,42,68,0.2)] sm:w-[180px] sm:text-[13px]">
                    {bubble}
                    <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[8px] border-x-transparent border-t-white" />
                  </div>
                  <Image
                    src={asset("/color-rider.png")}
                    alt="Your San Francisco cycling guide"
                    width={1111}
                    height={1012}
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

    {/* Quick-nav menu for visitors who prefer straightforward navigation */}
    {menuOpen && (
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 z-40 cursor-default"
      />
    )}
    <div className="fixed right-4 top-4 z-50">
      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        aria-expanded={menuOpen}
        aria-haspopup="true"
        aria-label="Open navigation menu"
        className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-white/60 bg-white/85 shadow-[0_6px_18px_rgba(31,42,68,0.16)] backdrop-blur-md transition-colors hover:bg-white"
      >
        <span className="block h-[2px] w-5 rounded-full bg-[#1f2a44]" />
        <span className="block h-[2px] w-5 rounded-full bg-[#1f2a44]" />
        <span className="block h-[2px] w-5 rounded-full bg-[#1f2a44]" />
      </button>
      {menuOpen && (
        <nav
          aria-label="Quick navigation"
          className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-white/60 bg-white/95 py-1 shadow-[0_12px_30px_rgba(31,42,68,0.18)] backdrop-blur-md"
        >
          {LANDMARKS.map((lm) => (
            <button
              key={lm.id}
              type="button"
              onClick={() => {
                setMenuOpen(false);
                go(lm);
              }}
              className="block w-full px-4 py-2 text-left text-[13px] font-medium text-[#1f2a44] transition-colors hover:bg-[#1f2a44] hover:text-white"
            >
              {lm.label}
            </button>
          ))}
        </nav>
      )}
    </div>

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
            ref={dialogRef}
            tabIndex={-1}
            onKeyDown={trapFocus}
            className={`relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl outline-none ring-1 ring-black/5 sm:p-8 ${
              active.id === "twinpeaks" ? "max-w-5xl" : "max-w-xl"
            }`}
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

            <h2 className="text-xl font-bold text-neutral-900">
              {DETAILS[active.id]?.title}
            </h2>
            {DETAILS[active.id]?.blurb ? (
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
                {DETAILS[active.id]?.blurb}
              </p>
            ) : null}

            {active.id === "bridge" ? (
              <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-neutral-600">
                {ABOUT_PARAGRAPHS.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            ) : active.id === "skills" ? (
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
            ) : active.id === "twinpeaks" ? (
              <div className="mt-6 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {museumProjects.map((p) => (
                  <article
                    key={p.github}
                    className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(31,42,68,0.06)] ring-1 ring-black/5 transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_34px_rgba(31,42,68,0.12)]"
                  >
                    <h3 className="text-[17px] font-semibold leading-snug text-neutral-900">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                      {p.context}
                      {p.date ? ` · ${p.date}` : ""}
                    </p>
                    <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-neutral-600">
                      {p.description}
                    </p>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 self-start text-[13px] font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                    >
                      View Project
                      <span aria-hidden>↗</span>
                    </a>
                  </article>
                ))}
              </div>
            ) : active.id === "ladies" || active.id === "palace" ? (
              <div className="mt-5">
                <div role="tablist" className="flex flex-wrap gap-2 border-b border-neutral-100 pb-3">
                  {(TAB_SETS[active.id] ?? []).map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="tab"
                      aria-selected={officeTab === t}
                      onClick={() => setOfficeTab(t)}
                      className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                        officeTab === t
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="mt-5">
                  {officeTab === "Coursework" ? (
                    <div className="flex flex-wrap gap-1.5">
                      {officeCoursework.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-neutral-100 px-2.5 py-1 text-[12px] text-neutral-900"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <ol className="space-y-5">
                      {(OFFICE_ENTRIES[officeTab] ?? []).map((e) => (
                        <li key={`${e.title}-${e.org}`} className="border-l-2 border-neutral-200 pl-4">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                            <h3 className="text-[15px] font-semibold text-neutral-900">{e.title}</h3>
                            <span className="shrink-0 text-[12px] text-neutral-400">{e.period}</span>
                          </div>
                          <p className="mt-0.5 text-[13px] text-neutral-500">
                            {e.org}
                            {e.location ? ` · ${e.location}` : ""}
                          </p>
                          {e.points?.length ? (
                            <ul className="mt-2 space-y-1.5">
                              {e.points.map((pt) => (
                                <li key={pt} className="flex gap-2 text-[13px] leading-relaxed text-neutral-600">
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            ) : DETAILS[active.id]?.points.length ? (
              <ul className="mt-4 space-y-2">
                {DETAILS[active.id].points.map((p) => {
                  const key = typeof p === "string" ? p : p.label;
                  return (
                    <li key={key} className="flex gap-2 text-[13px] leading-relaxed text-neutral-600">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
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

            {active.external && active.href && (
              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActive(null)}
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-neutral-700"
              >
                {DETAILS[active.id]?.cta}
                <span aria-hidden>↗</span>
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
