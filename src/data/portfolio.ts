export type Tone = "cobalt" | "teal" | "amber" | "forest" | "rose";

export interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  url: string;
  initial: string;
  tone: Tone;
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: "mail" | "phone" | "github" | "linkedin";
  external: boolean;
}

export const SITE = {
  name: "Bradley Gichuru",
  altName: "Bradley Kabecha",
  role: "Full-stack developer",
  title: "Bradley Gichuru — Portfolio OS",
  description:
    "An interactive Portfolio OS for Bradley Gichuru, a full-stack developer building web and mobile products: a macOS-style desktop on larger screens and an iOS-style home screen on phones. Open Work, read About, try the Terminal, or say hello.",
  email: "bradleygichuru@gmail.com",
  phone: "+254 768 085 236",
  phoneHref: "tel:+254768085236",
  github: "https://github.com/bradleygichuru",
  linkedin: "https://www.linkedin.com/in/bradley-kabecha-830678235/",
  os: "Portfolio OS 1.0",
};

export const ABOUT_BODY = [
  "I’m Bradley Kabecha, a full-stack developer specializing in web development. I build products that solve real problems, from music analytics platforms to event ticketing systems.",
  "Technology keeps evolving, and I stay receptive to change and willing to learn more as it evolves. I work across web and mobile, from the interface to the data and the details that make a product hold together.",
];

export const VITALS = [
  { label: "Role", value: "Full-stack developer" },
  { label: "Focus", value: "Web & mobile products" },
  { label: "Toolkit", value: "React · TypeScript · Node.js · Go" },
];

export const PROJECTS: Project[] = [
  {
    id: "newwell",
    name: "Newwell",
    type: "Music analytics",
    description: "Music aggregation and artist music analytics platform.",
    url: "https://web.newwell.app/",
    initial: "N",
    tone: "teal",
  },
  {
    id: "hizitickets",
    name: "Hizitickets",
    type: "Ticketing",
    description:
      "Event ticket vending systems — a modern ticketing platform for events and venues.",
    url: "https://hizitickets.com",
    initial: "H",
    tone: "rose",
  },
  {
    id: "towingguru",
    name: "Towing Guru",
    type: "Price estimator",
    description:
      "A price estimator for a small towing company based in the US.",
    url: "https://towingguru.net/",
    initial: "T",
    tone: "amber",
  },
  {
    id: "budgetlite",
    name: "Budgetlite",
    type: "Personal finance",
    description:
      "An expense tracker and budgeting app tailored for the East African market.",
    url: "https://budgetlite-nextjs.vercel.app/",
    initial: "B",
    tone: "forest",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "interface",
    label: "Interface",
    items: ["React", "TypeScript", "Vue", "Tailwind CSS", "Flutter", "React Native"],
  },
  {
    id: "services",
    label: "Services",
    items: ["Node.js", "Python", "Go", "GraphQL"],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    items: ["Docker", "AWS", "Linux"],
  },
  {
    id: "data",
    label: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
];

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: "mail",
    external: false,
  },
  {
    id: "phone",
    label: "Phone",
    value: SITE.phone,
    href: SITE.phoneHref,
    icon: "phone",
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/bradleygichuru",
    href: SITE.github,
    icon: "github",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/bradley-kabecha",
    href: SITE.linkedin,
    icon: "linkedin",
    external: true,
  },
];

export const projectById = (id: string): Project | undefined =>
  PROJECTS.find((project) => project.id === id);
