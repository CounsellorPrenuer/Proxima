import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist", "public");
const indexFile = resolve(distDir, "index.html");
const notFoundFile = resolve(distDir, "404.html");
const noJekyllFile = resolve(distDir, ".nojekyll");

if (!existsSync(indexFile)) {
  throw new Error("index.html not found in dist/public");
}

copyFileSync(indexFile, notFoundFile);
writeFileSync(noJekyllFile, "");

console.log("Created 404.html fallback and .nojekyll for GitHub Pages.");
