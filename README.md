# Bradley Gichuru — Portfolio OS

A full-bleed **Portfolio OS** that adapts to the device. Tablets and larger screens get a macOS-inspired desktop with a menu bar, dock, draggable windows, Search, Apps, Controls, and a working local Terminal. Phones get an iOS-inspired home screen with a status bar, welcome widget, four-column app grid, Search pill, four-icon dock, and full-screen apps. The ground is the user-supplied violet ASCII-hands artwork; windows are light by default, with dark mode available. The metaphor is borrowed; the naming, icons, and brand are original. There is no hardware frame — the screen is the page.

## The idea

The OS is the portfolio. On larger screens the welcome window names Bradley, gives the one-line thesis, and puts the four live projects and the three ways in (Work, About, Say Hello) in the first view. On phones the welcome widget does the same above the app grid. Apps carry the content:

- **Work** — a project browser with a sidebar, project grid/list, preview, and live links.
- **Notes** — About Bradley, the vitals, and the toolkit.
- **Terminal** — an interactive local command line for skills, projects, contact, opening apps, and the README.
- **Mail** — the contact channels, real `mailto:` / `tel:` / social links, and copy-email feedback.
- **Web** — a browser-style project page for Newwell, Hizitickets, Towing Guru, and Budgetlite.
- **About This Portfolio** — the system card.
- **Search**, **Apps**, **Controls**, light/dark mode, brightness, Sleep, Restart, and a desktop context menu on larger screens.
- **README** — a document app inside the OS, opened from the desktop icon, phone app grid, Search, Terminal, Launchpad, or Controls. It is a window on larger screens and a full-screen view on phones.
- **Phone home** — iOS-style status bar, welcome widget, app grid, Search sheet, Controls sheet, and full-screen app views.

The README is an app, not a document below the page. It opens inside the OS with every project, skill, and contact link. A hidden flat edition still renders for no-JS and print only.

## Stack

- Astro 5 + React 19 + Tailwind's base reset
- Hand-written OS CSS in `src/styles/desktop.css` and `src/styles/ios.css`
- Lucide icons and an original SVG app-icon set
- No external fonts: the system UI stack and system mono; the B is an authored SVG path
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
│   ├── PortfolioOS.tsx     Shared state, macOS desktop, windows, overlays
│   ├── MobileOS.tsx        iOS home, app stack, Search and Controls
│   ├── apps.tsx            Welcome, Work, Notes, Terminal, Mail, Web, About, README, Trash
│   ├── ReaderBody.tsx      Shared README content and the ReaderApp
│   ├── MenuBar.tsx         Menus, clock, Controls
│   ├── Dock.tsx            Dock, running dots, Apps entry
│   ├── OSWindow.tsx        Draggable window chrome and traffic lights
│   ├── Spotlight.tsx       Search overlay (used by desktop and phone)
│   ├── Launchpad.tsx       Desktop app grid (component name)
│   ├── icons.tsx           Original app icons and the B mark
│   └── types.ts            App and window definitions
├── assets/wallpaper.webp   Supplied violet ASCII-hands artwork (WebP)
├── data/portfolio.ts       Real projects, skills, contact, bio
├── pages/index.astro       Portfolio OS + hidden no-JS/print fallback
├── layouts/Layout.astro    Metadata, fonts, global CSS
├── styles/desktop.css      macOS desktop, windows, apps, responsive and print
└── styles/ios.css          Phone home, app views, sheets, and mobile reader
```

## Interaction notes

- **Larger screens:** drag windows by the title bar, close/minimize/zoom with the traffic lights, or use **Window → Move Left / Move Right / Center** as a non-drag alternative. Ctrl/Cmd K opens Search; Escape closes menus and overlays; focus returns to the trigger.
- **Phones:** the macOS shell is replaced at 600px (and phone-height landscape) by an iOS-style home. Tap an app, use **Back** or **Home** in the app bar, open Search from the pill, and open Controls from the status bar or widget. The app grid scrolls on short screens; landscape uses a two-column home.
- **Appearance:** light windows by default; Controls switches to dark. The supplied artwork stays fixed while the surfaces and chrome restage.
- **Reduced motion:** the screen-on, window, notification, sheet, and dock motion is removed.
- **Touch:** phone controls are 44px; the desktop windows become a compact tablet stack between 601px and 900px.
- **README:** open it from the desktop README icon, phone README app, Search, Terminal (`cat README.md` / `open readme`), Launchpad, the menu bar, or the phone Controls sheet. It stays inside the OS; there is no page below to scroll.
- **No JavaScript:** the welcome or widget and the OS frame are static; the hidden README fallback becomes visible and carries every project, skill, and contact detail.
- **Print:** the README fallback prints on white; the OS is hidden.

## Content

All project descriptions, links, skills, and contact details come from the original portfolio. Nothing commercial — clients, metrics, testimonials, a CV, a live AI — was invented. The Terminal is a local interface over the same data. The wallpaper is the user-supplied `wallhaven-7jmgey_1920x1080.png`, converted to WebP; the earlier generated B wallpaper and its pointer parallax were retired at the user's request.
