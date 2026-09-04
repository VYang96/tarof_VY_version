// AI 深度解读入口 —— 唯一的对接切换点（PRD §5.1 / §5.3）
//
// 当前接入：placeholder（占位流式解读，无需密钥、离线可用）。
// 后续接入真实模型时，实现一个同签名的 Interpreter 并在此切换：
//   - 方案 A（BYOK）：用户在设置里填自己的 Key，浏览器直连模型 API
//   - 方案 B（前端网关，如 Puter.js）：第三方 SDK 在浏览器侧计费
//   - 方案 C（Serverless 代理）：转发到一个云函数，你的 Key 藏在服务端
// 关键原则：绝不把你自己的共享 API Key 明文放进前端产物（PRD §5.3）。
import type { Interpreter, InterpretContext, InterpretDraw } from "./types";
import { placeholderInterpreter } from "./placeholder";
import { getCard, getSpread, getMeaning, CATEGORIES } from "@/lib/data";
import type { Category, Draw } from "@/types/tarot";

export type { Interpreter, InterpretContext, InterpretDraw };

/** 当前启用的解读器。改这一行即可切换底层实现。 */
export function getInterpreter(): Interpreter {
  return placeholderInterpreter;
}

/** 是否为占位实现（UI 可据此提示「AI 尚未接入」） */
export const isPlaceholderAI = true;

/** 由一次占卜的原始数据组装解读上下文（PRD §5.4） */
export function buildContext(
  category: Category,
  question: string,
  spreadId: string,
  draws: Draw[]
): InterpretContext {
  const spread = getSpread(spreadId);
  const cat = CATEGORIES.find((c) => c.id === category);
  const interpretDraws: InterpretDraw[] = draws.map((d) => {
    const card = getCard(d.cardId);
    const pos = spread?.positions.find((p) => p.index === d.position);
    return {
      positionLabel: pos?.label ?? `位置 ${d.position + 1}`,
      positionMeaning: pos?.meaning ?? "",
      cardName: card?.name ?? d.cardId,
      cardEn: card?.en ?? "",
      reversed: d.reversed,
      meaning: card ? getMeaning(card, category, d.reversed) : "",
    };
  });
  return {
    category,
    categoryLabel: cat?.zh ?? category,
    question,
    spreadName: spread?.name ?? "",
    howToRead: spread?.howToRead ?? "",
    draws: interpretDraws,
  };
}
