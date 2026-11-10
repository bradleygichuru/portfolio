import { useEffect, useRef, useState } from "react";
import {
  BatteryFull,
  Bluetooth,
  Moon,
  Search,
  SlidersHorizontal,
  Sun,
  Wifi,
} from "lucide-react";
import type { AppId, Theme } from "./types";
import { BMark } from "./icons";

interface MenuBarProps {
  activeAppName: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
  onOpen: (app: AppId) => void;
  onReader: () => void;
  onSpotlight: () => void;
  onSleep: () => void;
  onRestart: () => void;
  onAbout: () => void;
  hasWindow: boolean;
  onCloseWindow: () => void;
  onMinimizeWindow: () => void;
  onZoomWindow: () => void;
  onMoveWindow: (direction: "left" | "right" | "center") => void;
  onBringAll: () => void;
}

interface MenuItem {
  label: string;
  shortcut?: string;
  run: () => void;
  disabled?: boolean;
}

type MenuEntry = MenuItem | "separator";

interface MenuDef {
  id: string;
  label: string;
  items: MenuEntry[];
}

export function MenuBar({
  activeAppName,
  theme,
  setTheme,
  brightness,
  setBrightness,
  focusMode,
  setFocusMode,
  onOpen,
  onReader,
  onSpotlight,
  onSleep,
  onRestart,
  onAbout,
  hasWindow,
  onCloseWindow,
  onMinimizeWindow,
  onZoomWindow,
  onMoveWindow,
  onBringAll,
}: MenuBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [controlOpen, setControlOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef<HTMLElement | null>(null);
  const menuTriggerRef = useRef<HTMLElement | null>(null);
  const controlTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = globalThis.setInterval(() => setNow(new Date()), 30000);
    return () => globalThis.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!openMenu && !controlOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setControlOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu, controlOpen]);

  useEffect(() => {
    if (!openMenu) return;
    menuTriggerRef.current = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLButtonElement>("button:not([disabled])")
        ?.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
      menuTriggerRef.current?.focus?.();
    };
  }, [openMenu]);

  useEffect(() => {
    if (!controlOpen) return;
    controlTriggerRef.current = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => {
      controlRef.current
        ?.querySelector<HTMLButtonElement>("button:not([disabled])")
        ?.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
      controlTriggerRef.current?.focus?.();
    };
  }, [controlOpen]);

  const closeAll = () => {
    setOpenMenu(null);
    setControlOpen(false);
  };

  const copySelection = () => {
    const text = window.getSelection()?.toString() ?? "";
    if (text && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(text);
    }
  };

  const enterFullScreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  };

  const runItem = (item: MenuItem) => {
    if (item.disabled) return;
    closeAll();
    item.run();
  };

  const bMenu: MenuDef = {
    id: "b",
    label: "Portfolio",
    items: [
      { label: "About This Portfolio", run: onAbout },
      "separator",
      { label: "Welcome", run: () => onOpen("welcome") },
      { label: "Work", run: () => onOpen("work") },
      { label: "Notes", run: () => onOpen("about") },
      { label: "Terminal", run: () => onOpen("skills") },
      { label: "Mail", run: () => onOpen("contact") },
      { label: "Web", run: () => onOpen("web") },
      "separator",
      { label: "Search", shortcut: "Ctrl K", run: onSpotlight },
      { label: "Open README", run: onReader },
      {
        label: theme === "light" ? "Use Dark Appearance" : "Use Light Appearance",
        run: () => setTheme(theme === "light" ? "dark" : "light"),
      },
      "separator",
      { label: "Sleep", run: onSleep },
      { label: "Restart", run: onRestart },
    ],
  };

  const appMenus: MenuDef[] = [
    {
      id: "file",
      label: "File",
      items: [
        { label: "Open Work", run: () => onOpen("work") },
        {
          label: "Close Window",
          run: onCloseWindow,
          disabled: !hasWindow,
        },
        {
          label: "Minimize",
          shortcut: "Ctrl M",
          run: onMinimizeWindow,
          disabled: !hasWindow,
        },
      ],
    },
    {
      id: "edit",
      label: "Edit",
      items: [{ label: "Copy", shortcut: "Ctrl C", run: copySelection }],
    },
    {
      id: "view",
      label: "View",
      items: [
        {
          label: theme === "light" ? "Use Dark Appearance" : "Use Light Appearance",
          run: () => setTheme(theme === "light" ? "dark" : "light"),
        },
        { label: "Open README", run: onReader },
        { label: "Enter Full Screen", run: enterFullScreen },
      ],
    },
    {
      id: "window",
      label: "Window",
      items: [
        { label: "Minimize", run: onMinimizeWindow, disabled: !hasWindow },
        { label: "Zoom", run: onZoomWindow, disabled: !hasWindow },
        { label: "Move Left", run: () => onMoveWindow("left"), disabled: !hasWindow },
        { label: "Move Right", run: () => onMoveWindow("right"), disabled: !hasWindow },
        { label: "Center", run: () => onMoveWindow("center"), disabled: !hasWindow },
        { label: "Bring All to Front", run: onBringAll },
      ],
    },
    {
      id: "help",
      label: "Help",
      items: [
        { label: "Search", shortcut: "Ctrl K", run: onSpotlight },
        { label: "Open README", run: onReader },
        { label: "About This Portfolio", run: onAbout },
      ],
    },
  ];

  const renderMenu = (menu: MenuDef) => (
    <div
      className="menu-wrap"
      key={menu.id}
      onMouseEnter={() => {
        if (openMenu && openMenu !== menu.id) {
          setControlOpen(false);
          setOpenMenu(menu.id);
        }
      }}
    >
      <button
        type="button"
        className={`menubar-item ${openMenu === menu.id ? "is-open" : ""}`}
        aria-haspopup="menu"
        aria-expanded={openMenu === menu.id}
        onClick={() => {
          setControlOpen(false);
          setOpenMenu(openMenu === menu.id ? null : menu.id);
        }}
      >
        {menu.label}
      </button>
      {openMenu === menu.id && (
        <div className="menu-panel" role="menu" aria-label={menu.label} ref={panelRef}>
          {menu.items.map((item, index) =>
            item === "separator" ? (
              <div className="menu-separator" role="separator" key={`sep-${index}`} />
            ) : (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className="menu-item"
                disabled={item.disabled}
                onClick={() => runItem(item)}
              >
                <span>{item.label}</span>
                {item.shortcut && <span className="menu-shortcut">{item.shortcut}</span>}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );

  const dateLabel = now
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(now)
    : "";
  const timeLabel = now
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(now)
    : "";

  return (
    <>
      <header className="os-menubar" aria-label="Menu bar">
        <div className="menubar-left">
          <div className="menu-wrap">
            <button
              type="button"
              className={`menubar-b ${openMenu === "b" ? "is-open" : ""}`}
              aria-label="Portfolio menu"
              aria-haspopup="menu"
              aria-expanded={openMenu === "b"}
              onClick={() => {
                setControlOpen(false);
                setOpenMenu(openMenu === "b" ? null : "b");
              }}
            >
              <BMark className="menubar-b-mark" />
            </button>
            {openMenu === "b" && (
              <div className="menu-panel menu-panel--b" role="menu" aria-label="Portfolio" ref={panelRef}>
                {bMenu.items.map((item, index) =>
                  item === "separator" ? (
                    <div className="menu-separator" role="separator" key={`bsep-${index}`} />
                  ) : (
                    <button
                      key={item.label}
                      type="button"
                      role="menuitem"
                      className="menu-item"
                      disabled={item.disabled}
                      onClick={() => runItem(item)}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && <span className="menu-shortcut">{item.shortcut}</span>}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
          <span className="menubar-app">{activeAppName}</span>
          <nav className="menubar-menus" aria-label="Application menus">
            {appMenus.map(renderMenu)}
          </nav>
        </div>

        <div className="menubar-right">
          {focusMode && (
            <span className="menubar-focus" title="Focus on" aria-label="Focus on">
              <Moon size={13} aria-hidden="true" />
            </span>
          )}
          <button
            type="button"
            className="menubar-icon"
            aria-label="Search Portfolio"
            title="Search Portfolio"
            onClick={onSpotlight}
          >
            <Search size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`menubar-icon ${controlOpen ? "is-open" : ""}`}
            aria-label="Controls"
            title="Controls"
            aria-haspopup="dialog"
            aria-expanded={controlOpen}
            onClick={() => {
              setOpenMenu(null);
              setControlOpen((value) => !value);
            }}
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
          </button>
          <span className="menubar-status" aria-label="Wi-Fi connected">
            <Wifi size={14} aria-hidden="true" />
          </span>
          <span className="menubar-status menubar-battery" aria-label="Battery 100%">
            <BatteryFull size={16} aria-hidden="true" />
            <span>100%</span>
          </span>
          <time className="menubar-clock" dateTime={now?.toISOString()}>
            <span>{dateLabel}</span>
            <span>{timeLabel}</span>
          </time>
        </div>
      </header>

      {(openMenu || controlOpen) && (
        <button
          type="button"
          className="os-scrim"
          aria-label="Close menu"
          onClick={closeAll}
        />
      )}

      {controlOpen && (
        <section
          className="control-center"
          role="dialog"
          aria-label="Controls"
          ref={controlRef}
        >
          <div className="control-head">
            <h2>Controls</h2>
            <button
              type="button"
              className="control-close"
              aria-label="Close controls"
              onClick={closeAll}
            >
              ×
            </button>
          </div>
          <div className="control-block">
            <span className="control-label">
              {theme === "light" ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
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
          <div className="control-block">
            <label className="control-label" htmlFor="brightness">
              <Sun size={14} aria-hidden="true" />
              Brightness
            </label>
            <input
              id="brightness"
              type="range"
              min="55"
              max="100"
              value={Math.round(brightness * 100)}
              onChange={(event) => setBrightness(Number(event.target.value) / 100)}
            />
          </div>
          <div className="control-row">
            <span className="control-label">
              <Wifi size={14} aria-hidden="true" />
              Wi-Fi
            </span>
            <span className="control-value">PortfolioNet</span>
          </div>
          <div className="control-row">
            <span className="control-label">
              <Bluetooth size={14} aria-hidden="true" />
              Bluetooth
            </span>
            <span className="control-value">On</span>
          </div>
          <button
            type="button"
            className={`control-row control-focus ${focusMode ? "is-active" : ""}`}
            aria-pressed={focusMode}
            onClick={() => setFocusMode(!focusMode)}
          >
            <span className="control-label">
              <Moon size={14} aria-hidden="true" />
              Focus
            </span>
            <span className="control-value">{focusMode ? "On" : "Off"}</span>
          </button>
          <div className="control-row control-battery">
            <span className="control-label">
              <BatteryFull size={16} aria-hidden="true" />
              Battery
            </span>
            <span className="control-value">100% · plugged in</span>
          </div>
        </section>
      )}
    </>
  );
}
