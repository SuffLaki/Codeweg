import { categories, allLessons, findCategory } from '../data/index.js';
import { savePractice, getState, isDone } from '../store.js';
import { icon, esc, shuffle } from '../ui.js';
import { registerInit } from '../registry.js';

const ANZAHL = 8;
let lauf = null;   // { fragen, index, richtig, catId }

function fragenSammeln(catId) {
  const quelle = catId
    ? allLessons.filter((l) => l.catId === catId)
    : allLessons;

  // Bearbeitete Lektionen zuerst — gefragt wird aber alles, auch Neues.
  const bearbeitet = quelle.filter((l) => isDone(l.catId, l.id));
  const basis = bearbeitet.length >= 3 ? bearbeitet : quelle;

  const alle = basis.flatMap((l) =>
    (l.quiz || []).map((f) => ({
      frage: f.q,
      warum: f.why,
      optionen: shuffle(f.a.map((text, i) => ({ text, richtig: i === f.c }))),
      catId: l.catId,
      lessonId: l.id,
      lessonTitle: l.title,
      catTitle: l.catTitle
    }))
  );

  return shuffle(alle).slice(0, ANZAHL);
}

export function renderPractice(catId) {
  const cat = catId ? findCategory(catId) : null;
  if (catId && !cat) return `<section class="karte"><h2>Kategorie nicht gefunden</h2>
    <a class="knopf" href="#/ueben">Alle Fragen üben</a></section>`;

  const s = getState();
  const quote = s.practice.total ? Math.round((s.practice.correct / s.practice.total) * 100) : null;

  lauf = { fragen: fragenSammeln(catId), index: 0, richtig: 0, catId: catId || null };

  if (!lauf.fragen.length) {
    return `<section class="karte"><h2>Keine Fragen vorhanden</h2>
      <p>Arbeite zuerst eine Lektion durch.</p>
      <a class="knopf" href="#/kategorien">Zu den Kategorien</a></section>`;
  }

  return `
  <h1 class="seiten-titel">Üben</h1>
  <p class="seiten-text">
    ${cat ? `Gemischte Fragen aus <strong>${esc(cat.title)}</strong>.` : 'Gemischte Fragen aus allen Kategorien.'}
    ${quote !== null ? `Bisherige Trefferquote: <strong>${quote} %</strong> aus ${s.practice.runs} Runden.` : 'Zum Wiederholen — ohne Zeitdruck.'}
  </p>

  <div class="ueben-filter">
    <a class="chip ${!catId ? 'an' : ''}" href="#/ueben">Alle</a>
    ${categories.map((c) => `<a class="chip ${catId === c.id ? 'an' : ''}" href="#/ueben/${c.id}">${esc(c.title)}</a>`).join('')}
  </div>

  <section class="karte ueben" data-view-init="practice">
    <div class="ueben-kopf">
      <span id="u-zaehler">Frage 1 von ${lauf.fragen.length}</span>
      <span class="balken schmal"><i id="u-balken" style="width:0%"></i></span>
    </div>
    <div id="u-inhalt"></div>
  </section>`;
}

registerInit('practice', (wurzel) => {
  const inhalt = wurzel.querySelector('#u-inhalt');
  const zaehler = wurzel.querySelector('#u-zaehler');
  const balken = wurzel.querySelector('#u-balken');

  function frageZeigen() {
    const f = lauf.fragen[lauf.index];
    zaehler.textContent = `Frage ${lauf.index + 1} von ${lauf.fragen.length}`;
    balken.style.width = `${(lauf.index / lauf.fragen.length) * 100}%`;

    inhalt.innerHTML = `
      <p class="u-herkunft">${esc(f.catTitle)} · ${esc(f.lessonTitle)}</p>
      <h2 class="u-frage">${esc(f.frage)}</h2>
      <div class="u-optionen">
        ${f.optionen.map((o, i) => `<button class="u-option" data-i="${i}">${esc(o.text)}</button>`).join('')}
      </div>
      <div class="u-rueck" hidden>
        <p id="u-warum"></p>
        <div class="u-rueck-fuss">
          <a class="knopf geist klein" href="#/l/${f.catId}/${f.lessonId}">Lektion nachlesen</a>
          <button class="knopf klein" id="u-weiter">${lauf.index + 1 === lauf.fragen.length ? 'Ergebnis' : 'Weiter'}</button>
        </div>
      </div>`;

    const rueck = inhalt.querySelector('.u-rueck');
    inhalt.querySelectorAll('.u-option').forEach((knopf) => {
      knopf.addEventListener('click', () => {
        const i = Number(knopf.dataset.i);
        const treffer = f.optionen[i].richtig;
        if (treffer) lauf.richtig++;

        inhalt.querySelectorAll('.u-option').forEach((b, j) => {
          b.disabled = true;
          if (f.optionen[j].richtig) b.classList.add('richtig');
          else if (j === i) b.classList.add('falsch');
        });

        inhalt.querySelector('#u-warum').innerHTML =
          `<strong>${treffer ? 'Richtig.' : 'Nicht ganz.'}</strong> ${esc(f.warum)}`;
        rueck.hidden = false;
        inhalt.querySelector('#u-weiter').addEventListener('click', weiter);
      });
    });
  }

  function weiter() {
    lauf.index++;
    if (lauf.index < lauf.fragen.length) frageZeigen();
    else ergebnisZeigen();
  }

  function ergebnisZeigen() {
    const gesamt = lauf.fragen.length;
    savePractice(lauf.richtig, gesamt);
    balken.style.width = '100%';
    zaehler.textContent = 'Fertig';

    const prozent = Math.round((lauf.richtig / gesamt) * 100);
    const spruch =
      prozent === 100 ? 'Alles richtig. Das sitzt wirklich.'
      : prozent >= 70 ? 'Gute Runde — die Lücken sind klein.'
      : prozent >= 40 ? 'Solider Anfang. Lies die markierten Lektionen nochmal.'
      : 'Kein Grund zur Sorge: nochmal durch die Lektionen, dann wieder hierher.';

    const schwach = lauf.fragen.filter((f, i) => i < lauf.index);

    inhalt.innerHTML = `
      <div class="u-ergebnis">
        <div class="u-score">${lauf.richtig}<small>/${gesamt}</small></div>
        <p>${esc(spruch)} <strong>+${lauf.richtig * 3} XP</strong></p>
        <div class="u-ergebnis-knoepfe">
          <button class="knopf" id="u-neu">Neue Runde</button>
          <a class="knopf geist" href="#/kategorien">Zu den Lektionen</a>
        </div>
        <details class="u-liste">
          <summary>Die Fragen dieser Runde</summary>
          <ul>${schwach
            .map((f) => `<li><a href="#/l/${f.catId}/${f.lessonId}">${esc(f.lessonTitle)}</a> — ${esc(f.frage)}</li>`)
            .join('')}</ul>
        </details>
      </div>`;

    inhalt.querySelector('#u-neu').addEventListener('click', () => {
      lauf = { fragen: fragenSammeln(lauf.catId), index: 0, richtig: 0, catId: lauf.catId };
      frageZeigen();
    });
  }

  frageZeigen();
});
