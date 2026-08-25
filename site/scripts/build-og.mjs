// Generate Open Graph share images (1200×630) — one per case study plus a
// default — into public/og/. Rasterized from an SVG template with sharp.
// Runs as part of `npm run build`.
import sharp from 'sharp';
import { readdirSync, readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const CS = resolve(root, 'src/content/case-studies');
const OUT = resolve(root, 'public/og');
mkdirSync(OUT, { recursive: true });

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// crude frontmatter field reader (our frontmatter uses simple `key: value` lines)
function field(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!m) return undefined;
  return m[1].trim().replace(/^['"]|['"]$/g, '').replace(/\s*#.*$/, '').trim();
}

function wrap(text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function svg({ eyebrow, title, glow }) {
  const lines = wrap(title, 16);
  const startY = 300 - (lines.length - 1) * 45;
  const tspans = lines
    .map((l, i) => `<tspan x="80" y="${startY + i * 92}">${esc(l)}</tspan>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="18%" cy="8%" r="80%">
      <stop offset="0%" stop-color="${glow}" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="t" x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0%" stop-color="#f4f4f5"/>
      <stop offset="70%" stop-color="#f4f4f5"/>
      <stop offset="120%" stop-color="${glow}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0e0e10"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#1f1f25" stroke-width="2"/>
  <circle cx="86" cy="150" r="7" fill="${glow}"/>
  <text x="106" y="157" font-family="Inter, 'DejaVu Sans', sans-serif" font-size="24" fill="#a1a1aa">${esc(eyebrow)}</text>
  <text font-family="Fraunces, Georgia, 'DejaVu Serif', serif" font-weight="600" font-size="82" fill="#f4f4f5">${tspans}</text>
  <text x="80" y="560" font-family="Fraunces, Georgia, 'DejaVu Serif', serif" font-size="30" fill="#f4f4f5">Hana Awad</text>
  <text x="80" y="595" font-family="Inter, 'DejaVu Sans', sans-serif" font-size="20" fill="#8a8a93">UX Designer · Copenhagen</text>
</svg>`;
}

async function render(name, data) {
  const buf = Buffer.from(svg(data));
  await sharp(buf, { density: 144 }).png().toFile(resolve(OUT, `${name}.png`));
  console.log(`  og/${name}.png  — ${data.title}`);
}

// default card
await render('default', {
  eyebrow: 'Portfolio',
  title: 'I design usable interfaces — and build them.',
  glow: '#e0794a',
});

// per case study
for (const file of readdirSync(CS).filter((f) => f.endsWith('.mdx'))) {
  const slug = file.replace(/\.mdx$/, '');
  const raw = readFileSync(resolve(CS, file), 'utf8');
  const fm = raw.split('---')[1] ?? '';
  const title = field(fm, 'title') ?? slug;
  const client = field(fm, 'client') ?? '';
  const role = field(fm, 'role') ?? '';
  const glow = field(fm, 'glow') ?? '#e0794a';
  const eyebrow = [client, role].filter(Boolean).join(' · ') || 'Case study';
  await render(slug, { eyebrow, title, glow });
}

console.log('OG images written to public/og/');
