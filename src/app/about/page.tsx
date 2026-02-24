import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Srinidhi Jagannathan — AI Product Manager building production AI systems.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">About</h1>

      {/* Photo */}
      <div className="mt-8 w-28 h-28 rounded-full overflow-hidden">
        <Image
          src="/headshot.png"
          alt="Srinidhi Jagannathan"
          width={112}
          height={112}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Bio */}
      <div className="mt-8 space-y-5 text-neutral-600 leading-[1.75]">
        <p>
          I build production AI systems that solve real problems. Right now
          I&apos;m shipping a competitive intelligence platform at Flex while
          completing my MSBA at Santa Clara University (3.9 GPA, graduating
          December 2026).
        </p>
        <p>
          My career path started with Electrical Engineering, moved into Product
          Analytics at iGreenData where I shipped payment systems across 5 Pacific
          nations, and now I&apos;m focused on AI/ML Product Management. Along the
          way, I learned something critical: the gap between AI research and useful
          products isn&apos;t technical. It&apos;s understanding what problem
          you&apos;re actually solving.
        </p>
        <p>
          I bridge that gap by combining deep technical knowledge (I can debug RAG
          pipelines and debate architecture with engineers) with product sense
          (I&apos;ve shipped features to 500K+ users) and user empathy (I&apos;ve
          conducted 50+ user interviews across 3 continents).
        </p>
        <p>
          Currently focused on RAG architectures, multi-agent systems, and turning
          complex AI research into products that ship. Seeking Summer 2026
          internships in AI Product Management where I can apply this full-stack
          perspective.
        </p>
      </div>

      <hr className="my-14 border-neutral-100" />

      {/* ─── Experience ─── */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-8">Experience</h2>

        <div className="space-y-14">
          {/* Santa Clara University — GTA */}
          <div>
            <h3 className="font-semibold text-neutral-900">Santa Clara University</h3>
            <p className="text-[15px] text-neutral-500">
              Graduate Teaching Assistant — Operations &amp; Supply Chain Management / Supply Chain Finance
            </p>
            <p className="text-[13px] text-neutral-400 mt-0.5">
              Jan 2026 – Present &middot; Santa Clara, CA
            </p>

            <div className="mt-4 space-y-4 text-[15px] text-neutral-600 leading-relaxed">
              <p>
                Supporting Prof. Gangshu Cai across two graduate-level courses at
                Santa Clara University&apos;s Leavey School of Business — ISBA 3300:
                Operations &amp; Supply Chain Management (MBA) and ISBA 2434: Supply
                Chain Finance: Mechanism, Risk Analytics, and Technology.
              </p>
              <p>
                Facilitating discussions, providing academic support to 60+ students,
                assisting with course materials, and bridging supply chain theory with
                data-driven analytical frameworks covering operations strategy,
                financial risk, and emerging supply chain technologies.
              </p>
            </div>
          </div>

          {/* Flex */}
          <div>
            <h3 className="font-semibold text-neutral-900">Flex</h3>
            <p className="text-[15px] text-neutral-500">Strategic Analytics Consultant (Practicum)</p>
            <p className="text-[13px] text-neutral-400 mt-0.5">Jan 2026 – Present &middot; San Jose, CA</p>

            <div className="mt-4 space-y-4 text-[15px] text-neutral-600 leading-relaxed">
              <p>
                Leading AI platform development for competitive intelligence.
                We&apos;re replacing 15+ hours/week of manual research with
                RAG-powered natural language queries across 405+ SEC filings.
              </p>
              <p>
                Architected a dual-model RAG pipeline using GPT-4 for synthesis
                and specialized embeddings for retrieval, achieving sub-2 second
                query latency. Leading a 4-person cross-functional team through
                API-first development with weekly sprint milestones.
              </p>
              <p>
                Conducting stakeholder interviews across Sales, Strategy, and
                Executive teams to align our product roadmap. Building competitive
                moat through proprietary data integration and custom NLP pipelines.
              </p>
            </div>
            <p className="mt-3 text-[13px] text-neutral-400">
              Tech stack: Python, LangChain, Pinecone, GPT-4, FastAPI, Streamlit
            </p>
          </div>

          {/* iGreenData */}
          <div>
            <h3 className="font-semibold text-neutral-900">iGreenData</h3>
            <p className="text-[15px] text-neutral-500">Engineer — Product &amp; Data Analytics</p>
            <p className="text-[13px] text-neutral-400 mt-0.5">Sep 2021 – Jan 2024 &middot; Bengaluru, India</p>

            <div className="mt-4 space-y-4 text-[15px] text-neutral-600 leading-relaxed">
              <p>
                Led product analytics for ANZ Bank&apos;s Real-Time Gross Settlement
                (RTGS) payment systems across 5 Pacific island nations (Fiji, Vanuatu,
                Samoa, Solomon Islands, Papua New Guinea).
              </p>
              <p>
                Conducted user research across Pacific regulators and banks. That
                research revealed mobile-money integration drove 60% of transaction
                volume in our pilot launch, which completely changed our product
                strategy.
              </p>
              <p>
                Built 10+ executive dashboards in Tableau and Power BI tracking 50+
                KPIs including transaction velocity, settlement times, and failure
                rates. These dashboards increased decision speed by 30%.
              </p>
              <p>
                Partnered with Product and Engineering teams to define feature strategy
                and technical requirements using Agile/Scrum. Automated ETL data
                pipelines, cutting manual reporting from 40 hours/month down to 8 hours.
              </p>
              <p>
                Served as primary liaison between ANZ Australia HQ, Pacific central
                banks, and regulatory bodies. This meant translating technical
                requirements across very different stakeholders.
              </p>
            </div>
            <p className="mt-3 text-[13px] text-neutral-400">
              Tech stack: Python, SQL, Tableau, Power BI, Confluence, JIRA
            </p>
          </div>
        </div>
      </section>

      <hr className="my-14 border-neutral-100" />

      {/* ─── Education ─── */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-8">Education</h2>

        <div className="space-y-10">
          {/* SCU */}
          <div>
            <h3 className="font-semibold text-neutral-900">
              Santa Clara University, Leavey School of Business
            </h3>
            <p className="text-[15px] text-neutral-500">
              Master of Science in Business Analytics
            </p>
            <p className="text-[13px] text-neutral-400 mt-0.5">
              Sep 2024 – Dec 2026 &middot; GPA: 3.9
            </p>

            <div className="mt-4 space-y-3 text-[15px] text-neutral-600 leading-relaxed">
              <p>Available May through September 2026 for internships.</p>
              <p className="text-[13px] text-neutral-400">
                Relevant coursework: Generative AI for Enterprises, AI/ML
                Applications, Deep Learning, Natural Language Processing,
                Product Management, Database Management Systems
              </p>
              <p className="text-[13px] text-neutral-400">
                Graduate Teaching Assistant for ISBA 3300: Operations Management
                (Fall 2025, Winter 2026). Supporting 60+ students under Professor
                Gangshu Cai for Supply Chain Finance: Mechanism, Risk Analytics,
                and Technology.
              </p>
            </div>
          </div>

          {/* SSN */}
          <div>
            <h3 className="font-semibold text-neutral-900">SSN College of Engineering</h3>
            <p className="text-[15px] text-neutral-500">
              Bachelor of Engineering in Electrical &amp; Electronics Engineering
            </p>
            <p className="text-[13px] text-neutral-400 mt-0.5">
              2014 – 2018 &middot; Chennai, India
            </p>
            <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed">
              Foundation in embedded systems and signal processing that now helps
              me understand AI model architectures and deployment constraints.
            </p>
          </div>
        </div>
      </section>

      <hr className="my-14 border-neutral-100" />

      {/* ─── Skills ─── */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-8">Skills</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-[14px] font-semibold text-neutral-900 mb-1.5">
              Product Management
            </h3>
            <p className="text-[15px] text-neutral-500 leading-relaxed">
              Product strategy and roadmapping (took Flex AI platform from 0 to 1).
              User research and validation (50+ interviews across 3 continents).
              Agile/Scrum leadership (led 4-person teams through weekly sprints).
              Cross-functional collaboration with Product, Engineering, Sales, and
              regulatory bodies. Stakeholder management ranging from C-suite
              executives to ground-level users.
            </p>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-neutral-900 mb-1.5">
              AI / ML
            </h3>
            <p className="text-[15px] text-neutral-500 leading-relaxed">
              RAG pipelines in production. Multi-agent systems using LangGraph
              orchestration. Vector databases (Pinecone, Chroma). LLM engineering
              with GPT-4, Claude, and Gemini. Prompt engineering and evaluation.
              NLP including embeddings, semantic search, and classification.
            </p>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-neutral-900 mb-1.5">
              Technical
            </h3>
            <p className="text-[15px] text-neutral-500 leading-relaxed">
              Python (pandas, scikit-learn, FastAPI). TypeScript and JavaScript
              (Next.js, React). SQL (PostgreSQL, SQLite). Git and GitHub for
              version control and CI/CD. API design (REST, GraphQL).
            </p>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-neutral-900 mb-1.5">
              Tools &amp; Platforms
            </h3>
            <p className="text-[15px] text-neutral-500 leading-relaxed">
              Data visualization: Tableau, Power BI, Jupyter, Streamlit
              <br />
              Product management: JIRA, Confluence, Figma, Miro
              <br />
              AI development: LangChain, LangSmith, Weights &amp; Biases
            </p>
          </div>
        </div>
      </section>

      <hr className="my-14 border-neutral-100" />

      {/* ─── Recognition ─── */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-8">Recognition</h2>

        <div className="space-y-8">
          <div>
            <p className="font-semibold text-neutral-900">
              1st Prize — Analytics Showdown 2025
            </p>
            <p className="text-[13px] text-neutral-400 mt-0.5">
              Santa Clara University
            </p>
            <p className="mt-2 text-[15px] text-neutral-500 leading-relaxed">
              Competed against 12 teams analyzing Shopee e-commerce data. Built
              forecasting models optimizing promotion timing that delivered 87%
              improvement in decision speed. Presented findings to 100+ attendees
              and 6 industry judges.
            </p>
          </div>

          <div>
            <p className="font-semibold text-neutral-900">
              ANZ Payments Technology Domain Award
            </p>
            <p className="text-[13px] text-neutral-400 mt-0.5">2023</p>
            <p className="mt-2 text-[15px] text-neutral-500 leading-relaxed">
              Recognized for cross-functional leadership coordinating RTGS system
              launches across Fiji, Vanuatu, and Samoa central banks.
            </p>
          </div>

          <div>
            <p className="font-semibold text-neutral-900">Star Performer Award</p>
            <p className="text-[13px] text-neutral-400 mt-0.5">
              iGreenData, 2022 &amp; 2023
            </p>
            <p className="mt-2 text-[15px] text-neutral-500 leading-relaxed">
              Top 5% of 200+ employees. Recognized for consistently exceeding KPIs
              and driving high-impact projects.
            </p>
          </div>
        </div>
      </section>

      <hr className="my-14 border-neutral-100" />

      {/* Resume */}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-md border border-neutral-200 px-5 py-2.5 text-[14px] font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
      >
        Download Resume &darr;
      </a>
    </div>
  );
}
