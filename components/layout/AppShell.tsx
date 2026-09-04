"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { useSettings } from "@/lib/store/settings";
import { PWARegister } from "./PWARegister";
import { DisclaimerGate } from "./DisclaimerGate";
import type { DictKey } from "@/lib/i18n/dict";

const NAV: { href: string; key: DictKey }[] = [
  { href: "/", key: "nav.home" },
  { href: "/reading", key: "nav.reading" },
  { href: "/daily", key: "nav.daily" },
  { href: "/history", key: "nav.history" },
  { href: "/library", key: "nav.library" },
  { href: "/settings", key: "nav.settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const t = useT();
  const pathname = usePathname();
  const { locale, toggleLocale, theme } = useSettings();

  // 持久化的主题同步到 <html data-theme>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="flex min-h-full flex-col">
      <PWARegister />
      <DisclaimerGate />
      <header className="sticky top-0 z-20 border-b border-border/60 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="font-serif text-lg tracking-wide text-gold">
            {t("app.name")}
          </Link>
          <button
            onClick={toggleLocale}
            className="rounded-full border border-border px-3 py-1 text-xs text-fg-muted transition-colors hover:border-gold hover:text-gold"
            aria-label="toggle language"
          >
            {locale === "zh" ? "EN" : "中"}
          </button>
        </div>
        {/* 顶部导航 */}
        <nav className="border-t border-border/40">
          <div className="mx-auto flex max-w-3xl items-stretch overflow-x-auto px-2">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex-1 whitespace-nowrap px-3 py-2.5 text-center text-sm transition-colors ${
                    active ? "text-gold" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {t(item.key)}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
