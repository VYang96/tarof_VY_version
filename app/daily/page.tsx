"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CARDS, getCard, getMeaning, cardName } from "@/lib/data";
import { FlipCard } from "@/components/card/FlipCard";
import { useDaily, dateKey } from "@/lib/store/daily";
import { useSettings } from "@/lib/store/settings";
import { useT } from "@/lib/i18n";

/** 确定性哈希：同一 (种子, 日期) 结果一致 */
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export default function DailyPage() {
  const t = useT();
  const locale = useSettings((s) => s.locale);
  const { seed, record, streak, ensureSeed, lockToday } = useDaily();

  useEffect(() => {
    ensureSeed();
  }, [ensureSeed]);

  const today = dateKey();
  const alreadyToday = record?.date === today;

  const { card, reversed } = useMemo(() => {
    if (alreadyToday && record) {
      return {
        card: getCard(record.cardId) ?? CARDS[0],
        reversed: record.reversed,
      };
    }
    const s = seed || "seedless";
    return {
      card: CARDS[hash(s + today) % CARDS.length],
      reversed: hash(s + today + "r") % 2 === 1,
    };
  }, [alreadyToday, record, seed, today]);

  // 当天已抽过则默认已翻开；否则等用户点击
  const [justRevealed, setJustRevealed] = useState(false);
  const revealed = justRevealed || alreadyToday;

  const onReveal = () => {
    setJustRevealed(true);
    lockToday(card.id, reversed);
  };

  const streakText =
    streak > 0
      ? locale === "zh"
        ? `连续签到 ${streak} 天`
        : `${streak}-day streak`
      : "";

  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <div>
        <h2 className="text-shimmer font-serif text-2xl">{t("home.daily")}</h2>
        <p className="mt-1 text-xs text-fg-muted">{today}</p>
        {streakText && (
          <p className="mt-1 text-xs text-gold-soft">✦ {streakText}</p>
        )}
      </div>

      <FlipCard
        card={card}
        reversed={reversed}
        revealed={revealed}
        size={150}
        onReveal={onReveal}
      />

      {revealed ? (
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-md space-y-2 rounded-xl border border-border bg-bg-elev p-5"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="font-serif text-lg text-fg">
              {cardName(card, locale)}
            </span>
            <span className={`text-xs ${reversed ? "text-danger" : "text-gold"}`}>
              {reversed ? t("card.reversed") : t("card.upright")}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-fg-muted">
            {getMeaning(card, "general", reversed, locale)}
          </p>
        </motion.article>
      ) : (
        <p className="text-xs text-fg-muted">
          {locale === "zh" ? "轻触卡牌，揭开今日指引" : "Tap the card to reveal today's guidance"}
        </p>
      )}
    </div>
  );
}
