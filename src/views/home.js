import { categories, allLessons, findLesson } from '../data/index.js';
import { getState, categoryProgress, overallProgress, isDone } from '../store.js';
import { icon, ring, esc } from '../ui.js';

function naechsteLektion() {
  const s = getState();
  if (s.lastLesson) {
    const treffer = findLesson(s.lastLesson.catId, s.lastLesson.lessonId);
    if (treffer && !isDone(treffer.cat.id, treffer.lesson.id)) {
      return { cat: treffer.cat, lesson: treffer.lesson, grund: 'Weiter, wo du warst' };
    }
    if (treffer && treffer.next) {
      return { cat: treffer.cat, lesson: treffer.next, grund: 'Die nächste Lektion' };
    }
  }
  for (const cat of categories) {
    const offen = cat.lessons.find((l) => !isDone(cat.id, l.id));
    if (offen) return { cat, lesson: offen, grund: 'Dein nächster Schritt' };
  }
  return null;
}

export function renderHome() {
  const s = getState();
  const gesamt = overallProgress(categories);
  const weiter = naechsteLektion();
  const minuten = allLessons.reduce((sum, l) => sum + l.mins, 0);

  const fortsetzen = weiter
    ? `<a class="weiter-karte" href="#/l/${weiter.cat.id}/${weiter.lesson.id}">
         <div>
           <span class="etikett" style="--farbe:${weiter.cat.color}">${esc(weiter.grund)}</span>
           <h3>${esc(weiter.lesson.title)}</h3>
           <p>${esc(weiter.cat.title)} · ${weiter.lesson.mins} Min</p>
         </div>
         <span class="weiter-play">${icon('play', 20)}</span>
       </a>`
    : `<div class="weiter-karte fertig">
         <div><h3>Alles durchgearbeitet 🎉</h3>
         <p>Halte es frisch: ab zum Üben-Bereich.</p></div>
         <a class="knopf klein" href="#/ueben">Üben</a>
       </div>`;

  return `
  <section class="hero">
    <div class="hero-text">
      <h1>Programmieren lernen</h1>
      <p>Vom ersten Befehl bis zur eigenen App — in sechs Kategorien, auf Deutsch, in Häppchen für unterwegs.</p>
    </div>
    <div class="hero-ring">${ring(gesamt.prozent, 76)}</div>
  </section>

  <div class="kennzahlen">
    <div class="kennzahl"><strong>${gesamt.fertig}/${gesamt.gesamt}</strong><span>Lektionen</span></div>
    <div class="kennzahl"><strong>${s.xp}</strong><span>XP</span></div>
    <div class="kennzahl"><strong>${s.streak.days}</strong><span>${icon('flame', 14)} Tage</span></div>
    <div class="kennzahl"><strong>${Math.round(minuten / 60)} h</strong><span>Lernstoff</span></div>
  </div>

  ${fortsetzen}

  <div class="abschnitt-kopf">
    <h2>Kategorien</h2>
    <a href="#/kategorien">Alle ansehen</a>
  </div>

  <div class="kat-liste">
    ${categories
      .map((cat) => {
        const p = categoryProgress(cat);
        return `<a class="kat-karte" href="#/k/${cat.id}" style="--farbe:${cat.color}">
          <span class="kat-icon">${icon(cat.icon, 24)}</span>
          <span class="kat-text">
            <strong>${esc(cat.title)}</strong>
            <small>${esc(cat.subtitle)}</small>
            <span class="balken"><i style="width:${p.prozent}%"></i></span>
          </span>
          <span class="kat-zahl">${p.fertig}/${p.gesamt}</span>
        </a>`;
      })
      .join('')}
  </div>

  <div class="schnell">
    <a class="schnell-karte" href="#/ueben">${icon('target', 20)}<span><strong>Üben</strong><small>Fragen gemischt aus allen Lektionen</small></span></a>
    <a class="schnell-karte" href="#/suche">${icon('search', 20)}<span><strong>Suchen</strong><small>Begriff oder Lektion finden</small></span></a>
    <a class="schnell-karte" href="#/glossar">${icon('book', 20)}<span><strong>Lexikon</strong><small>40 Fachbegriffe erklärt</small></span></a>
  </div>

  <p class="fussnote">Dein Fortschritt bleibt auf diesem Gerät gespeichert — ohne Konto, ohne Server.
  Tipp: In Safari über <em>Teilen → Zum Home-Bildschirm</em> wird daraus eine App.</p>
  `;
}
