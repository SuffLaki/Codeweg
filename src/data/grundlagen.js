export default {
  id: 'grundlagen',
  title: 'Grundlagen',
  subtitle: 'Die Bausteine, die in jeder Sprache gleich sind',
  icon: 'blocks',
  color: '#4f8cff',
  blurb: 'Hier fängst du an. Diese sieben Lektionen erklären, wie ein Programm denkt — ohne Vorwissen, mit Beispielen, die du direkt ausprobieren kannst.',
  lessons: [
    {
      id: 'was-ist-programmieren',
      title: 'Was Programmieren wirklich ist',
      mins: 6,
      md: `
Ein Programm ist eine **Liste von Anweisungen**, die ein Computer von oben nach unten abarbeitet. Nicht mehr. Der Computer denkt nicht mit, er rät nicht, er fragt nicht nach — er macht genau das, was dasteht.

### Das Rezept-Bild
Stell dir ein Kochrezept vor: "Wasser aufsetzen. Warten bis es kocht. Nudeln hinein. 8 Minuten warten. Abgießen." Ein Programm ist genauso aufgebaut, nur mit drei Zusätzen:

- Es kann sich Dinge **merken** (Variablen)
- Es kann **entscheiden** ("wenn das Wasser kocht, dann …")
- Es kann **wiederholen** ("für jede Portion …")

Diese drei Dinge plus Funktionen sind 90 Prozent vom Programmieren. Alles andere sind Werkzeuge und Gewohnheiten.

### Dein erstes Programm
\`\`\`js
let name = "Harry";
console.log("Hallo " + name + ", los geht's!");
\`\`\`

Zeile 1 merkt sich einen Text unter dem Namen \`name\`. Zeile 2 gibt etwas aus. \`console.log\` ist die Ausgabe — der Zettel, auf dem das Programm dir etwas mitteilt.

> **Wichtig:** Tippfehler in Anführungszeichen oder Klammern sind der häufigste Grund, warum bei Anfängern nichts passiert. Das ist normal und passiert Profis jeden Tag.

### Welche Sprache?
Es gibt hunderte Programmiersprachen, aber sie unterscheiden sich weniger, als man denkt. Wer eine kann, lernt die zweite in Tagen. In diesem Kurs lernst du die Grundlagen in **JavaScript** (läuft direkt in diesem Browser, auch auf dem iPhone), später **Python** für PC-Programme und **Swift** für iPhone-Apps.
`,
      playground: {
        label: 'Ändere den Namen und drücke auf Ausführen',
        code: 'let name = "Harry";\nlet beruf = "Bauleiter";\nconsole.log("Hallo " + name + "!");\nconsole.log("Du bist " + beruf + " und lernst jetzt programmieren.");'
      },
      quiz: [
        { q: 'In welcher Reihenfolge arbeitet ein Programm seine Zeilen ab?', a: ['Von oben nach unten', 'Nach Wichtigkeit', 'Alle gleichzeitig'], c: 0, why: 'Zeile für Zeile von oben nach unten — außer du sagst ihm mit Entscheidungen oder Schleifen etwas anderes.' },
        { q: 'Was macht console.log?', a: ['Es speichert Daten dauerhaft', 'Es gibt etwas aus, damit du siehst was passiert', 'Es startet das Programm'], c: 1, why: 'console.log ist deine wichtigste Hilfe beim Lernen und beim Fehlersuchen.' },
        { q: 'Welche drei Fähigkeiten machen aus einer Anweisungsliste ein Programm?', a: ['Merken, entscheiden, wiederholen', 'Rechnen, zeichnen, drucken', 'Laden, speichern, senden'], c: 0, why: 'Variablen, Bedingungen, Schleifen — der Kern jeder Sprache.' }
      ]
    },
    {
      id: 'variablen',
      title: 'Variablen und Datentypen',
      mins: 8,
      md: `
Eine Variable ist eine **Schublade mit Namensschild**. Du legst etwas hinein und holst es später über den Namen wieder heraus.

\`\`\`js
let baustelle = "Ulm Nord";   // Text
let laenge = 240;             // Zahl
let abgenommen = false;       // Ja/Nein
\`\`\`

### let und const
- \`let\` — der Inhalt darf sich später ändern
- \`const\` — der Inhalt steht fest (Konstante)

\`\`\`js
const mehrwertsteuer = 0.19;  // ändert sich nicht
let summe = 1000;
summe = summe + 500;          // erlaubt, weil let
\`\`\`

Nimm standardmäßig \`const\`. Nur wenn du merkst "das muss sich ändern", nimm \`let\`. Das macht Programme berechenbarer.

### Die vier Datentypen für den Anfang
- **Text (String)** — \`"Rohr DN 110"\`, für Namen und Beschreibungen
- **Zahl (Number)** — \`240\` oder \`1.75\`, für Mengen, Preise, Längen
- **Wahrheitswert (Boolean)** — \`true\` / \`false\`, für Häkchen und Schalter
- **Liste (Array)** — \`["Mo","Di","Mi"]\`, für mehrere Dinge

### Der klassische Anfängerfehler
\`\`\`js
let a = "5";
let b = 2;
console.log(a + b);   // "52" — nicht 7!
\`\`\`

\`"5"\` ist Text, nicht Zahl. Text plus Zahl klebt zusammen. \`Number(a) + b\` ergibt 7. Genau dieser Fehler steckt hinter unzähligen falschen Summen in echten Programmen — besonders bei Werten aus Eingabefeldern, denn die sind **immer** Text.

> **Merksatz:** Variablennamen sollen sagen, *was drin ist*. \`l\` ist schlecht, \`laengeInMeter\` ist gut. Dein Programm liest später niemand öfter als du selbst.
`,
      playground: {
        label: 'Rechne mit Variablen — lass mal das Number() weg',
        code: 'const preisProMeter = 12.5;\nlet meter = 240;\nlet summe = preisProMeter * meter;\nconsole.log("Material: " + summe + " Euro");\n\nlet eingabe = "100";\nconsole.log("Falsch: " + (eingabe + 5));\nconsole.log("Richtig: " + (Number(eingabe) + 5));'
      },
      quiz: [
        { q: 'Wann nimmst du const?', a: ['Immer wenn sich der Wert nicht ändern soll', 'Nur für Zahlen', 'Nie, let ist moderner'], c: 0, why: 'const ist die Standardwahl; let nur wenn der Wert sich wirklich ändert.' },
        { q: 'Was ergibt "5" + 2 in JavaScript?', a: ['7', '"52"', 'Fehler'], c: 1, why: 'Text + Zahl wird aneinandergeklebt. Mit Number("5") + 2 bekommst du 7.' },
        { q: 'Welcher Variablenname ist gut?', a: ['x1', 'laengeInMeter', 'var2'], c: 1, why: 'Sprechende Namen sind die billigste Form von Dokumentation.' }
      ]
    },
    {
      id: 'entscheidungen',
      title: 'Entscheidungen treffen (if / else)',
      mins: 7,
      md: `
Programme werden erst nützlich, wenn sie reagieren. Das Werkzeug dafür heißt \`if\`.

\`\`\`js
let temperatur = 3;

if (temperatur < 5) {
  console.log("Frostgefahr — kein Beton gießen.");
} else {
  console.log("Betonieren möglich.");
}
\`\`\`

In den runden Klammern steht eine **Frage, die nur ja oder nein als Antwort hat**. Ist die Antwort ja (\`true\`), läuft der Block in den geschweiften Klammern.

### Vergleiche
- \`===\` ist gleich, \`!==\` ist ungleich
- \`<\` \`>\` \`<=\` \`>=\` kleiner, größer
- \`&&\` und — beide Bedingungen müssen stimmen
- \`||\` oder — eine reicht
- \`!\` nicht — dreht die Antwort um

\`\`\`js
if (temperatur > 5 && trocken === true) {
  console.log("Perfekte Bedingungen.");
}
\`\`\`

### Mehrere Fälle
\`\`\`js
if (fortschritt === 100) {
  status = "fertig";
} else if (fortschritt > 0) {
  status = "läuft";
} else {
  status = "offen";
}
\`\`\`

Der Computer prüft von oben nach unten und nimmt den **ersten** Fall, der passt. Deshalb muss der engste Fall oben stehen.

> **Falle:** Es gibt \`==\` und \`===\`. \`"5" == 5\` ist \`true\` (JavaScript wandelt heimlich um), \`"5" === 5\` ist \`false\`. Nimm immer drei Gleichheitszeichen. Ein einzelnes \`=\` ist übrigens kein Vergleich, sondern eine Zuweisung.
`,
      playground: {
        label: 'Spiele mit den Werten oben und schau, welcher Zweig läuft',
        code: 'let temperatur = 3;\nlet regen = false;\n\nif (temperatur < 5) {\n  console.log("Frostgefahr — kein Beton.");\n} else if (regen) {\n  console.log("Zu nass.");\n} else {\n  console.log("Betonieren möglich.");\n}'
      },
      quiz: [
        { q: 'Was steht in den runden Klammern eines if?', a: ['Ein Text', 'Eine Bedingung, die true oder false ergibt', 'Ein Variablenname'], c: 1, why: 'Alles, was zu true oder false ausgewertet werden kann.' },
        { q: 'Welcher Vergleich ist der sichere?', a: ['==', '===', '='], c: 1, why: '=== vergleicht ohne heimliche Typumwandlung. Ein einzelnes = ist eine Zuweisung.' },
        { q: 'Was bedeutet &&?', a: ['oder', 'und — beide Bedingungen müssen stimmen', 'nicht'], c: 1, why: '&& = und, || = oder, ! = nicht.' }
      ]
    },
    {
      id: 'schleifen',
      title: 'Wiederholen (Schleifen)',
      mins: 8,
      md: `
Computer sind unschlagbar bei stumpfer Wiederholung. Dafür gibt es Schleifen.

### for — wenn du weißt, wie oft
\`\`\`js
for (let i = 1; i <= 5; i++) {
  console.log("Runde " + i);
}
\`\`\`

Drei Teile in der Klammer: Startwert, Bedingung zum Weitermachen, Schritt am Ende jeder Runde. \`i++\` heißt "i um 1 erhöhen".

### for…of — durch eine Liste laufen
Das brauchst du in der Praxis am häufigsten:
\`\`\`js
const abschnitte = ["A1", "A2", "A3"];

for (const abschnitt of abschnitte) {
  console.log("Prüfe Abschnitt " + abschnitt);
}
\`\`\`

### while — solange etwas gilt
\`\`\`js
let restmeter = 100;
while (restmeter > 0) {
  restmeter = restmeter - 25;
  console.log("Noch " + restmeter + " m");
}
\`\`\`

> **Achtung Endlosschleife:** Wird die Bedingung bei \`while\` nie falsch, läuft dein Programm für immer und die App friert ein. Frag dich bei jeder while-Schleife: *welche Zeile bringt mich dem Ende näher?*

### Summieren — das Standardmuster
\`\`\`js
const mengen = [12, 40, 7, 25];
let summe = 0;
for (const m of mengen) {
  summe = summe + m;
}
console.log("Gesamt: " + summe);  // 84
\`\`\`

Dieses Muster — leerer Behälter **vor** der Schleife, füllen **in** der Schleife — brauchst du immer wieder: Summen bilden, Listen filtern, Berichte aufbauen.
`,
      playground: {
        label: 'Berechne Summe, größten Wert und Durchschnitt',
        code: 'const mengen = [12, 40, 7, 25];\nlet summe = 0;\nlet groesster = 0;\n\nfor (const m of mengen) {\n  summe = summe + m;\n  if (m > groesster) {\n    groesster = m;\n  }\n}\n\nconsole.log("Summe: " + summe);\nconsole.log("Größter Posten: " + groesster);\nconsole.log("Durchschnitt: " + (summe / mengen.length));'
      },
      quiz: [
        { q: 'Welche Schleife nimmst du, um jedes Element einer Liste anzufassen?', a: ['while', 'for…of', 'if'], c: 1, why: 'for…of ist dafür gemacht und am besten lesbar.' },
        { q: 'Was ist eine Endlosschleife?', a: ['Eine Schleife, deren Bedingung nie falsch wird', 'Eine Schleife mit mehr als 100 Runden', 'Eine Schleife ohne Variablen'], c: 0, why: 'Sie blockiert das Programm. Immer prüfen: was bringt die Bedingung zum Kippen?' },
        { q: 'Warum setzt man summe = 0 VOR die Schleife?', a: ['Aus Höflichkeit', 'Damit der Behälter existiert und nicht in jeder Runde geleert wird', 'Das ist egal'], c: 1, why: 'Innen würde die Summe in jeder Runde zurückgesetzt — ein echter Klassiker unter den Fehlern.' }
      ]
    },
    {
      id: 'funktionen',
      title: 'Funktionen — Arbeit zum Wiederverwenden',
      mins: 8,
      md: `
Eine Funktion ist ein **benannter Arbeitsschritt**, den du beliebig oft aufrufen kannst. Sie nimmt etwas rein (Parameter) und gibt etwas zurück (\`return\`).

\`\`\`js
function bruttoPreis(netto) {
  return netto * 1.19;
}

console.log(bruttoPreis(1000));   // 1190
console.log(bruttoPreis(250));    // 297.5
\`\`\`

Du schreibst die Regel **einmal** und nutzt sie überall. Ändert sich der Steuersatz, änderst du eine Zeile statt zwanzig.

### Mehrere Parameter
\`\`\`js
function materialKosten(meter, preisProMeter) {
  const summe = meter * preisProMeter;
  return Math.round(summe * 100) / 100;   // auf 2 Stellen runden
}

console.log(materialKosten(240, 12.5));   // 3000
\`\`\`

### return beendet die Funktion
Alles nach einem ausgeführten \`return\` passiert nicht mehr. Das nutzt man gern für Prüfungen am Anfang:
\`\`\`js
function rabatt(summe) {
  if (summe <= 0) return 0;              // früh raus
  if (summe > 10000) return summe * 0.1;
  return summe * 0.03;
}
\`\`\`

### Kurzform (Arrow Function)
In modernem JavaScript siehst du oft:
\`\`\`js
const verdoppeln = (x) => x * 2;
\`\`\`
Das ist dasselbe wie \`function verdoppeln(x) { return x * 2; }\` — nur kürzer.

> **Regel aus der Praxis:** Eine Funktion sollte *eine* Sache tun und einen Namen haben, der genau diese Sache beschreibt. Wenn du beim Benennen "und" sagen musst (\`speichereUndDrucke\`), sind es zwei Funktionen.
`,
      playground: {
        label: 'Schreibe eine eigene Funktion und rufe sie auf',
        code: 'function materialKosten(meter, preisProMeter) {\n  return Math.round(meter * preisProMeter * 100) / 100;\n}\n\nfunction mitSteuer(netto) {\n  return Math.round(netto * 1.19 * 100) / 100;\n}\n\nconst netto = materialKosten(240, 12.5);\nconsole.log("Netto: " + netto + " Euro");\nconsole.log("Brutto: " + mitSteuer(netto) + " Euro");'
      },
      quiz: [
        { q: 'Was macht return?', a: ['Es gibt einen Wert zurück und beendet die Funktion', 'Es gibt Text auf dem Bildschirm aus', 'Es wiederholt die Funktion'], c: 0, why: 'Ausgeben ist console.log, zurückgeben ist return — ein oft verwechseltes Paar.' },
        { q: 'Warum packt man Code in Funktionen?', a: ['Damit er kürzer aussieht', 'Um ihn wiederzuverwenden und an einer Stelle ändern zu können', 'Weil der Computer sonst langsam ist'], c: 1, why: 'Eine Regel, eine Stelle. Das ist der Hauptgrund.' },
        { q: 'Wie viele Aufgaben sollte eine gute Funktion haben?', a: ['Eine', 'Zwei bis drei', 'So viele wie möglich'], c: 0, why: 'Eine Aufgabe, ein klarer Name.' }
      ]
    },
    {
      id: 'listen-objekte',
      title: 'Listen und Objekte',
      mins: 9,
      md: `
Bisher hatte jede Variable einen Wert. Echte Daten sind aber Mengen von Dingen mit Eigenschaften — dafür gibt es Arrays und Objekte.

### Array — eine geordnete Liste
\`\`\`js
const gewerke = ["Tiefbau", "Elektro", "Sanitär"];

console.log(gewerke.length);    // 3
console.log(gewerke[0]);        // "Tiefbau"  (Zählung beginnt bei 0!)
gewerke.push("Dach");           // hinten anfügen
\`\`\`

### Objekt — ein Ding mit Eigenschaften
\`\`\`js
const auftrag = {
  nummer: "2026-114",
  ort: "Ulm Nord",
  meter: 240,
  abgenommen: false
};

console.log(auftrag.ort);        // "Ulm Nord"
auftrag.abgenommen = true;       // Eigenschaft ändern
\`\`\`

### Die Kombination: Liste von Objekten
So sehen fast alle echten Daten aus — jede Zeile einer Tabelle ist ein Objekt:
\`\`\`js
const auftraege = [
  { ort: "Ulm Nord", meter: 240, fertig: true },
  { ort: "Neu-Ulm", meter: 80, fertig: false },
  { ort: "Senden", meter: 310, fertig: false }
];

for (const a of auftraege) {
  console.log(a.ort + ": " + a.meter + " m");
}
\`\`\`

### Drei Werkzeuge, die dir viel Schleifenarbeit sparen
\`\`\`js
const offen = auftraege.filter(a => a.fertig === false);   // aussortieren
const orte  = auftraege.map(a => a.ort);                   // umformen
const summe = auftraege.reduce((s, a) => s + a.meter, 0);  // zusammenrechnen
\`\`\`

\`filter\`, \`map\` und \`reduce\` sind drei der nützlichsten Befehle überhaupt. Du musst sie nicht auswendig können — aber wissen, dass es sie gibt.

> **Merksatz:** Array = Reihenfolge, Zugriff über Position. Objekt = Eigenschaften, Zugriff über Namen. Liste von Objekten = eine Tabelle.
`,
      playground: {
        label: 'Filtere, zähle und summiere eine Liste von Aufträgen',
        code: 'const auftraege = [\n  { ort: "Ulm Nord", meter: 240, fertig: true },\n  { ort: "Neu-Ulm", meter: 80, fertig: false },\n  { ort: "Senden", meter: 310, fertig: false }\n];\n\nconst offen = auftraege.filter(a => !a.fertig);\nconsole.log("Offen: " + offen.length);\n\nfor (const a of offen) {\n  console.log("- " + a.ort + " (" + a.meter + " m)");\n}\n\nconst summe = auftraege.reduce((s, a) => s + a.meter, 0);\nconsole.log("Gesamtlänge: " + summe + " m");'
      },
      quiz: [
        { q: 'Welchen Index hat das erste Element eines Arrays?', a: ['1', '0', '-1'], c: 1, why: 'Programmierer zählen ab 0. liste[0] ist das erste Element.' },
        { q: 'Wie greifst du auf die Eigenschaft ort des Objekts auftrag zu?', a: ['auftrag.ort', 'auftrag-ort', 'ort(auftrag)'], c: 0, why: 'Mit dem Punkt. Alternativ auftrag["ort"] mit Anführungszeichen.' },
        { q: 'Was macht filter?', a: ['Es sortiert eine Liste', 'Es gibt eine neue Liste nur mit den passenden Elementen zurück', 'Es löscht Elemente aus der Liste'], c: 1, why: 'filter ändert das Original nicht, es liefert eine neue, kürzere Liste.' }
      ]
    },
    {
      id: 'debugging',
      title: 'Fehler finden statt raten',
      mins: 7,
      md: `
Fehler sind kein Zeichen von Unfähigkeit, sondern der Normalzustand. Profis unterscheiden sich von Anfängern vor allem darin, **wie systematisch** sie suchen.

### Die drei Fehlerarten
1. **Tippfehler (Syntaxfehler)** — fehlende Klammer, falsches Anführungszeichen. Das Programm startet gar nicht; die Meldung nennt meist die Zeile.
2. **Laufzeitfehler** — es startet und bricht mittendrin ab, z. B. "undefined is not a function". Meist greifst du auf etwas zu, das es (noch) nicht gibt.
3. **Denkfehler** — alles läuft, aber das Ergebnis ist falsch. Die gefährlichste Sorte, weil niemand warnt.

### Die wichtigste Technik: ausgeben
\`\`\`js
function rabatt(summe) {
  console.log("rabatt() bekommt:", summe, typeof summe);
  const ergebnis = summe * 0.03;
  console.log("gibt zurück:", ergebnis);
  return ergebnis;
}
\`\`\`

\`typeof\` sagt dir, *welcher Typ* drin ist. Überraschend oft ist die Antwort "string", wo du eine Zahl erwartet hast — und schon ist der Denkfehler gefunden.

### Lies die Fehlermeldung wirklich
Sie besteht fast immer aus: *was* ist passiert, *wo* (Datei und Zeile) und *wie es dorthin kam*. Die ersten zwei Zeilen reichen in 9 von 10 Fällen. Kopiere sie in eine Suchmaschine oder einen KI-Chat — du bist nie der Erste mit diesem Fehler.

### Halbieren
Funktioniert etwas nicht, kommentiere die Hälfte aus. Läuft es jetzt? Dann steckt der Fehler in der auskommentierten Hälfte. Wieder halbieren. Nach wenigen Schritten bist du bei der Zeile. Das klingt stumpf, ist aber schneller als Starren.

> **Haltung:** "Es geht nicht" ist keine Fehlerbeschreibung. "Ich erwarte X, ich bekomme Y, hier ist die Meldung" ist eine — und löst das Problem oft schon beim Formulieren.
`,
      playground: {
        label: 'Dieser Code hat einen Denkfehler. Schau in die Ausgabe',
        code: 'const eingaben = ["10", "20", "30"];\nlet summe = 0;\n\nfor (const e of eingaben) {\n  console.log("Verarbeite:", e, typeof e);\n  summe = summe + e;\n}\n\nconsole.log("Ergebnis:", summe);\nconsole.log("Richtig wäre:", eingaben.reduce((s, e) => s + Number(e), 0));'
      },
      quiz: [
        { q: 'Welche Fehlerart ist am gefährlichsten?', a: ['Tippfehler', 'Laufzeitfehler', 'Denkfehler — das Programm läuft, rechnet aber falsch'], c: 2, why: 'Weil keine Meldung kommt. Deshalb Ergebnisse immer gegenprüfen.' },
        { q: 'Was verrät dir typeof?', a: ['Den Wert einer Variable', 'Den Datentyp einer Variable', 'Die Zeilennummer'], c: 1, why: 'typeof x gibt z. B. "string" oder "number" — damit findest du Typverwechslungen sofort.' },
        { q: 'Was ist die Halbierungs-Methode?', a: ['Die Hälfte des Codes löschen und neu schreiben', 'Hälfte auskommentieren, prüfen, weiter halbieren bis die Fehlerzeile gefunden ist', 'Das Programm halb so oft starten'], c: 1, why: 'Systematisches Eingrenzen schlägt Raten.' }
      ]
    }
  ]
};
