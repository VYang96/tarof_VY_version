"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useReading } from "@/lib/store/reading";
import { useHistory, newReadingId } from "@/lib/store/history";
import { useT } from "@/lib/i18n";
import { useSettings } from "@/lib/store/settings";
import {
  getCard,
  getSpread,
  getMeaning,
  cardName,
  cardSub,
  spreadName,
  spreadHowTo,
  positionLabel,
} from "@/lib/data";
import { getInterpreter, buildContext, isPlaceholderAI } from "@/lib/ai";
import {
  generateShareImage,
  copyImageToClipboard,
  downloadBlob,
} from "@/lib/share";
import { FlipCard } from "@/components/card/FlipCard";
import type { Category } from "@/types/tarot";

export default function ResultPage() {
  const t = useT();
  const router = useRouter();
  const { category, question, spreadId, draws, aiReading, setAiReading, reset } =
    useReading();
  const add = useHistory((s) => s.add);
  const locale = useSettings((s) => s.locale);
  const [saved, setSaved] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const reduce = useReducedMotion();

  // 自动依次翻牌：进入页面后逐张翻开，翻完才展开牌义解读
  const total = draws.length;
  // 无障碍（减少动态）时初始即全部翻开；否则从 0 开始逐张翻
  const [revealedCount, setRevealedCount] = useState(() =>
    reduce ? draws.length : 0
  );
  const allRevealed = revealedCount >= total;

  useEffect(() => {
    if (!draws.length) {
      router.replace("/reading");
      return;
    }
    if (reduce) return;
    // 定时逐张翻开（动画驱动，setState 源自定时器回调，非渲染期同步更新）
    const timers = draws.map((_, i) =>
      setTimeout(() => setRevealedCount((c) => Math.max(c, i + 1)), 700 + i * 750)
    );
    return () => timers.forEach(clearTimeout);
  }, [draws, reduce, router]);

  const revealAll = () => setRevealedCount(total); // 点击跳过动画

  if (!draws.length || !spreadId || !category) return null;
  const spread = getSpread(spreadId);

  const handleSave = () => {
    add({
      id: newReadingId(),
      createdAt: new Date().toISOString(),
      category,
      question,
      spreadId,
      draws,
      aiReading: aiReading || undefined,
      favorite: false,
    });
    setSaved(true);
  };

  const handleAgain = () => {
    reset();
    router.push("/reading");
  };

  const handleShare = async () => {
    if (sharing) return;
    setSharing(true);
    try {
      const sp = getSpread(spreadId);
      const blob = await generateShareImage({
        appName: t("app.name"),
        tagline: t("app.tagline"),
        question,
        spreadName: sp ? spreadName(sp, locale) : "",
        items: draws.map((d) => {
          const card = getCard(d.cardId);
          const pos = sp?.positions.find((p) => p.index === d.position);
          return {
            label: positionLabel(pos, locale) ?? "",
            name: card ? cardName(card, locale) : d.cardId,
            en: card ? cardSub(card, locale) : "",
            reversed: d.reversed,
          };
        }),
        dateLabel: new Date().toLocaleDateString(),
        disclaimer: t("disclaimer.body"),
        reversedText: t("result.reversed"),
        uprightText: t("result.upright"),
      });
      const copied = await copyImageToClipboard(blob);
      if (!copied) downloadBlob(blob, `moonspeak-${Date.now()}.png`);
      setShareMsg(copied ? t("result.shareCopied") : t("result.shareSaved"));
      setTimeout(() => setShareMsg(""), 2500);
    } catch {
      setShareMsg(locale === "zh" ? "生成失败" : "Failed");
      setTimeout(() => setShareMsg(""), 2500);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="space-y-8 py-4">
      <header className="text-center">
        <h2 className="text-shimmer font-serif text-2xl">{t("result.title")}</h2>
        {question && <p className="mt-1 text-sm text-fg-muted">「{question}」</p>}
      </header>

      {/* 牌面：按牌阵位置摆放，响应式缩放，交错入场 + 自动依次翻开（点击可跳过） */}
      <SpreadBoard
        draws={draws}
        spread={spread}
        revealedCount={revealedCount}
        revealAll={revealAll}
        reduce={!!reduce}
        locale={locale}
      />

      {!allRevealed && (
        <p className="text-center text-xs text-fg-muted/70">
          {t("result.revealing")}
        </p>
      )}

      {/* 翻牌完成后才展开解读 */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {spread && (
              <p className="rounded-xl border border-border bg-bg-elev/60 p-4 text-center text-xs leading-relaxed text-fg-muted">
                {spreadHowTo(spread, locale)}
              </p>
            )}

            {/* 固定牌义（P0，离线） */}
            <section className="space-y-4">
              <h3 className="font-serif text-lg text-gold-soft">
                {t("result.fixedMeaning")}
              </h3>
              {draws.map((d) => {
                const card = getCard(d.cardId);
                const pos = spread?.positions.find((p) => p.index === d.position);
                if (!card) return null;
                const label = positionLabel(pos, locale);
                return (
                  <article
                    key={d.position}
                    className="rounded-xl border border-border bg-bg-elev p-4"
                  >
                    <div className="mb-1 flex items-baseline justify-between">
                      <span className="font-serif text-base text-fg">
                        {label ? `${label} · ` : ""}
                        {cardName(card, locale)}
                        <span className="ml-1 text-xs italic text-fg-muted">
                          {cardSub(card, locale)}
                        </span>
                      </span>
                      <span
                        className={`text-xs ${d.reversed ? "text-danger" : "text-gold"}`}
                      >
                        {d.reversed ? t("result.reversed") : t("result.upright")}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {getMeaning(card, category as Category, d.reversed, locale)}
                    </p>
                  </article>
                );
              })}
            </section>

            {/* AI 深度解读（P1 · 按需触发、流式输出、结果缓存） */}
            <AiReadingSection
              category={category}
              question={question}
              spreadId={spreadId}
              draws={draws}
              cached={aiReading}
              onDone={setAiReading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 操作 */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={handleSave}
          disabled={saved}
          className="rounded-full border border-gold/60 px-6 py-2.5 font-serif text-gold transition-colors hover:bg-gold/10 disabled:opacity-50"
        >
          {saved ? "✓" : t("result.save")}
        </button>
        {allRevealed && (
          <button
            onClick={handleShare}
            disabled={sharing}
            className="rounded-full border border-gold/60 px-6 py-2.5 font-serif text-gold transition-colors hover:bg-gold/10 disabled:opacity-50"
          >
            {sharing ? t("result.sharing") : shareMsg || t("result.share")}
          </button>
        )}
        <button
          onClick={handleAgain}
          className="rounded-full bg-gold px-6 py-2.5 font-serif text-bg transition-opacity hover:opacity-90"
        >
          {t("result.again")}
        </button>
      </div>

      <p className="text-center text-xs leading-relaxed text-fg-muted/70">
        {t("disclaimer.body")}
      </p>
    </div>
  );
}

// 牌阵画板配置：size = 卡宽/画板宽，h = 画板高/画板宽（竖版避免多行重叠）
function boardCfg(count: number): { size: number; h: number; maxW: number } {
  if (count <= 1) return { size: 0.5, h: 0.85, maxW: 220 };
  if (count === 3) return { size: 0.26, h: 0.55, maxW: 520 };
  if (count === 4) return { size: 0.25, h: 1.35, maxW: 420 };
  if (count === 5) return { size: 0.2, h: 1.6, maxW: 440 };
  if (count >= 6) return { size: 0.13, h: 1.4, maxW: 560 };
  return { size: 0.32, h: 0.9, maxW: 360 };
}

/** 位置坐标内缩，避免卡片贴边/被裁 */
function inset(v: number, pad: number): number {
  return pad + v * (1 - 2 * pad);
}

function SpreadBoard({
  draws,
  spread,
  revealedCount,
  revealAll,
  reduce,
  locale,
}: {
  draws: import("@/types/tarot").Draw[];
  spread: import("@/types/tarot").Spread | undefined;
  revealedCount: number;
  revealAll: () => void;
  reduce: boolean;
  locale: "zh" | "en";
}) {
  const count = draws.length;
  const cfg = boardCfg(count);
  const ref = useRef<HTMLDivElement>(null);
  const [boardW, setBoardW] = useState(cfg.maxW);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setBoardW(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardPx = Math.max(44, Math.round(boardW * cfg.size));
  const showLabel = count <= 4;

  return (
    <div
      ref={ref}
      className="relative mx-auto my-2 w-full"
      style={{ maxWidth: cfg.maxW, height: boardW * cfg.h }}
    >
      {draws.map((d, i) => {
        const pos = spread?.positions.find((p) => p.index === d.position);
        const x = inset(pos?.layout.x ?? 0.5, 0.06);
        const y = inset(pos?.layout.y ?? 0.5, 0.06);
        // 凯尔特十字：挑战牌横压在现状牌上（旋转 90°）
        const rot =
          spread?.id === "celtic-cross" && d.position === 1 ? 90 : 0;
        return (
          <div
            key={d.position}
            className="absolute"
            style={{
              left: `${x * 100}%`,
              top: `${y * 100}%`,
              transform: `translate(-50%, -50%) rotate(${rot}deg)`,
              zIndex: rot ? 5 : 1,
            }}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : i * 0.1, duration: 0.4 }}
            >
              <RevealCard
                cardId={d.cardId}
                reversed={d.reversed}
                positionLabel={showLabel ? positionLabel(pos, locale) : undefined}
                revealed={i < revealedCount}
                onReveal={revealAll}
                size={cardPx}
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/** 3D 翻牌：翻开状态由父级驱动（自动依次翻开），点击可跳过动画 */
function RevealCard({
  cardId,
  reversed,
  positionLabel,
  revealed,
  onReveal,
  size = 104,
}: {
  cardId: string;
  reversed: boolean;
  positionLabel?: string;
  revealed: boolean;
  onReveal: () => void;
  size?: number;
}) {
  const card = getCard(cardId);
  return (
    <FlipCard
      card={card}
      reversed={reversed}
      revealed={revealed}
      positionLabel={positionLabel}
      size={size}
      onReveal={onReveal}
    />
  );
}

/** AI 深度解读区：按需触发，流式吐字，完成后缓存 */
function AiReadingSection({
  category,
  question,
  spreadId,
  draws,
  cached,
  onDone,
}: {
  category: Category;
  question: string;
  spreadId: string;
  draws: import("@/types/tarot").Draw[];
  cached: string;
  onDone: (text: string) => void;
}) {
  const t = useT();
  const locale = useSettings((s) => s.locale);
  const [text, setText] = useState(cached);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(!!cached);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const run = async () => {
    if (running) return;
    setRunning(true);
    setDone(false);
    setText("");
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const ctx = buildContext(category, question, spreadId, draws, locale);
    let acc = "";
    try {
      for await (const chunk of getInterpreter()(ctx, ctrl.signal)) {
        acc += chunk;
        setText(acc);
      }
    } finally {
      if (!ctrl.signal.aborted) {
        setRunning(false);
        setDone(true);
        onDone(acc);
      }
    }
  };

  return (
    <section className="rounded-xl border border-dashed border-accent/40 bg-accent/5 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-base text-accent">{t("result.aiReading")}</h3>
        {isPlaceholderAI && (
          <span className="text-[10px] text-fg-muted/70">
            {t("result.aiComingSoon")}
          </span>
        )}
      </div>

      {!text && !running && (
        <button
          onClick={run}
          className="mt-3 w-full rounded-full bg-accent/80 py-2.5 font-serif text-sm text-bg transition-opacity hover:opacity-90"
        >
          ✦ {t("result.aiReading")}
        </button>
      )}

      {(text || running) && (
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-fg">
          {text}
          {running && <span className="ml-0.5 animate-pulse text-accent">▍</span>}
        </p>
      )}

      {done && (
        <button
          onClick={run}
          className="mt-3 text-xs text-fg-muted hover:text-accent"
        >
          ↻ {t("result.reRead")}
        </button>
      )}
    </section>
  );
}
