// Kleine Vermittlungsstelle: Views melden hier eine Funktion an, die nach dem
// Einsetzen ihres HTML laufen soll (Event-Listener setzen). Eigene Datei, damit
// app.js und die Views sich nicht gegenseitig importieren müssen.

export const INITS = {};

export function registerInit(name, fn) {
  INITS[name] = fn;
}

export function runInits(wurzel) {
  wurzel.querySelectorAll('[data-view-init]').forEach((el) => {
    const fn = INITS[el.dataset.viewInit];
    if (fn) fn(el);
  });
}
