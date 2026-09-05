"use client";
import { useMemo, useState } from "react";
import { CARDS, CATEGORIES, getMeaning, cardName, cardSub, cardKeywords } from "@/lib/data";
import { TarotCard } from "@/components/card/TarotCard";
import { useT } from "@/lib/i18n";
import { useSettings } from "@/lib/store/settings";
import type { DictKey } from "@/lib/i18n/dict";
import type { Card } from "@/types/tarot";

const GROUPS: { key: string; labelKey: DictKey; match: (c: Card) => boolean }[] = [
  { key: "major", labelKey: "library.group.major", match: (c) => c.arcana === "major" },
  { key: "wands", labelKey: "library.group.wands", match: (c) => c.suit === "wands" },
  { key: "cups", labelKey: "library.group.cups", match: (c) => c.suit === "cups" },
  { key: "swords", labelKey: "library.group.swords", match: (c) => c.suit === "swords" },
  { key: "pentacles", labelKey: "library.group.pentacles", match: (c) => c.suit === "pentacles" },
];

export default function LibraryPage() {
  const t = useT();
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState<Card | null>(null);

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return CARDS;
    return CARDS.filter(
      (c) =>
        c.name.includes(kw) ||
        c.en.toLowerCase().includes(kw) ||
        c.keywords.some((k) => k.toLowerCase().includes(kw)) ||
        (c.keywordsEn ?? []).some((k) => k.toLowerCase().includes(kw))
    );
  }, [q]);

  return (
    <div className="space-y-6 py-4">
      <h2 className="text-shimmer font-serif text-2xl">{t("library.title")}</h2>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("library.search")}
        className="w-full rounded-xl border border-border bg-bg-elev p-3 text-sm text-fg placeholder:text-fg-muted/60 focus:border-gold focus:outline-none"
      />

      {GROUPS.map((g) => {
        const cards = filtered.filter(g.match);
        if (!cards.length) return null;
        return (
          <section key={g.key} className="space-y-3">
            <h3 className="font-serif text-sm text-gold-soft">{t(g.labelKey)}</h3>
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
              {cards.map((c) => (
                <TarotCard
                  key={c.id}
                  card={c}
                  fluid
                  onClick={() => setDetail(c)}
                />
              ))}
            </div>
          </section>
        );
      })}

      {detail && <CardDetail card={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}

function CardDetail({ card, onClose }: { card: Card; onClose: () => void }) {
  const t = useT();
  const locale = useSettings((s) => s.locale);
  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[80vh] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-bg-elev p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <TarotCard card={card} size={96} />
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-xl text-fg">
              {cardName(card, locale)}
            </h3>
            <p className="font-serif text-sm italic text-fg-muted">
              {cardSub(card, locale)}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {cardKeywords(card, locale).map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-gold/40 px-2 py-0.5 text-xs text-gold-soft"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="rounded-xl border border-border p-3">
              <div className="mb-1 font-serif text-sm text-gold-soft">
                {locale === "zh" ? cat.zh : cat.en}
              </div>
              <p className="text-xs leading-relaxed text-fg-muted">
                <span className="text-gold">{t("card.uprightShort")}</span>{" "}
                {getMeaning(card, cat.id, false, locale)}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-fg-muted">
                <span className="text-danger">{t("card.reversedShort")}</span>{" "}
                {getMeaning(card, cat.id, true, locale)}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-full border border-border py-2 text-sm text-fg-muted hover:text-fg"
        >
          {t("common.close")}
        </button>
      </div>
    </div>
  );
}
