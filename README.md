# Codeweg

Eine Web-App zum Programmierenlernen — auf Deutsch, fürs iPhone gebaut, komplett offline nutzbar.

**Live:** https://sufflaki.github.io/Codeweg/

## Was drin ist

37 Lektionen in sechs Kategorien:

| Kategorie | Inhalt |
|---|---|
| **Grundlagen** | Variablen, Bedingungen, Schleifen, Funktionen, Listen & Objekte, Debugging |
| **Web-Apps** | HTML, CSS, JavaScript/DOM, Events, localStorage, eigene Mini-App, PWA |
| **Smartphone-Apps** | Wege zur App, Swift, SwiftUI, State, React Native/Expo, App Store |
| **PC-Anwendungen** | Python, Dateien, Tkinter-Fenster, Excel-Automatisierung, .exe, CLI |
| **Daten & APIs** | JSON, fetch/APIs, SQLite & SQL, Validierung, Schlüssel & Sicherheit |
| **Werkzeuge & Praxis** | VS Code, Git & GitHub, GitHub Pages, KI-Nutzung, Projektplanung, Lernroutine |

Dazu:

- **Code-Spielplatz** — JavaScript direkt in der Lektion ausführen, abgeschottet in einem Sandbox-iframe, mit Abbruch nach 3 Sekunden bei Endlosschleifen
- **Quiz** pro Lektion und ein **Übungsmodus** mit gemischten Fragen aus allen Kategorien
- **Fortschritt, XP, Tagesserie**, gemerkte Lektionen, Sichern/Laden als Datei
- **Lexikon** mit 40 Fachbegriffen und Volltextsuche über alle Lektionen
- Hell/Dunkel/Automatisch, Offline-Betrieb, installierbar auf dem Home-Bildschirm

## Auf dem iPhone installieren

1. https://sufflaki.github.io/Codeweg/ in **Safari** öffnen
2. Teilen-Symbol → **Zum Home-Bildschirm**
3. Danach startet Codeweg wie eine App — auch ohne Internet

> Der Fortschritt liegt im Speicher des Browsers bzw. der installierten App, nicht in der Cloud.
> Beim Wechsel des Geräts: unter *Verlauf → Fortschritt sichern* eine Datei exportieren und dort wieder laden.

## Lokal starten

Kein Build-Schritt, keine Abhängigkeiten. Es genügt ein beliebiger lokaler Webserver
(nötig, weil die App ES-Module lädt — ein Doppelklick auf `index.html` reicht nicht):

```bash
npx serve .
# oder
python -m http.server 8080
```

Dann http://localhost:8080 öffnen. Unter Windows:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\vorschau.ps1
```

Icons neu erzeugen (reines Node, keine Pakete):

```bash
node scripts/make-icons.mjs
```

## Aufbau

```
index.html                 Hülle: Kopfzeile, Tableiste, Einstiegspunkt
assets/style.css           Design (Dark-First, Hell-Modus, Safe-Area, 44px-Ziele)
src/app.js                 Router (Hash-basiert), Theme, Service-Worker-Registrierung
src/store.js               Fortschritt in localStorage, XP, Serie, Export/Import
src/ui.js                  Markdown-Renderer, Syntaxfarben, Icons, Fortschrittsring
src/registry.js            Vermittlung: Views melden ihre Event-Listener an
src/data/*.js              Die Lerninhalte — eine Datei pro Kategorie
src/views/*.js             Start, Kategorien, Lektion, Üben, Verlauf, Lexikon/Suche
sw.js                      Offline-Cache (Netz zuerst, Cache als Rückfall)
```

### Inhalte ergänzen

Eine Lektion ist ein Objekt in der jeweiligen Datei unter `src/data/`:

```js
{
  id: 'eindeutige-id',
  title: 'Titel der Lektion',
  mins: 8,
  md: `Markdown-Text mit ### Überschriften, Listen, > Hinweisen und Codeblöcken`,
  playground: { label: 'Hinweis über dem Editor', code: 'console.log("Hallo");' },
  quiz: [
    { q: 'Frage?', a: ['Antwort A', 'Antwort B'], c: 0, why: 'Erklärung zur richtigen Antwort.' }
  ]
}
```

`c` ist der Index der richtigen Antwort. Die Antwortreihenfolge wird beim Anzeigen gemischt.
Neue Dateien zusätzlich in `src/data/index.js` und in der Liste in `sw.js` eintragen.

## Veröffentlichen

Die Seite liegt auf GitHub Pages, Quelle ist der Branch `main` (Ordner `/root`).
Nach `git push` ist die Änderung nach ein paar Minuten live.

**Bei jeder Veröffentlichung die Versionsnummer `CACHE` in `sw.js` erhöhen** —
sonst zeigen bereits installierte Apps weiterhin die alte Fassung.

## Technik

Reines HTML/CSS/JavaScript mit ES-Modulen. Keine Frameworks, keine Build-Werkzeuge,
keine externen Skripte, keine Server, keine Datenerhebung. Alles, was die App speichert,
bleibt auf dem Gerät.
