// AI 深度解读 · 统一接口层（PRD §5.1）
// 上层 UI 只依赖这里的类型；底层实现可换成 BYOK / 前端网关 / Serverless 代理，
// 而不影响任何页面。

import type { Category } from "@/types/tarot";

/** 单张牌在本次解读里的上下文 */
export interface InterpretDraw {
  positionLabel: string; // 牌阵位置名，如「过去」
  positionMeaning: string; // 位置含义
  cardName: string;
  cardEn: string;
  reversed: boolean;
  meaning: string; // 该类别下、该朝向的固定牌义
}

/** 一次解读的完整上下文 —— 喂给大模型的原料（PRD §5.4） */
export interface InterpretContext {
  category: Category;
  categoryLabel: string;
  question: string;
  spreadName: string;
  howToRead: string;
  draws: InterpretDraw[];
}

/**
 * 解读器：输入上下文，返回逐段吐出的文本流（PRD §5.1）。
 *   interpret(ctx) => AsyncIterable<string>
 * 可传入 AbortSignal 以支持中断。
 */
export type Interpreter = (
  ctx: InterpretContext,
  signal?: AbortSignal
) => AsyncIterable<string>;
