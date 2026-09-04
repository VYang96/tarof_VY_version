// 安全边界（PRD §3.12 / §5.4）：识别健康 / 自伤 / 轻生类问题，
// 触发时不给"占卜答案"，而是温和引导求助资源。
// 仅做关键词粗筛，宁可多提示，也不替代专业判断。

const CRISIS_PATTERNS: RegExp[] = [
  // 中文
  /自杀|轻生|自残|自伤|不想活|活不下去|想死|结束生命|了结自己|伤害自己/,
  // 英文
  /\b(suicide|suicidal|kill myself|end my life|self[-\s]?harm|hurt myself|want to die|don'?t want to live)\b/i,
];

export type SafetyLevel = "ok" | "crisis";

/** 检测问题文本是否触及危机类边界 */
export function checkSafety(text: string): SafetyLevel {
  if (!text) return "ok";
  return CRISIS_PATTERNS.some((re) => re.test(text)) ? "crisis" : "ok";
}
