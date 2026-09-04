// 把拼图 public/deck-sheet.jpeg 按网格切成 60 张瓦片（预览用）。
// 先切到 scratch 预览目录 + 拼一张验证图，调准网格参数后再填进 public/cards/。
//
// 用法：
//   node scripts/crop-sheet.mjs           # 切到预览目录 + 生成验证拼图
//   node scripts/crop-sheet.mjs --apply   # 同时写入 public/cards/（按牌 id 命名）
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "public", "deck-sheet.jpeg");
const PREVIEW_DIR = join(ROOT, "scratch-crop");
const CARDS_DIR = join(ROOT, "public", "cards");
const APPLY = process.argv.includes("--apply");

const CARDS = JSON.parse(readFileSync(join(ROOT, "data", "cards.json"), "utf8"));

// —— 网格参数（原图 2816×1536 像素坐标）——
const GRID = {
  cols: 12,
  rows: 5,
  x0: 292, // 第一列左边缘
  y0: 60, // 第一行上边缘
  cardW: 158,
  cardH: 246,
  colPitch: 199, // 列间距（中心到中心）
  rowPitch: 293, // 行间距
  xShiftPerRow: -7, // 低行整体左移，补偿透视右漂
};

// 切掉每张卡底部的文字标签条（乱标，不要）
const LABEL_CROP = 34; // 从卡底部往上裁掉的高度

const OUT_W = 400; // 输出瓦片尺寸（5:8）
const OUT_H = 640;

mkdirSync(PREVIEW_DIR, { recursive: true });
if (APPLY) mkdirSync(CARDS_DIR, { recursive: true });

const cells = [];
for (let r = 0; r < GRID.rows; r++) {
  for (let c = 0; c < GRID.cols; c++) {
    cells.push({
      r,
      c,
      left: Math.round(GRID.x0 + c * GRID.colPitch + r * GRID.xShiftPerRow),
      top: Math.round(GRID.y0 + r * GRID.rowPitch),
      width: GRID.cardW,
      height: GRID.cardH - LABEL_CROP,
    });
  }
}

const base = sharp(SRC);
const meta = await base.metadata();
console.log(`源图 ${meta.width}×${meta.height}，切 ${cells.length} 格`);

// 逐格切出 → 预览目录（r{row}-c{col}.png）+ 可选写入 public/cards/<牌id>.png
const tiles = [];
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  // 越界保护
  const left = Math.max(0, Math.min(cell.left, meta.width - 1));
  const top = Math.max(0, Math.min(cell.top, meta.height - 1));
  const width = Math.min(cell.width, meta.width - left);
  const height = Math.min(cell.height, meta.height - top);

  const buf = await sharp(SRC)
    .extract({ left, top, width, height })
    .resize(OUT_W, OUT_H, { fit: "cover" })
    .png()
    .toBuffer();

  const previewName = `r${cell.r + 1}-c${cell.c + 1}.png`;
  writeFileSync(join(PREVIEW_DIR, previewName), buf);
  tiles.push(buf);

  if (APPLY && CARDS[i]) {
    writeFileSync(join(CARDS_DIR, `${CARDS[i].id}.png`), buf);
  }
}

// 拼一张验证图（缩略网格）
const THUMB_W = 120;
const THUMB_H = 192;
const GAP = 6;
const canvasW = GRID.cols * THUMB_W + (GRID.cols + 1) * GAP;
const canvasH = GRID.rows * THUMB_H + (GRID.rows + 1) * GAP;

const composites = [];
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  const thumb = await sharp(tiles[i]).resize(THUMB_W, THUMB_H).png().toBuffer();
  composites.push({
    input: thumb,
    left: GAP + cell.c * (THUMB_W + GAP),
    top: GAP + cell.r * (THUMB_H + GAP),
  });
}

await sharp({
  create: {
    width: canvasW,
    height: canvasH,
    channels: 3,
    background: { r: 20, g: 18, b: 31 },
  },
})
  .composite(composites)
  .png()
  .toFile(join(PREVIEW_DIR, "_montage.png"));

console.log(`✅ 预览瓦片 → scratch-crop/  验证图 → scratch-crop/_montage.png`);
if (APPLY) {
  const applied = Math.min(cells.length, CARDS.length);
  console.log(`✅ 已写入 public/cards/：前 ${applied} 张牌（按 CARDS 顺序映射）`);
}
