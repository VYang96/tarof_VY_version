"use client";
import { useState } from "react";
import { cardImageSrc } from "@/lib/data";
import type { Card, Suit } from "@/types/tarot";

// 花色对应的炼金元素符号（程序化牌面 · PRD §7 风格统一）
const SUIT_GLYPH: Record<Suit, string> = {
  wands: "🜂", // 火
  cups: "🜄", // 水
  swords: "🜁", // 风
  pentacles: "🜃", // 土
};

// 大阿卡纳统一以月/星为核心意象
const MAJOR_GLYPH = "☾";

export function cardGlyph(card?: Card | null): string {
  if (!card) return MAJOR_GLYPH;
  return card.arcana === "major" ? MAJOR_GLYPH : SUIT_GLYPH[card.suit as Suit];
}

export function roman(n: number): string {
  if (n === 0) return "0";
  const map: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  let num = n;
  for (const [v, s] of map) {
    while (num >= v) {
      out += s;
      num -= v;
    }
  }
  return out;
}

export interface TarotCardProps {
  card?: Card | null;
  reversed?: boolean;
  faceDown?: boolean;
  /** 位置标签，如「过去」 */
  positionLabel?: string;
  size?: number; // 宽度像素，高按 5:8 比例
  onClick?: () => void;
  className?: string;
}

export function TarotCard({
  card,
  reversed = false,
  faceDown = false,
  positionLabel,
  size = 140,
  onClick,
  className = "",
}: TarotCardProps) {
  const height = Math.round(size * 1.6);

  return (
    <figure className={`flex flex-col items-center gap-2 ${className}`}>
      {positionLabel && (
        <figcaption className="text-xs text-fg-muted">{positionLabel}</figcaption>
      )}
      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        style={{ width: size, height }}
        className={`group relative rounded-xl border transition-transform duration-300 ${
          onClick ? "glow-gold cursor-pointer hover:-translate-y-1" : "cursor-default"
        } ${faceDown ? "border-gold/40" : "border-gold/70"}`}
      >
        {faceDown ? (
          <CardBack />
        ) : (
          <CardFace card={card} reversed={reversed} glyph={cardGlyph(card)} />
        )}
      </button>
    </figure>
  );
}

export function CardBack() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl bg-bg-elev-2">
      <div className="absolute inset-[3px] rounded-lg border border-gold/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-3xl text-gold/60">✦</div>
      </div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(214,172,87,0.25), transparent 40%), radial-gradient(circle at 50% 80%, rgba(138,124,196,0.25), transparent 40%)",
        }}
      />
    </div>
  );
}

export function CardFace({
  card,
  reversed,
  glyph,
}: {
  card?: Card | null;
  reversed: boolean;
  glyph: string;
}) {
  const [imgOk, setImgOk] = useState(false);
  const src = card ? cardImageSrc(card.id) : null;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl bg-gradient-to-b from-bg-elev-2 to-bg-elev">
      {/* 插画层：加载成功才显示；缺图/失败则透明，露出下方程序化牌面 */}
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={card?.name ?? ""}
          onLoad={() => setImgOk(true)}
          onError={() => setImgOk(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            imgOk ? "opacity-100" : "opacity-0"
          } ${reversed ? "rotate-180" : ""}`}
        />
      )}

      {/* 程序化牌面：兜底 / 加载中。逆位只倒转中央符号，牌名/编号保持正立可读 */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-between px-2 py-3 transition-opacity ${
          imgOk ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="font-serif text-xs text-gold-soft">
          {card ? roman(card.number) : ""}
          {reversed && <span className="ml-1 text-danger">逆</span>}
        </span>
        <span
          className={`text-4xl text-gold drop-shadow-[0_0_8px_rgba(214,172,87,0.35)] ${
            reversed ? "rotate-180" : ""
          }`}
        >
          {glyph}
        </span>
        <div className="text-center leading-tight">
          <div className="font-serif text-sm text-fg">{card?.name ?? ""}</div>
          <div className="font-serif text-[10px] italic text-fg-muted">
            {card?.en ?? ""}
          </div>
        </div>
      </div>

      {/* 插画模式下的信息浮层：底部渐变 + 名称，保证可读 */}
      {imgOk && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2 pb-2 pt-6 text-center">
          <div className="font-serif text-sm text-fg drop-shadow">
            {card?.name ?? ""}
            {reversed && <span className="ml-1 text-xs text-danger">逆</span>}
          </div>
        </div>
      )}

      {/* 金色描边（始终在最上层） */}
      <div className="pointer-events-none absolute inset-[3px] rounded-lg border border-gold/40" />
    </div>
  );
}
