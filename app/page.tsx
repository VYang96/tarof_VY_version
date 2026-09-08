"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useT } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/dict";

const FEATURES: { icon: string; title: DictKey; desc: DictKey }[] = [
  { icon: "☾", title: "home.f1.title", desc: "home.f1.desc" },
  { icon: "✦", title: "home.f2.title", desc: "home.f2.desc" },
  { icon: "❖", title: "home.f3.title", desc: "home.f3.desc" },
];

export default function HomePage() {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-12 py-6 text-center">
      {/* Hero：有 /hero.png 时展示插画，无图则回退到星空渐层 */}
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
        {/* 底部压暗层，保证文字对比度（图片自带月亮，不再叠符号） */}
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

      {/* 主 CTA */}
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

      {/* 三个价值点 */}
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

      <Link
        href="/pricing"
        className="press font-serif text-sm text-gold-soft hover:text-gold"
      >
        {t("home.plusLink")}
      </Link>

      <p className="max-w-sm text-xs leading-relaxed text-fg-muted/80">
        {t("disclaimer.body")}
      </p>
    </div>
  );
}

const fadeUp = {
  hidden: { y: 16 },
  show: { y: 0, transition: { duration: 0.4 } },
};
