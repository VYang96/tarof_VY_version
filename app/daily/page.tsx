"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CARDS, getMeaning } from "@/lib/data";
import { FlipCard } from "@/components/card/FlipCard";
import { useT } from "@/lib/i18n";

/** 用日期做确定性种子：同一天同一用户结果一致（PRD §3.6） */
function dailyIndex(dateKey: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < dateKey.length; i++) {
    h = (h * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  return h % mod;
}

export default function DailyPage() {
  const t = useT();
  const [revealed, setRevealed] = useState(false);

  const { card, reversed, dateLabel } = useMemo(() => {
    const now = new Date();
    const key = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const idx = dailyIndex(key, CARDS.length);
    const rev = dailyIndex(key + "r", 2) === 1;
    return {
      card: CARDS[idx],
      reversed: rev,
      dateLabel: key,
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <div>
        <h2 className="font-serif text-2xl text-gold">{t("home.daily")}</h2>
        <p className="mt-1 text-xs text-fg-muted">{dateLabel}</p>
      </div>

      <FlipCard
        card={card}
        reversed={reversed}
        revealed={revealed}
        size={150}
        onReveal={() => setRevealed(true)}
      />

      {revealed && (
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-md space-y-2 rounded-xl border border-border bg-bg-elev p-5"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="font-serif text-lg text-fg">{card.name}</span>
            <span className={`text-xs ${reversed ? "text-danger" : "text-gold"}`}>
              {reversed ? t("card.reversed") : t("card.upright")}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-fg-muted">
            {getMeaning(card, "general", reversed)}
          </p>
        </motion.article>
      )}

      {!revealed && (
        <p className="text-xs text-fg-muted">轻触卡牌，揭开今日指引</p>
      )}
    </div>
  );
}
