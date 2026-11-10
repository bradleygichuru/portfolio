import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Search } from "lucide-react";
import { AppIcon } from "./icons";
import { APP_NAMES, LAUNCHPAD_APPS } from "./types";
import type { AppId } from "./types";

interface LaunchpadProps {
  open: boolean;
  onClose: () => void;
  onOpen: (app: AppId) => void;
}

export function Launchpad({ open, onClose, onOpen }: LaunchpadProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    const timer = globalThis.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      globalThis.clearTimeout(timer);
      triggerRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const apps = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LAUNCHPAD_APPS;
    return LAUNCHPAD_APPS.filter((app) =>
      APP_NAMES[app].toLowerCase().includes(q),
    );
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="launchpad-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="launchpad"
        role="dialog"
        aria-modal="true"
        aria-label="Apps"
        ref={panelRef}
      >
        <div className="launchpad-search">
          <Search size={16} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            placeholder="Search apps"
            aria-label="Search apps"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event: ReactKeyboardEvent<HTMLInputElement>) => {
              if (event.key === "Escape") {
                event.preventDefault();
                onClose();
              }
            }}
          />
        </div>

        {apps.length ? (
          <div className="launchpad-grid">
            {apps.map((app) => (
              <button
                key={app}
                type="button"
                className="launchpad-app"
                onClick={() => {
                  onOpen(app);
                  onClose();
                }}
              >
                <span className="launchpad-icon">
                  <AppIcon app={app} />
                </span>
                <span className="launchpad-label">{APP_NAMES[app]}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="launchpad-empty">No apps match “{query.trim()}”.</p>
        )}

        <p className="launchpad-hint">Esc to close</p>
      </section>
    </div>
  );
}
