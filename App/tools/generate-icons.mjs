import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const res = join(root, "android/app/src/main/res");

const src = readFileSync(join(root, "icon.svg"), "utf8");
const style = src.match(/<style>[\s\S]*?<\/style>/)[0];
const bgRect = src.match(/<rect class="bg"[^>]*\/>/)[0];
const inner = src
  .slice(src.indexOf(">", src.indexOf("<svg")) + 1, src.lastIndexOf("</svg>"))
  .replace(style, "")
  .replace(bgRect, "")
  .trim();
const art = inner;
const bgColor = src.match(/\.bg\s*\{\s*fill:\s*(#[0-9a-fA-F]{3,8})/)[1];

const wrap = (size, content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">\n${content}\n</svg>`;
const scaled = (size, artSize, content, styleBlock = style) =>
  wrap(
    size,
    `${styleBlock}\n<g transform="translate(${(size - artSize) / 2} ${(size - artSize) / 2}) scale(${artSize / 128})">\n${content}\n</g>`
  );

const monochromeStyle = `<style>
  .bg{fill:#ffffff}
  .screen-bg,.key-bg,.key-op-bg,.key-main-bg{fill:#ffffff}
  .screen-text,.txt-num,.txt-op,.txt-main{fill:#ffffff}
</style>`;

/* Adaptive icon: 108dp canvas, artwork inside the 72dp safe zone (66dp used) */
const ADAPTIVE = 108;
const ADAPTIVE_ART = 66;
const adaptiveBackground = wrap(ADAPTIVE, `${style}\n<rect class="bg" x="0" y="0" width="${ADAPTIVE}" height="${ADAPTIVE}"/>`);
const adaptiveForeground = scaled(ADAPTIVE, ADAPTIVE_ART, art);
const monochrome = scaled(ADAPTIVE, ADAPTIVE_ART, art, monochromeStyle);

/* Legacy icons: 48dp canvas, full-bleed background, artwork inset so no mask clips it */
const LEGACY = 128;
const LEGACY_ART = 104;
const legacySquare = scaled(
  LEGACY,
  LEGACY_ART,
  `${art}`,
  `${style}\n<rect class="bg" x="0" y="0" width="${LEGACY}" height="${LEGACY}"/>`
);
const legacyRoundArt = 88;
const legacyRound = wrap(
  LEGACY,
  `${style}\n<circle class="bg" cx="64" cy="64" r="64"/>\n<g transform="translate(20 20) scale(${legacyRoundArt / 128})">\n${art}\n</g>`
);

/* Splash: 288dp canvas, artwork in the middle 61% so any splash mask keeps it whole */
const SPLASH = 288;
const SPLASH_ART = 176;
const splashIcon = scaled(SPLASH, SPLASH_ART, art);

const legacySizes = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
const adaptiveSizes = { mdpi: 108, hdpi: 162, xhdpi: 216, xxhdpi: 324, xxxhdpi: 432 };
const splashSizes = { mdpi: 288, hdpi: 432, xhdpi: 576, xxhdpi: 864, xxxhdpi: 1152 };

const render = (svg, size) =>
  new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    font: { loadSystemFonts: true, defaultFontFamily: "DejaVu Sans" },
  })
    .render()
    .asPng();

const emit = (file, svg, size) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(svg, size));
};

for (const [density, size] of Object.entries(legacySizes)) {
  const dir = join(res, `mipmap-${density}`);
  emit(join(dir, "ic_launcher.png"), legacySquare, size);
  emit(join(dir, "ic_launcher_round.png"), legacyRound, size);
  const adaptiveSize = adaptiveSizes[density];
  emit(join(dir, "ic_launcher_foreground.png"), adaptiveForeground, adaptiveSize);
  emit(join(dir, "ic_launcher_monochrome.png"), monochrome, adaptiveSize);
  emit(join(res, `drawable-${density}`, "splash_icon.png"), splashIcon, splashSizes[density]);
}

/* Remove Capacitor template placeholders that are replaced by the generated assets */
const stale = [
  "drawable/splash.png",
  "drawable/ic_launcher_background.xml",
  "drawable-v24/ic_launcher_foreground.xml",
];
for (const dir of ["drawable", "drawable-land-hdpi", "drawable-land-mdpi", "drawable-land-xhdpi", "drawable-land-xxhdpi", "drawable-land-xxxhdpi", "drawable-port-hdpi", "drawable-port-mdpi", "drawable-port-xhdpi", "drawable-port-xxhdpi", "drawable-port-xxxhdpi"]) {
  stale.push(`${dir}/splash.png`);
}
for (const file of stale) {
  const target = join(res, file);
  if (existsSync(target)) rmSync(target);
}

console.log(`generated launcher + splash icons (background ${bgColor})`);
