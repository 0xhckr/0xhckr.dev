export type ResumeData = {
  profile: string;
  experiences: Array<{
    title: string;
    company: string;
    years: { start: number; end: number | "Present" };
    description: string | Array<string>;
    address?: string;
  }>;
  skills: Array<{
    category: string;
    name: string;
    isExpert: boolean;
  }>;
  education: {
    universityName: string;
    progression: string;
    degreeName: string;
    gpa?: string;
  } | null;
};
