// 结果分享卡片（PRD §3.9）：把一次占卜画成一张竖版图片（Canvas），供下载/复制。
// 纯客户端，无需网络。

export interface ShareItem {
  label: string; // 位置名
  name: string; // 牌名
  en: string;
  reversed: boolean;
}

export interface ShareData {
  appName: string;
  tagline: string;
  question: string;
  spreadName: string;
  items: ShareItem[];
  dateLabel: string;
  disclaimer: string;
  reversedText: string;
  uprightText: string;
}

const C = {
  bgTop: "#1b1826",
  bgBottom: "#12101b",
  gold: "#d6ac57",
  goldSoft: "#e6c988",
  fg: "#ece8f5",
  muted: "#a79fc4",
  danger: "#c9647a",
  border: "#322c47",
};

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = [];
  let cur = "";
  for (const ch of text) {
    const test = cur + ch;
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur);
      cur = ch;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/** 生成分享图，返回 PNG Blob */
export async function generateShareImage(data: ShareData): Promise<Blob> {
  const W = 1080;
  const PAD = 72;
  const headerH = 380;
  const rowH = 96;
  const footerH = 240;
  const H = headerH + data.items.length * rowH + footerH;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // 背景
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, C.bgTop);
  grad.addColorStop(1, C.bgBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 星点
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 1.8 + 0.4;
    ctx.globalAlpha = Math.random() * 0.5 + 0.15;
    ctx.fillStyle = Math.random() > 0.6 ? C.goldSoft : "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const serif = '"Songti SC", "Noto Serif SC", serif';
  const sans = '"PingFang SC", "Hiragino Sans GB", system-ui, sans-serif';

  // 头部
  ctx.textAlign = "center";
  ctx.fillStyle = C.gold;
  ctx.font = `96px ${serif}`;
  ctx.fillText("☾", W / 2, 150);

  ctx.font = `56px ${serif}`;
  ctx.fillText(data.appName, W / 2, 240);

  ctx.fillStyle = C.muted;
  ctx.font = `26px ${sans}`;
  ctx.fillText(data.spreadName, W / 2, 288);

  // 问题
  let y = 340;
  if (data.question) {
    ctx.fillStyle = C.fg;
    ctx.font = `italic 30px ${serif}`;
    const qLines = wrapText(ctx, `「${data.question}」`, W - PAD * 2);
    for (const line of qLines.slice(0, 2)) {
      ctx.fillText(line, W / 2, y);
      y += 40;
    }
  }

  // 分隔线
  ctx.strokeStyle = C.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, headerH - 20);
  ctx.lineTo(W - PAD, headerH - 20);
  ctx.stroke();

  // 牌列表
  ctx.textAlign = "left";
  let ry = headerH + 30;
  for (const it of data.items) {
    // 位置标签
    ctx.fillStyle = C.goldSoft;
    ctx.font = `24px ${sans}`;
    ctx.fillText(it.label, PAD, ry);
    // 牌名
    ctx.fillStyle = C.fg;
    ctx.font = `40px ${serif}`;
    ctx.fillText(it.name, PAD, ry + 44);
    ctx.fillStyle = C.muted;
    ctx.font = `italic 24px ${serif}`;
    const nameW = ctx.measureText(it.name).width;
    // en 紧跟牌名右侧
    ctx.font = `italic 24px ${serif}`;
    // 正逆位标签（右对齐）
    ctx.textAlign = "right";
    ctx.fillStyle = it.reversed ? C.danger : C.gold;
    ctx.font = `26px ${sans}`;
    ctx.fillText(it.reversed ? data.reversedText : data.uprightText, W - PAD, ry + 44);
    ctx.textAlign = "left";
    void nameW;
    ry += rowH;
  }

  // 页脚
  ctx.strokeStyle = C.border;
  ctx.beginPath();
  ctx.moveTo(PAD, H - footerH + 20);
  ctx.lineTo(W - PAD, H - footerH + 20);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = C.muted;
  ctx.font = `22px ${sans}`;
  const dLines = wrapText(ctx, data.disclaimer, W - PAD * 2);
  let fy = H - footerH + 70;
  for (const line of dLines.slice(0, 3)) {
    ctx.fillText(line, W / 2, fy);
    fy += 32;
  }
  ctx.fillStyle = C.gold;
  ctx.font = `24px ${serif}`;
  ctx.fillText(`${data.appName} · ${data.dateLabel}`, W / 2, H - 48);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("canvas toBlob failed"));
    }, "image/png");
  });
}

/** 尝试复制到剪贴板，不支持则返回 false */
export async function copyImageToClipboard(blob: Blob): Promise<boolean> {
  try {
    if (
      typeof ClipboardItem !== "undefined" &&
      navigator.clipboard?.write
    ) {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      return true;
    }
  } catch {
    /* 权限/兼容性问题：回退到下载 */
  }
  return false;
}

/** 触发浏览器下载 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
