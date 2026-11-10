# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences, equally weighted:

- **Potential clients** evaluating whether Bradley can own a real product end to end — architecture, frontend, backend, payments, deployment.
- **Potential employers** evaluating engineering range, shipped work, and communication style for a full-time role.

Both arrive with limited time, often from a link in a message or CV, and on a phone as often as a desktop. Their job: understand what Bradley builds, see credible proof, and decide whether to start a conversation.

## Product Purpose

A personal portfolio for Bradley Gichuru (Bradley Kabecha), a full-stack developer specializing in web and mobile products. It exists to turn a quick look into a qualified conversation about project work or a role.

Success means a visitor understands Bradley's range from the first screen, opens at least one app or piece of work in depth, and leaves via email, phone, LinkedIn, GitHub, or a project link.

## Positioning

A full-stack builder who ships complete products rather than isolated layers: web and mobile interfaces, backend services, data, and the operational details that make a product real. The proof is shipped work across music analytics, event ticketing, price estimation, and personal finance — not a list of frameworks.

## Operating Context

Visitors skim on phones and desktops. They may not know the OS metaphor in advance. On larger screens the first view must explain itself through a welcome window, a recognizable menu bar and dock, and one obvious way into the work. On phones it must explain itself through a welcome widget, a recognizable app grid and dock, and one obvious way into the work. The site is a static Astro build; the simulated desktop is client-side and must work without a server. Existing contact channels are public and may be used: email, phone, GitHub, LinkedIn.

The OS is a portfolio interface, not a real operating system. It does not need to reproduce every macOS or iOS behavior, but the interactions it shows must actually work: windows move on larger screens, apps open everywhere, search finds, the terminal responds, contact links resolve.

## Capabilities and Constraints

- Single-page portfolio built with Astro, React, Tailwind CSS, and client-side JavaScript.
- The desktop OS is a client-side React island. No backend, no real shell, no live AI. The Terminal is a local command interface over the real portfolio data.
- No CV file, headshot, testimonials, client logos, or case-study metrics exist in the repository. Do not fabricate them.
- Real project content available: Newwell, Hizitickets, Towing Guru, Budgetlite, with descriptions and live links.
- Real skills list and social/contact links exist in `src/pages/index.astro`.
- No Apple logos or trademarks. The interface is an original "Portfolio OS": a macOS-inspired desktop on larger screens and an iOS-inspired home screen on phones, with a custom B mark and app icon set. The UI uses original names: Search, Apps, Controls, Work, Notes, Terminal, Mail, Web.
- The interaction must remain usable with keyboard, reduced motion, and screen readers, must not depend on dragging or hover, and must degrade to readable content if JavaScript fails.

## Brand Commitments

- Name: Bradley Gichuru; also publishes as Bradley Kabecha. Use "Bradley" in the interface.
- Voice: first person, direct, unpretentious, quietly confident. No hype or invented claims.
- The portfolio is an interactive, full-bleed Portfolio OS. Tablets and larger screens get a macOS-inspired desktop with draggable windows, menu bar, dock, Search, Apps, Controls, and a working local Terminal. Phones get an iOS-inspired home screen with a status bar, welcome widget, four-column app grid, Search pill, four-icon dock, full-screen app views, and a Controls sheet. The default appearance uses light windows; a dark mode is available. It uses original Portfolio OS naming and no Apple branding.
- The desktop ground is the user-supplied violet ASCII-hands artwork (source: `wallhaven-7jmgey_1920x1080.png`; shipped as `src/assets/wallpaper.webp`). The B remains an authored mark in the welcome and chrome, not a wallpaper glyph. The artwork is decorative; all content remains HTML.
- The OS uses the portfolio's real content as apps: Work, Notes/About, Terminal/Skills, Mail/Contact, a browser-style Web app for projects, and About This Portfolio. No Apple branding or logos.
- This is a binding creative direction. The previous solar-system world is explicitly scrapped.

## Evidence on Hand

- `src/pages/index.astro`: current biography, project descriptions, skills, and contact links.
- Live projects: https://web.newwell.app/, https://hizitickets.com, https://towingguru.net/, https://budgetlite-nextjs.vercel.app/
- Contact: bradleygichuru@gmail.com, +254 768 085 236, github.com/bradleygichuru, linkedin.com/in/bradley-kabecha-830678235
- No source-controlled screenshots of project work; project links are the proof.

## Product Principles

1. **The OS is the proof.** A coherent, working interface demonstrates systems thinking better than a list of frameworks.
2. **Meet the device.** The desktop is the right metaphor on a large screen; the phone gets a native-feeling home screen, not a shrunken desktop.
3. **Depth on demand.** The first view stays legible; every app, window, and file hides real detail for visitors who explore.
4. **One move to a conversation.** Mail, the menu bar or widget, and the reader all reach contact; never bury it behind the metaphor.
5. **Play is earned by clarity.** Windows drag, apps open, and Search finds things because the controls work, not because the visitor decodes a puzzle.
6. **Tell the truth.** Use only the work, skills, and contact details that exist. The Terminal is a local interface, not a shell; no fake AI, metrics, or clients.

## Accessibility & Inclusion

Target WCAG 2.2 AA: keyboard access to the menu bar, dock, windows, Search, Apps, and Terminal on larger screens; 44px phone touch targets; visible focus; meaningful window, app, and control labels; reduced-motion support; no content or action that depends on dragging or hover alone; and a reader/flat-text edition with all work, skills, and contact details for no-JS and screen-reader visitors.
