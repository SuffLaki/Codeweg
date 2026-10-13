export default {
  id: 'mobile',
  title: 'Smartphone-Apps',
  subtitle: 'iPhone & Android: Swift, SwiftUI, React Native',
  icon: 'phone',
  color: '#ff8a4c',
  blurb: 'Welcher Weg führt zu einer echten App auf dem Handy? Hier lernst du die drei Möglichkeiten, die Grundlagen von Swift und SwiftUI und was zwischen fertiger App und App Store passiert.',
  lessons: [
    {
      id: 'wege',
      title: 'Welcher Weg zur Smartphone-App?',
      mins: 8,
      md: `
Es gibt drei realistische Wege. Die Wahl entscheidet über Aufwand, Kosten und was deine App überhaupt kann.

### 1. PWA — Web-App zum Homescreen
- **Du brauchst:** HTML, CSS, JavaScript. Keinen Mac, kein Entwicklerkonto, keine Gebühren.
- **Läuft auf:** iPhone und Android, gleichzeitig.
- **Kann:** Kamera, Standort, Offline, Dateien, Oberfläche wie eine App.
- **Kann nicht:** in den App Store, verlässliche Push-Nachrichten auf iOS, Hintergrundaktivität, tiefe Systemfunktionen (Widgets, Siri, Health).
- **Gut für:** eigene Werkzeuge, Checklisten, Formulare, Firmen-Apps für den eigenen Gebrauch.

### 2. React Native / Expo — eine Codebasis, zwei Systeme
- **Du brauchst:** JavaScript-Kenntnisse. Testen auf dem iPhone geht ohne Mac über die Expo-App; für die Veröffentlichung im App Store brauchst du einen Mac oder einen Cloud-Build.
- **Läuft auf:** iPhone und Android aus einem Projekt.
- **Kann:** fast alles, was native Apps können, inklusive Store-Veröffentlichung und Push.
- **Gut für:** echte Apps für beide Plattformen mit vertretbarem Aufwand.

### 3. Native — Swift/SwiftUI für iPhone, Kotlin für Android
- **Du brauchst:** für iOS einen Mac mit Xcode (gratis), für den Store 99 USD pro Jahr.
- **Kann:** alles — Widgets, Siri, Apple Watch, Kamera-Feinsteuerung, beste Leistung.
- **Nachteil:** zwei getrennte Projekte, wenn du beide Plattformen willst.
- **Gut für:** Apps, die du veröffentlichen willst und die tief ins System greifen.

### Die ehrliche Empfehlung für den Anfang
Fang mit einer **PWA** an. Du hast in einem Abend etwas Benutzbares auf dem Homescreen, lernst dabei HTML/CSS/JavaScript — und diese Kenntnisse nimmst du direkt mit zu React Native. Wenn du später merkst "ich brauche Push und den App Store", wechselst du mit viel Vorwissen.

> **Was oft unterschätzt wird:** Der Weg von "läuft bei mir" zu "liegt im App Store" ist bei nativen Apps aufwändiger als das Programmieren selbst: Zertifikate, Provisioning-Profile, Datenschutzangaben, Screenshots in mehreren Größen, Prüfung durch Apple. Plane dafür Tage, nicht Stunden.
`,
      quiz: [
        { q: 'Was brauchst du für eine PWA auf dem iPhone?', a: ['Einen Mac und 99 USD pro Jahr', 'Nur HTML, CSS, JavaScript und einen Webspace mit HTTPS', 'Xcode'], c: 1, why: 'Darum ist die PWA der schnellste Einstieg.' },
        { q: 'Was ist der Hauptvorteil von React Native?', a: ['Es ist die schnellste Technik überhaupt', 'Eine Codebasis für iPhone und Android, mit Zugang zu nativen Funktionen', 'Es braucht kein JavaScript'], c: 1, why: 'Ein Projekt, zwei Plattformen — und Store-fähig.' },
        { q: 'Wofür ist nativ (Swift/Kotlin) die richtige Wahl?', a: ['Für Widgets, Siri, Apple Watch und maximale Leistung', 'Immer, alles andere ist Spielzeug', 'Nur für Spiele'], c: 0, why: 'Tiefe Systemintegration ist die eigentliche Stärke.' }
      ]
    },
    {
      id: 'swift-basics',
      title: 'Swift-Grundlagen',
      mins: 9,
      md: `
Swift ist Apples Sprache für iPhone, iPad, Mac und Watch. Wenn du die Grundlagen-Kategorie durchhast, erkennst du hier fast alles wieder — nur die Schreibweise ist anders.

\`\`\`swift
var meter = 240          // veränderbar   (wie let in JavaScript)
let steuer = 0.19        // konstant      (wie const)

let ort: String = "Ulm Nord"
let fertig: Bool = false
\`\`\`

> **Achtung, Falle:** \`let\` bedeutet in Swift **konstant**, in JavaScript **veränderbar**. Wer zwischen beiden Sprachen wechselt, stolpert hier regelmäßig.

### Typen sind verbindlich
Swift ist streng typisiert. Eine Zahl und ein Text lassen sich nicht einfach addieren:
\`\`\`swift
let a = 5
let b = "10"
// let c = a + b          // Fehler schon beim Übersetzen!
let c = a + Int(b)!       // ausdrücklich umwandeln
\`\`\`
Das nervt am Anfang und ist später ein Segen: Der klassische \`"5" + 2\`-Fehler aus JavaScript kann dir hier nicht passieren.

### Optionals — das Besondere an Swift
Ein Wert, der fehlen darf, wird mit \`?\` markiert:
\`\`\`swift
var notiz: String? = nil      // darf leer sein

if let text = notiz {
  print("Notiz: \\(text)")     // läuft nur, wenn etwas drin ist
} else {
  print("Keine Notiz")
}
\`\`\`
\`\\(text)\` ist die Swift-Schreibweise, um einen Wert in einen Text einzusetzen (wie \`+ text +\` in JavaScript).

Das Konzept Optional verhindert eine ganze Fehlerklasse: Du *musst* dich um den Fall "nichts da" kümmern, der Compiler lässt dich nicht durch. Das \`!\` erzwingt den Wert und stürzt ab, wenn nichts drin ist — vermeide es, solange du nicht sicher bist.

### Funktionen und Schleifen
\`\`\`swift
func materialKosten(meter: Int, preis: Double) -> Double {
  return Double(meter) * preis
}

let summe = materialKosten(meter: 240, preis: 12.5)

for abschnitt in ["A1", "A2", "A3"] {
  print("Prüfe \\(abschnitt)")
}
\`\`\`
Auffällig: Beim Aufruf schreibt man die Parameternamen mit. Das macht Swift-Code ungewöhnlich gut lesbar — \`materialKosten(meter: 240, preis: 12.5)\` erklärt sich selbst.

### Struct — eigene Datentypen
\`\`\`swift
struct Auftrag {
  let ort: String
  var meter: Int
  var fertig: Bool = false
}

var a = Auftrag(ort: "Ulm Nord", meter: 240)
a.fertig = true
\`\`\`
\`struct\` ist in SwiftUI-Apps das Standardwerkzeug für eigene Datentypen — es entspricht dem Objekt aus der Grundlagen-Kategorie, nur mit festen Feldern und Typen.

### Ausprobieren ohne Mac?
Swift-Code lässt sich auf iPhone/iPad in **Swift Playgrounds** (gratis im App Store) schreiben — damit kannst du die Sprache lernen und sogar einfache Apps bauen. Für richtige Projekte brauchst du Xcode auf einem Mac.
`,
      quiz: [
        { q: 'Was bedeutet let in Swift?', a: ['Veränderbare Variable', 'Konstante — der Wert steht fest', 'Eine Funktion'], c: 1, why: 'Anders als in JavaScript! Veränderbar ist var.' },
        { q: 'Wofür ist ein Optional (String?) gut?', a: ['Für optionale Funktionen', 'Für Werte, die auch fehlen dürfen — der Compiler erzwingt die Behandlung', 'Für mehrere Werte gleichzeitig'], c: 1, why: 'Das verhindert Abstürze durch fehlende Werte.' },
        { q: 'Was ist ein struct?', a: ['Eine Schleife', 'Ein eigener Datentyp mit festen, typisierten Feldern', 'Ein Fenster'], c: 1, why: 'In SwiftUI das Standardwerkzeug für eigene Daten und auch für Views.' }
      ]
    },
    {
      id: 'swiftui',
      title: 'SwiftUI: Oberflächen beschreiben',
      mins: 9,
      md: `
In SwiftUI beschreibst du, **wie die Oberfläche aussehen soll** — nicht, wie man sie Schritt für Schritt aufbaut. Ändern sich die Daten, zeichnet SwiftUI selbst neu. Das ist das *State und Render*-Muster aus der Web-Kategorie, direkt in die Sprache eingebaut.

\`\`\`swift
import SwiftUI

struct StartView: View {
  var body: some View {
    VStack(spacing: 16) {
      Text("Baustelle Ulm Nord")
        .font(.title)
        .bold()

      Text("240 von 400 Meter verlegt")
        .foregroundStyle(.secondary)

      Button("Fortschritt melden") {
        print("gemeldet")
      }
      .buttonStyle(.borderedProminent)
    }
    .padding()
  }
}
\`\`\`

### Die drei Behälter, mit denen du alles baust
- \`VStack\` — untereinander (vertikal)
- \`HStack\` — nebeneinander (horizontal)
- \`ZStack\` — übereinander (gestapelt, z. B. Text auf Bild)

Verschachtelt ergeben sie jedes Layout. Dazu \`Spacer()\` als Platzhalter, der den Rest des Platzes einnimmt.

### Modifier — die Punkt-Kette
\`\`\`swift
Text("Mangel")
  .font(.headline)
  .padding(12)
  .background(.red.opacity(0.1))
  .cornerRadius(10)
\`\`\`
Jeder Modifier gibt eine neue, veränderte View zurück. **Die Reihenfolge zählt:** \`.padding().background()\` färbt auch den Innenabstand, \`.background().padding()\` nicht. Das ist eine der häufigsten Verwirrungen am Anfang.

### Listen
\`\`\`swift
struct Auftrag: Identifiable {
  let id = UUID()
  let ort: String
  let meter: Int
}

struct AuftragsListe: View {
  let auftraege = [
    Auftrag(ort: "Ulm Nord", meter: 240),
    Auftrag(ort: "Senden", meter: 310)
  ]

  var body: some View {
    List(auftraege) { a in
      HStack {
        Text(a.ort)
        Spacer()
        Text("\\(a.meter) m").foregroundStyle(.secondary)
      }
    }
  }
}
\`\`\`
\`Identifiable\` mit einer \`id\` braucht SwiftUI, um Einträge auseinanderzuhalten, wenn sich die Liste ändert. Dasselbe Prinzip wie \`key\` in React.

### Vorschau statt Simulator-Start
\`\`\`swift
#Preview {
  StartView()
}
\`\`\`
Xcode zeigt deine View live neben dem Code — du siehst Änderungen sofort, ohne die App jedes Mal zu starten. Das ist der Grund, warum SwiftUI-Entwicklung so schnell ist.
`,
      quiz: [
        { q: 'Was beschreibt eine SwiftUI-View?', a: ['Die Schritte zum Aufbau der Oberfläche', 'Wie die Oberfläche beim aktuellen Datenstand aussehen soll', 'Nur das Farbschema'], c: 1, why: 'Deklarativ: Du beschreibst das Ziel, SwiftUI zeichnet neu, wenn sich Daten ändern.' },
        { q: 'Wofür ist ein HStack?', a: ['Elemente untereinander', 'Elemente nebeneinander', 'Elemente übereinander'], c: 1, why: 'V = vertikal, H = horizontal, Z = gestapelt.' },
        { q: 'Spielt die Reihenfolge der Modifier eine Rolle?', a: ['Ja, .padding().background() unterscheidet sich von .background().padding()', 'Nein, nie', 'Nur bei Farben'], c: 0, why: 'Jeder Modifier wirkt auf das Ergebnis des vorherigen.' }
      ]
    },
    {
      id: 'state',
      title: 'State: wenn sich die App etwas merkt',
      mins: 8,
      md: `
Eine Oberfläche ohne Zustand ist ein Plakat. Erst \`@State\` macht daraus eine App.

\`\`\`swift
struct Zaehler: View {
  @State private var meter = 240

  var body: some View {
    VStack(spacing: 20) {
      Text("\\(meter) Meter").font(.largeTitle)

      HStack {
        Button("-10") { meter -= 10 }
        Button("+10") { meter += 10 }
      }
      .buttonStyle(.bordered)
    }
  }
}
\`\`\`

Du änderst nur die Variable — SwiftUI merkt die Änderung und zeichnet die betroffenen Teile neu. Du rufst **nie** selbst ein "aktualisiere die Anzeige" auf. Das ist der Kern der ganzen Idee.

### Eingabefelder binden
\`\`\`swift
@State private var ort = ""

TextField("Ort eingeben", text: $ort)
  .textFieldStyle(.roundedBorder)

Text("Eingabe: \\(ort)")
\`\`\`
Das \`$\` erzeugt eine **Bindung**: Das Feld darf die Variable auch *ändern*, nicht nur lesen. Ohne \`$\` bekommst du eine Fehlermeldung — ein typischer Anfängerstolperstein.

### Die vier Zustands-Werkzeuge
- \`@State\` — Zustand, der zu *dieser* View gehört
- \`@Binding\` — eine von außen übergebene, veränderbare Variable (für Unter-Views)
- \`@Observable\` / \`@StateObject\` — größere Datenmodelle, die mehrere Views teilen
- \`@AppStorage\` — Einstellung, die Neustarts übersteht:

\`\`\`swift
@AppStorage("name") var name = "Harry"
\`\`\`
\`@AppStorage\` ist das Swift-Gegenstück zu \`localStorage\` im Web: eine Zeile, und der Wert ist dauerhaft gespeichert.

### Listen verändern
\`\`\`swift
@State private var aufgaben: [String] = []
@State private var neu = ""

func hinzufuegen() {
  guard !neu.isEmpty else { return }
  aufgaben.append(neu)
  neu = ""
}
\`\`\`
\`guard … else { return }\` ist Swifts Art, früh auszusteigen — dasselbe wie das \`if (…) return\` aus der Funktionen-Lektion.

> **Merksatz:** Daten ändern, nicht Oberfläche. Wenn du versucht bist, ein Label direkt zu beschreiben, fehlt dir in Wahrheit eine \`@State\`-Variable.
`,
      quiz: [
        { q: 'Was passiert, wenn du eine @State-Variable änderst?', a: ['Nichts, bis du neu lädst', 'SwiftUI zeichnet die betroffene Oberfläche automatisch neu', 'Die App startet neu'], c: 1, why: 'Du änderst Daten, nicht die Anzeige.' },
        { q: 'Wofür steht das $ bei TextField(text: $ort)?', a: ['Für eine Währung', 'Für eine Bindung — das Feld darf die Variable ändern', 'Für einen Platzhalter'], c: 1, why: 'Ohne $ wäre es nur lesender Zugriff.' },
        { q: 'Was ist @AppStorage?', a: ['Der App Store', 'Ein Wert, der dauerhaft gespeichert wird und Neustarts übersteht', 'Ein Cloud-Speicher'], c: 1, why: 'Das Swift-Gegenstück zu localStorage.' }
      ]
    },
    {
      id: 'react-native',
      title: 'React Native & Expo: eine App für beide Systeme',
      mins: 9,
      md: `
React Native nimmt deine JavaScript-Kenntnisse und baut daraus eine **echte** App — keine Webseite im Rahmen, sondern native Bedienelemente. Expo ist das Werkzeugpaket darum, das den Einstieg erst erträglich macht.

### Loslegen
\`\`\`bash
npx create-expo-app@latest meine-app
cd meine-app
npx expo start
\`\`\`
Es erscheint ein QR-Code. Den scannst du mit der **Expo Go**-App auf dem iPhone — und deine App läuft auf dem Gerät. Ohne Mac, ohne Xcode, ohne Entwicklerkonto. Jede Dateiänderung ist sofort auf dem Handy sichtbar.

### So sieht eine Komponente aus
\`\`\`jsx
import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList } from 'react-native';

export default function App() {
  const [aufgaben, setAufgaben] = useState([]);
  const [neu, setNeu] = useState('');

  function hinzufuegen() {
    if (!neu.trim()) return;
    setAufgaben([...aufgaben, { id: Date.now().toString(), text: neu }]);
    setNeu('');
  }

  return (
    <View style={{ padding: 20, paddingTop: 60, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Checkliste</Text>

      <TextInput
        value={neu}
        onChangeText={setNeu}
        placeholder="Neue Aufgabe"
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}
      />

      <Pressable onPress={hinzufuegen}>
        <Text>Hinzufügen</Text>
      </Pressable>

      <FlatList
        data={aufgaben}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </View>
  );
}
\`\`\`

### Was anders ist als im Web
- Kein \`<div>\`, sondern \`<View>\`; kein \`<p>\`, sondern \`<Text>\`. **Jeder** Text muss in \`<Text>\` stehen.
- Kein CSS, sondern Style-Objekte in JavaScript (\`fontWeight: '700'\` statt \`font-weight: 700\`).
- Layout läuft immer über Flexbox — und die Standardrichtung ist \`column\`, nicht \`row\`.
- \`<FlatList>\` statt einer Schleife: sie zeichnet nur die sichtbaren Zeilen und bleibt deshalb auch bei 10.000 Einträgen flüssig.

### useState — React in einem Satz
\`const [wert, setWert] = useState(start)\` gibt dir den aktuellen Wert und eine Funktion zum Setzen. Du rufst \`setWert(...)\` auf, React zeichnet neu. Wieder dasselbe Muster wie \`@State\` in SwiftUI und wie deine Checkliste aus der Web-Kategorie — drei Welten, ein Prinzip.

> **Wichtig:** Ändere den Zustand nie direkt (\`aufgaben.push(...)\`), sondern immer mit einer **neuen** Liste (\`setAufgaben([...aufgaben, neu])\`). React erkennt Änderungen daran, dass sich das Objekt austauscht — ohne das zeichnet es nicht neu.

### Vom Projekt zur installierbaren App
\`\`\`bash
npx eas build --platform ios
\`\`\`
Expo baut die App in der Cloud (du brauchst keinen Mac). Für die Installation auf fremden Geräten oder den Store brauchst du dann aber ein Apple-Entwicklerkonto.
`,
      quiz: [
        { q: 'Wie testest du eine Expo-App auf dem iPhone ohne Mac?', a: ['Per TestFlight', 'QR-Code mit der Expo-Go-App scannen', 'Das geht nicht'], c: 1, why: 'Expo Go lädt dein Projekt direkt auf das Gerät.' },
        { q: 'Welches Element ersetzt <div> in React Native?', a: ['<View>', '<Box>', '<Frame>'], c: 0, why: 'View für Behälter, Text für jeden Text.' },
        { q: 'Warum nicht aufgaben.push(neu) im State?', a: ['push ist langsam', 'React erkennt die Änderung nur, wenn eine neue Liste gesetzt wird', 'push gibt es in React Native nicht'], c: 1, why: 'Immer setAufgaben([...aufgaben, neu]).' }
      ]
    },
    {
      id: 'store',
      title: 'Vom Projekt in den App Store',
      mins: 8,
      md: `
Die App läuft bei dir — jetzt kommt der Teil, den niemand erwähnt. Hier ist der realistische Ablauf für iOS.

### 1. Entwicklerkonto
99 USD pro Jahr (Apple Developer Program). Ohne das kannst du deine App nur 7 Tage auf deinem eigenen Gerät laufen lassen. Für Firmen-interne Verteilung gibt es eigene Programme.

### 2. Bundle Identifier festlegen
Etwas eindeutiges wie \`de.harry.checkliste\`. Das ist der dauerhafte Name deiner App im Apple-System — später nur noch mit Neuanlage änderbar.

### 3. Zertifikate und Profile
Apple will beweisen können, dass die App von dir kommt. Xcode erledigt das heute größtenteils automatisch ("Automatically manage signing"). Wenn es doch hakt, geht es fast immer um abgelaufene Zertifikate oder ein Gerät, das nicht im Profil steht.

### 4. TestFlight — der wichtigste Schritt
Lade den Build hoch und verteile ihn über **TestFlight** an dich selbst und ein paar Testpersonen. Vorteile: Installation per Einladungslink, keine Kabel, echte Geräte, Rückmeldungen und Absturzberichte inklusive. Für interne Firmen-Apps reicht TestFlight oft völlig aus — bis 100 interne Tester ohne Prüfung durch Apple.

### 5. Store-Eintrag vorbereiten
- Name, Untertitel, Beschreibung, Schlagworte
- Screenshots in den geforderten Größen (mindestens iPhone 6,7")
- Datenschutz-Angaben: Was sammelt die App? Diese Angaben sind verbindlich.
- Datenschutzerklärung als erreichbare URL — auch wenn du *nichts* sammelst
- Altersfreigabe, Kategorie, Support-Kontakt

### 6. Prüfung durch Apple
Dauert typischerweise 1–3 Tage. Häufige Ablehnungsgründe:
- App stürzt beim Prüfen ab oder braucht ein Login ohne Testzugang
- Zu wenig Funktion ("nur eine Webseite im Rahmen" wird abgelehnt)
- Datenschutz-Angaben passen nicht zum Verhalten der App
- Fehlender Löschen-Knopf für Konten, wenn man sich registrieren kann

### Android zum Vergleich
Google Play: 25 USD **einmalig**, Prüfung meist schneller, aber inzwischen auch mit Testanforderungen für neue Entwicklerkonten. Dafür kannst du eine \`.apk\` auch komplett ohne Store verteilen — auf iOS ist das nicht möglich.

> **Praxis-Tipp:** Wenn die App nur für dich oder dein Team ist, spare dir den Store. Eine PWA kostet nichts, ist in Minuten verteilt (Link schicken) und du musst keine Prüfung bestehen. Den Store brauchst du erst, wenn Fremde deine App finden sollen.
`,
      quiz: [
        { q: 'Was kostet das Apple-Entwicklerprogramm?', a: ['Kostenlos', '99 USD pro Jahr', '25 USD einmalig'], c: 1, why: '25 USD einmalig ist Google Play.' },
        { q: 'Wofür ist TestFlight?', a: ['Zum Programmieren', 'Zum Verteilen von Testversionen an echte Geräte', 'Zum Bauen der App'], c: 1, why: 'Für interne Apps reicht das oft schon ganz ohne Store-Veröffentlichung.' },
        { q: 'Welcher Ablehnungsgrund ist häufig?', a: ['Zu viele Funktionen', 'Absturz bei der Prüfung oder Login ohne Testzugang', 'Zu kleine Dateigröße'], c: 1, why: 'Immer einen Testzugang mitliefern und vorher auf einem echten Gerät prüfen.' }
      ]
    }
  ]
};
