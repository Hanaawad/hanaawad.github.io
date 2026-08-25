# How to add a project (no component code needed)

**This file is addressed to Claude.** When Hana asks to add a new case study to
the portfolio, follow these steps. Adding a project = one MDX file + images.
You never edit component code.

Everything lives under `site/`. The one reusable template
(`site/src/pages/work/[slug].astro`) renders every case study from typed
frontmatter.

---

## For Hana — copy-paste prompt

Paste this to Claude, then attach your images and fill in the blanks:

> **Add a new project to my portfolio.**
> Title: _______
> Client / company + country: _______
> My role: _______
> Year (leave blank if you'd rather not say): _______
> One-sentence summary: _______
> The problem I was solving: _______
> 3–5 project goals: _______
> Research methods I used: _______
> The key insight from research: _______
> The single most important decision: _______
> Key features (name + one line each): _______
> How it turned out / outcome: _______
> Flagship or secondary? _______
> Links (product site, App Store, etc.): _______
>
> I'm attaching the images: a hero/cover shot, one image per feature, and
> (optional) a process image and an insights image. Use my real numbers only —
> if a metric isn't given, leave it out.

You don't have to fill every field — anything missing becomes an optional
section that simply doesn't render.

---

## Steps for Claude

1. **Pick a slug** (kebab-case, e.g. `acme-app`) and scaffold:
   ```bash
   cd site && npm run new-project -- acme-app
   ```
   This creates `src/content/case-studies/acme-app.mdx` (fully stubbed) and
   `src/assets/case-studies/acme-app/` (with a README).

2. **Fill in the frontmatter** in the new `.mdx` from Hana's description. Use her
   real words. **Never invent** metrics, dates, employers, or outcomes — if a
   number is missing, omit the field and add a `<!-- TODO: confirm -->` note and
   a line in `BUILD-LOG.md`.

3. **Place the images.** Two paths:
   - **Small / already web-sized** (≤ ~300 KB, or vector SVG): drop straight into
     `src/assets/case-studies/<slug>/` named by their frontmatter **key**
     (`hero.webp`, `feature-1.webp`, `process.webp`, …).
   - **Heavy originals** (multi-MB PNG/JPG, or SVGs with embedded raster): put the
     originals in `site/src/assets/images/`, add a mapping row to
     `site/scripts/prep-assets.mjs` (`[slug, key, sourceFile, role]`), then run
     `cd site && npm run prep-assets`. It rasterizes/downsamples + flattens to
     WebP into the case-study folder.

   Image **keys** in the frontmatter must match the filenames (minus extension):
   `image: feature-1` → `<slug>/feature-1.webp` (or `.svg`). A missing image just
   shows a labeled placeholder — the build never breaks.

4. **Set ordering & tier**: `order` (lower = earlier), `featured: true` only for
   flagships, `tier: flagship | secondary | archive`. Pick a `glow` hex accent.

5. **Wire the `next` link** if you want a chain: set `next: <other-slug>`. The link
   only renders if the target exists, so it's safe to leave dangling.

6. **Build & verify**:
   ```bash
   cd site && npm run build
   ```
   Confirm `/work/<slug>` renders and the home grid shows the new card.

7. **Commit** on the working branch with a clear message; push.

---

## Frontmatter schema (mirror of `site/src/content.config.ts`)

Required: `title`, `client`, `role`, `summary`, `overview`.
Everything else is optional (its section just won't render).

```
title: string
client: string
location?: string
year?: string              # optional — never invent a date
role: string
order: number = 99         # lower = earlier in the grid
featured: boolean = false  # true = flagship card
tier: 'flagship' | 'secondary' | 'archive' = 'flagship'
glow: string = '#e0794a'   # per-project accent hex

summary: string            # card + hero one-liner
focus?: string
metric?: string            # hero metric, e.g. '+34%'
metricLabel?: string
tags?: string[]
links?: { label: string; icon?: string; url: string }[]   # icon: external|apple|link

overview: string
problem?: string
goals?: { title: string; body: string }[]
methods?: string[]
processImage?: string      # image key -> <slug>/<key>.webp|.svg
processCaption?: string

insightHeading?: string = 'Gathering insights'
insight?: string
insightImage?: string

decisionHeading?: string = 'The key decision'
decision?: string          # shown in the highlighted block

features?: { title: string; icon?: string; body: string; image?: string }[]
                           # icon: users|profiles|eq|panel|dot|link|external|apple
gallery?: { image: string; caption?: string }[]
outcome?: string
next?: string              # slug of the next case study
```

Available feature/link icons live in `site/src/components/Icon.astro` (unknown
names fall back to a neutral dot, so nothing breaks).
