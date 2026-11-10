import type { AppId } from "./types";
import type { Project } from "../../data/portfolio";

export const B_PATH =
  "M18 12H53C78 12 94 27 94 48C94 62 86 73 74 78C89 83 101 96 101 117C101 142 83 158 56 158H18ZM44 38V68H53C62 68 68 61 68 53C68 45 62 38 53 38ZM44 84V132H56C66 132 73 125 73 108C73 94 66 84 56 84Z";

export function BMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 170"
      aria-hidden="true"
      className={`b-mark ${className}`}
      focusable="false"
    >
      <path d={B_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

export function AppIcon({ app, className = "" }: { app: AppId; className?: string }) {
  const common = { viewBox: "0 0 64 64", "aria-hidden": true as const, className: `app-icon ${className}` };

  if (app === "work") {
    return (
      <svg {...common}>
        <rect width="64" height="64" rx="14" fill="#2f7cf6" />
        <path d="M13 23.5h14l4.2 5.2H51a4 4 0 0 1 4 4V47a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4V23.5Z" fill="#f7faff" />
        <path d="M13 28h42v6H13z" fill="#d7e6ff" />
        <path d="M17 16h11l3.5 5H17a4 4 0 0 0-4 4v-5a4 4 0 0 1 4-4Z" fill="#8fb9ff" />
      </svg>
    );
  }

  if (app === "about") {
    return (
      <svg {...common}>
        <rect width="64" height="64" rx="14" fill="#ffd34d" />
        <rect x="14" y="8" width="36" height="48" rx="4" fill="#fffdf4" />
        <rect x="14" y="8" width="36" height="9" rx="4" fill="#ffe38a" />
        <g stroke="#c9b36a" strokeWidth="1.4" strokeLinecap="round">
          <path d="M21 26h22M21 31h22M21 36h17M21 41h22M21 46h13" />
        </g>
      </svg>
    );
  }

  if (app === "skills") {
    return (
      <svg {...common}>
        <rect width="64" height="64" rx="14" fill="#14171c" />
        <path d="M17 23l11 9-11 9" fill="none" stroke="#7ee787" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 41h13" stroke="#7ee787" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="48" cy="20" r="3" fill="#f2b45e" />
      </svg>
    );
  }

  if (app === "contact") {
    return (
      <svg {...common}>
        <rect width="64" height="64" rx="14" fill="#2f7cf6" />
        <rect x="13" y="19" width="38" height="26" rx="4" fill="#f7faff" />
        <path d="M14 22l18 13 18-13" fill="none" stroke="#2f7cf6" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M15 43l11-9M49 43l-11-9" stroke="#cfe1ff" strokeWidth="1.6" />
      </svg>
    );
  }

  if (app === "web") {
    return (
      <svg {...common}>
        <rect width="64" height="64" rx="14" fill="#f2f6fb" />
        <circle cx="32" cy="32" r="21" fill="#2f7cf6" />
        <circle cx="32" cy="32" r="15.5" fill="#f5f9ff" />
        <path d="M32 15.5l5.4 13.1L32 32l-5.4-3.4L32 15.5Z" fill="#ef5350" />
        <path d="M32 48.5l-5.4-13.1L32 32l5.4 3.4L32 48.5Z" fill="#5c9cff" />
        <circle cx="32" cy="32" r="2.4" fill="#1b2a38" />
      </svg>
    );
  }

  if (app === "readme") {
    return (
      <svg {...common}>
        <rect width="64" height="64" rx="14" fill="#eef3f8" />
        <rect x="14" y="8" width="36" height="48" rx="4" fill="#fffdf4" />
        <path d="M14 8h36v9H14z" fill="#dbe7f3" />
        <g stroke="#a9b4bf" strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 26h22M21 32h22M21 38h16M21 44h20" />
        </g>
        <path
          d={B_PATH}
          transform="translate(34 12) scale(.16)"
          fill="#0f4b4f"
          fillRule="evenodd"
        />
      </svg>
    );
  }

  if (app === "trash") {
    return (
      <svg {...common}>
        <rect width="64" height="64" rx="14" fill="#eef1f4" />
        <path d="M20 22h24l-2.5 31H22.5L20 22Z" fill="#cfd6de" stroke="#8a959f" strokeWidth="1.4" />
        <path d="M17 22h30" stroke="#6d7882" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 17h12" stroke="#6d7882" strokeWidth="3" strokeLinecap="round" />
        <g stroke="#9aa5af" strokeWidth="1.4">
          <path d="M27 29v18M32 29v18M37 29v18" />
        </g>
        <path d="M24 22l1.6 31M40 22l-1.6 31" stroke="#b9c2ca" strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect width="64" height="64" rx="14" fill="#0f4b4f" />
      <path
        d={B_PATH}
        transform="translate(16 9) scale(.27)"
        fill="#f3c17a"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function LaunchpadIcon() {
  const dots = [
    "#2f7cf6",
    "#34c759",
    "#ffcc00",
    "#ff5f57",
    "#8e6bd8",
    "#2bb7b0",
    "#f2b45e",
    "#9aa5af",
    "#2f7cf6",
  ];

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="app-icon">
      <rect width="64" height="64" rx="14" fill="#f1f4f8" />
      {dots.map((color, index) => {
        const column = index % 3;
        const row = Math.floor(index / 3);
        return (
          <rect
            key={`${color}-${index}`}
            x={15 + column * 12}
            y={15 + row * 12}
            width="9"
            height="9"
            rx="2.4"
            fill={color}
          />
        );
      })}
    </svg>
  );
}

export function ProjectGlyph({ project }: { project: Project }) {
  return (
    <span className={`project-glyph tone-${project.tone}`} aria-hidden="true">
      <span className="project-glyph-page" />
      <span className="project-glyph-letter">{project.initial}</span>
    </span>
  );
}

export function ReadmeGlyph() {
  return (
    <span className="readme-glyph" aria-hidden="true">
      <span className="readme-glyph-page" />
      <span className="readme-glyph-lines" />
      <svg className="readme-glyph-b" viewBox="0 0 120 170" aria-hidden="true">
        <path d={B_PATH} fill="currentColor" fillRule="evenodd" />
      </svg>
    </span>
  );
}

export function ContactGlyph() {
  return (
    <span className="contact-glyph" aria-hidden="true">
      <span className="contact-glyph-photo" />
      <span className="contact-glyph-lines" />
    </span>
  );
}
