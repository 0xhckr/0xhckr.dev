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
      title: "Intermediate Software Developer",
      company: "Know History Inc.",
      years: { start: 2022, end: "Present" },
      description:
        "Full stack across the board - TypeScript and React on the frontend, dabbled with Angular and Vue when the job demanded it. Backend, databases, OS layer, DevOps, you name it. Shipped solutions for heritage organizations, government bodies, and museums. Wore a lot of hats. Probably too many.",
    },
    {
      title: "Junior Software Developer",
      company: "DevFacto",
      years: { start: 2020, end: 2022 },
      description:
        "Split between internal tooling and client work. Mostly React with TypeScript on the front, C# holding it all together on the back. Picked up GraphQL along the way.",
    },
    {
      title: "Software Engineer Intern",
      company: "Intuit",
      years: { start: 2019, end: 2019 },
      description:
        "Built out parts of the table component for the Intuit design system - accessibility, testing, the works. Also shipped the new expenses workflow for QuickBooks Online. Used by millions of people across Canada.",
    },
    {
      title: "Software Engineer Intern",
      company: "DevFacto",
      years: { start: 2018, end: 2018 },
      description:
        "Built a master detail view from scratch for a React Native app because nothing good existed yet. Shipped it to the app stores. The app worked great - client changed direction, quietly pulled it a year later. Still counts.",
    },
  ],
  skills: [
    { category: "Languages", name: "TypeScript", isExpert: "yes" },
    { category: "Languages", name: "Rust", isExpert: "no" },
    { category: "Languages", name: "Go", isExpert: "no" },
    { category: "Languages", name: "Swift", isExpert: "no" },
    { category: "Languages", name: "C#", isExpert: "yes" },
    { category: "Languages", name: "Java", isExpert: "yes" },
    { category: "Frameworks", name: "React", isExpert: "yes" },
    { category: "Frameworks", name: "Next.js", isExpert: "yes" },
    { category: "Frameworks", name: "Tailwind", isExpert: "yes" },
    { category: "Frameworks", name: "Angular", isExpert: "no" },
    { category: "Frameworks", name: "Vue", isExpert: "no" },
    { category: "Frameworks", name: "React Native", isExpert: "no" },
    { category: "Frameworks", name: "Convex", isExpert: "yes" },
    { category: "Frameworks", name: "Tauri", isExpert: "no" },
    { category: "Frameworks", name: "ElectronJS", isExpert: "no" },
    { category: "Frameworks", name: "Clerk", isExpert: "no" },
    { category: "Frameworks", name: "Stripe", isExpert: "no" },
    { category: "Frameworks", name: "Plaid", isExpert: "no" },
    { category: "Frameworks", name: "GraphQL", isExpert: "no" },
    { category: "Frameworks", name: "Spring Boot", isExpert: "no" },
    { category: "Frameworks", name: "Storybook", isExpert: "yes" },
    { category: "Databases", name: "PostgreSQL", isExpert: "yes" },
    { category: "Databases", name: "MongoDB", isExpert: "no" },
    { category: "Databases", name: "MSSQL", isExpert: "yes" },
    { category: "Tools", name: "Nix", isExpert: "yes" },
    { category: "Tools", name: "Docker", isExpert: "yes" },
    { category: "Tools", name: "Bun", isExpert: "yes" },
    { category: "Tools", name: "pnpm", isExpert: "yes" },
    { category: "Tools", name: "Yarn", isExpert: "no" },
    { category: "Tools", name: "Git", isExpert: "yes" },
    { category: "Tools", name: "Linux", isExpert: "yes" },
    { category: "Tools", name: "Node.js", isExpert: "yes" },
    { category: "Tools", name: "CSS", isExpert: "yes" },
    { category: "Tools", name: "CSS-in-JS", isExpert: "no" },
    { category: "Tools", name: "AWS", isExpert: "no" },
    { category: "Tools", name: "Azure", isExpert: "yes" },
    { category: "Tools", name: "GitHub Runners", isExpert: "yes" },
    { category: "Tools", name: "Self Hosting", isExpert: "yes" },
  ],
  education: null,
};
