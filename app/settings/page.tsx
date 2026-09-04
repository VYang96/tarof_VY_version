"use client";
import { useEffect } from "react";
import { useSettings } from "@/lib/store/settings";
import { useT } from "@/lib/i18n";

export default function SettingsPage() {
  const t = useT();
  const {
    locale,
    setLocale,
    theme,
    setTheme,
    reversedEnabled,
    setReversedEnabled,
  } = useSettings();

  // 主题落到 <html data-theme>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="space-y-6 py-4">
      <h2 className="font-serif text-2xl text-gold">{t("nav.settings")}</h2>

      <Row label={t("settings.language")}>
        <Segmented
          options={[
            { value: "zh", label: "中文" },
            { value: "en", label: "English" },
          ]}
          value={locale}
          onChange={(v) => setLocale(v as "zh" | "en")}
        />
      </Row>

      <Row label={t("settings.theme")}>
        <Segmented
          options={[
            { value: "dark", label: "星空" },
            { value: "candle", label: "烛光" },
          ]}
          value={theme}
          onChange={(v) => setTheme(v as "dark" | "candle")}
        />
      </Row>

      <Row label={t("settings.reversed")}>
        <button
          onClick={() => setReversedEnabled(!reversedEnabled)}
          className={`h-7 w-12 rounded-full border transition-colors ${
            reversedEnabled ? "border-gold bg-gold/30" : "border-border bg-bg-elev"
          }`}
          role="switch"
          aria-checked={reversedEnabled}
        >
          <span
            className={`block h-5 w-5 rounded-full bg-gold transition-transform ${
              reversedEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </Row>

      <div className="rounded-xl border border-border bg-bg-elev p-4">
        <h3 className="font-serif text-sm text-gold-soft">
          {t("disclaimer.title")}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-fg-muted">
          {t("disclaimer.body")}
        </p>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-bg-elev p-4">
      <span className="text-sm text-fg">{label}</span>
      {children}
    </div>
  );
}

function Segmented({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex overflow-hidden rounded-full border border-border">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-4 py-1.5 text-xs transition-colors ${
            value === o.value ? "bg-gold text-bg" : "text-fg-muted hover:text-fg"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
