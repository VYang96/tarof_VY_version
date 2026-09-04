// 生成 chibi 风格 78 张牌面的出图 Prompt 套件 → art/prompts.json + art/README.md
//
// 每张 prompt = 画面主体（参考韦特体系经典意象，chibi 化）+ 统一风格后缀。
// 拿去 Midjourney / SD / 即梦 / Nano Banana 等工具批量出图，命名为「牌id.扩展名」
// 放进 public/cards/，再 pnpm gen:art 即可。
//
// 用法： pnpm gen:art-prompts
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARDS = JSON.parse(
  readFileSync(join(__dirname, "..", "data", "cards.json"), "utf8")
);
const ART_DIR = join(__dirname, "..", "art");
mkdirSync(ART_DIR, { recursive: true });

// 统一风格 —— 与 App 神秘星空主题一致，保证 78 张观感统一
const STYLE =
  "cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail";

const NEGATIVE =
  "text, words, letters, numbers, watermark, signature, photorealistic, realistic human proportions, extra limbs, deformed, blurry, low quality, multiple cards, grid, collage";

// —— 大阿卡纳主体 ——
const MAJOR = {
  "major-00": "a cheerful chibi youth stepping off a cliff edge with a small knapsack on a stick, a little white dog at the feet, holding a white rose, sunny sky",
  "major-01": "a chibi mage pointing one hand to the sky and one to the ground, a wand, cup, sword and pentacle floating on a table, a glowing infinity symbol above the head",
  "major-02": "a serene chibi priestess seated between one black and one white pillar, a crescent moon at her feet, a starry veil of pomegranates behind",
  "major-03": "a gentle chibi empress with a flower crown on a cushioned throne in a lush green garden, golden wheat field, a heart Venus symbol",
  "major-04": "a stern little chibi emperor on a grey stone throne carved with ram heads, holding an ankh scepter, red mountains behind",
  "major-05": "a kindly chibi high priest in robes raising a hand in blessing, two tiny acolytes kneeling below, crossed golden keys",
  "major-06": "two cute chibi lovers standing under a big benevolent angel with spread wings, a bright sun above, a tree behind each of them",
  "major-07": "a determined chibi charioteer standing in an ornate chariot pulled by one black and one white sphinx, a starry canopy above",
  "major-08": "a gentle chibi girl softly closing the mouth of a big friendly lion, a glowing infinity symbol above her head, calm meadow",
  "major-09": "a small chibi hermit in a grey hooded cloak on a snowy mountaintop, holding up a glowing lantern with a star inside, a wooden staff",
  "major-10": "a big ornate golden wheel of fortune with a chibi sphinx resting on top, little mystical creatures around it, clouds in the corners",
  "major-11": "a calm chibi figure on a throne holding an upright sword in one hand and balanced golden scales in the other, between two pillars",
  "major-12": "a peaceful chibi figure hanging upside-down by one foot from a wooden T-shaped tree, a gentle smile and a golden halo around the head",
  "major-13": "a cute non-scary chibi skeleton knight in armor riding a white pony, holding a black flag with a white rose, a soft sunrise behind",
  "major-14": "a chibi angel gently pouring shimmering water between two golden cups, one foot on land and one in a pool, a path leading to mountains",
  "major-15": "a small comical chibi devil perched on a block above two cute little imps loosely chained, holding a torch, playful not frightening",
  "major-16": "a tall stone tower struck by a lightning bolt, its crown blasted off, two tiny chibi figures tumbling out, small flames, dark stormy sky",
  "major-17": "a hopeful chibi girl kneeling by a calm pool, pouring water from two jugs, one big bright star and seven small stars in the night sky",
  "major-18": "a big gentle crescent-moon face in the night sky, a chibi dog and wolf howling upward, a little crayfish in a pool, two towers in the distance",
  "major-19": "a joyful chibi child riding a white pony under a big smiling golden sun, tall sunflowers, a red banner waving",
  "major-20": "a chibi angel blowing a golden trumpet in the clouds, little chibi figures rising with arms open from below, mountains behind",
  "major-21": "a happy dancing chibi figure inside a green laurel wreath, holding two wands, a tiny angel, eagle, bull and lion in the four corners",
};

// —— 小阿卡纳场景（韦特经典画面，chibi 化）——
const MINOR = {
  wands: {
    1: "a chibi hand emerging from a cloud grasping a sprouting wooden wand with fresh green leaves, a distant castle on a hill",
    2: "a chibi figure standing on a castle terrace holding a small globe, gazing into the distance, two wands beside",
    3: "a chibi figure standing on a cliff watching little ships sail across the sea, three wands planted in the ground",
    4: "four upright wands forming a flower-garland gateway, two tiny chibi figures celebrating with bouquets, a castle behind",
    5: "five cute chibi youths playfully clashing wooden wands together in a friendly mock battle",
    6: "a proud chibi rider on a horse wearing a laurel wreath, holding a wand topped with a wreath, a little cheering crowd",
    7: "a brave chibi figure on higher ground defending with a wand against six wands rising from below",
    8: "eight wands flying like arrows through a clear sky over rolling green hills and a river",
    9: "a weary but ready chibi guard leaning on a wand with a bandaged head, eight wands standing like a fence behind",
    10: "a chibi figure bundling and carrying ten heavy wands with both arms toward a distant little house",
    page: "a curious chibi youth in a desert admiring a single tall wand, salamander pattern on the tunic, small pyramids behind",
    knight: "an eager chibi knight in orange armor on a rearing horse holding a wand, desert dunes and pyramids behind",
    queen: "a warm chibi queen on a throne decorated with sunflowers, a little black cat at her feet, holding a wand and a sunflower",
    king: "a confident chibi king on a throne carved with lions and salamanders, holding a flowering wand, a small live salamander nearby",
  },
  cups: {
    1: "a chibi hand from a cloud holding an overflowing golden cup, a little white dove dipping toward it, five streams of water",
    2: "two shy chibi lovers gently exchanging golden cups, a winged caduceus with a small lion head floating above",
    3: "three cheerful chibi friends dancing in a circle raising their cups in a toast, fruits and grapevines around",
    4: "a bored chibi youth sitting cross-armed under a tree ignoring a cup offered by a cloud-hand, three cups on the grass",
    5: "a cloaked chibi figure looking down sadly at three spilled cups, two upright cups still standing behind, a bridge and castle",
    6: "a sweet chibi child handing a cup full of white flowers to a smaller child in a sunny village courtyard",
    7: "a chibi figure gazing up at seven glowing cups floating in clouds, each holding a wonder — a castle, jewels, a tiny dragon, a wreath",
    8: "a lonely chibi figure with a staff walking away toward mountains at night, eight cups left behind, a crescent moon",
    9: "a very satisfied chibi figure sitting with crossed arms and a big grin, nine golden cups arced on a curved shelf behind",
    10: "a happy chibi family with two dancing children under a rainbow arc of ten cups, a cozy little house and river",
    page: "a playful chibi youth in blue holding up a cup with a tiny fish popping its head out, a wavy sea behind",
    knight: "a gentle chibi knight on a calm white horse offering a golden cup forward, a winding river and cliffs",
    queen: "a dreamy chibi queen on a seashell throne by the sea, cradling a closed ornate golden cup",
    king: "a composed chibi king on a throne floating on a choppy blue sea, holding a cup steadily, a little fish and ship nearby",
  },
  swords: {
    1: "a chibi hand from a cloud grasping an upright sword crowned with a golden crown and laurel, jagged mountains below",
    2: "a blindfolded chibi figure seated holding two crossed swords over the chest, a calm sea and crescent moon behind",
    3: "a big cute red heart pierced by three crossing swords, grey rain clouds and gentle rain",
    4: "a chibi knight lying peacefully in rest atop a tomb, hands together in prayer, three swords on the wall and one below",
    5: "a smug little chibi figure gathering three swords with a grin, two dejected tiny figures walking away, windy cloudy sky",
    6: "a chibi ferryman poling a small boat carrying a cloaked figure and a child, six swords standing in the boat, calm water ahead",
    7: "a sneaky chibi figure tiptoeing away carrying five swords and glancing back, two swords left stuck in the ground, tents behind",
    8: "a lightly bound and blindfolded chibi figure surrounded by eight swords stuck upright in the ground, a castle on a cliff behind",
    9: "a chibi figure sitting up in bed at night covering the face in worry, nine swords mounted on the dark wall",
    10: "a cartoonish chibi figure lying face-down with ten swords in the back (gentle and non-gory), a bright dawn breaking on the horizon",
    page: "an alert chibi youth brandishing a sword with hair blowing, standing on a windy hilltop with birds and churning clouds",
    knight: "a fierce chibi knight charging on a galloping horse with sword raised high, strong wind and stormy clouds",
    queen: "a stern but fair chibi queen on a throne holding an upright sword, one hand extended, clouds and a single bird",
    king: "an authoritative chibi king on a throne holding an upright sword, butterflies and birds carved on the throne, clear blue sky",
  },
  pentacles: {
    1: "a chibi hand from a cloud holding a large golden pentacle coin, a flowering garden archway and green path below",
    2: "a cheerful chibi juggler balancing two golden pentacles linked by an infinity ribbon, two little ships on rolling waves",
    3: "a little chibi mason on scaffolding carving pentacles in a cathedral, two robed advisors looking on, three pentacles",
    4: "a chibi figure hugging one pentacle to the chest, one balanced on the head, two under the feet, a city skyline behind (a cute miser)",
    5: "two ragged little chibi figures trudging through snow past a glowing stained-glass church window with five pentacles",
    6: "a kind chibi merchant holding golden scales, dropping coins to two small kneeling figures, six pentacles floating above",
    7: "a chibi farmer leaning on a hoe gazing thoughtfully at a leafy bush growing seven golden pentacles",
    8: "a diligent chibi craftsman at a workbench carving pentacles, finished ones hung on the wall, eight pentacles total",
    9: "an elegant chibi lady in a lush vineyard garden with a little falcon perched on her gloved hand, nine pentacles among the vines",
    10: "a cozy chibi elder with family and two little dogs under an archway of ten pentacles, a castle courtyard and home",
    page: "a wonder-struck chibi youth in a green flowering field holding up a single golden pentacle with both hands",
    knight: "a patient chibi knight on a sturdy still workhorse holding a pentacle, freshly plowed fields behind",
    queen: "a nurturing chibi queen on a throne in a rose garden cradling a golden pentacle, a little rabbit hopping nearby",
    king: "a prosperous chibi king on a throne wrapped in grapevines with a small bull, holding a pentacle, a castle behind",
  },
};

function subjectFor(card) {
  if (card.arcana === "major") return MAJOR[card.id] ?? card.name;
  const bySuit = MINOR[card.suit];
  if (!bySuit) return card.name;
  const key = card.number >= 1 && card.number <= 10 ? card.number : null;
  if (key !== null && bySuit[key]) return bySuit[key];
  // 宫廷牌
  const rank = card.id.split("-")[1];
  return bySuit[rank] ?? card.name;
}

const prompts = CARDS.map((card) => {
  const subject = subjectFor(card);
  return {
    id: card.id,
    name: card.name,
    en: card.en,
    file: `${card.id}.png`,
    subject,
    prompt: `${subject}, ${STYLE}`,
  };
});

const out = { style: STYLE, negative: NEGATIVE, count: prompts.length, prompts };
writeFileSync(
  join(ART_DIR, "prompts.json"),
  JSON.stringify(out, null, 2) + "\n",
  "utf8"
);

// 顺带生成一份人类可读的清单，方便逐张复制
const md = [
  "# Chibi 牌面出图 Prompt 套件（78 张）",
  "",
  "由 `pnpm gen:art-prompts` 生成。每张 prompt 已含统一风格后缀。",
  "",
  "## 统一风格（style）",
  "```",
  STYLE,
  "```",
  "## 反向提示（negative，支持的工具填）",
  "```",
  NEGATIVE,
  "```",
  "",
  "## 出图与接入约定",
  "- **一张一张出**（或按花色出干净正面图），不要一次生成拼图/网格。",
  "- 比例 **5:8 竖版**（如 832×1280 / 1024×1600），主体居中、留出底部给名称浮层。",
  "- **锁定风格**：固定同一套 style 后缀 + 同一 seed / 同一风格参考图，保证 78 张一致。",
  "- 命名为 `牌id.png`（见下表），放进 `public/cards/`，然后 `pnpm gen:art`。",
  "",
  "| 牌 id | 中文 | English | 文件名 |",
  "| --- | --- | --- | --- |",
  ...prompts.map((p) => `| \`${p.id}\` | ${p.name} | ${p.en} | \`${p.file}\` |`),
  "",
  "## 逐张 Prompt",
  "",
  ...prompts.flatMap((p) => [
    `### ${p.name} · ${p.en} (\`${p.id}\`)`,
    "```",
    p.prompt,
    "```",
    "",
  ]),
].join("\n");

writeFileSync(join(ART_DIR, "README.md"), md, "utf8");

console.log(`✅ 生成 ${prompts.length} 条 Prompt → art/prompts.json + art/README.md`);
