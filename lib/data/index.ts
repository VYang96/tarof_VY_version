// 静态数据访问层 —— 78 张牌 + 牌阵，随构建打包，离线可读
import cardsData from "@/data/cards.json";
import spreadsData from "@/data/spreads.json";
import cardArt from "@/data/card-art.json";
import type { Card, Spread, Category } from "@/types/tarot";

export const CARDS = cardsData as Card[];
export const SPREADS = spreadsData as Spread[];

// 牌面插画清单（由 scripts/gen-art-manifest.mjs 生成）：{ 牌id: 文件名 }
const ART = cardArt as Record<string, string>;

/** 取某张牌的插画地址；无插画时返回 null（组件回退到程序化牌面） */
export function cardImageSrc(id: string): string | null {
  const file = ART[id];
  return file ? `/cards/${file}` : null;
}

const cardById = new Map(CARDS.map((c) => [c.id, c]));
const spreadById = new Map(SPREADS.map((s) => [s.id, s]));

export function getCard(id: string): Card | undefined {
  return cardById.get(id);
}

export function getSpread(id: string): Spread | undefined {
  return spreadById.get(id);
}

/** 取某张牌在指定类别下的牌义（按语言，缺英文时回退中文） */
export function getMeaning(
  card: Card,
  category: Category,
  reversed: boolean,
  locale: "zh" | "en" = "zh"
) {
  const set = locale === "en" && card.meaningsEn ? card.meaningsEn : card.meanings;
  const m = set[category];
  return reversed ? m.reversed : m.upright;
}

/** 按语言取牌名（主标题） */
export function cardName(card: Card, locale: "zh" | "en"): string {
  return locale === "en" ? card.en : card.name;
}

/** 按语言取牌名副标题（另一种语言） */
export function cardSub(card: Card, locale: "zh" | "en"): string {
  return locale === "en" ? card.name : card.en;
}

/** 按语言取关键词 */
export function cardKeywords(card: Card, locale: "zh" | "en"): string[] {
  return locale === "en" && card.keywordsEn ? card.keywordsEn : card.keywords;
}

/** 按语言取牌阵名 / 读法 / 位置名 */
export function spreadName(s: Spread, locale: "zh" | "en"): string {
  return locale === "en" && s.nameEn ? s.nameEn : s.name;
}
export function spreadHowTo(s: Spread, locale: "zh" | "en"): string {
  return locale === "en" && s.howToReadEn ? s.howToReadEn : s.howToRead;
}
export function positionLabel(
  p: { label: string; labelEn?: string } | undefined,
  locale: "zh" | "en"
): string | undefined {
  if (!p) return undefined;
  return locale === "en" && p.labelEn ? p.labelEn : p.label;
}

export const CATEGORIES: { id: Category; zh: string; en: string }[] = [
  { id: "general", zh: "综合运势", en: "General" },
  { id: "love", zh: "感情", en: "Love" },
  { id: "career", zh: "事业", en: "Career" },
  { id: "wealth", zh: "财运", en: "Wealth" },
];
