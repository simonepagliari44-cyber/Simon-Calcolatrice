import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "..", "Sito Web", "index.html");

const SPLASH_BG = "#f9f9ff";

const svg = readFileSync(join(root, "icon.svg"), "utf8");
const favicon = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

let html = readFileSync(join(root, "index.html"), "utf8");

/* Anti-inflazione dei caratteri su Android: i tasti non si ingrandiscono in ritardo. */
html = html.replace("<style>\n    :root", `<style>\n    html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }\n    :root`);

/* La versione web è un file singolo: via gli script del runtime Capacitor... */
html = html
  .replace(/^[ \t]*<script src="js\/[^"]+"><\/script>\n/gm, "")
  /* ...e la favicon SVG diventa un data URI. */
  .replace(
    '<link rel="icon" type="image/svg+xml" href="icon.svg">',
    `<link rel="icon" type="image/svg+xml" href="${favicon}">\n  <meta name="theme-color" content="${SPLASH_BG}">\n  <meta name="mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-title" content="Simon-Calcolatrice">\n  <meta name="apple-mobile-web-app-status-bar-style" content="default">`
  );

if (/<script src=/.test(html)) throw new Error("il file web non deve caricare script esterni");
if (/href="icon\.svg"/.test(html)) throw new Error("la favicon deve essere incorporata");
if (!html.includes("-webkit-text-size-adjust: 100%")) throw new Error("manca la regola anti-inflazione dei caratteri");
if (!html.includes("-webkit-tap-highlight-color")) throw new Error("manca la rimozione dell'alone di tocco");
if (!html.includes("spawnRipple")) throw new Error("manca l'animazione di pressione");
if (!html.includes('name="theme-color"')) throw new Error("manca il theme-color per Android");

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, html);
console.log(`versione web generata: ${outFile} (${(html.length / 1024).toFixed(1)} KB)`);