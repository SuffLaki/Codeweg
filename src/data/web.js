export default {
  id: 'web',
  title: 'Web-Apps',
  subtitle: 'HTML, CSS, JavaScript — und daraus eine iPhone-App',
  icon: 'globe',
  color: '#22c3a6',
  blurb: 'Der schnellste Weg zu etwas Sichtbarem. Am Ende dieser Kategorie hast du eine eigene Mini-App, die du auf dem iPhone-Homescreen installieren kannst — genau so wie diese hier.',
  lessons: [
    {
      id: 'html',
      title: 'Wie eine Seite aufgebaut ist (HTML)',
      mins: 8,
      md: `
HTML ist keine Programmiersprache, sondern eine **Beschreibung der Struktur**: Was ist eine Überschrift, was ein Absatz, was ein Knopf. Du beschreibst Inhalt, nicht Aussehen.

\`\`\`html
<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Meine erste Seite</title>
  </head>
  <body>
    <h1>Baustelle Ulm Nord</h1>
    <p>Stand: 240 von 400 Meter verlegt.</p>
    <button>Fortschritt melden</button>
  </body>
</html>
\`\`\`

### Tags kommen im Paar
\`<p>\` öffnet, \`</p>\` schließt. Dazwischen steht der Inhalt. Manche Tags haben keinen Inhalt und stehen allein, z. B. \`<img src="bild.jpg" alt="Graben">\`.

### Die wichtigsten Tags
- \`<h1>\` bis \`<h6>\` — Überschriften, \`h1\` nur einmal pro Seite
- \`<p>\` — Absatz
- \`<ul>\` mit \`<li>\` — Liste
- \`<a href="…">\` — Link
- \`<img src="…" alt="…">\` — Bild (\`alt\` ist die Beschreibung für Vorleseprogramme)
- \`<input>\`, \`<button>\` — Eingabefeld und Knopf
- \`<div>\` und \`<span>\` — neutrale Behälter ohne eigene Bedeutung

### id und class
\`\`\`html
<p id="status">offen</p>
<p class="hinweis">Bitte Helm tragen</p>
\`\`\`
Ein \`id\` gibt es pro Seite nur einmal — damit findest du ein Element später mit JavaScript. Eine \`class\` darf oft vorkommen — darüber gestaltest du mit CSS.

### Ausprobieren ohne Installation
Schreib den Code in eine Datei \`index.html\` (Editor, auch Notepad genügt) und öffne sie per Doppelklick. Fertig — das ist eine Webseite. Mehr braucht es nicht zum Anfangen.

> **Merksatz:** HTML = Skelett, CSS = Kleidung, JavaScript = Muskeln.
`,
      quiz: [
        { q: 'Was beschreibt HTML?', a: ['Das Aussehen', 'Die Struktur und Bedeutung des Inhalts', 'Die Logik'], c: 1, why: 'Aussehen ist CSS, Logik ist JavaScript.' },
        { q: 'Wie oft darf eine id auf einer Seite vorkommen?', a: ['Einmal', 'Beliebig oft', 'Maximal dreimal'], c: 0, why: 'Eine id ist eindeutig. Für mehrfache Verwendung nimmst du class.' },
        { q: 'Wozu dient alt bei einem Bild?', a: ['Als Bildtitel beim Drucken', 'Als Beschreibung, u. a. für Vorleseprogramme und wenn das Bild fehlt', 'Zur Angabe der Bildgröße'], c: 1, why: 'Barrierefreiheit — und hilfreich, wenn das Bild nicht lädt.' }
      ]
    },
    {
      id: 'css',
      title: 'Aussehen gestalten mit CSS',
      mins: 9,
      md: `
CSS sagt dem Browser, **wie** die HTML-Elemente aussehen sollen. Eine Regel besteht aus Selektor (wen betrifft es) und Eigenschaften.

\`\`\`css
h1 {
  color: #0b1324;
  font-size: 28px;
}

.hinweis {
  background: #fff4d6;
  padding: 12px;
  border-radius: 10px;
}

#status {
  font-weight: 600;
}
\`\`\`

- \`h1\` trifft alle h1-Tags
- \`.hinweis\` trifft alles mit \`class="hinweis"\`
- \`#status\` trifft das Element mit \`id="status"\`

### Das Box-Modell
Jedes Element ist ein Kasten mit vier Ringen: Inhalt → \`padding\` (Innenabstand) → \`border\` (Rahmen) → \`margin\` (Außenabstand). Die meisten Layout-Fragen am Anfang sind in Wahrheit Fragen nach padding und margin.

### Flexbox — Dinge nebeneinander
\`\`\`css
.zeile {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}
\`\`\`
\`display: flex\` macht aus einem Behälter eine Reihe. \`gap\` setzt Abstände, \`align-items\` richtet quer aus, \`justify-content\` verteilt längs. Damit baust du 80 Prozent aller Layouts.

### Fürs iPhone wichtig
\`\`\`css
body { font-size: 17px; }          /* nicht kleiner, sonst zoomt Safari */
button { min-height: 44px; }        /* Apples Mindestgröße für Finger */
\`\`\`
Und im HTML-Kopf:
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1">
\`\`\`
Ohne diese Zeile zeigt das iPhone deine Seite verkleinert wie eine Desktop-Seite.

> **Tipp:** Lege Farben als Variablen an, dann änderst du das ganze Design an einer Stelle:
> \`\`\`css
> :root { --akzent: #22c3a6; }
> button { background: var(--akzent); }
> \`\`\`
`,
      quiz: [
        { q: 'Was trifft der Selektor .hinweis?', a: ['Das Element mit id="hinweis"', 'Alle Elemente mit class="hinweis"', 'Alle hinweis-Tags'], c: 1, why: 'Punkt = class, Raute = id.' },
        { q: 'Was ist padding?', a: ['Der Abstand außen um das Element', 'Der Abstand innen zwischen Rahmen und Inhalt', 'Die Rahmenbreite'], c: 1, why: 'padding ist innen, margin ist außen.' },
        { q: 'Warum braucht eine iPhone-Seite das viewport-Meta-Tag?', a: ['Sonst wird die Seite verkleinert wie eine Desktop-Seite dargestellt', 'Sonst lädt das CSS nicht', 'Es ist nur für Android nötig'], c: 0, why: 'Ohne viewport skaliert Safari auf ca. 980 px Breite herunter.' }
      ]
    },
    {
      id: 'js-dom',
      title: 'JavaScript: die Seite lebendig machen',
      mins: 9,
      md: `
JavaScript kann HTML-Elemente **finden und verändern**. Der Zugang dazu heißt DOM (Document Object Model) — der Seitenbaum, wie der Browser ihn im Speicher hält.

\`\`\`html
<p id="status">offen</p>
<script>
  const el = document.getElementById("status");
  el.textContent = "in Arbeit";
</script>
\`\`\`

### Elemente finden
\`\`\`js
document.getElementById("status");        // per id
document.querySelector(".hinweis");       // erstes Treffer-Element per CSS-Selektor
document.querySelectorAll("li");          // alle Treffer als Liste
\`\`\`
\`querySelector\` versteht dieselben Selektoren wie CSS — damit kommst du überall hin.

### Verändern
\`\`\`js
el.textContent = "neuer Text";       // Text setzen (sicher)
el.classList.add("fertig");          // CSS-Klasse anhängen
el.classList.toggle("offen");        // an/aus schalten
el.style.display = "none";           // direkt verstecken
\`\`\`

> **Sicherheit:** Es gibt auch \`innerHTML\`. Damit kannst du HTML einfügen — aber wenn darin Text von Nutzern steckt, kann jemand Schadcode unterschieben. Nimm \`textContent\`, außer du baust das HTML selbst zusammen und kennst jeden Teil.

### Neue Elemente bauen
\`\`\`js
const liste = document.querySelector("#aufgaben");
const eintrag = document.createElement("li");
eintrag.textContent = "Graben verfüllen";
liste.appendChild(eintrag);
\`\`\`

### Wo gehört das Script hin?
Ans Ende des \`<body>\` oder mit \`<script src="app.js" defer></script>\` in den Kopf. Grund: Das Script kann nur Elemente finden, die der Browser bereits gelesen hat. \`defer\` heißt "warte, bis die Seite fertig geladen ist" — das ist die saubere Lösung.
`,
      playground: {
        label: 'So baut man eine Liste im Speicher auf (Ausgabe statt Seite)',
        code: 'const aufgaben = ["Graben verfüllen", "Rohr prüfen", "Foto machen"];\n\nlet html = "<ul>";\nfor (const a of aufgaben) {\n  html = html + "<li>" + a + "</li>";\n}\nhtml = html + "</ul>";\n\nconsole.log("So würde das HTML aussehen:");\nconsole.log(html);'
      },
      quiz: [
        { q: 'Was ist das DOM?', a: ['Eine Programmiersprache', 'Der Seitenbaum im Speicher des Browsers, den JavaScript verändern kann', 'Ein Dateiformat'], c: 1, why: 'Über das DOM greift JavaScript auf HTML-Elemente zu.' },
        { q: 'Welche Eigenschaft setzt Text sicher?', a: ['innerHTML', 'textContent', 'value'], c: 1, why: 'textContent fügt nie HTML ein und ist damit sicher gegen eingeschleusten Code.' },
        { q: 'Warum defer beim script-Tag?', a: ['Damit das Script schneller lädt', 'Damit es erst läuft, wenn die HTML-Elemente existieren', 'Damit es nur einmal läuft'], c: 1, why: 'Sonst findet getElementById noch nichts.' }
      ]
    },
    {
      id: 'events',
      title: 'Auf Eingaben reagieren (Events)',
      mins: 8,
      md: `
Eine App ist erst eine App, wenn sie auf dich reagiert. Das Werkzeug: \`addEventListener\`.

\`\`\`html
<button id="melden">Fortschritt melden</button>
<p id="status">offen</p>

<script>
  const knopf = document.getElementById("melden");
  const status = document.getElementById("status");

  knopf.addEventListener("click", () => {
    status.textContent = "gemeldet um " + new Date().toLocaleTimeString();
  });
</script>
\`\`\`

Gelesen: "Höre auf dem Knopf auf *click* und führe dann diese Funktion aus." Die Funktion in den Klammern heißt Callback — sie liegt bereit und läuft erst, wenn das Ereignis eintritt.

### Die Ereignisse, die du am meisten brauchst
- \`click\` — Tippen/Klicken
- \`input\` — bei jedem Zeichen in einem Eingabefeld
- \`change\` — wenn ein Feld fertig geändert ist
- \`submit\` — Formular abgeschickt
- \`keydown\` — Taste gedrückt

### Werte aus Eingabefeldern
\`\`\`js
const feld = document.getElementById("meter");
feld.addEventListener("input", () => {
  const meter = Number(feld.value);     // value ist IMMER Text!
  console.log(meter * 12.5 + " Euro");
});
\`\`\`

### Formulare: den Neuladen stoppen
\`\`\`js
form.addEventListener("submit", (ereignis) => {
  ereignis.preventDefault();    // verhindert das Neuladen der Seite
  // … eigene Verarbeitung
});
\`\`\`
Ohne \`preventDefault()\` lädt der Browser die Seite neu und dein Zustand ist weg. Das ist einer der häufigsten Stolpersteine bei der ersten eigenen App.

> **Fürs iPhone:** \`click\` funktioniert auch bei Berührung. Du brauchst keine Touch-Events, solange du echte \`<button>\`-Elemente benutzt. Noch ein Grund, keine \`<div>\`s als Knöpfe zu missbrauchen — \`<button>\` bringt Tastatur- und Vorlesebedienung gratis mit.
`,
      playground: {
        label: 'So sieht die Logik eines Klick-Zählers aus',
        code: 'let klicks = 0;\n\nfunction beiKlick() {\n  klicks = klicks + 1;\n  console.log("Knopf gedrückt. Zähler: " + klicks);\n}\n\n// Wir rufen es hier dreimal von Hand auf,\n// im Browser würde addEventListener das übernehmen:\nbeiKlick();\nbeiKlick();\nbeiKlick();'
      },
      quiz: [
        { q: 'Was macht addEventListener("click", fn)?', a: ['Es klickt den Knopf', 'Es merkt sich: beim Klick führe fn aus', 'Es prüft, ob geklickt wurde'], c: 1, why: 'Die Funktion wird hinterlegt und später vom Browser aufgerufen.' },
        { q: 'Welchen Typ hat feld.value eines Eingabefeldes?', a: ['Zahl', 'Text', 'Je nach Eingabe'], c: 1, why: 'Immer Text — deshalb Number(...) verwenden, sonst rechnet du mit Strings.' },
        { q: 'Was verhindert preventDefault() bei submit?', a: ['Das Absenden per Tastatur', 'Das Neuladen der Seite durch den Browser', 'Fehlerhafte Eingaben'], c: 1, why: 'Du übernimmst die Verarbeitung selbst, der Browser soll nicht neu laden.' }
      ]
    },
    {
      id: 'speichern',
      title: 'Daten im Browser speichern',
      mins: 7,
      md: `
Standardmäßig ist nach dem Neuladen alles weg. Für kleine Apps reicht \`localStorage\` — ein Notizblock im Browser, der Neustarts übersteht.

\`\`\`js
localStorage.setItem("name", "Harry");
const name = localStorage.getItem("name");   // "Harry"
localStorage.removeItem("name");
\`\`\`

### Nur Text — also JSON
localStorage speichert ausschließlich Text. Objekte und Listen musst du umwandeln:
\`\`\`js
const aufgaben = [
  { text: "Graben prüfen", fertig: false }
];

localStorage.setItem("aufgaben", JSON.stringify(aufgaben));   // Objekt → Text

const gelesen = JSON.parse(localStorage.getItem("aufgaben")); // Text → Objekt
\`\`\`

### Robust lesen
Beim ersten Start ist nichts gespeichert, und beschädigte Daten lassen \`JSON.parse\` abstürzen. Deshalb immer mit Netz:
\`\`\`js
function laden() {
  try {
    return JSON.parse(localStorage.getItem("aufgaben")) || [];
  } catch {
    return [];
  }
}
\`\`\`
Dieses Muster — versuchen, und im Fehlerfall einen sinnvollen Standardwert — brauchst du überall, wo Daten von außen kommen.

### Grenzen, die du kennen musst
- ca. 5 MB Platz, nur Text
- gilt **pro Browser und pro Gerät** — nichts wird synchronisiert
- im privaten Modus und beim Löschen der Browserdaten verschwindet alles
- eine App, die du auf dem iPhone zum Homescreen hinzufügst, hat einen **eigenen** Speicher, getrennt von Safari

> **Für später:** Für größere Datenmengen (Fotos, viele Datensätze) nimmt man IndexedDB, und wenn Daten auf mehreren Geräten gleich sein sollen, braucht es einen Server. Für Checklisten, Einstellungen und Fortschritt — wie in dieser Lern-App — ist localStorage genau richtig.
`,
      playground: {
        label: 'JSON hin und zurück',
        code: 'const aufgaben = [\n  { text: "Graben prüfen", fertig: false },\n  { text: "Foto machen", fertig: true }\n];\n\nconst text = JSON.stringify(aufgaben);\nconsole.log("Als Text gespeichert:", text);\n\nconst zurueck = JSON.parse(text);\nconsole.log("Erste Aufgabe:", zurueck[0].text);\nconsole.log("Offen:", zurueck.filter(a => !a.fertig).length);'
      },
      quiz: [
        { q: 'Was speichert localStorage?', a: ['Beliebige Objekte', 'Nur Text', 'Nur Zahlen'], c: 1, why: 'Deshalb JSON.stringify beim Speichern und JSON.parse beim Lesen.' },
        { q: 'Sind localStorage-Daten auf allen Geräten gleich?', a: ['Ja, sie werden synchronisiert', 'Nein, sie liegen nur in diesem Browser auf diesem Gerät', 'Nur mit Apple-ID'], c: 1, why: 'Für Synchronisierung brauchst du einen Server.' },
        { q: 'Warum try/catch beim JSON.parse?', a: ['Weil parse langsam ist', 'Weil fehlende oder beschädigte Daten sonst die App abstürzen lassen', 'Das ist unnötig'], c: 1, why: 'Beim ersten Start ist der Eintrag null — mit Standardwert abfangen.' }
      ]
    },
    {
      id: 'mini-app',
      title: 'Projekt: deine erste eigene Mini-App',
      mins: 12,
      md: `
Jetzt setzt du alles zusammen: eine Checkliste, die Einträge speichert. Eine Datei, kein Werkzeug, kein Internet nötig.

Lege \`checkliste.html\` an und öffne sie per Doppelklick:

\`\`\`html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Checkliste</title>
  <style>
    body { font-family: -apple-system, system-ui, sans-serif;
           max-width: 480px; margin: 0 auto; padding: 16px; font-size: 17px; }
    li { padding: 10px 0; border-bottom: 1px solid #ddd; cursor: pointer; }
    li.fertig { text-decoration: line-through; opacity: .5; }
    input, button { font-size: 17px; min-height: 44px; }
  </style>
</head>
<body>
  <h1>Checkliste</h1>
  <form id="form">
    <input id="feld" placeholder="Neue Aufgabe" required>
    <button type="submit">Hinzufügen</button>
  </form>
  <ul id="liste"></ul>

  <script>
    const form  = document.getElementById("form");
    const feld  = document.getElementById("feld");
    const liste = document.getElementById("liste");

    let aufgaben = laden();
    zeichnen();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      aufgaben.push({ text: feld.value, fertig: false });
      feld.value = "";
      speichern(); zeichnen();
    });

    function zeichnen() {
      liste.innerHTML = "";
      aufgaben.forEach((a, index) => {
        const li = document.createElement("li");
        li.textContent = a.text;
        if (a.fertig) li.classList.add("fertig");
        li.addEventListener("click", () => {
          aufgaben[index].fertig = !aufgaben[index].fertig;
          speichern(); zeichnen();
        });
        liste.appendChild(li);
      });
    }

    function speichern() {
      localStorage.setItem("aufgaben", JSON.stringify(aufgaben));
    }
    function laden() {
      try { return JSON.parse(localStorage.getItem("aufgaben")) || []; }
      catch { return []; }
    }
  </script>
</body>
</html>
\`\`\`

### Was hier passiert
Es gibt **eine Wahrheit** — die Liste \`aufgaben\`. Jede Änderung ändert nur diese Liste, danach wird gespeichert und die Anzeige komplett neu gezeichnet. Dieses Muster heißt *State und Render* und ist das Fundament aller modernen App-Frameworks (React, SwiftUI, Vue). Wenn du es hier verstehst, verstehst du später die großen Werkzeuge schneller.

### Deine Aufgaben zum Üben
1. Einen Löschen-Knopf pro Eintrag einbauen
2. Oben anzeigen: "3 von 7 erledigt"
3. Erledigte Einträge nach unten sortieren
4. Ein Datum pro Eintrag speichern und anzeigen

> Wenn etwas nicht geht: Rechtsklick → *Untersuchen* → Reiter *Console*. Dort stehen die Fehlermeldungen mit Zeilennummer.
`,
      quiz: [
        { q: 'Was bedeutet das Muster "State und Render"?', a: ['Die Anzeige wird direkt geändert', 'Es gibt eine Datenwahrheit; nach jeder Änderung wird die Anzeige neu aus ihr aufgebaut', 'Daten liegen nur im HTML'], c: 1, why: 'Genau so arbeiten React, Vue und SwiftUI — nur komfortabler.' },
        { q: 'Warum liste.innerHTML = "" am Anfang von zeichnen()?', a: ['Zum Leeren, damit Einträge nicht doppelt erscheinen', 'Um Speicher zu sparen', 'Das ist nur Dekoration'], c: 0, why: 'Ohne Leeren würde jede Neuzeichnung die Liste verdoppeln.' },
        { q: 'Wo siehst du Fehlermeldungen deiner Seite?', a: ['In der Datei selbst', 'In der Browser-Konsole (Entwicklertools)', 'Im Papierkorb'], c: 1, why: 'Die Konsole ist dein wichtigstes Werkzeug.' }
      ]
    },
    {
      id: 'pwa',
      title: 'Aus der Webseite wird eine iPhone-App (PWA)',
      mins: 10,
      md: `
Eine PWA (Progressive Web App) ist eine Webseite, die sich wie eine App verhält: eigenes Icon auf dem Homescreen, Vollbild ohne Safari-Leiste, offline nutzbar. **Diese Lern-App hier ist genau so gebaut.**

Du brauchst drei Dinge.

### 1. Ein Manifest
\`manifest.webmanifest\`:
\`\`\`json
{
  "name": "Meine Checkliste",
  "short_name": "Checkliste",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#0b1020",
  "theme_color": "#0b1020",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
\`\`\`
Im HTML verlinken:
\`\`\`html
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icons/icon-180.png">
\`\`\`
\`display: standalone\` ist der Schalter für "ohne Browser-Leiste". Das Apple-Icon braucht iOS extra — ohne diese Zeile nimmt es einen Screenshot deiner Seite als Icon.

### 2. Ein Service Worker
Ein kleines Script, das im Hintergrund läuft und Dateien zwischenspeichert, damit die App offline startet:
\`\`\`js
// sw.js
const CACHE = "app-v1";
const DATEIEN = ["./", "./index.html", "./style.css", "./app.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(DATEIEN)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(treffer => treffer || fetch(e.request))
  );
});
\`\`\`
Registrieren in der App:
\`\`\`js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
\`\`\`

> **Die häufigste Falle:** Der Service Worker liefert die **alte** Version aus, obwohl du längst etwas geändert hast. Lösung: bei jeder Veröffentlichung den Cache-Namen hochzählen (\`app-v2\`). Wenn du dich beim Entwickeln wunderst, warum eine Änderung nicht erscheint — das ist fast immer der Grund.

### 3. HTTPS
Service Worker laufen nur über \`https://\` (oder \`localhost\` beim Entwickeln). Das bekommst du kostenlos über GitHub Pages — siehe Kategorie *Werkzeuge & Praxis*.

### Auf dem iPhone installieren
Seite in **Safari** öffnen (nicht Chrome) → Teilen-Symbol → *Zum Home-Bildschirm*. Danach startet sie wie eine App.

> **Wichtig zu wissen:** Die installierte App hat einen **eigenen** Datenspeicher, getrennt von Safari. Entfernst du sie und fügst sie neu hinzu, sind die gespeicherten Daten weg. Deshalb bei echten Daten immer eine Export-Funktion einbauen.

### PWA oder echte App?
Eine PWA kann Kamera, Standort, Offline-Betrieb und Dateien. Was ihr auf iOS fehlt: Push-Nachrichten sind eingeschränkt, Hintergrundaktivität gibt es nicht, und in den App Store kommt sie nicht. Für eigene Werkzeuge ist sie der mit Abstand schnellste Weg — und du brauchst keinen Mac und kein Entwicklerkonto.
`,
      quiz: [
        { q: 'Was macht der Service Worker?', a: ['Er beschleunigt das Internet', 'Er speichert Dateien zwischen, damit die App offline startet', 'Er installiert die App im App Store'], c: 1, why: 'Er sitzt zwischen App und Netzwerk und bedient Anfragen aus dem Cache.' },
        { q: 'Warum erscheinen Änderungen manchmal nicht in der installierten PWA?', a: ['Weil der alte Cache des Service Workers ausgeliefert wird', 'Weil das iPhone zu langsam ist', 'Weil JSON kaputt ist'], c: 0, why: 'Cache-Namen bei jeder Veröffentlichung hochzählen.' },
        { q: 'Mit welchem Browser installiert man eine PWA auf dem iPhone?', a: ['Chrome', 'Safari über Teilen → Zum Home-Bildschirm', 'Egal welcher'], c: 1, why: 'Auf iOS kann das zuverlässig nur Safari.' }
      ]
    }
  ]
};
