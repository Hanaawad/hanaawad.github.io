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

## Phase 4 — Asset pipeline (413 MB problem) ✅ DONE
- **Optimizer**: `site/scripts/prep-assets.mjs` (sharp) reads heavy originals from
  `src/assets/images` and writes optimized sources into `site/src/assets/case-studies/<slug>/<key>.<ext>`.
  Rules: raster → resized WebP q80; heavy SVG (>200 KB, embedded raster) → rasterized WebP;
  small vector SVG → passed through. All flattened onto white (originals exported with transparency
  render black on the dark theme). Re-run: `cd site && node scripts/prep-assets.mjs`.
  - Wins: `fd.png` 2.4 MB→157 KB; `valuerebook.png` 24 MB→760 KB; email zone SVGs ~1 MB→30–52 KB;
    `layout.svg` 5.6 MB→120 KB. **30 optimized sources, 2.7 MB total** (committed — Astro's build inputs).
- **`Img.astro`**: resolves `slug`+`key` via `import.meta.glob`. Raster → Astro `<Image>` (AVIF+WebP,
  responsive `srcset`, explicit w/h → no CLS); SVG → `<img>`; missing → `Placeholder`. Below-fold lazy;
  case-study hero is priority (eager + high fetchpriority).
- Wired: case-study hero, UX-process, insight, features, gallery, and the home `ProjectCard` cover
  (16/10 `object-fit:cover`). Feature thumbs use a uniform 4/5 `object-fit:contain` frame.
- **View transitions**: card cover + case-study hero share `cs-media-<slug>` → the shared-element
  morph now animates the image too, not just the title.
- **No GIFs / no video** in this design; the 73 MB `hanaintro.mov` intentionally omitted.
- **Measured transferred weight**: Home **0.32 MB** (<1 MB ✅); Soundboks **0.43**, Email **0.41**,
  Ovni **0.47** (<2 MB ✅). Fonts ~83 KB/page.
- Ovni card/hero uses `ovnilanding.svg` (Group-* screens are transparent phone mockups). `npm run build`
  passes — 8 pages, 85 image variants, zero placeholders remaining in case studies.

### Phase 4 asset TODOs (for Hana)
- All images are wired from the old repo. For newer/higher-res screens, drop into `src/assets/images`
  and update the mapping in `scripts/prep-assets.mjs` (or use the Phase 6 guide).

## Phase 5 — Downloadable ATS résumé (PDF) ✅ DONE
- **Real content, not invented**: the old résumé was 10 image slides (`src/assets/images/cv/Slide1-10.JPG`)
  + `hanaresume.pdf` (image-only, no text layer). Transcribed the slides directly (they're readable
  images) → every date/title/employer is real. No résumé TODOs remain.
- **Single source of truth**: `site/src/data/resume.js` (plain ESM) — name, title, contact, summary,
  7 experience entries (with dates + bullets), 6 education entries, LinkedIn certifications, grouped
  skills, languages, hobbies. Both the page and the PDF import this one file.
- **Résumé page** `site/src/pages/resume.astro`: renders the data as real selectable HTML, V4-styled
  (experience/education/certs/skills/languages), with two **Download PDF** buttons.
- **ATS PDF generator** `site/scripts/build-resume-pdf.mjs` (pdfkit, devDep): builds
  `public/hana-awad-resume.pdf` — real selectable text, standard Helvetica, single column, standard
  section headings (Experience/Education/Skills/…). Verified with pdf-parse: 3 pages, all key text
  extracts (name, roles, dates, schools, skills). ATS-parseable, NOT an image.
- **Wired into build**: `package.json` → `"build": "npm run build:pdf && astro build"`, so every build
  regenerates the PDF into `public/` (Astro copies it to `dist/hana-awad-resume.pdf`). The nav **CV**
  button and both résumé-page buttons point to `/hana-awad-resume.pdf` (download).
- To regenerate manually: `cd site && node scripts/build-resume-pdf.mjs`. To edit content: edit
  `src/data/resume.js` only.
- `npm run build` passes — 8 pages + PDF. Committed `public/hana-awad-resume.pdf` as the deliverable.

### Phase 5 notes (for Hana)
- Résumé shows `hana@hanaawad.com` + phone `(+45) 93 83 90 46` (from the CV). The old contact page
  listed `hanaawad_92@hotmail.com`; confirm which email you want public.
- MSc/BSc attributed to AAST (your TA role confirms the affiliation; the degree slides only named
  Alexandria). Adjust in `resume.js` if the awarding school differs.

## Phase 6 — "Add a project via prompt" workflow ✅ DONE
- **`HOW-TO-ADD-A-PROJECT.md`** (repo root), addressed to Claude: step-by-step for turning
  images + a description into a new case study (scaffold → fill frontmatter → place/optimize images →
  set order/featured/tier → wire `next` → build → commit). Includes a **copy-paste prompt for Hana**
  and the full frontmatter schema (mirror of the Zod schema).
- **`npm run new-project -- <slug>`** (`site/scripts/new-project.mjs`): scaffolds a fully-stubbed
  `src/content/case-studies/<slug>.mdx` (all fields + guidance comments) and creates
  `src/assets/case-studies/<slug>/` with a README. Refuses to overwrite an existing study; slugifies input.
- Also added **`npm run prep-assets`** as a friendly alias for the optimizer.
- **Tested end-to-end**: scaffolded `test-project`, built (9 pages, `/work/test-project` rendered),
  then deleted it and rebuilt clean (8 pages). `npm run build` passes.

## Phase 7 — SEO, OG images, accessibility — _pending_
## Phase 7 — SEO, OG images, accessibility ✅ DONE
- **SEO head** (BaseLayout): per-page `<title>` + meta description, `<link rel="canonical">`,
  full **Open Graph** and **Twitter** `summary_large_image` tags, `theme-color`. `ogImage` prop per
  page; case studies pass their own card.
- **OG images**: `site/scripts/build-og.mjs` (sharp) renders a 1200×630 card per case study + a
  `default.png` into `public/og/` — dark bg, per-project glow, serif title (solid white), client·role
  eyebrow, "Hana Awad" branding. Wired into `npm run build` (`build:og`). Tags resolve to absolute
  `https://hanaawad.com/og/<slug>.png`.
- **Sitemap**: `@astrojs/sitemap` emits `sitemap-index.xml`.
- **Landmarks**: BaseLayout renders one `<main id="content">` around the slot; removed nested `<main>`
  from about/resume. Nav `<header>` = banner, Footer = contentinfo. **Skip-to-content** link added.
- **Contrast fix**: `--text-muted` `#71717a → #8a8a93` — old failed AA (3.99/3.73:1), new passes
  (5.6/5.3:1). Other tokens already passed.
- **Alt text** on every image (0 without alt).
- **axe-core (wcag2a/2aa/21a/21aa) = 0 violations** on home, case study, about, résumé. Focus visible,
  reduced-motion honored. `npm run build` passes — 8 pages + PDF + 6 OG images.

### Phase 7 note (for Hana)
- Muted grey is slightly lighter now (`#8a8a93`) so small labels meet WCAG AA.

## Phase 8 — Ship + verify + retire Angular ✅ DONE
- **Host = GitHub Pages via Actions** (chosen by Hana). Workflow `.github/workflows/deploy.yml`
  builds `site/` (`npm ci` → `npm run build`) and deploys to Pages. Custom domain kept via
  `site/public/CNAME` = `hanaawad.com`.
  - **ACTION REQUIRED by Hana to go live**: in the repo **Settings → Pages → Build and deployment
    → Source**, select **GitHub Actions**. Then merge this branch to `master` — the workflow runs and
    publishes. (DNS for hanaawad.com already points at GitHub Pages, so no DNS change needed.)
- **Lighthouse (mobile)** on the production build: **Home Perf 99 / A11y 100 / BP 100 / SEO 100,
  LCP 1.8s; Soundboks 99 / 100 / 100 / 100, LCP 1.7s.** Beats every target (≥90/≥95/≥95/≥95, <2.5s).
  axe-core = 0 WCAG AA violations (Phase 7). Keyboard walkthrough: skip-link → nav → cards/links all
  reachable with visible focus.
- **Angular retired** (separate commit): removed `src/` (incl. the 413 MB of original assets),
  `angular.json`, `e2e/`, root `package.json`/`package-lock.json`, `tsconfig*.json`, `tslint.json`,
  `karma.conf.js`, `browserslist`. The site is now self-contained in `site/`. README rewritten for the
  new stack. Note: `site/scripts/prep-assets.mjs` reads originals from the (now-removed) root
  `src/assets/images` — to re-optimize in future, restore the needed originals first; the already-
  optimized webp/svg in `site/src/assets/case-studies/` are committed and are what the build uses.

## Before / after
- **Stack**: Angular ~10 + Bootstrap + jQuery (all EOL) → Astro 5 + Tailwind + MDX (static, ~0 JS).
- **Page weight**: heavy GIF/PNG/MOV (100s of MB of assets) → Home **0.32 MB**, case studies **~0.4 MB**.
- **Repo**: 413 MB of raw assets → ~2.7 MB of optimized sources (originals dropped).
- **Lighthouse mobile**: 99 / 100 / 100 / 100, LCP < 1.8s. WCAG AA (axe: 0 violations).
- **Résumé**: 10 image slides → real selectable HTML + generated ATS PDF from one data file.
- **Adding work**: edit Angular components → one MDX file + images (`npm run new-project`).

## Remaining TODOs for Hana (open questions — nothing blocking the build)
1. **Soundboks metric** "+34% user engagement" — confirm the real figure and what it measures
   (placeholder, flagged in `soundboks.mdx`).
2. **Email dashboard** — a "time-to-decision" hero metric if you want one (currently none shown).
3. **Contact email** — site + résumé show `hana@hanaawad.com`; the old site listed
   `hanaawad_92@hotmail.com` (+ phone `(+45) 93 83 90 46`). Confirm which to show publicly.
4. **Case-study years** — left blank rather than invented; add to each `.mdx` if you want them.
5. **Secondary glow accents** (`#5eb0ef` Memorix, `#c98bdb` Valuer) and the home stat "6 projects" —
   tweak to taste.
6. **Go-live**: set Pages Source → GitHub Actions, then merge to `master`.
