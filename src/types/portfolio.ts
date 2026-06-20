export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface PersonalDetails {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  socials: SocialLinks;
  resumeUrl?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  level: number; // 1-100 or 1-5
  category: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  details?: string;
}

export interface SwarmParams {
  macroRadius: number;
  microRadius: number;
  pLoops: number;
  qTwists: number;
  blocks: number;
  length: number;
  size: number;
  stagger: number;
  twist: number;
  flow: number;
}

export interface ResearchPublication {
  title: string;
  authors: string;
  journal: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  period: string;
}
