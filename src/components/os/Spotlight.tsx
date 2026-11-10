import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Search } from "lucide-react";
import {
  CONTACT_CHANNELS,
  PROJECTS,
  SKILL_GROUPS,
} from "../../data/portfolio";
import { AppIcon, ProjectGlyph } from "./icons";
import { APP_NAMES, LAUNCHPAD_APPS } from "./types";
import type { AppId } from "./types";

interface SearchResult {
  id: string;
  kind: "Application" | "Project" | "Skill" | "Contact";
  title: string;
  subtitle: string;
  keywords: string;
  app?: AppId;
  project?: string;
  command?: string;
}

interface SpotlightProps {
  open: boolean;
  onClose: () => void;
  onOpen: (app: AppId, opts?: { project?: string; command?: string }) => void;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [
    ...LAUNCHPAD_APPS.map((app) => ({
      id: `app-${app}`,
      kind: "Application" as const,
      title: APP_NAMES[app],
      subtitle: APP_SUBTITLES[app] ?? "Application",
      keywords: `${APP_NAMES[app]} app application`.toLowerCase(),
      app,
    })),
    {
      id: "app-welcome",
      kind: "Application",
      title: "Welcome",
      subtitle: "Start here",
      keywords: "welcome home start",
      app: "welcome",
    },
    ...PROJECTS.map((project) => ({
      id: `project-${project.id}`,
      kind: "Project" as const,
      title: project.name,
      subtitle: `Work · ${project.type}`,
      keywords: `${project.name} ${project.type} ${project.description}`.toLowerCase(),
      project: project.id,
      app: "web" as const,
    })),
    ...SKILL_GROUPS.flatMap((group) =>
      group.items.map((skill) => ({
        id: `skill-${skill}`,
        kind: "Skill" as const,
        title: skill,
        subtitle: `Skill · ${group.label}`,
        keywords: `${skill} ${group.label} skills toolkit`.toLowerCase(),
        command: "skills",
        app: "skills" as const,
      })),
    ),
    ...CONTACT_CHANNELS.map((channel) => ({
      id: `contact-${channel.id}`,
      kind: "Contact" as const,
      title: channel.label,
      subtitle: `Contact · ${channel.value}`,
      keywords: `${channel.label} ${channel.value} contact`.toLowerCase(),
      app: "contact" as const,
    })),
  ];
  return results;
}

const APP_SUBTITLES: Record<string, string> = {
  work: "Projects and live work",
  about: "About Bradley",
  skills: "Skills and commands",
  contact: "Contact and channels",
  web: "Project pages",
  aboutMac: "System card",
  readme: "All work, skills, and contact",
  welcome: "Start here",
  trash: "Empty state",
};

const INDEX = buildIndex();

export function Spotlight({ open, onClose, onOpen }: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return INDEX.filter(
        (result) => result.kind === "Application",
      ).slice(0, 8);
    }
    return INDEX.filter(
      (result) =>
        result.title.toLowerCase().includes(q) || result.keywords.includes(q),
    ).slice(0, 9);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setSelected(0);
    const timer = globalThis.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      globalThis.clearTimeout(timer);
      triggerRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const openResult = (result: SearchResult | undefined) => {
    if (!result) return;
    if (result.app) {
      onOpen(result.app, {
        project: result.project,
        command: result.command,
      });
      onClose();
    }
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      closeRef.current?.focus();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((value) => Math.min(value + 1, Math.max(results.length - 1, 0)));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((value) => Math.max(value - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      openResult(results[selected]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="spotlight-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="spotlight"
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio search"
      >
        <div className="spotlight-field">
          <Search size={20} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            placeholder="Search apps, projects, skills"
            aria-label="Search apps, projects, skills, contact"
            role="combobox"
            aria-expanded="true"
            aria-controls="spotlight-results"
            aria-autocomplete="list"
            aria-activedescendant={
              results[selected] ? `spotlight-${results[selected].id}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
          />
          <span className="spotlight-hint" aria-hidden="true">
            Ctrl K
          </span>
          <button
            ref={closeRef}
            type="button"
            className="spotlight-close"
            aria-label="Close search"
            onClick={onClose}
            onKeyDown={(event: ReactKeyboardEvent<HTMLButtonElement>) => {
              if (event.key === "Escape") {
                event.preventDefault();
                onClose();
              }
              if (event.key === "Tab") {
                event.preventDefault();
                inputRef.current?.focus();
              }
            }}
          >
            Cancel
          </button>
        </div>

        <p className="visually-hidden" aria-live="polite">
          {results.length} {results.length === 1 ? "result" : "results"}
        </p>

        {results.length ? (
          <ul className="spotlight-results" id="spotlight-results" role="listbox" aria-label="Search results">
            {results.map((result, index) => (
              <li
                key={result.id}
                id={`spotlight-${result.id}`}
                role="option"
                aria-selected={selected === index}
                className={`spotlight-result ${selected === index ? "is-selected" : ""}`}
                onMouseEnter={() => setSelected(index)}
                onClick={() => openResult(result)}
              >
                <span className="spotlight-icon">
                  {result.project ? (
                    <ProjectGlyph project={PROJECTS.find((project) => project.id === result.project)!} />
                  ) : result.app ? (
                    <AppIcon app={result.app} />
                  ) : null}
                </span>
                <span className="spotlight-copy">
                  <span className="spotlight-title">{result.title}</span>
                  <span className="spotlight-subtitle">{result.subtitle}</span>
                </span>
                <span className="spotlight-kind">{result.kind}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="spotlight-empty">
            <p>No matches for “{query.trim()}”.</p>
            <p>Try Work, Newwell, React, or Mail.</p>
          </div>
        )}

        <div className="spotlight-foot">
          <span>↑↓ to navigate</span>
          <span>Enter to open</span>
          <span>Esc to close</span>
        </div>
      </section>
    </div>
  );
}
