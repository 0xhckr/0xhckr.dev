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

export const resumeData: ResumeData = {
  profile:
    "Full-stack developer with 7 years experience specializing in TypeScript, C#, and the React ecosystem (Next.js, TanStack Router). Programming is both my profession and my hobby. I’m continuously exploring new technologies beyond work hours. Outside of development, I enjoy automotive projects, traveling, and discovering new restaurants with friends.",
  experiences: [
    {
      title: "Intermediate Software Developer",
      company: "Know History Inc.",
      years: { start: 2022, end: "Present" },
      description: [
        `Led technical infrastructure decisions and architected cloud-based solutions for multiple client projects Implemented CI/CD pipelines for production systems after senior developer departure, ensuring continuous deployment capabilities`,
        `Mentored junior developers and conducted in-depth code reviews, improving team code quality and development practices`,
        `Drove technology adoption and cost optimization by evaluating and implementing modern front-end frameworks and UI libraries`,
        `Served as technical lead for client demos and project estimates, representing development team in stakeholder meetings`,
        `Architected and maintained core internal systems and cross-project infrastructure components`,
      ],
      address: "Calgary, AB",
    },
    {
      title: "Junior Software Developer",
      company: "DevFacto",
      years: { start: 2020, end: 2022 },
      description: [
        `Developed core mobile app features for myASEBP including enhanced search functionality, benefit management interfaces, and accessibility improvements`,
        `Built internal automation tools that streamlined workflows and reduced manual processing time for development and operations teams`,
        `Collaborated on cross-functional teams to deliver mobile application updates and maintain high code quality standards`,
      ],
      address: "Edmonton, AB",
    },
    {
      title: "Software Engineer Intern",
      company: "Intuit",
      years: { start: 2019, end: 2019 },
      description: [
        `Contributed to QuickBooks Online as full-stack developer, implementing major workflow features used by millions of small business customers`,
        `Designed and developed reusable UI components for Intuit Design System, creating data table functionality deployed across all major Intuit products`,
        `Established comprehensive testing practices by implementing extensive unit test suites, significantly improving code coverage and system reliability`,
        `Worked in agile development environment collaborating with senior engineers on large-scale fintech applications`,
      ],
      address: "Edmonton, AB",
    },
    {
      title: "Software Engineer Intern",
      company: "DevFacto",
      years: { start: 2018, end: 2018 },
      description: [
        `Developed cross-platform mobile application using React Native for iOS and Android, delivering native performance across multiple device form factors`,
        `Engineered custom master-detail navigation component from scratch before industry-standard libraries existed, demonstrating problem-solving and innovation`,
        `Optimized application for tablet devices including iPad- specific UI/UX considerations and responsive design patterns`,
        `Helped implement automated build pipelines using Microsoft App Center for continuous integration and deployment across mobile platforms`,
      ],
      address: "Edmonton, AB",
    },
  ],
  skills: [
    { category: "Languages", name: "TypeScript", isExpert: true },
    { category: "Languages", name: "Rust", isExpert: false },
    { category: "Languages", name: "Go", isExpert: false },
    { category: "Languages", name: "Swift", isExpert: false },
    { category: "Languages", name: "C#", isExpert: true },
    { category: "Languages", name: "Java", isExpert: true },
    { category: "Frameworks", name: "React", isExpert: true },
    { category: "Frameworks", name: "Next.js", isExpert: true },
    { category: "Frameworks", name: "Tailwind", isExpert: true },
    { category: "Frameworks", name: "Angular", isExpert: false },
    { category: "Frameworks", name: "Vue", isExpert: false },
    { category: "Frameworks", name: "React Native", isExpert: false },
    { category: "Frameworks", name: "Convex", isExpert: true },
    { category: "Frameworks", name: "Tauri", isExpert: false },
    { category: "Frameworks", name: "ElectronJS", isExpert: false },
    { category: "Frameworks", name: "Clerk", isExpert: false },
    { category: "Frameworks", name: "Stripe", isExpert: false },
    { category: "Frameworks", name: "Plaid", isExpert: false },
    { category: "Frameworks", name: "GraphQL", isExpert: false },
    { category: "Frameworks", name: "Spring Boot", isExpert: false },
    { category: "Frameworks", name: "Storybook", isExpert: true },
    { category: "Databases", name: "PostgreSQL", isExpert: true },
    { category: "Databases", name: "MongoDB", isExpert: false },
    { category: "Databases", name: "MSSQL", isExpert: true },
    { category: "Tools", name: "Nix", isExpert: true },
    { category: "Tools", name: "Docker", isExpert: true },
    { category: "Tools", name: "Bun", isExpert: true },
    { category: "Tools", name: "pnpm", isExpert: true },
    { category: "Tools", name: "Yarn", isExpert: false },
    { category: "Tools", name: "Git", isExpert: true },
    { category: "Tools", name: "Linux", isExpert: true },
    { category: "Tools", name: "Node.js", isExpert: true },
    { category: "Tools", name: "CSS", isExpert: true },
    { category: "Tools", name: "CSS-in-JS", isExpert: false },
    { category: "Tools", name: "AWS", isExpert: false },
    { category: "Tools", name: "Azure", isExpert: true },
    { category: "Tools", name: "GitHub Runners", isExpert: true },
    { category: "Tools", name: "Self Hosting", isExpert: true },
  ].toSorted((a, b) => Number(b.isExpert) - Number(a.isExpert)),
  education: null,
};
