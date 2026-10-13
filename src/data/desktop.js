export default {
  id: 'desktop',
  title: 'PC-Anwendungen',
  subtitle: 'Python: Skripte, Fenster, Automatisierung, .exe',
  icon: 'desktop',
  color: '#a78bfa',
  blurb: 'Programme für Windows — vom ersten Skript über ein echtes Fenster bis zur fertigen .exe, die du weitergeben kannst. Hier liegt der größte praktische Nutzen im Arbeitsalltag.',
  lessons: [
    {
      id: 'python-start',
      title: 'Python installieren und erstes Skript',
      mins: 8,
      md: `
Python ist die beste Sprache für PC-Werkzeuge: kurze Schreibweise, riesige Auswahl an Zusatzpaketen, läuft auf Windows, Mac und Linux.

### Installation auf Windows
PowerShell öffnen (Windows-Taste, "PowerShell" tippen) und eingeben:
\`\`\`powershell
winget install Python.Python.3.12
\`\`\`
Danach PowerShell **neu starten** und prüfen:
\`\`\`powershell
python --version
\`\`\`
Erscheint eine Versionsnummer, bist du fertig. (Wenn du Python stattdessen von python.org installierst: unbedingt das Häkchen **"Add Python to PATH"** setzen — fehlt es, findet die Kommandozeile Python nicht, der häufigste Startärger.)

### Dein erstes Skript
Datei \`hallo.py\` anlegen:
\`\`\`python
name = "Harry"
meter = 240
preis = 12.5

print(f"Hallo {name}!")
print(f"Material: {meter * preis:.2f} Euro")
\`\`\`
Starten:
\`\`\`powershell
python hallo.py
\`\`\`

### Was anders ist als in JavaScript
- **Keine geschweiften Klammern** — die Einrückung bestimmt die Zugehörigkeit. Vier Leerzeichen sind Standard, und sie sind *verbindlich*: falsche Einrückung ist ein Fehler, kein Schönheitsfehler.
- Kein \`let\`/\`const\`, einfach \`name = "Harry"\`
- \`print()\` statt \`console.log()\`
- f-Strings: \`f"… {variable} …"\` setzt Werte direkt in Text ein, \`:.2f\` rundet auf zwei Stellen
- Kommentare mit \`#\`

\`\`\`python
temperatur = 3

if temperatur < 5:
    print("Frostgefahr")
elif temperatur > 30:
    print("Hitze")
else:
    print("Alles gut")

for abschnitt in ["A1", "A2", "A3"]:
    print(f"Prüfe {abschnitt}")
\`\`\`
Beachte den Doppelpunkt am Ende der Bedingungszeile — ihn zu vergessen ist Fehler Nummer eins bei Python-Anfängern.

### Listen und Dictionaries
\`\`\`python
gewerke = ["Tiefbau", "Elektro"]        # Liste  (= Array)
gewerke.append("Dach")

auftrag = {"ort": "Ulm Nord", "meter": 240}   # Dictionary (= Objekt)
print(auftrag["ort"])                          # Zugriff mit Klammern, nicht Punkt
\`\`\`

### Pakete installieren
Alles, was Python nicht mitbringt, holst du mit \`pip\`:
\`\`\`powershell
pip install openpyxl
\`\`\`
Das ist die eigentliche Stärke: Für fast jede Aufgabe — Excel, PDF, Bilder, E-Mail, Datenbanken — gibt es ein fertiges Paket.
`,
      playground: {
        label: 'Dieselbe Logik in JavaScript (zum Vergleich mit dem Python-Code oben)',
        code: 'const name = "Harry";\nconst meter = 240;\nconst preis = 12.5;\n\nconsole.log("Hallo " + name + "!");\nconsole.log("Material: " + (meter * preis).toFixed(2) + " Euro");\n\n// Python:  print(f"Material: {meter * preis:.2f} Euro")\n// Gleiche Idee, andere Schreibweise.'
      },
      quiz: [
        { q: 'Was ersetzt in Python die geschweiften Klammern?', a: ['Die Einrückung', 'Semikolons', 'Runde Klammern'], c: 0, why: 'Vier Leerzeichen pro Ebene — verbindlich, nicht optional.' },
        { q: 'Was macht f"Hallo {name}"?', a: ['Es erstellt eine Datei', 'Es setzt den Wert von name direkt in den Text ein', 'Es formatiert Zahlen'], c: 1, why: 'f-String. Mit :.2f kannst du zusätzlich runden.' },
        { q: 'Womit installierst du Zusatzpakete?', a: ['npm install', 'pip install', 'winget add'], c: 1, why: 'pip ist Pythons Paketverwaltung.' }
      ]
    },
    {
      id: 'dateien',
      title: 'Dateien lesen und schreiben',
      mins: 8,
      md: `
Hier beginnt der echte Nutzen: Python kann stumpfe Dateiarbeit in Sekunden machen, für die man sonst Stunden klickt.

### Textdatei schreiben und lesen
\`\`\`python
with open("bericht.txt", "w", encoding="utf-8") as f:
    f.write("Baustelle Ulm Nord\\n")
    f.write("240 Meter verlegt\\n")

with open("bericht.txt", "r", encoding="utf-8") as f:
    inhalt = f.read()
print(inhalt)
\`\`\`
\`with\` schließt die Datei automatisch, auch wenn mittendrin ein Fehler auftritt. Nimm es immer. \`encoding="utf-8"\` ist auf Windows wichtig, sonst werden Umlaute zu Kauderwelsch.

Modi: \`"r"\` lesen, \`"w"\` schreiben (**überschreibt alles!**), \`"a"\` anhängen.

### CSV — Tabellen verarbeiten
\`\`\`python
import csv

with open("auftraege.csv", newline="", encoding="utf-8") as f:
    for zeile in csv.DictReader(f, delimiter=";"):
        print(zeile["ort"], zeile["meter"])
\`\`\`
\`DictReader\` gibt dir jede Zeile als Dictionary mit den Spaltennamen als Schlüssel. \`delimiter=";"\` brauchst du bei deutschem Excel, das Semikolons statt Kommas verwendet.

### Ordner durchlaufen
\`\`\`python
from pathlib import Path

ordner = Path(r"C:\\Users\\harry\\Fotos")

for datei in ordner.glob("*.jpg"):
    print(datei.name, round(datei.stat().st_size / 1024), "KB")
\`\`\`
Das \`r\` vor dem Pfad macht einen "Raw-String" — damit musst du Backslashes nicht verdoppeln. Auf Windows ist das Gold wert.

### Beispiel mit echtem Nutzen: Fotos umbenennen
\`\`\`python
from pathlib import Path
from datetime import datetime

ordner = Path(r"C:\\Users\\harry\\Fotos\\Baustelle")

for i, datei in enumerate(sorted(ordner.glob("*.jpg")), start=1):
    datum = datetime.fromtimestamp(datei.stat().st_mtime).strftime("%Y-%m-%d")
    neu = ordner / f"{datum}_Ulm-Nord_{i:03}.jpg"
    datei.rename(neu)
    print("→", neu.name)
\`\`\`
Aus \`IMG_4821.jpg\` wird \`2026-10-13_Ulm-Nord_001.jpg\`. 200 Fotos in unter einer Sekunde.

> **Unbedingt beachten:** Teste Skripte, die Dateien ändern, **immer erst an einer Kopie**. \`rename\` und \`"w"\` fragen nicht nach und haben keinen Papierkorb. Ein guter Trick: erst nur \`print\` statt der echten Aktion — wenn die Ausgabe stimmt, die Zeile scharf stellen.
`,
      quiz: [
        { q: 'Was macht der Modus "w" beim Öffnen?', a: ['Anhängen', 'Schreiben — bestehender Inhalt wird überschrieben', 'Nur lesen'], c: 1, why: 'Zum Anhängen "a" verwenden.' },
        { q: 'Warum with open(...) statt open(...)?', a: ['Es ist kürzer', 'Die Datei wird automatisch geschlossen, auch bei Fehlern', 'Es ist schneller'], c: 1, why: 'Verhindert blockierte oder halb geschriebene Dateien.' },
        { q: 'Was ist bei Skripten, die Dateien umbenennen, die wichtigste Regel?', a: ['Erst an einer Kopie testen, Aktion vorher nur ausgeben', 'Als Administrator ausführen', 'Immer am Wochenende laufen lassen'], c: 0, why: 'Es gibt kein Undo.' }
      ]
    },
    {
      id: 'gui',
      title: 'Ein echtes Fenster bauen (Tkinter)',
      mins: 10,
      md: `
Skripte in der Kommandozeile sind praktisch — aber nicht für Kollegen. Mit Tkinter baust du ein Fenster, und Tkinter ist bei Python **schon dabei**: keine Installation.

\`\`\`python
import tkinter as tk
from tkinter import ttk

fenster = tk.Tk()
fenster.title("Materialrechner")
fenster.geometry("360x220")

ttk.Label(fenster, text="Meter:").pack(pady=(16, 4))
feld_meter = ttk.Entry(fenster)
feld_meter.pack()

ergebnis = ttk.Label(fenster, text="—", font=("Segoe UI", 14, "bold"))
ergebnis.pack(pady=16)

def rechnen():
    try:
        meter = float(feld_meter.get().replace(",", "."))
    except ValueError:
        ergebnis.config(text="Bitte eine Zahl eingeben")
        return
    ergebnis.config(text=f"{meter * 12.5:.2f} Euro")

ttk.Button(fenster, text="Berechnen", command=rechnen).pack()

fenster.mainloop()
\`\`\`

### Die vier Bausteine
1. **Fenster** — \`tk.Tk()\`
2. **Widgets** — \`Label\` (Text), \`Entry\` (Eingabe), \`Button\` (Knopf), \`Treeview\` (Tabelle), \`Combobox\` (Auswahl)
3. **Platzierung** — \`.pack()\` reiht untereinander, \`.grid(row=, column=)\` ordnet im Raster. **Mische die beiden nie im selben Behälter**, sonst verschwindet die Oberfläche.
4. **mainloop()** — die Endlosschleife, die auf Klicks wartet. Danach läuft keine Zeile mehr, deshalb steht sie zuletzt.

### Drei Dinge, die echte Werkzeuge brauchen
\`\`\`python
from tkinter import filedialog, messagebox

pfad = filedialog.askopenfilename(filetypes=[("CSV", "*.csv")])   # Datei wählen
messagebox.showinfo("Fertig", "42 Zeilen verarbeitet")             # Meldung
if messagebox.askyesno("Löschen?", "Wirklich alles löschen?"):     # Rückfrage
    pass
\`\`\`

### Eingaben immer prüfen
\`feld.get()\` liefert **Text**. Die Umwandlung mit \`float()\` in \`try/except\` abzusichern ist kein Luxus: Ohne das stürzt dein Programm ab, sobald jemand ein leeres Feld oder "12,5" mit Komma eingibt. Das \`.replace(",", ".")\` oben fängt genau den deutschen Dezimalkomma-Fall ab.

### Wenn Tkinter nicht reicht
- **PySide6 / Qt** — professionelles Aussehen, Designer-Werkzeug, viel mächtiger, deutlich mehr zu lernen
- **Streamlit** — \`pip install streamlit\`, Oberfläche im Browser, perfekt für Auswertungen
- **Electron / Tauri** — Desktop-Apps aus HTML/CSS/JS (so sind VS Code und Spotify gebaut)

> Für ein Werkzeug, das du selbst und ein paar Kollegen nutzen: Tkinter genügt fast immer und ist in einer Stunde gelernt.
`,
      quiz: [
        { q: 'Was macht fenster.mainloop()?', a: ['Es startet die Endlosschleife, die auf Eingaben wartet', 'Es schließt das Fenster', 'Es lädt die Widgets'], c: 0, why: 'Steht immer am Ende — danach läuft nichts mehr.' },
        { q: 'Was liefert feld.get() zurück?', a: ['Eine Zahl', 'Text — Umwandlung mit float() und try/except nötig', 'Ein Dictionary'], c: 1, why: 'Wie value im Web: immer Text.' },
        { q: 'Darf man pack() und grid() im selben Behälter mischen?', a: ['Ja, beliebig', 'Nein — die Oberfläche bricht dann zusammen', 'Nur bei kleinen Fenstern'], c: 1, why: 'Pro Behälter einen Manager wählen.' }
      ]
    },
    {
      id: 'excel',
      title: 'Excel und Berichte automatisieren',
      mins: 9,
      md: `
Hier zahlt sich Programmieren im Arbeitsalltag am schnellsten aus: Jede Aufgabe, die du monatlich von Hand in Excel klickst, kann ein Skript in Sekunden machen.

### Excel lesen
\`\`\`python
from openpyxl import load_workbook

wb = load_workbook("auftraege.xlsx", data_only=True)
blatt = wb.active

for zeile in blatt.iter_rows(min_row=2, values_only=True):
    ort, meter, fertig = zeile[0], zeile[1], zeile[2]
    print(f"{ort}: {meter} m")
\`\`\`
\`min_row=2\` überspringt die Kopfzeile. \`data_only=True\` gibt dir die **Ergebnisse** von Formeln statt der Formeln selbst — ohne das steht in deiner Variable plötzlich \`"=SUMME(B2:B9)"\`.

### Excel schreiben
\`\`\`python
from openpyxl import Workbook
from openpyxl.styles import Font

wb = Workbook()
b = wb.active
b.title = "Oktober"

b.append(["Ort", "Meter", "Kosten"])
for zelle in b[1]:
    zelle.font = Font(bold=True)

daten = [("Ulm Nord", 240), ("Senden", 310)]
for ort, meter in daten:
    b.append([ort, meter, meter * 12.5])

b.column_dimensions["A"].width = 18
wb.save("bericht.xlsx")
\`\`\`

### Große Datenmengen: pandas
\`\`\`python
import pandas as pd

df = pd.read_excel("auftraege.xlsx")
df["kosten"] = df["meter"] * 12.5

offen = df[df["fertig"] == False]
print(offen[["ort", "meter"]])
print("Summe offen:", offen["kosten"].sum())

df.groupby("ort")["meter"].sum().to_excel("auswertung.xlsx")
\`\`\`
\`pandas\` (\`pip install pandas openpyxl\`) ist Excel als Programmiersprache: Filtern, Gruppieren, Summieren in je einer Zeile. Für Auswertungen über viele Dateien ist es unschlagbar.

### Alle Dateien eines Ordners zusammenfassen
\`\`\`python
import pandas as pd
from pathlib import Path

teile = [pd.read_excel(d) for d in Path("monate").glob("*.xlsx")]
gesamt = pd.concat(teile, ignore_index=True)
gesamt.to_excel("jahr.xlsx", index=False)
\`\`\`
Zwölf Monatsdateien zu einer Jahresdatei — vier Zeilen.

> **Goldene Regel:** Schreibe **nie** in die Originaldatei. Lies \`auftraege.xlsx\`, schreibe \`auftraege_ausgewertet.xlsx\`. Ein Tippfehler in einem Pfad ist sonst ein verlorener Datensatz.

> **Noch ein Hinweis:** Ist die Datei in Excel geöffnet, scheitert das Speichern mit "Permission denied". Erst schließen, dann das Skript starten.
`,
      quiz: [
        { q: 'Was macht data_only=True beim Laden?', a: ['Es lädt schneller', 'Es gibt Formel-Ergebnisse statt der Formeltexte', 'Es sperrt die Datei'], c: 1, why: 'Sonst steht in deiner Variable "=SUMME(...)".' },
        { q: 'Wofür ist pandas gut?', a: ['Für Fenster-Oberflächen', 'Für Filtern, Gruppieren und Auswerten großer Tabellen', 'Für PDF-Dateien'], c: 1, why: 'Excel-Logik als Code, auch über viele Dateien hinweg.' },
        { q: 'Welche Regel gilt beim Verarbeiten von Arbeitsdateien?', a: ['Immer in die Originaldatei schreiben', 'Original nur lesen, Ergebnis in eine neue Datei schreiben', 'Vorher alle Formeln löschen'], c: 1, why: 'Originale bleiben unberührt — die beste Versicherung.' }
      ]
    },
    {
      id: 'exe',
      title: 'Aus dem Skript wird eine .exe',
      mins: 7,
      md: `
Ein Kollege hat kein Python installiert. Mit PyInstaller machst du aus deinem Skript eine Datei, die auf jedem Windows-PC per Doppelklick startet.

\`\`\`powershell
pip install pyinstaller
pyinstaller --onefile --windowed --name Materialrechner rechner.py
\`\`\`

Das Ergebnis liegt in \`dist\\Materialrechner.exe\` — eine einzelne Datei, die du per USB-Stick oder Mail weitergeben kannst.

### Die wichtigsten Schalter
- \`--onefile\` — alles in **eine** .exe packen (statt in einen Ordner mit vielen Dateien)
- \`--windowed\` — kein schwarzes Konsolenfenster. **Nur** für Fenster-Programme; bei Kommandozeilen-Werkzeugen weglassen, sonst siehst du keine Ausgabe
- \`--icon=logo.ico\` — eigenes Symbol (echte .ico-Datei, kein umbenanntes .png)
- \`--add-data "vorlage.xlsx;."\` — zusätzliche Dateien mitnehmen (auf Windows mit Semikolon)

### Was du erwarten musst
- **Größe:** 10–40 MB, mit pandas auch 150 MB+. Der komplette Python-Unterbau steckt mit drin.
- **Startzeit:** 1–3 Sekunden bei \`--onefile\`, weil die .exe sich beim Start selbst entpackt. Ohne \`--onefile\` startet es sofort.
- **Virenwarnung:** Windows Defender oder SmartScreen meldet selbstgebaute .exe-Dateien gern als unbekannt. Das ist normal (fehlende Code-Signatur) und lässt sich nur mit einem kostenpflichtigen Zertifikat endgültig beheben. Für den internen Gebrauch: einmal "Weitere Informationen → Trotzdem ausführen".
- **Plattform:** Eine unter Windows gebaute .exe läuft nur auf Windows. Für Mac musst du auf einem Mac bauen.

### Wenn die .exe nicht startet
Baue testweise **ohne** \`--windowed\`, starte sie aus PowerShell und lies die Fehlermeldung. In 90 Prozent der Fälle ist es eine Datei, die im Projekt daneben lag und nicht mitgepackt wurde (Vorlage, Bild, Konfiguration) — dann hilft \`--add-data\`.

### Dateien finden, die mitgepackt sind
Im eingepackten Zustand liegt alles in einem temporären Ordner. Robust ist dieses Muster:
\`\`\`python
import sys
from pathlib import Path

def resource(name):
    basis = Path(getattr(sys, "_MEIPASS", Path(__file__).parent))
    return basis / name

vorlage = resource("vorlage.xlsx")
\`\`\`
\`sys._MEIPASS\` setzt PyInstaller beim Start — damit funktioniert dein Code sowohl als Skript als auch als .exe.
`,
      quiz: [
        { q: 'Was macht --onefile?', a: ['Es verkleinert die .exe', 'Es packt alles in eine einzelne .exe-Datei', 'Es erzeugt nur eine Verknüpfung'], c: 1, why: 'Bequem zum Weitergeben, dafür etwas langsamerer Start.' },
        { q: 'Wann lässt du --windowed weg?', a: ['Bei Kommandozeilen-Werkzeugen, deren Ausgabe man sehen will', 'Immer', 'Nur bei Spielen'], c: 0, why: 'Bei Konsolenprogrammen brauchst du das Fenster.' },
        { q: 'Die .exe startet nicht. Was ist der erste Schritt?', a: ['Neu installieren', 'Ohne --windowed bauen und die Fehlermeldung in der Konsole lesen', 'Virenscanner deinstallieren'], c: 1, why: 'Meist fehlt eine mitzupackende Datei.' }
      ]
    },
    {
      id: 'cli',
      title: 'Kommandozeilen-Werkzeuge',
      mins: 7,
      md: `
Nicht jedes Werkzeug braucht ein Fenster. Ein Skript mit Parametern ist schnell gebaut, automatisierbar und per Aufgabenplanung zeitgesteuert ausführbar.

\`\`\`python
import argparse

p = argparse.ArgumentParser(description="Rechnet Materialkosten")
p.add_argument("meter", type=float, help="Länge in Meter")
p.add_argument("--preis", type=float, default=12.5, help="Preis pro Meter")
p.add_argument("--brutto", action="store_true", help="mit 19%% MwSt")

args = p.parse_args()

summe = args.meter * args.preis
if args.brutto:
    summe *= 1.19

print(f"{summe:.2f} Euro")
\`\`\`

Aufrufe:
\`\`\`powershell
python kosten.py 240
python kosten.py 240 --preis 14 --brutto
python kosten.py --help
\`\`\`

\`argparse\` erzeugt die \`--help\`-Ausgabe von selbst und meldet fehlende oder falsche Parameter mit verständlicher Fehlermeldung. Selbst in \`sys.argv\` herumzusuchen lohnt sich nicht.

### Fortschritt und Protokoll
\`\`\`python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)s  %(message)s",
    handlers=[logging.FileHandler("lauf.log", encoding="utf-8"),
              logging.StreamHandler()]
)

logging.info("Start")
logging.warning("Datei übersprungen: kaputt.csv")
\`\`\`
Für alles, was unbeaufsichtigt läuft, ist \`logging\` statt \`print\` die richtige Wahl: Du bekommst Zeitstempel, Schweregrade und schreibst gleichzeitig in Datei und Konsole. Wenn der Lauf um 3 Uhr nachts schiefgeht, ist das Protokoll dein einziger Zeuge.

### Zeitgesteuert ausführen (Windows)
Aufgabenplanung öffnen → *Aufgabe erstellen* → Trigger (z. B. täglich 7:00) → Aktion: Programm \`python\`, Argumente \`C:\\Skripte\\bericht.py\`, "Starten in" auf den Skriptordner setzen.

> **Die häufigste Stolperfalle:** Vergisst du "Starten in", läuft das Skript im Systemordner und findet seine Dateien nicht. Deshalb in Skripten immer absolute Pfade oder Pfade relativ zur Skriptdatei verwenden:
> \`\`\`python
> from pathlib import Path
> HIER = Path(__file__).resolve().parent
> daten = HIER / "daten.csv"
> \`\`\`
`,
      quiz: [
        { q: 'Was erledigt argparse für dich?', a: ['Es beschleunigt das Skript', 'Es liest Parameter, erzeugt --help und prüft Eingaben', 'Es baut eine Oberfläche'], c: 1, why: 'Der Standardweg für Kommandozeilen-Parameter.' },
        { q: 'Warum logging statt print bei unbeaufsichtigten Läufen?', a: ['Weil print nicht funktioniert', 'Weil Zeitstempel und Schweregrade in einer Datei landen und nachvollziehbar sind', 'Weil es schneller ist'], c: 1, why: 'Ohne Protokoll weißt du nach einem nächtlichen Fehler nichts.' },
        { q: 'Was macht Path(__file__).resolve().parent?', a: ['Es löscht die Datei', 'Es gibt den Ordner des Skripts — für verlässliche Pfade', 'Es öffnet den Explorer'], c: 1, why: 'Unentbehrlich bei geplanten Aufgaben.' }
      ]
    }
  ]
};
