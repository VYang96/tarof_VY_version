"use client";
import Link from "next/link";
import { useT } from "@/lib/i18n";

export default function HomePage() {
  const t = useT();
  return (
    <div className="flex flex-col items-center gap-10 py-8 text-center">
      {/* Hero：chibi 牌阵样张 */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-gold/30">
        <div
          className="aspect-[16/7] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/deck-sheet.jpeg')" }}
          aria-hidden
        />
        {/* 渐层压暗，让底部文字清晰、弱化样张细节 */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-center">
          <h1 className="font-serif text-3xl tracking-wide text-gold drop-shadow">
            {t("app.name")}
          </h1>
          <p className="mt-1 text-sm text-fg-muted drop-shadow">
            {t("app.tagline")}
          </p>
        </div>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        <Link
          href="/reading"
          className="rounded-full bg-gold py-3 font-serif text-base text-bg transition-opacity hover:opacity-90"
        >
          {t("home.start")}
        </Link>
        <Link
          href="/daily"
          className="rounded-full border border-gold/50 py-3 font-serif text-base text-gold transition-colors hover:bg-gold/10"
        >
          {t("home.daily")}
        </Link>
      </div>

      <p className="max-w-sm text-xs leading-relaxed text-fg-muted/80">
        {t("disclaimer.body")}
      </p>
    </div>
  );
}
