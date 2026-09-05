// 从 /Users/veeyang/Downloads/cards 导入牌面图到 public/cards/，按牌 id 命名。
// 大牌按 manifest 名称匹配（跳过 (dup)）；小牌 pips 01-10 + 宫廷（cups 的多余项在 13，Q/K 顺延）。
import { readFileSync, copyFileSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = "/Users/veeyang/Downloads/cards";
const DEST = join(ROOT, "public", "cards");
const CARDS = JSON.parse(readFileSync(join(ROOT, "data", "cards.json"), "utf8"));
const idSet = new Set(CARDS.map((c) => c.id));
const pad2 = (n) => String(n).padStart(2, "0");

for (const f of readdirSync(DEST)) {
  if (/\.(png|jpe?g|webp)$/i.test(f)) rmSync(join(DEST, f));
}

let count = 0;
const copy = (absSrc, id) => {
  if (!idSet.has(id)) return console.warn("未知 id:", id);
  copyFileSync(absSrc, join(DEST, `${id}.png`));
  count++;
};

// 大阿卡纳：按名匹配
const enToId = new Map(CARDS.filter((c) => c.arcana === "major").map((c) => [c.en, c.id]));
const manifest = JSON.parse(readFileSync(join(SRC, "manifest.json"), "utf8"));
const assigned = new Set();
for (const e of manifest) {
  if (e.group !== "Major Arcana" || /\(dup\)/i.test(e.name)) continue;
  const id = enToId.get(e.name.trim());
  if (!id) { console.warn("大牌未匹配:", e.name); continue; }
  if (assigned.has(id)) continue;
  assigned.add(id);
  copy(join(SRC, e.file.replace(/^cards\//, "")), id);
}

// 小阿卡纳
const COURT = {
  wands: { page: 11, knight: 12, queen: 13, king: 14 },
  swords: { page: 11, knight: 12, queen: 13, king: 14 },
  pentacles: { page: 11, knight: 12, queen: 13, king: 14 },
  cups: { page: 11, knight: 12, queen: 14, king: 15 },
};
for (const suit of Object.keys(COURT)) {
  for (let n = 1; n <= 10; n++) copy(join(SRC, suit, `${suit}_${pad2(n)}.png`), `${suit}-${pad2(n)}`);
  for (const [rank, num] of Object.entries(COURT[suit])) copy(join(SRC, suit, `${suit}_${pad2(num)}.png`), `${suit}-${rank}`);
}

console.log(`✅ 导入 ${count} 张 → public/cards/`);
const have = new Set(readdirSync(DEST).filter((f) => f.endsWith(".png")).map((f) => f.replace(".png", "")));
const missing = CARDS.filter((c) => !have.has(c.id)).map((c) => c.id);
console.log(missing.length ? "⚠️ 缺失: " + missing.join(", ") : "✔ 78 张齐全");
