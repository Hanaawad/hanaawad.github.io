// Build-time cache-busting for the downloadable résumé PDF.
// The site is served through Cloudflare, which caches the PDF aggressively and
// isn't purged by a browser refresh. Appending a content hash to the link means
// that whenever the PDF's bytes change, the URL changes too, so Cloudflare (which
// keys its cache on the full URL incl. query string) fetches the new file — no
// manual purge required for anyone using the site's download buttons.
//
// The hash is computed from public/hana-awad-resume.pdf at build time. In CI the
// committed PDF is the deployed file (it's copied into dist by Astro), so the
// hash always matches what visitors download.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PDF_PATH = '/hana-awad-resume.pdf';

function version(): string {
  try {
    const file = fileURLToPath(new URL('../../public/hana-awad-resume.pdf', import.meta.url));
    return createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 10);
  } catch {
    return ''; // PDF not present at build time — fall back to the bare path
  }
}

const v = version();

/** Versioned href for the downloadable résumé PDF (use everywhere it's linked). */
export const PDF_HREF = v ? `${PDF_PATH}?v=${v}` : PDF_PATH;
