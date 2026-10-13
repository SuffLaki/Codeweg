// Erzeugt die PWA-Icons als PNG — ohne externe Pakete (zlib + eigener PNG-Encoder).
// Aufruf:  node scripts/make-icons.mjs
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = dirname(fileURLToPath(import.meta.url));
const ZIEL = join(HIER, '..', 'icons');

const BG_OBEN = [19, 28, 60];
const BG_UNTEN = [8, 13, 30];
const AKZENT = [79, 140, 255];
const AKZENT2 = [34, 195, 166];

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(typ, daten) {
  const laenge = Buffer.alloc(4);
  laenge.writeUInt32BE(daten.length);
  const koerper = Buffer.concat([Buffer.from(typ, 'ascii'), daten]);
  const pruef = Buffer.alloc(4);
  pruef.writeUInt32BE(crc32(koerper));
  return Buffer.concat([laenge, koerper, pruef]);
}

function png(breite, hoehe, rgba) {
  const roh = Buffer.alloc((breite * 4 + 1) * hoehe);
  for (let y = 0; y < hoehe; y++) {
    roh[y * (breite * 4 + 1)] = 0; // Filter: keiner
    rgba.copy(roh, y * (breite * 4 + 1) + 1, y * breite * 4, (y + 1) * breite * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(breite, 0);
  ihdr.writeUInt32BE(hoehe, 4);
  ihdr[8] = 8;   // Bittiefe
  ihdr[9] = 6;   // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(roh, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// Abstand Punkt → Strecke, für die Striche des Zeichens
function distSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const laenge2 = dx * dx + dy * dy;
  let t = laenge2 ? ((px - x1) * dx + (py - y1) * dy) / laenge2 : 0;
  t = Math.max(0, Math.min(1, t));
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
}

function mischen(unten, oben, alpha) {
  return unten.map((w, i) => Math.round(w * (1 - alpha) + oben[i] * alpha));
}

function iconZeichnen(groesse) {
  const bild = Buffer.alloc(groesse * groesse * 4);
  const e = groesse / 24;           // Einheit: Entwurf in 24x24
  const radius = groesse * 0.22;    // Ecken wie bei iOS
  const dicke = e * 1.9;

  // Striche: "<" links, "/" Mitte, ">" rechts
  const striche = [
    { punkte: [[9, 6], [4.6, 12]], farbe: AKZENT },
    { punkte: [[4.6, 12], [9, 18]], farbe: AKZENT },
    { punkte: [[15, 6], [19.4, 12]], farbe: AKZENT },
    { punkte: [[19.4, 12], [15, 18]], farbe: AKZENT },
    { punkte: [[13.3, 5.2], [10.7, 18.8]], farbe: AKZENT2 }
  ];

  for (let y = 0; y < groesse; y++) {
    for (let x = 0; x < groesse; x++) {
      const i = (y * groesse + x) * 4;

      // Abgerundetes Quadrat mit weicher Kante
      const dx = Math.max(radius - x, 0, x - (groesse - radius));
      const dy = Math.max(radius - y, 0, y - (groesse - radius));
      const ecke = Math.hypot(dx, dy);
      const alphaBg = Math.max(0, Math.min(1, radius - ecke + 0.5));
      if (alphaBg <= 0) { bild[i + 3] = 0; continue; }

      // Hintergrund-Verlauf (diagonal)
      const t = (x / groesse + y / groesse) / 2;
      const grund = mischen(BG_OBEN, BG_UNTEN, t);
      let [r, g, b] = grund;

      // Striche darüber, mit weicher Kante
      for (const strich of striche) {
        const [[x1, y1], [x2, y2]] = strich.punkte;
        const d = distSegment(x, y, x1 * e, y1 * e, x2 * e, y2 * e);
        const alpha = Math.max(0, Math.min(1, dicke / 2 - d + 0.6));
        if (alpha > 0) [r, g, b] = mischen([r, g, b], strich.farbe, alpha);
      }

      bild[i] = r;
      bild[i + 1] = g;
      bild[i + 2] = b;
      bild[i + 3] = Math.round(alphaBg * 255);
    }
  }

  return png(groesse, groesse, bild);
}

mkdirSync(ZIEL, { recursive: true });
for (const groesse of [180, 192, 512]) {
  const datei = join(ZIEL, `icon-${groesse}.png`);
  writeFileSync(datei, iconZeichnen(groesse));
  console.log('geschrieben:', datei);
}
