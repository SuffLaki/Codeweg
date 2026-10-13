import grundlagen from './grundlagen.js';
import web from './web.js';
import mobile from './mobile.js';
import desktop from './desktop.js';
import daten from './daten.js';
import praxis from './praxis.js';

export const categories = [grundlagen, web, mobile, desktop, daten, praxis];

export const allLessons = categories.flatMap((cat) =>
  cat.lessons.map((lesson) => ({ ...lesson, catId: cat.id, catTitle: cat.title, color: cat.color }))
);

export function findCategory(id) {
  return categories.find((c) => c.id === id);
}

export function findLesson(catId, lessonId) {
  const cat = findCategory(catId);
  if (!cat) return null;
  const index = cat.lessons.findIndex((l) => l.id === lessonId);
  if (index < 0) return null;
  return {
    cat,
    lesson: cat.lessons[index],
    prev: cat.lessons[index - 1] || null,
    next: cat.lessons[index + 1] || null,
    index
  };
}

export const glossary = [
  { term: 'API', def: 'Schnittstelle, über die ein Programm Daten eines anderen abrufen kann — meist als JSON über eine Web-Adresse.' },
  { term: 'Array', def: 'Geordnete Liste von Werten. Zugriff über die Position, beginnend bei 0.' },
  { term: 'async / await', def: 'Schreibweise für Vorgänge, die Zeit brauchen (z. B. Netzabfragen). await wartet auf das Ergebnis, ohne die App zu blockieren.' },
  { term: 'Boolean', def: 'Wahrheitswert: true oder false. Für Häkchen und Schalter.' },
  { term: 'Branch', def: 'Seitenstrang in Git. Du entwickelst darin, ohne den funktionierenden Hauptstand zu gefährden.' },
  { term: 'Bug', def: 'Fehler im Programm. Entweder Tippfehler, Laufzeitfehler oder Denkfehler.' },
  { term: 'Cache', def: 'Zwischenspeicher. Macht Dinge schnell — und zeigt manchmal hartnäckig die alte Version.' },
  { term: 'Callback', def: 'Funktion, die du hinterlegst und die später von jemand anderem aufgerufen wird, z. B. beim Klick.' },
  { term: 'Commit', def: 'Festgehaltener Stand in Git, mit Beschreibung. Dein Rückkehrpunkt.' },
  { term: 'CORS', def: 'Browser-Schutz, der verhindert, dass eine Seite beliebige fremde APIs direkt abruft.' },
  { term: 'CRUD', def: 'Create, Read, Update, Delete — die vier Grundoperationen auf Daten.' },
  { term: 'CSS', def: 'Sprache für das Aussehen einer Webseite: Farben, Abstände, Layout.' },
  { term: 'Debugging', def: 'Systematisches Suchen und Beheben von Fehlern — mit Ausgaben, Haltepunkten und Eingrenzen.' },
  { term: 'DOM', def: 'Der Seitenbaum im Speicher des Browsers. Über ihn verändert JavaScript die Seite.' },
  { term: 'Event', def: 'Ereignis wie Klick, Tastendruck oder Eingabe, auf das dein Code reagieren kann.' },
  { term: 'Flexbox', def: 'CSS-Layoutmodell, mit dem Elemente in Reihen oder Spalten angeordnet und verteilt werden.' },
  { term: 'Framework', def: 'Fertiges Gerüst, das dir Standardaufgaben abnimmt, z. B. React, SwiftUI, Django.' },
  { term: 'Funktion', def: 'Benannter Arbeitsschritt mit Eingaben (Parameter) und Ergebnis (return).' },
  { term: 'Git', def: 'Versionsverwaltung. Hält jeden Zwischenstand deines Codes abrufbar.' },
  { term: 'GitHub', def: 'Plattform, auf der Git-Projekte liegen. Dient als Backup, Veröffentlichung und Zusammenarbeit.' },
  { term: 'HTML', def: 'Beschreibt die Struktur einer Seite: Überschriften, Absätze, Knöpfe, Felder.' },
  { term: 'HTTPS', def: 'Verschlüsselte Web-Verbindung. Voraussetzung für Service Worker und PWAs.' },
  { term: 'IndexedDB', def: 'Größerer Datenspeicher im Browser, geeignet für Fotos und viele Datensätze.' },
  { term: 'JSON', def: 'Textformat für Daten, das jede Sprache lesen kann. Streng: doppelte Anführungszeichen, kein Komma am Ende.' },
  { term: 'localStorage', def: 'Kleiner, dauerhafter Textspeicher im Browser. Pro Gerät und Browser, ohne Synchronisierung.' },
  { term: 'Objekt', def: 'Datenstruktur mit benannten Eigenschaften, z. B. { ort: "Ulm", meter: 240 }.' },
  { term: 'Optional', def: 'In Swift ein Wert, der auch fehlen darf (String?). Der Compiler erzwingt, dass du den Fall behandelst.' },
  { term: 'Parameter', def: 'Eingabewert, den eine Funktion beim Aufruf bekommt.' },
  { term: 'pip', def: 'Paketverwaltung von Python. Installiert Zusatzbibliotheken.' },
  { term: 'PWA', def: 'Progressive Web App: Webseite, die sich wie eine App verhält — Homescreen-Icon, Vollbild, offline.' },
  { term: 'Repository', def: 'Projektordner unter Versionsverwaltung, meist mit einer Kopie auf GitHub.' },
  { term: 'Service Worker', def: 'Hintergrundscript, das Dateien zwischenspeichert, damit eine Web-App offline startet.' },
  { term: 'SQL', def: 'Abfragesprache für Datenbanken: SELECT, INSERT, UPDATE, DELETE.' },
  { term: 'SQL-Injection', def: 'Angriff über zusammengeklebte SQL-Texte. Verhindert man mit Platzhaltern (?).' },
  { term: 'State', def: 'Der aktuelle Datenzustand einer App. Änderst du ihn, zeichnet das Framework die Oberfläche neu.' },
  { term: 'String', def: 'Text. Werte aus Eingabefeldern sind immer Strings, auch wenn Zahlen drinstehen.' },
  { term: 'SwiftUI', def: 'Apples Werkzeug, um Oberflächen beschreibend (deklarativ) zu bauen.' },
  { term: 'Syntax', def: 'Die Schreibregeln einer Sprache. Ein Syntaxfehler verhindert, dass das Programm startet.' },
  { term: 'Variable', def: 'Benannter Speicherplatz für einen Wert.' },
  { term: 'Viewport', def: 'Der sichtbare Bereich auf dem Gerät. Das viewport-Meta-Tag sorgt für korrekte Darstellung auf dem Handy.' }
];
