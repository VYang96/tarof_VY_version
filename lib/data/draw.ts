// 洗牌与抽牌 —— 结果随机、不重复；正逆位按概率
import { CARDS } from "./index";
import type { Draw } from "@/types/tarot";

/** 默认逆位概率（PRD §3.3，可配置，默认约 50%） */
export const DEFAULT_REVERSED_RATE = 0.5;

/** Fisher–Yates 洗牌，返回洗好的牌 id 列表副本 */
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 抽 count 张牌，映射到牌阵位置 0..count-1。
 * - 不重复
 * - 每张按 reversedRate 概率逆位
 */
export function drawCards(
  count: number,
  reversedRate: number = DEFAULT_REVERSED_RATE
): Draw[] {
  const deck = shuffle(CARDS);
  const picked = deck.slice(0, count);
  return picked.map((card, position) => ({
    position,
    cardId: card.id,
    reversed: Math.random() < reversedRate,
  }));
}
