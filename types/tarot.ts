// 月语塔罗 · 核心数据类型（对齐 PRD §4）

/** 解读类别 —— 决定"取哪一套牌义" */
export type Category =
  | "general" // 综合运势
  | "love" // 感情
  | "career" // 事业
  | "wealth"; // 财运

/** 小阿卡纳花色 */
export type Suit = "wands" | "cups" | "swords" | "pentacles";

/** 阿卡纳分类 */
export type Arcana = "major" | "minor";

/** 单一朝向的牌义 */
export interface Meaning {
  upright: string; // 正位
  reversed: string; // 逆位
}

/** 一张牌在各类别下的牌义 */
export interface CardMeanings {
  general: Meaning;
  love: Meaning;
  career: Meaning;
  wealth: Meaning;
}

/** Card · 单张塔罗牌（PRD §4.1） */
export interface Card {
  id: string; // e.g. "major-06" / "cups-02"
  name: string; // 中文名
  en: string; // 英文名
  arcana: Arcana;
  suit: Suit | null;
  number: number;
  element: string; // 对应元素
  keywords: string[]; // 关键词标签
  keywordsEn?: string[]; // 英文关键词
  meanings: CardMeanings; // 中文牌义
  meaningsEn?: CardMeanings; // 英文牌义（PRD §10，阶段二）
}

/** 牌阵中的一个位置（PRD §4.2） */
export interface SpreadPosition {
  index: number; // 数组下标
  order: number; // 翻牌/解读顺序
  label: string; // 位置名称
  labelEn?: string; // 英文位置名称
  meaning: string; // 位置含义
  layout: { x: number; y: number }; // 归一化坐标 0~1，原点左上
}

/** Spread · 牌阵定义（PRD §4.2） */
export interface Spread {
  id: string;
  name: string;
  nameEn?: string;
  cardCount: number;
  bestFor: Category[];
  positions: SpreadPosition[];
  howToRead: string;
  howToReadEn?: string;
}

/** 一次抽牌结果 */
export interface Draw {
  position: number; // 对应牌阵位置 index
  cardId: string;
  reversed: boolean; // 是否逆位
}

/** Reading · 一次占卜记录（PRD §4.3） */
export interface Reading {
  id: string; // e.g. "rd_20260901_a1b2"
  createdAt: string; // ISO8601
  category: Category;
  question: string;
  spreadId: string;
  draws: Draw[];
  aiReading?: string; // AI 深度解读（P1，可缓存）
  favorite: boolean;
}
