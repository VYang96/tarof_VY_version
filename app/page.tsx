"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { useAuth } from "@/lib/store/auth";
import { useSettings } from "@/lib/store/settings";
import { useReading } from "@/lib/store/reading";
import { useHistory } from "@/lib/store/history";
import { useDaily, dateKey } from "@/lib/store/daily";
import { CARDS, getCard, cardName, CATEGORIES, getSpread } from "@/lib/data";
import { FlipCard } from "@/components/card/FlipCard";
import type { DictKey } from "@/lib/i18n/dict";
import type { Category } from "@/types/tarot";

export default function HomePage() {
  const user = useAuth((s) => s.user);
  const hydrated = useAuth((s) => s.hydrated);
  // 未回填前按访客渲染（与 SSR 一致，避免闪烁）；登录用户看应用主页
  return hydrated && user ? <AppHome /> : <Landing />;
}

/* ───────────────────────── 访客落地页 ───────────────────────── */

const FEATURES: { icon: string; title: DictKey; desc: DictKey }[] = [
  { icon: "☾", title: "home.f1.title", desc: "home.f1.desc" },
  { icon: "✦", title: "home.f2.title", desc: "home.f2.desc" },
  { icon: "❖", title: "home.f3.title", desc: "home.f3.desc" },
];

function Landing() {
  const t = useT();
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col items-center gap-12 py-6 text-center">
      <motion.section
        initial={reduce ? false : { scale: 0.99 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden rounded-3xl border border-gold/25"
      >
        <div
          className="ken-burns min-h-[340px] w-full bg-bg-elev bg-cover bg-center sm:min-h-[420px]"
          style={{
            backgroundImage:
              "url('/hero.webp'), radial-gradient(ellipse at 50% 30%, rgba(138,124,196,0.35), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(214,172,87,0.14), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-6 pb-7 text-center">
          <h1 className="text-shimmer font-serif text-4xl tracking-wide [text-shadow:0_2px_16px_rgba(0,0,0,0.85)]">
            {t("app.name")}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-fg [text-shadow:0_1px_10px_rgba(0,0,0,0.9)]">
            {t("home.hook")}
          </p>
        </div>
      </motion.section>

      <motion.div
        className="flex w-full max-w-xs flex-col gap-3"
        initial={reduce ? false : "hidden"}
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
      >
        <motion.div variants={fadeUp}>
          <Link
            href="/reading"
            className="press glow-gold block rounded-full bg-gold py-3.5 font-serif text-base text-bg hover:opacity-90"
          >
            {t("home.start")}
          </Link>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Link
            href="/daily"
            className="press block rounded-full border border-gold/50 py-3.5 font-serif text-base text-gold transition-colors hover:bg-gold/10"
          >
            {t("home.daily")}
          </Link>
        </motion.div>
      </motion.div>

      <section className="grid w-full gap-3 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-border bg-bg-elev/70 p-5 text-center"
          >
            <div className="text-2xl text-gold" aria-hidden>
              {f.icon}
            </div>
            <div className="mt-2 font-serif text-base text-fg">{t(f.title)}</div>
            <p className="mt-1 text-xs leading-relaxed text-fg-muted">{t(f.desc)}</p>
          </div>
        ))}
      </section>

      <Link href="/pricing" className="press font-serif text-sm text-gold-soft hover:text-gold">
        {t("home.plusLink")}
      </Link>

      <p className="max-w-sm text-xs leading-relaxed text-fg-muted/80">{t("disclaimer.body")}</p>
    </div>
  );
}

/* ───────────────────────── 登录后应用主页 ───────────────────────── */

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function AppHome() {
  const t = useT();
  const router = useRouter();
  const locale = useSettings((s) => s.locale);
  const { reset, setCategory } = useReading();
  const readings = useHistory((s) => s.readings);
  const { seed, record, streak, ensureSeed } = useDaily();

  useEffect(() => {
    ensureSeed(); // 确保每日一牌的设备种子已生成
  }, [ensureSeed]);

  // 今日一牌（与 /daily 一致的确定性算法）
  const today = dateKey();
  const alreadyToday = record?.date === today;
  const s = seed || "seedless";
  const daily = alreadyToday && record ? getCard(record.cardId) ?? CARDS[0] : CARDS[hash(s + today) % CARDS.length];
  const dailyReversed = alreadyToday && record ? record.reversed : hash(s + today + "r") % 2 === 1;

  const quickStart = (c: Category) => {
    reset();
    setCategory(c); // 进入 → 直接到"输入问题"步
    router.push("/reading");
  };

  return (
    <div className="space-y-8 py-2">
      {/* 问候 */}
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-shimmer font-serif text-3xl">{t("home.welcome")}</h1>
          {streak > 0 && (
            <p className="mt-1 text-xs text-gold-soft">
              ✦ {locale === "zh" ? `连续签到 ${streak} 天` : `${streak}-day streak`}
            </p>
          )}
        </div>
      </header>

      {/* 今日一牌 */}
      <section className="rounded-2xl border border-border bg-bg-elev/60 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-lg text-gold-soft">{t("home.daily")}</h2>
          <Link href="/daily" className="press text-xs text-fg-muted hover:text-gold">
            {t("home.seeAll")}
          </Link>
        </div>
        <Link href="/daily" className="flex items-center gap-4">
          <FlipCard
            card={daily}
            reversed={dailyReversed}
            revealed={alreadyToday}
            size={92}
          />
          <div className="min-w-0 flex-1">
            {alreadyToday ? (
              <>
                <div className="font-serif text-base text-fg">{cardName(daily, locale)}</div>
                <div className="text-xs text-fg-muted">{today}</div>
              </>
            ) : (
              <div className="text-sm text-fg-muted">{t("home.tapReveal")}</div>
            )}
          </div>
        </Link>
      </section>

      {/* 快速占卜 */}
      <section>
        <h2 className="mb-3 font-serif text-lg text-gold-soft">{t("home.quickStart")}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((c) => (
            <motion.button
              key={c.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => quickStart(c.id)}
              className="glow-gold rounded-xl border border-border bg-bg-elev p-4 text-center font-serif text-sm text-fg transition-colors hover:border-gold"
            >
              {locale === "zh" ? c.zh : c.en}
            </motion.button>
          ))}
        </div>
        <Link
          href="/reading"
          onClick={() => reset()}
          className="press glow-gold mt-3 block rounded-full bg-gold py-3 text-center font-serif text-bg hover:opacity-90"
        >
          {t("home.start")}
        </Link>
      </section>

      {/* 最近记录 */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-lg text-gold-soft">{t("home.recent")}</h2>
          {readings.length > 0 && (
            <Link href="/history" className="press text-xs text-fg-muted hover:text-gold">
              {t("home.seeAll")}
            </Link>
          )}
        </div>
        {readings.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-fg-muted">
            {t("home.noRecent")}
          </p>
        ) : (
          <div className="space-y-2">
            {readings.slice(0, 3).map((r) => {
              const sp = getSpread(r.spreadId);
              const cat = CATEGORIES.find((c) => c.id === r.category);
              return (
                <Link
                  key={r.id}
                  href="/history"
                  className="press flex items-center justify-between rounded-xl border border-border bg-bg-elev p-3 text-sm hover:border-gold/50"
                >
                  <span className="min-w-0 truncate text-fg">
                    {r.question || (cat ? (locale === "zh" ? cat.zh : cat.en) : "")}
                  </span>
                  <span className="ml-3 shrink-0 text-xs text-fg-muted">
                    {sp?.name ? "" : ""}
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <p className="text-center text-xs leading-relaxed text-fg-muted/70">
        {t("disclaimer.body")}
      </p>
    </div>
  );
}

const fadeUp = {
  hidden: { y: 16 },
  show: { y: 0, transition: { duration: 0.4 } },
};
