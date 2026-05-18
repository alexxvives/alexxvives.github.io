export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string; // ISO-like for sort
  end: string;
  current?: boolean;
  bullets: string[];
  logo?: string;
};

export const experiences: Experience[] = [
  {
    company: "Santander Bank",
    role: "Associate Data Scientist",
    location: "Boston, MA",
    start: "Jun 2023",
    end: "Present",
    current: true,
    bullets: [
      "CLTV model that lifted average deposits per campaign by 18%",
      "FICO approximation that cut bureau pulls 60% and brought thin-file customers into approval",
      "Microsegments Oracle: white-box affinity scoring, +29% lift in product openings",
      "Causal uplift model that grew credit card acquisitions 15% at flat spend",
      "Snowflake + Streamlit pipeline for monthly scoring across the marketing org",
    ],
  },
  {
    company: "Meta (Facebook)",
    role: "Data Scientist Intern",
    location: "New York, NY",
    start: "May 2022",
    end: "Aug 2022",
    bullets: [
      "Buyer retention analysis on Instagram Shopping tab",
      "Identified behavioral drivers of repeat purchase",
      "3 of 5 recommendations adopted into the product roadmap",
    ],
  },
  {
    company: "Hewlett-Packard",
    role: "Data Science Intern",
    location: "Boise, ID",
    start: "Jan 2021",
    end: "May 2021",
    bullets: [
      "Time-series forecasting (AR, MA, ARIMA, SARIMA) for printer sales",
      "+27% forecast accuracy improvement",
      "Adopted across 120+ SKUs by supply-chain planning",
    ],
  },
  {
    company: "Purdue University · Prof. Delp",
    role: "Research Assistant",
    location: "West Lafayette, IN",
    start: "Sep 2020",
    end: "Dec 2020",
    bullets: [
      "Computer vision: food detection & segmentation",
      "CNN from scratch → ResNet-50 fine-tuning",
      "Published at Purdue Research Conference",
    ],
  },
  {
    company: "Purdue University · Prof. Ventresca",
    role: "Research Assistant",
    location: "West Lafayette, IN",
    start: "May 2020",
    end: "Aug 2020",
    bullets: [
      "Agent-based COVID-19 simulation in R",
      "Evaluated masks, school closures, WFH as mitigations",
    ],
  },
];

export const education = [
  {
    school: "New York University",
    degree: "M.S. in Data Science",
    detail: "GPA 3.81",
    end: "May 2023",
  },
  {
    school: "Purdue University",
    degree: "B.S. in Industrial Engineering",
    detail:
      "GPA 3.64 · Emphasis in Operations Research · Minor in Business Management · Cert. in Applied Data Science",
    end: "May 2021",
  },
  {
    school: "Stanford University · School of Engineering",
    degree: "Summer Coursework",
    detail: "GPA 3.88 · AI, Algorithms, C++",
    end: "Aug 2019",
  },
];

export const awards = [
  { title: "HackGPT · 2nd Place", year: "2023", detail: "LLM Hackathon, NYC" },
  { title: "Deloitte Case Competition · 1st Place", year: "2021", detail: "Undergraduate" },
  { title: "Laser Pulse Hackathon · 3rd Place", year: "2020", detail: "Venezuela Migration Crisis" },
  { title: "Stanford Machine Learning", year: "2020", detail: "Coursera" },
  { title: "Harvard Data Science with R", year: "2019", detail: "edX" },
  { title: "MIT Computational Thinking & Simulation", year: "2018", detail: "edX" },
];

export const skills = {
  Languages: ["Python", "SQL", "R", "C++"],
  "ML & Stats": [
    "XGBoost / LightGBM",
    "PyTorch",
    "Causal Inference",
    "Uplift Modeling",
    "A/B Testing",
    "Time Series",
    "Bayesian Methods",
  ],
  "Data & Cloud": ["Snowflake", "AWS", "Streamlit"],
  Visualization: ["Tableau", "Matplotlib", "Seaborn", "Power BI"],
};

export const human = {
  name: "Alexandre Vives",
  role: "Data Scientist",
  tagline:
    "Causal inference, predictive modeling and AI products that move business metrics.",
  location: "Boston, MA",
  origin: "Barcelona, Spain",
  openTo: "Open to roles across Europe",
  email: "alexxvives@gmail.com",
  phone: "+1 (917) 257-4883",
  github: "https://github.com/alexxvives",
  linkedin: "https://www.linkedin.com/in/alexandrevives/",
  resume: "/Alexandre_Vives_resume.pdf",
  languages: ["English (Proficient)", "Spanish (Native)", "Catalan (Native)", "French (Conversational)"],
};
