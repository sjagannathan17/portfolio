import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Srinidhi Jagannathan. Available for Summer 2026 AI Product Management internships.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">Let&apos;s Connect</h1>
      <p className="mt-3 text-[17px] text-neutral-500 max-w-lg">
        I&apos;m available for Summer 2026 internships (May–Sep) in AI Product
        Management roles. Always happy to chat about AI systems, product strategy,
        or grab coffee.
      </p>

      <hr className="my-10 border-neutral-100" />

      {/* Contact info */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-neutral-900 mb-5">Get in Touch</h2>
        <div className="space-y-4">
          <div>
            <p className="text-[13px] font-medium text-neutral-400">Email</p>
            <a href={`mailto:${siteConfig.email}`} className="text-[15px] text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 transition-colors">
              {siteConfig.email}
            </a>
          </div>
          <div>
            <p className="text-[13px] font-medium text-neutral-400">LinkedIn</p>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-[15px] text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 transition-colors">
              linkedin.com/in/srinidhi-jagannathan
            </a>
          </div>
          <div>
            <p className="text-[13px] font-medium text-neutral-400">Location</p>
            <p className="text-[15px] text-neutral-600">San Jose, CA &middot; Open to Bay Area &amp; Remote</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="mb-12">
        <ContactForm />
      </section>

      {/* What I'm Looking For */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">What I&apos;m Looking For</h2>
        <ul className="space-y-2">
          {[
            "AI Product Management roles",
            "Companies building production AI/ML systems",
            "Teams working on RAG, LLMs, or multi-agent architectures",
            "Summer 2026 (May–September)",
          ].map((item) => (
            <li key={item} className="text-[15px] text-neutral-600 pl-5 relative before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
