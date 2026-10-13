import { getState, setTheme, subscribe } from './store.js';
import { icon } from './ui.js';
import { runInits } from './registry.js';
import { renderHome } from './views/home.js';
import { renderCategories, renderCategory } from './views/category.js';
import { renderLesson } from './views/lesson.js';
import { renderPractice } from './views/practice.js';
import { renderProgress } from './views/progress.js';
import { renderGlossary, renderSearch } from './views/library.js';

const app = document.getElementById('app');
const navbar = document.getElementById('nav');

const NAV = [
  { href: '#/', icon: 'home', label: 'Start' },
  { href: '#/kategorien', icon: 'grid', label: 'Lernen' },
  { href: '#/ueben', icon: 'target', label: 'Üben' },
  { href: '#/fortschritt', icon: 'chart', label: 'Verlauf' },
  { href: '#/glossar', icon: 'book', label: 'Lexikon' }
];

function themeAnwenden() {
  const theme = getState().theme || 'auto';
  const wurzel = document.documentElement;
  if (theme === 'auto') wurzel.removeAttribute('data-theme');
  else wurzel.setAttribute('data-theme', theme);
}

function themeLabel() {
  const t = getState().theme || 'auto';
  const text = { auto: 'Automatisch', dark: 'Dunkel', light: 'Hell' }[t];
  const knopf = document.getElementById('theme-toggle');
  knopf.title = `Darstellung: ${text}`;
  knopf.setAttribute('aria-label', `Darstellung umschalten (aktuell: ${text})`);
}

function navZeichnen(pfad) {
  const aktiv = (href) => {
    if (href === '#/') return pfad === '/';
    const basis = href.slice(1);
    if (basis === '/kategorien') return pfad.startsWith('/kategorien') || pfad.startsWith('/k/') || pfad.startsWith('/l/');
    return pfad.startsWith(basis);
  };
  navbar.innerHTML = NAV.map(
    (n) => `<a href="${n.href}" class="${aktiv(n.href) ? 'aktiv' : ''}" aria-current="${aktiv(n.href) ? 'page' : 'false'}">
      ${icon(n.icon, 21)}<span>${n.label}</span></a>`
  ).join('');
}

function pfadLesen() {
  return (location.hash.replace(/^#/, '') || '/').replace(/\/+$/, '') || '/';
}

function zeichnen() {
  const pfad = pfadLesen();
  const teile = pfad.split('/').filter(Boolean);
  let html;

  if (pfad === '/') html = renderHome();
  else if (teile[0] === 'kategorien') html = renderCategories();
  else if (teile[0] === 'k') html = renderCategory(teile[1]);
  else if (teile[0] === 'l') html = renderLesson(teile[1], teile[2]);
  else if (teile[0] === 'ueben') html = renderPractice(teile[1]);
  else if (teile[0] === 'fortschritt') html = renderProgress();
  else if (teile[0] === 'glossar') html = renderGlossary();
  else if (teile[0] === 'suche') html = renderSearch();
  else html = `<section class="karte"><h2>Nicht gefunden</h2>
      <p>Diese Seite gibt es nicht.</p><a class="knopf" href="#/">Zur Startseite</a></section>`;

  app.innerHTML = html;
  navZeichnen(pfad);
  runInits(app);
  window.scrollTo({ top: 0 });
}

// Kopier-Knöpfe in allen Codeblöcken
document.addEventListener('click', async (e) => {
  const knopf = e.target.closest('button.copy');
  if (!knopf) return;
  try {
    await navigator.clipboard.writeText(knopf.dataset.code || '');
    knopf.textContent = 'Kopiert ✓';
  } catch {
    knopf.textContent = 'Nicht möglich';
  }
  setTimeout(() => { knopf.textContent = 'Kopieren'; }, 1600);
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  const reihe = ['auto', 'dark', 'light'];
  const jetzt = getState().theme || 'auto';
  setTheme(reihe[(reihe.indexOf(jetzt) + 1) % reihe.length]);
  themeAnwenden();
  themeLabel();
});

subscribe(() => {
  const kopf = document.getElementById('kopf-xp');
  if (kopf) kopf.textContent = `${getState().xp} XP`;
});

window.addEventListener('hashchange', zeichnen);

themeAnwenden();
themeLabel();
document.getElementById('kopf-xp').textContent = `${getState().xp} XP`;
zeichnen();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
