# Bradley Gichuru — Portfolio OS

A full-bleed desktop portfolio that opens as **Portfolio OS**: a desktop-OS-inspired interface with a menu bar, dock, draggable windows, Search, Apps, Controls, and a working local Terminal. The ground is the user-supplied violet ASCII-hands artwork; the windows are light by default, with dark mode available. The metaphor is borrowed; the naming, icons, and brand are original. There is no laptop hardware around it — the screen is the page.

## The idea

The desktop is the portfolio. The welcome window names Bradley, gives the one-line thesis, and puts the four live projects and the three ways in (Work, About, Say Hello) in the first view. Apps carry the content:

- **Work** — a Finder-like project browser with a sidebar, project grid/list, preview, and live links.
- **Notes** — About Bradley, the vitals, and the toolkit.
- **Terminal** — an interactive local command line for skills, projects, contact, opening apps, and the reader.
- **Mail** — the contact channels, real `mailto:` / `tel:` / social links, and copy-email feedback.
- **Web** — a Safari-style project page for Newwell, Hizitickets, Towing Guru, and Budgetlite.
- **About This Portfolio** — the "About This Mac"-style system card.
- **Search (Ctrl K / Cmd K)**, **Apps**, **Controls**, light/dark mode, brightness, Sleep, Restart, and a desktop context menu.

The **reader** below the desktop is the flat, printable edition with every project, skill, and contact link.

## Stack

- Astro 5 + React 19 + Tailwind's base reset
- Hand-written OS CSS in `src/styles/desktop.css`
- Lucide icons and an original SVG app-icon set
- No external fonts: the system UI stack, system mono, and Georgia for the B mark
- No backend, no real shell, no live AI

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview the production build |

The site is configured for GitHub Pages at `/portfolio`, so the local dev URL is `http://localhost:4321/portfolio/`.

## Structure

```
src/
├── components/os/
│   ├── PortfolioOS.tsx     Desktop state, windows, wallpaper, overlays
│   ├── apps.tsx            Welcome, Work, Notes, Terminal, Mail, Web, About, Trash
│   ├── MenuBar.tsx         Menus, clock, Controls
│   ├── Dock.tsx            Dock, running dots, Apps entry
│   ├── OSWindow.tsx        Draggable window chrome and traffic lights
│   ├── Spotlight.tsx       Ctrl/Cmd-K search (component name)
│   ├── Launchpad.tsx       App grid (component name)
│   ├── icons.tsx           Original app icons and the B mark
│   └── types.ts            App and window definitions
├── assets/wallpaper.webp   Supplied violet ASCII-hands artwork (WebP)
├── data/portfolio.ts       Real projects, skills, contact, bio
├── pages/index.astro       Portfolio OS + reader edition
├── layouts/Layout.astro    Metadata, fonts, global CSS
└── styles/desktop.css      The desktop, windows, apps, responsive and print
```

## Interaction notes

- **Windows:** drag by the title bar, close/minimize/zoom with the traffic lights, or use **Window → Move Left / Move Right / Center** as a non-drag alternative.
- **Keyboard:** Ctrl/Cmd K opens Search; Escape closes menus and overlays; focus returns to the trigger.
- **Appearance:** light windows by default; Controls switches to dark. The supplied artwork stays fixed while the windows, menu bar, and dock restage.
- **Reduced motion:** the screen-on, window and notification motion is removed.
- **Touch:** the desktop becomes a full-screen window stack with a floating welcome card and the dock.
- **No JavaScript:** the welcome and desktop are static; the reader below carries every project, skill, and contact detail.
- **Print:** the reader prints on white; the desktop is hidden.

## Content

All project descriptions, links, skills, and contact details come from the original portfolio. Nothing commercial — clients, metrics, testimonials, a CV, a live AI — was invented. The Terminal is a local interface over the same data. The wallpaper is the user-supplied `wallhaven-7jmgey_1920x1080.png`, converted to WebP; the earlier generated B wallpaper and its pointer parallax were retired at the user's request.
