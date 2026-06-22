export enum AISpecialization {
  GENERATIVE_AI = "Generative AI Developer",
  ML_ENGINEER = "Machine Learning Engineer",
  DATA_SCIENTIST = "Data Scientist / Prompt Engineer",
  RESEARCH_SCIENTIST = "NLP or Computer Vision Researcher",
  AI_PRODUCT_MANAGER = "AI Product Manager",
  AI_ETHICIST = "AI Safety & Ethics Consultant"
}

export interface RegisterFormValues {
  // Step 1: Account
  fullName: string;
  email: string;
  password?: string;
  agreeToTerms?: boolean;

  // Step 2: AI Profile Builder
  coreRole: AISpecialization;
  skills: string; // Comma separated raw input
  bio: string;
  resumeFileName?: string;
  resumeText?: string;

  // Step 3: Work Prefs
  expectedSalary: number; // in thousand dollars e.g. 140 = $140,000/yr
  preferredWorkType: "Remote" | "Hybrid" | "Onsite";
  availability: "Immediate" | "1 month" | "2 months";
}

export interface AIResponseBio {
  success: boolean;
  enhancedBio: string;
  suggestedBulletPoints?: string[];
  error?: string;
}

export interface AIResponseAnalysis {
  success: boolean;
  score: number; // 0 to 100 representing job portal readiness score
  suggestedRoles: string[];
  identifiedSkills: string[];
  skillsGap: string[];
  personalizedAdvice: string;
  error?: string;
}

export interface DemoJobMatch {
  title: string;
  company: string;
  logo: string;
  salary: string;
  matchScore: number;
}
