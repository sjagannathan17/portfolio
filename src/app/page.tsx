import Link from "next/link";
import Image from "next/image";
import { impactStats, caseStudies } from "@/lib/data";

export default function Home() {
  return (
    <div className="mx-auto max-w-[720px] px-6">
      {/* Hero */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900">
          Srinidhi Jagannathan
        </h1>
        <p className="mt-3 text-xl text-neutral-500">
          AI Product Manager — Automating Knowledge Work at Scale
        </p>
        <p className="mt-5 text-[17px] text-neutral-600 leading-relaxed max-w-lg">
          I build AI systems that replace manual knowledge work with intelligent
          automation — from veterinary triage to competitive intelligence.
          MSBA at Santa Clara University.
        </p>
        <p className="mt-3 text-[15px] text-neutral-400">
          San Jose, CA &middot; Available Summer 2026
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/projects"
            className="text-[14px] font-medium text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 hover:decoration-blue-400 transition-colors"
          >
            View Work &rarr;
          </Link>
          <Link
            href="/contact"
            className="text-[14px] font-medium text-neutral-500 hover:text-neutral-900 underline underline-offset-4 decoration-neutral-200 hover:decoration-neutral-400 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-y border-neutral-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6">
          {impactStats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-semibold text-neutral-900">{stat.value}</div>
              <div className="text-[13px] text-neutral-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-16 sm:py-20">
        <h2 className="text-2xl font-semibold text-neutral-900">Selected Work</h2>
        <p className="mt-2 text-[15px] text-neutral-500">
          Products I&apos;ve built — from problem discovery to measurable outcomes.
        </p>

        <div className="mt-10 space-y-16">
          {caseStudies.map((cs) => (
            <article key={cs.id}>
              {/* Image */}
              {cs.image && (
                <Link href={`/projects/${cs.id}`} className="block">
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-neutral-50 border border-neutral-100">
                    <Image
                      src={cs.image}
                      alt={cs.title}
                      fill
                      className="object-cover hover:opacity-95 transition-opacity"
                    />
                  </div>
                </Link>
              )}

              <div className={cs.image ? "mt-5" : ""}>
                <p className="text-[13px] text-neutral-400">
                  {cs.company} &middot; {cs.timeline}
                </p>

                <Link href={`/projects/${cs.id}`}>
                  <h3 className="mt-1 text-xl font-semibold text-neutral-900 hover:text-blue-600 transition-colors">
                    {cs.title}
                  </h3>
                </Link>

                <p className="mt-1 text-[15px] text-neutral-500">
                  {cs.oneLiner}
                </p>

                {/* Metrics */}
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                  {cs.heroMetrics.slice(0, 4).map((m) => (
                    <span key={m.label} className="text-[14px]">
                      <span className="font-semibold text-neutral-900">{m.value}</span>
                      <span className="text-neutral-400 ml-1">{m.label}</span>
                    </span>
                  ))}
                </div>

                <Link
                  href={`/projects/${cs.id}`}
                  className="inline-block mt-4 text-[14px] text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 hover:decoration-blue-400 transition-colors"
                >
                  View Case Study &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
