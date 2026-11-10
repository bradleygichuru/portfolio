import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileText,
  Grid2x2,
  Inbox,
  List,
  Lock,
  Mail,
  PenLine,
  Search,
  Send,
  Trash2,
  Github,
  Linkedin,
  Phone,
} from "lucide-react";
import {
  ABOUT_BODY,
  CONTACT_CHANNELS,
  PROJECTS,
  SITE,
  SKILL_GROUPS,
  VITALS,
  projectById,
} from "../../data/portfolio";
import type { OpenOptions, Theme, WindowState } from "./types";
import { AppIcon, BMark, ProjectGlyph } from "./icons";
import { ReaderApp } from "./ReaderBody";

export interface AppActions {
  open: (app: import("./types").AppId, opts?: OpenOptions) => void;
  close: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface AppProps {
  window: WindowState;
  actions: AppActions;
  compact?: boolean;
}

const CHANNEL_ICONS = {
  mail: Mail,
  phone: Phone,
  github: Github,
  linkedin: Linkedin,
};

function SidebarApp({ app, label, active = false, onClick }: { app: import("./types").AppId; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`sidebar-item ${active ? "is-active" : ""}`}
      onClick={onClick}
    >
      <AppIcon app={app} className="sidebar-app-icon" />
      <span>{label}</span>
    </button>
  );
}

export function WelcomeApp({ actions }: Pick<AppProps, "actions">) {
  return (
    <div className="app welcome-app">
      <div className="welcome-grid">
        <BMark className="welcome-b" />
        <div className="welcome-copy">
          <h1>Bradley Gichuru</h1>
          <p className="welcome-role">Full-stack developer</p>
          <p className="welcome-lede">
            I build web and mobile products with modern technologies — and care
            about the details that make them matter.
          </p>
          <div className="welcome-actions">
            <button
              type="button"
              className="os-button os-button--primary"
              onClick={() => actions.open("work")}
            >
              Open Work
              <ArrowRight size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="os-button"
              onClick={() => actions.open("about")}
            >
              Read About
            </button>
            <button
              type="button"
              className="os-button"
              onClick={() => actions.open("contact")}
            >
              Say Hello
            </button>
          </div>
        </div>
      </div>
      <div className="welcome-recent" aria-label="Recent work">
        <span className="welcome-recent-label">Recent work</span>
        <div className="welcome-recent-list">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              type="button"
              className="welcome-recent-item"
              onClick={() => actions.open("web", { project: project.id })}
            >
              <ProjectGlyph project={project} />
              <span>{project.name}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="welcome-tip">
        <span className="welcome-tip-desktop">
          Portfolio OS 1.0 · Press Ctrl K (or Cmd K) to search · drag windows ·
          close with the red light.
        </span>
        <span className="welcome-tip-mobile">
          Open Work to browse projects. Use the dock to switch apps.
        </span>
      </p>
    </div>
  );
}

export function WorkApp({ actions, compact }: Pick<AppProps, "actions" | "compact">) {
  const [selected, setSelected] = useState(PROJECTS[0]!.id);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROJECTS;
    return PROJECTS.filter(
      (project) =>
        project.name.toLowerCase().includes(q) ||
        project.type.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q),
    );
  }, [query]);

  const project = projectById(selected) ?? PROJECTS[0]!;
  const openProject = (id: string) => actions.open("web", { project: id });

  return (
    <div className="app work-app">
      <div className="work-toolbar">
        <div className="work-nav">
          <button type="button" className="icon-button" disabled aria-label="Back">
            <ChevronLeft size={16} />
          </button>
          <button type="button" className="icon-button" disabled aria-label="Forward">
            <ChevronRight size={16} />
          </button>
        </div>
        <label className="work-search">
          <Search size={14} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search Work"
            aria-label="Search projects"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="view-toggle" role="group" aria-label="View">
          <button
            type="button"
            className={`icon-button ${view === "grid" ? "is-active" : ""}`}
            aria-pressed={view === "grid"}
            aria-label="Grid view"
            onClick={() => setView("grid")}
          >
            <Grid2x2 size={15} />
          </button>
          <button
            type="button"
            className={`icon-button ${view === "list" ? "is-active" : ""}`}
            aria-pressed={view === "list"}
            aria-label="List view"
            onClick={() => setView("list")}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      <div className="work-layout">
        <aside className="work-sidebar">
          <p className="sidebar-label">Favourites</p>
          <SidebarApp app="work" label="Work" active onClick={() => {}} />
          <SidebarApp app="about" label="Notes" onClick={() => actions.open("about")} />
          <SidebarApp app="skills" label="Terminal" onClick={() => actions.open("skills")} />
          <SidebarApp app="contact" label="Mail" onClick={() => actions.open("contact")} />
          <p className="sidebar-label">Projects</p>
          {PROJECTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar-project ${selected === item.id ? "is-active" : ""}`}
              onClick={() => setSelected(item.id)}
              onDoubleClick={() => openProject(item.id)}
            >
              <ProjectGlyph project={item} />
              <span>{item.name}</span>
            </button>
          ))}
        </aside>

        <div className="work-main">
          {filtered.length ? (
            <div className={`project-grid ${view === "list" ? "is-list" : ""}`}>
              {filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`project-tile ${selected === item.id ? "is-selected" : ""}`}
                  aria-label={
                    compact
                      ? `Open ${item.name} project`
                      : `Select ${item.name} project`
                  }
                  aria-pressed={compact ? undefined : selected === item.id}
                  onClick={() => {
                    setSelected(item.id);
                    if (compact) openProject(item.id);
                  }}
                  onDoubleClick={() => openProject(item.id)}
                >
                  <ProjectGlyph project={item} />
                  <span className="project-tile-name">{item.name}</span>
                  <span className="project-tile-type">{item.type}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="work-empty">No projects match “{query.trim()}”.</p>
          )}
        </div>

        <aside className="work-preview">
          <ProjectGlyph project={project} />
          <h2>{project.name}</h2>
          <p className="preview-type">{project.type}</p>
          <p className="preview-desc">{project.description}</p>
          <button
            type="button"
            className="os-button os-button--primary"
            onClick={() => openProject(project.id)}
          >
            Open project
          </button>
          <a
            className="os-button"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit live site
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </aside>
      </div>
    </div>
  );
}

export function NotesApp({ actions }: Pick<AppProps, "actions">) {
  return (
    <div className="app notes-app">
      <aside className="notes-sidebar">
        <p className="sidebar-label">Notes</p>
        <button type="button" className="sidebar-item is-active">
          <span className="note-dot" aria-hidden="true" />
          About Bradley
        </button>
        <p className="sidebar-label">On this desktop</p>
        <SidebarApp app="work" label="Work" onClick={() => actions.open("work")} />
        <SidebarApp app="skills" label="Terminal" onClick={() => actions.open("skills")} />
        <SidebarApp app="contact" label="Mail" onClick={() => actions.open("contact")} />
      </aside>
      <article className="note">
        <h2>About Bradley</h2>
        <p className="note-meta">Portfolio notes · {SITE.os}</p>
        <div className="note-body">
          {ABOUT_BODY.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className="note-vitals">
            {VITALS.map((vital) => (
              <div key={vital.label}>
                <dt>{vital.label}</dt>
                <dd>{vital.value}</dd>
              </div>
            ))}
          </dl>
          <button
            type="button"
            className="os-button os-button--primary"
            onClick={() => actions.open("contact")}
          >
            Say hello
          </button>
        </div>
      </article>
    </div>
  );
}

interface TermLine {
  id: number;
  kind: "comment" | "command" | "out" | "ok" | "err" | "node";
  node: ReactNode;
}

const appAliases: Record<string, import("./types").AppId> = {
  work: "work",
  files: "work",
  notes: "about",
  about: "about",
  terminal: "skills",
  skills: "skills",
  mail: "contact",
  contact: "contact",
  web: "web",
  browser: "web",
  trash: "trash",
  aboutmac: "aboutMac",
  readme: "readme",
  reader: "readme",
};

function lineIdFactory() {
  let id = 10;
  return () => id++;
}

export function TerminalApp({ window: win, actions }: AppProps) {
  const makeLineId = useRef(lineIdFactory());
  const [lines, setLines] = useState<TermLine[]>(() => [
    { id: 1, kind: "comment", node: <>Portfolio OS 1.0 — bradley@portfolio</> },
    { id: 2, kind: "out", node: <>Bradley Gichuru · Full-Stack Developer</> },
    {
      id: 3,
      kind: "out",
      node: (
        <>
          Type <b>help</b> for commands. Try <b>projects</b>, <b>skills</b>, or{" "}
          <b>open work</b>.
        </>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const runRef = useRef<(raw: string) => void>(() => {});

  const push = (...next: Omit<TermLine, "id">[]) => {
    setLines((current) => [
      ...current,
      ...next.map((line) => ({ ...line, id: makeLineId.current() })),
    ]);
  };

  const run = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    push({
      kind: "command",
      node: (
        <>
          <span className="term-prompt-inline">bradley@portfolio ~ %</span>{" "}
          {value}
        </>
      ),
    });
    setHistory((current) => [value, ...current].slice(0, 40));
    setHistoryIndex(-1);
    setInput("");

    const [command, ...rest] = value.split(/\s+/);
    const argument = rest.join(" ").trim();
    const cmd = command.toLowerCase();

    if (cmd === "help") {
      push({
        kind: "node",
        node: (
          <div className="term-help">
            <p>Available commands</p>
            <ul>
              <li><b>help</b> — this list</li>
              <li><b>whoami</b> — who is behind this desktop</li>
              <li><b>about</b> — the short bio</li>
              <li><b>skills</b> — the toolkit, grouped</li>
              <li><b>projects</b> — the four live projects</li>
              <li><b>contact</b> — email, phone, GitHub, LinkedIn</li>
              <li><b>ls</b> — what is on this machine</li>
              <li><b>open &lt;app|project&gt;</b> — open work, notes, mail, web, terminal, trash, or a project id</li>
              <li><b>cat README.md</b> — open the README app</li>
              <li><b>theme</b> — toggle light/dark</li>
              <li><b>date</b> — the clock</li>
              <li><b>clear</b> — clear this window</li>
              <li><b>exit</b> — close the terminal</li>
            </ul>
          </div>
        ),
      });
      return;
    }

    if (cmd === "whoami") {
      push({ kind: "ok", node: <>bradley — full-stack developer</> });
      return;
    }

    if (cmd === "about") {
      push({
        kind: "node",
        node: (
          <div className="term-about">
            {ABOUT_BODY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <dl>
              {VITALS.map((vital) => (
                <div key={vital.label}>
                  <dt>{vital.label}</dt>
                  <dd>{vital.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ),
      });
      return;
    }

    if (cmd === "skills") {
      push({
        kind: "node",
        node: (
          <div className="term-skills">
            {SKILL_GROUPS.map((group) => (
              <div key={group.id} className="term-skill-row">
                <span className="term-skill-label">{group.label}</span>
                <span>{group.items.join(" · ")}</span>
              </div>
            ))}
          </div>
        ),
      });
      return;
    }

    if (cmd === "projects") {
      push({
        kind: "node",
        node: (
          <div className="term-projects">
            {PROJECTS.map((project) => (
              <p key={project.id}>
                <b>{project.name}</b> <span>{project.type}</span>{" "}
                <span className="term-dim">— open {project.id}</span>
              </p>
            ))}
          </div>
        ),
      });
      return;
    }

    if (cmd === "contact") {
      push({
        kind: "node",
        node: (
          <div className="term-contact">
            {CONTACT_CHANNELS.map((channel) => (
              <p key={channel.id}>
                <span className="term-dim">{channel.label}</span>{" "}
                <a href={channel.href} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noopener noreferrer" : undefined}>
                  {channel.value}
                </a>
              </p>
            ))}
          </div>
        ),
      });
      return;
    }

    if (cmd === "ls") {
      push({ kind: "out", node: <>about/&nbsp;&nbsp;work/&nbsp;&nbsp;skills/&nbsp;&nbsp;contact/&nbsp;&nbsp;README.md</> });
      return;
    }

    if (cmd === "pwd") {
      push({ kind: "out", node: <> /Users/bradley/portfolio</> });
      return;
    }

    if (cmd === "date") {
      push({ kind: "out", node: <>{new Date().toString()}</> });
      return;
    }

    if (cmd === "theme") {
      const next = actions.theme === "dark" ? "light" : "dark";
      actions.setTheme(next);
      push({ kind: "ok", node: <>Appearance set to {next}.</> });
      return;
    }

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "sudo") {
      push({ kind: "err", node: <>bradley is not in the sudoers file. This incident will be reported.</> });
      return;
    }

    if (cmd === "echo") {
      push({ kind: "out", node: <>{argument || ""}</> });
      return;
    }

    if (cmd === "cat") {
      if (argument.toLowerCase() === "readme.md" || argument.toLowerCase() === "readme") {
        push({ kind: "ok", node: <>Opening README.md…</> });
        actions.open("readme");
        return;
      }
      push({ kind: "err", node: <>cat: {argument}: No such file</> });
      return;
    }

    if (cmd === "open") {
      if (!argument) {
        push({ kind: "err", node: <>usage: open &lt;work|notes|terminal|mail|web|trash|project-id&gt;</> });
        return;
      }
      const target = argument.toLowerCase();
      if (target === "reader" || target === "readme") {
        push({ kind: "ok", node: <>Opening README.md…</> });
        actions.open("readme");
        return;
      }
      const app = appAliases[target];
      if (app) {
        push({ kind: "ok", node: <>Opening {app === "about" ? "Notes" : app === "contact" ? "Mail" : app === "skills" ? "Terminal" : app === "work" ? "Work" : app === "web" ? "Web" : app}…</> });
        actions.open(app);
        return;
      }
      const project = PROJECTS.find((item) => item.id === target);
      if (project) {
        push({ kind: "ok", node: <>Opening {project.name} in Web…</> });
        actions.open("web", { project: project.id });
        return;
      }
      push({ kind: "err", node: <>open: {argument}: no such app or project</> });
      return;
    }

    if (cmd === "exit") {
      actions.close();
      return;
    }

    push({ kind: "err", node: <>command not found: {value}. Type 'help'.</> });
  };

  runRef.current = run;

  useEffect(() => {
    if (!win.command) return;
    runRef.current(win.command);
  }, [win.commandId, win.command]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  useEffect(() => {
    const timer = globalThis.setTimeout(() => inputRef.current?.focus(), 120);
    return () => globalThis.clearTimeout(timer);
  }, []);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      run(input);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? "");
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next] ?? "");
      }
      return;
    }
    if (event.key.toLowerCase() === "l" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className="app terminal-app" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-log" role="log" aria-live="polite" aria-label="Terminal output">
        {lines.map((line) => (
          <div key={line.id} className={`term-line term-${line.kind}`}>
            {line.kind === "command" ? (
              <span className="term-command">{line.node}</span>
            ) : (
              line.node
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="terminal-input-line">
        <span className="term-prompt-inline">bradley@portfolio ~ %</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal command input"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

export function MailApp() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2400);
    return () => window.clearTimeout(timer);
  }, [status]);

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(SITE.email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="app mail-app">
      <aside className="mail-sidebar">
        <p className="sidebar-label">Mailboxes</p>
        <button type="button" className="sidebar-item is-active">
          <Inbox size={15} aria-hidden="true" />
          Inbox
          <span className="sidebar-count">1</span>
        </button>
        <button type="button" className="sidebar-item">
          <Send size={15} aria-hidden="true" />
          Sent
        </button>
        <button type="button" className="sidebar-item">
          <FileText size={15} aria-hidden="true" />
          Drafts
        </button>
      </aside>

      <div className="mail-list">
        <div className="mail-list-head">
          <span>Inbox</span>
          <a
            className="mail-compose"
            href={`mailto:${SITE.email}?subject=Hello%20Bradley`}
          >
            <PenLine size={14} aria-hidden="true" />
            New
          </a>
        </div>
        <button type="button" className="mail-message is-active">
          <span className="mail-sender">Bradley Gichuru</span>
          <span className="mail-subject">Let’s build something</span>
          <span className="mail-preview">Interested in working together?</span>
          <span className="mail-date">Today</span>
        </button>
      </div>

      <article className="mail-read">
        <div className="mail-read-head">
          <div>
            <h2>Let’s build something</h2>
            <p className="mail-from">From Bradley Gichuru · {SITE.email}</p>
          </div>
          <a
            className="os-button os-button--primary"
            href={`mailto:${SITE.email}?subject=Hello%20Bradley`}
          >
            Reply
          </a>
        </div>
        <p className="mail-intro">
          Interested in working together or just want to say hi? Open a channel.
        </p>
        <div className="mail-channels">
          {CONTACT_CHANNELS.filter((channel) => channel.id !== "email").map((channel) => {
            const Icon = CHANNEL_ICONS[channel.icon];
            return (
              <a
                key={channel.id}
                className="mail-channel"
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
              >
                <span className="mail-channel-icon">
                  <Icon size={15} aria-hidden="true" />
                </span>
                <span className="mail-channel-copy">
                  <span className="mail-channel-label">{channel.label}</span>
                  <span className="mail-channel-value">{channel.value}</span>
                </span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            );
          })}
        </div>
        <div className="mail-actions">
          <button type="button" className="os-button" onClick={copyEmail}>
            {status === "copied" ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
            Copy email
          </button>
          {status === "copied" && (
            <span className="mail-copy-status" role="status">
              Copied to clipboard.
            </span>
          )}
          {status === "error" && (
            <span className="mail-copy-status is-error" role="status">
              Copy failed — select the address above.
            </span>
          )}
        </div>
      </article>
    </div>
  );
}

export function WebApp({ window: win, actions }: AppProps) {
  const project = win.project ? projectById(win.project) : undefined;

  return (
    <div className="app web-app">
      <div className="browser-bar">
        <div className="browser-nav">
          <button
            type="button"
            className="icon-button"
            aria-label="Back to start page"
            disabled={!project}
            onClick={() => actions.open("web")}
          >
            <ArrowLeft size={15} />
          </button>
          <button type="button" className="icon-button" aria-label="Forward" disabled>
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="browser-address">
          <Lock size={11} aria-hidden="true" />
          <span>
            bradleygichuru.github.io/portfolio
            {project ? `/work/${project.id}` : ""}
          </span>
        </div>
        <a
          className="icon-button browser-open"
          href={project ? project.url : SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={project ? `Open ${project.name} live site` : "Open Bradley on GitHub"}
        >
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      {project ? (
        <div className={`web-page tone-${project.tone}`}>
          <div className="web-page-head">
            <ProjectGlyph project={project} />
            <div>
              <h2>{project.name}</h2>
              <p className="web-type">{project.type}</p>
            </div>
          </div>
          <p className="web-desc">{project.description}</p>
          <div className="web-actions">
            <a
              className="os-button os-button--primary"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit live project
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <button type="button" className="os-button" onClick={() => actions.open("work")}>
              Back to Work
            </button>
          </div>
          <div className="web-more">
            <p>More in Work</p>
            <div className="web-more-grid">
              {PROJECTS.filter((item) => item.id !== project.id).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="web-more-item"
                  onClick={() => actions.open("web", { project: item.id })}
                >
                  <ProjectGlyph project={item} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="web-start">
          <div className="web-start-head">
            <h2>Work</h2>
            <p>Four projects, four live links. Pick one.</p>
          </div>
          <div className="web-start-grid">
            {PROJECTS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="web-start-item"
                onClick={() => actions.open("web", { project: item.id })}
              >
                <ProjectGlyph project={item} />
                <span className="web-start-name">{item.name}</span>
                <span className="web-start-type">{item.type}</span>
              </button>
            ))}
          </div>
          <button type="button" className="os-button" onClick={() => actions.open("work")}>
            Open in Work
          </button>
        </div>
      )}
    </div>
  );
}

export function AboutMacApp({ actions }: Pick<AppProps, "actions">) {
  return (
    <div className="app about-mac">
      <div className="about-mac-logo">
        <AppIcon app="aboutMac" />
      </div>
      <h2>Bradley Gichuru</h2>
      <p className="about-mac-role">Full-stack developer</p>
      <p className="about-mac-os">{SITE.os}</p>
      <dl className="about-mac-list">
        <div>
          <dt>Projects</dt>
          <dd>{PROJECTS.length} live products</dd>
        </div>
        <div>
          <dt>Toolkit</dt>
          <dd>{VITALS[2]!.value}</dd>
        </div>
        <div>
          <dt>Contact</dt>
          <dd>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </dd>
        </div>
      </dl>
      <div className="about-mac-actions">
        <button type="button" className="os-button os-button--primary" onClick={() => actions.open("about")}>
          Read About
        </button>
        <button type="button" className="os-button" onClick={() => actions.open("contact")}>
          Say hello
        </button>
      </div>
    </div>
  );
}

export function TrashApp() {
  return (
    <div className="app trash-app">
      <aside className="trash-sidebar">
        <p className="sidebar-label">Favourites</p>
        <button type="button" className="sidebar-item is-active">
          <Trash2 size={15} aria-hidden="true" />
          Trash
        </button>
      </aside>
      <div className="trash-main">
        <div className="trash-empty">
          <Trash2 size={34} aria-hidden="true" />
          <h2>Trash is empty</h2>
          <p>Nothing to throw away. All ideas are kept.</p>
        </div>
      </div>
    </div>
  );
}

export function AppContent({ window, actions, compact }: AppProps) {
  switch (window.app) {
    case "welcome":
      return <WelcomeApp actions={actions} />;
    case "work":
      return <WorkApp actions={actions} compact={compact} />;
    case "about":
      return <NotesApp actions={actions} />;
    case "skills":
      return <TerminalApp window={window} actions={actions} />;
    case "contact":
      return <MailApp />;
    case "web":
      return <WebApp window={window} actions={actions} />;
    case "aboutMac":
      return <AboutMacApp actions={actions} />;
    case "readme":
      return <ReaderApp />;
    case "trash":
      return <TrashApp />;
    default:
      return null;
  }
}
