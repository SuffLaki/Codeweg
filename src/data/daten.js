export default {
  id: 'daten',
  title: 'Daten & APIs',
  subtitle: 'JSON, Schnittstellen, Datenbanken, Sicherheit',
  icon: 'database',
  color: '#f0b429',
  blurb: 'Fast jede App holt, prüft oder speichert Daten. Diese Kategorie erklärt die Formate und Schnittstellen, mit denen Programme untereinander reden — und wie man dabei keine Schlüssel verliert.',
  lessons: [
    {
      id: 'json',
      title: 'JSON — die Sprache zwischen Programmen',
      mins: 7,
      md: `
JSON ist das Format, in dem sich Programme Daten schicken. Es sieht aus wie ein JavaScript-Objekt und ist reiner Text — deshalb kann es jede Sprache lesen.

\`\`\`json
{
  "auftrag": "2026-114",
  "ort": "Ulm Nord",
  "meter": 240,
  "fertig": false,
  "abschnitte": ["A1", "A2"],
  "bauleiter": { "name": "Harry", "telefon": "0731-123" },
  "notiz": null
}
\`\`\`

### Die Regeln (streng!)
- Schlüssel **immer in doppelten Anführungszeichen**
- Erlaubte Werte: Text, Zahl, \`true\`/\`false\`, \`null\`, Objekt \`{}\`, Liste \`[]\`
- **Kein Komma** nach dem letzten Eintrag
- Keine Kommentare, keine einfachen Anführungszeichen, keine Funktionen

Genau diese Strenge ist der Grund, warum JSON überall funktioniert — und warum ein einzelnes überzähliges Komma die ganze Datei unlesbar macht. Zum Prüfen taugt jeder "JSON Validator" im Netz.

### Umwandeln
JavaScript:
\`\`\`js
const text = JSON.stringify(objekt);   // Objekt → Text
const obj  = JSON.parse(text);         // Text → Objekt
\`\`\`
Python:
\`\`\`python
import json

text = json.dumps(objekt, ensure_ascii=False, indent=2)
obj  = json.loads(text)

with open("daten.json", "w", encoding="utf-8") as f:
    json.dump(objekt, f, ensure_ascii=False, indent=2)
\`\`\`
\`ensure_ascii=False\` erhält Umlaute lesbar, \`indent=2\` macht die Datei für Menschen lesbar.

### Verschachtelte Daten lesen
\`\`\`js
const daten = JSON.parse(text);
console.log(daten.bauleiter.name);        // "Harry"
console.log(daten.abschnitte[0]);         // "A1"
console.log(daten.bauleiter?.email);      // undefined, aber kein Absturz
\`\`\`
Das \`?.\` (Optional Chaining) ist beim Arbeiten mit fremden Daten sehr nützlich: Fehlt \`bauleiter\` ganz, bekommst du \`undefined\` statt eines Fehlers.

> **Praxisregel:** Fremde Daten sind nie so, wie die Dokumentation behauptet. Felder fehlen, Zahlen kommen als Text, Listen sind manchmal leer. Prüfe, was du bekommst, bevor du damit rechnest.
`,
      playground: {
        label: 'JSON lesen, prüfen und auswerten',
        code: 'const text = \'{"ort":"Ulm Nord","meter":"240","abschnitte":["A1","A2"]}\';\nconst d = JSON.parse(text);\n\nconsole.log("Ort:", d.ort);\nconsole.log("meter ist ein", typeof d.meter, "— also umwandeln!");\nconsole.log("Kosten:", Number(d.meter) * 12.5);\nconsole.log("Abschnitte:", d.abschnitte.length);\nconsole.log("Fehlendes Feld:", d.bauleiter?.name ?? "nicht angegeben");'
      },
      quiz: [
        { q: 'Wie müssen Schlüssel in JSON geschrieben werden?', a: ['In doppelten Anführungszeichen', 'Ohne Anführungszeichen', 'In einfachen Anführungszeichen'], c: 0, why: 'JSON ist hier strenger als JavaScript.' },
        { q: 'Was ist in JSON nicht erlaubt?', a: ['Listen', 'Kommentare und ein Komma nach dem letzten Eintrag', 'Zahlen'], c: 1, why: 'Beides macht die Datei ungültig.' },
        { q: 'Was macht daten.bauleiter?.email, wenn bauleiter fehlt?', a: ['Es stürzt ab', 'Es ergibt undefined', 'Es legt das Feld an'], c: 1, why: 'Optional Chaining schützt beim Lesen fremder Daten.' }
      ]
    },
    {
      id: 'apis',
      title: 'APIs: Daten aus dem Internet holen',
      mins: 9,
      md: `
Eine API ist eine Adresse, die statt einer Webseite **Daten** zurückgibt — meistens JSON. Damit holst du Wetter, Adressen, Wechselkurse oder sprichst mit einer KI.

\`\`\`js
async function wetterHolen() {
  const url = "https://api.open-meteo.com/v1/forecast"
            + "?latitude=48.4&longitude=9.99&current=temperature_2m";

  const antwort = await fetch(url);

  if (!antwort.ok) {
    console.log("Fehler:", antwort.status);
    return;
  }

  const daten = await antwort.json();
  console.log("Ulm:", daten.current.temperature_2m, "Grad");
}

wetterHolen();
\`\`\`

### async und await
Netzwerkabfragen brauchen Zeit. \`await\` heißt "warte hier auf das Ergebnis, aber blockiere nicht die ganze App". Jede Funktion mit \`await\` darin muss \`async\` sein. Das ist die ganze Regel.

Vergisst du \`await\`, bekommst du statt der Daten ein "Promise" — ein Versprechen auf später. Das ist der häufigste Fehler beim Einstieg in Netzwerkcode.

### Statuscodes, die du kennen solltest
- **200** alles gut · **201** angelegt
- **400** deine Anfrage war fehlerhaft · **401** nicht angemeldet · **403** verboten · **404** nicht gefunden
- **429** zu viele Anfragen (Limit!) · **500** Fehler beim Server

Wichtig: \`fetch\` wirft bei 404 oder 500 **keinen** Fehler. Du musst \`antwort.ok\` selbst prüfen — sonst versuchst du, eine Fehlerseite als JSON zu lesen.

### Daten senden (POST)
\`\`\`js
const antwort = await fetch("https://example.com/api/meldungen", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ort: "Ulm Nord", meter: 240 })
});
\`\`\`
\`GET\` holt, \`POST\` legt an, \`PUT\`/\`PATCH\` ändert, \`DELETE\` löscht. Diese vier reichen für fast alles.

### Mit Netz programmieren
\`\`\`js
try {
  const antwort = await fetch(url);
  if (!antwort.ok) throw new Error("Status " + antwort.status);
  const daten = await antwort.json();
  // … verwenden
} catch (fehler) {
  console.log("Abruf fehlgeschlagen:", fehler.message);
  // Hier gehört die Rückfallebene hin: alte Daten zeigen, Hinweis einblenden
}
\`\`\`
Unterwegs auf der Baustelle ist "kein Netz" der Normalfall, nicht die Ausnahme. Eine gute App zeigt dann gespeicherte Daten plus Hinweis — statt einer leeren Seite.

### Dasselbe in Python
\`\`\`python
import requests

r = requests.get("https://api.open-meteo.com/v1/forecast",
                 params={"latitude": 48.4, "longitude": 9.99,
                         "current": "temperature_2m"},
                 timeout=10)
r.raise_for_status()
print(r.json()["current"]["temperature_2m"])
\`\`\`
Setze **immer** ein \`timeout\` — sonst hängt dein Skript im Zweifelsfall für immer.

> **CORS:** Ruft eine Webseite eine fremde API direkt auf, blockiert der Browser das oft ("CORS-Fehler"). Das ist Absicht und kein Bug in deinem Code. Lösungen: eine API nutzen, die es erlaubt (wie open-meteo oben), oder die Abfrage über einen eigenen kleinen Server leiten.
`,
      quiz: [
        { q: 'Was bedeutet await?', a: ['Warte auf das Ergebnis, ohne die App zu blockieren', 'Wiederhole die Anfrage', 'Brich ab'], c: 0, why: 'Und die umgebende Funktion muss async sein.' },
        { q: 'Wirft fetch bei Status 404 einen Fehler?', a: ['Ja, immer', 'Nein — du musst antwort.ok selbst prüfen', 'Nur bei POST'], c: 1, why: 'fetch scheitert nur, wenn gar keine Verbindung zustande kommt.' },
        { q: 'Was bedeutet Status 429?', a: ['Nicht gefunden', 'Zu viele Anfragen — Limit erreicht', 'Serverfehler'], c: 1, why: 'Dann langsamer abfragen oder Ergebnisse zwischenspeichern.' }
      ]
    },
    {
      id: 'datenbank',
      title: 'Datenbanken-Grundlagen (SQLite)',
      mins: 9,
      md: `
Sobald Daten wachsen oder mehrere Programme darauf zugreifen, reicht eine Datei nicht mehr. SQLite ist die einfachste Datenbank: **eine Datei**, kein Server, in Python schon eingebaut.

### Tabelle anlegen
\`\`\`python
import sqlite3

con = sqlite3.connect("baustellen.db")
cur = con.cursor()

cur.execute("""
  CREATE TABLE IF NOT EXISTS auftraege (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    ort     TEXT NOT NULL,
    meter   INTEGER,
    fertig  INTEGER DEFAULT 0,
    angelegt TEXT DEFAULT CURRENT_TIMESTAMP
  )
""")
con.commit()
\`\`\`

Eine Tabelle ist ein Blatt in Excel: Spalten mit festen Typen, Zeilen als Datensätze. \`PRIMARY KEY\` ist die eindeutige Nummer jeder Zeile.

### Die vier Befehle (CRUD)
\`\`\`python
# Anlegen
cur.execute("INSERT INTO auftraege (ort, meter) VALUES (?, ?)",
            ("Ulm Nord", 240))

# Lesen
for zeile in cur.execute("SELECT ort, meter FROM auftraege WHERE fertig = 0"):
    print(zeile)

# Ändern
cur.execute("UPDATE auftraege SET fertig = 1 WHERE id = ?", (3,))

# Löschen
cur.execute("DELETE FROM auftraege WHERE id = ?", (7,))

con.commit()     # ohne commit ist nichts dauerhaft gespeichert!
\`\`\`

### Die wichtigste Sicherheitsregel
**Niemals** Werte in den SQL-Text kleben:
\`\`\`python
# GEFÄHRLICH:
cur.execute(f"SELECT * FROM auftraege WHERE ort = '{eingabe}'")

# RICHTIG:
cur.execute("SELECT * FROM auftraege WHERE ort = ?", (eingabe,))
\`\`\`
Gibt jemand als Ort \`' OR 1=1 --\` ein, liefert die erste Variante die ganze Tabelle aus — bei \`DELETE\` ist sie leer danach. Das heißt **SQL-Injection** und ist seit Jahrzehnten eine der häufigsten Sicherheitslücken überhaupt. Die Fragezeichen-Schreibweise verhindert sie vollständig.

### Nützliches SQL
\`\`\`sql
SELECT ort, SUM(meter) AS gesamt
FROM auftraege
WHERE fertig = 1
GROUP BY ort
ORDER BY gesamt DESC
LIMIT 10;
\`\`\`
\`WHERE\` filtert, \`GROUP BY\` fasst zusammen, \`ORDER BY\` sortiert, \`LIMIT\` begrenzt. Mit diesen vier kommst du erstaunlich weit — es ist dieselbe Denkweise wie \`filter\` und \`reduce\`, nur in Datenbanksprache.

### Wann was?
- **Textdatei / JSON** — Einstellungen, wenige Datensätze
- **SQLite** — bis Millionen Zeilen, ein Programm oder ein PC; perfekt für Desktop-Werkzeuge
- **PostgreSQL / MySQL** — viele Nutzer gleichzeitig über das Netz
- **Firebase / Supabase** — fertige Cloud-Datenbank mit Anmeldung, gut für Apps mit mehreren Geräten

> **Backup:** Eine SQLite-Datenbank ist eine Datei — kopieren genügt. Mach das, bevor du Skripte mit \`UPDATE\` oder \`DELETE\` ausprobierst.
`,
      quiz: [
        { q: 'Warum Fragezeichen-Platzhalter statt Werte im SQL-Text?', a: ['Es ist kürzer', 'Es verhindert SQL-Injection', 'Es ist schneller'], c: 1, why: 'Die wichtigste Sicherheitsregel bei Datenbanken.' },
        { q: 'Was passiert ohne con.commit()?', a: ['Die Änderungen sind nicht dauerhaft gespeichert', 'Die Datenbank wird gelöscht', 'Nichts, commit ist optional'], c: 0, why: 'Erst commit schreibt die Änderungen fest.' },
        { q: 'Wann ist SQLite die richtige Wahl?', a: ['Für tausende gleichzeitige Nutzer im Netz', 'Für ein Programm oder einen PC, bis zu sehr großen Datenmengen', 'Nur für Testdaten'], c: 1, why: 'Für Mehrbenutzerbetrieb über das Netz nimmt man PostgreSQL.' }
      ]
    },
    {
      id: 'formulare',
      title: 'Eingaben prüfen (Validierung)',
      mins: 7,
      md: `
Jede Eingabe von außen ist erst mal falsch. Leer, mit Komma statt Punkt, 500 Zeichen lang, oder absichtlich bösartig. Prüfen ist kein Misstrauen, sondern Handwerk.

### Im Browser: HTML prüft kostenlos mit
\`\`\`html
<form id="f">
  <input name="ort" required minlength="3" maxlength="60">
  <input name="meter" type="number" min="0" max="10000" step="0.1" required>
  <input name="mail" type="email">
  <button type="submit">Speichern</button>
</form>
\`\`\`
\`required\`, \`min\`, \`max\`, \`type="email"\` — der Browser zeigt die Meldungen selbst an, in der Sprache des Geräts. Das ist die billigste Validierung, die es gibt.

Nebeneffekt auf dem iPhone: \`type="number"\` zeigt die Zifferntastatur, \`type="email"\` die mit \`@\`, \`type="tel"\` das Ziffernblock-Layout. Das macht Formulare auf dem Handy deutlich angenehmer.

### Zusätzlich im Code prüfen
\`\`\`js
function pruefen(werte) {
  const fehler = [];

  if (!werte.ort || werte.ort.trim().length < 3) {
    fehler.push("Ort muss mindestens 3 Zeichen haben");
  }

  const meter = Number(String(werte.meter).replace(",", "."));
  if (!Number.isFinite(meter) || meter <= 0) {
    fehler.push("Meter muss eine Zahl größer 0 sein");
  }

  return { ok: fehler.length === 0, fehler, meter };
}
\`\`\`
\`trim()\` entfernt Leerzeichen am Rand — ohne das ist \`"   "\` eine gültige Eingabe. \`replace(",", ".")\` fängt das deutsche Dezimalkomma ab, über das sonst jede zweite Eingabe stolpert.

### Die eiserne Regel
**Prüfung im Browser ist Bequemlichkeit, nicht Sicherheit.** Wer will, schickt Daten direkt an deinen Server und umgeht jedes HTML-Attribut. Deshalb: Was wichtig ist, wird **auf dem Server erneut geprüft**. Immer.

### Gute Fehlermeldungen
- Schlecht: "Ungültige Eingabe"
- Gut: "Meter muss eine Zahl größer 0 sein — eingegeben war: abc"

Nenne das **Feld**, die **Regel** und wenn möglich den **Weg zur Lösung**. Und zeige die Meldung am Feld, nicht nur oben als Sammelmeldung.

> **Barrierefreiheit kostet zwei Zeilen:** Jedes Feld braucht ein \`<label for="…">\`, und Fehlermeldungen verknüpft man mit \`aria-describedby\`. Dann liest VoiceOver sie vor — und auf dem iPhone ist genau das der Unterschied zwischen benutzbar und frustrierend.
`,
      quiz: [
        { q: 'Reicht Validierung im Browser aus?', a: ['Ja, HTML prüft zuverlässig', 'Nein — sie ist Bequemlichkeit; Wichtiges muss der Server erneut prüfen', 'Nur bei Zahlen'], c: 1, why: 'Jede Prüfung im Browser lässt sich umgehen.' },
        { q: 'Was macht trim()?', a: ['Es kürzt auf 10 Zeichen', 'Es entfernt Leerzeichen am Anfang und Ende', 'Es wandelt in Kleinbuchstaben'], c: 1, why: 'Sonst gilt eine Eingabe aus Leerzeichen als gültig.' },
        { q: 'Welchen Vorteil hat type="number" auf dem iPhone?', a: ['Es zeigt die Zifferntastatur', 'Es rechnet automatisch', 'Es speichert schneller'], c: 0, why: 'Der Eingabetyp steuert die passende Tastatur.' }
      ]
    },
    {
      id: 'sicherheit',
      title: 'Schlüssel und Sicherheit',
      mins: 8,
      md: `
Ein Fehler, der echten Schaden macht: API-Schlüssel im Code. Diese Lektion ist kurz, aber die wichtigste der Kategorie.

### Was passiert, wenn ein Schlüssel öffentlich wird
Pushst du einen Schlüssel nach GitHub, finden automatische Scanner ihn **innerhalb von Minuten**. Bei Cloud-Zugängen bedeutet das fremde Rechenleistung auf deine Rechnung. Rechnungen über mehrere tausend Euro aus einer Nacht sind dokumentiert.

### Die Regeln
1. **Niemals** Schlüssel in Code, der nach GitHub geht.
2. Lokal in eine Datei \`.env\` legen und diese in \`.gitignore\` eintragen:
\`\`\`
.env
config.json
*.db
\`\`\`
3. Eine \`.env.example\` **ohne** echte Werte mit einchecken, damit andere wissen, welche Einträge es gibt.
4. Ist ein Schlüssel doch mal öffentlich geworden: **sofort beim Anbieter zurückziehen und neu erstellen.** Ihn aus dem Code zu löschen genügt nicht — die Git-Historie behält ihn.

### In Python lesen
\`\`\`python
import os
from dotenv import load_dotenv      # pip install python-dotenv

load_dotenv()
schluessel = os.getenv("API_KEY")

if not schluessel:
    raise SystemExit("API_KEY fehlt — bitte .env anlegen")
\`\`\`

### Und im Browser?
Hier gilt etwas Unbequemes: **Im Browser gibt es kein Geheimnis.** Alles, was dein JavaScript kennt, kann jeder Besucher über die Entwicklertools lesen. Auch "versteckt" in einer Variable oder im Service Worker.

Zwei saubere Wege:
- **Nutzer gibt seinen eigenen Schlüssel ein** und du legst ihn in \`localStorage\` — dann ist es *sein* Schlüssel auf *seinem* Gerät. So macht es diese Lern-App übrigens an keiner Stelle, weil sie gar keine fremden Dienste braucht.
- **Eigener kleiner Server** als Zwischenstelle: Die App ruft deinen Server, der kennt den Schlüssel und spricht mit dem Dienst.

### Passwörter
Speichere **nie** Passwörter im Klartext — auch nicht verschlüsselt, sondern als **Hash** (bcrypt oder argon2). Besser noch: baue keine eigene Anmeldung, sondern nutze "Mit Apple/Google anmelden" oder einen Dienst wie Auth0 oder Supabase. Anmeldung richtig zu bauen ist überraschend schwer und ein schlechter Ort für Lernexperimente.

### Kurze Checkliste vor jedem Veröffentlichen
- Keine Schlüssel, Passwörter, Zugangsdaten im Code
- \`.gitignore\` enthält \`.env\`, Datenbanken, private Konfigurationen
- Keine echten Personen- oder Kundendaten in Testdateien
- Datenbankabfragen mit Platzhaltern statt zusammengeklebten Texten
- Abhängigkeiten aktuell (\`pip list --outdated\`, \`npm outdated\`)

> **Merksatz:** Alles, was im Browser läuft, ist öffentlich. Alles, was einmal nach GitHub gepusht wurde, bleibt in der Historie.
`,
      quiz: [
        { q: 'Wie lange dauert es, bis ein auf GitHub veröffentlichter Schlüssel gefunden wird?', a: ['Wochen', 'Minuten — automatische Scanner suchen danach', 'Nie, wenn das Repo privat war'], c: 1, why: 'Deshalb sofort zurückziehen und neu erstellen.' },
        { q: 'Kann man einen API-Schlüssel sicher in einer Browser-App verstecken?', a: ['Ja, in einer Variable', 'Nein — alles im Browser ist einsehbar', 'Ja, im Service Worker'], c: 1, why: 'Entweder der Nutzer bringt seinen eigenen Schlüssel mit, oder ein eigener Server übernimmt.' },
        { q: 'Wie speichert man Passwörter?', a: ['Im Klartext', 'Als Hash mit bcrypt oder argon2 — oder besser gar nicht selbst', 'In einer Excel-Datei'], c: 1, why: 'Fremde Anmeldedienste sind für eigene Projekte fast immer die bessere Wahl.' }
      ]
    }
  ]
};
