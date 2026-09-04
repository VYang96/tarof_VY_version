// 占位解读器 —— 在未接入真实大模型前，用固定牌义编织出一段流式解读，
// 让「流式输出 + 按需触发 + 缓存」的交互链路先跑通。
// 接入真实模型时，只需实现同样签名的 Interpreter 并在 lib/ai/index.ts 切换。
import type { Interpreter } from "./types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 把长文本切成小片，模拟逐字/逐词的流式吐出 */
async function* stream(text: string, signal?: AbortSignal) {
  // 按标点与字符切片，读起来有节奏
  const chunks = text.match(/[^，。；！？\n]+[，。；！？\n]?/g) ?? [text];
  for (const chunk of chunks) {
    if (signal?.aborted) return;
    // 每片再逐字吐，制造打字机效果
    for (const ch of chunk) {
      if (signal?.aborted) return;
      yield ch;
      await sleep(28);
    }
    await sleep(120);
  }
}

export const placeholderInterpreter: Interpreter = async function* (ctx, signal) {
  const opening = ctx.question
    ? `关于你的提问「${ctx.question}」，让我们顺着这${ctx.draws.length}张牌一起看看。\n\n`
    : `让我们顺着这${ctx.draws.length}张牌，看看此刻的能量。\n\n`;
  yield* stream(opening, signal);

  for (const d of ctx.draws) {
    const line = `在「${d.positionLabel}」的位置，你抽到了${d.cardName}（${
      d.reversed ? "逆位" : "正位"
    }）。${d.meaning}\n\n`;
    yield* stream(line, signal);
  }

  const closing =
    "把它们连起来看：过去的种子塑造了此刻，而此刻的选择正悄悄决定走向。这几张牌并不是替你下的定论，而是一面镜子——照见你心里其实已经有了倾向。\n\n最后想说：牌给的是建议，不是判决。真正要走哪条路，永远由你自己决定。";
  yield* stream(closing, signal);
};
