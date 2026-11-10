export type Theme = "light" | "dark";

export type AppId =
  | "welcome"
  | "work"
  | "about"
  | "skills"
  | "contact"
  | "web"
  | "aboutMac"
  | "trash";

export interface AppDef {
  id: AppId;
  name: string;
  menu: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const APP_DEFS: Record<AppId, AppDef> = {
  welcome: {
    id: "welcome",
    name: "Welcome",
    menu: "Welcome",
    title: "Welcome",
    x: 29.5,
    y: 18,
    w: 41,
    h: 46,
  },
  work: {
    id: "work",
    name: "Work",
    menu: "Work",
    title: "Work",
    x: 12,
    y: 10,
    w: 66,
    h: 64,
  },
  about: {
    id: "about",
    name: "Notes",
    menu: "Notes",
    title: "Notes — About",
    x: 18,
    y: 13,
    w: 54,
    h: 60,
  },
  skills: {
    id: "skills",
    name: "Terminal",
    menu: "Terminal",
    title: "Terminal — bradley",
    x: 14,
    y: 15,
    w: 58,
    h: 56,
  },
  contact: {
    id: "contact",
    name: "Mail",
    menu: "Mail",
    title: "Mail — Say hello",
    x: 15,
    y: 12,
    w: 62,
    h: 62,
  },
  web: {
    id: "web",
    name: "Web",
    menu: "Web",
    title: "Web",
    x: 12,
    y: 9,
    w: 68,
    h: 68,
  },
  aboutMac: {
    id: "aboutMac",
    name: "About This Portfolio",
    menu: "About This Portfolio",
    title: "About This Portfolio",
    x: 31,
    y: 20,
    w: 37,
    h: 42,
  },
  trash: {
    id: "trash",
    name: "Trash",
    menu: "Trash",
    title: "Trash",
    x: 30,
    y: 22,
    w: 37,
    h: 36,
  },
};

export const DOCK_APPS: AppId[] = ["work", "about", "skills", "contact", "web"];

export const LAUNCHPAD_APPS: AppId[] = [
  "work",
  "about",
  "skills",
  "contact",
  "web",
  "aboutMac",
];

export interface WindowState {
  id: string;
  app: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  project?: string;
  command?: string;
  commandId?: number;
}

export interface OpenOptions {
  project?: string;
  command?: string;
}

export const APP_NAMES: Record<AppId, string> = {
  welcome: "Welcome",
  work: "Work",
  about: "Notes",
  skills: "Terminal",
  contact: "Mail",
  web: "Web",
  aboutMac: "About This Portfolio",
  trash: "Trash",
};

export const MAXIMIZED = { x: 1, y: 3.6, w: 98, h: 88 };
