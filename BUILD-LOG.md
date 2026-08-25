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

## Phase 2 — Remaining case studies + home + about + nav — _pending_
## Phase 2 — Remaining case studies + home + about + nav — _pending_
## Phase 3 — Motion system — _pending_
## Phase 4 — Asset pipeline (413 MB problem) — _pending_
## Phase 5 — Downloadable ATS résumé (PDF) — _pending_
## Phase 6 — "Add a project via prompt" workflow — _pending_
## Phase 7 — SEO, OG images, accessibility — _pending_
## Phase 8 — Ship + verify + retire Angular — _pending_
