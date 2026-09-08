"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSettings } from "@/lib/store/settings";

type Cycle = "monthly" | "annual";

const T = {
  title: { zh: "选择你的月语", en: "Choose your Moon-speak" },
  subtitle: {
    zh: "免费开始，随时升级。牌义永远离线可读，Plus 解锁更深的陪伴。",
    en: "Start free, upgrade anytime. Card meanings stay offline forever; Plus unlocks deeper company.",
  },
  monthly: { zh: "按月", en: "Monthly" },
  annual: { zh: "按年", en: "Annual" },
  save: { zh: "省 33%", en: "Save 33%" },
  perMonth: { zh: "/ 月", en: "/ mo" },
  perYear: { zh: "/ 年", en: "/ yr" },
  freeName: { zh: "免费", en: "Free" },
  freeTag: { zh: "尝鲜 · 养习惯", en: "Try it · build a habit" },
  plusName: { zh: "月语 Plus", en: "Moon-speak Plus" },
  plusTagM: { zh: "随时取消", en: "Cancel anytime" },
  plusTagY: { zh: "约每月 $3.3 · 现金流友好", en: "~$3.3/mo · best value" },
  recommend: { zh: "推荐", en: "Recommended" },
  ctaFree: { zh: "免费开始", en: "Start free" },
  ctaPlus: { zh: "升级 Plus", en: "Upgrade to Plus" },
  soon: { zh: "订阅即将开放", en: "Subscriptions coming soon" },
  compare: { zh: "功能对比", en: "Compare plans" },
  note: {
    zh: "价格以美元结算，最终以结账页为准。塔罗仅供自我梳理，非医疗或专业建议。",
    en: "Prices in USD, finalized at checkout. Tarot is for self-reflection, not medical or professional advice.",
  },
  faqTitle: { zh: "常见问题", en: "FAQ" },
};

const FREE_FEATURES = {
  zh: ["每日一牌（完整）", "每月 3 次基础占卜", "单张 / 三张牌阵", "历史保留 7 天", "牌库基础牌义"],
  en: [
    "Daily card (full)",
    "3 basic readings / month",
    "Single & three-card spreads",
    "History kept 7 days",
    "Library basic meanings",
  ],
};
const PLUS_FEATURES = {
  zh: ["无限占卜", "全部牌阵（含凯尔特十字）", "AI 深度解读", "无限历史 + 笔记回顾", "逆位完整解读", "界面皮肤 / 主题"],
  en: [
    "Unlimited readings",
    "All spreads (incl. Celtic Cross)",
    "AI deep reading",
    "Unlimited history + notes",
    "Full reversed readings",
    "Skins / themes",
  ],
};

const COMPARE: { label: { zh: string; en: string }; free: string; plus: string }[] = [
  { label: { zh: "每日一牌", en: "Daily card" }, free: "✓", plus: "✓" },
  { label: { zh: "占卜次数", en: "Readings" }, free: "3 / 月", plus: "∞" },
  { label: { zh: "牌阵种类", en: "Spreads" }, free: "2", plus: "全部" },
  { label: { zh: "AI 深度解读", en: "AI deep reading" }, free: "—", plus: "✓" },
  { label: { zh: "逆位解读", en: "Reversed" }, free: "基础", plus: "完整" },
  { label: { zh: "历史保存", en: "History" }, free: "7 天", plus: "永久" },
  { label: { zh: "主题皮肤", en: "Themes" }, free: "—", plus: "✓" },
];

export default function PricingPage() {
  const router = useRouter();
  const locale = useSettings((s) => s.locale);
  const [cycle, setCycle] = useState<Cycle>("annual");
  const [msg, setMsg] = useState("");
  const tr = (o: { zh: string; en: string }) => (locale === "zh" ? o.zh : o.en);

  const plusPrice = cycle === "monthly" ? "$5" : "$39.99";
  const plusPer = cycle === "monthly" ? tr(T.perMonth) : tr(T.perYear);

  const upgrade = () => {
    setMsg(tr(T.soon));
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <div className="space-y-8 py-4">
      <header className="text-center">
        <h2 className="text-shimmer font-serif text-3xl">{tr(T.title)}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
          {tr(T.subtitle)}
        </p>
      </header>

      {/* 月/年切换 */}
      <div className="flex items-center justify-center">
        <div className="flex overflow-hidden rounded-full border border-border">
          {(["monthly", "annual"] as Cycle[]).map((c) => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              className={`px-5 py-2 text-sm transition-colors ${
                cycle === c ? "bg-gold text-bg" : "text-fg-muted hover:text-fg"
              }`}
            >
              {c === "monthly" ? tr(T.monthly) : tr(T.annual)}
              {c === "annual" && (
                <span
                  className={`ml-1.5 text-xs ${cycle === c ? "text-bg/80" : "text-gold-soft"}`}
                >
                  {tr(T.save)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 两档卡片 */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Free */}
        <div className="flex flex-col rounded-2xl border border-border bg-bg-elev p-6">
          <div className="font-serif text-xl text-fg">{tr(T.freeName)}</div>
          <div className="mt-0.5 text-xs text-fg-muted">{tr(T.freeTag)}</div>
          <div className="mt-4 font-serif text-4xl text-fg">$0</div>
          <ul className="mt-5 flex-1 space-y-2 text-sm text-fg-muted">
            {(locale === "zh" ? FREE_FEATURES.zh : FREE_FEATURES.en).map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-gold">·</span>
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => router.push("/reading")}
            className="press mt-6 rounded-full border border-gold/60 py-2.5 font-serif text-gold transition-colors hover:bg-gold/10"
          >
            {tr(T.ctaFree)}
          </button>
        </div>

        {/* Plus */}
        <motion.div
          initial={{ scale: 0.99 }}
          animate={{ scale: 1 }}
          className="relative flex flex-col rounded-2xl border border-gold/50 bg-gradient-to-b from-bg-elev-2 to-bg-elev p-6 shadow-[0_10px_40px_-15px_rgba(214,172,87,0.4)]"
        >
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 text-xs font-medium text-bg">
            {tr(T.recommend)}
          </span>
          <div className="text-shimmer font-serif text-xl">{tr(T.plusName)}</div>
          <div className="mt-0.5 text-xs text-gold-soft">
            {cycle === "monthly" ? tr(T.plusTagM) : tr(T.plusTagY)}
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-serif text-4xl text-gold">{plusPrice}</span>
            <span className="text-sm text-fg-muted">{plusPer}</span>
          </div>
          <ul className="mt-5 flex-1 space-y-2 text-sm text-fg">
            {(locale === "zh" ? PLUS_FEATURES.zh : PLUS_FEATURES.en).map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-gold">✦</span>
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={upgrade}
            className="press glow-gold mt-6 rounded-full bg-gold py-2.5 font-serif text-bg transition-opacity hover:opacity-90"
          >
            {msg || tr(T.ctaPlus)}
          </button>
        </motion.div>
      </div>

      {/* 功能对比表 */}
      <section>
        <h3 className="mb-3 font-serif text-lg text-gold-soft">{tr(T.compare)}</h3>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-elev text-left">
                <th className="p-3 font-medium text-fg-muted"></th>
                <th className="p-3 text-center font-medium text-fg-muted">{tr(T.freeName)}</th>
                <th className="p-3 text-center font-medium text-gold">{tr(T.plusName)}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, i) => (
                <tr key={row.label.en} className={i % 2 ? "bg-bg-elev/40" : ""}>
                  <td className="p-3 text-fg">{tr(row.label)}</td>
                  <td className="p-3 text-center text-fg-muted">{row.free}</td>
                  <td className="p-3 text-center text-fg">{row.plus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-center text-xs leading-relaxed text-fg-muted/70">{tr(T.note)}</p>
    </div>
  );
}
