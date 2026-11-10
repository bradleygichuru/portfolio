import { AppIcon, LaunchpadIcon } from "./icons";
import { APP_NAMES, DOCK_APPS } from "./types";
import type { AppId } from "./types";

interface DockProps {
  openApps: AppId[];
  activeApp: AppId | null;
  onOpen: (app: AppId) => void;
  onLaunchpad: () => void;
}

export function Dock({ openApps, activeApp, onOpen, onLaunchpad }: DockProps) {
  return (
    <nav className="os-dock" aria-label="Dock">
      {DOCK_APPS.map((app) => (
        <button
          key={app}
          type="button"
          className={`dock-item ${activeApp === app ? "is-active" : ""}`}
          aria-label={`Open ${APP_NAMES[app]}`}
          title={APP_NAMES[app]}
          onClick={() => onOpen(app)}
        >
          <span className="dock-icon">
            <AppIcon app={app} />
          </span>
          <span className="dock-label" aria-hidden="true">
            {APP_NAMES[app]}
          </span>
          {openApps.includes(app) && <span className="dock-dot" aria-hidden="true" />}
        </button>
      ))}
      <span className="dock-separator" aria-hidden="true" />
      <button
        type="button"
        className="dock-item"
        aria-label="Open Apps"
        title="Apps"
        onClick={onLaunchpad}
      >
        <span className="dock-icon">
          <LaunchpadIcon />
        </span>
        <span className="dock-label" aria-hidden="true">
          Apps
        </span>
      </button>
      <button
        type="button"
        className="dock-item"
        aria-label="Open Trash"
        title="Trash"
        onClick={() => onOpen("trash")}
      >
        <span className="dock-icon">
          <AppIcon app="trash" />
        </span>
        <span className="dock-label" aria-hidden="true">
          Trash
        </span>
        {openApps.includes("trash") && <span className="dock-dot" aria-hidden="true" />}
      </button>
    </nav>
  );
}
