"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { caseStudies } from "@/lib/data";

const filterTags = [
  { label: "All", value: "all" },
  { label: "Multi-Agent AI", value: "multi-agent" },
  { label: "RAG", value: "rag" },
  { label: "Forecasting", value: "forecasting" },
  { label: "ML", value: "ml" },
  { label: "NLP", value: "nlp" },
] as const;

const projectFilters: Record<string, string[]> = {
  "pettriage-ai": ["multi-agent", "rag", "nlp"],
  "flex-ai-platform": ["rag", "nlp"],
  "nazava-shopee": ["forecasting", "ml"],
  "post-release-optimizer": ["nlp"],
  "litlens": ["multi-agent", "rag", "nlp"],
  "lending-club-ml": ["ml"],
};

const accentColors: Record<string, { badge: string; metric: string }> = {
  "pettriage-ai": { badge: "bg-blue-500/20 text-blue-400", metric: "text-blue-400" },
  "flex-ai-platform": { badge: "bg-blue-500/20 text-blue-400", metric: "text-blue-400" },
  "nazava-shopee": { badge: "bg-violet-500/20 text-violet-400", metric: "text-violet-400" },
  "post-release-optimizer": { badge: "bg-amber-500/20 text-amber-400", metric: "text-amber-400" },
  "litlens": { badge: "bg-blue-500/20 text-blue-400", metric: "text-blue-400" },
  "lending-club-ml": { badge: "bg-emerald-500/20 text-emerald-400", metric: "text-emerald-400" },
};

const categoryLabels: Record<string, string> = {
  "pettriage-ai": "Multi-Agent AI",
  "flex-ai-platform": "RAG + LLM",
  "nazava-shopee": "Forecasting",
  "post-release-optimizer": "NLP",
  "litlens": "Multi-Agent AI",
  "lending-club-ml": "ML Pipeline",
};

const gridPositions: Record<string, string> = {
  "pettriage-ai": "md:col-span-2",
  "flex-ai-platform": "md:row-span-2",
  "nazava-shopee": "",
  "post-release-optimizer": "",
  "litlens": "",
  "lending-club-ml": "md:col-span-2",
};

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = caseStudies.filter(
    (cs) => activeFilter === "all" || projectFilters[cs.id]?.includes(activeFilter)
  );

  return (
    <div className="bg-[#0A0A0F] min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white inline-block">
            Work
            <span className="block h-[3px] w-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mt-2" />
          </h1>
          <p className="mt-4 text-[16px] text-neutral-400 max-w-lg">
            Case studies of products I&apos;ve shipped and problems I&apos;ve solved.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filterTags.map((tag) => (
            <button
              key={tag.value}
              onClick={() => setActiveFilter(tag.value)}
              className={`text-[13px] rounded-full px-4 py-1.5 transition-all duration-200 ${
                activeFilter === tag.value
                  ? "bg-white text-neutral-900 font-medium"
                  : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-neutral-300"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-neutral-500 text-[15px]">No projects match this filter.</p>
            <button
              onClick={() => setActiveFilter("all")}
              className="mt-3 text-[14px] text-blue-400 hover:text-blue-300 underline underline-offset-4"
            >
              Show all projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((cs) => {
              const isFeatured = cs.id === "pettriage-ai";
              const accent = accentColors[cs.id] || { badge: "bg-white/10 text-white", metric: "text-blue-400" };
              const topTech = cs.tech.slice(0, 5);
              const extraTech = cs.tech.length - 5;
              const topMetrics = cs.heroMetrics.slice(0, isFeatured ? 4 : 3);

              return (
                <Link
                  key={cs.id}
                  href={`/projects/${cs.id}`}
                  className={`group relative block rounded-xl overflow-hidden bg-[#13131A] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/5 ${gridPositions[cs.id] || ""}`}
                >
                  {/* Featured: side-by-side on wide cards */}
                  <div className={isFeatured ? "md:flex" : ""}>
                    {/* Image Area */}
                    <div className={`relative ${isFeatured ? "md:w-[55%]" : ""} ${cs.id === "flex-ai-platform" && !cs.image ? "h-48" : ""}`}>
                      {cs.image ? (
                        <div className={`relative ${isFeatured ? "aspect-[16/10]" : "aspect-[16/9]"} overflow-hidden`}>
                          <Image
                            src={cs.image}
                            alt={cs.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#13131A] via-transparent to-transparent" />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-blue-600/20 via-violet-600/10 to-[#13131A] relative overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(124,58,237,0.1),transparent_50%)]" />
                        </div>
                      )}

                      {/* Category Badge */}
                      <span className={`absolute top-3 left-3 text-[11px] font-medium rounded-full px-2.5 py-1 ${accent.badge} backdrop-blur-sm`}>
                        {categoryLabels[cs.id]}
                      </span>

                      {/* Status Badge */}
                      {cs.status === "In Progress" && (
                        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-400 bg-amber-500/15 rounded-full px-2.5 py-1 backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          In Progress
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className={`p-5 ${isFeatured ? "md:w-[45%] md:flex md:flex-col md:justify-center md:py-6" : ""}`}>
                      <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                        {cs.company}
                      </p>
                      <h2 className={`mt-1.5 font-bold text-white group-hover:text-blue-400 transition-colors ${isFeatured ? "text-[22px] leading-tight" : "text-[18px] leading-snug"}`}>
                        {cs.title}
                      </h2>
                      <p className="mt-1.5 text-[13px] text-neutral-400 leading-relaxed line-clamp-2">
                        {cs.oneLiner}
                      </p>
                      <p className="mt-2 text-[12px] text-neutral-500">
                        {cs.role} &middot; {cs.timeline}
                      </p>

                      {/* Metrics */}
                      <div className={`mt-4 pt-3 border-t border-white/[0.06] ${isFeatured ? "grid grid-cols-2 gap-3" : "flex flex-wrap gap-x-5 gap-y-1.5"}`}>
                        {topMetrics.map((m) => (
                          <div key={m.label} className={isFeatured ? "" : "flex items-baseline gap-1.5"}>
                            <span className={`text-[15px] font-semibold ${accent.metric}`}>{m.value}</span>
                            <span className="text-[11px] text-neutral-500 ml-1">{m.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {topTech.map((t) => (
                          <span key={t} className="text-[10px] text-neutral-500 bg-white/[0.04] border border-white/[0.06] rounded-full px-2 py-0.5">
                            {t}
                          </span>
                        ))}
                        {extraTech > 0 && (
                          <span className="text-[10px] text-neutral-600 bg-white/[0.02] border border-white/[0.04] rounded-full px-2 py-0.5">
                            +{extraTech} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-[#13131A] via-[#13131A]/95 to-transparent px-5 py-3">
                    <span className="text-[13px] text-blue-400 font-medium flex items-center gap-1.5">
                      View Case Study
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
