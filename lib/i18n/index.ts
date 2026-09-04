// i18n hook —— 依据当前 locale 取文案
"use client";
import { useSettings } from "@/lib/store/settings";
import { translate, type DictKey } from "./dict";

/** 返回翻译函数 t(key) */
export function useT() {
  const locale = useSettings((s) => s.locale);
  return (key: DictKey) => translate(key, locale);
}

export type { DictKey };
