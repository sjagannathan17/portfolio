export const siteConfig = {
  name: "Srinidhi Jagannathan",
  email: "srinidhi.jagan11@gmail.com",
  linkedin: "https://linkedin.com/in/srinidhi-jagannathan",
  github: "https://github.com/sjagannathan17",
};

export const impactStats = [
  { value: "70%", label: "Cost Reduction", context: "PetTriage AI" },
  { value: "18,909", label: "Documents at Scale", context: "RAG Pipeline" },
  { value: "500ms", label: "Response Time", context: "Production System" },
  { value: "1st Prize", label: "Analytics Showdown", context: "Santa Clara 2025" },
];

export const skills = {
  "Product Management": ["Product Strategy & Roadmapping", "User Research & Validation", "Agile / Scrum Leadership", "Cross-functional Collaboration", "Stakeholder Management"],
  "AI / ML": ["RAG Pipelines", "Multi-Agent Systems (LangGraph)", "Vector Databases (Pinecone, Chroma)", "LLM Engineering (GPT-4, Claude, Gemini)", "Prompt Engineering & Evaluation", "NLP / Semantic Search"],
  Technical: ["Python (pandas, scikit-learn, FastAPI)", "TypeScript / JavaScript (Next.js, React)", "SQL (PostgreSQL, SQLite)", "Git & GitHub", "API Design (REST, GraphQL)"],
  "Tools & Platforms": ["Tableau", "Power BI", "Jupyter", "Streamlit", "JIRA", "Confluence", "Figma", "Miro", "LangChain", "LangSmith", "Weights & Biases"],
};

/* ────────────── Case Studies ────────────── */

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  oneLiner: string;
  category: "AI/ML" | "Product" | "Analytics";
  status: "Completed" | "In Progress";
  timeline: string;
  role: string;
  image?: string;
  github?: string;
  tech: string[];
  // Hero metrics shown on card
  heroMetrics: { value: string; label: string }[];
  // Full detail
  challenge: string;
  approach: string;
  solution: string;
  impact: string[];
  pmThinking?: { problemFraming: string; keyTradeoffs: string; whatWeDidntBuild: string; crossFunctional?: string };
  challengesOvercome: { obstacle: string; resolution: string }[];
  learnings: string[];
  whatIdDoDifferently?: string;
  testimonial?: { quote: string; author: string; role: string };
  galleryImages?: { src: string; caption: string }[];
  codeSnippet?: { title: string; code: string };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "pettriage-ai",
    title: "PetTriage AI",
    company: "Santa Clara University — GenAI Course",
    oneLiner: "Dual-agent veterinary triage system that helps pet owners make confident care decisions",
    category: "AI/ML",
    status: "Completed",
    timeline: "10-day sprint — Jan 2026",
    role: "Product & Technical Lead — 4-person team",
    image: "/projects/pettriage.png",
    github: "https://github.com/sjagannathan17/Fuzzy-Friend",
    tech: ["LangGraph", "Pinecone", "GPT-4.1-mini", "GPT-4o-mini", "GPT-4o Vision", "Gemini 2.0 Flash", "Next.js", "FastAPI"],
    heroMetrics: [
      { value: "500ms", label: "Response Time" },
      { value: "70%", label: "Cost Reduction" },
      { value: "18,909", label: "Documents Indexed" },
      { value: "$0.003", label: "Per Query Cost" },
    ],
    challenge:
      "First-time pet owners face a critical gap: Google provides contradictory advice, emergency vets cost $800+ for what's often a 'monitor at home' diagnosis, and 52% of US pet owners skip care entirely due to cost anxiety. Across 94 million pet-owning households spending $39.8B on vet care annually, there's no trusted middle layer for urgent decision-making. Existing pet health apps offer static checklists, not AI-powered triage grounded in veterinary literature.",
    approach:
      "Led a 4-person team through a 10-day sprint to ship a production-ready system. Owned the product vision ('Clear answers in anxious moments — helping pet parents make confident care decisions'), conducted user research with first-time pet owners, designed the technical architecture, built the RAG pipeline and evaluation framework, and defined the freemium business model ($270K ARR potential). Made every key architecture decision: dual-agent routing, safety system design, model selection for cost optimization.",
    solution:
      "Dual-agent architecture orchestrated by LangGraph (ReAct pattern). Specialized routing between a conversational agent (GPT-4.1-mini) and a medical triage agent (GPT-4o-mini) — the system decides which agent handles each query based on clinical complexity. RAG pipeline embeds 18,909 veterinary records (openFDA adverse events, clinical notes, pain assessments, genetic profiles) in Pinecone with sub-100ms search latency. Multi-modal inputs: GPT-4o Vision analyzes symptom photos, Gemini 2.0 Flash provides real-time web search for latest treatments. 11-layer safety validation (5 input + 6 output guardrails) ensures triage-only guidance with zero diagnosis claims. Hard-coded emergency routing for life-threatening conditions bypasses the LLM entirely.",
    pmThinking: {
      problemFraming: "We reframed the problem from 'build a pet health chatbot' to 'reduce the anxiety gap between Google and the ER.' This shifted our success metric from response accuracy to user confidence in their care decision — a fundamentally different product.",
      keyTradeoffs: "Safety vs. user experience: we chose hard-coded emergency routing over LLM-based detection for life-threatening symptoms. This meant slower iteration (code changes vs. prompt changes) but zero false negatives on critical cases. We also chose dual-agent over single-agent despite higher complexity — the consistency gain was worth the engineering cost.",
      whatWeDidntBuild: "We scoped out breed-specific dietary recommendations, vet clinic locator/booking, and a symptom history timeline. Each was a good idea, but none served the core job-to-be-done: 'Should I go to the ER right now?' Keeping scope tight let us ship in 10 days.",
      crossFunctional: "Led a 4-person team with mixed technical backgrounds. Ran daily standups, owned the product roadmap, conducted user interviews with pet owners, presented to course judges, and coordinated architecture decisions across frontend and backend engineers.",
    },
    impact: [
      "500ms average response time (down from 2.1s with single-agent approach)",
      "70% cost reduction through strategic model selection ($0.003/query vs $0.01)",
      "Sub-100ms vector search across 18,909 veterinary documents",
      "11-layer safety system: zero diagnosis claims, 100% triage-only guidance",
      "Freemium business model: $270K ARR potential at 5% conversion of 50K downloads",
    ],
    challengesOvercome: [
      {
        obstacle: "Single-agent system produced inconsistent medical triage — mixing casual conversation tone with clinical assessments",
        resolution: "Implemented dual-agent architecture with temperature tuning: 0.3 for medical triage (factual, conservative), 0.7 for conversation (empathetic, reassuring). This separated concerns and improved both accuracy and user experience.",
      },
      {
        obstacle: "RAG hallucination on edge cases — the system would synthesize plausible-sounding but unsupported clinical guidance",
        resolution: "Built 11-layer safety validation with source citation requirements. If the RAG can't find supporting evidence, the system explicitly says 'I don't have enough information' rather than guessing.",
      },
      {
        obstacle: "High API costs with GPT-4o for every query made the product economically unviable",
        resolution: "Analyzed query distribution — 73% were simple questions. Routed these to GPT-4o-mini with cached RAG results, reserving GPT-4o for complex multi-step triage. Cut costs by 70%.",
      },
    ],
    learnings: [
      "Dual-agent systems beat generalist agents for complex domains — separating concerns improves both accuracy and cost efficiency.",
      "Safety in AI products requires architectural validation, not just clever prompts. Hard-coded emergency routing was more reliable than any prompt engineering.",
      "Cost optimization through strategic model selection is a product decision, not just an engineering one. Understanding query distribution patterns drives architecture choices.",
      "Building an evaluation framework early (before optimizing) saved significant time — every prompt tweak could be objectively measured against the 200-question test suite.",
    ],
    whatIdDoDifferently: "I'd invest more time in user testing before building. We validated the technical approach thoroughly but only had informal conversations with pet owners. A structured user research phase with prototype testing would have surfaced the photo upload feature need earlier — we discovered it post-launch from user feedback.",
    testimonial: {
      quote: "Your dual-agent architecture and safety-first approach demonstrated production-level thinking. The cost optimization through intelligent routing shows mature product judgment.",
      author: "Course Judge",
      role: "GenAI for Enterprises, Santa Clara University",
    },
    galleryImages: [
      { src: "/projects/pettriage-symptoms.png", caption: "Symptom checker with 4 urgency levels (ER, Today, Soon, Monitor)" },
      { src: "/projects/pettriage-arch-2.png", caption: "System architecture — dual-agent routing with LangGraph orchestration" },
      { src: "/projects/pettriage-general.png", caption: "Conversational chat with veterinary source citations" },
      { src: "/projects/pettriage-business.png", caption: "Freemium business model — $270K ARR target at 5% conversion" },
    ],
    codeSnippet: {
      title: "Dual-Agent Router — LangGraph",
      code: `def classify_complexity(state: TriageState) -> TriageState:
    score = complexity_classifier.predict(state["query"])
    state["complexity"] = "simple" if score < 0.6 else "complex"
    return state

graph = StateGraph(TriageState)
graph.add_node("classify", classify_complexity)
graph.add_node("fast_agent", fast_agent)   # GPT-4o-mini — 73% of queries
graph.add_node("deep_agent", deep_agent)   # GPT-4o — complex triage

graph.add_conditional_edges(
    "classify",
    lambda s: s["complexity"],
    {"simple": "fast_agent", "complex": "deep_agent"},
)`,
    },
  },
  {
    id: "flex-ai-platform",
    title: "Flex Competitive Intelligence Platform",
    company: "Flex — SCU Practicum",
    oneLiner: "AI platform that turns 15+ hours of weekly competitor research into 2-hour automated intelligence briefs",
    category: "AI/ML",
    status: "In Progress",
    timeline: "Jan 2026 – Present (12-week sprint)",
    role: "Strategic Analytics Consultant — 4-person team",
    github: "https://github.com/sjagannathan17/Flex-Practicum-Project-2026",
    tech: ["ChromaDB", "Claude API", "FastAPI", "Next.js", "Python", "Brave Search", "Sentence Transformers"],
    heroMetrics: [
      { value: "405+", label: "Documents Indexed" },
      { value: "5", label: "Companies Tracked" },
      { value: "~13hrs", label: "Weekly Time Saved" },
      { value: "$20-50", label: "Monthly Cost" },
    ],
    challenge:
      "Flex's strategy team manually monitors 4 competitors across SEC filings, earnings calls, patents, and hiring trends — spending 15+ hours per week. Insights arrive stale, live in scattered spreadsheets, and lack the synthesis needed for CapEx investment decisions. No centralized platform exists for competitive intelligence in the contract manufacturing sector.",
    approach:
      "Defined the product vision, 12-week roadmap, and weekly milestones for a 4-person team. Owned the RAG pipeline architecture, API design, and auto-ingestion scheduler. Made key decisions on cost constraints ($20-50/month ceiling), hybrid search strategy, and data source prioritization. Coordinated weekly demos and managed API-first development process.",
    solution:
      "Full-stack AI platform with automated data ingestion from SEC EDGAR (daily at 4PM ET), earnings transcripts, patent filings, job boards, and news RSS. ChromaDB vector store for semantic search across ~405 documents. Hybrid RAG + Brave web search pipeline powered by Claude API — neither RAG alone (stale) nor web search alone (no proprietary context) was sufficient. Next.js dashboard with conversation memory, sentiment tracking, and anomaly detection for CapEx spikes. Total infrastructure cost: ~$20-50/month.",
    pmThinking: {
      problemFraming: "The initial brief was 'build a competitor analysis tool.' Through stakeholder interviews with Flex's Strategy and Sales teams, we discovered the real problem: analysts weren't lacking data — they were drowning in it. The actual need was synthesis, not search. This reframing changed our product from a document search engine to a conversational intelligence platform.",
      keyTradeoffs: "Hybrid RAG + web search vs. RAG-only: RAG alone returned stale data (filings are quarterly), web search alone lacked proprietary context. We chose the harder path of combining both with source attribution. Also chose Claude over GPT-4 for cost — at $20-50/month total budget, every API call mattered.",
      whatWeDidntBuild: "Cut automated email alerts, competitor SWOT generator, and PowerPoint export. The team wanted all 12 features in 12 weeks. I led the decision to ship core conversational RAG first and validate with users before building more. Three features were permanently cut after user testing showed they weren't needed.",
      crossFunctional: "Leading a 4-person team across frontend, backend, and data engineering. Running weekly demos for Flex stakeholders in Sales, Strategy, and Executive teams. Managing sprint planning, backlog prioritization, and API-first coordination between team members.",
    },
    impact: [
      "~405 documents indexed across 5 target companies (Flex, Jabil, Celestica, Benchmark, Sanmina)",
      "Hybrid RAG + web search with conversation memory for natural follow-up queries",
      "Auto-ingestion of SEC filings (daily), patents (weekly), job postings (daily)",
      "~$20-50/month total cost — all free-tier infrastructure with Claude API as only paid service",
      "(In progress — user testing and metric collection ongoing)",
    ],
    challengesOvercome: [
      {
        obstacle: "Scope creep — team wanted to build 12 features in 12 weeks",
        resolution: "Cut 3 planned features to ship core RAG chat first. Established 'working demo every Friday' rule to keep the team focused on shippable increments.",
      },
      {
        obstacle: "Financial documents (10-Ks) broke with naive text chunking — tables and CapEx figures lost context",
        resolution: "Implemented domain-aware chunking that preserves table structures and keeps related financial metrics in the same chunk. Improved retrieval relevance significantly for CapEx queries.",
      },
    ],
    learnings: [
      "Leading a 4-person team requires ruthless scope prioritization — the hardest PM skill is saying 'no' to good ideas.",
      "API-first development (define endpoints before building) eliminated most frontend-backend integration issues.",
      "Hybrid search (RAG + web) is significantly more useful than either alone for competitive intelligence workflows.",
    ],
  },
  {
    id: "nazava-shopee",
    title: "Nazava × Shopee Sales Optimization",
    company: "Analytics Showdown 2025 — Santa Clara University",
    oneLiner: "Forecasting models that won 1st Prize by translating analytics into promotion strategy",
    category: "Analytics",
    status: "Completed",
    timeline: "Nov 2024",
    role: "Analytics Lead — 3-person team",
    image: "/projects/nazava.png",
    tech: ["Python", "Tableau", "Scikit-learn", "Pandas", "XGBoost", "K-means"],
    heroMetrics: [
      { value: "87%", label: "Decision Speed Gain" },
      { value: "1st", label: "Prize Won" },
      { value: "84%", label: "Forecast Accuracy" },
      { value: "100+", label: "Audience at Final" },
    ],
    challenge:
      "Nazava Water Filters lacked data-driven promotion strategy on Shopee marketplace. Unclear which timing, discounts, or campaigns actually drove sales. Competing with 1,000+ sellers in the same category, with no forecasting tools and decisions made on gut feel. Led to stockouts, excess inventory, and missed revenue opportunities.",
    approach:
      "Owned the predictive modeling pipeline, Tableau dashboard design, and final presentation to a panel of 6 judges and 100+ audience. Made the strategic decision to lead with business impact rather than model accuracy in our presentation — framing every metric in terms of revenue gained or cost saved rather than statistical measures.",
    solution:
      "Predictive demand model (XGBoost) that captured non-linear patterns from flash sales better than traditional ARIMA. Customer segmentation (K-means clustering) for targeted marketing. Pricing elasticity analysis with actionable discount recommendations. Real-time Tableau dashboard for KPI tracking. Delivered a complete playbook for Shopee campaign optimization.",
    pmThinking: {
      problemFraming: "Most teams at the competition led with model accuracy. We reframed: Nazava doesn't care about R² — they care about 'when should I run my next Shopee promotion and at what discount?' This made us build a decision tool, not a forecasting model.",
      keyTradeoffs: "XGBoost vs. ARIMA: ARIMA was simpler to explain but couldn't capture flash sale non-linearity (62% accuracy). We chose XGBoost knowing it's harder to interpret, then invested the saved accuracy into better business storytelling. Also chose 3 high-impact insights over 10 mediocre ones for the final presentation.",
      whatWeDidntBuild: "Scoped out real-time pricing optimization, competitor price scraping, and automated Shopee ad bidding. Each would have diluted our core message. The competition was 24 hours — ruthless prioritization was the differentiator.",
      crossFunctional: "Led a 3-person team. Owned the modeling pipeline and presentation strategy. Coordinated with teammates on data cleaning and visualization. Presented findings to 6 industry judges and 100+ audience members.",
    },
    impact: [
      "87% improvement in promotion decision speed — from weeks of analysis to hours",
      "1st Prize — Analytics Showdown 2025 at Santa Clara University",
      "84% demand forecast accuracy using XGBoost (vs 62% with ARIMA baseline)",
      "Presented insights to 100+ attendees and 6 industry judges",
    ],
    challengesOvercome: [
      {
        obstacle: "First draft of our presentation was too technical — model metrics without business context",
        resolution: "Completely reframed around business storytelling: every metric translated to revenue impact. Instead of 'R² = 0.84', we said '84% accuracy means Nazava can reduce stockouts by X%. This approach won the competition.",
      },
      {
        obstacle: "Shopee sales data had extreme non-linearity from flash sales events that broke ARIMA models",
        resolution: "Switched to XGBoost which captured interaction effects between promotions, seasonality, and competitor pricing. Accuracy jumped from 62% to 84%.",
      },
    ],
    learnings: [
      "The best analytics bridges statistical rigor with business storytelling — judges cared about revenue impact, not R² scores.",
      "Competition environments force rapid prioritization — we focused on 3 high-impact insights rather than 10 mediocre ones.",
      "Forecasting models need business context: a technically perfect model that doesn't drive decisions is useless.",
    ],
    testimonial: {
      quote: "Your team's ability to translate complex forecasting models into actionable business recommendations stood out. The presentation demonstrated mature product thinking.",
      author: "Judge Panel",
      role: "Analytics Showdown 2025",
    },
  },
  {
    id: "post-release-optimizer",
    title: "Post-Release Optimizer",
    company: "Personal Project",
    oneLiner: "AI chatbot that turns 188K track dataset into personalized release strategies for artists",
    category: "AI/ML",
    status: "Completed",
    timeline: "Dec 2025",
    role: "Sole Developer & Product Owner",
    image: "/projects/post-release.png",
    github: "https://github.com/sjagannathan17/spotify-track-optimizer",
    tech: ["Python", "NLP", "LLMs", "Pandas", "Streamlit"],
    heroMetrics: [
      { value: "188K+", label: "Tracks Analyzed" },
      { value: "15+", label: "Query Types" },
    ],
    challenge:
      "Independent artists and small labels lack data-driven tools for post-release strategy. After dropping a song, they have no systematic way to analyze comparable releases, identify playlist targets, or time promotional pushes — missing momentum during the critical first-week window.",
    approach:
      "Made the deliberate product decision to build a conversational interface rather than a dashboard. Artists think in questions ('What playlists should I target for my indie-pop track?'), not in charts. This insight drove the entire architecture toward an NLP-powered chatbot.",
    solution:
      "AI chatbot that ingests 188,000+ tracks and generates personalized post-release strategies. NLP entity extraction for genre, mood, and tempo matching. Recommendation engine for playlist targeting, social media timing, audience segments, and promotional spend allocation. Streamlit interface for rapid iteration.",
    pmThinking: {
      problemFraming: "The initial idea was a Spotify analytics dashboard. Through conversations with independent artists, I learned they don't think in charts — they think in questions: 'What playlists should I target?' 'When should I push on Instagram?' This insight pivoted the entire product from dashboard to conversational interface.",
      keyTradeoffs: "Conversational AI vs. traditional dashboard: dashboards are easier to build but don't match how artists think. Chose the harder path of NLP-powered chat, accepting that some query types would be less precise than a filtered table. The friction reduction was worth the accuracy tradeoff.",
      whatWeDidntBuild: "Scoped out Spotify API integration for real-time streaming data, social media auto-posting, and A/B testing for release strategies. The core insight was that artists need strategy recommendations, not more data — so I focused exclusively on the recommendation engine.",
    },
    impact: [
      "188,000+ tracks analyzed across multiple platforms and genres",
      "15+ query types supported for personalized release strategies",
      "Natural language interface reduced friction for non-technical users",
    ],
    challengesOvercome: [
      {
        obstacle: "Music industry data was extremely messy — duplicate tracks, inconsistent metadata, missing fields",
        resolution: "Built a deduplication pipeline and normalization layer. Significant effort but essential — garbage in, garbage out applies especially to recommendation systems.",
      },
    ],
    learnings: [
      "Conversational interfaces beat dashboards when users think in questions, not metrics.",
      "Domain-specific chatbots benefit enormously from structured data backends rather than relying purely on LLM knowledge.",
    ],
  },
  {
    id: "litlens",
    title: "LitLens — Literature Intelligence Platform",
    company: "Santa Clara University — GenAI Course",
    oneLiner: "Multi-agent research platform that synthesizes 10–50 papers into contradiction analysis, evidence scoring, and citation-ready literature reviews",
    category: "AI/ML",
    status: "Completed",
    timeline: "2025",
    role: "Sole Developer & Product Owner",
    image: "/projects/litlens-demo.png",
    github: "https://github.com/sjagannathan17/LitLens",
    tech: ["LangGraph", "LangChain", "GPT-4o-mini", "FAISS", "React", "FastAPI", "OpenAI Embeddings", "Python"],
    heroMetrics: [
      { value: "8", label: "Specialized Agents" },
      { value: "$0.01", label: "Per Analysis Cost" },
      { value: "6", label: "Analysis Tabs" },
      { value: "RAG", label: "Grounded Chat" },
    ],
    challenge:
      "PhD students and academic researchers spend weeks manually synthesizing 10–50 research papers — reading each one, tracking contradictions across studies, scoring evidence quality, and identifying literature gaps. No existing tool automates the full synthesis pipeline from PDF upload to citation-ready literature review draft.",
    approach:
      "Designed a multi-agent architecture where each agent specializes in one analytical task — ingestion, claim extraction, contradiction detection, methodology comparison, evidence scoring, gap analysis, and literature review generation. Made the key decision to use gpt-4o-mini across all agents for cost efficiency (~$0.01 per analysis) while parallelizing agent execution for speed.",
    solution:
      "Full-stack research platform with 8 LangGraph agents orchestrated in a parallel pipeline. Users upload PDFs via drag-and-drop, define their research question, and receive analysis across 6 tabs: Overview, Contradictions (with severity ratings), Methodology comparison, Evidence scoring (0–100), Gap analysis, and a thematic Literature Review draft. FAISS vector store with OpenAI embeddings powers a RAG chat for follow-up questions grounded in uploaded papers. React frontend with dark theme; FastAPI backend with 12-thread parallel ingestion.",
    pmThinking: {
      problemFraming: "Initial assumption was researchers needed 'better search across papers.' User interviews with PhD students revealed the real pain: not finding information, but synthesizing contradictions across 30+ papers and identifying what the field has missed. This shifted the product from search to automated synthesis.",
      keyTradeoffs: "8 specialized agents vs. 1 general agent: a single agent was simpler but produced inconsistent analysis quality across tasks. Chose multi-agent despite higher complexity because contradiction detection requires fundamentally different reasoning than gap analysis. Also chose gpt-4o-mini over gpt-4o — 10x cheaper, acceptable quality for structured extraction tasks.",
      whatWeDidntBuild: "Scoped out citation graph visualization, collaborative annotation, and journal submission formatting. Each was requested by early users, but none solved the core problem: 'Help me understand what 30 papers say, where they disagree, and what's missing.' Staying focused on synthesis kept the product coherent.",
    },
    impact: [
      "8 specialized LangGraph agents running in parallel pipeline for comprehensive analysis",
      "~$0.01–$0.07 per analysis run using gpt-4o-mini — accessible for student researchers",
      "6 analysis tabs: contradictions, methodology, evidence scoring, gaps, literature review, and RAG chat",
      "Parallel paper ingestion across 12 threads for fast processing of large paper sets",
    ],
    challengesOvercome: [
      {
        obstacle: "Single-agent approach couldn't handle the diverse analytical tasks — contradiction detection requires different reasoning than gap analysis",
        resolution: "Split into 8 specialized agents with LangGraph orchestration, running contradiction + methodology + evidence agents in parallel to reduce total analysis time.",
      },
      {
        obstacle: "Follow-up questions about papers required re-reading entire documents each time",
        resolution: "Built FAISS vector store with text-embedding-3-small to index all uploaded papers, enabling grounded RAG chat that retrieves relevant passages for each question.",
      },
    ],
    learnings: [
      "Multi-agent architectures shine when each subtask requires fundamentally different reasoning patterns — specialization beats generalization.",
      "Cost-per-query matters for academic tools — gpt-4o-mini at $0.01/analysis made the tool accessible to students who can't afford expensive API calls.",
      "Parallel agent execution is critical for user experience — sequential 8-agent pipelines would be unusably slow.",
    ],
    galleryImages: [
      { src: "/projects/litlens-demo.png", caption: "LitLens UI — drag-and-drop upload, research question input, and Synthesize / Discover / Draft workflow" },
      { src: "/projects/litlens-arch.png", caption: "System architecture — 8 LangGraph agents with FAISS vector store and OpenAI API" },
    ],
  },
  {
    id: "lending-club-ml",
    title: "Lending Club Loan Default Prediction",
    company: "Santa Clara University — ML/AI Course",
    oneLiner: "Ensemble ML pipeline predicting loan defaults across 887K loans with 0.80 AUC, using only pre-decision features to prevent data leakage",
    category: "AI/ML",
    status: "Completed",
    timeline: "2025",
    role: "ML Engineer — Team Project",
    image: "/projects/lending-club-models.png",
    github: "https://github.com/sjagannathan17/Lending-Club-ML-Analysis",
    tech: ["Python", "XGBoost", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    heroMetrics: [
      { value: "0.80", label: "Test AUC" },
      { value: "887K", label: "Loans Analyzed" },
      { value: "74", label: "Raw Features" },
      { value: "5", label: "Models Compared" },
    ],
    challenge:
      "Lending Club needs to predict which borrowers will default before approving loans. The dataset contains 887K loans with 74 features, but most features capture post-loan behavior (payment history, recoveries, balances) — using them would create data leakage and produce misleadingly high accuracy that fails in production.",
    approach:
      "Made the critical decision to exclude all post-loan features and use only information available at loan origination. This reduced the feature set dramatically but ensured the model would actually work in a real lending decision pipeline. Engineered domain-specific features and compared 5 model architectures with rigorous cross-validation.",
    solution:
      "End-to-end ML pipeline: feature selection based on domain knowledge (excluding post-loan data), ordinal encoding for sub_grade (A1=1 to G5=35) preserving risk order, target encoding for categorical variables, and engineered features like installment-to-income ratio, DTI × interest rate interaction, and delinquency flags. Trained 5 models (Logistic Regression, Decision Tree, Random Forest, Gradient Boosting, XGBoost) with GridSearchCV (10-fold CV, AUC scoring). Best performance: XGBoost/Ensemble at 0.80 AUC.",
    pmThinking: {
      problemFraming: "The naive framing was 'predict loan defaults with maximum accuracy.' The product framing is: 'predict defaults using only information available when a borrower applies.' This distinction — which features exist at decision time — is a product question disguised as a technical one. It's the difference between a research exercise and a deployable model.",
      keyTradeoffs: "Accuracy vs. production viability: using all 74 features gave 0.99 AUC (impressive but useless — post-loan features won't exist for new applicants). We chose 0.80 AUC with legitimate features over 0.99 with leaked data. Also chose ensemble averaging over stacking for interpretability — the lending team needs to explain decisions to regulators.",
      whatWeDidntBuild: "Didn't build a real-time scoring API, credit limit optimizer, or loan pricing engine. The assignment was prediction, but the product insight was: the most valuable contribution was proving which features are leaky, not maximizing AUC.",
    },
    impact: [
      "0.80 test AUC with XGBoost — using only pre-decision features (no data leakage)",
      "887K loans processed with engineered feature pipeline",
      "5 models benchmarked with 10-fold cross-validation and GridSearchCV",
      "Domain-aware feature engineering: installment-to-income ratio, DTI × interest rate, credit history length",
    ],
    challengesOvercome: [
      {
        obstacle: "Naive approach using all 74 features produced suspiciously high AUC (~0.99) due to data leakage from post-loan features",
        resolution: "Applied domain knowledge to identify and exclude all features that wouldn't be available at loan decision time. AUC dropped to 0.80 — a realistic, production-viable number.",
      },
      {
        obstacle: "High-cardinality categorical features (state, loan purpose) caused dimensionality explosion with one-hot encoding",
        resolution: "Used target encoding for categorical variables and ordinal encoding for sub_grade that preserved the inherent risk ordering (A1=lowest risk to G5=highest).",
      },
    ],
    learnings: [
      "Data leakage is the most dangerous pitfall in ML — a 0.99 AUC model that can't work in production is worse than useless.",
      "Domain knowledge for feature selection matters more than model complexity — knowing which features are available at decision time is a product question, not just a technical one.",
      "Feature engineering grounded in business logic (installment-to-income ratio) outperformed blindly throwing all features at the model.",
    ],
    galleryImages: [
      { src: "/projects/lending-club-models.png", caption: "Model comparison — Ensemble of top 3 models achieves 0.8049 AUC on held-out test set" },
    ],
  },
];

/* ────────────── Experience ────────────── */

export const experience = [
  {
    title: "Graduate Teaching Assistant — Operations & Supply Chain Management / Supply Chain Finance",
    company: "Santa Clara University",
    location: "Santa Clara, CA",
    period: "Jan 2026 – Present",
    bullets: [
      "Supporting Prof. Gangshu Cai across two graduate-level courses: ISBA 3300 (Operations & Supply Chain Management, MBA) and ISBA 2434 (Supply Chain Finance: Mechanism, Risk Analytics, and Technology)",
      "Facilitating discussions, providing academic support to 60+ students, and assisting with course materials",
      "Bridging supply chain theory with data-driven analytical frameworks covering operations strategy, financial risk, and emerging supply chain technologies",
    ],
  },
  {
    title: "Strategic Analytics Consultant (Practicum)",
    company: "Flex",
    location: "San Jose, CA",
    period: "Jan 2026 – Present",
    techStack: "Python, LangChain, Pinecone, GPT-4, FastAPI, Streamlit",
    bullets: [
      "Leading AI platform development for competitive intelligence, replacing 15+ hours/week of manual research with RAG-powered natural language queries across 405+ SEC filings",
      "Architected dual-model RAG pipeline using GPT-4 for synthesis and specialized embeddings for retrieval, achieving sub-2 second query latency",
      "Leading 4-person cross-functional team through API-first development with weekly sprint milestones",
      "Conducting stakeholder interviews across Sales, Strategy, and Executive teams to align product roadmap",
      "Building competitive moat through proprietary data integration and custom NLP pipelines",
    ],
  },
  {
    title: "Engineer — Product & Data Analytics",
    company: "iGreenData",
    location: "Bengaluru, India",
    period: "Sep 2021 – Jan 2024",
    techStack: "Python, SQL, Tableau, Power BI, Confluence, JIRA",
    bullets: [
      "Led product analytics for ANZ Bank's Real-Time Gross Settlement (RTGS) payment systems across 5 Pacific island nations (Fiji, Vanuatu, Samoa, Solomon Islands, Papua New Guinea)",
      "Conducted user research across Pacific regulators and banks — mobile-money integration drove 60% of transaction volume, fundamentally changing product strategy",
      "Built 10+ executive dashboards in Tableau and Power BI tracking 50+ KPIs including transaction velocity, settlement times, and failure rates — increased decision speed by 30%",
      "Partnered with Product and Engineering teams to define feature strategy using Agile/Scrum. Automated ETL data pipelines, cutting manual reporting from 40 hours/month to 8 hours",
      "Primary liaison between ANZ Australia HQ, Pacific central banks, and regulatory bodies — translating technical requirements across diverse stakeholders",
    ],
  },
];

export const education = [
  {
    degree: "Master of Science in Business Analytics",
    school: "Santa Clara University, Leavey School of Business",
    period: "Sep 2024 – Dec 2026",
    gpa: "3.9",
    coursework: "Generative AI for Enterprises, AI/ML Applications, Deep Learning, Natural Language Processing, Product Management, Database Management Systems",
    extras: "Graduate Teaching Assistant for ISBA 3300: Operations Management (Fall 2025, Winter 2026). Supporting 60+ students under Professor Gangshu Cai for Supply Chain Finance: Mechanism, Risk Analytics, and Technology.",
    availability: "Available May through September 2026 for internships.",
  },
  {
    degree: "Bachelor of Engineering in Electrical & Electronics Engineering",
    school: "SSN College of Engineering",
    period: "2014 – 2018",
    location: "Chennai, India",
    extras: "Foundation in embedded systems and signal processing that now helps understand AI model architectures and deployment constraints.",
  },
];

export const recognition = [
  {
    title: "1st Prize — Analytics Showdown 2025",
    org: "Santa Clara University",
    description: "Competed against 12 teams analyzing Shopee e-commerce data. Delivered 87% improvement in decision speed. Presented to 100+ attendees and 6 industry judges.",
  },
  {
    title: "ANZ Payments Technology Domain Award",
    org: "iGreenData, 2023",
    description: "Recognized for cross-functional leadership coordinating RTGS system launches across Fiji, Vanuatu, and Samoa central banks.",
  },
  {
    title: "Star Performer Award",
    org: "iGreenData, 2022 & 2023",
    description: "Top 5% of 200+ employees. Recognized for consistently exceeding KPIs and driving high-impact projects.",
  },
];
