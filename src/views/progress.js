import { categories, allLessons, findLesson } from '../data/index.js';
import {
  getState, categoryProgress, overallProgress, isDone, getQuiz,
  exportJson, importJson, resetAll
} from '../store.js';
import { icon, ring, esc } from '../ui.js';
import { registerInit } from '../registry.js';

export function renderProgress() {
  const s = getState();
  const gesamt = overallProgress(categories);

  const gemerkt = s.bookmarks
    .map((k) => {
      const [catId, lessonId] = k.split('/');
      const treffer = findLesson(catId, lessonId);
      return treffer ? { catId, lessonId, title: treffer.lesson.title, cat: treffer.cat.title } : null;
    })
    .filter(Boolean);

  const quizzes = allLessons
    .map((l) => ({ lektion: l, q: getQuiz(l.catId, l.id) }))
    .filter((x) => x.q);

  const schwach = quizzes
    .filter((x) => x.q.richtig < x.q.gesamt)
    .sort((a, b) => a.q.richtig / a.q.gesamt - b.q.richtig / b.q.gesamt)
    .slice(0, 5);

  const erledigt = Object.entries(s.done)
    .sort((a, b) => b[1].localeCompare(a[1]))
    .slice(0, 6)
    .map(([k, datum]) => {
      const [catId, lessonId] = k.split('/');
      const treffer = findLesson(catId, lessonId);
      return treffer
        ? `<li><a href="#/l/${catId}/${lessonId}">${esc(treffer.lesson.title)}</a>
           <small>${new Date(datum).toLocaleDateString('de-DE')}</small></li>`
        : '';
    })
    .join('');

  return `
  <h1 class="seiten-titel">Verlauf</h1>

  <section class="karte verlauf-kopf">
    <div class="verlauf-ring">${ring(gesamt.prozent, 92)}</div>
    <div class="verlauf-zahlen">
      <p><strong>${gesamt.fertig}</strong> von ${gesamt.gesamt} Lektionen erledigt</p>
      <p><strong>${s.xp}</strong> XP gesammelt</p>
      <p>${icon('flame', 15)} <strong>${s.streak.days}</strong> Tage in Folge${
        s.streak.last ? ` · zuletzt ${new Date(s.streak.last).toLocaleDateString('de-DE')}` : ''
      }</p>
      <p>${s.practice.runs} Übungsrunden${
        s.practice.total ? ` · ${Math.round((s.practice.correct / s.practice.total) * 100)} % Treffer` : ''
      }</p>
    </div>
  </section>

  <h2 class="abschnitt">Nach Kategorie</h2>
  <div class="verlauf-liste">
    ${categories
      .map((cat) => {
        const p = categoryProgress(cat);
        return `<a class="verlauf-zeile" href="#/k/${cat.id}" style="--farbe:${cat.color}">
          <span class="kat-icon klein">${icon(cat.icon, 18)}</span>
          <span class="vz-text">
            <strong>${esc(cat.title)}</strong>
            <span class="balken"><i style="width:${p.prozent}%"></i></span>
          </span>
          <span class="vz-zahl">${p.fertig}/${p.gesamt}</span>
        </a>`;
      })
      .join('')}
  </div>

  ${schwach.length
      ? `<h2 class="abschnitt">Zum Wiederholen</h2>
         <p class="seiten-text">Hier war das Quiz noch nicht vollständig richtig.</p>
         <ul class="einfach-liste">
           ${schwach
             .map(
               (x) => `<li><a href="#/l/${x.lektion.catId}/${x.lektion.id}">${esc(x.lektion.title)}</a>
               <small>${x.q.richtig}/${x.q.gesamt} richtig</small></li>`
             )
             .join('')}
         </ul>`
      : ''}

  ${gemerkt.length
      ? `<h2 class="abschnitt">${icon('star', 16)} Gemerkt</h2>
         <ul class="einfach-liste">
           ${gemerkt
             .map((g) => `<li><a href="#/l/${g.catId}/${g.lessonId}">${esc(g.title)}</a>
             <small>${esc(g.cat)}</small></li>`)
             .join('')}
         </ul>`
      : ''}

  ${erledigt ? `<h2 class="abschnitt">Zuletzt erledigt</h2><ul class="einfach-liste">${erledigt}</ul>` : ''}

  <h2 class="abschnitt">Daten &amp; Einstellungen</h2>
  <section class="karte" data-view-init="progress">
    <p class="seiten-text">Dein Fortschritt liegt nur in diesem Browser. Sichere ihn als Datei,
    wenn du das Gerät wechselst oder die App vom Home-Bildschirm entfernst.</p>
    <div class="knopf-reihe">
      <button class="knopf geist" id="export">Fortschritt sichern</button>
      <label class="knopf geist dateiknopf">Sicherung laden
        <input type="file" id="import" accept="application/json,.json" hidden>
      </label>
      <button class="knopf gefahr" id="reset">Alles zurücksetzen</button>
    </div>
    <p id="daten-meldung" class="meldung" aria-live="polite"></p>
  </section>

  <p class="fussnote">Codeweg · ${allLessons.length} Lektionen · komplett offline nutzbar ·
  Quellcode auf <a href="https://github.com/SuffLaki/Codeweg">GitHub</a></p>
  `;
}

registerInit('progress', (wurzel) => {
  const meldung = wurzel.querySelector('#daten-meldung');

  wurzel.querySelector('#export').addEventListener('click', () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `codeweg-fortschritt-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    meldung.textContent = 'Datei gespeichert.';
  });

  wurzel.querySelector('#import').addEventListener('change', async (e) => {
    const datei = e.target.files?.[0];
    if (!datei) return;
    try {
      importJson(await datei.text());
      meldung.textContent = 'Sicherung geladen.';
      setTimeout(() => location.reload(), 600);
    } catch {
      meldung.textContent = 'Diese Datei konnte nicht gelesen werden.';
    }
  });

  wurzel.querySelector('#reset').addEventListener('click', () => {
    if (!confirm('Wirklich allen Fortschritt löschen? Das lässt sich nicht rückgängig machen.')) return;
    resetAll();
    location.reload();
  });
});
