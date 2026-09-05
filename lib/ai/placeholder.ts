// 占位解读器 —— 在未接入真实大模型前，用固定牌义编织出一段流式解读，
// 让「流式输出 + 按需触发 + 缓存」的交互链路先跑通。
// 接入真实模型时，只需实现同样签名的 Interpreter 并在 lib/ai/index.ts 切换。
import type { Interpreter } from "./types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 把长文本切成小片，模拟逐字/逐词的流式吐出 */
async function* stream(text: string, signal?: AbortSignal) {
  // 按标点与字符切片，读起来有节奏
  const chunks = text.match(/[^，。；！？.,;!?\n]+[，。；！？.,;!?\n]?\s?/g) ?? [text];
  for (const chunk of chunks) {
    if (signal?.aborted) return;
    for (const ch of chunk) {
      if (signal?.aborted) return;
      yield ch;
      await sleep(24);
    }
    await sleep(110);
  }
}

export const placeholderInterpreter: Interpreter = async function* (ctx, signal) {
  const en = ctx.locale === "en";
  const n = ctx.draws.length;

  const opening = en
    ? (ctx.question
        ? `On your question "${ctx.question}", let's read these ${n} cards together.\n\n`
        : `Let's read these ${n} cards and see the energy of this moment.\n\n`)
    : (ctx.question
        ? `关于你的提问「${ctx.question}」，让我们顺着这${n}张牌一起看看。\n\n`
        : `让我们顺着这${n}张牌，看看此刻的能量。\n\n`);
  yield* stream(opening, signal);

  for (const d of ctx.draws) {
    const orient = en
      ? d.reversed ? "reversed" : "upright"
      : d.reversed ? "逆位" : "正位";
    const line = en
      ? `In the "${d.positionLabel}" position you drew ${d.cardName} (${orient}). ${d.meaning}\n\n`
      : `在「${d.positionLabel}」的位置，你抽到了${d.cardName}（${orient}）。${d.meaning}\n\n`;
    yield* stream(line, signal);
  }

  const closing = en
    ? "Read together: the seeds of the past shaped this moment, and the choices you make now quietly set the direction. These cards aren't a verdict handed down for you — they're a mirror, reflecting the leaning already in your heart.\n\nOne last thing: the cards offer suggestions, not sentences. Which path to walk is always yours to decide."
    : "把它们连起来看：过去的种子塑造了此刻，而此刻的选择正悄悄决定走向。这几张牌并不是替你下的定论，而是一面镜子——照见你心里其实已经有了倾向。\n\n最后想说：牌给的是建议，不是判决。真正要走哪条路，永远由你自己决定。";
  yield* stream(closing, signal);
};
