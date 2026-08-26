// Generate an ATS-friendly PDF résumé from the shared data
// (src/data/resume.js) into public/hana-awad-resume.pdf. Real selectable text,
// standard section headings, single column, standard fonts — parseable by ATS.
//
// Runs as part of `npm run build` (see package.json) and can be run directly:
//   node scripts/build-resume-pdf.mjs
import PDFDocument from 'pdfkit';
import { createWriteStream, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resume as r } from '../src/data/resume.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/hana-awad-resume.pdf');
mkdirSync(dirname(OUT), { recursive: true });

const M = 54; // page margin
// Dark theme to match the site (hanaawad.com/resume). Text stays real/selectable.
const BG = '#0e0e10';
const INK = '#f4f4f5';
const MUTE = '#a1a1aa';
const ACCENT = '#e0794a';
const RULE = '#2a2a30';

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: M, bottom: M, left: M, right: M },
  info: {
    Title: `${r.name} — Résumé`,
    Author: r.name,
    Subject: r.title,
    Keywords: 'UX designer, front-end, resume, CV',
  },
});
doc.pipe(createWriteStream(OUT));

const W = doc.page.width - M * 2;
const dateRange = (e) => e.date ?? [e.start, e.end].filter(Boolean).join(' – ');

// Paint the dark background behind every page (does not move the text cursor).
function paintBg() {
  doc.save();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(BG);
  doc.restore();
  doc.fillColor(INK);
}
paintBg();
doc.on('pageAdded', paintBg);

function rule() {
  doc
    .moveTo(M, doc.y)
    .lineTo(M + W, doc.y)
    .lineWidth(0.6)
    .strokeColor(RULE)
    .stroke();
  doc.moveDown(0.5);
}

function sectionHeading(label) {
  if (doc.y > doc.page.height - 120) doc.addPage();
  doc.moveDown(0.7);
  doc.font('Helvetica-Bold').fontSize(11).fillColor(ACCENT).text(label.toUpperCase());
  doc.moveDown(0.25);
  rule();
}

// ---- Header ------------------------------------------------------------
doc.font('Helvetica-Bold').fontSize(24).fillColor(INK).text(r.name);
doc.font('Helvetica').fontSize(12).fillColor(MUTE).text(r.title);
doc.moveDown(0.3);
const contact = [r.location, r.email, r.phone, r.links.linkedin].filter(Boolean).join('  ·  ');
doc.fontSize(9).fillColor(MUTE).text(contact);
doc.moveDown(0.5);
rule();

// ---- Summary -----------------------------------------------------------
doc.font('Helvetica').fontSize(10).fillColor(INK).text(r.summary, { align: 'left', lineGap: 1.5 });

// ---- Experience --------------------------------------------------------
sectionHeading('Experience');
for (const e of r.experience) {
  if (doc.y > doc.page.height - 110) doc.addPage();
  const rangeText = dateRange(e);
  const rangeWidth = 140;
  const y0 = doc.y;
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK).text(`${e.role} — ${e.org}`, M, y0, { width: W - rangeWidth - 12 });
  const afterRoleY = doc.y;
  doc.font('Helvetica').fontSize(9).fillColor(MUTE).text(rangeText, M + W - rangeWidth, y0 + 1, { width: rangeWidth, align: 'right' });
  doc.x = M;
  doc.y = afterRoleY; // restore flow to the end of the (possibly wrapped) title
  doc.font('Helvetica-Oblique').fontSize(9).fillColor(MUTE).text(e.location, M, doc.y, { width: W });
  doc.moveDown(0.2);
  doc.font('Helvetica').fontSize(9.5).fillColor(INK);
  for (const b of e.bullets) {
    doc.text(`•  ${b}`, M, doc.y, { width: W, indent: 8, lineGap: 1, paragraphGap: 1.5 });
  }
  doc.moveDown(0.5);
}

// ---- Education ---------------------------------------------------------
sectionHeading('Education');
for (const e of r.education) {
  if (doc.y > doc.page.height - 90) doc.addPage();
  const rangeText = dateRange(e);
  const rangeWidth = 140;
  const y0 = doc.y;
  doc.font('Helvetica-Bold').fontSize(10).fillColor(INK).text(e.title, M, y0, { width: W - rangeWidth - 12 });
  const afterTitleY = doc.y;
  doc.font('Helvetica').fontSize(9).fillColor(MUTE).text(rangeText, M + W - rangeWidth, y0 + 1, { width: rangeWidth, align: 'right' });
  doc.x = M;
  doc.y = afterTitleY;
  doc.font('Helvetica').fontSize(9.5).fillColor(MUTE).text(`${e.org} · ${e.location}`, M, doc.y, { width: W });
  if (e.note) doc.font('Helvetica').fontSize(9).fillColor(INK).text(e.note, M, doc.y, { width: W, lineGap: 1 });
  doc.moveDown(0.45);
}

// ---- Certifications ----------------------------------------------------
sectionHeading('Certifications');
doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK).text(`${r.certifications.org} `, { continued: true });
doc.font('Helvetica').fillColor(MUTE).text(`(${r.certifications.date})`);
doc.font('Helvetica').fontSize(9.5).fillColor(INK).text(r.certifications.items.join(' · '), { lineGap: 1 });

// ---- Skills ------------------------------------------------------------
sectionHeading('Skills');
for (const [group, items] of Object.entries(r.skills)) {
  if (doc.y > doc.page.height - 70) doc.addPage();
  const y0 = doc.y;
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK).text(`${group}: `, M, y0, { continued: true });
  doc.font('Helvetica').fillColor(MUTE).text(items.join(', '), { lineGap: 1 });
  doc.moveDown(0.2);
}

// ---- Languages ---------------------------------------------------------
sectionHeading('Languages');
doc.font('Helvetica').fontSize(9.5).fillColor(INK).text(
  r.languages.map((l) => `${l.name} (${l.level})`).join('   ·   '),
);

doc.end();
console.log('Résumé PDF written to', OUT);
