// Convert the old animated GIFs (restored from git history) into animated WebP
// — much smaller than GIF, loops automatically in a plain <img>, broad support.
// Output goes to site/public/media/<name>.webp.
//
//   node scripts/convert-gifs.mjs
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

sharp.cache(false);
const OUT = resolve('public/media');
mkdirSync(OUT, { recursive: true });

// The commit just before the Angular removal still has the originals.
const REF = '64cca53~1';

// [gifFilename, outName, width, quality]
const MAP = [
  // Hobbies — animated art pieces (gallery, lazy-loaded)
  ['lostincity.gif', 'lostincity', 760, 44],
  ['fadedabstract.gif', 'faded', 760, 44],
  ['african.gif', 'bumia', 760, 44],
  // Ovni — app demo screens (lazy-loaded)
  ['ovni1.gif', 'ovni1', 440, 50],
  ['ovni2.gif', 'ovni2', 440, 50],
  ['ovni3.gif', 'ovni3', 440, 50],
  ['ovni4.gif', 'ovni4', 440, 50],
  // Email dashboard — walkthrough (lazy-loaded); long clip, so lighter settings
  ['dashboard.gif', 'dashboard', 760, 46],
  // Soundboks — app demo (lazy-loaded)
  ['sb1.gif', 'sb1', 440, 50],
];

let ok = 0;
for (const [gif, name, width, quality] of MAP) {
  let buf;
  try {
    buf = execFileSync('git', ['show', `${REF}:src/assets/images/${gif}`], {
      maxBuffer: 80 * 1024 * 1024,
    });
  } catch {
    console.warn(`  MISSING in history: ${gif}`);
    continue;
  }
  const out = resolve(OUT, `${name}.webp`);
  await sharp(buf, { animated: true })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(out);
  const kb = Math.round(Buffer.byteLength(await sharp(out, { animated: true }).toBuffer()) / 1024);
  console.log(`  media/${name}.webp  ~${kb} KB  (from ${gif})`);
  ok++;
}
console.log(`\nDone. ${ok} animated WebP written to public/media/.`);
