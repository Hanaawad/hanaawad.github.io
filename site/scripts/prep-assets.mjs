// One-off asset optimizer. Reads the heavy originals from the Angular app's
// src/assets/images and writes web-optimized sources into
// site/src/assets/case-studies/<slug>/<key>.<ext>, which Astro's <Image> then
// re-encodes to AVIF/WebP with responsive srcset at build time.
//
//  - raster PNG/JPG  -> resized WebP (q80)
//  - heavy SVG (embedded raster, > 200 KB) -> rasterized WebP (q78)
//  - small vector SVG (<= 200 KB) -> copied through as .svg (served as-is)
//
// Run from site/:  node scripts/prep-assets.mjs
import sharp from 'sharp';
import { statSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const SRC = resolve('../src/assets/images');
const OUT = resolve('src/assets/case-studies');

sharp.cache(false);
sharp.concurrency(2);

// role → max width
const W = { hero: 1600, feature: 1040, process: 1500, insight: 1500, gallery: 1400 };

// [slug, key, sourceFile, role]
const MAP = [
  // Soundboks
  ['soundboks', 'hero', 'fd.png', 'hero'],
  ['soundboks', 'KeyFeature_TeamUp', 'KeyFeature_TeamUp.png', 'feature'],
  ['soundboks', 'KeyFeature_SoundProfiles', 'KeyFeature_SoundProfiles.png', 'feature'],
  ['soundboks', 'KeyFeature_CustomEQ', 'KeyFeature_CustomEQ.png', 'feature'],
  ['soundboks', 'KeyFeature_ProPanel', 'KeyFeature_ProPanel.png', 'feature'],
  ['soundboks', 'ux-process', 'ux process.png', 'process'],
  ['soundboks', 'affinity-mapping', '2222.png', 'insight'],

  // Email Performance Dashboard
  ['email-performance-dashboard', 'hero', 'dashboardzoning.svg', 'hero'],
  ['email-performance-dashboard', 'dashboardzoning', 'dashboardzoning.svg', 'feature'],
  ['email-performance-dashboard', 'Overallinsight', 'Overallinsight.svg', 'feature'],
  ['email-performance-dashboard', 'Campaignstats', 'Campaignstats.svg', 'feature'],
  ['email-performance-dashboard', 'Campaigntracking', 'Campaigntracking.svg', 'feature'],
  ['email-performance-dashboard', 'Labeltracking', 'Labeltracking.svg', 'feature'],
  ['email-performance-dashboard', 'demographics', 'demographics.svg', 'feature'],
  ['email-performance-dashboard', 'dashboard-layout', 'layout.svg', 'process'],
  ['email-performance-dashboard', 'define-personas', 'Group 694.svg', 'insight'],

  // Ovni  (landing illustration fills the card frame; the Group-* screens are
  // transparent phone mockups that crop to empty space)
  ['ovni', 'hero', 'ovnilanding.svg', 'hero'],
  ['ovni', 'ovni-explore', 'Group-24.png', 'feature'],
  ['ovni', 'ovni-make-money', 'Group-22.png', 'feature'],
  ['ovni', 'ovni-make-a-wish', 'Group-23.png', 'feature'],
  ['ovni', 'ovni-profile', 'Group-21.png', 'feature'],
  ['ovni', 'ovni-highlevel-requirements', 'mindmapovni.png', 'process'],
  ['ovni', 'ovni-affinity', 'gathheringovni.png', 'insight'],

  // Memorix
  ['memorix', 'hero', 'memorixlanding.svg', 'hero'],
  ['memorix', 'memorix-sketching', 'sketching.png', 'feature'],
  ['memorix', 'memorix-wireframe', 'memorixwirframe1.svg', 'feature'],
  ['memorix', 'memorix-flow', 'memorixflow.png', 'process'],
  ['memorix', 'memorix-features', 'memorix features_1.png', 'insight'],

  // Valuer
  ['valuer', 'hero', 'valuerlanding.png', 'hero'],
  ['valuer', 'valuerebook', 'valuerebook.png', 'gallery'],
];

let ok = 0;
let skipped = 0;

for (const [slug, key, file, role] of MAP) {
  const src = resolve(SRC, file);
  if (!existsSync(src)) {
    console.warn(`  MISSING source: ${file} (${slug}/${key})`);
    skipped++;
    continue;
  }
  const maxW = W[role] ?? 1400;
  const isSvg = file.toLowerCase().endsWith('.svg');
  const heavy = statSync(src).size > 200 * 1024;

  if (isSvg && !heavy) {
    // small vector — pass through as svg
    const dest = resolve(OUT, slug, `${key}.svg`);
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
    console.log(`  svg   ${slug}/${key}.svg`);
    ok++;
    continue;
  }

  const dest = resolve(OUT, slug, `${key}.webp`);
  mkdirSync(dirname(dest), { recursive: true });
  const pipeline = isSvg
    ? sharp(src, { density: 120, limitInputPixels: false })
    : sharp(src, { limitInputPixels: false });
  const meta = await pipeline.metadata();
  const targetW = meta.width && meta.width < maxW ? meta.width : maxW;
  await pipeline
    // cap height too — WebP's max dimension is 16383px (tall stacked exports)
    .resize({ width: targetW, height: 15000, fit: 'inside', withoutEnlargement: true })
    // Flatten onto white: these are UI screenshots / mindmaps authored on white,
    // often exported with transparency. On the dark theme, transparent areas would
    // render as empty black; flattening keeps them readable.
    .flatten({ background: '#ffffff' })
    .webp({ quality: 80 })
    .toFile(dest);
  const kb = Math.round(statSync(dest).size / 1024);
  console.log(`  webp  ${slug}/${key}.webp  (${kb} KB)`);
  ok++;
}

console.log(`\nDone. ${ok} written, ${skipped} missing.`);
