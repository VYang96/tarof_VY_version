# 牌面插画目录

把 78 张 chibi 牌面图放这里，文件名 = 牌 id + 扩展名，例如：

```
public/cards/major-06.png     # 恋人 The Lovers
public/cards/cups-02.png       # 圣杯二 Two of Cups
public/cards/wands-king.png    # 权杖国王 King of Wands
```

牌 id 见 data/cards.json（或 art/prompts.json）。支持 .png / .jpg / .jpeg / .webp。

放好后运行：

```
pnpm gen:art          # 扫描本目录，生成 data/card-art.json 清单
```

之后牌面会自动用插画；缺图的牌自动回退到程序化金色牌面。
