export const siteConfig = {
  name: "Srinidhi Jagannathan",
  email: "srinidhi.jagan11@gmail.com",
  linkedin: "https://www.linkedin.com/in/srinidhi-jagannathan-876998385/",
  github: "https://github.com/sjagannathan17",
};

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Code & Data Foundations",
    items: ["Python", "SQL", "R", "JavaScript", "Git/GitHub", "Jupyter", "Pandas", "NumPy", "scikit-learn", "PyTorch", "XGBoost"],
  },
  {
    title: "Building with LLMs & Agents",
    items: ["RAG", "LLMs", "NLP", "Multi-Agent Systems", "LangGraph", "LangChain", "Hugging Face", "NLTK", "GPT-4o", "Ollama", "ChromaDB", "Pinecone", "FAISS", "Claude Code", "Cursor"],
  },
  {
    title: "Modeling & Experimentation",
    items: ["Feature Engineering", "Hyperparameter Tuning", "Model Evaluation", "LLM Evaluation", "A/B Testing", "Gradient Boosting"],
  },
  {
    title: "Product Craft",
    items: ["PRDs", "Product Roadmapping", "Product Discovery", "Market Research", "Competitive Analysis", "User Research", "Stakeholder Management", "Cross-functional Leadership", "Release Management", "Incident Management", "Agile/Scrum", "Kanban", "Prototyping", "Wireframing", "Figma", "Jira", "Tableau"],
  },
  {
    title: "From Prototype to Production",
    items: ["FastAPI", "Streamlit", "Next.js", "v0", "Replit"],
  },
  {
    title: "Data, Optimization & Reliability",
    items: ["Data Modeling", "ETL Pipelines", "Gurobi", "Splunk", "New Relic"],
  },
  {
    title: "Spoken Languages",
    items: ["English", "Hindi", "Tamil"],
  },
];

/* ────────────── Museum: all projects (GitHub-linked) ────────────── */

export const museumProjects: {
  title: string;
  context: string;
  date?: string;
  description: string;
  github: string;
}[] = [
  {
    title: "PetTriage AI",
    context: "Santa Clara University · GenAI Course",
    date: "Jan 2026",
    description:
      "Dual-agent veterinary triage system that answers \"should I go to the ER?\" in seconds, with a 4-layer safety system that hard-routes life-threatening symptoms. Shipped in a 10-day sprint.",
    github: "https://github.com/sjagannathan17/pettriage-ai",
  },
  {
    title: "Flex Competitive Intelligence",
    context: "Flex Ltd. · SCU Practicum",
    date: "2026",
    description:
      "AI platform tracking 5 contract manufacturers' AI capex across 405+ SEC filings, earnings calls, patents and job posts. A hybrid RAG + web-search pipeline that replaces five-figure SaaS with ~$30/month.",
    github: "https://github.com/sjagannathan17/flex-competitive-intelligence",
  },
  {
    title: "LitLens",
    context: "Santa Clara University · GenAI Course",
    date: "2025",
    description:
      "Drag in 10 papers and get a literature review with contradictions, gaps, and an evidence-scored draft in ~2 minutes for about $0.01 — 8 LangGraph agents over a FAISS index.",
    github: "https://github.com/sjagannathan17/litlens",
  },
  {
    title: "SmartReview",
    context: "NLP Capstone",
    date: "2026",
    description:
      "End-to-end NLP pipeline turning product reviews into sentiment (0.856 CV accuracy), aspect intelligence, per-category topics, and a confidence-gated /analyze API.",
    github: "https://github.com/sjagannathan17/smartreview-nlp",
  },
  {
    title: "GreenCity Logistics Optimization",
    context: "Prescriptive Analytics Capstone · team",
    date: "2026",
    description:
      "Prescriptive model choosing which fulfillment centers to open and how to route to cut both cost and CO₂ — a 21.9% emissions reduction for +0.1% cost, across 5 model classes (LP/MIP/multi-objective/NLP) on Gurobi.",
    github: "https://github.com/sjagannathan17/greencity-logistics-optimization",
  },
  {
    title: "Agri-Intelligence Platform",
    context: "Good Nature Agro (Zambia)",
    date: "2026",
    description:
      "WhatsApp-native AI for 22K smallholder farmers — a 5-agent system delivering per-zone, per-risk-tier nudges and tool-grounded Claude chat in English, Bemba, and Nyanja.",
    github: "https://github.com/sjagannathan17/agri-intelligence-platform",
  },
  {
    title: "Spotify Post-Release Optimizer",
    context: "Personal Project",
    date: "Dec 2025",
    description:
      "Analyzed 188K tracks to surface statistically significant album-sequencing patterns, then wrapped them in an AI chatbot that gives artists a personalized release playbook.",
    github: "https://github.com/sjagannathan17/spotify-release-optimizer",
  },
  {
    title: "Amazon India Pricing Strategy",
    context: "Analytics Project",
    description:
      "PM-framed analysis of ~550K SKUs — K-means category segmentation, a hit-prediction model, and a competitive 2×2 pricing matrix benchmarked against Flipkart.",
    github: "https://github.com/sjagannathan17/amazon-india-pricing-strategy",
  },
  {
    title: "Stylometric AI-Text Detection",
    context: "ML Project",
    description:
      "Interpretable AI-vs-human text classifier on 11.5K samples with SHAP analysis — and an honest look at why aggregate accuracy hides near-random performance on paraphrased text.",
    github: "https://github.com/sjagannathan17/stylometric-ai-text-detection",
  },
  {
    title: "Tesla Workforce Optimization",
    context: "Optimization Project",
    description:
      "Linear-programming model for bilingual customer-support staffing that saves $100/day (2.2%) while satisfying every coverage constraint.",
    github: "https://github.com/sjagannathan17/tesla-workforce-optimization",
  },
  {
    title: "Lending Club Default Prediction",
    context: "Santa Clara University · ML Course",
    date: "2025",
    description:
      "Default-prediction on 887K loans using only origination-time features (no data leakage) — AUC 0.80 with a calibration-aware methodology.",
    github: "https://github.com/sjagannathan17/lending-club-default-prediction",
  },
];

/* ────────────── Office: Professional Experience ────────────── */

export type OfficeEntry = {
  title: string;
  org: string;
  location?: string;
  period: string;
  points?: string[];
};

export const officeWork: OfficeEntry[] = [
  {
    title: "AI Product Manager (Practicum)",
    org: "Santa Clara University",
    location: "Santa Clara, CA",
    period: "Jan 2026 – Present",
    points: [
      "Defined scope and led end-to-end delivery of an AI-powered CapEx competitive-intelligence platform, cutting Flex's manual financial-analysis work by 70%",
      "Built NLP pipelines to extract strategic insights from earnings calls and investor communications",
      "Implemented a RAG application with vector search for natural-language querying of competitive datasets",
    ],
  },
  {
    title: "Engineer — Product & Release",
    org: "iGreenData – A Synechron Company",
    location: "Bengaluru, India",
    period: "Oct 2022 – Feb 2024",
    points: [
      "Led go-live of RTGS and ACH payment systems across Samoa, Fiji & Vanuatu — cut interbank settlement from up to 5 days to real-time, eliminating manual cheque-based processing",
      "Coordinated three APAC payment-system launches via stakeholder interviews and workflow mapping; identified mobile-money integration as the primary efficiency driver, cutting launch decision cycles by 30%",
      "Built 10+ operational dashboards in Tableau/Power BI tracking 50+ KPIs across 12 financial institutions and 500K+ users",
      "Automated ETL pipelines in Python, reducing manual reporting time by 40% and enabling self-service analytics",
    ],
  },
  {
    title: "Associate Engineer — Product & Release",
    org: "iGreenData – A Synechron Company",
    location: "Bengaluru, India",
    period: "Sep 2021 – Oct 2022",
    points: [
      "Built and maintained data pipelines supporting BI reporting for banking operations, ensuring data quality across multiple sources",
      "Built Tableau dashboards and automated reporting to track operational KPIs, improving data accessibility for business stakeholders",
      "Performed SQL and Python analysis to surface trends and anomalies in banking transaction data for operations and risk teams",
    ],
  },
];

export const officeEducation: OfficeEntry[] = [
  {
    title: "M.S. in Business Analytics",
    org: "Santa Clara University, Leavey School of Business",
    location: "Santa Clara, CA",
    period: "Sep 2024 – Dec 2026",
    points: [],
  },
  {
    title: "B.E. in Electrical & Electronics Engineering",
    org: "SSN College of Engineering",
    location: "Chennai, India",
    period: "2014 – 2018",
    points: [],
  },
];

export const officeTeaching: OfficeEntry[] = [
  {
    title: "Graduate Teaching Assistant — Operations & Supply Chain Management / Supply Chain Finance",
    org: "Santa Clara University",
    location: "Santa Clara, CA",
    period: "Jan 2026 – Present",
    points: [
      "Selected by Prof. Gangshu Cai to support two graduate courses: ISBA 3300 (Operations & Supply Chain Management) and ISBA 2434 (Supply Chain Finance)",
      "Mentor 60+ graduate students through complex operations, supply chain, and finance concepts — leading discussions, breaking down coursework, and supporting their academic success",
    ],
  },
];

export const officeCoursework: string[] = [
  "Data Analytics with Python",
  "Machine Learning with Python",
  "Prescriptive Analytics with Python",
  "Database Management Systems (SQL)",
  "Math for Business & Analytics with R",
  "Linear Algebra with Python",
  "Dashboards with Tableau",
  "Data Science in Marketing",
  "Deep Learning",
  "Natural Language Processing",
  "Generative AI for the Enterprise",
  "Big Data Modeling & Analytics",
  "Artificial Intelligence",
  "Software Project Management",
  "Industry Practicum",
];
