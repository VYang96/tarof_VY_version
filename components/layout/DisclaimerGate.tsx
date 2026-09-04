"use client";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

const KEY = "moonspeak-disclaimer-accepted";

/** 首次使用的免责/负责声明（PRD §3.12），接受一次后不再出现 */
export function DisclaimerGate() {
  const t = useT();
  const [open, setOpen] = useState(false);

  // 挂载后读取本地存储（localStorage 在预渲染时不可用，只能在 effect 里读）
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem(KEY) !== "1") setOpen(true);
    } catch {
      /* 隐私模式等读取失败：不阻塞使用 */
    }
  }, []);

  if (!open) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gold/40 bg-bg-elev p-6 text-center">
        <div className="mb-3 text-3xl text-gold">☾</div>
        <h2 className="font-serif text-xl text-gold">{t("disclaimer.gateTitle")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">
          {t("disclaimer.body")}
        </p>
        <button
          onClick={accept}
          className="mt-6 w-full rounded-full bg-gold py-2.5 font-serif text-bg transition-opacity hover:opacity-90"
        >
          {t("disclaimer.accept")}
        </button>
      </div>
    </div>
  );
}
