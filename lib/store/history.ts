// 历史记录 —— 默认仅存本地（PRD §6.2 隐私），localStorage 持久化
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Reading } from "@/types/tarot";

interface HistoryState {
  readings: Reading[];
  add: (r: Reading) => void;
  remove: (id: string) => void;
  toggleFavorite: (id: string) => void;
  clear: () => void;
}

export const useHistory = create<HistoryState>()(
  persist(
    (set) => ({
      readings: [],
      add: (r) => set((s) => ({ readings: [r, ...s.readings] })),
      remove: (id) =>
        set((s) => ({ readings: s.readings.filter((x) => x.id !== id) })),
      toggleFavorite: (id) =>
        set((s) => ({
          readings: s.readings.map((x) =>
            x.id === id ? { ...x, favorite: !x.favorite } : x
          ),
        })),
      clear: () => set({ readings: [] }),
    }),
    {
      name: "moonspeak-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/** 生成一次占卜记录的 id：rd_YYYYMMDD_xxxx */
export function newReadingId(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6);
  return `rd_${y}${m}${d}_${rand}`;
}
