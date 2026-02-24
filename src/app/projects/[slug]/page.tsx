import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = caseStudies.find((c) => c.id === params.slug);
  if (!cs) return { title: "Not Found" };
  return { title: `${cs.title} — Case Study`, description: cs.oneLiner };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.id === params.slug);
  if (!cs) notFound();

  const idx = caseStudies.findIndex((c) => c.id === params.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article className="mx-auto max-w-[720px] px-6 py-12 sm:py-16">
      <Link href="/projects" className="text-[14px] text-neutral-400 hover:text-neutral-900 transition-colors">
        &larr; All Work
      </Link>

      {/* Header */}
      <header className="mt-8 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">{cs.title}</h1>
        <p className="mt-2 text-lg text-neutral-500">{cs.oneLiner}</p>
        <p className="mt-3 text-[14px] text-neutral-400">
          {cs.role} &middot; {cs.timeline}
        </p>
        {cs.github && (
          <a
            href={cs.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-[14px] text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 transition-colors"
          >
            GitHub &rarr;
          </a>
        )}
      </header>

      {/* Hero image */}
      {cs.image && (
        <div className="mb-12 relative aspect-[16/9] rounded-lg overflow-hidden bg-neutral-50 border border-neutral-100">
          <Image src={cs.image} alt={cs.title} fill className="object-cover" priority />
        </div>
      )}

      {/* Metrics */}
      <div className="mb-12 grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-neutral-100">
        {cs.heroMetrics.map((m) => (
          <div key={m.label}>
            <div className="text-xl font-semibold text-neutral-900">{m.value}</div>
            <div className="text-[13px] text-neutral-400 mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* The Challenge */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">The Challenge</h2>
        <p className="text-neutral-600 leading-relaxed">{cs.challenge}</p>
      </section>

      {/* My Role & Approach */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">My Role &amp; Approach</h2>
        <p className="text-neutral-600 leading-relaxed">{cs.approach}</p>
      </section>

      {/* PM Thinking */}
      {cs.pmThinking && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Product Thinking</h2>
          <div className="space-y-5">
            <div>
              <p className="text-[13px] font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Problem Framing</p>
              <p className="text-neutral-600 leading-relaxed">{cs.pmThinking.problemFraming}</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Key Tradeoffs</p>
              <p className="text-neutral-600 leading-relaxed">{cs.pmThinking.keyTradeoffs}</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">What We Didn&apos;t Build</p>
              <p className="text-neutral-600 leading-relaxed">{cs.pmThinking.whatWeDidntBuild}</p>
            </div>
            {cs.pmThinking.crossFunctional && (
              <div>
                <p className="text-[13px] font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Cross-Functional Leadership</p>
                <p className="text-neutral-600 leading-relaxed">{cs.pmThinking.crossFunctional}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* The Solution */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Solution &amp; Execution</h2>
        <p className="text-neutral-600 leading-relaxed">{cs.solution}</p>
        <p className="mt-4 text-[13px] text-neutral-400">
          <span className="font-medium text-neutral-500">Tech:</span> {cs.tech.join(", ")}
        </p>
      </section>

      {/* Impact */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Impact</h2>
        <ul className="space-y-2">
          {cs.impact.map((item, i) => (
            <li key={i} className="text-neutral-600 pl-5 relative before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Challenges Overcome */}
      {cs.challengesOvercome.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Challenges &amp; Pivots</h2>
          <div className="space-y-6">
            {cs.challengesOvercome.map((c, i) => (
              <div key={i}>
                <p className="text-neutral-600">
                  <span className="font-medium text-neutral-900">Challenge:</span> {c.obstacle}
                </p>
                <p className="mt-2 text-neutral-600">
                  <span className="font-medium text-neutral-900">Resolution:</span> {c.resolution}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonial */}
      {cs.testimonial && (
        <section className="mb-12 border-l-2 border-neutral-200 pl-6">
          <p className="text-neutral-600 italic leading-relaxed">
            &ldquo;{cs.testimonial.quote}&rdquo;
          </p>
          <p className="mt-3 text-[14px] text-neutral-400">
            — {cs.testimonial.author}, {cs.testimonial.role}
          </p>
        </section>
      )}

      {/* Gallery */}
      {cs.galleryImages && cs.galleryImages.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Screenshots</h2>
          <div className="space-y-6">
            {cs.galleryImages.map((img) => (
              <figure key={img.src}>
                <div className="rounded-lg overflow-hidden border border-neutral-100">
                  <Image src={img.src} alt={img.caption} width={720} height={405} className="w-full h-auto" />
                </div>
                <figcaption className="mt-2 text-[13px] text-neutral-400">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Code */}
      {cs.codeSnippet && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Technical Highlight</h2>
          <div className="rounded-lg overflow-hidden border border-neutral-200">
            <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-200 text-[13px] text-neutral-500 font-medium">
              {cs.codeSnippet.title}
            </div>
            <pre className="p-4 overflow-x-auto bg-neutral-950 text-neutral-300 text-[13px] leading-relaxed">
              <code>{cs.codeSnippet.code}</code>
            </pre>
          </div>
        </section>
      )}

      {/* Learnings */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">What I Learned</h2>
        <ul className="space-y-2">
          {cs.learnings.map((l, i) => (
            <li key={i} className="text-neutral-600 pl-5 relative before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-neutral-300">
              {l}
            </li>
          ))}
        </ul>
      </section>

      {/* What I'd Do Differently */}
      {cs.whatIdDoDifferently && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">What I&apos;d Do Differently</h2>
          <p className="text-neutral-600 leading-relaxed">{cs.whatIdDoDifferently}</p>
        </section>
      )}

      {/* Next project */}
      <div className="mt-16 pt-8 border-t border-neutral-100">
        <p className="text-[13px] text-neutral-400 mb-1">Next</p>
        <Link
          href={`/projects/${next.id}`}
          className="text-lg font-semibold text-neutral-900 hover:text-blue-600 transition-colors"
        >
          {next.title} &rarr;
        </Link>
      </div>
    </article>
  );
}
