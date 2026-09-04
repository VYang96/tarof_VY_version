// 界面文案词典（PRD §6.2 国际化：文案抽离，不硬编码）
// 牌义内容不在此处，随 cards.json 走。
import type { Locale } from "@/lib/store/settings";

export const dict = {
  "app.name": { zh: "月语塔罗", en: "Moon-speak Tarot" },
  "app.tagline": { zh: "让每一次翻牌，替你照见此刻", en: "See this moment, one card at a time" },

  "nav.home": { zh: "首页", en: "Home" },
  "nav.reading": { zh: "占卜", en: "Reading" },
  "nav.daily": { zh: "每日一牌", en: "Daily" },
  "nav.history": { zh: "历史", en: "History" },
  "nav.library": { zh: "牌库", en: "Library" },
  "nav.settings": { zh: "设置", en: "Settings" },

  "home.start": { zh: "开始占卜", en: "Start a Reading" },
  "home.daily": { zh: "今日一牌", en: "Today's Card" },

  "flow.chooseCategory": { zh: "你想问什么？", en: "What's on your mind?" },
  "flow.question": { zh: "把问题说清楚一点", en: "Frame your question" },
  "flow.questionHint": {
    zh: "试着问开放式的问题，聚焦你自己：例如「我该如何面对这段关系」，而不是「他爱不爱我」。",
    en: "Ask open questions focused on yourself, e.g. “How can I approach this relationship?” rather than yes/no.",
  },
  "flow.questionPlaceholder": { zh: "输入你的问题（可留空）", en: "Type your question (optional)" },
  "flow.chooseSpread": { zh: "选择牌阵", en: "Choose a spread" },
  "flow.shuffle": { zh: "洗牌", en: "Shuffle" },
  "flow.draw": { zh: "抽牌", en: "Draw" },
  "flow.next": { zh: "下一步", en: "Next" },
  "flow.skip": { zh: "跳过", en: "Skip" },

  "result.title": { zh: "你的牌", en: "Your Cards" },
  "result.fixedMeaning": { zh: "牌义解读", en: "Card Meaning" },
  "result.aiReading": { zh: "深度解读", en: "Deep Reading" },
  "result.aiComingSoon": { zh: "AI 深度解读将在后续版本开放", en: "AI deep reading is coming in a later version" },
  "result.save": { zh: "保存到历史", en: "Save to history" },
  "result.again": { zh: "再抽一次", en: "Read again" },
  "result.upright": { zh: "正位", en: "Upright" },
  "result.reversed": { zh: "逆位", en: "Reversed" },

  "card.upright": { zh: "正位", en: "Upright" },
  "card.reversed": { zh: "逆位", en: "Reversed" },

  "history.empty": { zh: "还没有记录，去抽一次吧", en: "No readings yet — draw your first card" },
  "history.favorite": { zh: "收藏", en: "Favorite" },

  "library.title": { zh: "牌库图鉴", en: "Card Library" },
  "library.search": { zh: "搜索牌名或关键词", en: "Search name or keyword" },

  "settings.language": { zh: "语言", en: "Language" },
  "settings.theme": { zh: "主题", en: "Theme" },
  "settings.reversed": { zh: "启用逆位", en: "Enable reversed cards" },

  "disclaimer.title": { zh: "仅供参考", en: "For reflection only" },
  "disclaimer.body": {
    zh: "塔罗帮助你梳理心绪、看见可能，而非预言未来或替你做决定。请把它当作一面镜子，最终的选择永远属于你自己。",
    en: "Tarot helps you reflect and see possibilities — it does not predict the future or decide for you. The choice is always yours.",
  },
} as const;

export type DictKey = keyof typeof dict;

export function translate(key: DictKey, locale: Locale): string {
  const entry = dict[key];
  return entry ? entry[locale] : key;
}
