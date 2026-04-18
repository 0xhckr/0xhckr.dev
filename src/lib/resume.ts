export type ResumeData = {
  experiences: Array<{
    title: string;
    company: string;
    years: { start: number; end: number | "Present" };
    description: string;
  }>;
  skills: Array<{
    category: string;
    name: string;
    isExpert: string;
  }>;
  education: {
    universityName: string;
    progression: string;
    degreeName: string;
    gpa?: string;
  } | null;
};

export const resumeData: ResumeData = {
  experiences: [
    {
      title: "intermediate software developer",
      company: "know history inc.",
      years: { start: 2022, end: "Present" },
      description:
        "full stack across the board — typescript and react on the frontend, dabbled with angular and vue when the job demanded it. backend, databases, os layer, dev ops, you name it. shipped solutions for heritage organizations, government bodies, and museums. wore a lot of hats. probably too many.",
    },
    {
      title: "junior software developer",
      company: "devfacto",
      years: { start: 2020, end: 2022 },
      description:
        "split between internal tooling and client work. mostly react with typescript on the front, c# holding it all together on the back. picked up graphql along the way.",
    },
    {
      title: "software engineer intern",
      company: "intuit",
      years: { start: 2019, end: 2019 },
      description:
        "built out parts of the table component for the intuit design system — accessibility, testing, the works. also shipped the new expenses workflow for quickbooks online. used by millions of people across canada.",
    },
    {
      title: "software engineer intern",
      company: "devfacto",
      years: { start: 2018, end: 2018 },
      description:
        "built a master detail view from scratch for a react native app because nothing good existed yet. shipped it to the app stores. the app worked great — client changed direction, quietly pulled it a year later. still counts.",
    },
  ],
  skills: [
    { category: "languages", name: "typescript", isExpert: "yes" },
    { category: "languages", name: "rust", isExpert: "no" },
    { category: "languages", name: "go", isExpert: "no" },
    { category: "languages", name: "swift", isExpert: "no" },
    { category: "languages", name: "c#", isExpert: "yes" },
    { category: "languages", name: "java", isExpert: "yes" },
    { category: "frameworks", name: "react", isExpert: "yes" },
    { category: "frameworks", name: "next.js", isExpert: "yes" },
    { category: "frameworks", name: "tailwind", isExpert: "yes" },
    { category: "frameworks", name: "angular", isExpert: "no" },
    { category: "frameworks", name: "vue", isExpert: "no" },
    { category: "frameworks", name: "react native", isExpert: "no" },
    { category: "frameworks", name: "convex", isExpert: "yes" },
    { category: "frameworks", name: "tauri", isExpert: "no" },
    { category: "frameworks", name: "electronjs", isExpert: "no" },
    { category: "frameworks", name: "clerk", isExpert: "no" },
    { category: "frameworks", name: "stripe", isExpert: "no" },
    { category: "frameworks", name: "plaid", isExpert: "no" },
    { category: "frameworks", name: "graphql", isExpert: "no" },
    { category: "frameworks", name: "spring boot", isExpert: "no" },
    { category: "frameworks", name: "storybook", isExpert: "yes" },
    { category: "databases", name: "pgsql", isExpert: "yes" },
    { category: "databases", name: "mongodb", isExpert: "no" },
    { category: "databases", name: "mssql", isExpert: "yes" },
    { category: "tools", name: "nix", isExpert: "yes" },
    { category: "tools", name: "docker", isExpert: "yes" },
    { category: "tools", name: "bun", isExpert: "yes" },
    { category: "tools", name: "pnpm", isExpert: "yes" },
    { category: "tools", name: "yarn", isExpert: "no" },
    { category: "tools", name: "git", isExpert: "yes" },
    { category: "tools", name: "linux", isExpert: "yes" },
    { category: "tools", name: "nodejs", isExpert: "yes" },
    { category: "tools", name: "css", isExpert: "yes" },
    { category: "tools", name: "css-in-js", isExpert: "no" },
    { category: "tools", name: "aws", isExpert: "no" },
    { category: "tools", name: "azure", isExpert: "yes" },
    { category: "tools", name: "github runners", isExpert: "yes" },
    { category: "tools", name: "self hosting", isExpert: "yes" },
  ],
  education: null,
};
