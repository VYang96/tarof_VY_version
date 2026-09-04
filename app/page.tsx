"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function HomePage() {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-10 py-8 text-center">
      {/* Hero：chibi 牌阵样张 */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden rounded-2xl border border-gold/30 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
      >
        <div
          className="ken-burns aspect-[16/7] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/deck-sheet.jpeg')" }}
          aria-hidden
        />
        {/* 渐层压暗，让底部文字清晰、弱化样张细节 */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-center">
          <h1 className="text-shimmer font-serif text-3xl tracking-wide drop-shadow">
            {t("app.name")}
          </h1>
          <p className="mt-1 text-sm text-fg-muted drop-shadow">
            {t("app.tagline")}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="flex w-full max-w-xs flex-col gap-3"
        initial={reduce ? false : "hidden"}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
        }}
      >
        <motion.div variants={fadeUp}>
          <Link
            href="/reading"
            className="press glow-gold block rounded-full bg-gold py-3 font-serif text-base text-bg hover:opacity-90"
          >
            {t("home.start")}
          </Link>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Link
            href="/daily"
            className="press block rounded-full border border-gold/50 py-3 font-serif text-base text-gold transition-colors hover:bg-gold/10"
          >
            {t("home.daily")}
          </Link>
        </motion.div>
      </motion.div>

      <p className="max-w-sm text-xs leading-relaxed text-fg-muted/80">
        {t("disclaimer.body")}
      </p>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
