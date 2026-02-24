import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies of AI products and analytics projects by Srinidhi Jagannathan.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">Work</h1>
      <p className="mt-3 text-[17px] text-neutral-500 max-w-lg">
        Case studies of products I&apos;ve shipped and problems I&apos;ve solved.
      </p>

      <div className="mt-12 space-y-20">
        {caseStudies.map((cs) => (
          <article key={cs.id}>
            {/* Image */}
            {cs.image && (
              <Link href={`/projects/${cs.id}`} className="block">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-neutral-50 border border-neutral-100">
                  <Image src={cs.image} alt={cs.title} fill className="object-cover hover:opacity-95 transition-opacity" />
                </div>
              </Link>
            )}

            <div className={cs.image ? "mt-5" : ""}>
              <div className="flex items-center gap-3">
                <p className="text-[13px] text-neutral-400">{cs.company}</p>
                {cs.status === "In Progress" && (
                  <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">In Progress</span>
                )}
              </div>

              <Link href={`/projects/${cs.id}`}>
                <h2 className="mt-1.5 text-2xl font-semibold text-neutral-900 hover:text-blue-600 transition-colors">
                  {cs.title}
                </h2>
              </Link>

              <p className="mt-1 text-[15px] text-neutral-500">{cs.oneLiner}</p>

              <p className="mt-3 text-[14px] text-neutral-400">
                {cs.role} &middot; {cs.timeline}
              </p>

              {/* Metrics */}
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {cs.heroMetrics.map((m) => (
                  <span key={m.label} className="text-[14px]">
                    <span className="font-semibold text-neutral-900">{m.value}</span>
                    <span className="text-neutral-400 ml-1.5">{m.label}</span>
                  </span>
                ))}
              </div>

              {/* Tech */}
              <p className="mt-4 text-[13px] text-neutral-400">
                {cs.tech.join(", ")}
              </p>

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
    </div>
  );
}
