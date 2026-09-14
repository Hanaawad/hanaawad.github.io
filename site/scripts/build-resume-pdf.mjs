// Generate the downloadable résumé PDF as a pixel-faithful render of the live
// résumé page (src/pages/resume.astro) so the PDF looks EXACTLY like
// hanaawad.com/resume — same dark theme, type, timeline and sections — minus
// the site chrome (nav, footer) and the on-page download buttons.
//
// It renders the already-built page in dist/ with headless Chromium, so run it
// AFTER `astro build`:
//   npm run build && npm run pdf
//
// Chromium: uses $CHROMIUM_PATH if set, else the Playwright-managed binary.
// Output: public/hana-awad-resume.pdf  (a committed, deploy-ready asset).
import { chromium } from 'playwright-core';
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');
const OUT = resolve(__dirname, '../public/hana-awad-resume.pdf');

if (!existsSync(join(DIST, 'resume', 'index.html'))) {
  console.error('dist/resume/index.html not found — run `astro build` first (npm run build).');
  process.exit(1);
}

// Candidate Chromium executables (this environment ships a headless shell).
const CHROMIUM_CANDIDATES = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
].filter(Boolean);
const execPath = CHROMIUM_CANDIDATES.find((p) => existsSync(p));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.pdf': 'application/pdf',
};

// Minimal static server for the built site (directory URLs -> index.html).
function resolvePath(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  let fsPath = join(DIST, p);
  if (existsSync(fsPath) && statSync(fsPath).isDirectory()) fsPath = join(fsPath, 'index.html');
  else if (!existsSync(fsPath) && existsSync(fsPath + '.html')) fsPath += '.html';
  else if (!existsSync(fsPath) && existsSync(join(fsPath, 'index.html')))
    fsPath = join(fsPath, 'index.html');
  return fsPath;
}
const server = createServer((req, res) => {
  const fsPath = resolvePath(req.url);
  if (!existsSync(fsPath) || statSync(fsPath).isDirectory()) {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': MIME[extname(fsPath)] ?? 'application/octet-stream' });
  createReadStream(fsPath).pipe(res);
});

// CSS to drop site chrome and the download buttons, and to paginate cleanly.
const PRINT_CSS = `
  header.nav, footer.foot, .download, .foot-cta { display: none !important; }
  html, body { background: #0e0e10 !important; }
  .resume { max-width: 660px !important; margin: 0 auto !important;
            padding: 30px clamp(16px, 5vw, 40px) 30px !important; }
  .reveal { opacity: 1 !important; transform: none !important; }
  .block, .role, .strength, .item, .item-head, .role-head { break-inside: avoid; }
  .h2 { break-after: avoid; }
  @page { margin: 0; size: A4; }
`;

const port = await new Promise((res) => {
  server.listen(0, '127.0.0.1', () => res(server.address().port));
});

const browser = await chromium.launch({
  executablePath: execPath,
  headless: true,
  args: ['--no-sandbox'],
});
try {
  const page = await browser.newPage();
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto(`http://127.0.0.1:${port}/resume/`, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: PRINT_CSS });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  console.log('Résumé PDF (page render) written to', OUT);
} finally {
  await browser.close();
  server.close();
}
