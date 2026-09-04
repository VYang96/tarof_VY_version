// 每日一牌状态（PRD §3.6）：每设备唯一种子 + 当天翻开锁定 + 连续签到
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export function dateKey(d = new Date()): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function yesterdayKey(d = new Date()): string {
  const y = new Date(d);
  y.setDate(y.getDate() - 1);
  return dateKey(y);
}

interface DailyRecord {
  date: string; // 抽取当天
  cardId: string;
  reversed: boolean;
}

interface DailyState {
  seed: string; // 每设备唯一种子
  record: DailyRecord | null; // 最近一次（含当天）
  streak: number; // 连续签到天数
  longest: number;
  ensureSeed: () => string;
  /** 记录今天已翻开的牌，并更新连续签到 */
  lockToday: (cardId: string, reversed: boolean) => void;
}

function randomSeed(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const useDaily = create<DailyState>()(
  persist(
    (set, get) => ({
      seed: "",
      record: null,
      streak: 0,
      longest: 0,
      ensureSeed: () => {
        let s = get().seed;
        if (!s) {
          s = randomSeed();
          set({ seed: s });
        }
        return s;
      },
      lockToday: (cardId, reversed) => {
        const today = dateKey();
        const { record, streak, longest } = get();
        if (record?.date === today) return; // 今天已锁定
        const nextStreak = record?.date === yesterdayKey() ? streak + 1 : 1;
        set({
          record: { date: today, cardId, reversed },
          streak: nextStreak,
          longest: Math.max(longest, nextStreak),
        });
      },
    }),
    {
      name: "moonspeak-daily",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
