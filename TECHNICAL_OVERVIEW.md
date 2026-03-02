# Technical Overview — Tanvi Portfolio App

This document describes the app architecture, file structure, and key technical details so another AI (or developer) can add features confidently.

---

## 1. Tech Stack & Tooling

| Layer | Technology |
|-------|------------|
| **Runtime** | React 18, TypeScript |
| **Build** | Vite 5 (SWC via `@vitejs/plugin-react-swc`) |
| **Routing** | React Router v6 (`react-router-dom`) |
| **Styling** | Tailwind CSS 3, CSS variables (HSL), `tailwindcss-animate` |
| **UI primitives** | shadcn/ui (Radix UI + CVA + Tailwind); components in `src/components/ui/` |
| **Animation** | Framer Motion (`framer-motion`) |
| **Particles** | `@tsparticles/react` + `@tsparticles/slim` |
| **Data/forms** | `@tanstack/react-query`, `react-hook-form`, `zod`, `@hookform/resolvers` (available; not heavily used in current pages) |
| **Testing** | Vitest, `@testing-library/react`, `jsdom` |
| **Package manager** | npm (lockfile present); repo also has `bun.lockb` |

- **Dev server**: Vite, `host: "::"`, `port: 8080`, HMR overlay disabled.
- **Path alias**: `@` → `./src` (see `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`).

---

## 2. File Structure

```
tanvi_portfolio/
├── index.html                 # Single entry; root div #root, script /src/main.tsx
├── package.json
├── vite.config.ts             # Vite + React SWC, @ alias
├── tailwind.config.ts         # Theme (colors from CSS vars), fonts, keyframes
├── postcss.config.js
├── tsconfig.json              # Project refs; paths @/* → ./src/*
├── tsconfig.app.json          # App code (src), paths, noEmit
├── tsconfig.node.json         # Node/config
├── components.json            # shadcn config: style default, tailwind, aliases
├── eslint.config.js
├── vitest.config.ts
├── public/                    # Static assets (no processing)
│   ├── favicon_td.ico
│   ├── Tanvi.jpeg
│   ├── TanviSoftware2.pdf     # Resume download
│   ├── og-image.png
│   ├── DASHLogoBloo.png
│   ├── CAPG.png
│   ├── KJSCE-Logo.png
│   ├── NEU.png
│   └── somaiya white logo.png
└── src/
    ├── main.tsx               # React root: createRoot, App, index.css
    ├── App.tsx                # Providers + Router (see below)
    ├── App.css                # (if any app-level styles)
    ├── index.css              # Global: fonts, Tailwind, CSS variables, component classes
    ├── vite-env.d.ts
    ├── lib/
    │   └── utils.ts           # cn() — clsx + tailwind-merge for classNames
    ├── hooks/
    │   ├── use-mobile.tsx     # Breakpoint hook (likely for responsive UI)
    │   ├── use-toast.ts
    │   └── (toaster usage in ui/)
    ├── pages/
    │   ├── Index.tsx          # Main single-page content (sections in order)
    │   └── NotFound.tsx       # 404 route
    ├── components/
    │   ├── Navbar.tsx         # Fixed top nav; anchor links (#about, #experience, …)
    │   ├── HeroSection.tsx    # Sticky hero; particles; CTA buttons
    │   ├── AboutSection.tsx   # About + philosophy cards + InteractiveTerminal
    │   ├── ExperienceSection.tsx
    │   ├── SkillsSection.tsx
    │   ├── ProjectsSection.tsx
    │   ├── EducationSection.tsx
    │   ├── ContactSection.tsx
    │   ├── ParticleBackground.tsx   # tsparticles canvas for hero
    │   ├── TiltCard.tsx       # Mouse-follow tilt + glow on cards
    │   ├── TypingTerminal.tsx       # Auto-typing demo terminal (not used in Index currently)
    │   ├── InteractiveTerminal.tsx  # Live CLI used in AboutSection
    │   └── ui/                # shadcn components (button, card, dialog, etc.)
    └── test/
        ├── setup.ts
        └── example.test.ts
```

---

## 3. Application Bootstrap & Routing

- **Entry**: `index.html` → `<script type="module" src="/src/main.tsx">` → `main.tsx` renders `<App />` into `#root` and imports `./index.css`.
- **App.tsx** wraps the app with:
  - `QueryClientProvider` (TanStack Query)
  - `TooltipProvider`
  - `Toaster` and `Sonner`
  - `BrowserRouter` with `Routes`:
    - `/` → `Index` (main portfolio page)
    - `*` → `NotFound`
- There are no other routes; the app is effectively a single scrollable page with hash links.

---

## 4. Main Page Layout (Index)

`src/pages/Index.tsx` composes the single-page layout in this order:

1. **Navbar** (fixed)
2. **HeroSection** (sticky, full viewport)
3. A wrapper div (relative z-10, background, padding) containing:
   - AboutSection  
   - ExperienceSection  
   - SkillsSection  
   - ProjectsSection  
   - EducationSection  
   - ContactSection  
4. A **floating “Download Resume”** button (fixed bottom-right), shown when `scrollY > window.innerHeight` (state + scroll listener).

Sections use `id` attributes for in-page navigation: `#about`, `#experience`, `#skills`, `#projects`, `#education`, `#contact`.

---

## 5. Terminal Components (Detailed)

There are two terminal-style components. Only **InteractiveTerminal** is used in the current app (in AboutSection).

### 5.1 TypingTerminal (`src/components/TypingTerminal.tsx`)

- **Purpose**: Non-interactive “fake” terminal that types out a fixed script (e.g. `cat skills.json`, `echo $STATUS`) with a blinking cursor.
- **Mechanism**:
  - Config: array of `{ prefix, text, delay }` (e.g. `tanvi@dev:~$`, line text, ms per line/char).
  - State: `displayedLines`, `currentLine`, `currentChar`, `isTyping`.
  - `useCallback` `typeNextChar` advances character-by-character (or line-by-line); `useEffect` runs a timer with the configured delay and calls `typeNextChar` until all lines are done.
  - Renders a terminal chrome (traffic-light header) and lines; last line gets a `.terminal-cursor` (blinking block).
- **Styling**: `glass-card`, `font-mono`, `terminal-cursor` (from `index.css`).
- **Usage**: Not imported anywhere in the current codebase; available for reuse (e.g. hero or another section).

### 5.2 InteractiveTerminal (`src/components/InteractiveTerminal.tsx`)

- **Purpose**: Interactive CLI that accepts user input and runs a fixed set of commands with predefined outputs.
- **Data model**:
  - `OutputLine`: `{ text: string; type: "command" | "output" | "error" | "heading" | "tag" }`.
  - `COMMANDS`: `Record<string, () => OutputLine[]>` — each key is a command (e.g. `help`, `whoami`, `experience`, `skills`, `education`, `projects`, `contact`), value is a function returning an array of output lines.
  - `WELCOME_LINES`: initial lines shown on load (and after `clear`).
- **State**:
  - `history`: array of `OutputLine[]` (all displayed lines including welcome).
  - `input`: current input field value.
  - `commandHistory`: previous commands (newest first) for Up/Down.
  - `historyIndex`: index into `commandHistory` when navigating with arrows.
- **Behavior**:
  - **Enter**: run command: append `tanvi@dev:~$ <input>` as `command` line; if trimmed is `clear`, reset to `WELCOME_LINES`; else if key in `COMMANDS`, append that command’s output; else if empty, just append command line; else append “command not found” error. Then push to `commandHistory`, reset `historyIndex` and `input`.
  - **Arrow Up/Down**: cycle through `commandHistory`, update `input` and `historyIndex`.
  - **Tab**: autocomplete from `COMMANDS` keys (only if exactly one match).
  - Refocus: clicking the terminal focuses the invisible input (container `onClick` → `inputRef.current?.focus()`).
- **Layout**: Header (traffic lights + “tanvi@portfolio — zsh — interactive”), scrollable body with `history` lines and a persistent input line (`tanvi@dev:~$` + `<input>`). Auto-scroll to bottom when `history` changes.
- **Styling**: Line type → color via `getLineColor()` (e.g. `command`/`heading` → primary, `error` → destructive, `tag` → accent). Uses `glass-card`, `font-mono`, `min-h-[320px]`, `max-h-[500px]`.
- **Where used**: Rendered inside `AboutSection` (AboutSection.tsx).

To add a new “command” in InteractiveTerminal: add a new key and handler function to `COMMANDS` returning `OutputLine[]`. To change welcome text, edit `WELCOME_LINES`.

---

## 6. Styling & Theming

- **Global CSS** (`src/index.css`):
  - Imports Google Fonts: JetBrains Mono, Space Grotesk.
  - Tailwind: `@tailwind base/components/utilities`.
  - **CSS variables** (HSL, no `hsl()` wrapper in variable value): `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`, plus card, popover, sidebar variants and custom `--glow-*`, `--gradient-*`.
  - **Component classes**: `.glow-text`, `.glass-card`, `.gradient-text`, `.terminal-cursor` (blinking block), `.section-container`, `.skill-tag`, `.nav-link`, etc.
- **Tailwind** (`tailwind.config.ts`):
  - `content`: `./src/**/*.{ts,tsx}` (and pages/components/app if present).
  - Theme extends: `fontFamily` (sans/mono), `colors` mapped to CSS vars (e.g. `background: "hsl(var(--background))"`), `borderRadius`, `keyframes` (e.g. accordion, float, pulse-glow, wave), `animation`.
  - `darkMode: ["class"]` (theme can be toggled via class if needed).
- **shadcn**: `components.json` points to `tailwind.config.ts`, `src/index.css`, aliases for `@/components`, `@/lib/utils`, etc. Use `cn()` from `@/lib/utils` when composing component classNames.

---

## 7. Key UI Patterns

- **Sections**: Each section typically has a `ref`, uses `useInView` (Framer) with `once: true` and optional `margin`, and wraps content in `motion.div` with `initial/animate/transition` so content animates in when it enters viewport.
- **Hero**: Uses `useScroll` and `useTransform` to map `scrollY` to a blur value and apply it via `style={{ filter }}` for a scroll-based blur effect. Contains `ParticleBackground` and gradient overlay.
- **Navbar**: Fixed; background/glass style changes on scroll (`scrolled` when `scrollY > 50`). Links are `<a href="#...">` for in-page anchors.
- **Cards**: Many content blocks use `TiltCard` (mouse-based 3D tilt and glow) and/or `glass-card` for the glassmorphism look.
- **Resume**: Two CTAs — one in Hero, one fixed bottom-right on Index; both point to `/TanviSoftware2.pdf` with `download="Tanvi_Resume.pdf"`.

---

## 8. Adding a New Feature — Checklist for Another AI

1. **New page/route**: Add a `<Route path="..." element={<NewPage />} />` in `App.tsx` above the `path="*"` route. Create the page component under `src/pages/`.
2. **New section on Index**: Add a new section component (e.g. `NewSection.tsx`) in `src/components/`, give it an `id` (e.g. `id="new"`), and render it in `Index.tsx` in the desired order. Add a link in `Navbar`’s `links` array to `#new` if you want it in the nav.
3. **New terminal command**: In `InteractiveTerminal.tsx`, add a key to `COMMANDS` and a function that returns `OutputLine[]`. Optionally add it to the `help` command’s output list.
4. **New UI component**: If it’s a one-off, add under `src/components/`. If it’s a reusable primitive, consider adding it under `src/components/ui/` (and optionally install via shadcn CLI to keep with existing patterns). Use `cn()` for class names and existing CSS variables / Tailwind theme.
5. **Styling**: Prefer Tailwind + existing CSS variables and utility classes; add new globals or component classes in `index.css` only when necessary. Keep `glass-card`, `gradient-text`, and `.section-container` in mind for consistency.
6. **Assets**: Place in `public/` and reference by path (e.g. `/filename.png`). Do not put secret keys or env-dependent URLs in the repo; use `import.meta.env` and `.env` if needed (Vite).
7. **Tests**: Place tests under `src/test/` or next to the module; use Vitest and `@testing-library/react`. Run with `npm run test` or `npm run test:watch`.

---

## 9. Scripts & Commands

- `npm run dev` — start Vite dev server (port 8080).
- `npm run build` — production build.
- `npm run build:dev` — build with `--mode development`.
- `npm run preview` — serve production build locally.
- `npm run lint` — ESLint.
- `npm run test` — Vitest run once; `npm run test:watch` — watch mode.

---

## 10. Summary

The app is a **single-page portfolio** (Vite + React + TypeScript) with one route (`/`) and a 404. The main page is built from sequential sections (Hero → About → Experience → Skills → Projects → Education → Contact), with a fixed navbar and hash-based in-page navigation. The **terminal** is represented by two components: **TypingTerminal** (unused, auto-typing) and **InteractiveTerminal** (used in About, with a fixed command set and local state). Styling is Tailwind + CSS variables and shared utility/component classes; Framer Motion handles scroll and viewport animations. Adding a feature usually means adding a section and/or a route, and optionally extending the terminal’s `COMMANDS` or reusing TypingTerminal elsewhere.
