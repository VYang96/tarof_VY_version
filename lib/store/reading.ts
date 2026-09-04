// 一次占卜的流程状态机（PRD §2.3 核心主线）
// 设定问题 → 选牌阵 → 洗牌抽牌 → 解读 → 整合
import { create } from "zustand";
import type { Category, Draw } from "@/types/tarot";
import { drawCards } from "@/lib/data/draw";

export type ReadingStep = "category" | "question" | "spread" | "draw" | "result";

interface ReadingState {
  step: ReadingStep;
  category: Category | null;
  question: string;
  spreadId: string | null;
  draws: Draw[];
  aiReading: string; // 深度解读缓存（PRD §3.5：结果缓存，避免重复调用）

  setCategory: (c: Category) => void;
  setQuestion: (q: string) => void;
  setSpread: (id: string) => void;
  performDraw: (count: number, reversedRate?: number) => void;
  setAiReading: (text: string) => void;
  goTo: (step: ReadingStep) => void;
  reset: () => void;
}

const initial = {
  step: "category" as ReadingStep,
  category: null,
  question: "",
  spreadId: null,
  draws: [] as Draw[],
  aiReading: "",
};

export const useReading = create<ReadingState>((set) => ({
  ...initial,

  setCategory: (category) => set({ category, step: "question" }),
  setQuestion: (question) => set({ question }),
  setSpread: (spreadId) => set({ spreadId, step: "draw" }),
  performDraw: (count, reversedRate) =>
    set({ draws: drawCards(count, reversedRate), aiReading: "", step: "result" }),
  setAiReading: (aiReading) => set({ aiReading }),
  goTo: (step) => set({ step }),
  reset: () => set({ ...initial }),
}));
