# BUILD-LOG — Hana Awad Portfolio rebuild (Direction V4: Sleek Dark / Premium)

This log is the source of truth for the phased rebuild. Every phase appends here:
what was done, what's left, decisions/TODOs. The next session reads this first.

## Branch note (important)
The original plan says develop on `rebuild-v4`. This automated environment mandates
the designated branch **`claude/hanaawad-github-io-changes-0de4ot`**, so all work is on
that branch instead. Same intent (isolated feature branch off `master`, no force-push).

## Stack / locked decisions
- Astro + Tailwind (@astrojs/tailwind, Tailwind v3) + MDX + sitemap. Static output.
- Type: Fraunces (serif headings) + Inter (UI/body), self-hosted via Fontsource variable packages.
- Palette (dark-first): bg `#0e0e10`, panels `#16161a`/`#1a1a1f`, hairlines `#1f1f25`/`#24242a`,
  text `#f4f4f5` / secondary `#a1a1aa` / muted `#71717a`.
  Accents: Soundboks `#e0794a`, Email `#8b7ff0`, Ovni `#e0b84a`. Primary `#e0794a`.
- Light mode intentionally deferred (not built).
- New site lives in `site/`. **Angular app at repo root is untouched** until Phase 8.

## Open content TODOs (never invent — confirm with Hana)
- Soundboks "+34%" metric — confirm.
- Email dashboard time-to-decision metric — confirm.
- Exact résumé dates/titles.

---

## Phase 0 — Scaffold + safety rails ✅ DONE
- Scaffolded Astro manually into `site/` (the `create-astro` template fetch is blocked by the
  proxy, so the project was built by hand: package.json, astro.config.mjs, tsconfig strict,
  tailwind.config.mjs). Angular app at repo root left fully intact.
- Integrations wired: `@astrojs/tailwind` (applyBaseStyles:false), `@astrojs/mdx`, `@astrojs/sitemap`.
- Fonts: `@fontsource-variable/fraunces` + `@fontsource-variable/inter`, imported in
  `site/src/styles/tokens.css`. Confirmed 10 woff2 files self-hosted in `dist/`.
- `site/src/styles/tokens.css` holds the full V4 palette as CSS variables + base reset +
  `.headline-gradient` utility. Dark-first; no light mode.
- `site/src/layouts/BaseLayout.astro` — shared shell; accepts a `glow` prop that overrides
  `--accent`/`--glow` per page (for per-project glow tiles later).
- Placeholder home `site/src/pages/index.astro`: status chip + gradient Fraunces headline on
  `#0e0e10`, radial glow. Proves fonts + tokens + build.
- `npm run build` passes (1 page). Palette + gradient confirmed in bundled output.
- Path reminders: dev = `cd site && npm run dev`; build = `cd site && npm run build`.

### Phase 0 left / notes for Phase 1
- Nothing outstanding. Next: content collection + Zod schema + Soundboks case study (text only).

## Phase 1 — Content model + Soundboks case study ✅ DONE
- Content collection `caseStudies` defined in `site/src/content.config.ts` using Astro 5's
  Content Layer glob loader (`glob({ pattern: '**/*.mdx', base: './src/content/case-studies' })`).
- One reusable template renders the whole spine: `site/src/pages/work/[slug].astro`
  (Hero → metric+focus bar → Overview → Problem → Goals grid → UX process → Insights →
  **Key decision** highlighted block → Features grid → Screens gallery → Outcome → Next link).
  Styled to V4; per-project glow flows from frontmatter `glow` via BaseLayout.
- Helper components: `Placeholder.astro` (labeled boxes — Phase 4 swaps real images),
  `Icon.astro` (inline-SVG set, safe fallback to a dot on unknown names).
- Soundboks written to `site/src/content/case-studies/soundboks.mdx` from the real Angular
  copy in `src/app/soundboks/soundboks.component.html`. Features TeamUp / Sound Profiles /
  Custom EQ / Pro Panel with exact copy; insight = affinity-mapping-with-teammate story;
  decision = rebuild IA around scalability. `next: email-performance-dashboard`.
- Verified in built HTML: title, role, affinity mapping, all 4 features, "The key decision",
  App Store link, glow `#e0794a`, +34% all present. Next-link correctly hidden (target not
  built until Phase 2). `npm run build` passes (2 pages).

### Final Zod schema (reference for future phases — mirror this when adding projects)
```
title: string
client: string
location?: string
year?: string            // OPTIONAL on purpose — never invent a date
role: string
order: number = 99
featured: boolean = false
tier: 'flagship' | 'secondary' | 'archive' = 'flagship'   // added field
glow: string = '#e0794a'
summary: string
focus?: string
metric?: string
metricLabel?: string
tags: string[] = []
links: { label: string; icon?: string; url: string }[] = []
overview: string
problem: string
goals: { title: string; body: string }[] = []
methods: string[] = []
processImage?: string        // image key; resolved to real asset in Phase 4
processCaption?: string
insightHeading: string = 'Gathering insights'
insight: string
insightImage?: string
decisionHeading: string = 'The key decision'
decision: string
features: { title: string; icon?: string; body: string; image?: string }[] = []
gallery: { image: string; caption?: string }[] = []
outcome: string
next?: string                // slug of the next case study
```
Fields I ADDED beyond the plan's list: `tier` (flagship/secondary/archive for home grouping),
`focus`, `processImage`/`processCaption`, `insightImage`, `decisionHeading`. `year` made optional
(don't invent). Image fields hold string KEYS now; Phase 4 maps them to processed assets.

### Phase 1 TODOs surfaced (for Hana)
- Soundboks `+34%` / `metricLabel: user engagement` — BOTH the figure and what it measures need
  confirmation (currently placeholders, flagged in the MDX and here).
- Soundboks `year` — unknown, left blank rather than invented.
- Real outcome figures — the outcome text is descriptive of what shipped; no invented metrics.

## Phase 2 — Remaining case studies + home + about + nav ✅ DONE
- Case studies written from real Angular copy:
  - **email-performance-dashboard.mdx** (flagship, order 2, glow `#8b7ff0`) — 6 dashboard zones as
    features (Dashboard zoning, Overall insight, Campaign stats, Campaign tracking, Label tracking,
    Responses & demographics); decision = most-important-data-top-left.
  - **ovni.mdx** (flagship, order 3, glow `#e0b84a`) — features Explore / Make money / Make a wish /
    Profile; role notes UX **and** front-end; links to ovni.io.
  - **memorix.mdx** (secondary, order 4, glow `#5eb0ef`) — includes the real "70% forgotten in 24h" line.
  - **valuer.mdx** (secondary, order 5, glow `#c98bdb`) — short entry (e-book design), overview + gallery only.
- Schema relaxed so short entries work: `problem`, `insight`, `decision`, `outcome` are now OPTIONAL;
  the template guards each section.
- **Home** (`index.astro`): V4 hero (status chip, gradient headline, intro, stats row **6 / 3 / UX+FE**),
  flagship glow-card grid (`ProjectCard.astro`), a secondary "Also" grid, and a text **More work** archive list.
- **About** (`about.astro`): real architect→UX story + skills chips (all evidenced — nothing invented).
- **Nav** + **Footer** now in `BaseLayout` (prop `chrome`, default on). Nav = Work / About / Résumé / CV.
- **resume.astro**: tidy placeholder (Phase 5 replaces with real résumé + ATS PDF).
- Verified: next-links resolve soundboks→email→ovni→memorix→valuer; home cards + archive + 3 glows;
  email zones + top-left decision. `npm run build` passes — **8 pages**.

### Project tiers
- **Flagship:** Soundboks, Email Performance Dashboard, Ovni.
- **Secondary:** Memorix, Valuer.
- **Archive (text list only):** Danon, Tumble, Yacht, Bomae, O Boutique, Architecture Portfolio.

### Phase 2 content TODOs (for Hana)
- Secondary glow accents (`#5eb0ef`, `#c98bdb`) are UI choices, not brand colours — change if preferred.
- Contact email shown is `hana@hanaawad.com` (matches approved V4 reference); old site listed
  `hanaawad_92@hotmail.com` + phone `(+45) 93839046` — confirm which to display.
- Home stat "6 projects" — confirm the headline number.

## Phase 3 — Motion system ✅ DONE
- **Scroll-reveal**: IntersectionObserver in `BaseLayout` fades+translates `.reveal` elements in
  with a light stagger (sibling index × 70ms, capped). Re-inits on every `astro:page-load` so it
  survives View Transitions navigations. Elements already above the fold on load reveal immediately.
- **Progressive enhancement / reduced-motion**: an `is:inline` head script adds `.reveal-ready` to
  `<html>` ONLY when `prefers-reduced-motion` is not set. Reveal hidden-state CSS is scoped to
  `.reveal-ready .reveal`, so with no JS OR reduced motion, content is fully visible immediately.
  A `@media (prefers-reduced-motion: reduce)` block also neutralises reveal + view-transition anims.
- **View Transitions**: Astro `<ClientRouter />` in `BaseLayout` head. Shared-element morph —
  project card title (`cs-title-<slug>`) → case-study hero title. (Hero-IMAGE morph will be added in
  Phase 4 once real hero images exist; note the transition:name convention `cs-media-<slug>` for it.)
- **Glow-on-hover** on cards (ProjectCard `::before` radial glow) + **animated underline**
  (`.link-underline`) on footer social links.
- Verified in build: `data-astro-transition`, `reveal-ready`, `cs-title-*` on both home cards and
  case-study pages, IntersectionObserver JS bundled, reduced-motion guard in CSS. `npm run build`
  passes — 8 pages, still near-zero render-blocking JS (one small bundled module + ClientRouter).

## Phase 4 — Asset pipeline (413 MB problem) — _pending_
## Phase 4 — Asset pipeline (413 MB problem) — _pending_
## Phase 5 — Downloadable ATS résumé (PDF) — _pending_
## Phase 6 — "Add a project via prompt" workflow — _pending_
## Phase 7 — SEO, OG images, accessibility — _pending_
## Phase 8 — Ship + verify + retire Angular — _pending_
