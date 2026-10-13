import { glossary, allLessons } from '../data/index.js';
import { esc, icon } from '../ui.js';
import { registerInit } from '../registry.js';

export function renderGlossary() {
  const buchstaben = [...new Set(glossary.map((g) => g.term[0].toUpperCase()))].sort();

  return `
  <h1 class="seiten-titel">Lexikon</h1>
  <p class="seiten-text">Die Fachbegriffe aus den Lektionen, kurz erklärt. Wenn dir in einem Text
  ein Wort fehlt, steht es wahrscheinlich hier.</p>

  <div class="karte" data-view-init="glossar">
    <input type="search" id="g-suche" class="suchfeld" placeholder="Begriff filtern …"
      autocomplete="off" aria-label="Begriff filtern">
    <div class="buchstaben">${buchstaben.map((b) => `<span>${b}</span>`).join('')}</div>
    <dl class="glossar" id="g-liste">
      ${glossary
        .map(
          (g) => `<div class="g-eintrag" data-text="${esc((g.term + ' ' + g.def).toLowerCase())}">
          <dt>${esc(g.term)}</dt><dd>${esc(g.def)}</dd></div>`
        )
        .join('')}
    </dl>
    <p id="g-leer" class="meldung" hidden>Kein Begriff gefunden.</p>
  </div>`;
}

registerInit('glossar', (wurzel) => {
  const feld = wurzel.querySelector('#g-suche');
  const eintraege = [...wurzel.querySelectorAll('.g-eintrag')];
  const leer = wurzel.querySelector('#g-leer');

  feld.addEventListener('input', () => {
    const suche = feld.value.trim().toLowerCase();
    let sichtbar = 0;
    eintraege.forEach((el) => {
      const treffer = !suche || el.dataset.text.includes(suche);
      el.hidden = !treffer;
      if (treffer) sichtbar++;
    });
    leer.hidden = sichtbar > 0;
  });
});

export function renderSearch() {
  return `
  <h1 class="seiten-titel">Suchen</h1>
  <div class="karte" data-view-init="suche">
    <input type="search" id="s-feld" class="suchfeld" placeholder="z. B. Schleife, localStorage, Git …"
      autocomplete="off" autofocus aria-label="Lektionen und Begriffe durchsuchen">
    <div id="s-treffer" class="treffer"><p class="meldung">Tippe mindestens zwei Zeichen.</p></div>
  </div>`;
}

registerInit('suche', (wurzel) => {
  const feld = wurzel.querySelector('#s-feld');
  const ziel = wurzel.querySelector('#s-treffer');

  const index = allLessons.map((l) => ({
    catId: l.catId,
    id: l.id,
    title: l.title,
    catTitle: l.catTitle,
    color: l.color,
    text: (l.title + ' ' + l.md + ' ' + (l.quiz || []).map((q) => q.q).join(' ')).toLowerCase()
  }));

  function ausschnitt(text, suche) {
    const pos = text.indexOf(suche);
    if (pos < 0) return '';
    const von = Math.max(0, pos - 60);
    const roh = text.slice(von, pos + 90).replace(/\s+/g, ' ').trim();
    return (von > 0 ? '… ' : '') + roh + ' …';
  }

  feld.addEventListener('input', () => {
    const suche = feld.value.trim().toLowerCase();
    if (suche.length < 2) {
      ziel.innerHTML = '<p class="meldung">Tippe mindestens zwei Zeichen.</p>';
      return;
    }

    const lektionen = index.filter((l) => l.text.includes(suche)).slice(0, 12);
    const begriffe = glossary
      .filter((g) => (g.term + ' ' + g.def).toLowerCase().includes(suche))
      .slice(0, 6);

    if (!lektionen.length && !begriffe.length) {
      ziel.innerHTML = `<p class="meldung">Nichts gefunden zu „${esc(feld.value)}“.</p>`;
      return;
    }

    ziel.innerHTML = `
      ${begriffe.length
        ? `<h3 class="treffer-titel">${icon('book', 15)} Begriffe</h3>
           <dl class="glossar">${begriffe
             .map((g) => `<div class="g-eintrag"><dt>${esc(g.term)}</dt><dd>${esc(g.def)}</dd></div>`)
             .join('')}</dl>`
        : ''}
      ${lektionen.length
        ? `<h3 class="treffer-titel">${icon('grid', 15)} Lektionen</h3>
           <ul class="treffer-liste">${lektionen
             .map(
               (l) => `<li style="--farbe:${l.color}">
                 <a href="#/l/${l.catId}/${l.id}">
                   <strong>${esc(l.title)}</strong>
                   <small>${esc(l.catTitle)}</small>
                   <span class="ausschnitt">${esc(ausschnitt(l.text, suche))}</span>
                 </a></li>`
             )
             .join('')}</ul>`
        : ''}`;
  });
});
