# hanaawad.com — Hana Awad portfolio

Personal portfolio for Hana Awad — UX designer & ex-architect, Copenhagen.
Built with **Astro + Tailwind + MDX**, static output, near-zero JS. Direction
V4 (sleek dark / premium). The whole site lives in [`site/`](./site).

## Develop

```bash
cd site
npm install
npm run dev        # local dev server
npm run build      # résumé PDF + OG images + static build → site/dist
npm run preview    # preview the production build
```

## Add a project

Adding a case study = one MDX file + images, no component code. See
[`HOW-TO-ADD-A-PROJECT.md`](./HOW-TO-ADD-A-PROJECT.md), or:

```bash
cd site
npm run new-project -- my-slug   # scaffold MDX + image folder
```

## Content

- Case studies: `site/src/content/case-studies/*.mdx` (typed frontmatter,
  schema in `site/src/content.config.ts`).
- Résumé: single source of truth in `site/src/data/resume.js` — powers both the
  résumé page and the generated ATS PDF (`npm run build:pdf`).
- Images: optimized sources in `site/src/assets/case-studies/`; the optimizer
  `site/scripts/prep-assets.mjs` regenerates them from heavy originals.

## Deploy

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`): pushes to
`master` build `site/` and publish to Pages. Custom domain `hanaawad.com` is
carried by `site/public/CNAME`. In **Settings → Pages**, set
**Source → GitHub Actions**.

Build & progress history: [`BUILD-LOG.md`](./BUILD-LOG.md).
