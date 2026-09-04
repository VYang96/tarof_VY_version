// 生成检查图：把 public/cards/ 里已填的牌面按 CARDS 顺序排出、标注牌 id+名，便于核对裁切。
import sharp from "sharp";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CARDS = JSON.parse(readFileSync(join(ROOT, "data", "cards.json"), "utf8"));
const ART = JSON.parse(readFileSync(join(ROOT, "data", "card-art.json"), "utf8"));

const withArt = CARDS.filter((c) => ART[c.id]);
const COLS = 6;
const TW = 170;
const TH = 272;
const LABEL_H = 34;
const GAP = 8;
const rows = Math.ceil(withArt.length / COLS);
const W = COLS * TW + (COLS + 1) * GAP;
const H = rows * (TH + LABEL_H) + (rows + 1) * GAP;

const composites = [];
for (let i = 0; i < withArt.length; i++) {
  const card = withArt[i];
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = GAP + col * (TW + GAP);
  const y = GAP + row * (TH + LABEL_H + GAP);

  const img = await sharp(join(ROOT, "public", "cards", ART[card.id]))
    .resize(TW, TH, { fit: "cover" })
    .png()
    .toBuffer();
  composites.push({ input: img, left: x, top: y });

  const label = `${i + 1}. ${card.id}  ${card.name}`;
  const svg = Buffer.from(
    `<svg width="${TW}" height="${LABEL_H}"><rect width="100%" height="100%" fill="#241f33"/><text x="6" y="22" font-family="sans-serif" font-size="15" fill="#e6c988">${label}</text></svg>`
  );
  composites.push({ input: svg, left: x, top: y + TH });
}

await sharp({
  create: { width: W, height: H, channels: 3, background: { r: 16, g: 14, b: 24 } },
})
  .composite(composites)
  .png()
  .toFile(join(ROOT, "scratch-crop", "_review.png"));

console.log(`✅ 检查图 → scratch-crop/_review.png（${withArt.length} 张）`);
