import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const www = join(root, "www");

mkdirSync(join(root, "js"), { recursive: true });
mkdirSync(www, { recursive: true });

const vendor = [
  ["node_modules/@capacitor/core/dist/capacitor.js", "js/capacitor.js"],
  ["node_modules/@capacitor/preferences/dist/plugin.js", "js/preferences.js"],
];

for (const [from, to] of vendor) {
  copyFileSync(join(root, from), join(root, to));
}

const assets = ["index.html", "icon.svg"];

for (const file of assets) {
  copyFileSync(join(root, file), join(www, file));
}

mkdirSync(join(www, "js"), { recursive: true });
for (const [, to] of vendor) {
  copyFileSync(join(root, to), join(www, to));
}

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
writeFileSync(
  join(root, "package.json"),
  JSON.stringify(pkg, null, 2) + "\n"
);

console.log("web assets prepared in www/");
