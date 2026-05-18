import type { Experience } from "./profile";

// ─── Spanish experience data ────────────────────────────────────────────────

export const experiencesEs: Experience[] = [
  {
    company: "Santander Bank",
    role: "Associate Data Scientist",
    location: "Boston, MA",
    start: "Jun 2023",
    end: "Presente",
    current: true,
    bullets: [
      "Modelo CLTV que aumentó los depósitos promedio por campaña un 18%",
      "Aproximación de FICO que redujo consultas a bureaus un 60% e incorporó clientes sin historial al proceso de aprobación",
      "Microsegments Oracle: scoring de afinidad interpretable, +29% de lift en apertura de productos",
      "Modelo de uplift causal que aumentó adquisiciones de tarjetas un 15% con el mismo presupuesto",
      "Pipeline Snowflake + Streamlit para scoring mensual en toda la organización de marketing",
    ],
  },
  {
    company: "Meta (Facebook)",
    role: "Data Scientist Intern",
    location: "New York, NY",
    start: "May 2022",
    end: "Ago 2022",
    bullets: [
      "Análisis de retención de compradores en la pestaña de Instagram Shopping",
      "Identificación de los factores conductuales que impulsan la recompra",
      "3 de 5 recomendaciones incorporadas al roadmap del producto",
    ],
  },
  {
    company: "Hewlett-Packard",
    role: "Data Science Intern",
    location: "Boise, ID",
    start: "Ene 2021",
    end: "May 2021",
    bullets: [
      "Pronóstico de series temporales (AR, MA, ARIMA, SARIMA) para ventas de impresoras",
      "+27% de mejora en precisión de pronóstico",
      "Adoptado en más de 120 SKUs por el equipo de planificación de cadena de suministro",
    ],
  },
  {
    company: "Purdue University · Prof. Delp",
    role: "Research Assistant",
    location: "West Lafayette, IN",
    start: "Sep 2020",
    end: "Dic 2020",
    bullets: [
      "Visión por computadora: detección y segmentación de alimentos",
      "CNN desde cero → fine-tuning de ResNet-50",
      "Publicado en la Conferencia de Investigación de Purdue",
    ],
  },
  {
    company: "Purdue University · Prof. Ventresca",
    role: "Research Assistant",
    location: "West Lafayette, IN",
    start: "May 2020",
    end: "Ago 2020",
    bullets: [
      "Simulación basada en agentes de COVID-19 en R",
      "Evaluación de mascarillas, cierre de escuelas y teletrabajo como medidas de mitigación",
    ],
  },
];

// ─── Spanish education data ──────────────────────────────────────────────────

export const educationEs = [
  {
    school: "New York University",
    degree: "Máster en Ciencia de Datos",
    detail: "GPA 3.81",
    end: "May 2023",
  },
  {
    school: "Purdue University",
    degree: "Licenciatura en Ingeniería Industrial",
    detail:
      "GPA 3.64 · Énfasis en Investigación de Operaciones · Minor en Gestión Empresarial · Cert. en Ciencia de Datos Aplicada",
    end: "May 2021",
  },
  {
    school: "Stanford University · School of Engineering",
    degree: "Cursos de Verano",
    detail: "GPA 3.88 · IA, Algoritmos, C++",
    end: "Ago 2019",
  },
];

// ─── UI translations ─────────────────────────────────────────────────────────

export const t = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      eyebrow: "data scientist · open to Europe",
      h1_prefix: "I build models that",
      h1_accent: "move metrics.",
      bio: {
        intro: "I'm",
        p1: ", a Barcelona-born data scientist. I studied engineering at",
        p2: "and data science at",
        p3: ", then worked on time-series forecasting at",
        p4: ", experimentation and A/B testing at",
        p5: ", and now build models with the marketing and risk teams at",
        end: ".",
      },
      floatRole: "data scientist",
      floatNyu: "MS data science",
      floatPurdue: "engineering",
      viewProjects: "View projects",
      downloadResume: "Download resume",
    },
    about: {
      eyebrow: "01 · About",
      h2_line1: "Engineer by training,",
      h2_line2: "scientist by craft.",
      p1_before: "I grew up in Barcelona, studied",
      p1_hl1: "Industrial Engineering at Purdue",
      p1_mid: ", and earned an",
      p1_hl2: "M.S. in Data Science at NYU",
      p1_after:
        ". Today I work at Santander Bank in Boston, building models that reach millions of customers and decide where marketing dollars go.",
      p2_before: "The work I care about sits at the intersection of",
      p2_hl1: "causal inference",
      p2_sep: ",",
      p2_hl2: "predictive modeling",
      p2_after:
        "and the messy reality of shipping into production · A/B tests, monotonic constraints, conformal intervals, things that survive contact with risk and compliance.",
      p3_before: "I've also placed",
      p3_hl: "2nd at HackGPT NYC",
      p3_after:
        "for an LLM-powered therapist prototype, founded a consulting club at Purdue, and built prediction-market trading strategies as a side project. Always learning.",
      lab_languages: "Languages",
      lab_currently: "Currently",
    },
    experience: {
      eyebrow: "02 · Experience",
      headline: "A timeline of building things.",
    },
    skills: {
      eyebrow: "03 · Toolkit",
      headline: "Skills, education & awards.",
      skillsTitle: "Skills & Tools",
      educationTitle: "Education",
      awardsTitle: "Awards & Certifications",
      skillCategories: {
        Languages: "Languages",
        "ML & Stats": "ML & Stats",
        "Data & Cloud": "Data & Cloud",
        Visualization: "Visualization",
      } as Record<string, string>,
    },
    projects: {
      eyebrow: "04 · Projects",
      headline: "Selected work.",
      description: (n: number) =>
        `${n} projects across production ML, applied research, hackathons and personal experiments. Filter or dive into a case study.`,
      all: "All",
      work: "Work",
      personal: "Personal",
      research: "Research",
      showMore: (n: number) => `Show ${n} more projects →`,
      showLess: "Show less",
    },
    contact: {
      eyebrow: "05 · Contact",
      headline: "Have a problem worth modeling?",
      description:
        "I'm always interested in causal inference, ML at scale, and applied AI problems. Drop me a line · I read everything.",
    },
    footer: {
      built: "Built with Next.js, Tailwind & a lot of coffee ☕",
    },
    article: {
      allProjects: "All projects",
      onThisPage: "On this page",
      nextProject: "Next project",
      problem: "Problem",
      approach: "Approach",
      results: "Results",
      learnings: "Learnings",
      why: "Why:",
      chosen: "chosen",
    },
    notFound: {
      tagline: "Lost in latent space.",
      description: "That page doesn't exist (or doesn't exist yet).",
      backHome: "← Back home",
    },
  },

  es: {
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      skills: "Habilidades",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      eyebrow: "científico de datos · abierto a Europa",
      h1_prefix: "Construyo modelos que",
      h1_accent: "mueven métricas.",
      bio: {
        intro: "Soy",
        p1: ", un científico de datos nacido en Barcelona. Estudié ingeniería en",
        p2: "y ciencia de datos en",
        p3: ", luego trabajé en pronósticos de series temporales en",
        p4: ", experimentación y A/B testing en",
        p5: ", y ahora construyo modelos con los equipos de marketing y riesgo en",
        end: ".",
      },
      floatRole: "científico de datos",
      floatNyu: "Máster en datos",
      floatPurdue: "ingeniería",
      viewProjects: "Ver proyectos",
      downloadResume: "Descargar CV",
    },
    about: {
      eyebrow: "01 · Sobre mí",
      h2_line1: "Ingeniero de formación,",
      h2_line2: "científico por vocación.",
      p1_before: "Crecí en Barcelona, estudié",
      p1_hl1: "Ingeniería Industrial en Purdue",
      p1_mid: ", y obtuve un",
      p1_hl2: "Máster en Ciencia de Datos en NYU",
      p1_after:
        ". Hoy trabajo en Santander Bank en Boston, construyendo modelos que llegan a millones de clientes y deciden dónde van los presupuestos de marketing.",
      p2_before: "El trabajo que me apasiona está en la intersección de la",
      p2_hl1: "inferencia causal",
      p2_sep: ",",
      p2_hl2: "el modelado predictivo",
      p2_after:
        "y la realidad de poner código en producción · tests A/B, restricciones monótonas, intervalos conformales, cosas que sobreviven al contacto con riesgos y compliance.",
      p3_before: "También quedé",
      p3_hl: "2.º en HackGPT NYC",
      p3_after:
        "con un prototipo de terapeuta con LLM, fundé un club de consultoría en Purdue y construí estrategias de trading en mercados de predicción como proyecto personal. Siempre aprendiendo.",
      lab_languages: "Idiomas",
      lab_currently: "Actualmente",
    },
    experience: {
      eyebrow: "02 · Experiencia",
      headline: "Una línea de tiempo construyendo cosas.",
    },
    skills: {
      eyebrow: "03 · Herramientas",
      headline: "Habilidades, educación y premios.",
      skillsTitle: "Habilidades y herramientas",
      educationTitle: "Educación",
      awardsTitle: "Premios y certificaciones",
      skillCategories: {
        Languages: "Lenguajes",
        "ML & Stats": "ML y Estadística",
        "Data & Cloud": "Datos y Nube",
        Visualization: "Visualización",
      } as Record<string, string>,
    },
    projects: {
      eyebrow: "04 · Proyectos",
      headline: "Trabajo seleccionado.",
      description: (n: number) =>
        `${n} proyectos entre ML en producción, investigación aplicada, hackathons y experimentos personales. Filtra o profundiza en un caso de estudio.`,
      all: "Todos",
      work: "Trabajo",
      personal: "Personal",
      research: "Investigación",
      showMore: (n: number) => `Mostrar ${n} proyectos más →`,
      showLess: "Mostrar menos",
    },
    contact: {
      eyebrow: "05 · Contacto",
      headline: "¿Tienes un problema que vale la pena modelar?",
      description:
        "Siempre me interesan la inferencia causal, el ML a escala y los problemas de IA aplicada. Escríbeme · lo leo todo.",
    },
    footer: {
      built: "Hecho con Next.js, Tailwind y mucho café ☕",
    },
    article: {
      allProjects: "Todos los proyectos",
      onThisPage: "En esta página",
      nextProject: "Siguiente proyecto",
      problem: "Problema",
      approach: "Enfoque",
      results: "Resultados",
      learnings: "Aprendizajes",
      why: "Por qué:",
      chosen: "elegido",
    },
    notFound: {
      tagline: "Perdido en el espacio latente.",
      description: "Esa página no existe (o todavía no existe).",
      backHome: "← Volver al inicio",
    },
  },
} as const;
