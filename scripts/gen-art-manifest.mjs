// 扫描 public/cards/ 下的牌面图，生成 data/card-art.json 清单
//   { "major-06": "major-06.png", ... }
// 牌面组件据此决定用插画还是回退到程序化牌面。
//
// 用法： pnpm gen:art
import { readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, basename } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARDS_DIR = join(__dirname, "..", "public", "cards");
const OUT = join(__dirname, "..", "data", "card-art.json");
const EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const files = readdirSync(CARDS_DIR).filter((f) =>
  EXTS.has(extname(f).toLowerCase())
);

const manifest = {};
for (const f of files) {
  const id = basename(f, extname(f));
  manifest[id] = f;
}

// 按 key 排序，输出稳定
const sorted = Object.fromEntries(
  Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b))
);

writeFileSync(OUT, JSON.stringify(sorted, null, 2) + "\n", "utf8");
console.log(`✅ 收录 ${files.length} 张牌面图 → data/card-art.json`);
