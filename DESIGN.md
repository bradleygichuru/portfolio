---
name: "Bradley Gichuru — Portfolio OS"
description: "A full-bleed desktop portfolio on the supplied violet ASCII-hands artwork: a working Portfolio OS with light windows, a translucent dock, and a black Terminal."
colors:
  ivory: "#f7f1e6"
  sand: "#e7dfcf"
  artwork-black: "#0a0612"
  artwork-violet: "#8b63c0"
  artwork-shade: "rgba(3,4,9,0.38)"
  artwork-shade-soft: "rgba(3,4,9,0.28)"
  wall-word: "rgba(206,190,240,0.62)"
  wall-word-strong: "rgba(214,199,245,0.68)"
  b-teal: "#0f4b4f"
  b-amber: "#f3c17a"
  ink: "#1d1d1f"
  ink-muted: "#5c5c63"
  ink-faint: "#5f5f66"
  window: "#fbfaf7"
  window-secondary: "#f2f0ea"
  window-tertiary: "#e7e3da"
  line: "rgba(30,30,35,0.13)"
  accent: "#0057d9"
  accent-soft: "rgba(0,87,217,0.12)"
  terminal: "#0b0f13"
  terminal-text: "#e6edf3"
  terminal-green: "#7ee787"
  terminal-blue: "#79c0ff"
  dark-wall: "#071b22"
  dark-wall-2: "#0b2a31"
  dark-window: "#1e1f23"
  dark-window-2: "#27282d"
  dark-text: "#f5f5f7"
  dark-muted: "#b2b2b8"
  dark-accent: "#6cb0ff"
  tone-teal: "#0f5f59"
  tone-rose: "#a3322a"
  tone-amber: "#8a5a12"
  tone-forest: "#245c41"
  tone-cobalt: "#2254b8"
  placeholder: "#4f4f56"
  white: "#ffffff"
  black: "#000000"
  selection: "rgba(10,108,255,0.24)"
  traffic-close: "#ff5f57"
  traffic-close-edge: "#e14841"
  traffic-min: "#febc2e"
  traffic-min-edge: "#d9a020"
  traffic-zoom: "#28c840"
  traffic-zoom-edge: "#20a834"
  traffic-glyph: "rgba(0,0,0,0.62)"
  terminal-dim: "#8b98a3"
  terminal-error: "#ff8f8f"
  mail-error: "#c93d3d"
  note-gold: "#e6b23e"
  banner-yellow: "#ffd34d"
  sleep-amber: "rgba(243,193,122,0.82)"
  shadow-ink: "rgba(0,0,0,0.55)"
  reader-shadow: "rgba(30,28,22,0.18)"
  white-80: "rgba(255,255,255,0.8)"
  white-76: "rgba(255,255,255,0.76)"
  white-50: "rgba(255,255,255,0.5)"
  white-40: "rgba(255,255,255,0.4)"
  white-28: "rgba(255,255,255,0.28)"
  white-14: "rgba(255,255,255,0.14)"
  white-10: "rgba(255,255,255,0.1)"
typography:
  app-body:
    fontFamily: "system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.55
  display:
    fontFamily: "system-ui, sans-serif"
    fontSize: "clamp(27px, 2.5vw, 34px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  app-title:
    fontFamily: "system-ui, sans-serif"
    fontSize: "clamp(28px, 3.2vw, 40px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  reader-title:
    fontFamily: "system-ui, sans-serif"
    fontSize: "clamp(30px, 4vw, 44px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  label:
    fontFamily: "system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
  micro:
    fontFamily: "system-ui, sans-serif"
    fontSize: "8px"
    fontWeight: 600
    lineHeight: 1.2
  tiny:
    fontFamily: "system-ui, sans-serif"
    fontSize: "9px"
    fontWeight: 600
    lineHeight: 1.2
  caption:
    fontFamily: "system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
  small:
    fontFamily: "system-ui, sans-serif"
    fontSize: "11.5px"
    fontWeight: 400
    lineHeight: 1.4
  reading:
    fontFamily: "system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
  reader-lede:
    fontFamily: "system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  base:
    fontFamily: "system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.45
  title-sm:
    fontFamily: "system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.15
  title-lg:
    fontFamily: "system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.15
  title-xl:
    fontFamily: "system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.15
  heading:
    fontFamily: "system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.1
  heading-lg:
    fontFamily: "system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.05
  mono:
    fontFamily: "ui-monospace, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  window: "11px"
  window-lg: "12px"
  overlay: "13px"
  dock: "18px"
  dock-compact: "15px"
  sheet: "10px"
  menu: "8px"
  panel: "9px"
  compact: "7px"
  button: "6px"
  label: "5px"
  small: "4px"
  tiny: "2px"
  icon: "14px"
  light: "50%"
spacing:
  xxs: "2px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "30px"
  3xl: "38px"
components:
  window:
    backgroundColor: "{colors.window}"
    textColor: "{colors.ink}"
    rounded: "{rounded.window}"
    padding: "0"
  menu-bar:
    backgroundColor: "rgba(250,248,243,0.9)"
    textColor: "{colors.ink}"
    height: "28px"
    fontSize: "12.5px"
  dock:
    backgroundColor: "rgba(250,248,243,0.82)"
    rounded: "{rounded.dock}"
    padding: "6px 9px 5px"
  primary-button:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    height: "30px"
  search-field:
    backgroundColor: "{colors.window}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    height: "28px"
  terminal:
    backgroundColor: "{colors.terminal}"
    textColor: "{colors.terminal-text}"
    rounded: "0"
    fontSize: "12.5px"
---

# Design System: Bradley Gichuru — Portfolio OS

## Overview

**Creative North Star: "The Portfolio Desktop"**

The portfolio is a working desktop, not a webpage dressed as a laptop. A visitor lands on a full-bleed Portfolio OS: the supplied violet ASCII-hands artwork on near-black, a translucent light menu bar, a dock, and a centered welcome window that names Bradley and puts the four live projects one click away. The two hands frame the welcome; the authored **B** lives in the chrome, not as a wallpaper glyph. There is no hardware frame; the screen is the page.

The OS is the navigation and the proof. Work is a Finder-like project browser; Notes is About; Terminal is Skills; Mail is Contact; Web is the project page; About This Portfolio is the system card. Search, Apps, and Controls are original features with original names. The flat reader below the desktop is the accessible, no-JS, printable edition. The tone is calm, precise, and quietly playful: a real tool you can use, not a costume.

**Key Characteristics:**
- The user-supplied violet ASCII-hands artwork on near-black, full-bleed and fixed.
- Light windows by default; dark mode restages the windows, menu bar, dock, and tone colors while the artwork stays fixed.
- The authored B lives in the welcome, menu bar, app icon, README file, favicon, and sleep screen.
- White/graphite windows with red/yellow/green traffic lights; 11px corners; opaque content panes.
- Translucent chrome only: menu bar, dock, Controls, notifications.
- System UI type in the windows; one true-black Terminal in monospace.
- Every interaction a visitor can see actually works: windows drag, apps open, Search finds, Terminal answers, contact links resolve.
- Original naming and icons. No Apple logos, feature names, or product names.

## Colors

The palette is a staged room: the supplied violet artwork on near-black is the ground; warm white windows sit on it; a system blue carries action; deep teal and amber carry the authored B. Dark mode is the same room at night, not a filter.

### Primary
- **System Blue** (`accent`, `#0057d9` light / `#6cb0ff` dark): primary buttons, selection, focus rings, links, and the active Search result. It is the one action color.
- **Deep Teal** (`b-teal`, `#0f4b4f`): the authored B in light mode and the README mark.
- **Artwork Violet** (`artwork-violet`, `#8b63c0`): the hands' ink and the wallpaper wordmark; never a UI action color.

### Secondary
- **Window White** (`window`, `#fbfaf7`): app reading surfaces and the welcome card.
- **Window Grey** (`window-secondary`, `window-tertiary`): title bars, toolbars, sidebars, and selected rows.
- **Ink** (`ink`, `#1d1d1f`): body and display text; never pure black.
- **Muted Ink** (`ink-muted`, `#5c5c63`) and **Faint Ink** (`ink-faint`, `#5f5f66`): metadata and labels at a contrast that clears 4.5:1.

### Tertiary
- **Project tones** (`tone-teal`, `tone-rose`, `tone-amber`, `tone-forest`, `tone-cobalt`): flat file-tab colors for Newwell, Hizitickets, Towing Guru, Budgetlite, and the cobalt fallback. Light values are dark enough for text; dark values are light enough for dark surfaces.
- **Terminal green** (`terminal-green`, `#7ee787`) and **terminal blue** (`terminal-blue`, `#79c0ff`): prompt, commands, links, and output in the one dark room.
- **Amber B** (`b-amber`, `#f3c17a`): the authored B in dark mode and the sleep mark.

### Neutral
- **Artwork Black** (`artwork-black`, `#0a0612`) and the artwork shades: the full-bleed ground and its top/bottom protection.
- **Ivory** (`ivory`, `#f7f1e6`) and **Sand** (`sand`, `#e7dfcf`): the reader's paper field, no longer the desktop ground.
- **Terminal Black** (`terminal`, `#0b0f13`): the one true-black app surface.
- **Dark window** (`dark-window`, `dark-window-2`): the dark-mode app surfaces.

### Named Rules
**The Lit Desktop Rule.** Start with light windows. Dark mode restages the windows, chrome, and tone colors; the supplied artwork is the fixed ground in both modes.

**The One Black Room Rule.** The Terminal is the one true-black app surface. The artwork is a near-black ground, not a UI surface; every app surface is white, graphite, or a project tone.

**The Chrome-Only Blur Rule.** Backdrop blur belongs to the menu bar, dock, Controls, and notifications. Content windows and the reader stay opaque.

**The Authored B Rule.** The B is an SVG path (`B_PATH`), never a font glyph. It appears in the welcome, menu bar, app icon, README file, favicon, and sleep screen — never over the artwork as a watermark. It is a geometric mark; the early "serif B" descriptor was retired at finish.

**The No-Apple-Names Rule.** The features are **Search**, **Apps**, and **Controls**. No Apple logos, product names, feature names, or SF fonts.

## Typography

**UI Font:** the visitor's `system-ui` face, with a generic sans fallback. No webfont.
**Mono Font:** the visitor's `ui-monospace` face, with a generic monospace fallback.
**Mark:** the B is a drawn SVG path, not type.

**Character:** A neutral, high-legibility interface face that disappears into the OS, against a monospace Terminal that sounds like a machine. The contrast is the point: the desktop is quiet; the Terminal is the one place with a voice.

### Hierarchy
- **Display** (700, `clamp(27px, 2.5vw, 34px)`, 1, −0.025em): the welcome name.
- **App title** (700, `clamp(28px, 3.2vw, 40px)`, 1, −0.03em): the Web project name.
- **Reader title** (700, `clamp(30px, 4vw, 44px)`, 1, −0.035em): the flat edition's name.
- **App body** (400, 13px, 1.55): window copy, descriptions, and notes.
- **Label** (600, 10px, 0.08em, uppercase): sidebar labels, preview types, metadata, and project kinds.
- **Mono** (400, 12.5px, 1.55): all Terminal output and input.

### Named Rules
**The Native Voice Rule.** Use the system UI face for the OS and the system mono face for the Terminal. No display webfont, no brand typeface, no second sans.

**The Small-Label Rule.** Labels are 9.5–10px uppercase with 0.08em tracking. They name a region; they never carry a sentence.

**The No-Eyebrow Rule.** A project's type sits beside or below its name, never as a kicker above it.

## Layout

The desktop is exactly one viewport tall (`100svh`, min 560px) and full-bleed. The menu bar is 28px; the dock floats 7px above the bottom edge; windows are positioned in percentages of the desktop so they compose at every width. The artwork is `cover`-cropped and center-positioned. The welcome window opens at 41% × 46% in the gap between the hands (29.5% / 18%); Work opens at 66% × 64%; Web at 68% × 68%; Notes at 54% × 60%; Terminal at 58% × 56%; Mail at 62% × 62%.

The Work window is a three-column browser: 178px sidebar, fluid project grid, 236px preview. Notes is a 168px sidebar plus a 62ch note. Mail is 154px / 214px / fluid. The reader below is a 1000px window with a 70ch reading column.

At **900px** the desktop becomes a phone/tablet stack: one full-screen window at a time, the dock at the bottom, the notification hidden, and the welcome as a floating card (16px inset, 620px max height). Between 561px and 900px the welcome is capped at 680×560 and centered. At **560px** the welcome turns one-column, the project grid becomes rows, mail actions stack, and the reader becomes one column. At **1180px** the Work and Mail side columns narrow and desktop icons hide.

The reader is the flat edition: every project, skill, and contact detail in semantic order. It prints on white with the desktop hidden, project URLs appended, and the footer link removed.

## Elevation & Depth

Depth is window layering, not glass. Content windows are opaque and float on two shadows: a wide ambient shadow and a tight contact shadow. The active window gets a stronger pair. The dock and menu panels get a deeper chrome shadow. The artwork has no card, frame, or border; a soft top/bottom shade protects the chrome without veiling the hands.

The menu bar and dock use a saturated backdrop blur because they sit over the artwork; that translucency is chrome, not content. The welcome, Work, Notes, Terminal, Mail, Web, About, and reader are fully opaque.

### Shadow Vocabulary
- **Window at rest** (`0 20px 50px rgba(30,28,22,.2), 0 2px 8px rgba(30,28,22,.1)`): a background app window.
- **Window active** (`0 28px 70px rgba(25,24,20,.28), 0 3px 10px rgba(25,24,20,.14)`): the focused window.
- **Chrome** (`0 24px 60px rgba(30,28,22,.24), 0 2px 8px rgba(30,28,22,.12)`): menu panels, Controls, and notifications.
- **Dock** (`0 14px 34px rgba(25,24,20,.22), inset 0 1px 0 rgba(255,255,255,.45)`): the floating dock.

**The Layer Rule.** A shadow describes a window above the desktop. If it reads as a glow, remove it.

## Shapes

Windows are 11px rounded rectangles with a 38px title bar and three 12px traffic-light circles inside 24px hit targets. Cards, buttons, and fields use 6px; menus and Search results use 8px; the dock uses 18px; overlays use 13px; app icons are 14px rounded squares drawn as SVG. The only perfect circles are the traffic lights, the app-icon envelope dome, and the Search/Wi-Fi status glyphs.

The B is the one bespoke shape: a heavy, slightly squared geometric B with two counters, drawn as a single even-odd path. It is the brand, the favicon, the welcome mark, the menu-bar mark, and the sleep mark. It is never replaced by a system character and never watermarked over the artwork.

**The Authored-Mark Rule.** The B must come from `B_PATH`. No Georgia, no Times, no text glyph fallback.

## Components

### Menu Bar
28px translucent bar: the B menu, the active app name, File / Edit / View / Window / Help, Search, Controls, Wi-Fi, battery, and a live date/time. Menus open on click, focus their first item, close on Escape, and return focus to the trigger. File, Edit, View, Window, and Help contain working commands: open Work, close/minimize/zoom, Copy, Reader Mode, full screen, Move Left/Right/Center, Bring All to Front.

### Windows
Opaque app frames with a 38px title bar, 24px traffic-light buttons, and drag-by-titlebar. Double-clicking the title bar zooms; the green button toggles a 98% × 88% zoom; the yellow button minimizes; the red button closes. A window can also be moved with **Window → Move Left / Move Right / Center** — no drag-only action.

### Dock
A floating translucent bar with Work, Notes, Terminal, Mail, Web, Apps, and Trash. Icons are 48px in 54px targets on desktop (40px in 44px on compact); a dot marks running apps; hover lifts the icon and names it. Apps opens the app grid; Trash opens the empty-state app.

### Welcome
The first window, centered in the gap between the hands. A 64px authored B, the name, role, one-line thesis, **Open Work / Read About / Say Hello**, the four real projects as recent-work buttons, and a tip. On compact, the recent-work row is hidden, the tip switches to touch guidance, and the card fits its content so the artwork remains visible above and below. In no-JS, the actions and recent work are hidden and a banner points to the reader.

### Work
A Finder-like browser: back/forward, search, grid/list toggle, Favourites and Projects sidebar, project tiles, and a preview pane with **Open project** and **Visit live site**. One tap opens a project on compact; double-click opens it on desktop. The search filters name, type, and description with a named empty state.

### Notes
A two-pane About: a Notes sidebar (About Bradley, Work, Terminal, Mail) and a 62ch note with the bio, vitals, and **Say hello**.

### Terminal
The one true-black room. A local command interface with prompt history (↑/↓), Ctrl/Cmd-L clear, and commands: `help`, `whoami`, `about`, `skills`, `projects`, `contact`, `ls`, `pwd`, `date`, `theme`, `cat README.md`, `open <app|project>`, `echo`, `clear`, `sudo`, `exit`. It is not a shell and never pretends to be one.

### Mail
A three-pane contact app: mailboxes, a single "Let's build something" invitation, and a reading pane with Phone, GitHub, LinkedIn, **Reply**, and **Copy email** with copied/error feedback. The email address is present in the message header and in Copy email; the duplicate primary was removed.

### Web
A Safari-style browser frame with a URL field and a live-site button. A project page shows the name, type below the name, description, **Visit live project**, **Back to Work**, and the other three projects. The start page lists all four.

### About This Portfolio
The system card: the B app icon, name, role, Portfolio OS 1.0, project count, toolkit, email, **Read About**, and **Say hello**.

### Search (Ctrl K / Cmd K)
A Spotlight-style command surface with a combobox input, arrow-key selection, Enter to open, Escape to close, result counts announced, and focus returned to the trigger. It indexes apps, projects, skills, contacts, and the reader. On compact the placeholder shortens and the shortcut hint hides.

### Apps
A full-screen app grid with a filter field, Escape to close, a focus trap, and focus restoration. It lists Work, Notes, Terminal, Mail, Web, and About This Portfolio.

### Controls
Appearance (Light/Dark), brightness, Wi-Fi, Bluetooth, Focus, and battery. Appearance and brightness are real: brightness dims the whole screen; dark mode restages every token. Focus adds a moon in the menu bar.

### Notification
A welcome notification with **Open Work** and dismiss. It auto-dismisses after 10 seconds and is hidden on compact.

### Reader
The flat edition below the desktop: About, Work, Skills, Contact, project URLs, real links, and a print stylesheet. It is the screen-reader and no-JS edition, and it prints clean.

## Do's and Don'ts

### Do:
- **Do** keep the supplied violet artwork full-bleed and fixed, with the welcome centered in the hands' gap.
- **Do** keep the authored B path everywhere the mark appears.
- **Do** keep the menu bar, dock, and windows working: drag, minimize, zoom, close, open, search, type.
- **Do** keep the three ways into contact: Mail, the welcome's Say Hello, and the reader.
- **Do** keep the original names Search, Apps, and Controls; never reintroduce Apple feature names.
- **Do** keep the 24px minimum targets, 2px focus rings, keyboard routes, reduced-motion freeze, and no-JS reader.
- **Do** keep the dark mode a full restaging, not an inversion.
- **Do** keep the print stylesheet: white reader, desktop hidden, project URLs visible.

### Don't:
- **Don't** add laptop hardware, a notch, a keyboard deck, or a desk scene; the screen is the page.
- **Don't** reintroduce the generated B wallpaper, contour rings, or pointer parallax.
- **Don't** put content in glass cards, neon gradients, or a hero-and-cards layout.
- **Don't** use pure black outside the Terminal or pure white as a page ground.
- **Don't** use blur on content windows.
- **Don't** put a kicker above a heading.
- **Don't** make dragging, hover, or a pointer the only route to any action.
- **Don't** invent clients, metrics, testimonials, a CV, or a live AI.
- **Don't** use Apple logos, Apple feature names, or SF fonts.

## Provenance

The only shipping raster is the user-supplied artwork. All UI is CSS and inline SVG, with the vector `public/favicon.svg`; the review captures in `.impeccable/review/` are production-build evidence, not shipped assets. The desktop ground is the user-supplied `wallhaven-7jmgey_1920x1080.png`, converted to `src/assets/wallpaper.webp` (232 KB). The earlier generated B wallpaper, contour rings, and pointer parallax are retired. The direction seed is `seed:4e51f01872f67bc0`; the user-pinned Portfolio Desktop direction beats the roll. The early "serif B" line in the surface brief is retired: the finished mark is the authored geometric B drawn in `B_PATH`.
