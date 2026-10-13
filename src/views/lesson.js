import { findLesson } from '../data/index.js';
import {
  isDone, setDone, setLastLesson, saveQuiz, getQuiz,
  isBookmarked, toggleBookmark
} from '../store.js';
import { renderMarkdown, highlight, icon, esc, shuffle } from '../ui.js';
import { registerInit } from '../registry.js';

let aktuell = null;   // { cat, lesson, prev, next }

export function renderLesson(catId, lessonId) {
  const treffer = findLesson(catId, lessonId);
  if (!treffer) return `<section class="karte"><h2>Lektion nicht gefunden</h2>
    <a class="knopf" href="#/kategorien">Zu den Kategorien</a></section>`;

  aktuell = treffer;
  const { cat, lesson, prev, next, index } = treffer;
  setLastLesson(cat.id, lesson.id);

  const fertig = isDone(cat.id, lesson.id);
  const marke = isBookmarked(cat.id, lesson.id);
  const alt = getQuiz(cat.id, lesson.id);

  const spielplatz = lesson.playground
    ? `<section class="karte playground" id="playground">
        <h2>${icon('play', 18)} Ausprobieren</h2>
        <p class="pg-label">${esc(lesson.playground.label)}</p>
        <div class="editor-huelle">
          <textarea id="pg-code" spellcheck="false" rows="${Math.min(18, lesson.playground.code.split('\n').length + 2)}">${esc(lesson.playground.code)}</textarea>
        </div>
        <div class="pg-knoepfe">
          <button class="knopf" id="pg-run">Ausführen</button>
          <button class="knopf geist" id="pg-reset">Zurücksetzen</button>
        </div>
        <pre class="pg-ausgabe" id="pg-out" aria-live="polite">Ausgabe erscheint hier.</pre>
        <small class="pg-hinweis">Läuft abgeschottet in deinem Browser. Nur <code>console.log</code> wird angezeigt;
        eine Endlosschleife wird nach 3 Sekunden abgebrochen.</small>
      </section>`
    : '';

  const quiz = lesson.quiz?.length
    ? `<section class="karte quiz" id="quiz">
        <h2>${icon('check', 18)} Verstanden?</h2>
        ${alt ? `<p class="quiz-alt">Letztes Ergebnis: <strong>${alt.richtig} von ${alt.gesamt}</strong></p>` : ''}
        <div id="quiz-fragen"></div>
        <div class="quiz-fuss">
          <button class="knopf" id="quiz-pruefen">Antworten prüfen</button>
          <span id="quiz-ergebnis" aria-live="polite"></span>
        </div>
      </section>`
    : '';

  return `
  <a class="zurueck" href="#/k/${cat.id}">${icon('back', 18)} ${esc(cat.title)}</a>

  <header class="lek-kopf" style="--farbe:${cat.color}">
    <span class="etikett" style="--farbe:${cat.color}">Lektion ${index + 1} · ${lesson.mins} Min</span>
    <h1>${esc(lesson.title)}</h1>
    <button class="marke-knopf ${marke ? 'an' : ''}" id="marke" aria-pressed="${marke}">
      ${icon('star', 16)} ${marke ? 'Gemerkt' : 'Merken'}
    </button>
  </header>

  <article class="inhalt" data-view-init="lesson">${renderMarkdown(lesson.md)}</article>

  ${spielplatz}
  ${quiz}

  <section class="karte abschluss">
    <label class="schalter">
      <input type="checkbox" id="fertig" ${fertig ? 'checked' : ''}>
      <span>Lektion als erledigt markieren</span>
    </label>
    <div class="blaettern">
      ${prev ? `<a class="knopf geist" href="#/l/${cat.id}/${prev.id}">${icon('back', 16)} Zurück</a>` : '<span></span>'}
      ${next
        ? `<a class="knopf" href="#/l/${cat.id}/${next.id}">Weiter</a>`
        : `<a class="knopf" href="#/k/${cat.id}">Kategorie abschließen</a>`}
    </div>
  </section>`;
}

// --- Nachbereitung ----------------------------------------------------------
registerInit('lesson', () => {
  const { cat, lesson } = aktuell;

  // Merken
  const marke = document.getElementById('marke');
  marke?.addEventListener('click', () => {
    const an = toggleBookmark(cat.id, lesson.id);
    marke.classList.toggle('an', an);
    marke.setAttribute('aria-pressed', String(an));
    marke.innerHTML = `${icon('star', 16)} ${an ? 'Gemerkt' : 'Merken'}`;
  });

  // Erledigt
  const haken = document.getElementById('fertig');
  haken?.addEventListener('change', () => setDone(cat.id, lesson.id, haken.checked));

  if (lesson.playground) spielplatzStarten(lesson.playground.code);
  if (lesson.quiz?.length) quizStarten(cat.id, lesson);
});

// --- Code-Spielplatz --------------------------------------------------------
// Der Code läuft in einem abgeschotteten iframe (sandbox="allow-scripts",
// kein Zugriff auf diese Seite). Eine Endlosschleife blockiert nur das iframe,
// das wir nach 3 Sekunden verwerfen.
const RAHMEN_HTML = `<!doctype html><meta charset="utf-8"><script>
  const zeilen = [];
  const zeige = (...args) => zeilen.push(args.map(a => {
    if (typeof a === 'string') return a;
    try { return JSON.stringify(a); } catch { return String(a); }
  }).join(' '));
  console.log = zeige; console.info = zeige; console.warn = zeige; console.error = zeige;
  addEventListener('message', (e) => {
    zeilen.length = 0;
    let fehler = null;
    try { new Function(e.data)(); }
    catch (err) { fehler = (err && err.message) ? err.constructor.name + ': ' + err.message : String(err); }
    parent.postMessage({ zeilen: zeilen.slice(0, 200), fehler }, '*');
  });
<\/script>`;

function spielplatzStarten(original) {
  const feld = document.getElementById('pg-code');
  const aus = document.getElementById('pg-out');
  const run = document.getElementById('pg-run');
  const reset = document.getElementById('pg-reset');
  let rahmen = null;
  let wecker = null;

  function aufraeumen() {
    clearTimeout(wecker);
    rahmen?.remove();
    rahmen = null;
  }

  function ausfuehren() {
    aufraeumen();
    aus.className = 'pg-ausgabe';
    aus.textContent = 'Läuft …';

    rahmen = document.createElement('iframe');
    rahmen.sandbox = 'allow-scripts';
    rahmen.hidden = true;
    rahmen.srcdoc = RAHMEN_HTML;

    const antwort = (e) => {
      if (e.source !== rahmen?.contentWindow) return;
      window.removeEventListener('message', antwort);
      const { zeilen, fehler } = e.data || {};
      const text = (zeilen || []).join('\n');
      aus.textContent = fehler
        ? `${text ? text + '\n' : ''}⚠ ${fehler}`
        : text || '(keine Ausgabe — fehlt ein console.log?)';
      aus.className = 'pg-ausgabe' + (fehler ? ' fehler' : '');
      aufraeumen();
    };
    window.addEventListener('message', antwort);

    rahmen.addEventListener('load', () => rahmen.contentWindow.postMessage(feld.value, '*'));
    document.body.appendChild(rahmen);

    wecker = setTimeout(() => {
      window.removeEventListener('message', antwort);
      aus.textContent = '⚠ Abgebrochen nach 3 Sekunden.\nVerdacht auf Endlosschleife — welche Zeile bringt die Bedingung zum Kippen?';
      aus.className = 'pg-ausgabe fehler';
      aufraeumen();
    }, 3000);
  }

  run.addEventListener('click', ausfuehren);
  reset.addEventListener('click', () => {
    feld.value = original;
    aus.textContent = 'Ausgabe erscheint hier.';
    aus.className = 'pg-ausgabe';
  });

  // Tabulator im Textfeld rückt ein statt das Feld zu verlassen
  feld.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const { selectionStart: a, selectionEnd: b, value } = feld;
    feld.value = value.slice(0, a) + '  ' + value.slice(b);
    feld.selectionStart = feld.selectionEnd = a + 2;
  });
}

// --- Quiz -------------------------------------------------------------------
export function fragenAufbauen(quiz) {
  return quiz.map((f) => {
    const optionen = shuffle(f.a.map((text, i) => ({ text, richtig: i === f.c })));
    return { frage: f.q, warum: f.why, optionen };
  });
}

export function quizHtml(fragen, prefix = 'f') {
  return fragen
    .map(
      (f, i) => `<fieldset class="frage" data-frage="${i}">
      <legend>${i + 1}. ${esc(f.frage)}</legend>
      ${f.optionen
        .map(
          (o, j) => `<label class="option">
            <input type="radio" name="${prefix}${i}" value="${j}">
            <span>${esc(o.text)}</span>
          </label>`
        )
        .join('')}
      <p class="warum" hidden>${esc(f.warum)}</p>
    </fieldset>`
    )
    .join('');
}

export function quizAuswerten(wurzel, fragen, prefix = 'f') {
  let richtig = 0;
  let offen = 0;

  fragen.forEach((f, i) => {
    const feld = wurzel.querySelector(`[data-frage="${i}"]`);
    const gewaehlt = wurzel.querySelector(`input[name="${prefix}${i}"]:checked`);
    feld.querySelectorAll('.option').forEach((label, j) => {
      label.classList.toggle('richtig', f.optionen[j].richtig);
      label.classList.toggle('falsch', Boolean(gewaehlt) && Number(gewaehlt.value) === j && !f.optionen[j].richtig);
      label.querySelector('input').disabled = true;
    });
    feld.querySelector('.warum').hidden = false;
    if (!gewaehlt) offen++;
    else if (f.optionen[Number(gewaehlt.value)].richtig) richtig++;
  });

  return { richtig, offen };
}

function quizStarten(catId, lesson) {
  const behaelter = document.getElementById('quiz-fragen');
  const knopf = document.getElementById('quiz-pruefen');
  const ergebnis = document.getElementById('quiz-ergebnis');
  const fragen = fragenAufbauen(lesson.quiz);

  behaelter.innerHTML = quizHtml(fragen);

  knopf.addEventListener('click', () => {
    const { richtig, offen } = quizAuswerten(behaelter, fragen);
    const gesamt = fragen.length;
    saveQuiz(catId, lesson.id, richtig, gesamt);
    knopf.disabled = true;
    ergebnis.innerHTML = `<strong>${richtig} von ${gesamt} richtig.</strong> ${
      richtig === gesamt
        ? 'Sauber — das sitzt.'
        : offen
          ? 'Ein Blick in die Erklärungen lohnt sich.'
          : 'Die Erklärungen unter den Fragen zeigen, woran es lag.'
    }`;
    if (richtig === gesamt) {
      const haken = document.getElementById('fertig');
      if (haken && !haken.checked) {
        haken.checked = true;
        setDone(catId, lesson.id, true);
      }
    }
  });
}
