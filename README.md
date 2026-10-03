<div align="center">

# 📱 **Simon-Calcolatrice** 🔢

### *Soluzione Web & Mobile per il Calcolo Veloce e Affidabile*

---

</div>

## 📌 **Panoramica del Progetto**

Il progetto **Simon-Calcolatrice** nasce con l'obiettivo di offrire un'esperienza utente fluida, moderna ed efficiente sia come **applicazione web** sia come **applicazione mobile Android nativa**.

| | |
|---|---|
| **🌐 Versione web** | https://simon-calcolatrice.simonepagliari44.workers.dev/ |
| **📲 Versione Android** | `com.simonecompany.simoncalcolatrice` |
| **🔢 Nucleo applicativo** | un unico file HTML, senza framework e senza dipendenze esterne |

La stessa base di codice alimenta le due piattaforme: nel browser viene servita come pagina statica, su Android viene impacchettata in un'app nativa con **Capacitor** (icona adattiva, splash nativo e storage nei dati dell'app). La struttura dell'architettura è progettata per garantire elevate prestazioni, scalabilità e una perfetta sincronizzazione dei dati tra tutte le piattaforme supportate.

---

## ✨ **Caratteristiche Principali**

* 🌐 **Architettura Multi-Piattaforma:** un'unica logica applicativa, ottimizzata sia per la fruizione via browser web sia per l'utilizzo su dispositivi mobili Android.
* 🎨 **Interfaccia Utente Moderna:** design reattivo, pulito e intuitivo, focalizzato sulla facilità d'uso e sull'accessibilità, con feedback di pressione e ripple in stile Material.
* ⚡ **Prestazioni Elevate:** nessun framework, nessuna richiesta di rete, caricamento istantaneo e funzionamento completo offline su qualsiasi schermo.
* 🔄 **Dati Persistenti:** la cronologia viene salvata nei **dati dell'app** tramite il plugin nativo *Capacitor Preferences* su Android e in `localStorage` sul web, con modifica, cancellazione singola e cancellazione totale con conferma.
* 🔢 **Motore di Calcolo Custom:** parsing ed evaluation delle espressioni scritti a mano, nessuna libreria esterna, con due modalità operative: *Normale* da 20 tasti e *Avanzata* da 35 tasti, con `√`, `x²`, `x³`, `xʸ`, `1/x`, `sin`, `cos`, `tan`, `π` e parentesi tonde, quadre e graffe.
* 🌍 **Multilingua:** l'interfaccia si adatta automaticamente alla lingua del dispositivo tra **35 lingue** supportate.

---

## 📁 **Struttura del Progetto**

```
Simon-Calcolatrice/
├── App/                        # progetto Android (Capacitor)
│   ├── index.html              # sorgente unico dell'applicazione
│   ├── icon.svg                # icona vettoriale originale
│   ├── capacitor.config.json   # appId, appName, webDir
│   ├── package.json            # dipendenze e script di build
│   ├── js/                     # runtime Capacitor vendorizzato (generato)
│   ├── tools/
│   │   ├── generate-icons.mjs  # icone + splash da icon.svg
│   │   ├── prepare-web.mjs     # copia gli asset in www/
│   │   └── build-web.mjs       # genera la versione web in "Sito Web/"
│   ├── www/                    # web asset impacchettati (generato)
│   └── android/                # progetto Android nativo (Gradle)
│       └── app/src/main/
│           ├── java/…/MainActivity.java
│           └── res/            # icone adattive, monocroma, splash
└── Sito Web/
    └── index.html              # versione web autonoma (file singolo)
```

> `App/js/` e `App/www/` sono generati: non modificarli a mano. Il sorgente unico è `App/index.html`; con `npm run sync` si aggiorna `App/www/` (per l'app Android), con `npm run site` si aggiorna `Sito Web/index.html` (per il web).

---

## 🌐 **Versione Web**

Pubblicata su Cloudflare Workers, raggiungibile da ogni dispositivo senza installazione:

**https://simon-calcolatrice.simonepagliari44.workers.dev/**

La versione web è un **file HTML autonomo** (favicon SVG incorporata, nessuno script esterno, nessuna richiesta di rete): si può aprire anche in locale con doppio clic su `Sito Web/index.html`.

Come sull'app, anche sul web l'alone di tocco del browser è disattivato e i tasti rispondono con un'animazione di pressione con ripple, pinch-zoom e selezione del testo sono bloccati. La cronologia resta nella **cache del browser** (`localStorage`) con la stessa chiave dell'app, quindi non viene persa chiudendo la scheda.

---

## 📲 **Versione Android**

App nativa costruita con **Capacitor 7** che racchiude la stessa interfaccia in un WebView Android:

* **Icona adattiva** generata da `icon.svg` (adaptive icon + versione tonda + layer monocromatico per le icone tematizzate di Android 13+), con l'artefatto dentro la *safe zone* per non essere mai tagliato da maschere circolari, quadrate o a ritratto.
* **Splash nativo** con l'icona dell'app su sfondo `#F9F9FF`, senza splash in HTML.
* **Comportamento nativo:** alone di tocco del WebView disattivato, animazione di pressione con ripple, pinch-zoom e selezione del testo bloccati.
* **Cronologia nei dati dell'app** (`shared_prefs`), non nella cache del browser: sopravvive alla chiusura dell'app.

L'APK di debug si compila con `npm run apk`, l'output è in `App/android/app/build/outputs/apk/debug/`.

---

## 🧑‍💻 **Sviluppo**

```bash
cd App
npm install          # installa le dipendenze
npm run icons        # genera icone adattive e splash da icon.svg
npm run site         # rigenera "Sito Web/index.html" dal sorgente App
npm run sync         # copia gli asset web e sincronizza Capacitor
npm run apk          # compila l'APK di debug
npm run apk:release  # compila l'APK di release
npm run open         # apre il progetto in Android Studio
```

---

<div align="center">

### ⭐ Se il progetto ti è utile, lascia una stella ⭐

</div>

