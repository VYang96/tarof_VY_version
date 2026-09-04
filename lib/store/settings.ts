// 全局设置 —— 语言、主题、逆位开关（PRD §3.11）
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Locale = "zh" | "en";
export type Theme = "dark" | "candle"; // 深色星空 / 暖烛光

interface SettingsState {
  locale: Locale;
  theme: Theme;
  reversedEnabled: boolean; // 是否启用逆位（默认开）
  reversedRate: number; // 逆位概率
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  setTheme: (t: Theme) => void;
  setReversedEnabled: (v: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      locale: "zh",
      theme: "dark",
      reversedEnabled: true,
      reversedRate: 0.5,
      setLocale: (locale) => set({ locale }),
      toggleLocale: () =>
        set((s) => ({ locale: s.locale === "zh" ? "en" : "zh" })),
      setTheme: (theme) => set({ theme }),
      setReversedEnabled: (reversedEnabled) => set({ reversedEnabled }),
    }),
    {
      name: "moonspeak-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
