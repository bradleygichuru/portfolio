import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { MAXIMIZED } from "./types";
import type { WindowState } from "./types";

interface OSWindowProps {
  win: WindowState;
  active: boolean;
  compact: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onZoom: () => void;
  onDrag: (x: number, y: number) => void;
  children: ReactNode;
}

export function OSWindow({
  win,
  active,
  compact,
  onFocus,
  onClose,
  onMinimize,
  onZoom,
  onDrag,
  children,
}: OSWindowProps) {
  const dragRef = useRef<{
    startX: number;
    startY: number;
    winX: number;
    winY: number;
    screenW: number;
    screenH: number;
  } | null>(null);

  const style = compact
    ? undefined
    : {
        left: `${win.maximized ? MAXIMIZED.x : win.x}%`,
        top: `${win.maximized ? MAXIMIZED.y : win.y}%`,
        width: `${win.maximized ? MAXIMIZED.w : win.w}%`,
        height: `${win.maximized ? MAXIMIZED.h : win.h}%`,
        zIndex: win.z,
      };

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (compact || win.maximized) return;
    if ((event.target as HTMLElement).closest("button")) return;
    const screen = event.currentTarget.closest(".os-screen") as HTMLElement | null;
    if (!screen) return;
    const rect = screen.getBoundingClientRect();
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      winX: win.x,
      winY: win.y,
      screenW: rect.width,
      screenH: rect.height,
    };
    document.body.classList.add("is-dragging");

    const move = (moveEvent: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const dx = moveEvent.clientX - drag.startX;
      const dy = moveEvent.clientY - drag.startY;
      const nextX = Math.min(
        100 - win.w,
        Math.max(0, drag.winX + (dx / drag.screenW) * 100),
      );
      const nextY = Math.min(
        96 - win.h,
        Math.max(2.8, drag.winY + (dy / drag.screenH) * 100),
      );
      onDrag(nextX, nextY);
    };

    const up = () => {
      dragRef.current = null;
      document.body.classList.remove("is-dragging");
      globalThis.removeEventListener("pointermove", move);
      globalThis.removeEventListener("pointerup", up);
    };

    globalThis.addEventListener("pointermove", move);
    globalThis.addEventListener("pointerup", up);
  };

  return (
    <section
      className={`os-window ${active ? "is-active" : ""} ${
        win.minimized ? "is-minimized" : ""
      } ${compact ? "is-compact" : ""} ${win.maximized ? "is-maximized" : ""}`}
      style={style}
      data-app={win.app}
      aria-label={win.title}
      onPointerDown={onFocus}
    >
      <div
        className="os-titlebar"
        onPointerDown={startDrag}
        onDoubleClick={(event) => {
          if (!(event.target as HTMLElement).closest("button")) onZoom();
        }}
      >
        <div className="traffic-lights">
          <button
            type="button"
            className="traffic traffic--close"
            aria-label="Close window"
            title="Close"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
          <button
            type="button"
            className="traffic traffic--min"
            aria-label="Minimize window"
            title="Minimize"
            onClick={(event) => {
              event.stopPropagation();
              onMinimize();
            }}
          >
            <span aria-hidden="true">−</span>
          </button>
          <button
            type="button"
            className="traffic traffic--zoom"
            aria-label={win.maximized ? "Restore window" : "Zoom window"}
            title={win.maximized ? "Restore" : "Zoom"}
            onClick={(event) => {
              event.stopPropagation();
              onZoom();
            }}
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
        <span className="os-window-title">{win.title}</span>
        <span className="os-window-title-spacer" aria-hidden="true" />
      </div>
      <div className="os-window-body">{children}</div>
    </section>
  );
}
