// Darstellungs-Helfer: HTML maskieren, kleiner Markdown-Renderer,
// einfache Syntaxfarben, Icons, Fortschrittsring.

export function esc(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// --- Syntaxfarben -----------------------------------------------------------
// Bewusst klein gehalten: Kommentare, Texte, Zahlen, Schlüsselwörter.
const KEYWORDS = {
  js: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'of', 'in', 'while', 'new', 'await', 'async', 'try', 'catch', 'throw', 'class', 'export', 'default', 'import', 'from', 'true', 'false', 'null', 'undefined', 'typeof'],
  python: ['def', 'return', 'if', 'elif', 'else', 'for', 'in', 'while', 'import', 'from', 'as', 'with', 'try', 'except', 'raise', 'class', 'True', 'False', 'None', 'and', 'or', 'not', 'lambda', 'pass', 'print'],
  swift: ['let', 'var', 'func', 'return', 'if', 'else', 'for', 'in', 'while', 'struct', 'class', 'enum', 'import', 'guard', 'some', 'true', 'false', 'nil', 'private', 'init'],
  html: [],
  css: [],
  json: ['true', 'false', 'null'],
  sql: ['SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'GROUP', 'BY', 'ORDER', 'LIMIT', 'AS', 'SUM', 'NOT', 'NULL', 'PRIMARY', 'KEY', 'DEFAULT', 'IF', 'EXISTS'],
  bash: ['cd', 'npx', 'npm', 'pip', 'git', 'python', 'winget'],
  powershell: ['cd', 'pip', 'python', 'winget', 'pyinstaller'],
  jsx: ['const', 'let', 'function', 'return', 'import', 'from', 'export', 'default', 'if']
};

export function highlight(code, lang = 'js') {
  const sprache = (lang || 'js').toLowerCase();
  const words = KEYWORDS[sprache] || KEYWORDS.js;
  const marken = [];
  // Platzhalter dürfen weder Ziffern noch Buchstaben enthalten, sonst erkennen
  // die nachfolgenden Regeln (Zahlen, Schlüsselwörter) sie als Code.
  const halte = (klasse, inhalt) => {
    marken.push(`<span class="tok-${klasse}">${inhalt}</span>`);
    const nummer = String(marken.length - 1)
      .split('')
      .map((z) => String.fromCharCode(0xe000 + Number(z)))
      .join('');
    return `\u0000${nummer}\u0000`;
  };

  let out = esc(code);

  if (sprache === 'html') {
    out = out.replace(/&lt;!--[\s\S]*?--&gt;/g, (m) => halte('com', m));
    out = out.replace(/&lt;\/?[a-zA-Z][\w-]*/g, (m) => halte('tag', m));
    out = out.replace(/&quot;[^&]*?&quot;/g, (m) => halte('str', m));
  } else if (sprache === 'css') {
    out = out.replace(/\/\*[\s\S]*?\*\//g, (m) => halte('com', m));
    out = out.replace(/^([^{}\n]+)\{/gm, (m, sel) => `${halte('tag', sel)}{`);
    out = out.replace(/([a-z-]+)(\s*:)/g, (m, prop, rest) => `${halte('key', prop)}${rest}`);
  } else {
    // Kommentare
    out = out.replace(/(^|\s)(\/\/[^\n]*|#[^\n]*|--[^\n]*)/g, (m, pre, com) => pre + halte('com', com));
    // Texte in Anführungszeichen (auch maskierte)
    out = out.replace(/(&quot;|&#39;)(?:(?!\1)[\s\S])*?\1/g, (m) => halte('str', m));
    // Zahlen
    out = out.replace(/\b\d+(?:\.\d+)?\b/g, (m) => halte('num', m));
    // Schlüsselwörter
    if (words.length) {
      const re = new RegExp(`\\b(${words.join('|')})\\b`, sprache === 'sql' ? 'gi' : 'g');
      out = out.replace(re, (m) => halte('key', m));
    }
    // Funktionsnamen
    out = out.replace(/\b([a-zA-Z_]\w*)(\()/g, (m, name, klammer) => `${halte('fn', name)}${klammer}`);
  }

  return out.replace(/\u0000([-]+)\u0000/g, (m, ziffern) =>
    marken[Number([...ziffern].map((z) => z.charCodeAt(0) - 0xe000).join(''))]
  );
}

// --- Markdown (bewusste Teilmenge) ------------------------------------------
function inline(text) {
  let out = esc(text);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return out;
}

export function renderMarkdown(md) {
  const zeilen = String(md).replace(/\r/g, '').split('\n');
  const teile = [];
  let i = 0;

  while (i < zeilen.length) {
    const zeile = zeilen[i];

    // Codeblock
    const fence = zeile.match(/^```(\w*)/);
    if (fence) {
      const lang = fence[1] || 'js';
      const code = [];
      i++;
      while (i < zeilen.length && !zeilen[i].startsWith('```')) code.push(zeilen[i++]);
      i++;
      const text = code.join('\n');
      teile.push(
        `<div class="codeblock"><div class="code-head"><span>${esc(lang)}</span>` +
        `<button class="copy" type="button" data-code="${esc(text)}">Kopieren</button></div>` +
        `<pre><code>${highlight(text, lang)}</code></pre></div>`
      );
      continue;
    }

    // Überschrift
    const h = zeile.match(/^(#{2,4})\s+(.*)/);
    if (h) {
      const stufe = h[1].length + 1;
      teile.push(`<h${stufe}>${inline(h[2])}</h${stufe}>`);
      i++;
      continue;
    }

    // Zitat / Hinweis (mehrzeilig, inkl. eingebetteter Codeblöcke)
    if (zeile.startsWith('>')) {
      const block = [];
      while (i < zeilen.length && (zeilen[i].startsWith('>') || (block.length && zeilen[i].trim() === ''))) {
        if (zeilen[i].trim() === '') { i++; break; }
        block.push(zeilen[i].replace(/^>\s?/, ''));
        i++;
      }
      teile.push(`<blockquote>${renderMarkdown(block.join('\n'))}</blockquote>`);
      continue;
    }

    // Aufzählung
    if (/^[-*]\s+/.test(zeile)) {
      const punkte = [];
      while (i < zeilen.length && /^[-*]\s+/.test(zeilen[i])) {
        punkte.push(`<li>${inline(zeilen[i].replace(/^[-*]\s+/, ''))}</li>`);
        i++;
      }
      teile.push(`<ul>${punkte.join('')}</ul>`);
      continue;
    }

    // Nummerierte Liste
    if (/^\d+\.\s+/.test(zeile)) {
      const punkte = [];
      while (i < zeilen.length && /^\d+\.\s+/.test(zeilen[i])) {
        punkte.push(`<li>${inline(zeilen[i].replace(/^\d+\.\s+/, ''))}</li>`);
        i++;
      }
      teile.push(`<ol>${punkte.join('')}</ol>`);
      continue;
    }

    if (zeile.trim() === '') { i++; continue; }

    // Absatz
    const abs = [];
    while (i < zeilen.length && zeilen[i].trim() !== '' && !/^(```|#{2,4}\s|>|[-*]\s|\d+\.\s)/.test(zeilen[i])) {
      abs.push(zeilen[i]);
      i++;
    }
    teile.push(`<p>${inline(abs.join(' '))}</p>`);
  }

  return teile.join('\n');
}

// --- Icons ------------------------------------------------------------------
const ICONS = {
  blocks: '<path d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v6H4zM14 15h6v6h-6z"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 5.5h3"/>',
  desktop: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M9 20h6M12 16v4"/>',
  database: '<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>',
  tools: '<path d="M14.5 6.5a3.5 3.5 0 1 0 4 4L21 13l-3 3-2.5-2.5a3.5 3.5 0 0 1-4-4L9 7l3-3zM8 13l-4 4 3 3 4-4"/>',
  home: '<path d="M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  chart: '<path d="M4 20V9M10 20V4M16 20v-7M22 20H2"/>',
  book: '<path d="M5 4.5h6.5a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H5zM19 4.5h-6.5a2 2 0 0 0-2 2V20a2 2 0 0 1 2-2H19z"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',
  star: '<path d="M12 3.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.8l6-.8z"/>',
  play: '<path d="M7 4.5l12 7.5-12 7.5z"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  back: '<path d="M14 5l-7 7 7 7"/>',
  flame: '<path d="M12 21c4 0 6.5-2.6 6.5-6 0-4.5-4.5-6-4.5-11 0 0-4 2-4 6.5 0 2-1.5 2.5-1.5 4.5 0 3.4 2.5 6 3.5 6z"/>'
};

export function icon(name, groesse = 22) {
  const pfad = ICONS[name] || ICONS.grid;
  return `<svg viewBox="0 0 24 24" width="${groesse}" height="${groesse}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${pfad}</svg>`;
}

export function ring(prozent, groesse = 54, farbe = 'var(--akzent)') {
  const r = (groesse - 7) / 2;
  const umfang = 2 * Math.PI * r;
  const anteil = Math.min(100, Math.max(0, prozent));
  const voll = (umfang * anteil) / 100;
  return `<svg class="ring" viewBox="0 0 ${groesse} ${groesse}" width="${groesse}" height="${groesse}" aria-hidden="true">
    <circle cx="${groesse / 2}" cy="${groesse / 2}" r="${r}" fill="none" stroke="var(--linie)" stroke-width="5"/>
    ${anteil > 0 ? `<circle cx="${groesse / 2}" cy="${groesse / 2}" r="${r}" fill="none" stroke="${farbe}" stroke-width="5"
      stroke-linecap="round" stroke-dasharray="${voll} ${umfang}"
      transform="rotate(-90 ${groesse / 2} ${groesse / 2})"/>` : ''}
    <text x="50%" y="50%" text-anchor="middle" dy="0.35em" font-size="${groesse * 0.3}" fill="currentColor" font-weight="600">${prozent}%</text>
  </svg>`;
}

export function shuffle(liste) {
  const kopie = [...liste];
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}
