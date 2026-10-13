export default {
  id: 'praxis',
  title: 'Werkzeuge & Praxis',
  subtitle: 'VS Code, Git, Veröffentlichen, KI, Projektplanung',
  icon: 'tools',
  color: '#ef6f8c',
  blurb: 'Das Drumherum, an dem Selbstlerner am häufigsten scheitern: Editor, Versionsverwaltung, Veröffentlichen, sinnvolle Nutzung von KI und eine Lernroutine, die auch nach drei Wochen noch läuft.',
  lessons: [
    {
      id: 'vscode',
      title: 'VS Code einrichten',
      mins: 7,
      md: `
VS Code ist der Standard-Editor — kostenlos, von Microsoft, für Windows, Mac und Linux.

### Installieren
\`\`\`powershell
winget install Microsoft.VisualStudioCode
\`\`\`

### Die fünf Tastenkürzel, die wirklich zählen
- \`Strg + P\` — Datei per Namen öffnen (statt im Baum klicken)
- \`Strg + Umschalt + F\` — im ganzen Projekt suchen
- \`Strg + ü\` — Terminal ein-/ausblenden (auf deutscher Tastatur; \`Strg + ö\` bei manchen Layouts)
- \`Alt + Umschalt + ↓\` — Zeile nach unten kopieren
- \`F2\` — Variable überall im Projekt umbenennen

### Nützliche Erweiterungen
- **German Language Pack** — deutsche Oberfläche
- **Prettier** — formatiert HTML/CSS/JS auf Knopfdruck einheitlich
- **Python** (Microsoft) — Autovervollständigung, Starten, Fehlersuche
- **Live Server** — Rechtsklick auf eine HTML-Datei → *Open with Live Server*: Seite lädt bei jedem Speichern automatisch neu

### Zwei Einstellungen, die den Alltag verbessern
*Datei → Einstellungen → Einstellungen*, dann suchen:
- **Format On Save** einschalten — der Code wird bei jedem Speichern aufgeräumt
- **Auto Save** auf \`afterDelay\`

### Das Terminal in VS Code
Unten rechts kannst du zwischen PowerShell und Git Bash wechseln. Hier gibst du \`python skript.py\`, \`git commit\` oder \`npm start\` ein — ohne das Fenster zu wechseln. Dass Editor und Kommandozeile zusammen in einem Fenster liegen, ist der eigentliche Grund für die Beliebtheit von VS Code.

### Haltepunkte statt print
Klicke links neben eine Zeilennummer (roter Punkt) und starte mit \`F5\`. Das Programm hält dort an, und du siehst **alle** Variablenwerte in diesem Moment. Mit \`F10\` gehst du Zeile für Zeile weiter. Für verzwickte Fehler ist das deutlich schneller als zwanzig \`print\`-Zeilen.

> **Für dein iPhone:** Programmieren am Handy ist mühsam, aber es gibt Wege — **Swift Playgrounds** (Apple, gratis) für Swift, **a-Shell** für Python, oder **GitHub Codespaces** im Safari für ein vollständiges VS Code in der Cloud. Zum Lesen und Lernen unterwegs reicht das; zum Schreiben bleibt der PC bequemer.
`,
      quiz: [
        { q: 'Was macht Live Server?', a: ['Er lädt die Seite bei jedem Speichern automatisch neu', 'Er veröffentlicht die Seite im Internet', 'Er sichert Dateien'], c: 0, why: 'Speichern, hinschauen — der kürzeste Lernkreislauf.' },
        { q: 'Was bringen Haltepunkte (Breakpoints)?', a: ['Sie beschleunigen das Programm', 'Das Programm hält an und zeigt alle Variablenwerte an dieser Stelle', 'Sie markieren Fehler automatisch'], c: 1, why: 'Oft schneller als viele print-Zeilen.' },
        { q: 'Wofür ist Format On Save gut?', a: ['Für einheitlich formatierten Code ohne Nachdenken', 'Für Sicherungskopien', 'Für schnelleres Speichern'], c: 0, why: 'Einrückungen und Abstände werden automatisch korrekt.' }
      ]
    },
    {
      id: 'git',
      title: 'Git & GitHub verstehen',
      mins: 10,
      md: `
Git ist eine Zeitmaschine für deinen Code: Jeder Zwischenstand bleibt abrufbar. GitHub ist der Ort im Netz, wo diese Stände liegen — dein Backup und Veröffentlichungsweg.

### Einmal einrichten
\`\`\`bash
git config --global user.name "Harry"
git config --global user.email "harry@example.com"
\`\`\`

### Der tägliche Ablauf
\`\`\`bash
git status                      # Was hat sich geändert?
git add .                       # Alles zum nächsten Stand vormerken
git commit -m "Checkliste speichert jetzt"   # Stand festhalten
git push                        # Zu GitHub hochladen
\`\`\`
Diese vier Befehle sind 95 Prozent der Praxis. Der Rest kommt, wenn du ihn brauchst.

### Das Bild dahinter
Stell dir Fotos deines Projekts vor. \`git add\` legt aus, was aufs Foto soll, \`git commit\` macht das Foto mit Beschriftung, \`git push\` legt das Album in den Safe im Netz. Zu jedem Foto kannst du zurückkehren.

### Repository anlegen
\`\`\`bash
cd mein-projekt
git init
git add .
git commit -m "Erster Stand"
gh repo create mein-projekt --public --source=. --push
\`\`\`
Der letzte Befehl braucht die GitHub-CLI (\`winget install GitHub.cli\`, dann einmal \`gh auth login\`). Alternativ legst du das Repository auf github.com per Knopf an und folgst den dort angezeigten Zeilen.

### .gitignore — vor dem ersten Commit anlegen
\`\`\`
node_modules/
__pycache__/
.env
*.db
dist/
.DS_Store
\`\`\`
Hier stehen Dinge, die **nicht** mit hochsollen: Zugangsdaten, erzeugte Dateien, riesige Ordner. Was einmal in der Historie ist, lässt sich nur mühsam entfernen — deshalb zuerst die \`.gitignore\`, dann der erste Commit.

### Gute Commit-Nachrichten
- Schlecht: "Änderungen", "fix", "asdf"
- Gut: "Löschen-Knopf in Checkliste ergänzt", "Komma-Eingabe bei Metern korrigiert"

In sechs Monaten suchst du nach genau dieser Zeile, wenn etwas kaputtgeht.

### Retten, wenn etwas schiefläuft
\`\`\`bash
git log --oneline               # Historie ansehen
git diff                        # Was habe ich gerade geändert?
git checkout -- datei.js        # Änderungen an einer Datei verwerfen
git revert <commit>             # Einen alten Commit rückgängig machen
\`\`\`
\`revert\` ist dein Freund: Es nimmt eine Änderung zurück und behält die Historie. Finger weg von \`git reset --hard\` und \`push --force\`, solange du nicht genau weißt, was sie tun — damit vernichtet man Arbeit endgültig.

### Branches, in einem Satz
\`git switch -c neue-funktion\` erstellt einen Seitenstrang. Du bastelst dort, ohne den funktionierenden Hauptstand zu gefährden, und führst später mit \`git merge\` zusammen. Allein arbeitend brauchst du das selten — aber es ist die Rettung, wenn du etwas Großes ausprobieren willst.

> **Mindestens:** Commit nach jedem Arbeitsabschnitt, der läuft. Push am Ende jeder Sitzung. Das ist bereits ein besseres Backup als das, was die meisten privaten Projekte haben.
`,
      quiz: [
        { q: 'Was macht git commit?', a: ['Es lädt zu GitHub hoch', 'Es hält den aktuellen Stand lokal mit Beschriftung fest', 'Es löscht alte Versionen'], c: 1, why: 'Hochladen ist git push.' },
        { q: 'Was gehört in .gitignore?', a: ['Alle Python-Dateien', 'Zugangsdaten, erzeugte Ordner, große Dateien', 'Die Commit-Nachrichten'], c: 1, why: 'Und sie sollte vor dem ersten Commit existieren.' },
        { q: 'Wie nimmst du eine alte Änderung sicher zurück?', a: ['git reset --hard', 'git revert', 'Dateien von Hand löschen'], c: 1, why: 'revert behält die Historie und ist nicht endgültig.' }
      ]
    },
    {
      id: 'pages',
      title: 'Veröffentlichen mit GitHub Pages',
      mins: 8,
      md: `
GitHub Pages stellt deine Webseite kostenlos unter einer HTTPS-Adresse bereit. Damit wird aus deiner lokalen Datei eine echte App, die du auf dem iPhone installieren und per Link weitergeben kannst.

### In fünf Schritten
1. Projekt als Repository nach GitHub pushen (die Startseite muss \`index.html\` heißen)
2. Im Repository auf **Settings** → links **Pages**
3. Bei *Source* **Deploy from a branch** wählen
4. Branch \`main\`, Ordner \`/ (root)\`, **Save**
5. Nach einigen Minuten ist die Seite unter \`https://BENUTZERNAME.github.io/REPOSITORYNAME/\` erreichbar

Danach genügt ein \`git push\` — die Seite aktualisiert sich automatisch. Jede Veröffentlichung dauert ein bis einige Minuten.

### Die drei häufigsten Fehler
**404 statt Seite.** Entweder fehlt \`index.html\` im Hauptordner, oder die Veröffentlichung läuft noch.

**Alles unformatiert.** Absolute Pfade funktionieren nicht, weil die Seite in einem Unterordner liegt. Also:
\`\`\`html
<!-- falsch -->
<link rel="stylesheet" href="/style.css">
<!-- richtig -->
<link rel="stylesheet" href="./style.css">
\`\`\`
Dasselbe gilt für Bilder, Scripte und den \`start_url\`-Eintrag im Manifest. Verwende konsequent relative Pfade mit \`./\`, dann läuft dieselbe App lokal **und** auf Pages.

**Groß-/Kleinschreibung.** Windows ist da großzügig, der Server von GitHub nicht: \`Style.css\` ist nicht \`style.css\`. Ein Klassiker — lokal funktioniert alles, online fehlt das Design.

### Auf dem iPhone installieren
Die Pages-Adresse in **Safari** öffnen → Teilen → *Zum Home-Bildschirm*. Durch HTTPS funktioniert auch der Service Worker, also der Offline-Betrieb.

### Ist das wirklich öffentlich?
Ja. Bei einem öffentlichen Repository kann jeder mit der Adresse die Seite sehen und den Quellcode lesen. Für private Werkzeuge heißt das: **keine Kunden- oder Personendaten** in den Code, keine Schlüssel. Die Daten, die Nutzer in der App eingeben, bleiben dagegen in deren Browser (localStorage) — die sieht niemand sonst.

### Alternativen
- **Netlify / Vercel** — Ordner in den Browser ziehen, fertig; mit mehr Komfort und Build-Schritten
- **Cloudflare Pages** — sehr schnell, großzügige Gratisstufe
- Für reine HTML/CSS/JS-Projekte ist GitHub Pages am einfachsten, weil Code und Veröffentlichung am selben Ort liegen.
`,
      quiz: [
        { q: 'Wie muss die Startdatei heißen?', a: ['start.html', 'index.html', 'home.html'], c: 1, why: 'Sonst gibt es 404.' },
        { q: 'Warum ./style.css statt /style.css?', a: ['Weil die Seite in einem Unterordner liegt und absolute Pfade dort nicht greifen', 'Weil es kürzer ist', 'Das ist egal'], c: 0, why: 'Relative Pfade funktionieren lokal und auf Pages.' },
        { q: 'Was gilt bei Dateinamen auf GitHub Pages?', a: ['Groß-/Kleinschreibung ist entscheidend', 'Nur Kleinbuchstaben sind erlaubt', 'Umlaute sind verboten'], c: 0, why: 'Lokal unter Windows klappt es, online nicht — ein häufiger Fehler.' }
      ]
    },
    {
      id: 'ki',
      title: 'Mit KI programmieren lernen',
      mins: 9,
      md: `
KI-Assistenten sind der größte Hebel für Selbstlerner — wenn du sie als Werkzeug und nicht als Ersatz fürs Verstehen benutzt.

### Was gut funktioniert
- **"Erklär mir diesen Code Zeile für Zeile"** — bei fremdem Code unschlagbar
- **"Was bedeutet diese Fehlermeldung?"** plus die komplette Meldung
- **Gerüst erzeugen** — Grundstruktur, die du dann selbst anpasst
- **"Was ist an diesem Code schlecht?"** — findet Sicherheits- und Stilprobleme
- **Übersetzen** zwischen Sprachen: "Dasselbe in Python"

### Wie du gute Antworten bekommst
Schwach: *"Schreib mir eine App"*

Gut:
> *"Schreibe eine einzelne HTML-Datei mit Inline-CSS und JavaScript. Eine Liste von Aufgaben, die in localStorage gespeichert wird. Hinzufügen, Abhaken, Löschen. Für iPhone-Safari optimiert, Mindesthöhe 44px für Knöpfe, deutsche Oberfläche. Erkläre mir danach, was JSON.stringify in Zeile X macht."*

Die drei Zutaten: **Technik festlegen** (eine Datei, kein Framework), **Verhalten beschreiben** (was genau soll passieren), **Erklärung verlangen** (sonst lernst du nichts).

### Was du immer prüfen musst
KI erfindet gelegentlich Funktionen, die es nicht gibt, nutzt veraltete Schreibweisen oder verbaut Sicherheitslücken (\`innerHTML\` mit Nutzereingaben, SQL ohne Platzhalter). Lass dir deshalb erklären, was der Code tut, und probiere ihn in kleinen Stücken aus. **Code, den du nicht verstehst, ist technische Schuld** — spätestens beim ersten Fehler zahlt sie sich.

### Die Lernfalle
Wenn du nur noch "mach mir" sagst, kannst du nach drei Monaten nichts selbst schreiben. Nützliche Reihenfolge:
1. **Selbst versuchen** (15 Minuten)
2. Dann fragen: *"Hier ist mein Versuch. Was fehlt und warum?"*
3. Die Erklärung lesen und die Korrektur **selbst eintippen**, nicht kopieren

Tippen ist langsamer und bleibt dadurch hängen. Das ist kein Mythos, sondern der Unterschied zwischen Lesen und Können.

### Praktisch
- Fehlermeldungen **vollständig** einfügen, inklusive Dateiname und Zeile
- Sagen, was du schon probiert hast — sonst bekommst du dieselben Vorschläge nochmal
- Auf "kleine Schritte" bestehen: eine Funktion auf einmal, nicht 300 Zeilen
- Keine echten Zugangsdaten, Kunden- oder Personendaten in Prompts

> **Faustregel:** KI ist ein sehr geduldiger Kollege, der viel weiß und sich manchmal irrt. Genau so solltest du mit den Antworten umgehen — ernst nehmen, aber nachprüfen.
`,
      quiz: [
        { q: 'Was macht einen guten Prompt aus?', a: ['Technik, gewünschtes Verhalten und die Bitte um Erklärung', 'Möglichst kurz', 'Die Bitte, alles auf einmal zu bauen'], c: 0, why: 'Konkretes rein, konkretes raus.' },
        { q: 'Warum Korrekturen selbst eintippen statt kopieren?', a: ['Kopieren funktioniert nicht', 'Weil Tippen und Verstehen zusammengehören — nur so lernst du es', 'Wegen des Urheberrechts'], c: 1, why: 'Kopierter Code, den du nicht verstehst, wird beim ersten Fehler zum Problem.' },
        { q: 'Was gehört nicht in einen Prompt?', a: ['Fehlermeldungen', 'Echte Zugangsdaten oder Kundendaten', 'Dein eigener Codeversuch'], c: 1, why: 'Zugangsdaten und Personendaten bleiben draußen.' }
      ]
    },
    {
      id: 'projekt',
      title: 'Ein Projekt planen statt drauflos',
      mins: 8,
      md: `
Der Hauptgrund, warum Lernprojekte sterben: Sie sind zu groß gedacht. Hier ist ein Vorgehen, das funktioniert.

### 1. Einen Satz schreiben
> "Eine App, in die ich auf der Baustelle Mängel mit Foto eintrage und am Abend als PDF verschicke."

Passt es nicht in einen Satz, ist es noch kein Projekt, sondern ein Wunsch.

### 2. Die kleinste nützliche Version finden
Frage dich: **Was ist das Minimum, das mir schon hilft?** Beim Beispiel oben: Mängel als Text eintragen und als Liste anzeigen. Kein Foto, kein PDF, keine Anmeldung. Das ist in einem Abend machbar — und ab dann benutzt du es und weißt plötzlich genau, was wirklich fehlt.

### 3. In Aufgaben zerlegen, die unter einer Stunde dauern
- Eingabefeld und Liste anzeigen
- Mangel hinzufügen
- In localStorage speichern
- Mangel löschen
- Foto anhängen
- Als PDF ausgeben

Jede Aufgabe für sich ausprobierbar. Nach jeder erledigten Aufgabe ein \`git commit\`. Dieses Gefühl von Fortschritt ist das, was ein Projekt über Wochen trägt.

### 4. Reihenfolge: Erst Daten, dann Logik, dann Aussehen
Überlege zuerst, **welche Felder** ein Datensatz hat:
\`\`\`js
{ id, datum, ort, beschreibung, gewerk, foto, behoben }
\`\`\`
Fast alle schmerzhaften Umbauten entstehen daraus, dass man am Anfang ein Feld vergessen hat. Zehn Minuten Nachdenken über die Datenstruktur sparen einen halben Tag Umbau.

### 5. Beim ersten Mal hässlich bauen
Funktion zuerst, Design später. Eine funktionierende, hässliche App ist unendlich mehr wert als ein schöner halbfertiger Entwurf. Und: Du gestaltest besser, wenn du schon weißt, wie sich die Bedienung anfühlt.

### Woran Projekte wirklich scheitern
- **Zu groß angefangen** → kleiner schneiden
- **Zu viel Neues gleichzeitig** → eine neue Technik pro Projekt, nicht fünf
- **Keine Benutzung** → bau Dinge, die du selbst brauchst, dann bleibst du dran
- **Perfektionismus** → "läuft" schlägt "perfekt"

> **Guter Rhythmus:** Ein Projekt, das du selbst täglich benutzt, ist der beste Lehrer. Du merkst jede Schwäche sofort und hast immer die nächste sinnvolle Aufgabe vor dir.
`,
      quiz: [
        { q: 'Was ist die kleinste nützliche Version?', a: ['Die Version mit allen geplanten Funktionen', 'Das Minimum, das dir schon hilft und das du benutzen kannst', 'Ein Entwurf auf Papier'], c: 1, why: 'Benutzen zeigt dir besser als jede Planung, was als Nächstes fehlt.' },
        { q: 'Womit fängst du beim Bauen an?', a: ['Mit dem Design', 'Mit der Datenstruktur, dann Logik, dann Aussehen', 'Mit der Anmeldung'], c: 1, why: 'Vergessene Felder sind die teuersten Umbauten.' },
        { q: 'Wie lang sollte eine einzelne Aufgabe sein?', a: ['Unter einer Stunde und für sich ausprobierbar', 'Mindestens ein Tag', 'So lange wie nötig'], c: 0, why: 'Kleine Schritte halten die Motivation hoch.' }
      ]
    },
    {
      id: 'weiterlernen',
      title: 'Routine, die drei Wochen übersteht',
      mins: 7,
      md: `
Wissen ist nicht das Problem — Dranbleiben ist es. Was bei Erwachsenen mit Vollzeitjob tatsächlich funktioniert:

### 20 Minuten täglich schlagen 4 Stunden am Sonntag
Programmieren ist eine motorische Fertigkeit wie Instrumentenspiel. Täglich kurz schlägt selten lang, weil du beim nächsten Mal nicht wieder von vorne einsteigen musst.

### Der Lernkreislauf
1. **Lesen/Ansehen** — höchstens 20 Prozent deiner Zeit
2. **Nachbauen** — Beispiel aus der Lektion abtippen, dann absichtlich kaputt machen und reparieren
3. **Abwandeln** — eine Funktion ergänzen, die nicht in der Anleitung steht
4. **Erklären** — in zwei Sätzen aufschreiben, was du gelernt hast

Schritt 3 ist der wichtigste. Wer nur nachbaut, lernt Abtippen. Wer abwandelt, lernt Programmieren. Und Schritt 4 entlarvt gnadenlos, was du noch nicht verstanden hast.

### Was du übrigens schon kannst
Nach den Grundlagen-Lektionen beherrschst du Variablen, Bedingungen, Schleifen, Funktionen und Datenstrukturen. Damit sind alle Bausteine abgedeckt, aus denen jedes Programm besteht — vom Taschenrechner bis zum Betriebssystem. Alles Weitere sind Bibliotheken, Werkzeuge und Erfahrung.

### Projektideen, die wirklich beim Lernen helfen
- **Checkliste / Mängelliste** — Grundlagen aller Daten-Apps
- **Rechner für deinen Alltag** (Material, Stunden, Fahrtkosten) — Eingaben, Validierung, Formate
- **Fotos sortieren und umbenennen** — Python, Dateien, echter Zeitgewinn
- **Excel-Auswertung automatisieren** — pandas, Berichte
- **Wetter-Kachel für die Tagesplanung** — API, fetch, Fehlerbehandlung
- **Eine Lern-App wie diese** — Daten, Zustand, Oberfläche, Veröffentlichen

### Gute Quellen zum Nachschlagen
- **MDN Web Docs** (developer.mozilla.org) — die Referenz für HTML/CSS/JavaScript, auf Deutsch verfügbar
- **docs.python.org/3/tutorial** — das offizielle Python-Tutorial
- **Apple Developer Documentation** — SwiftUI mit Beispielen
- **Stack Overflow** — deine Frage ist zu 95 Prozent schon beantwortet

### Die Durchhänger
Es kommt der Punkt, an dem drei Stunden auf einen Fehler gehen, der am Ende ein Tippfehler war. Das ist nicht Scheitern, das ist der Beruf. Was hilft: aufstehen, Pause, am nächsten Tag nochmal — Fehler lösen sich nach einer Nacht erstaunlich oft in fünf Minuten.

> **Am Ende zählt nur eins:** Hast du diese Woche etwas gebaut, das vorher nicht existierte? Dann machst du es richtig.
`,
      quiz: [
        { q: 'Was ist wirksamer?', a: ['20 Minuten täglich', '4 Stunden am Sonntag', 'Beides gleich'], c: 0, why: 'Regelmäßigkeit schlägt Dauer — du musst nicht jedes Mal neu einsteigen.' },
        { q: 'Welcher Schritt im Lernkreislauf ist der wichtigste?', a: ['Lesen', 'Abwandeln — eine eigene Änderung einbauen', 'Videos schauen'], c: 1, why: 'Nachbauen lehrt Abtippen, Abwandeln lehrt Programmieren.' },
        { q: 'Was tun, wenn ein Fehler dich stundenlang blockiert?', a: ['Weitermachen bis es klappt', 'Pause machen und am nächsten Tag nochmal — frischer Blick löst es oft in Minuten', 'Das Projekt aufgeben'], c: 1, why: 'Festbeißen ist die unproduktivste Phase überhaupt.' }
      ]
    }
  ]
};
