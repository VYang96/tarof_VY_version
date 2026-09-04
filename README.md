# 月语塔罗 · Moon-speak Tarot

固定牌义为核心的塔罗占卜 · 纯前端 · 离线可用 · 可安装 PWA · chibi 风格牌面。

> 产品定位与需求见 [月语塔罗-PRD_2.md](月语塔罗-PRD_2.md)。本仓库为**阶段一 MVP**（核心闭环已跑通）。

## 技术栈

- **Next.js 16**（App Router）+ **React 19** + **TypeScript**
- **Tailwind CSS 4**（神秘星空主题令牌，见 `app/globals.css`）
- **Zustand**（流程状态机 + localStorage 持久化）
- **Framer Motion**（抽牌/翻牌动画，尊重 `prefers-reduced-motion`）
- **静态导出**（`output: "export"`）：可部署到 Vercel / Netlify / GitHub Pages，零运维
- **PWA**：Service Worker 应用外壳缓存 + `manifest.webmanifest`

## 快速开始

```bash
pnpm install
pnpm dev          # 开发服务器 http://localhost:3000
pnpm build        # 生产构建 + 静态导出到 out/
pnpm lint
```

## 目录结构

```
app/                 路由（App Router）
  page.tsx           首页（chibi 牌阵 hero）
  reading/           占卜流程：类别→问题→牌阵→洗牌抽牌
  result/            解读结果（自动翻牌 → 固定牌义 + AI 深度解读）
  daily/             每日一牌（按日期确定性抽取，测试态）
  history/           本地历史记录
  library/           78 张牌图鉴 + 搜索 + 详情
  settings/          语言 / 主题 / 逆位开关
components/
  card/TarotCard.tsx 程序化 SVG 牌面（支持插画，缺图自动回退）
  card/FlipCard.tsx  3D 翻牌
  layout/            AppShell 顶部导航、PWA 注册
lib/
  data/              静态数据访问层、洗牌抽牌、插画清单解析
  store/             reading / history / settings（Zustand）
  i18n/              文案词典 + useT hook（中英）
  ai/                AI 深度解读抽象层（口子，见下）
data/
  cards.json         78 张牌完整牌义（脚本生成）
  spreads.json       牌阵定义（单张 / 三张）
  card-art.json      牌面插画清单（脚本扫描 public/cards/ 生成）
types/tarot.ts       核心类型（对齐 PRD §4）
scripts/             数据/素材生成脚本（见下）
art/                 chibi 出图 Prompt 套件（gen:art-prompts 生成）
public/cards/        牌面插画（按牌 id 命名）
```

## 脚本

```bash
pnpm gen:cards        # 生成 data/cards.json（78 张牌义）
pnpm gen:art-prompts  # 生成 art/prompts.json + art/README.md（78 张 chibi 出图 Prompt）
pnpm gen:art          # 扫描 public/cards/ 生成插画清单 data/card-art.json
```

## 牌面插画

牌面按「一牌一文件、文件名 = 牌 id」匹配：

```
public/cards/major-06.png    # 恋人 The Lovers
public/cards/cups-02.png      # 圣杯二 Two of Cups
public/cards/wands-king.png   # 权杖国王 King of Wands
```

有图用图（缺图/加载失败自动回退到程序化金色牌面）。放好图后 `pnpm gen:art` 刷新清单即可。

- 出图指引与 78 张 Prompt：见 [art/README.md](art/README.md)（chibi 风格，5:8 竖版，锁定同一风格保持一致）。
- 当前 `public/cards/` 内为**预览瓦片**（由整张拼图 `deck-sheet.jpeg` 切出），图与牌义**未对齐**，仅供效果预览，待替换为正式单张出图。
- 相关脚本：`scripts/crop-sheet.mjs`（切图，`--apply` 写入）、`scripts/review-crop.mjs`（生成检查图）。

## 牌义数据

- **大阿卡纳 22 张**：手工撰写，四类别（综合/感情/事业/财运）× 正逆位。
- **小阿卡纳 56 张**：花色元素 + 数字/宫廷语义组合生成的**首版**，结构完整可用，建议后续润色为终稿。
- 英文牌义（PRD §10）为阶段二内容，尚未补充。

## AI 深度解读（口子已留）

统一接口层在 `lib/ai/`，上层 UI 只依赖 `Interpreter` 类型；接真实模型时**只改 `lib/ai/index.ts` 一处**：

- 方案 A（BYOK）：用户填自己的 Key，浏览器直连模型 API
- 方案 B（前端网关，如 Puter.js）：第三方 SDK 浏览器侧计费
- 方案 C（Serverless 代理）：转发到云函数，你的 Key 藏服务端

当前挂占位实现（用固定牌义流式吐字），已跑通「按需触发 → 流式输出 → 结果缓存」链路。**红线：绝不把共享 API Key 明文放进前端产物。**

## 已实现（阶段一 MVP）

- 核心闭环：设定问题 → 选牌阵 → 洗牌抽牌（含正/逆位）→ 自动翻牌 → 固定牌义 → 保存历史
- 单张 + 三张牌阵；78 张牌数据；程序化 + 插画双模牌面
- 每日一牌 / 历史 / 牌库图鉴 / 设置
- 中英 i18n 框架 + 中文文案；神秘星空视觉；抽牌/翻牌动画
- PWA（可安装 / 离线外壳）+ 静态导出

## 待办

见对话中的 TODO 清单：正式 chibi 牌面出图、AI 接真模型、小阿卡纳牌义润色、英文牌义、更多牌阵、分享卡片、每日一牌完善（每设备唯一种子 + 签到）、免责声明页、部署上线等。

## 部署

静态导出已就绪：`pnpm build` 后将 `out/` 目录托管到任意静态服务（Vercel / Netlify / GitHub Pages）即可。
