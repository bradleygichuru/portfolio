---
name: "Bradley Gichuru — Portfolio"
description: "A paper-engineered solar system portfolio: one spread, four worlds, four project moons, and fold-out dossiers."
colors:
  paper: "#f3e9d2"
  paper-light: "#faf3e4"
  paper-deep: "#e8d7b7"
  paper-edge: "#dcc9a6"
  ink: "#1b2a38"
  ink-soft: "#4d5a66"
  ink-faint: "#5c6873"
  desk: "#10201d"
  cream: "#fbf5e6"
  cobalt: "#2456c7"
  tomato: "#dd4f2a"
  tomato-dark: "#a8371b"
  sunflower: "#f2b31a"
  sunflower-dark: "#c78b08"
  forest: "#2c6a4e"
  lilac: "#7a68ad"
typography:
  display:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(3.4rem, min(6.2vw, 9.5svh), 5.5rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(3rem, 5vw, 4.8rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(2rem, 3vw, 2.8rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "0.64rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  sheet: "0px"
  disc: "50%"
  tab: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "72px"
components:
  pull-tab:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tab}"
    height: "34px"
    width: "150px"
    padding: "0 12px 0 26px"
  pull-tab-active:
    backgroundColor: "{colors.tomato-dark}"
    textColor: "{colors.cream}"
    rounded: "{rounded.tab}"
  search-field:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    height: "44px"
  planet-key-item:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "32px"
  dossier-close:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "8px 12px"
  index-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    height: "44px"
---

# Design System: Bradley Gichuru — Portfolio

## Overview

**Creative North Star: "The Pop-Up Orbit"**

The portfolio is one working paper solar system, not a dark starfield with cards floating on it. A large-format 1970s science annual is the physical reference: warm stock, flat process inks, a real gutter, die-cut discs, fold-out dossiers, and a pull tab that sets the system moving. The paper is the page; the solar system is the navigation.

The interface is an Experience surface, so the artifact leads. A visitor reads the masthead on the left page, sees four named worlds on the plate, pulls the tab, and unfolds a dossier with real work, skills, and contact details. The flat guide below is the printable, machine-readable edition. The tone is playful, tactile, and quietly confident; it never becomes a children's book or a sci-fi console.

**Key Characteristics:**
- Warm cream stock and prussian ink; the deep desk is the only dark field.
- Five flat spot inks: cobalt, tomato, sunflower, forest, and lilac.
- Square paper sheets, hairline orbits, die-cut circles, and fold-out panels.
- Self-hosted Young Serif for the display; Archivo for body and labels.
- Search, hover, focus, touch, reduced motion, no-JS, and print are all designed states.
- One authored motion: the orbit; the map steadies on hover/focus and starts paused on touch.

## Colors

The palette is a printer's drawer: one warm ground, one dense ink, and five flat spot inks with a single darker tomato for small text.

### Primary
- **Tomato Ink** (`tomato`): the active pull tab, the role square, focus rings, the Work planet, links on hover, and the display misregistration. It is the one accent that signals action.
- **Deep Tomato** (`tomato-dark`): the active pull tab only, where cream text needs the extra contrast; also the small H moon and the print fallback.

### Secondary
- **Cobalt** (`cobalt`): About, the calm/cool world; the search results and the "home" planet.
- **Sunflower** (`sunflower`): the sun, Contact, the signal dot's warmth, and the highlight wash on selected project rows.

### Tertiary
- **Forest** (`forest`): Skills and the About continent; the live signal dot.
- **Lilac** (`lilac`): the third facet of the Skills planet; used only there.
- **Sunflower Deep** (`sunflower-dark`): the Work ring and small sunflower details.

### Neutral
- **Warm Stock** (`paper`): the book spread, the field guide, and the dossier sheets.
- **Stock Light** (`paper-light`): the pull tab, the planet key, the search field, and the planet flags' former paper.
- **Stock Deep** (`paper-deep`, `paper-edge`): the page stack, the plate tint, and the book's edge.
- **Prussian Ink** (`ink`): the display, body, rules, and paper-edge shadows.
- **Soft Ink** (`ink-soft`): secondary copy, labels, and metadata.
- **Faint Ink** (`ink-faint`): the plate legend, at a contrast that still clears the floor.
- **Deep Desk** (`desk`): the table around the book; never a UI surface.
- **Cream** (`cream`): text on the desk and on the darker spot inks.

### Named Rules
**The Paper Ground Rule.** Every screen is a sheet of warm stock. The deep desk exists to hold the book, not to become a second page.

**The Spot-Ink Rule.** Cobalt, tomato, sunflower, forest, and lilac are flat printing inks. Each world owns one; never gradient them, never glow them, and never scatter all five as UI chrome.

**The Registration Rule.** Keep the print marks: the 1px off-register tomato offset on display headings and the registration target at the plate's top-left. They are evidence of the press, not decoration.

## Typography

**Display Font:** Young Serif (with Georgia, serif)
**Body Font:** Archivo (with system-ui, -apple-system, sans-serif)
**Label Font:** Archivo, uppercase with generous tracking

**Character:** A warm, slightly eccentric book face against a clean grotesque. Young Serif carries the cover and the dossier titles; Archivo does the reading, the labels, and the tabular clock. The pairing feels printed rather than screenshotted.

### Hierarchy
- **Display** (400, `clamp(3.4rem, min(6.2vw, 9.5svh), 5.5rem)`, 0.86): the masthead and the one-page thesis.
- **Headline** (400, `clamp(3rem, 5vw, 4.8rem)`, 0.9): dossier titles and the flat guide title.
- **Title** (400, `clamp(2rem, 3vw, 2.8rem)`, 1): flat guide section headings.
- **Body** (400, 1rem, 1.55): dossier and flat guide copy, held to 62–68ch.
- **Label** (500, 0.64rem, 0.14em tracking, uppercase): contents, planet key, plate legend, metadata, and the pull tab.

### Named Rules
**The One Display Voice Rule.** Young Serif is the only display face. No second serif, no system display face, no condensed substitute.

**The No-Eyebrow Rule.** A label never sits above a heading. The heading carries its own weight; labels live beside, below, or in the margin.

## Layout

The home is a two-page spread: a 38% left page and a 62% plate, joined by a soft gutter and a single page stack. The left page carries the masthead, the live index, and the orbit clock. The plate carries the solar map, the world key, the plate legend, and the pull tab. The map is a square that scales with the viewport (`min(100%, 100svh − 330px, 720px)`), centered inside the plate.

Below 960px the spread becomes one page: masthead, plate, index, status. The map becomes a 460px square at tablet and 360px at phone; the key sits under the map and names all four worlds above the fold. The pull tab becomes a compact horizontal paper tab at the top-right of the plate, still with its die-cut hole and slight tilt. The flat guide is a separate 1200px sheet with a 26% label column and a 68ch reading column; at phone it becomes one column.

The spacing rhythm is tight inside a group and generous between groups: 4/8/12/16/24/32/48/72. The page margin is fluid (`clamp(20px, 4vw, 56px)`), and headings always get more space above than below. The flat guide is the print edition: `@page` 18mm, white paper, the book and desk removed, project URLs appended.

## Elevation & Depth

Depth is paper, not glass. The book floats on the desk with a soft offset shadow and a 2px paper stack; planets are die-cut discs with layered, blurred shadows; the pull tab has a physical 2px edge and a die-cut hole; the dossier lifts on a diffuse shadow with a vertical fold crease. There is no blur, no glass, no neon halo, and no zero-offset colored glow.

### Shadow Vocabulary
- **Book at rest** (`0 30px 60px -18px rgba(0,0,0,.65), 0 60px 120px -40px rgba(0,0,0,.5)`): the spread on the desk.
- **Planet layer** (`drop-shadow(0 10px 10px rgba(27,42,56,.2))`): the die-cut disc; the moon layer uses the same smaller.
- **Paper tab** (`2px 2px 0 rgba(27,42,56,.12), 0 10px 20px rgba(0,0,0,.25)`): the physical tab edge; an exception earned by the paper object.
- **Dossier** (`0 40px 80px -20px rgba(0,0,0,.7)`): the fold-out above the spread.

**The Paper-Edge Rule.** A shadow describes a physical layer: it carries an offset and a blur. If it reads as a halo, remove it.

## Shapes

The sheet is square. Paper has no rounded cards and no pills: the book, the plate, the dossier, the field guide, the pull tab, and the search field all keep a 0px radius. The only circles are the die-cut planets and moons, the orbit rings, the sun, the signal dot, and the registration target. The Work ring is a flat ellipse; the Skills planet is a three-color conic disc with a thin cream ring; the Contact planet carries a dashed signal ring. The pull tab has a 9px die-cut hole at its leading edge.

**The Die-Cut Rule.** Circles are objects punched out of the page, never badges added to it. They carry no gloss, no border radius beyond 50%, and no gradient sphere shading.

## Components

### The Book Spread
The primary surface. Cream stock, a soft gutter at 38%, a 2px page stack, a grain overlay, and one authored settle on load. The left page is a title page and index; the right page is a printed plate. It never becomes a dashboard.

### The Plate and Solar Map
A square map with a hairline crosshair, four printed orbit rings, a dot-screen field, and a registration target at the top-left. The sun is a flat sunflower disc with twelve tomato rays and a serif B. The four worlds are discs with their initial; the Work world carries four visible project moons at rest. The map pauses on hover and focus, starts paused on coarse pointers, and respects reduced motion.

### The Planet Key
The plate's printed legend: ABOUT / WORK / SKILLS / CONTACT, each a 32px link with a spot-ink dot. It names the worlds on mobile and tablet where the map labels are absent, and it gives keyboard and touch a direct second route into each world.

### Planets and Moons
Each world owns a disc: Terra (cobalt with a forest continent), Ring (tomato with a sunflower ring), Facet (three-color conic), Signal (sunflower with a dashed ring and ink initial). The four project moons are small cobalt, deep-tomato, sunflower, and forest discs with letters N/H/T/B; their hit area is expanded by a 6px transparent halo, and the Work dossier lists the full project names.

### The Pull Tab
The signature physical control. Desktop: a vertical paper tab on the outer edge, 34×156px, with a die-cut hole and vertical label. Tablet/phone: a 150×34px horizontal paper tab at the top-right of the plate, still tilted −1.5°, still with the hole. Active state is deep tomato with cream text; inactive is stock with ink. It starts the orbit, pauses it, and never becomes a full-width app button.

### The Index and Search
A printed contents list on the left page: world name, tagline, planet name, and an arrow on hover. Search is a live filter over worlds, projects, skills, and contact channels; matching worlds stay full and all others dim on the map, with a sunflower ring on the match. The empty state names the query and offers Newwell, React, and Contact. Focus is a 2px tomato ring on the field; the clear control is at least 32px.

### The Dossier
A fold-out sheet over the spread, 34% cover column and 66% reading column, with a fold crease, a sticky Fold back control, a planet portrait, and real content. Work lists the four projects as moon rows; Skills is a four-row manifest; Contact is a postcard with email, copy, phone, GitHub, and LinkedIn. Focus is trapped, Escape and backdrop close, and focus returns to the trigger.

### The Flat Guide
The printable edition below the book: the same About, Work, Skills, and Contact in a semantic, crawlable, no-JS-safe sheet. It carries the project URLs in print, hides the TOC and back links, and remains readable at 68ch.

## Do's and Don'ts

### Do:
- **Do** keep the warm stock, prussian ink, five flat spot inks, and the grain.
- **Do** keep the gutter, the 0px paper edges, the die-cut discs, the registration target, and the 1px ink misregistration.
- **Do** keep the plate key; the worlds must be named above the fold at 390, 768, and 1440.
- **Do** keep the four project moons visible at rest and the Work dossier's moon rows.
- **Do** keep the paper pull tab at every width, including its die-cut hole and active deep-tomato state.
- **Do** keep the 32px controls, 2px focus ring, keyboard trap, reduced-motion pause, touch pause, and flat-guide fallback.
- **Do** keep the print stylesheet: white paper, flat guide only, project URLs.

### Don't:
- **Don't** introduce glass, backdrop blur, neon, gradient text, a dark starfield, or a glowing-gradient planet.
- **Don't** turn the spread into same-size cards, pill chips, or a dashboard.
- **Don't** put a kicker or eyebrow above a heading.
- **Don't** gradient the spot inks or use them as generic UI chrome.
- **Don't** hide the world names, the moons, or the pull tab on small screens.
- **Don't** shrink the desktop spread into a phone; the phone is a single page, not a miniature book.
- **Don't** invent clients, metrics, testimonials, a CV, or a live AI chat; use only the real portfolio content.
- **Don't** use a system display face, Unicode glyph icons, or a second display serif.
- **Don't** remove the flat guide, the print edition, or the no-JS anchors.
