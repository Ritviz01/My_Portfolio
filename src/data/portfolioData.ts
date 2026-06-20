import type { PersonalDetails, WorkExperience, SkillCategory, ProjectItem, Education, SwarmParams, ResearchPublication, Certification } from '../types/portfolio';

export const personalDetails: PersonalDetails = {
  name: "Ritviz Tiwari",
  role: "Data Analyst",
  tagline: "Leveraging Python, statistical modelling, and ETL pipelines to resolve complex data challenges and co-author AI research.",
  bio: "I am a Computer Science & Engineering student passionate about data analysis, machine learning, and evidence-based reporting. I specialize in unravelling insights from large, heterogeneous datasets and building interactive data pipelines. In addition to engineering custom visualization dashboards, I conduct peer-reviewed research in AI and Cybersecurity.",
  location: "Jaipur, India",
  socials: {
    github: "https://github.com/Ritviz01",
    linkedin: "https://www.linkedin.com/in/ritviz-tiwari-a26111289/",
    email: "ritviztiwari07@gmail.com"
  },
  resumeUrl: "/Ritviz_Tiwari_Resume_Optimized.docx"
};

export const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["Python (NumPy, Pandas)", "SQL", "R (Basic)", "C", "C++"]
  },
  {
    title: "Statistical & Analytical Methods",
    skills: ["Descriptive Statistics", "Regression Analysis", "Hypothesis Testing", "Exploratory Data Analysis (EDA)", "Data Wrangling"]
  },
  {
    title: "BI & Visualization Tools",
    skills: ["Power BI (DAX, Power Query)", "M Language", "Microsoft Excel", "Pivot Tables & VLOOKUP"]
  },
  {
    title: "Data Pipeline & Cloud",
    skills: ["MySQL Databases", "ETL Processes", "Data Integration", "Feature Engineering", "OCI Fundamentals (Oracle)"]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "uber-analytics",
    title: "Uber Trip Analytics Dashboard",
    description: "An end-to-end data pipeline integrating and organizing 50,000+ raw trip records; mapped demand patterns and driver utilization metrics.",
    longDescription: "Performed data cleaning, outlier removal, and datetime feature engineering. Used exploratory data analysis and statistical profiling to outline high-revenue routes. Created a multi-page Power BI dashboard with dynamic slicers for operational decision support.",
    technologies: ["Python", "Pandas", "Power BI", "Excel", "DAX", "EDA"],
    githubUrl: "https://github.com/Ritviz01/Uber_Dashboard",
    liveUrl: "#"
  },
  {
    id: "edtech-analytics",
    title: "EdTech Startup Dashboard",
    description: "Engineered normalization models on a 45-column heterogeneous dataset; isolated academic KPI categories using DAX.",
    longDescription: "Scripted custom M Language functions to parse duration fields and unpivot multi-instructor arrays. Built a multi-layered dashboard deployed to Power BI Service for live web embedding. Uncovered statistically significant engagement correlations.",
    technologies: ["Power BI", "Power Query", "DAX", "M Language", "Data Normalisation"],
    githubUrl: "https://github.com/Ritviz01/EdTech_Startup_Analysis_PowerBi_DashBoard",
    liveUrl: "#"
  }
];

export const experienceData: WorkExperience[] = [
  {
    id: "researcher",
    company: "Academic Peer-Reviewed Research",
    role: "AI & Cybersecurity Research Co-Author",
    period: "2025",
    description: [
      "Co-authored peer-reviewed research papers investigating AI & Machine Learning applications in cybersecurity frameworks.",
      "Researched methodologies for integrating Generative AI in modern web-based applications, exploring system efficiency and latency.",
      "Consolidated findings and drafted scientific manuscripts detailing experimental outcomes for computational journals."
    ],
    technologies: ["Generative AI", "Machine Learning", "System Security", "Technical Writing"]
  },
  {
    id: "projects-lead",
    company: "Independent Data Pipelines",
    role: "Data Analyst & Dashboard Developer",
    period: "2023 - Present",
    description: [
      "Developed robust ETL workflows integrating heterogeneous inputs, handling missing values, and executing data wrangling routines.",
      "Formulated custom DAX routines and unpivoted structured arrays to produce normalized dimensional schemas.",
      "Designed and deployed interactive dashboard solutions with Power BI Service for web embedding."
    ],
    technologies: ["Python", "Pandas", "Power BI", "DAX", "MySQL", "Excel"]
  }
];

export const educationData: Education[] = [
  {
    school: "Arya College of Engineering, Jaipur, India",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2023 – 2027",
    details: "CGPA: 8.5 / 10.0. Specializations in data analysis, machine learning algorithms, and object-oriented programming."
  }
];

export const publicationsData: ResearchPublication[] = [
  {
    title: "AI & Machine Learning in Cybersecurity",
    authors: "Saurav Kumar, Ritviz Tiwari, Piyush, Priyanshu Raj",
    journal: "VOL. 17, Issue 4",
    period: "December 2025"
  },
  {
    title: "Integration of Generative AI in Web-Based Applications",
    authors: "Saurav Kumar, Ritviz Tiwari, Piyush, Priyanshu Raj",
    journal: "VOL. 17, Issue 4",
    period: "December 2025"
  }
];

export const certificationsData: Certification[] = [
  {
    name: "Oracle Cloud Infrastructure (OCI) Fundamentals",
    issuer: "Oracle Cloud",
    period: "2024"
  },
  {
    name: "Fundamentals of Object-Oriented Programming - NPTEL",
    issuer: "NPTEL",
    period: "2025"
  }
];

// Swarm Parameter Configurations for Different Sections
export const defaultSwarmParams: SwarmParams = {
  macroRadius: 50,
  microRadius: 15,
  pLoops: 2,
  qTwists: 5,
  blocks: 350,
  length: 7.0,
  size: 2.5,
  stagger: 4.0,
  twist: 1.5,
  flow: 0.3
};

export const sectionPresets: Record<string, Partial<SwarmParams>> = {
  hero: {
    macroRadius: 50,
    microRadius: 15,
    pLoops: 2,
    qTwists: 5,
    twist: 1.5,
    flow: 0.3,
    size: 2.5,
    length: 7.0
  },
  about: {
    macroRadius: 65,
    microRadius: 25,
    pLoops: 3,
    qTwists: 3,
    twist: 3.0,
    flow: 0.15,
    size: 1.5,
    length: 12.0
  },
  skills: {
    macroRadius: 40,
    microRadius: 8,
    pLoops: 1,
    qTwists: 8,
    twist: 0.5,
    flow: 0.6,
    size: 3.5,
    length: 4.0
  },
  projects: {
    macroRadius: 75,
    microRadius: 12,
    pLoops: 4,
    qTwists: 6,
    twist: 4.0,
    flow: -0.2,
    size: 2.0,
    length: 9.0
  },
  experience: {
    macroRadius: 30,
    microRadius: 20,
    pLoops: 2,
    qTwists: 2,
    twist: 0.2,
    flow: 0.8,
    size: 1.8,
    length: 15.0
  },
  contact: {
    macroRadius: 15,
    microRadius: 5,
    pLoops: 2,
    qTwists: 10,
    twist: 5.0,
    flow: 1.2,
    size: 4.0,
    length: 2.0
  }
};
