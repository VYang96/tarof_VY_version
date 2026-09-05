// 生成 data/cards.json —— 78 张塔罗牌完整牌义
//
// 大阿卡纳(22)：手工撰写四类别 × 正逆位牌义。
// 小阿卡纳(56)：由「花色元素主题 + 数字/宫廷牌语义」组合出连贯的首版中文牌义，
//              结构完整、可直接使用，后续可人工/AI 润色。
//
// 复跑： node scripts/gen-cards.mjs

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "data", "cards.json");

// ---------------------------------------------------------------------------
// 大阿卡纳 22 张（手工牌义）
// ---------------------------------------------------------------------------
const MAJOR = [
  {
    id: "major-00", name: "愚人", en: "The Fool", number: 0, element: "风",
    keywords: ["开始", "冒险", "纯真", "可能性"],
    meanings: {
      general: { upright: "一段全新的旅程正在展开。放下顾虑、保持好奇，此刻的天真恰是你的力量。相信直觉，迈出那一步。", reversed: "你也许过于鲁莽，或因害怕未知而迟迟不敢开始。先看清脚下，再决定要不要跳。" },
      love: { upright: "感情里出现新鲜的悸动，适合以开放的心去尝试。别用旧经验框住此刻的可能。", reversed: "关系中有些天真或逃避，逃开承诺或忽略了现实的信号。诚实面对自己想要什么。" },
      career: { upload: "", upright: "适合开启新项目或转换跑道，未知反而带来机会。用初学者的心态大胆探索。", reversed: "计划尚不成熟就贸然行动，容易踩空。多做一点准备，别只凭一股冲劲。" },
      wealth: { upright: "财务上愿意尝试新方式，小额试水未尝不可。保持轻盈，但记得留有退路。", reversed: "花钱随性、缺乏规划，容易失控。先算清账，再谈冒险。" }
    }
  },
  {
    id: "major-01", name: "魔术师", en: "The Magician", number: 1, element: "水星",
    keywords: ["行动", "创造", "资源", "专注"],
    meanings: {
      general: { upright: "你已握有实现目标所需的一切工具，关键是把意图化为行动。专注当下，你就是那个让事情发生的人。", reversed: "空有想法却迟迟不动，或把才能用错地方。别再空谈，也别用技巧操弄他人。" },
      love: { upright: "你有能力主动创造想要的关系，真诚的表达会带来回应。此刻宜主动。", reversed: "言行不一或有所隐瞒，让对方难以信任。让真心与行动对齐。" },
      career: { upright: "技能、人脉、时机都已就位，是把想法落地的好时候。主动出击。", reversed: "资源没用在刀刃上，或过度包装缺乏实质。回到真正重要的事上。" },
      wealth: { upright: "你有把机会变现的能力，主动规划就能看到成效。", reversed: "计划华而不实，或被表象诱惑。核实每一笔再行动。" }
    }
  },
  {
    id: "major-02", name: "女祭司", en: "The High Priestess", number: 2, element: "月亮",
    keywords: ["直觉", "潜意识", "静观", "秘密"],
    meanings: {
      general: { upright: "答案不在外面，而在你内心深处。此刻宜静观、倾听直觉，让答案自己浮现。", reversed: "你可能忽略了内在的声音，或被表面信息带偏。慢下来，重新与自己连接。" },
      love: { upright: "关系里有尚未言明的部分，静静感受比急着追问更有智慧。相信你的直觉。", reversed: "压抑真实感受或对彼此有所隐瞒，误解由此而生。给情绪一个出口。" },
      career: { upright: "有些事还在酝酿，不必急于摊牌。观察局势，时机未到先蓄力。", reversed: "忽视了内心的疑虑，或信息不透明。别被表象说服，再核实一遍。" },
      wealth: { upright: "财务决策宜谨慎、多观察，直觉会提醒你哪里不对劲。", reversed: "对财务状况了解不清，或刻意回避。翻开账本，正视它。" }
    }
  },
  {
    id: "major-03", name: "皇后", en: "The Empress", number: 3, element: "金星",
    keywords: ["丰盛", "滋养", "创造力", "感性"],
    meanings: {
      general: { upright: "生命力正丰沛，适合孕育与照顾——无论是一段关系、一个作品还是你自己。享受这份丰盛。", reversed: "过度付出而忽略自己，或创造力受阻。先把自己照顾好，才能滋养他人。" },
      love: { upright: "感情温暖而滋养，宜用心经营、彼此照顾。爱意会自然生长。", reversed: "关系中付出与索取失衡，或以爱之名过度掌控。回到平等与自在。" },
      career: { upright: "创意与合作带来成果，适合让项目慢慢成长。用心浇灌会有回报。", reversed: "投入过多却看不到成长，或忽略了休息。别让自己枯竭。" },
      wealth: { upright: "财务趋于富足稳定，适合投资于能长期滋养你的事物。", reversed: "过度消费于享乐，或理财上缺乏节制。分清想要与需要。" }
    }
  },
  {
    id: "major-04", name: "皇帝", en: "The Emperor", number: 4, element: "白羊",
    keywords: ["秩序", "权威", "结构", "掌控"],
    meanings: {
      general: { upright: "是时候建立秩序、承担责任。用理性和纪律为局面立下框架，稳定由此而来。", reversed: "过于强硬或掌控，反而失去弹性；也可能是逃避该承担的责任。刚柔并济。" },
      love: { upright: "关系需要稳定与承诺，明确的界限反而带来安全感。", reversed: "一方过于强势或固执，让关系变得僵硬。多一点倾听与松动。" },
      career: { upright: "适合制定规划、扮演主导角色，结构化的推进会奏效。", reversed: "管理过度或独断，团队难以发挥。适度放权。" },
      wealth: { upright: "以纪律和规划管理财务，稳健是此刻的关键词。", reversed: "过度控制或死板，错过灵活的机会。留一点余地。" }
    }
  },
  {
    id: "major-05", name: "教皇", en: "The Hierophant", number: 5, element: "金牛",
    keywords: ["传统", "信念", "指引", "归属"],
    meanings: {
      general: { upright: "遵循被验证过的路径、向可信的人请教，会让你更踏实。传统与规则此刻是助力。", reversed: "旧有的框架不再适合你，是时候走自己的路。别被规矩绑住。" },
      love: { upright: "关系走向稳定与承诺，传统的方式（如公开、承诺）带来安心。", reversed: "不愿被世俗形式束缚，或价值观出现分歧。忠于你们自己的节奏。" },
      career: { upright: "在体系内循规蹈矩会有回报，也适合拜师学习。", reversed: "体制让你受限，或不认同主流做法。可以尝试非常规路径。" },
      wealth: { upright: "采用稳妥、传统的理财方式更安全。", reversed: "盲从建议或墨守成规，未必适合你。独立判断。" }
    }
  },
  {
    id: "major-06", name: "恋人", en: "The Lovers", number: 6, element: "双子",
    keywords: ["结合", "选择", "价值观", "和谐"],
    meanings: {
      general: { upright: "一个关乎内心的重要选择摆在面前。忠于自己的价值观去选，和谐自会随之而来。", reversed: "价值观冲突或选择失衡，内心并不一致。先厘清你真正看重什么。" },
      love: { upright: "深刻的连接与吸引，关系走向契合。也可能面临一个关于承诺的选择。", reversed: "关系失衡、沟通不畅，或面对诱惑而动摇。诚实面对彼此。" },
      career: { upright: "面临重要抉择或合作契机，选与你价值观一致的方向。", reversed: "合作出现分歧，或选择时犹豫不决。别违背本心。" },
      wealth: { upright: "财务选择宜以长期价值为准，合作能带来共赢。", reversed: "在诱惑与理智间摇摆，容易做出后悔的决定。三思而行。" }
    }
  },
  {
    id: "major-07", name: "战车", en: "The Chariot", number: 7, element: "巨蟹",
    keywords: ["意志", "前进", "掌控", "胜利"],
    meanings: {
      general: { upright: "凭借决心与自律，你能驾驭相反的力量向目标挺进。专注方向，胜利在望。", reversed: "方向不明或内在拉扯，力量彼此抵消。先统一你的意图。" },
      love: { upright: "关系在你的主动推动下向前，克服阻碍后更进一步。", reversed: "关系失控或方向不一致，硬推只会更僵。先稳住自己。" },
      career: { upright: "全力冲刺会有突破，掌控节奏就能拿下目标。", reversed: "目标分散、动力不足，进展受阻。收拢焦点。" },
      wealth: { upright: "以坚定的计划推进财务目标，自律带来成果。", reversed: "财务方向摇摆或用力过猛，容易翻车。稳住阵脚。" }
    }
  },
  {
    id: "major-08", name: "力量", en: "Strength", number: 8, element: "狮子",
    keywords: ["勇气", "柔韧", "内在力量", "耐心"],
    meanings: {
      general: { upright: "真正的力量是温柔而坚定的自我掌控。以耐心和爱驯服内心的躁动，你比想象中更强大。", reversed: "自我怀疑或情绪失控，力量向内耗散。先善待自己。" },
      love: { upright: "用包容与耐心经营关系，温柔的坚持胜过强求。", reversed: "缺乏安全感或情绪主导，让关系疲惫。找回内在的稳定。" },
      career: { upright: "以沉稳和韧性面对挑战，柔中带刚会赢得局面。", reversed: "压力下失去耐心或信心，表现受影响。调整心态再上。" },
      wealth: { upright: "以冷静和耐心管理财务，不被情绪牵着走。", reversed: "冲动消费或焦虑决策，容易失衡。缓一缓。" }
    }
  },
  {
    id: "major-09", name: "隐士", en: "The Hermit", number: 9, element: "处女",
    keywords: ["内省", "独处", "指引", "追寻"],
    meanings: {
      general: { upright: "退回内在，独处会带来清明的洞见。此刻答案来自向内的追寻，而非向外的喧嚣。", reversed: "过度孤立或逃避现实，也可能是拒绝了本该接受的指引。别把自己关得太死。" },
      love: { upright: "需要一些独处的空间来看清感情，或在沉淀中遇见更成熟的连接。", reversed: "过度封闭或疏离，让关系冷却。适度打开自己。" },
      career: { upright: "适合独立钻研、沉淀专业，静心会找到方向。", reversed: "闭门造车或与团队脱节，进展停滞。走出来交流。" },
      wealth: { upright: "冷静独立地审视财务，不受外界噪音干扰。", reversed: "在财务上过度谨慎或回避，错失时机。适度行动。" }
    }
  },
  {
    id: "major-10", name: "命运之轮", en: "Wheel of Fortune", number: 10, element: "木星",
    keywords: ["转机", "周期", "机运", "变化"],
    meanings: {
      general: { upright: "命运之轮转动，转机正在来临。顺应变化的节奏，抓住这一波向上的势头。", reversed: "运势下行或陷入循环，感觉被卡住。别抗拒，调整后再顺势而为。" },
      love: { upright: "关系迎来转折，顺其自然会有意外的进展。", reversed: "感情起伏不定或重蹈覆辙，需打破旧模式。" },
      career: { upright: "机遇之窗打开，把握时机会带来跃迁。", reversed: "计划受外部变数影响，节奏被打乱。灵活应对。" },
      wealth: { upright: "财运出现向上的转机，顺势布局。", reversed: "财务波动难料，避免在低谷时做重大决定。" }
    }
  },
  {
    id: "major-11", name: "正义", en: "Justice", number: 11, element: "天秤",
    keywords: ["公正", "因果", "责任", "平衡"],
    meanings: {
      general: { upright: "凡事讲求因果与平衡，此刻宜诚实、负责地做决定。你付出什么，就会收获什么。", reversed: "逃避责任或有失公允，内心并不坦荡。正视真相，为自己的选择负责。" },
      love: { upright: "关系需要公平与坦诚，问题摊开讲才能真正解决。", reversed: "责任分配不均或有所隐瞒，失衡由此而生。诚实相待。" },
      career: { upright: "以公正和条理处理事务，合约与决策会有好结果。", reversed: "存在不公或疏漏，需谨慎核对。别抱侥幸。" },
      wealth: { upright: "财务上宜合规、清晰，权衡后再定。", reversed: "账目不清或决策草率，埋下隐患。理清再说。" }
    }
  },
  {
    id: "major-12", name: "倒吊人", en: "The Hanged Man", number: 12, element: "水",
    keywords: ["暂停", "换位", "臣服", "洞察"],
    meanings: {
      general: { upright: "主动的暂停带来新的视角。放下执着、换个角度看，卡住的局面会豁然开朗。", reversed: "无谓的拖延或牺牲，困在原地却不肯转念。该放的放，该动的动。" },
      love: { upright: "以退为进，暂时放下期待反而让关系松动。换位思考。", reversed: "为关系过度牺牲或消极僵持，两败俱伤。重新平衡。" },
      career: { upright: "暂缓推进、重新审视，会看到更好的路径。", reversed: "拖延不决或陷入僵局，白白消耗。做出取舍。" },
      wealth: { upright: "暂时按兵不动，换个思路看财务会更清晰。", reversed: "犹豫不决错失时机，或死守亏损。及时止损。" }
    }
  },
  {
    id: "major-13", name: "死神", en: "Death", number: 13, element: "天蝎",
    keywords: ["结束", "转化", "放下", "重生"],
    meanings: {
      general: { upright: "一个阶段走到尽头，唯有放下才能迎来新生。别怕结束，它是转化的必经之路。", reversed: "抗拒必然的结束，死守过去而停滞不前。松手，才能向前。" },
      love: { upright: "关系经历深刻的转变，旧模式的结束换来更真实的连接。", reversed: "不愿放下已逝的感情，或害怕改变而拖着。给彼此自由。" },
      career: { upright: "旧的告一段落，转型或转变带来新机会。", reversed: "抗拒变革、固守旧路，机会随之流失。顺应趋势。" },
      wealth: { upright: "财务模式面临重整，结束无效的方式才能重生。", reversed: "不愿改变旧有的财务习惯，问题拖延累积。" }
    }
  },
  {
    id: "major-14", name: "节制", en: "Temperance", number: 14, element: "射手",
    keywords: ["平衡", "调和", "耐心", "中道"],
    meanings: {
      general: { upright: "以耐心调和相反的力量，找到属于你的中道。不急不躁，恰到好处即是智慧。", reversed: "失衡或过度，走了极端。找回节奏与分寸。" },
      love: { upright: "关系在相互调和中趋于和谐，耐心经营会更长久。", reversed: "步调不一或缺乏耐心，容易摩擦。放慢磨合。" },
      career: { upright: "平衡各方、循序渐进，会稳稳达成目标。", reversed: "用力过猛或资源失衡，效率打折。重新校准。" },
      wealth: { upright: "量入为出、稳步积累，财务趋于平衡。", reversed: "收支失衡或过度冒进，需节制。" }
    }
  },
  {
    id: "major-15", name: "恶魔", en: "The Devil", number: 15, element: "摩羯",
    keywords: ["束缚", "欲望", "执着", "阴影"],
    meanings: {
      general: { upright: "你也许被欲望、习惯或某种关系所困。看清这份束缚往往是自己给的，你随时可以选择松绑。", reversed: "正在挣脱枷锁、觉醒于旧有的执着。释放的过程虽难，方向是对的。" },
      love: { upright: "关系中有强烈的吸引，但也可能夹杂占有或依赖。分清是爱还是执。", reversed: "开始摆脱不健康的关系模式，重获自由。" },
      career: { upright: "为现实利益而妥协或被工作绑住，警惕失去自主。", reversed: "跳出令你窒息的处境，重新掌握选择权。" },
      wealth: { upright: "受物欲或短期诱惑驱使，警惕债务或过度消费。", reversed: "开始摆脱财务的枷锁，走向自律。" }
    }
  },
  {
    id: "major-16", name: "高塔", en: "The Tower", number: 16, element: "火星",
    keywords: ["崩塌", "突变", "觉醒", "释放"],
    meanings: {
      general: { upright: "旧结构轰然倒塌，突如其来却也扫清了虚假的根基。破而后立，真相让你重获自由。", reversed: "勉强维持摇摇欲坠的局面，或延后了必然的崩塌。长痛不如短痛。" },
      love: { upright: "关系经历剧烈震荡，真相浮出水面。破裂或转机都是新起点。", reversed: "抗拒关系中必要的破局，勉强维系反而更痛。" },
      career: { upright: "突发变故打乱计划，却也逼出新的方向。", reversed: "危机被暂时压住，隐患仍在。正视问题。" },
      wealth: { upright: "财务遭遇突变，及时应对反而止损重建。", reversed: "回避财务危机，问题只会越滚越大。" }
    }
  },
  {
    id: "major-17", name: "星星", en: "The Star", number: 17, element: "水瓶",
    keywords: ["希望", "疗愈", "指引", "宁静"],
    meanings: {
      general: { upright: "风暴过后，希望之光重现。此刻宜疗愈、相信未来，宁静的信念会指引你前行。", reversed: "对未来失去信心或感到迷茫，光被乌云遮住。重新点燃希望。" },
      love: { upright: "关系进入疗愈与滋养的阶段，真诚带来安宁与希望。", reversed: "感到失望或缺乏信心，需要时间修复。别放弃希望。" },
      career: { upright: "看到清晰的愿景，怀抱希望前行会得到指引。", reversed: "对方向感到迷茫或灰心，重拾信念。" },
      wealth: { upright: "财务前景转好，乐观而理性地规划未来。", reversed: "对财务缺乏信心或过度悲观，稳住心态。" }
    }
  },
  {
    id: "major-18", name: "月亮", en: "The Moon", number: 18, element: "双鱼",
    keywords: ["幻象", "潜意识", "不安", "直觉"],
    meanings: {
      general: { upright: "事情尚不明朗，恐惧与幻象容易放大。别被情绪的迷雾带偏，让直觉带你穿过夜色。", reversed: "迷雾开始散去，真相逐渐清晰，不安随之消退。" },
      love: { upright: "关系中有未明的疑虑或误解，别急着下结论。倾听直觉。", reversed: "误会逐渐澄清，隐藏的情绪浮现并得到释放。" },
      career: { upright: "信息不明或暗流涌动，谨慎行事，别凭猜测决定。", reversed: "真相浮出，困惑消散，可以看清方向了。" },
      wealth: { upright: "财务状况不透明，警惕看不清的风险。", reversed: "迷雾散去，财务问题的根源逐渐明朗。" }
    }
  },
  {
    id: "major-19", name: "太阳", en: "The Sun", number: 19, element: "太阳",
    keywords: ["喜悦", "成功", "活力", "清晰"],
    meanings: {
      general: { upright: "阳光普照，喜悦与成功随之而来。此刻万物清晰、充满生命力，尽情绽放你的光芒。", reversed: "喜悦被暂时遮蔽，或过度乐观忽略了现实。光仍在，只是需要拨云。" },
      love: { upright: "关系温暖明朗，充满真诚的喜悦与活力。", reversed: "光彩暂时黯淡，或表面热闹掩盖了问题。回归真诚。" },
      career: { upright: "成果显现、备受认可，是发光发热的好时候。", reversed: "成功来得慢一些，或信心受挫。别急，光会回来。" },
      wealth: { upright: "财务明朗、收获在望，光明磊落地经营。", reversed: "对财务过度乐观，留意隐藏的支出。" }
    }
  },
  {
    id: "major-20", name: "审判", en: "Judgement", number: 20, element: "冥王星",
    keywords: ["觉醒", "召唤", "清算", "重生"],
    meanings: {
      general: { upright: "一次内在的觉醒，让你重新审视过往并回应更高的召唤。放下评判，迎接新生的自己。", reversed: "自我批判过重或迟迟不愿面对，错过了觉醒的时机。倾听内心的召唤。" },
      love: { upright: "关系迎来清算与和解，宽恕带来重生的契机。", reversed: "困在旧账或悔恨里，难以翻篇。学会放下。" },
      career: { upright: "重新评估方向，一次转变或复出正当其时。", reversed: "犹豫不决或自我怀疑，错失变革良机。" },
      wealth: { upright: "全面复盘财务，重整旗鼓迎来新局。", reversed: "回避财务清算，旧问题悬而未决。" }
    }
  },
  {
    id: "major-21", name: "世界", en: "The World", number: 21, element: "土星",
    keywords: ["圆满", "完成", "整合", "成就"],
    meanings: {
      general: { upright: "一个循环圆满收束，你抵达了阶段性的完整。庆祝成就，也准备好迎接下一段旅程。", reversed: "接近完成却卡在最后一步，或缺了某块拼图。补齐它，就能圆满。" },
      love: { upright: "关系走向圆满与稳定，彼此完整地在一起。", reversed: "关系差一点到位，仍有未了的功课。" },
      career: { upright: "项目圆满达成，收获认可与成就感。", reversed: "临门一脚未完成，需要收尾。别半途而废。" },
      wealth: { upright: "财务目标达成，进入丰盈稳定的阶段。", reversed: "距目标仅一步之遥，坚持到底。" }
    }
  }
];

// ---------------------------------------------------------------------------
// 小阿卡纳 56 张（组合生成）
// ---------------------------------------------------------------------------
const SUITS = {
  wands: { cn: "权杖", element: "火", theme: "热情、行动、创造与意志", loveTheme: "激情与冲劲", careerTheme: "事业野心与行动力", wealthTheme: "投入与开拓" },
  cups: { cn: "圣杯", element: "水", theme: "情感、关系、直觉与心灵", loveTheme: "情感与亲密", careerTheme: "人际与感受", wealthTheme: "价值与满足感" },
  swords: { cn: "宝剑", element: "风", theme: "思想、沟通、真相与冲突", loveTheme: "沟通与心结", careerTheme: "决策与博弈", wealthTheme: "理性与风险" },
  pentacles: { cn: "星币", element: "土", theme: "现实、物质、身体与财务", loveTheme: "稳定与踏实", careerTheme: "务实与积累", wealthTheme: "金钱与资源" }
};

// 数字 1-10 的语义（正 / 逆）
const NUM = {
  1: { name: "王牌", up: "全新能量的种子，一个纯粹而充满潜力的开端", rev: "开端受阻或机会尚未把握，能量还未落地" },
  2: { name: "二", up: "平衡与选择，两股力量之间的协调与初步决定", rev: "失衡或犹豫，难以取舍" },
  3: { name: "三", up: "初步的成长与合作，努力开始显现成果", rev: "协作不顺或进展停滞，成果延迟" },
  4: { name: "四", up: "稳固与休整，把已有的基础守好", rev: "过度保守或停滞，也可能是根基松动" },
  5: { name: "五", up: "冲突与考验，遇到挑战与失落", rev: "冲突缓和或从挫折中走出" },
  6: { name: "六", up: "和谐与回馈，付出与收获趋于平衡", rev: "失衡或旧问题重现，回馈受阻" },
  7: { name: "七", up: "考验耐心与坚持，需要评估与取舍", rev: "分心、拖延或努力方向偏差" },
  8: { name: "八", up: "专注投入带来进展，勤勉推动局面", rev: "过劳、停滞或用力过猛" },
  9: { name: "九", up: "接近成果，坚持后的收获在望", rev: "焦虑或独木难支，成果差临门一脚" },
  10: { name: "十", up: "一个循环的圆满与完成，也是新阶段的起点", rev: "重担或收尾不顺，圆满受阻" }
};

// 宫廷牌语义（正 / 逆）
const COURT = {
  page: { name: "侍从", num: 11, up: "好奇与学习的新手能量，带着热忱去尝试与探索", rev: "不成熟或三分钟热度，行动缺乏根基" },
  knight: { name: "骑士", num: 12, up: "行动派的推进力量，勇往直前追求目标", rev: "冲动或方向不稳，用力过猛" },
  queen: { name: "皇后", num: 13, up: "成熟而内敛地掌握此花色的能量，以包容与智慧滋养", rev: "情绪化或掌控失衡，能量向内耗散" },
  king: { name: "国王", num: 14, up: "成熟而权威地驾驭此花色的能量，以远见与担当主导", rev: "专断或失控，权威被滥用" }
};

const COURT_EN = { page: "Page", knight: "Knight", queen: "Queen", king: "King" };
const NUM_EN = { 1: "Ace", 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten" };
const SUIT_EN = { wands: "Wands", cups: "Cups", swords: "Swords", pentacles: "Pentacles" };

// —— 英文语义块（与中文平行）——
const SUITS_EN = {
  wands: { name: "Wands", element: "Fire", theme: "passion, action, creativity and will", loveTheme: "passion and drive", careerTheme: "ambition and momentum", wealthTheme: "initiative and enterprise", keywords: ["Wands", "Fire", "Action"] },
  cups: { name: "Cups", element: "Water", theme: "emotion, relationship and the heart", loveTheme: "feelings and intimacy", careerTheme: "people and feelings", wealthTheme: "value and fulfillment", keywords: ["Cups", "Water", "Emotion"] },
  swords: { name: "Swords", element: "Air", theme: "thought, communication, truth and conflict", loveTheme: "communication and unspoken knots", careerTheme: "decisions and strategy", wealthTheme: "reason and risk", keywords: ["Swords", "Air", "Mind"] },
  pentacles: { name: "Pentacles", element: "Earth", theme: "the material world, body and finances", loveTheme: "stability and grounding", careerTheme: "pragmatism and building", wealthTheme: "money and resources", keywords: ["Pentacles", "Earth", "Material"] }
};
const NUM_SEM_EN = {
  1: { name: "Ace", up: "the seed of fresh, pure potential — a promising beginning", rev: "the opening is blocked or the chance not yet grasped; the energy hasn't landed" },
  2: { name: "Two", up: "balance and choice, coordinating two forces and an early decision", rev: "imbalance or hesitation, hard to choose" },
  3: { name: "Three", up: "early growth and cooperation, effort starting to show", rev: "collaboration stalls or progress is delayed" },
  4: { name: "Four", up: "stability and consolidation, guarding what you have built", rev: "over-caution or stagnation, or shaky foundations" },
  5: { name: "Five", up: "conflict and testing, meeting challenge and loss", rev: "the conflict eases, or you climb out of a setback" },
  6: { name: "Six", up: "harmony and reward, giving and receiving in balance", rev: "imbalance or old problems resurfacing; reward is blocked" },
  7: { name: "Seven", up: "a test of patience and persistence, needing assessment and choice", rev: "distraction, delay or misdirected effort" },
  8: { name: "Eight", up: "focused effort driving progress; diligence moves things forward", rev: "overwork, stagnation, or too much force" },
  9: { name: "Nine", up: "near the result, the harvest of persistence in sight", rev: "anxiety or going it alone; results fall just short" },
  10: { name: "Ten", up: "the fullness and completion of a cycle, and a new beginning", rev: "burden or a rough finish; completion is blocked" }
};
const COURT_SEM_EN = {
  page: { name: "Page", up: "the curious, learning energy of a beginner, trying and exploring with heart", rev: "immaturity or a fleeting spark; action without grounding" },
  knight: { name: "Knight", up: "the driving force of action, charging ahead toward a goal", rev: "impulsiveness or unsteady direction; too much force" },
  queen: { name: "Queen", up: "mastering this suit's energy inwardly, nurturing with warmth and wisdom", rev: "emotional or unbalanced control; the energy drains inward" },
  king: { name: "King", up: "mastering this suit's energy with authority, leading with vision and responsibility", rev: "domineering or out of control; authority misused" }
};

function mkMeaning(suit, coreUp, coreRev) {
  const s = SUITS[suit];
  const line = (theme, core) => `在${theme}方面，${core}（${s.cn}的${s.element}元素能量）。`;
  return {
    general: { upright: `${coreUp}。这是${s.theme}的主题在生活中浮现。`, reversed: `${coreRev}。留意${s.theme}上的失衡。` },
    love: { upright: line(s.loveTheme, coreUp), reversed: line(s.loveTheme, coreRev) },
    career: { upright: line(s.careerTheme, coreUp), reversed: line(s.careerTheme, coreRev) },
    wealth: { upright: line(s.wealthTheme, coreUp), reversed: line(s.wealthTheme, coreRev) }
  };
}

function mkMeaningEn(suit, coreUp, coreRev) {
  const s = SUITS_EN[suit];
  const line = (theme, core) => `In ${theme}, ${core} (the ${s.element} energy of ${s.name}).`;
  const cap = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return {
    general: { upright: `${cap(coreUp)}. The theme of ${s.theme} surfaces in your life.`, reversed: `${cap(coreRev)}. Watch for imbalance around ${s.theme}.` },
    love: { upright: line(s.loveTheme, coreUp), reversed: line(s.loveTheme, coreRev) },
    career: { upright: line(s.careerTheme, coreUp), reversed: line(s.careerTheme, coreRev) },
    wealth: { upright: line(s.wealthTheme, coreUp), reversed: line(s.wealthTheme, coreRev) }
  };
}

function buildMinor() {
  const cards = [];
  for (const suit of Object.keys(SUITS)) {
    const s = SUITS[suit];
    const sEn = SUITS_EN[suit];
    // 数字牌 1-10
    for (let n = 1; n <= 10; n++) {
      const info = NUM[n];
      const infoEn = NUM_SEM_EN[n];
      const num2 = String(n).padStart(2, "0");
      cards.push({
        id: `${suit}-${num2}`,
        name: `${s.cn}${info.name}`,
        en: `${NUM_EN[n]} of ${SUIT_EN[suit]}`,
        arcana: "minor",
        suit,
        number: n,
        element: s.element,
        keywords: [s.cn, info.name, s.element],
        keywordsEn: [sEn.name, infoEn.name, sEn.element],
        meanings: mkMeaning(suit, info.up, info.rev),
        meaningsEn: mkMeaningEn(suit, infoEn.up, infoEn.rev)
      });
    }
    // 宫廷牌
    for (const rank of Object.keys(COURT)) {
      const c = COURT[rank];
      const cEn = COURT_SEM_EN[rank];
      cards.push({
        id: `${suit}-${rank}`,
        name: `${s.cn}${c.name}`,
        en: `${COURT_EN[rank]} of ${SUIT_EN[suit]}`,
        arcana: "minor",
        suit,
        number: c.num,
        element: s.element,
        keywords: [s.cn, c.name, s.element],
        keywordsEn: [sEn.name, cEn.name, sEn.element],
        meanings: mkMeaning(suit, c.up, c.rev),
        meaningsEn: mkMeaningEn(suit, cEn.up, cEn.rev)
      });
    }
  }
  return cards;
}

// —— 大阿卡纳英文牌义（手工）——
const MAJOR_EN = {
  "major-00": { keywords: ["Beginnings", "Adventure", "Innocence", "Potential"], meanings: {
    general: { upright: "A brand-new journey is opening. Set worries down and stay curious — your innocence is your strength. Trust your gut and take the step.", reversed: "You may be reckless, or too afraid of the unknown to begin. Look before you leap." },
    love: { upright: "A fresh spark appears; meet it with an open heart, and don't box this moment in with old stories.", reversed: "Some naivety or avoidance — dodging commitment or ignoring real signals. Be honest about what you want." },
    career: { upright: "Good for starting something new or switching tracks; the unknown holds opportunity. Explore with a beginner's mind.", reversed: "Acting before the plan is ready invites a stumble. Prepare a little more." },
    wealth: { upright: "Open to trying a new approach; a small test is fine. Stay light, but keep an exit.", reversed: "Spending on impulse without a plan gets out of hand. Do the math first." } } },
  "major-01": { keywords: ["Action", "Creation", "Resources", "Focus"], meanings: {
    general: { upright: "You already hold every tool you need; the key is turning intention into action. Focus — you're the one who makes it happen.", reversed: "Ideas without action, or talent aimed the wrong way. Stop talking, and don't use skill to manipulate." },
    love: { upright: "You can actively create the relationship you want; sincere expression will be met. Take initiative.", reversed: "Words and actions don't match, or something's hidden. Align your heart with your deeds." },
    career: { upright: "Skills, contacts and timing are in place — a fine time to make ideas real. Make your move.", reversed: "Resources aren't used where they matter, or it's all packaging. Return to what truly counts." },
    wealth: { upright: "You can turn opportunity into gain; plan actively and results will show.", reversed: "A flashy but hollow plan, or lured by appearances. Verify every figure first." } } },
  "major-02": { keywords: ["Intuition", "The unconscious", "Stillness", "Secrets"], meanings: {
    general: { upright: "The answer isn't outside but deep within. Be still, listen to intuition, and let it surface.", reversed: "You may be ignoring your inner voice or misled by the surface. Slow down and reconnect." },
    love: { upright: "Something is unspoken; feeling it quietly is wiser than pressing. Trust your intuition.", reversed: "Suppressed feelings or things hidden from each other breed misunderstanding. Give emotion an outlet." },
    career: { upright: "Some things are still brewing; no need to show your hand. Observe — the timing isn't ripe.", reversed: "You ignored a doubt, or the information isn't transparent. Verify before you're convinced." },
    wealth: { upright: "Be cautious and observant with money; intuition flags what's off.", reversed: "Unclear about your finances, or avoiding them. Open the books and face it." } } },
  "major-03": { keywords: ["Abundance", "Nurture", "Creativity", "Sensuality"], meanings: {
    general: { upright: "Life is abundant — a good time to nurture, whether a bond, a work, or yourself. Enjoy the fullness.", reversed: "Overgiving while neglecting yourself, or blocked creativity. Care for yourself first." },
    love: { upright: "Warm, nourishing love; tend it and care for each other. Affection will grow.", reversed: "Giving and taking are unbalanced, or control wears the mask of love. Return to equality and ease." },
    career: { upright: "Creativity and cooperation bear fruit; let the project grow slowly. Tending it pays off.", reversed: "Much effort, little growth, or you're skipping rest. Don't let yourself run dry." },
    wealth: { upright: "Finances trend comfortable and steady; invest in what nourishes you long-term.", reversed: "Overspending on pleasure or a lack of restraint. Separate want from need." } } },
  "major-04": { keywords: ["Order", "Authority", "Structure", "Control"], meanings: {
    general: { upright: "Time to build order and take responsibility. Frame the situation with reason and discipline; stability follows.", reversed: "Too rigid or controlling, losing flexibility — or dodging the responsibility you should carry. Balance firmness with give." },
    love: { upright: "The relationship needs stability and commitment; clear boundaries bring security.", reversed: "One side too forceful or stubborn, making things stiff. Listen more and loosen up." },
    career: { upright: "Good for planning and taking the lead; a structured push works.", reversed: "Over-managing or autocratic, so the team can't shine. Delegate a little." },
    wealth: { upright: "Manage money with discipline and planning; steady is the word.", reversed: "Too controlling or rigid, missing flexible chances. Leave some room." } } },
  "major-05": { keywords: ["Tradition", "Belief", "Guidance", "Belonging"], meanings: {
    general: { upright: "Following a proven path and asking someone trustworthy will steady you; tradition and rules are allies now.", reversed: "The old framework no longer fits — time to walk your own way. Don't be bound by convention." },
    love: { upright: "Toward stability and commitment; traditional forms bring reassurance.", reversed: "Unwilling to be bound by convention, or values diverge. Be true to your own rhythm." },
    career: { upright: "Playing by the rules within the system pays; also good for finding a mentor.", reversed: "The system limits you, or you disagree with the mainstream. Unconventional paths are open." },
    wealth: { upright: "Safer to use steady, conventional money methods.", reversed: "Blindly following advice or old habits may not suit you. Judge for yourself." } } },
  "major-06": { keywords: ["Union", "Choice", "Values", "Harmony"], meanings: {
    general: { upright: "An important choice of the heart is before you. Choose true to your values and harmony follows.", reversed: "Clashing values or an off-balance choice; you're not of one mind. Get clear on what you truly value." },
    love: { upright: "A deep connection and attraction, toward real fit. You may face a choice about commitment.", reversed: "Imbalance, poor communication, or wavering before temptation. Be honest with each other." },
    career: { upright: "An important decision or partnership; choose the direction aligned with your values.", reversed: "A partnership hits friction, or you hesitate to choose. Don't betray your heart." },
    wealth: { upright: "Base money choices on long-term value; cooperation can be win-win.", reversed: "Swinging between temptation and reason invites regret. Think twice." } } },
  "major-07": { keywords: ["Will", "Advance", "Control", "Victory"], meanings: {
    general: { upright: "With resolve and self-discipline you can steer opposing forces toward your goal. Focus your direction — victory is near.", reversed: "Unclear direction or inner tug-of-war cancels your force. Unify your intention first." },
    love: { upright: "The relationship moves forward on your initiative; a step further after clearing an obstacle.", reversed: "Out of control or misaligned; pushing hard only stiffens it. Steady yourself first." },
    career: { upright: "An all-out sprint breaks through; control the pace and you'll take the goal.", reversed: "Scattered goals, low drive, progress stalls. Gather your focus." },
    wealth: { upright: "Push financial goals with a firm plan; discipline pays.", reversed: "Wobbly direction or too much force can crash. Hold steady." } } },
  "major-08": { keywords: ["Courage", "Gentleness", "Inner power", "Patience"], meanings: {
    general: { upright: "True strength is gentle, steady self-mastery. Tame inner restlessness with patience and love — you're stronger than you think.", reversed: "Self-doubt or runaway emotion drains your power inward. Be kind to yourself first." },
    love: { upright: "Tend the bond with tolerance and patience; gentle persistence beats force.", reversed: "Insecurity or emotion in the driver's seat wears the relationship out. Find your inner steadiness." },
    career: { upright: "Face challenges with composure and resilience; soft-yet-firm wins the day.", reversed: "Under pressure you lose patience or confidence, and it shows. Reset your mindset." },
    wealth: { upright: "Manage money calmly and patiently; don't be led by emotion.", reversed: "Impulsive spending or anxious decisions unbalance things. Take a breath." } } },
  "major-09": { keywords: ["Introspection", "Solitude", "Guidance", "Seeking"], meanings: {
    general: { upright: "Withdraw inward; solitude brings clear insight. The answer comes from seeking within, not outer noise.", reversed: "Over-isolating or avoiding reality — or refusing guidance you should accept. Don't shut yourself away too tightly." },
    love: { upright: "You need some space to see the relationship clearly, or you meet a more mature bond in the quiet.", reversed: "Too closed off or distant, letting things cool. Open up a little." },
    career: { upright: "Good for independent study and deepening expertise; a calm mind finds the way.", reversed: "Working in a vacuum or out of step with the team stalls progress. Come out and connect." },
    wealth: { upright: "Review finances calmly and independently, free of outside noise.", reversed: "Too cautious or avoidant with money, missing the moment. Act in measure." } } },
  "major-10": { keywords: ["Turning point", "Cycles", "Fortune", "Change"], meanings: {
    general: { upright: "The wheel turns; a turning point is coming. Move with the rhythm of change and catch this upward swing.", reversed: "Fortune dips or you're stuck in a loop. Don't resist — adjust, then flow with it." },
    love: { upright: "A turn in the relationship; letting it unfold naturally brings surprising progress.", reversed: "Ups and downs, or repeating old patterns; break the loop." },
    career: { upright: "A window of opportunity opens; seizing the timing brings a leap.", reversed: "Outside variables disrupt the plan and throw off your pace. Stay flexible." },
    wealth: { upright: "An upward turn in fortune; position yourself with the trend.", reversed: "Finances are hard to predict; avoid big decisions at the low point." } } },
  "major-11": { keywords: ["Fairness", "Cause & effect", "Responsibility", "Balance"], meanings: {
    general: { upright: "Everything runs on cause, effect and balance; decide honestly and responsibly now. You reap what you sow.", reversed: "Dodging responsibility or being unfair; your conscience isn't clear. Face the truth and own your choices." },
    love: { upright: "The relationship needs fairness and candor; problems resolve only when laid on the table.", reversed: "Responsibilities are unevenly shared, or something's hidden; imbalance follows. Be honest." },
    career: { upright: "Handle matters fairly and methodically; contracts and decisions turn out well.", reversed: "There's unfairness or an oversight; check carefully. Don't count on luck." },
    wealth: { upright: "Keep money matters compliant and clear; weigh before deciding.", reversed: "Muddled accounts or hasty decisions plant trouble. Sort it out first." } } },
  "major-12": { keywords: ["Pause", "Perspective", "Surrender", "Insight"], meanings: {
    general: { upright: "A deliberate pause brings a new angle. Let go of attachment, shift your view, and the stuck situation opens up.", reversed: "Pointless delay or sacrifice, stuck in place and unwilling to shift. Release what should be released; move what should move." },
    love: { upright: "Retreat to advance; setting expectations down loosens the bond. See it from their side.", reversed: "Over-sacrificing or a stubborn standoff — both lose. Rebalance." },
    career: { upright: "Pause and reassess; you'll spot a better path.", reversed: "Endless indecision or gridlock just drains you. Make the call." },
    wealth: { upright: "Hold still for now; a new angle makes your finances clearer.", reversed: "Indecision misses the moment, or you cling to a loss. Cut it in time." } } },
  "major-13": { keywords: ["Endings", "Transformation", "Letting go", "Rebirth"], meanings: {
    general: { upright: "A phase reaches its end; only by letting go can new life come. Don't fear endings — they're the path of transformation.", reversed: "Resisting an inevitable ending, clinging to the past and stalling. Let go to move on." },
    love: { upright: "The relationship goes through deep change; the end of an old pattern buys a truer connection.", reversed: "Unwilling to release a finished love, or dragging on out of fear of change. Give each other freedom." },
    career: { upright: "The old wraps up; a pivot or transition brings new chances.", reversed: "Resisting change and clinging to old ways lets the chance slip. Move with the trend." },
    wealth: { upright: "Financial patterns face a reset; ending what doesn't work allows rebirth.", reversed: "Unwilling to change old money habits; problems drag and pile up." } } },
  "major-14": { keywords: ["Balance", "Blending", "Patience", "The middle way"], meanings: {
    general: { upright: "Blend opposing forces with patience and find your middle way. Unhurried and just-right is the wisdom.", reversed: "Imbalance or excess — you've gone to an extreme. Find your rhythm and proportion again." },
    love: { upright: "The bond harmonizes through mutual adjustment; patient tending lasts longer.", reversed: "Out-of-sync steps or impatience cause friction. Slow the run-in." },
    career: { upright: "Balance the sides and proceed step by step; you'll reach the goal steadily.", reversed: "Too much force or unbalanced resources dull efficiency. Recalibrate." },
    wealth: { upright: "Live within your means and build steadily; finances come into balance.", reversed: "Income and outgo are unbalanced, or you're rushing in. Show restraint." } } },
  "major-15": { keywords: ["Bondage", "Desire", "Attachment", "Shadow"], meanings: {
    general: { upright: "You may be caught by desire, habit, or a certain bond. See that the chain is often self-made — you can unbind it anytime.", reversed: "You're breaking free, waking from an old attachment. The release is hard, but the direction is right." },
    love: { upright: "Strong attraction, but perhaps laced with possession or dependence. Tell love apart from clinging.", reversed: "Beginning to shed an unhealthy pattern and reclaim your freedom." },
    career: { upright: "Compromising for material gain, or bound to the job; beware losing autonomy.", reversed: "Stepping out of a suffocating situation and taking back your choice." },
    wealth: { upright: "Driven by materialism or short-term temptation; beware debt or overspending.", reversed: "Beginning to break the money chains and move toward discipline." } } },
  "major-16": { keywords: ["Collapse", "Upheaval", "Awakening", "Release"], meanings: {
    general: { upright: "An old structure crashes down — sudden, yet it clears a false foundation. Break to rebuild; the truth sets you free.", reversed: "Barely propping up a teetering situation, or delaying an inevitable collapse. Better a short pain than a long one." },
    love: { upright: "The relationship goes through a violent shake; truth surfaces. Rupture or turning point, both are new starts.", reversed: "Resisting a necessary break; forcing it to hold only hurts more." },
    career: { upright: "A sudden shock upends the plan — yet forces a new direction out.", reversed: "The crisis is pressed down for now, but the hazard remains. Face the problem." },
    wealth: { upright: "Finances hit an upheaval; a timely response stops the loss and rebuilds.", reversed: "Avoiding a money crisis only lets it snowball." } } },
  "major-17": { keywords: ["Hope", "Healing", "Guidance", "Serenity"], meanings: {
    general: { upright: "After the storm, the light of hope returns. Heal, trust the future — a serene faith guides you on.", reversed: "Losing faith in the future or feeling lost; clouds cover the light. Rekindle hope." },
    love: { upright: "The bond enters a phase of healing and nourishment; sincerity brings calm and hope.", reversed: "Feeling let down or low on faith; it needs time to mend. Don't give up hope." },
    career: { upright: "A clear vision appears; carry hope forward and you'll be guided.", reversed: "Feeling lost or disheartened about direction. Reclaim your faith." },
    wealth: { upright: "The financial outlook brightens; plan the future with optimism and reason.", reversed: "Low confidence or over-pessimism about money. Steady your mindset." } } },
  "major-18": { keywords: ["Illusion", "The unconscious", "Unease", "Intuition"], meanings: {
    general: { upright: "Things aren't clear yet; fear and illusion magnify easily. Don't be led by the emotional fog — let intuition carry you through the night.", reversed: "The fog begins to lift, truth grows clearer, and unease recedes." },
    love: { upright: "Unnamed doubts or misunderstanding; don't rush to conclusions. Listen to intuition.", reversed: "Misreadings clear up; hidden feelings surface and are released." },
    career: { upright: "Info is unclear or currents run beneath; act carefully and don't decide on guesses.", reversed: "Truth surfaces, confusion dissolves — you can see the way now." },
    wealth: { upright: "Finances are opaque; beware risks you can't see clearly.", reversed: "The fog clears and the root of the money problem grows plain." } } },
  "major-19": { keywords: ["Joy", "Success", "Vitality", "Clarity"], meanings: {
    general: { upright: "Sunlight everywhere; joy and success follow. All is clear and full of life — let your light shine freely.", reversed: "Joy is briefly veiled, or optimism overlooks reality. The light is still there — part the clouds." },
    love: { upright: "A warm, bright relationship, full of sincere joy and vitality.", reversed: "The glow dims for now, or surface cheer hides a problem. Return to sincerity." },
    career: { upright: "Results show and recognition comes — a great time to shine.", reversed: "Success comes a bit slower, or confidence takes a knock. Don't rush; the light returns." },
    wealth: { upright: "Finances are bright and gains in sight; earn openly and honestly.", reversed: "Over-optimistic about money; watch for hidden expenses." } } },
  "major-20": { keywords: ["Awakening", "Calling", "Reckoning", "Rebirth"], meanings: {
    general: { upright: "An inner awakening — you review the past and answer a higher calling. Set judgment down and greet your reborn self.", reversed: "Too much self-criticism, or long unwilling to face things, missing the moment to awaken. Listen to the inner call." },
    love: { upright: "The relationship reaches a reckoning and reconciliation; forgiveness offers a chance at rebirth.", reversed: "Stuck in old scores or regret, hard to turn the page. Learn to let go." },
    career: { upright: "Reassess your direction; a change or comeback is right on time.", reversed: "Indecision or self-doubt lets a chance for change slip by." },
    wealth: { upright: "Review finances fully, regroup and greet a new phase.", reversed: "Avoiding a financial reckoning leaves old problems unresolved." } } },
  "major-21": { keywords: ["Completion", "Fulfillment", "Integration", "Achievement"], meanings: {
    general: { upright: "A cycle closes in fullness; you've reached a whole. Celebrate the achievement, and get ready for the next journey.", reversed: "Near completion but stuck on the last step, or a piece is missing. Fill it in and it's whole." },
    love: { upright: "The relationship reaches fullness and stability; you're wholly together.", reversed: "The bond is a step short of arriving; there's still unfinished work." },
    career: { upright: "The project completes in full, bringing recognition and a sense of achievement.", reversed: "The final step is undone; wrap it up. Don't quit halfway." },
    wealth: { upright: "Financial goals are met, entering an abundant, stable phase.", reversed: "Just a step from the goal — see it through." } } }
};

// ---------------------------------------------------------------------------
// 组装 & 输出
// ---------------------------------------------------------------------------
const major = MAJOR.map((c) => ({
  id: c.id,
  name: c.name,
  en: c.en,
  arcana: "major",
  suit: null,
  number: c.number,
  element: c.element,
  keywords: c.keywords,
  keywordsEn: MAJOR_EN[c.id]?.keywords ?? [],
  meanings: normalizeMeanings(c.meanings),
  meaningsEn: MAJOR_EN[c.id] ? normalizeMeanings(MAJOR_EN[c.id].meanings) : undefined
}));

// 修正手工数据里可能的笔误字段，确保四类别 × 正逆位齐全
function normalizeMeanings(m) {
  const cats = ["general", "love", "career", "wealth"];
  const out = {};
  for (const cat of cats) {
    const v = m[cat] || {};
    out[cat] = {
      upright: v.upright || "",
      reversed: v.reversed || ""
    };
  }
  return out;
}

const all = [...major, ...buildMinor()];

// 校验：中英牌义齐全
const missing = [];
for (const c of all) {
  for (const cat of ["general", "love", "career", "wealth"]) {
    if (!c.meanings[cat].upright || !c.meanings[cat].reversed) {
      missing.push(`${c.id}.${cat}(zh)`);
    }
    if (
      !c.meaningsEn ||
      !c.meaningsEn[cat].upright ||
      !c.meaningsEn[cat].reversed
    ) {
      missing.push(`${c.id}.${cat}(en)`);
    }
  }
}
if (missing.length) {
  console.warn("⚠️ 以下牌义缺失，请检查：", missing.join(", "));
}

writeFileSync(OUT, JSON.stringify(all, null, 2) + "\n", "utf8");
console.log(`✅ 生成 ${all.length} 张牌 → ${OUT}`);
console.log(`   大阿卡纳 ${major.length} 张（手工牌义）`);
console.log(`   小阿卡纳 ${all.length - major.length} 张（组合生成）`);
