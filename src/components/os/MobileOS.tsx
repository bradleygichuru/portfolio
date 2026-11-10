import { useEffect, useRef, useState } from "react";
import {
  BatteryFull,
  ChevronLeft,
  House,
  Moon,
  Search,
  SlidersHorizontal,
  Sun,
  Wifi,
  X,
} from "lucide-react";
import { AppContent } from "./apps";
import type { AppActions } from "./apps";
import { AppIcon, BMark, ReadmeGlyph } from "./icons";
import { Spotlight } from "./Spotlight";
import {
  APP_NAMES,
  type AppId,
  type OpenOptions,
  type Theme,
  type WindowState,
} from "./types";
import { projectById } from "../../data/portfolio";

interface MobileOSProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
  reader: () => void;
}

interface Route {
  app: AppId;
  project?: string;
  command?: string;
  commandId?: number;
}

const HOME_APPS: AppId[] = [
  "work",
  "about",
  "skills",
  "contact",
  "web",
  "aboutMac",
];

const DOCK_APPS: AppId[] = ["work", "about", "skills", "contact"];

function routeTitle(route: Route) {
  if (route.app === "web") {
    const project = route.project ? projectById(route.project) : undefined;
    return project ? project.name : "Web";
  }
  return APP_NAMES[route.app];
}

function MobileStatusBar({
  now,
  focusMode,
  app = false,
  onControls,
}: {
  now: Date | null;
  focusMode: boolean;
  app?: boolean;
  onControls: () => void;
}) {
  const time = now
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(now)
    : "";

  return (
    <div className={`ios-statusbar ${app ? "ios-statusbar--app" : ""}`}>
      <time dateTime={now?.toISOString()}>{time}</time>
      <button
        type="button"
        className="ios-status-actions"
        aria-label="Open Controls"
        title="Controls"
        onClick={onControls}
      >
        {focusMode && (
          <span className="ios-focus-status" title="Focus on">
            <Moon size={12} aria-hidden="true" />
          </span>
        )}
        <span className="ios-signal" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        <Wifi size={14} aria-hidden="true" />
        <BatteryFull size={17} aria-hidden="true" />
      </button>
    </div>
  );
}

export default function MobileOS({
  theme,
  setTheme,
  brightness,
  setBrightness,
  focusMode,
  setFocusMode,
  reader,
}: MobileOSProps) {
  const [stack, setStack] = useState<Route[]>([]);
  const [search, setSearch] = useState(false);
  const [controls, setControls] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const commandSeq = useRef(0);
  const homeHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const appBackRef = useRef<HTMLButtonElement | null>(null);
  const sheetRef = useRef<HTMLElement | null>(null);
  const controlsTriggerRef = useRef<HTMLElement | null>(null);

  const route = stack[stack.length - 1] ?? null;
  const title = route ? routeTitle(route) : "";

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest('a[href="#desktop"]')) {
        setStack([]);
      }
    };
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (route) appBackRef.current?.focus();
      else homeHeadingRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);

  useEffect(() => {
    if (!controls) return;
    const timer = window.setTimeout(
      () =>
        sheetRef.current
          ?.querySelector<HTMLButtonElement>(".ios-sheet-close")
          ?.focus(),
      40,
    );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setControls(false);
        controlsTriggerRef.current?.focus?.();
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusables = Array.from(
        sheetRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input, a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [controls]);

  const routeFor = (app: AppId, opts?: OpenOptions): Route => ({
    app,
    project: opts?.project,
    command: opts?.command,
    commandId: opts?.command ? ++commandSeq.current : undefined,
  });

  const openRoot = (app: AppId, opts?: OpenOptions) => {
    setSearch(false);
    setControls(false);
    if (app === "welcome") {
      setStack([]);
      return;
    }
    setStack([routeFor(app, opts)]);
  };

  const push = (app: AppId, opts?: OpenOptions) => {
    const next = routeFor(app, opts);
    setStack((current) => [...current, next]);
  };

  const goBack = () => {
    setStack((current) =>
      current.length > 1 ? current.slice(0, -1) : [],
    );
  };

  const goHome = () => setStack([]);

  const openControls = () => {
    controlsTriggerRef.current = document.activeElement as HTMLElement | null;
    setSearch(false);
    setControls(true);
  };

  const closeControls = () => {
    setControls(false);
    controlsTriggerRef.current?.focus?.();
  };

  const actions: AppActions = {
    open: push,
    close: goHome,
    theme,
    setTheme,
    reader,
  };

  const routeKey = route
    ? `${route.app}-${route.project ?? "root"}-${route.commandId ?? 0}`
    : "home";

  const win: WindowState | null = route
    ? {
        id: routeKey,
        app: route.app,
        title,
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        z: 1,
        minimized: false,
        maximized: true,
        project: route.project,
        command: route.command,
        commandId: route.commandId,
      }
    : null;

  return (
    <section
      className={`ios-shell ${route ? "is-app" : ""}`}
      aria-label="Bradley Gichuru's Portfolio phone"
    >
      <div className="ios-wallpaper" aria-hidden="true" />

      <div className="ios-content">
        {route && win ? (
          <section className="ios-app" aria-labelledby="ios-app-title">
            <MobileStatusBar
              now={now}
              focusMode={focusMode}
              app
              onControls={openControls}
            />
            <header className="ios-navbar">
              <button
                ref={appBackRef}
                type="button"
                className="ios-nav-back"
                aria-label="Back"
                onClick={goBack}
              >
                <ChevronLeft size={24} aria-hidden="true" />
              </button>
              <h2 id="ios-app-title">{title}</h2>
              <button
                type="button"
                className="ios-nav-home"
                aria-label="Home"
                onClick={goHome}
              >
                <House size={20} aria-hidden="true" />
              </button>
            </header>
            <div className="ios-app-body">
              <AppContent
                key={routeKey}
                window={win}
                actions={actions}
                compact
              />
            </div>
          </section>
        ) : (
          <section className="ios-home" aria-label="Portfolio home screen">
            <MobileStatusBar
              now={now}
              focusMode={focusMode}
              onControls={openControls}
            />

            <div className="ios-home-scroll">
              <div className="ios-widget">
                <div className="ios-widget-head">
                  <BMark className="ios-widget-mark" />
                  <div>
                    <h1 ref={homeHeadingRef} tabIndex={-1}>
                      Bradley Gichuru
                    </h1>
                    <p className="ios-widget-role">Full-stack developer</p>
                  </div>
                </div>
                <p className="ios-widget-lede">
                  I build web and mobile products with modern technologies — and
                  care about the details that make them matter.
                </p>
                <div className="ios-widget-actions">
                  <button
                    type="button"
                    className="os-button os-button--primary"
                    onClick={() => openRoot("work")}
                  >
                    Open Work
                  </button>
                  <button
                    type="button"
                    className="os-button"
                    onClick={() => openRoot("about")}
                  >
                    Read About
                  </button>
                  <button
                    type="button"
                    className="os-button"
                    onClick={() => openRoot("contact")}
                  >
                    Say Hello
                  </button>
                </div>
                <div className="ios-widget-foot">
                  <span>Portfolio OS 1.0</span>
                  <button
                    type="button"
                    className="ios-widget-controls"
                    onClick={openControls}
                  >
                    <SlidersHorizontal size={13} aria-hidden="true" />
                    Controls
                  </button>
                </div>
              </div>

              <nav className="ios-app-grid" aria-label="Apps">
                {HOME_APPS.map((app) => (
                  <button
                    key={app}
                    type="button"
                    className="ios-app-button"
                    onClick={() => openRoot(app)}
                  >
                    <span className="ios-app-icon">
                      <AppIcon app={app} />
                    </span>
                    <span className="ios-app-label">
                      {app === "aboutMac" ? "About" : APP_NAMES[app]}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  className="ios-app-button"
                  onClick={reader}
                >
                  <span className="ios-app-icon ios-readme-icon">
                    <ReadmeGlyph />
                  </span>
                  <span className="ios-app-label">README</span>
                </button>
              </nav>
            </div>

            <button
              type="button"
              className="ios-search-pill"
              onClick={() => {
                setControls(false);
                setSearch(true);
              }}
            >
              <Search size={14} aria-hidden="true" />
              <span>Search</span>
            </button>

            <nav className="ios-dock" aria-label="Dock">
              {DOCK_APPS.map((app) => (
                <button
                  key={app}
                  type="button"
                  className="ios-dock-button"
                  aria-label={`Open ${APP_NAMES[app]}`}
                  onClick={() => openRoot(app)}
                >
                  <AppIcon app={app} />
                </button>
              ))}
            </nav>
          </section>
        )}
      </div>

      <span className="ios-home-indicator" aria-hidden="true" />

      <Spotlight
        open={search}
        onClose={() => setSearch(false)}
        onOpen={openRoot}
        onReader={() => {
          setSearch(false);
          reader();
        }}
      />

      {controls && (
        <>
          <div
            className="ios-sheet-scrim"
            aria-hidden="true"
            onClick={closeControls}
          />
          <section
            ref={sheetRef}
            className="ios-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Controls"
          >
            <span className="ios-sheet-grabber" aria-hidden="true" />
            <header className="ios-sheet-head">
              <h2>Controls</h2>
              <button
                type="button"
                className="ios-sheet-close"
                aria-label="Close controls"
                onClick={closeControls}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <div className="ios-sheet-block">
              <span className="ios-sheet-label">
                {theme === "light" ? (
                  <Sun size={14} aria-hidden="true" />
                ) : (
                  <Moon size={14} aria-hidden="true" />
                )}
                Appearance
              </span>
              <div className="segmented" role="group" aria-label="Appearance">
                <button
                  type="button"
                  aria-pressed={theme === "light"}
                  className={theme === "light" ? "is-active" : ""}
                  onClick={() => setTheme("light")}
                >
                  Light
                </button>
                <button
                  type="button"
                  aria-pressed={theme === "dark"}
                  className={theme === "dark" ? "is-active" : ""}
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </button>
              </div>
            </div>

            <label className="ios-sheet-block" htmlFor="ios-brightness">
              <span className="ios-sheet-label">
                <Sun size={14} aria-hidden="true" />
                Brightness
              </span>
              <input
                id="ios-brightness"
                type="range"
                min="55"
                max="100"
                value={Math.round(brightness * 100)}
                onChange={(event) =>
                  setBrightness(Number(event.target.value) / 100)
                }
              />
            </label>

            <button
              type="button"
              className={`ios-sheet-row ${focusMode ? "is-active" : ""}`}
              aria-pressed={focusMode}
              onClick={() => setFocusMode(!focusMode)}
            >
              <span className="ios-sheet-label">
                <Moon size={14} aria-hidden="true" />
                Focus
              </span>
              <span>{focusMode ? "On" : "Off"}</span>
            </button>

            <button
              type="button"
              className="os-button ios-sheet-reader"
              onClick={() => {
                closeControls();
                reader();
              }}
            >
              Open Reader Mode
            </button>
          </section>
        </>
      )}
    </section>
  );
}
