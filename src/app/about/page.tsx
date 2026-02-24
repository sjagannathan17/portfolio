import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Srinidhi Jagannathan — AI Product Manager building systems that automate knowledge work at scale.",
};

const experiences = [
  {
    company: "Santa Clara University",
    initial: "S",
    role: "Graduate Teaching Assistant — Operations & Supply Chain Management",
    period: "Jan 2026 – Present",
    location: "Santa Clara, CA",
    description:
      "Supporting Prof. Gangshu Cai across ISBA 3300 (Operations & Supply Chain Management, MBA) and ISBA 2434 (Supply Chain Finance). Facilitating discussions and providing academic support to 60+ students, bridging supply chain theory with data-driven analytical frameworks.",
    tech: [],
  },
  {
    company: "Flex",
    initial: "F",
    role: "Strategic Analytics Consultant (Practicum)",
    period: "Jan 2026 – Present",
    location: "San Jose, CA",
    description:
      "Leading AI platform development for competitive intelligence — replacing 15+ hours/week of manual research with RAG-powered queries across 405+ SEC filings. Architected a dual-model RAG pipeline achieving sub-2s latency. Leading a 4-person team through API-first development with weekly sprint milestones. Conducting stakeholder interviews across Sales, Strategy, and Executive teams.",
    tech: ["Python", "LangChain", "Pinecone", "GPT-4", "FastAPI", "Streamlit"],
  },
  {
    company: "iGreenData",
    initial: "iG",
    role: "Engineer — Product & Data Analytics",
    period: "Sep 2021 – Jan 2024",
    location: "Bengaluru, India",
    description:
      "Led product analytics for ANZ Bank's RTGS payment systems across 5 Pacific island nations. User research revealed mobile-money drove 60% of transaction volume, fundamentally changing product strategy. Built 10+ executive dashboards tracking 50+ KPIs — increased decision speed by 30%. Primary liaison between ANZ Australia HQ, Pacific central banks, and regulatory bodies.",
    tech: ["Python", "SQL", "Tableau", "Power BI", "Confluence", "JIRA"],
  },
];

const education = [
  {
    school: "Santa Clara University",
    subtitle: "Leavey School of Business",
    degree: "Master of Science in Business Analytics",
    period: "Sep 2024 – Dec 2026",
    gpa: "3.9",
    coursework: [
      "Generative AI for Enterprises",
      "AI/ML Applications",
      "Deep Learning",
      "NLP",
      "Product Management",
      "Database Management Systems",
    ],
    note: "Graduate Teaching Assistant for Operations Management. Available May–Sep 2026 for internships.",
  },
  {
    school: "SSN College of Engineering",
    subtitle: "Chennai, India",
    degree: "B.E. in Electrical & Electronics Engineering",
    period: "2014 – 2018",
    note: "Foundation in embedded systems and signal processing — now applied to AI model architectures and deployment constraints.",
  },
];

const skills = [
  {
    title: "Product Management",
    items: [
      "Product Strategy & Roadmapping",
      "User Research & Validation",
      "Agile / Scrum Leadership",
      "Cross-functional Collaboration",
      "Stakeholder Management",
    ],
  },
  {
    title: "AI / ML",
    items: [
      "RAG Pipelines",
      "Multi-Agent Systems",
      "Vector Databases",
      "LLM Engineering",
      "Prompt Engineering",
      "NLP / Semantic Search",
    ],
  },
  {
    title: "Technical",
    items: [
      "Python",
      "TypeScript / React",
      "SQL",
      "FastAPI / Next.js",
      "Git & CI/CD",
      "API Design (REST)",
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      "Tableau",
      "Power BI",
      "Streamlit",
      "JIRA / Confluence",
      "Figma",
      "LangChain / LangSmith",
    ],
  },
];

const recognition = [
  {
    title: "1st Prize — Analytics Showdown 2025",
    org: "Santa Clara University",
    description:
      "Competed against 12 teams analyzing Shopee e-commerce data. Built forecasting models that delivered 87% improvement in decision speed. Presented to 100+ attendees and 6 industry judges.",
  },
  {
    title: "ANZ Payments Technology Domain Award",
    org: "2023",
    description:
      "Recognized for cross-functional leadership coordinating RTGS system launches across Fiji, Vanuatu, and Samoa central banks.",
  },
  {
    title: "Star Performer Award",
    org: "iGreenData, 2022 & 2023",
    description:
      "Top 5% of 200+ employees. Recognized for consistently exceeding KPIs and driving high-impact projects.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:py-16">
      <div className="lg:flex lg:gap-16">
        {/* ── Sticky Sidebar ── */}
        <aside className="lg:w-[280px] lg:shrink-0 lg:sticky lg:top-20 lg:self-start mb-12 lg:mb-0">
          <div className="flex flex-col items-center lg:items-start">
            {/* Headshot with glow */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 opacity-30 blur-md" />
              <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/10">
                <Image
                  src="/headshot.png"
                  alt="Srinidhi Jagannathan"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            <h1 className="mt-5 text-xl font-bold text-neutral-900">
              Srinidhi Jagannathan
            </h1>
            <p className="mt-1 text-[14px] text-neutral-500">
              AI Product Manager
            </p>

            {/* Location & Availability */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-[12px] text-neutral-500 bg-neutral-100 rounded-full px-3 py-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                San Jose, CA
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] text-emerald-700 bg-emerald-50 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available Summer 2026
              </span>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex flex-col gap-2.5 w-full">
              <a
                href="https://linkedin.com/in/srinidhi-jagannathan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[13px] text-neutral-500 hover:text-blue-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/sjagannathan17"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                GitHub
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Resume
              </a>
            </div>
          </div>
        </aside>

        {/* ── Scrollable Content ── */}
        <main className="lg:flex-1 min-w-0">
          {/* ─ Bio ─ */}
          <section className="mb-16">
            <p className="text-[20px] leading-[1.75] text-neutral-700 font-light">
              I build AI systems that automate knowledge work — replacing hours
              of manual research, triage, and synthesis with intelligent
              pipelines that cost pennies per query.
            </p>

            <blockquote className="mt-6 border-l-[3px] border-blue-500 pl-5 py-1">
              <p className="text-[15px] text-neutral-600 italic leading-relaxed">
                Find expensive manual knowledge work, automate it with AI, and
                make the economics work at scale.
              </p>
            </blockquote>

            <div className="mt-6 space-y-4 text-[15px] text-neutral-600 leading-[1.75]">
              <p>
                That&apos;s the thread across everything I&apos;ve built:
                PetTriage replaced $800 ER visits with $0.003 AI triage.
                Flex&apos;s CI platform turned 15 hours/week of manual competitor
                research into 2-hour automated briefs. LitLens compresses weeks
                of literature review into minutes.
              </p>
              <p>
                My career started in Electrical Engineering, moved into Product
                Analytics at iGreenData where I shipped payment systems across 5
                Pacific nations, and now I&apos;m completing my MSBA at Santa
                Clara University (3.9 GPA) while shipping an AI competitive
                intelligence platform for Flex.
              </p>
              <p>
                What I bring to PM roles: deep technical knowledge (I debug RAG
                pipelines and debate model architecture with engineers), product
                sense (I scope, prioritize, and say &ldquo;no&rdquo; to good
                ideas), and cross-functional leadership (50+ user interviews
                across 3 continents, teams of 4 through weekly sprints,
                stakeholders from C-suite to ground-level regulators).
              </p>
            </div>
          </section>

          {/* ─ Experience Timeline ─ */}
          <section className="mb-16">
            <h2 className="text-lg font-semibold text-neutral-900 mb-8 uppercase tracking-wider text-[13px]">
              Experience
            </h2>

            <div className="relative pl-8 border-l-2 border-neutral-200">
              {experiences.map((exp, i) => (
                <div key={i} className={`relative ${i > 0 ? "mt-12" : ""}`}>
                  {/* Timeline dot */}
                  <div className="absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white" />

                  {/* Company initial avatar */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-[13px] font-bold text-neutral-500 shrink-0">
                      {exp.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-neutral-900">
                        {exp.company}
                      </h3>
                      <p className="text-[14px] text-neutral-600 mt-0.5">
                        {exp.role}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        <span className="text-[11px] text-neutral-500 bg-neutral-100 rounded-full px-2.5 py-0.5">
                          {exp.period}
                        </span>
                        <span className="text-[11px] text-neutral-400 bg-neutral-50 rounded-full px-2.5 py-0.5">
                          {exp.location}
                        </span>
                      </div>
                      <p className="mt-3 text-[14px] text-slate-500 leading-relaxed">
                        {exp.description}
                      </p>
                      {exp.tech.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {exp.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] text-blue-600 bg-blue-50 rounded-full px-2.5 py-0.5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─ Education Cards ─ */}
          <section className="mb-16">
            <h2 className="text-lg font-semibold text-neutral-900 mb-8 uppercase tracking-wider text-[13px]">
              Education
            </h2>

            <div className="space-y-5">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-neutral-200 p-5 hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {edu.school}
                      </h3>
                      {edu.subtitle && (
                        <p className="text-[13px] text-neutral-400">
                          {edu.subtitle}
                        </p>
                      )}
                      <p className="text-[14px] text-neutral-600 mt-1">
                        {edu.degree}
                      </p>
                      <p className="text-[12px] text-neutral-400 mt-1">
                        {edu.period}
                      </p>
                    </div>
                    {edu.gpa && (
                      <span className="shrink-0 text-[12px] font-semibold text-blue-700 bg-blue-50 rounded-lg px-3 py-1.5">
                        GPA {edu.gpa}
                      </span>
                    )}
                  </div>

                  {edu.coursework && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {edu.coursework.map((c) => (
                        <span
                          key={c}
                          className="text-[11px] text-neutral-500 bg-neutral-100 rounded-full px-2.5 py-0.5"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {edu.note && (
                    <p className="mt-3 text-[13px] text-neutral-400 leading-relaxed">
                      {edu.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ─ Skills Grid ─ */}
          <section className="mb-16">
            <h2 className="text-lg font-semibold text-neutral-900 mb-8 uppercase tracking-wider text-[13px]">
              Skills
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((cat) => (
                <div
                  key={cat.title}
                  className="rounded-xl border border-neutral-200 p-5"
                >
                  <h3 className="text-[13px] font-semibold text-neutral-900 mb-3">
                    {cat.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="text-[12px] text-neutral-600 bg-neutral-50 border border-neutral-100 rounded-full px-2.5 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─ Recognition ─ */}
          <section className="mb-16">
            <h2 className="text-lg font-semibold text-neutral-900 mb-8 uppercase tracking-wider text-[13px]">
              Recognition
            </h2>

            <div className="space-y-5">
              {recognition.map((r, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 mt-1.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-[15px]">
                      {r.title}
                    </p>
                    <p className="text-[12px] text-neutral-400 mt-0.5">
                      {r.org}
                    </p>
                    <p className="mt-1.5 text-[14px] text-slate-500 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─ CTA ─ */}
          <div className="flex gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-5 py-2.5 text-[14px] font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              Download Resume &darr;
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-[14px] font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Get in Touch &rarr;
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
