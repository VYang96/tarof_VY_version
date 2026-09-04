"use client";
import { useHistory } from "@/lib/store/history";
import { useSettings } from "@/lib/store/settings";
import { useT } from "@/lib/i18n";
import { getCard, getSpread, CATEGORIES } from "@/lib/data";

export default function HistoryPage() {
  const t = useT();
  const locale = useSettings((s) => s.locale);
  const { readings, remove, toggleFavorite } = useHistory();

  if (!readings.length) {
    return (
      <div className="py-16 text-center text-sm text-fg-muted">
        {t("history.empty")}
      </div>
    );
  }

  return (
    <div className="space-y-3 py-4">
      <h2 className="font-serif text-2xl text-gold">{t("nav.history")}</h2>
      {readings.map((r) => {
        const spread = getSpread(r.spreadId);
        const cat = CATEGORIES.find((c) => c.id === r.category);
        return (
          <article
            key={r.id}
            className="rounded-xl border border-border bg-bg-elev p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-fg-muted">
                  <span className="rounded-full border border-border px-2 py-0.5">
                    {cat ? (locale === "zh" ? cat.zh : cat.en) : r.category}
                  </span>
                  <span>{spread?.name}</span>
                  <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                {r.question && (
                  <p className="mt-1 truncate text-sm text-fg">「{r.question}」</p>
                )}
                <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                  {r.draws.map((d) => {
                    const card = getCard(d.cardId);
                    return (
                      <span
                        key={d.position}
                        className="rounded border border-border px-1.5 py-0.5 text-fg-muted"
                      >
                        {card?.name}
                        {d.reversed ? "(逆)" : ""}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <button
                  onClick={() => toggleFavorite(r.id)}
                  className={`text-lg ${r.favorite ? "text-gold" : "text-fg-muted"}`}
                  aria-label={t("history.favorite")}
                >
                  {r.favorite ? "★" : "☆"}
                </button>
                <button
                  onClick={() => remove(r.id)}
                  className="text-xs text-fg-muted hover:text-danger"
                >
                  删除
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
