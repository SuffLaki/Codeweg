// Fortschritt, Einstellungen und Übungsergebnisse — alles im localStorage.
// Pro Gerät und Browser; eine zum Homescreen hinzugefügte App hat ihren eigenen Speicher.

const KEY = 'codeweg.v1';

const leer = {
  done: {},          // "catId/lessonId" -> ISO-Datum
  quiz: {},          // "catId/lessonId" -> { richtig, gesamt, datum }
  bookmarks: [],     // ["catId/lessonId"]
  streak: { days: 0, last: null },
  xp: 0,
  theme: 'auto',     // auto | dark | light
  lastLesson: null,
  practice: { runs: 0, correct: 0, total: 0 }
};

function laden() {
  try {
    const rohdaten = localStorage.getItem(KEY);
    if (!rohdaten) return { ...leer };
    return { ...leer, ...JSON.parse(rohdaten) };
  } catch {
    return { ...leer };
  }
}

let state = laden();
const horcher = new Set();

function speichern() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* Privater Modus oder voller Speicher — die App läuft weiter, nur ohne Merken. */
  }
  horcher.forEach((fn) => fn(state));
}

export function getState() {
  return state;
}

export function subscribe(fn) {
  horcher.add(fn);
  return () => horcher.delete(fn);
}

export const key = (catId, lessonId) => `${catId}/${lessonId}`;

function heute() {
  return new Date().toISOString().slice(0, 10);
}

function streakPflegen() {
  const t = heute();
  const last = state.streak.last;
  if (last === t) return;
  const gestern = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  state.streak = { days: last === gestern ? state.streak.days + 1 : 1, last: t };
}

export function isDone(catId, lessonId) {
  return Boolean(state.done[key(catId, lessonId)]);
}

export function setDone(catId, lessonId, wert = true) {
  const k = key(catId, lessonId);
  if (wert) {
    if (!state.done[k]) state.xp += 20;
    state.done[k] = new Date().toISOString();
    streakPflegen();
  } else {
    delete state.done[k];
  }
  speichern();
}

export function setLastLesson(catId, lessonId) {
  state.lastLesson = { catId, lessonId, at: new Date().toISOString() };
  speichern();
}

export function saveQuiz(catId, lessonId, richtig, gesamt) {
  const k = key(catId, lessonId);
  const vorher = state.quiz[k];
  state.quiz[k] = { richtig, gesamt, datum: new Date().toISOString() };
  if (!vorher || richtig > vorher.richtig) state.xp += richtig * 5;
  streakPflegen();
  speichern();
}

export function getQuiz(catId, lessonId) {
  return state.quiz[key(catId, lessonId)] || null;
}

export function toggleBookmark(catId, lessonId) {
  const k = key(catId, lessonId);
  const i = state.bookmarks.indexOf(k);
  if (i >= 0) state.bookmarks.splice(i, 1);
  else state.bookmarks.push(k);
  speichern();
  return i < 0;
}

export function isBookmarked(catId, lessonId) {
  return state.bookmarks.includes(key(catId, lessonId));
}

export function savePractice(richtig, gesamt) {
  state.practice.runs += 1;
  state.practice.correct += richtig;
  state.practice.total += gesamt;
  state.xp += richtig * 3;
  streakPflegen();
  speichern();
}

export function setTheme(theme) {
  state.theme = theme;
  speichern();
}

export function categoryProgress(cat) {
  const fertig = cat.lessons.filter((l) => isDone(cat.id, l.id)).length;
  return { fertig, gesamt: cat.lessons.length, prozent: Math.round((fertig / cat.lessons.length) * 100) };
}

export function overallProgress(categories) {
  const gesamt = categories.reduce((s, c) => s + c.lessons.length, 0);
  const fertig = categories.reduce((s, c) => s + categoryProgress(c).fertig, 0);
  return { fertig, gesamt, prozent: gesamt ? Math.round((fertig / gesamt) * 100) : 0 };
}

export function exportJson() {
  return JSON.stringify(state, null, 2);
}

export function importJson(text) {
  const daten = JSON.parse(text);
  if (typeof daten !== 'object' || daten === null) throw new Error('Unbrauchbare Datei');
  state = { ...leer, ...daten };
  speichern();
}

export function resetAll() {
  state = { ...leer, theme: state.theme };
  speichern();
}
