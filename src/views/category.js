import { categories, findCategory } from '../data/index.js';
import { categoryProgress, isDone, getQuiz, isBookmarked } from '../store.js';
import { icon, ring, esc } from '../ui.js';

export function renderCategories() {
  return `
  <h1 class="seiten-titel">Lernen</h1>
  <p class="seiten-text">Sechs Kategorien, 37 Lektionen. Du kannst in jeder Kategorie einsteigen —
  die Grundlagen zahlen sich aber überall aus.</p>

  <div class="kat-gross">
    ${categories
      .map((cat) => {
        const p = categoryProgress(cat);
        return `<a class="kat-block" href="#/k/${cat.id}" style="--farbe:${cat.color}">
          <div class="kat-block-kopf">
            <span class="kat-icon">${icon(cat.icon, 26)}</span>
            ${ring(p.prozent, 46, cat.color)}
          </div>
          <h3>${esc(cat.title)}</h3>
          <p>${esc(cat.subtitle)}</p>
          <small>${p.fertig} von ${p.gesamt} Lektionen · ${cat.lessons.reduce((s, l) => s + l.mins, 0)} Min</small>
        </a>`;
      })
      .join('')}
  </div>`;
}

export function renderCategory(catId) {
  const cat = findCategory(catId);
  if (!cat) return `<section class="karte"><h2>Kategorie nicht gefunden</h2>
    <a class="knopf" href="#/kategorien">Zurück</a></section>`;

  const p = categoryProgress(cat);
  const naechste = cat.lessons.find((l) => !isDone(cat.id, l.id)) || cat.lessons[0];

  return `
  <a class="zurueck" href="#/kategorien">${icon('back', 18)} Kategorien</a>

  <section class="kat-kopf" style="--farbe:${cat.color}">
    <div class="kat-kopf-zeile">
      <span class="kat-icon gross">${icon(cat.icon, 30)}</span>
      ${ring(p.prozent, 60, cat.color)}
    </div>
    <h1>${esc(cat.title)}</h1>
    <p>${esc(cat.blurb)}</p>
    <a class="knopf" href="#/l/${cat.id}/${naechste.id}">
      ${p.fertig === 0 ? 'Erste Lektion starten' : p.fertig === p.gesamt ? 'Wiederholen' : 'Weiterlernen'}
    </a>
  </section>

  <ol class="lektionen">
    ${cat.lessons
      .map((l, i) => {
        const fertig = isDone(cat.id, l.id);
        const q = getQuiz(cat.id, l.id);
        const marke = isBookmarked(cat.id, l.id);
        return `<li>
          <a href="#/l/${cat.id}/${l.id}" class="${fertig ? 'erledigt' : ''}" style="--farbe:${cat.color}">
            <span class="nummer">${fertig ? icon('check', 16) : i + 1}</span>
            <span class="lek-text">
              <strong>${esc(l.title)}</strong>
              <small>${l.mins} Min${l.playground ? ' · mit Code-Übung' : ''}${q ? ` · Quiz ${q.richtig}/${q.gesamt}` : ''}</small>
            </span>
            ${marke ? `<span class="marke">${icon('star', 15)}</span>` : ''}
          </a>
        </li>`;
      })
      .join('')}
  </ol>

  <div class="kat-fuss">
    <a class="knopf geist" href="#/ueben/${cat.id}">${icon('target', 18)} Nur diese Kategorie üben</a>
  </div>`;
}
