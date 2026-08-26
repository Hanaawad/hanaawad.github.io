// Scaffold a new case study. Creates a fully-stubbed MDX file and an image
// folder so a new project can be added without touching component code.
//
//   npm run new-project -- <slug>
//   e.g.  npm run new-project -- acme-app
//
// Then: drop images into src/assets/case-studies/<slug>/, fill in the MDX
// frontmatter, run `node scripts/prep-assets.mjs` if you added heavy originals,
// and `npm run build`.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const raw = process.argv[2];
if (!raw) {
  console.error('Usage: npm run new-project -- <slug>   (e.g. acme-app)');
  process.exit(1);
}
const slug = raw
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');
if (!slug) {
  console.error(`Invalid slug from "${raw}".`);
  process.exit(1);
}

const mdxPath = resolve(root, 'src/content/case-studies', `${slug}.mdx`);
const assetDir = resolve(root, 'src/assets/case-studies', slug);

if (existsSync(mdxPath)) {
  console.error(`Refusing to overwrite existing case study: ${mdxPath}`);
  process.exit(1);
}

const title = slug
  .split('-')
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join(' ');

const template = `---
# ============================================================
# Case study frontmatter. Fields marked TODO must be filled.
# Mirror of the Zod schema in src/content.config.ts.
# Image fields hold KEYS that map to files in
#   src/assets/case-studies/${slug}/<key>.webp|.svg
# ============================================================
title: ${title}                # TODO: real project title
client: TODO Client — Country
location: TODO City, Country
# year: '2024'                 # optional — never invent; leave out if unknown
role: TODO Your role

order: 10                      # lower = earlier in the grid
featured: false                # true only for flagships
tier: secondary                # flagship | secondary | archive
glow: '#e0794a'                # per-project accent hex

summary: TODO one-sentence summary shown on the card + hero.
focus: TODO Discipline focus    # optional, e.g. "UX strategy & IA"
# metric: '+00%'               # optional hero metric — omit unless confirmed
# metricLabel: what it measures
tags:
  - TODO tag
  - TODO tag
links:
  - label: Product site
    icon: external             # external | apple | link
    url: https://example.com

overview: >
  TODO 1–2 sentences: what the project was and your role.

problem: >
  TODO the problem you were solving. (optional — remove if a short entry)

goals:
  - title: TODO goal
    body: TODO goal detail.

methods:
  - TODO method
  - TODO method
processImage: process           # optional; maps to <slug>/process.webp
processCaption: TODO caption for the process image.

insightHeading: Gathering insights
insight: >
  TODO the key research insight / story. (optional)
insightImage: insight           # maps to <slug>/insight.webp

decisionHeading: The key decision
decision: >
  TODO the single most important decision (shown in the highlighted block). (optional)

features:
  - title: TODO feature
    icon: dot                   # users | profiles | eq | panel | dot
    image: feature-1            # maps to <slug>/feature-1.webp
    body: TODO feature description.

# gallery:                      # optional extra screens
#   - image: screen-1
#     caption: TODO caption

outcome: >
  TODO what shipped / the result. (optional — never invent metrics)

# next: some-other-slug          # optional — slug of the next case study
---

{/* Optional MDX body renders after the Outcome section. Usually left empty. */}
`;

mkdirSync(dirname(mdxPath), { recursive: true });
writeFileSync(mdxPath, template);
mkdirSync(assetDir, { recursive: true });
writeFileSync(
  resolve(assetDir, 'README.md'),
  `# Images for "${title}"\n\nDrop optimized images here named by their frontmatter KEY, e.g.:\n- hero.webp        (card cover + case-study hero)\n- feature-1.webp   (a feature)\n- process.webp / insight.webp\n\nHeavy originals: put them in ../../images and add a mapping to\nscripts/prep-assets.mjs, then run \`node scripts/prep-assets.mjs\`.\nSmall vector SVGs can be dropped here directly as <key>.svg.\n`,
);

console.log(`Created:
  ${mdxPath.replace(root + '/', 'site/')}
  ${assetDir.replace(root + '/', 'site/')}/  (with README)

Next:
  1. Fill in the TODOs in the .mdx frontmatter.
  2. Add images to the folder (keys must match the frontmatter).
  3. cd site && npm run build`);
