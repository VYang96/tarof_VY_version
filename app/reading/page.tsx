"use client";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useReading } from "@/lib/store/reading";
import { useSettings } from "@/lib/store/settings";
import { useT } from "@/lib/i18n";
import { CATEGORIES, SPREADS, getSpread } from "@/lib/data";
import { TarotCard } from "@/components/card/TarotCard";
import { checkSafety } from "@/lib/safety";
import { useState } from "react";
import type { Category } from "@/types/tarot";

export default function ReadingPage() {
  const t = useT();
  const locale = useSettings((s) => s.locale);
  const { step, category, spreadId, setCategory, setSpread, goTo } = useReading();

  return (
    <div className="py-4">
      {step === "category" && (
        <StepCategory
          onPick={(c) => setCategory(c)}
          label={t("flow.chooseCategory")}
          locale={locale}
        />
      )}
      {step === "question" && <StepQuestion />}
      {step === "spread" && (
        <StepSpread
          category={category}
          onPick={(id) => setSpread(id)}
          onBack={() => goTo("question")}
        />
      )}
      {step === "draw" && <StepDraw spreadId={spreadId} />}
    </div>
  );
}

function StepCategory({
  onPick,
  label,
  locale,
}: {
  onPick: (c: Category) => void;
  label: string;
  locale: "zh" | "en";
}) {
  return (
    <section className="space-y-6">
      <h2 className="text-shimmer text-center font-serif text-2xl">{label}</h2>
      <motion.div
        className="grid grid-cols-2 gap-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {CATEGORIES.map((c) => (
          <motion.button
            key={c.id}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPick(c.id)}
            className="glow-gold rounded-xl border border-border bg-bg-elev p-5 text-center transition-colors hover:border-gold"
          >
            <span className="font-serif text-lg text-fg">
              {locale === "zh" ? c.zh : c.en}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}

function StepQuestion() {
  const t = useT();
  const { question, setQuestion, goTo } = useReading();
  const [safetyBlock, setSafetyBlock] = useState(false);

  const handleNext = () => {
    if (checkSafety(question) === "crisis") {
      setSafetyBlock(true);
      return;
    }
    goTo("spread");
  };

  if (safetyBlock) {
    return (
      <section className="space-y-5 rounded-2xl border border-danger/40 bg-danger/5 p-6 text-center">
        <div className="text-3xl">🕊️</div>
        <h2 className="font-serif text-xl text-fg">{t("safety.title")}</h2>
        <p className="text-sm leading-relaxed text-fg-muted">{t("safety.body")}</p>
        <p className="text-xs leading-relaxed text-fg-muted/80">
          {t("safety.resources")}
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setSafetyBlock(false)}
            className="rounded-full bg-gold px-6 py-2.5 font-serif text-bg transition-opacity hover:opacity-90"
          >
            {t("safety.back")}
          </button>
          <button
            onClick={() => goTo("spread")}
            className="rounded-full border border-border px-6 py-2.5 text-sm text-fg-muted hover:text-fg"
          >
            {t("safety.continue")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <h2 className="text-shimmer text-center font-serif text-2xl">
        {t("flow.question")}
      </h2>
      <p className="text-center text-xs leading-relaxed text-fg-muted">
        {t("flow.questionHint")}
      </p>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={t("flow.questionPlaceholder")}
        rows={3}
        className="w-full rounded-xl border border-border bg-bg-elev p-4 text-fg placeholder:text-fg-muted/60 focus:border-gold focus:outline-none"
      />
      <div className="flex justify-center gap-3">
        <button
          onClick={handleNext}
          className="press glow-gold rounded-full bg-gold px-8 py-2.5 font-serif text-bg hover:opacity-90"
        >
          {t("flow.next")}
        </button>
      </div>
    </section>
  );
}

function StepSpread({
  category,
  onPick,
  onBack,
}: {
  category: Category | null;
  onPick: (id: string) => void;
  onBack: () => void;
}) {
  const t = useT();
  // 按类别推荐，但都可选
  const spreads = SPREADS.filter(
    (s) => !category || s.bestFor.includes(category)
  );
  const list = spreads.length ? spreads : SPREADS;
  return (
    <section className="space-y-5">
      <h2 className="text-shimmer text-center font-serif text-2xl">
        {t("flow.chooseSpread")}
      </h2>
      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        {list.map((s) => (
          <motion.button
            key={s.id}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPick(s.id)}
            className="glow-gold w-full rounded-xl border border-border bg-bg-elev p-4 text-left transition-colors hover:border-gold"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg text-fg">{s.name}</span>
              <span className="rounded-full border border-gold/30 px-2 py-0.5 text-xs text-gold-soft">
                {s.cardCount} 张
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-fg-muted">
              {s.howToRead}
            </p>
          </motion.button>
        ))}
      </motion.div>
      <button
        onClick={onBack}
        className="press mx-auto block text-xs text-fg-muted hover:text-fg"
      >
        ← {t("flow.question")}
      </button>
    </section>
  );
}

function StepDraw({ spreadId }: { spreadId: string | null }) {
  const t = useT();
  const router = useRouter();
  const reduce = useReducedMotion();
  const { performDraw } = useReading();
  const { reversedEnabled, reversedRate } = useSettings();
  const [shuffled, setShuffled] = useState(false);
  const spread = spreadId ? getSpread(spreadId) : undefined;

  if (!spread) return null;

  const handleDraw = () => {
    performDraw(spread.cardCount, reversedEnabled ? reversedRate : 0);
    router.push("/result");
  };

  return (
    <section className="flex flex-col items-center gap-8">
      <h2 className="text-shimmer text-center font-serif text-2xl">{spread.name}</h2>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: spread.cardCount }).map((_, i) => (
          <motion.div
            key={i}
            animate={
              reduce
                ? undefined
                : shuffled
                  ? { y: 0, rotate: 0, opacity: 1 }
                  : { rotate: [0, -3, 3, -2, 0] }
            }
            transition={
              shuffled
                ? { delay: i * 0.1, type: "spring", stiffness: 200 }
                : { duration: 0.6, repeat: Infinity, repeatDelay: 1.2 }
            }
            initial={reduce ? false : { y: shuffled ? -12 : 0, opacity: 1 }}
          >
            <TarotCard faceDown size={92} />
          </motion.div>
        ))}
      </div>

      {!shuffled ? (
        <button
          onClick={() => setShuffled(true)}
          className="press rounded-full border border-gold/60 px-8 py-2.5 font-serif text-gold transition-colors hover:bg-gold/10"
        >
          {t("flow.shuffle")}
        </button>
      ) : (
        <motion.button
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleDraw}
          className="glow-gold rounded-full bg-gold px-10 py-3 font-serif text-lg text-bg hover:opacity-90"
        >
          {t("flow.draw")}
        </motion.button>
      )}
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
