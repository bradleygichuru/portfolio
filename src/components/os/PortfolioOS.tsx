import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
} from "react";
import { AppContent } from "./apps";
import type { AppActions } from "./apps";
import { AppIcon, BMark, ContactGlyph, ReadmeGlyph } from "./icons";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { OSWindow } from "./OSWindow";
import { Spotlight } from "./Spotlight";
import { Launchpad } from "./Launchpad";
import MobileOS from "./MobileOS";
import {
  APP_DEFS,
  type AppId,
  type OpenOptions,
  type Theme,
  type WindowState,
} from "./types";
import { projectById } from "../../data/portfolio";
import wallpaper from "../../assets/wallpaper.webp";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function titleFor(app: AppId, project?: string) {
  if (app === "web") {
    const item = project ? projectById(project) : undefined;
    return item ? `Web — ${item.name}` : "Web";
  }
  return APP_DEFS[app].title;
}

const initialWelcome: WindowState = {
  id: "welcome",
  app: "welcome",
  title: "Welcome",
  x: APP_DEFS.welcome.x,
  y: APP_DEFS.welcome.y,
  w: APP_DEFS.welcome.w,
  h: APP_DEFS.welcome.h,
  z: 10,
  minimized: false,
  maximized: false,
};

interface ContextState {
  x: number;
  y: number;
}

export default function PortfolioOS() {
  const [theme, setTheme] = useState<Theme>("light");
  const [brightness, setBrightness] = useState(1);
  const [focusMode, setFocusMode] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([initialWelcome]);
  const [activeId, setActiveId] = useState<string | null>("welcome");
  const [spotlight, setSpotlight] = useState(false);
  const [launchpad, setLaunchpad] = useState(false);
  const [notification, setNotification] = useState(true);
  const [sleep, setSleep] = useState(false);
  const [context, setContext] = useState<ContextState | null>(null);

  const zRef = useRef(10);
  const screenRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery("(max-width: 900px)");

  const openApp = useCallback((app: AppId, opts?: OpenOptions) => {
    setSpotlight(false);
    setLaunchpad(false);
    setContext(null);
    setWindows((prev) => {
      const existing = prev.find((win) => win.app === app);
      if (existing) {
        return prev.map((win) =>
          win.app === app
            ? {
                ...win,
                title: titleFor(app, opts?.project ?? win.project),
                project: opts?.project ?? win.project,
                command: opts?.command ?? win.command,
                commandId: opts?.command ? (win.commandId ?? 0) + 1 : win.commandId,
                minimized: false,
                z: ++zRef.current,
              }
            : win,
        );
      }
      const def = APP_DEFS[app];
      return [
        ...prev,
        {
          id: app,
          app,
          title: titleFor(app, opts?.project),
          x: def.x,
          y: def.y,
          w: def.w,
          h: def.h,
          z: ++zRef.current,
          minimized: false,
          maximized: false,
          project: opts?.project,
          command: opts?.command,
          commandId: opts?.command ? 1 : undefined,
        },
      ];
    });
    setActiveId(app);
  }, []);

  const focusWindow = useCallback((id: string) => {
    setActiveId(id);
    setWindows((prev) =>
      prev.map((win) =>
        win.id === id
          ? { ...win, minimized: false, z: ++zRef.current }
          : win,
      ),
    );
  }, []);

  const closeWindow = useCallback(
    (id: string) => {
      const remaining = windows.filter((win) => win.id !== id);
      setWindows(remaining);
      if (activeId === id) {
        const top = remaining
          .filter((win) => !win.minimized)
          .sort((a, b) => b.z - a.z)[0];
        setActiveId(top?.id ?? null);
      }
    },
    [activeId, windows],
  );

  const minimizeWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((win) => (win.id === id ? { ...win, minimized: true } : win)),
      );
      if (activeId === id) {
        const top = windows
          .filter((win) => win.id !== id && !win.minimized)
          .sort((a, b) => b.z - a.z)[0];
        setActiveId(top?.id ?? null);
      }
    },
    [activeId, windows],
  );

  const zoomWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.id === id
          ? { ...win, maximized: !win.maximized, minimized: false, z: ++zRef.current }
          : win,
      ),
    );
    setActiveId(id);
  }, []);

  const dragWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, x, y } : win)),
    );
  }, []);

  const moveActive = useCallback(
    (direction: "left" | "right" | "center") => {
      if (!activeId) return;
      setWindows((prev) =>
        prev.map((win) => {
          if (win.id !== activeId) return win;
          if (direction === "center") {
            return {
              ...win,
              x: Math.max(0, (100 - win.w) / 2),
              y: Math.max(2.8, (100 - win.h) / 2),
              maximized: false,
            };
          }
          return {
            ...win,
            x: Math.min(
              100 - win.w,
              Math.max(0, win.x + (direction === "left" ? -6 : 6)),
            ),
            maximized: false,
          };
        }),
      );
    },
    [activeId],
  );

  const bringAll = useCallback(() => {
    const top = windows
      .filter((win) => !win.minimized)
      .sort((a, b) => b.z - a.z)[0];
    setWindows((prev) =>
      prev.map((win) =>
        win.minimized ? win : { ...win, z: ++zRef.current },
      ),
    );
    if (top) setActiveId(top.id);
  }, [windows]);

  const reader = useCallback(() => {
    document.getElementById("reader")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reducedMotion]);

  const activeWindow =
    windows.find((win) => win.id === activeId && !win.minimized) ?? null;
  const activeApp = activeWindow?.app ?? null;
  const openApps = useMemo(
    () => Array.from(new Set(windows.map((win) => win.app))),
    [windows],
  );

  const actions = useMemo<AppActions>(
    () => ({
      open: openApp,
      close: () => {
        if (activeId) closeWindow(activeId);
      },
      theme,
      setTheme,
      reader,
    }),
    [openApp, activeId, closeWindow, theme, reader],
  );

  useEffect(() => {
    if (!notification) return;
    const timer = globalThis.setTimeout(() => setNotification(false), 10000);
    return () => globalThis.clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setLaunchpad(false);
        setContext(null);
        setSpotlight((value) => !value);
        return;
      }
      if (meta && event.key.toLowerCase() === "m" && activeId) {
        event.preventDefault();
        setWindows((prev) =>
          prev.map((win) =>
            win.id === activeId ? { ...win, minimized: true } : win,
          ),
        );
        const top = windows
          .filter((win) => win.id !== activeId && !win.minimized)
          .sort((a, b) => b.z - a.z)[0];
        setActiveId(top?.id ?? null);
        return;
      }
      if (event.key === "Escape") {
        if (spotlight) setSpotlight(false);
        else if (launchpad) setLaunchpad(false);
        else if (context) setContext(null);
        else if (sleep) setSleep(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeId, context, launchpad, sleep, spotlight, windows]);

  const onContextMenu = (event: ReactMouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (
      target.closest(
        ".os-window, .os-menubar, .os-dock, .spotlight, .launchpad, .menu-panel, .control-center, .os-notification",
      )
    ) {
      return;
    }
    event.preventDefault();
    const rect = screenRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight(false);
    setLaunchpad(false);
    setContext({
      x: Math.min(event.clientX - rect.left, rect.width - 220),
      y: Math.min(event.clientY - rect.top, rect.height - 230),
    });
  };

  const closeActive = () => {
    if (activeId) closeWindow(activeId);
  };

  return (
    <main
      id="desktop"
      ref={screenRef}
      className="portfolio-os"
      data-theme={theme}
      style={
        {
          "--os-brightness": brightness,
          "--os-wallpaper-image": `url(${wallpaper.src})`,
        } as CSSProperties
      }
      aria-label="Bradley Gichuru's Portfolio OS"
      onContextMenu={onContextMenu}
    >
      <div className="os-screen">
        <div className="wallpaper" aria-hidden="true">
          <span className="wallpaper-word">BRADLEY GICHURU · PORTFOLIO OS</span>
          <div className="wallpaper-grain" />
        </div>

        <MenuBar
          activeAppName={activeApp ? APP_DEFS[activeApp].menu : "Portfolio"}
          theme={theme}
          setTheme={setTheme}
          brightness={brightness}
          setBrightness={setBrightness}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
          onOpen={openApp}
          onReader={reader}
          onSpotlight={() => {
            setLaunchpad(false);
            setContext(null);
            setSpotlight(true);
          }}
          onSleep={() => setSleep(true)}
          onRestart={() => window.location.reload()}
          onAbout={() => openApp("aboutMac")}
          hasWindow={Boolean(activeWindow)}
          onCloseWindow={closeActive}
          onMinimizeWindow={() => {
            if (activeId) minimizeWindow(activeId);
          }}
          onZoomWindow={() => {
            if (activeId) zoomWindow(activeId);
          }}
          onMoveWindow={moveActive}
          onBringAll={bringAll}
        />

        <div className="desktop-icons" aria-label="Desktop items">
          <button
            type="button"
            className="desktop-icon"
            onClick={() => openApp("work")}
            title="Open Work"
          >
            <AppIcon app="work" className="desktop-icon-app" />
            <span>Work</span>
          </button>
          <button
            type="button"
            className="desktop-icon"
            onClick={reader}
            title="Open README.txt in Reader Mode"
          >
            <ReadmeGlyph />
            <span>README.txt</span>
          </button>
          <button
            type="button"
            className="desktop-icon"
            onClick={() => openApp("contact")}
            title="Open Contact.vcf"
          >
            <ContactGlyph />
            <span>Contact.vcf</span>
          </button>
        </div>

        <div className="os-windows">
          {windows.map((win) => (
            <OSWindow
              key={win.id}
              win={win}
              active={win.id === activeId}
              compact={compact}
              onFocus={() => focusWindow(win.id)}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onZoom={() => zoomWindow(win.id)}
              onDrag={(x, y) => dragWindow(win.id, x, y)}
            >
              <AppContent window={win} actions={actions} compact={compact} />
            </OSWindow>
          ))}
        </div>

        <Dock
          openApps={openApps}
          activeApp={activeApp}
          onOpen={openApp}
          onLaunchpad={() => {
            setSpotlight(false);
            setContext(null);
            setLaunchpad(true);
          }}
        />

        {notification && (
          <aside className="os-notification" aria-label="Notification">
            <div className="notification-icon">
              <AppIcon app="aboutMac" />
            </div>
            <div className="notification-copy">
              <p className="notification-title">Welcome to Portfolio OS</p>
              <p className="notification-body">
                Press Ctrl K (or Cmd K) to search, or open Work from the dock.
              </p>
              <button
                type="button"
                className="notification-action"
                onClick={() => {
                  setNotification(false);
                  openApp("work");
                }}
              >
                Open Work
              </button>
            </div>
            <button
              type="button"
              className="notification-close"
              aria-label="Dismiss notification"
              onClick={() => setNotification(false)}
            >
              ×
            </button>
          </aside>
        )}

        {context && (
          <>
            <button
              type="button"
              className="context-scrim"
              aria-label="Close desktop menu"
              onClick={() => setContext(null)}
            />
            <div
              className="context-menu"
              role="menu"
              aria-label="Desktop menu"
              style={{ left: context.x, top: context.y }}
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setContext(null);
                  openApp("work");
                }}
              >
                Open Work
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setContext(null);
                  openApp("skills");
                }}
              >
                New Terminal
              </button>
              <div className="menu-separator" role="separator" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setContext(null);
                  setTheme(theme === "light" ? "dark" : "light");
                }}
              >
                {theme === "light" ? "Use Dark Appearance" : "Use Light Appearance"}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setContext(null);
                  reader();
                }}
              >
                Reader Mode
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setContext(null);
                  openApp("aboutMac");
                }}
              >
                About This Portfolio
              </button>
            </div>
          </>
        )}

        {sleep && (
          <div className="os-sleep" role="dialog" aria-modal="true" aria-label="Sleeping">
            <button
              type="button"
              className="sleep-wake"
              onClick={() => setSleep(false)}
            >
              <BMark className="sleep-b" />
              <span className="sleep-hint">Click to wake</span>
            </button>
          </div>
        )}

        <Spotlight
          open={spotlight}
          onClose={() => setSpotlight(false)}
          onOpen={openApp}
          onReader={reader}
        />
        <Launchpad
          open={launchpad}
          onClose={() => setLaunchpad(false)}
          onOpen={openApp}
        />
      </div>

      <MobileOS
        theme={theme}
        setTheme={setTheme}
        brightness={brightness}
        setBrightness={setBrightness}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
        reader={reader}
      />
    </main>
  );
}
