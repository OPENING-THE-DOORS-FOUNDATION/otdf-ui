// Rewrites `@/...` imports under src/ into relative paths.
//
// otdf-ui ships its source and is compiled by the consuming app. In that app
// "@" points at the app's own src/, so any "@/lib/utils" left in here would
// resolve to the wrong file. Run this after every `shadcn-vue add`:
//   bun run relativize
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src");
const importRe = /(from\s+|import\s*\(\s*|import\s+)(['"])@\/([^'"]+)\2/g;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(vue|ts)$/.test(name)) out.push(full);
  }
  return out;
}

let changedFiles = 0;
for (const file of walk(srcDir)) {
  const before = readFileSync(file, "utf-8");
  const after = before.replace(importRe, (_m, lead, quote, target) => {
    let rel = path.relative(path.dirname(file), path.join(srcDir, target));
    rel = rel.split(path.sep).join("/");
    if (!rel.startsWith(".")) rel = `./${rel}`;
    return `${lead}${quote}${rel}${quote}`;
  });
  if (after !== before) {
    writeFileSync(file, after, "utf-8");
    changedFiles++;
  }
}
console.log(`relativize-imports: rewrote ${changedFiles} file(s)`);
