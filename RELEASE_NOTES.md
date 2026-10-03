<div align="center">

# 📱 **Simon-Calcolatrice** 🔢

### *App Android per il calcolo rapido, offline e senza pubblicità*

---

</div>

## 📌 **Panoramica**

**Simon-Calcolatrice** è un'app Android nativa, costruita con **Capacitor**, che racchiude una calcolatrice scientifica e standard in un'unica schermata adattiva a qualsiasi telefono.

L'app funziona **completamente offline**: nessuna connessione internet richiesta, nessun account, nessun dato raccolto. Tutto viene elaborato sul dispositivo.

La stessa applicazione è disponibile anche nel browser su **https://simon-calcolatrice.simonepagliari44.workers.dev/**, con la stessa identica interfaccia.

---

## ✨ **Caratteristiche**

* 🔢 **Due modalità:** *Normale* con 20 tasti e *Avanzata* con 29 tasti, che aggiunge `√`, `x²`, `x³`, `xʸ`, `1/x`, `sin`, `cos`, `tan` e `π`.
* 🌍 **35 lingue:** l'interfaccia si imposta da sola sulla lingua del dispositivo (italiano, inglese, spagnolo, francese, tedesco, russo, cinese, giapponese, arabo e altre).
* 🗂️ **Cronologia persistente:** ogni calcolo viene salvato nei **dati dell'app** con il plugin nativo *Capacitor Preferences* (non nella cache del browser), si può riaprire un calcolo con un tocco, cancellare una voce o svuotare tutto con conferma.
* ➗ **Segno e percentuale:** supporto completo a `±`, `%`, `AC` e `⌫` con anteprima del risultato in tempo reale.
* 🎨 **Icona adattiva:** generata da `icon.svg` in adaptive icon, versione tonda e layer monocromatico per le icone tematizzate di Android 13+. L'artefatto sta dentro la *safe zone*, quindi **non viene mai tagliato** dalle maschere circolari, quadrate o a ritratto dei vari launcher.
* 🚀 **Splash nativo:** l'icona dell'app su sfondo `#F9F9FF` all'avvio, senza splash in HTML e senza doppia immagine.
* 👆 **Comportamento nativo:** l'alone blu di tocco del WebView è stato rimosso e sostituito da un'animazione di pressione con scala elastica e ripple che parte dal punto toccato, come sulle app native.
* 📴 **Usabile offline:** interfaccia in un unico file HTML, nessuna dipendenza esterna, nessuna richiesta di rete.
* 🔒 **Privacy totale:** nessun dato lascia il telefono, nessuna pubblicità, nessun permesso di scrittura.

---

## 📲 **Compatibilità**

| | |
|---|---|
| **Android** | 6.0 (Marshmallow) e successivi |
| **Versione minima** | API 23 |
| **Target SDK** | API 35 (Android 15) |
| **Package** | `com.simonecompany.simoncalcolatrice` |
| **Architettura** | universale (arm, arm64, x86, x86_64) |

✅ Testato su dispositivo reale Android 8.0 (Samsung Galaxy A32, 720×1280).

---

## 📥 **Installazione**

1. Scarica il file APK da questa release.
2. Copialo sul telefono e aprilo.
3. Premi **Installa** e apri **Simon-Calcolatrice**.

> Se Android blocca l'installazione, attiva **fonti sconosciute** per l'app che stai usando per aprire il file.

In alternativa puoi installare l'APK da PC con il debug USB attivo:

```bash
cd App/android
./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔐 **Permessi richiesti**

| Permesso | Quando | A cosa serve |
|---|---|---|
| `INTERNET` | sempre | Non richiesto: l'app funziona offline, serve solo al WebView interno |

Nessun permesso di archiviazione, contatti, posizione o microfono: la cronologia resta nei dati privati dell'app e non viene mai esportata.

---

## 🧑‍💻 **Sviluppo**

```bash
cd App
npm install          # installa le dipendenze
npm run icons        # genera icone e splash da icon.svg
npm run sync         # copia gli asset web e sincronizza Capacitor
npm run apk          # compila l'APK di debug
npm run apk:release  # compila l'APK di release
```

Il sorgente web è in `App/index.html`, la versione pronta per il web è in `Sito Web/index.html`, il plugin nativo che salva la cronologia è `@capacitor/preferences` e le icone sono generate da `App/tools/generate-icons.mjs`.

---

## 🐛 **Bug noti**

* Nessuno segnalato al momento della pubblicazione.

---

<div align="center">

### ⭐ Se l'app ti è utile, lascia una stella ⭐

</div>
