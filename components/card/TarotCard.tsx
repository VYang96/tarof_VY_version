"use client";
import { useState } from "react";
import { cardImageSrc, cardName, cardSub } from "@/lib/data";
import { useSettings } from "@/lib/store/settings";
import { useT } from "@/lib/i18n";
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
  fluid?: boolean; // 撑满容器宽度（网格用），忽略 size
  onClick?: () => void;
  className?: string;
}

export function TarotCard({
  card,
  reversed = false,
  faceDown = false,
  positionLabel,
  size = 140,
  fluid = false,
  onClick,
  className = "",
}: TarotCardProps) {
  const height = Math.round(size * 1.6);

  return (
    <figure
      className={`flex flex-col items-center gap-2 ${fluid ? "w-full" : ""} ${className}`}
    >
      {positionLabel && (
        <figcaption className="text-xs text-fg-muted">{positionLabel}</figcaption>
      )}
      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        style={fluid ? undefined : { width: size, height }}
        className={`group relative overflow-hidden rounded-xl transition-transform duration-300 ${
          fluid ? "aspect-[5/8] w-full" : ""
        } ${
          onClick ? "glow-gold cursor-pointer hover:-translate-y-1" : "cursor-default"
        }`}
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
    <div className="absolute inset-0 overflow-hidden rounded-xl border border-gold/40 bg-bg-elev-2">
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
  const locale = useSettings((s) => s.locale);
  const t = useT();
  const src = card ? cardImageSrc(card.id) : null;
  const title = card ? cardName(card, locale) : "";
  const subtitle = card ? cardSub(card, locale) : "";
  const revBadge = t("card.reversedShort");

  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-xl bg-gradient-to-b from-bg-elev-2 to-bg-elev ${
        imgOk ? "" : "border border-gold/60"
      }`}
    >
      {/* 插画层：加载成功才显示；缺图/失败则透明，露出下方程序化牌面 */}
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={card?.name ?? ""}
          onLoad={() => setImgOk(true)}
          onError={() => setImgOk(false)}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
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
          {reversed && <span className="ml-1 text-danger">{revBadge}</span>}
        </span>
        <span
          className={`text-4xl text-gold drop-shadow-[0_0_8px_rgba(214,172,87,0.35)] ${
            reversed ? "rotate-180" : ""
          }`}
        >
          {glyph}
        </span>
        <div className="text-center leading-tight">
          <div className="font-serif text-sm text-fg">{title}</div>
          <div className="font-serif text-[10px] italic text-fg-muted">
            {subtitle}
          </div>
        </div>
      </div>

      {/* 插画自带牌名；逆位时仅在角落标记，避免与画面文字重复 */}
      {imgOk && reversed && (
        <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-danger">
          {revBadge}
        </span>
      )}

      {/* 程序化牌面的内描边（插画模式不加，避免压住画面自带的框） */}
      {!imgOk && (
        <div className="pointer-events-none absolute inset-[3px] rounded-lg border border-gold/40" />
      )}
    </div>
  );
}
