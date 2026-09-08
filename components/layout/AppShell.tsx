"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { useSettings } from "@/lib/store/settings";
import { useAuth } from "@/lib/store/auth";
import { PWARegister } from "./PWARegister";
import { DisclaimerGate } from "./DisclaimerGate";
import type { DictKey } from "@/lib/i18n/dict";

// 登录后可见的应用导航（历史已隐藏，按需可恢复）
const NAV: { href: string; key: DictKey }[] = [
  { href: "/", key: "nav.home" },
  { href: "/reading", key: "nav.reading" },
  { href: "/daily", key: "nav.daily" },
  { href: "/library", key: "nav.library" },
  { href: "/pricing", key: "nav.pricing" },
  { href: "/settings", key: "nav.settings" },
];

// 无需登录即可访问的公开路由
const PUBLIC = ["/", "/login", "/pricing"];
function isPublic(pathname: string) {
  return PUBLIC.includes(pathname) || pathname.startsWith("/pricing");
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const t = useT();
  const pathname = usePathname();
  const router = useRouter();
  const { locale, toggleLocale, theme } = useSettings();
  const { user, hydrated, signOut } = useAuth();

  // 持久化的主题同步到 <html data-theme>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // 鉴权网关：未登录访问受保护页 → 跳登录（等本地存储回填后再判断）
  useEffect(() => {
    if (!hydrated) return;
    if (!user && !isPublic(pathname)) {
      const next = encodeURIComponent(pathname);
      router.replace(`/login?next=${next}`);
    }
  }, [hydrated, user, pathname, router]);

  const showNav = !!user;

  const handleLogout = () => {
    signOut();
    router.replace("/");
  };

  return (
    <div className="flex min-h-full flex-col">
      <PWARegister />
      <DisclaimerGate />
      <header className="sticky top-0 z-20 border-b border-border/60 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-shimmer font-serif text-lg tracking-wide">
            {t("app.name")}
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLocale}
              className="press rounded-full border border-border px-3 py-1 text-xs text-fg-muted transition-colors hover:border-gold hover:text-gold"
              aria-label="toggle language"
            >
              {locale === "zh" ? "EN" : "中"}
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="press rounded-full border border-border px-3 py-1 text-xs text-fg-muted transition-colors hover:border-gold hover:text-gold"
              >
                {t("nav.logout")}
              </button>
            ) : (
              <>
                {/* 登录前的营销导航 */}
                <Link
                  href="/pricing"
                  className="press hidden px-2 text-xs text-fg-muted transition-colors hover:text-gold sm:inline"
                >
                  {t("nav.pricing")}
                </Link>
                <Link
                  href="/login"
                  className="press rounded-full bg-gold px-4 py-1.5 text-xs font-medium text-bg transition-opacity hover:opacity-90"
                >
                  {t("nav.login")}
                </Link>
              </>
            )}
          </div>
        </div>
        {/* 顶部导航：登录后才展示应用页签 */}
        {showNav && (
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
                    className={`relative flex-1 whitespace-nowrap px-3 py-2.5 text-center text-sm transition-colors duration-300 ${
                      active ? "text-gold" : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    {t(item.key)}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
