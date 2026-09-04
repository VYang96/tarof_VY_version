# Chibi 牌面出图 Prompt 套件（78 张）

由 `pnpm gen:art-prompts` 生成。每张 prompt 已含统一风格后缀。

## 统一风格（style）
```
cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```
## 反向提示（negative，支持的工具填）
```
text, words, letters, numbers, watermark, signature, photorealistic, realistic human proportions, extra limbs, deformed, blurry, low quality, multiple cards, grid, collage
```

## 出图与接入约定
- **一张一张出**（或按花色出干净正面图），不要一次生成拼图/网格。
- 比例 **5:8 竖版**（如 832×1280 / 1024×1600），主体居中、留出底部给名称浮层。
- **锁定风格**：固定同一套 style 后缀 + 同一 seed / 同一风格参考图，保证 78 张一致。
- 命名为 `牌id.png`（见下表），放进 `public/cards/`，然后 `pnpm gen:art`。

| 牌 id | 中文 | English | 文件名 |
| --- | --- | --- | --- |
| `major-00` | 愚人 | The Fool | `major-00.png` |
| `major-01` | 魔术师 | The Magician | `major-01.png` |
| `major-02` | 女祭司 | The High Priestess | `major-02.png` |
| `major-03` | 皇后 | The Empress | `major-03.png` |
| `major-04` | 皇帝 | The Emperor | `major-04.png` |
| `major-05` | 教皇 | The Hierophant | `major-05.png` |
| `major-06` | 恋人 | The Lovers | `major-06.png` |
| `major-07` | 战车 | The Chariot | `major-07.png` |
| `major-08` | 力量 | Strength | `major-08.png` |
| `major-09` | 隐士 | The Hermit | `major-09.png` |
| `major-10` | 命运之轮 | Wheel of Fortune | `major-10.png` |
| `major-11` | 正义 | Justice | `major-11.png` |
| `major-12` | 倒吊人 | The Hanged Man | `major-12.png` |
| `major-13` | 死神 | Death | `major-13.png` |
| `major-14` | 节制 | Temperance | `major-14.png` |
| `major-15` | 恶魔 | The Devil | `major-15.png` |
| `major-16` | 高塔 | The Tower | `major-16.png` |
| `major-17` | 星星 | The Star | `major-17.png` |
| `major-18` | 月亮 | The Moon | `major-18.png` |
| `major-19` | 太阳 | The Sun | `major-19.png` |
| `major-20` | 审判 | Judgement | `major-20.png` |
| `major-21` | 世界 | The World | `major-21.png` |
| `wands-01` | 权杖王牌 | Ace of Wands | `wands-01.png` |
| `wands-02` | 权杖二 | Two of Wands | `wands-02.png` |
| `wands-03` | 权杖三 | Three of Wands | `wands-03.png` |
| `wands-04` | 权杖四 | Four of Wands | `wands-04.png` |
| `wands-05` | 权杖五 | Five of Wands | `wands-05.png` |
| `wands-06` | 权杖六 | Six of Wands | `wands-06.png` |
| `wands-07` | 权杖七 | Seven of Wands | `wands-07.png` |
| `wands-08` | 权杖八 | Eight of Wands | `wands-08.png` |
| `wands-09` | 权杖九 | Nine of Wands | `wands-09.png` |
| `wands-10` | 权杖十 | Ten of Wands | `wands-10.png` |
| `wands-page` | 权杖侍从 | Page of Wands | `wands-page.png` |
| `wands-knight` | 权杖骑士 | Knight of Wands | `wands-knight.png` |
| `wands-queen` | 权杖皇后 | Queen of Wands | `wands-queen.png` |
| `wands-king` | 权杖国王 | King of Wands | `wands-king.png` |
| `cups-01` | 圣杯王牌 | Ace of Cups | `cups-01.png` |
| `cups-02` | 圣杯二 | Two of Cups | `cups-02.png` |
| `cups-03` | 圣杯三 | Three of Cups | `cups-03.png` |
| `cups-04` | 圣杯四 | Four of Cups | `cups-04.png` |
| `cups-05` | 圣杯五 | Five of Cups | `cups-05.png` |
| `cups-06` | 圣杯六 | Six of Cups | `cups-06.png` |
| `cups-07` | 圣杯七 | Seven of Cups | `cups-07.png` |
| `cups-08` | 圣杯八 | Eight of Cups | `cups-08.png` |
| `cups-09` | 圣杯九 | Nine of Cups | `cups-09.png` |
| `cups-10` | 圣杯十 | Ten of Cups | `cups-10.png` |
| `cups-page` | 圣杯侍从 | Page of Cups | `cups-page.png` |
| `cups-knight` | 圣杯骑士 | Knight of Cups | `cups-knight.png` |
| `cups-queen` | 圣杯皇后 | Queen of Cups | `cups-queen.png` |
| `cups-king` | 圣杯国王 | King of Cups | `cups-king.png` |
| `swords-01` | 宝剑王牌 | Ace of Swords | `swords-01.png` |
| `swords-02` | 宝剑二 | Two of Swords | `swords-02.png` |
| `swords-03` | 宝剑三 | Three of Swords | `swords-03.png` |
| `swords-04` | 宝剑四 | Four of Swords | `swords-04.png` |
| `swords-05` | 宝剑五 | Five of Swords | `swords-05.png` |
| `swords-06` | 宝剑六 | Six of Swords | `swords-06.png` |
| `swords-07` | 宝剑七 | Seven of Swords | `swords-07.png` |
| `swords-08` | 宝剑八 | Eight of Swords | `swords-08.png` |
| `swords-09` | 宝剑九 | Nine of Swords | `swords-09.png` |
| `swords-10` | 宝剑十 | Ten of Swords | `swords-10.png` |
| `swords-page` | 宝剑侍从 | Page of Swords | `swords-page.png` |
| `swords-knight` | 宝剑骑士 | Knight of Swords | `swords-knight.png` |
| `swords-queen` | 宝剑皇后 | Queen of Swords | `swords-queen.png` |
| `swords-king` | 宝剑国王 | King of Swords | `swords-king.png` |
| `pentacles-01` | 星币王牌 | Ace of Pentacles | `pentacles-01.png` |
| `pentacles-02` | 星币二 | Two of Pentacles | `pentacles-02.png` |
| `pentacles-03` | 星币三 | Three of Pentacles | `pentacles-03.png` |
| `pentacles-04` | 星币四 | Four of Pentacles | `pentacles-04.png` |
| `pentacles-05` | 星币五 | Five of Pentacles | `pentacles-05.png` |
| `pentacles-06` | 星币六 | Six of Pentacles | `pentacles-06.png` |
| `pentacles-07` | 星币七 | Seven of Pentacles | `pentacles-07.png` |
| `pentacles-08` | 星币八 | Eight of Pentacles | `pentacles-08.png` |
| `pentacles-09` | 星币九 | Nine of Pentacles | `pentacles-09.png` |
| `pentacles-10` | 星币十 | Ten of Pentacles | `pentacles-10.png` |
| `pentacles-page` | 星币侍从 | Page of Pentacles | `pentacles-page.png` |
| `pentacles-knight` | 星币骑士 | Knight of Pentacles | `pentacles-knight.png` |
| `pentacles-queen` | 星币皇后 | Queen of Pentacles | `pentacles-queen.png` |
| `pentacles-king` | 星币国王 | King of Pentacles | `pentacles-king.png` |

## 逐张 Prompt

### 愚人 · The Fool (`major-00`)
```
a cheerful chibi youth stepping off a cliff edge with a small knapsack on a stick, a little white dog at the feet, holding a white rose, sunny sky, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 魔术师 · The Magician (`major-01`)
```
a chibi mage pointing one hand to the sky and one to the ground, a wand, cup, sword and pentacle floating on a table, a glowing infinity symbol above the head, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 女祭司 · The High Priestess (`major-02`)
```
a serene chibi priestess seated between one black and one white pillar, a crescent moon at her feet, a starry veil of pomegranates behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 皇后 · The Empress (`major-03`)
```
a gentle chibi empress with a flower crown on a cushioned throne in a lush green garden, golden wheat field, a heart Venus symbol, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 皇帝 · The Emperor (`major-04`)
```
a stern little chibi emperor on a grey stone throne carved with ram heads, holding an ankh scepter, red mountains behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 教皇 · The Hierophant (`major-05`)
```
a kindly chibi high priest in robes raising a hand in blessing, two tiny acolytes kneeling below, crossed golden keys, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 恋人 · The Lovers (`major-06`)
```
two cute chibi lovers standing under a big benevolent angel with spread wings, a bright sun above, a tree behind each of them, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 战车 · The Chariot (`major-07`)
```
a determined chibi charioteer standing in an ornate chariot pulled by one black and one white sphinx, a starry canopy above, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 力量 · Strength (`major-08`)
```
a gentle chibi girl softly closing the mouth of a big friendly lion, a glowing infinity symbol above her head, calm meadow, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 隐士 · The Hermit (`major-09`)
```
a small chibi hermit in a grey hooded cloak on a snowy mountaintop, holding up a glowing lantern with a star inside, a wooden staff, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 命运之轮 · Wheel of Fortune (`major-10`)
```
a big ornate golden wheel of fortune with a chibi sphinx resting on top, little mystical creatures around it, clouds in the corners, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 正义 · Justice (`major-11`)
```
a calm chibi figure on a throne holding an upright sword in one hand and balanced golden scales in the other, between two pillars, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 倒吊人 · The Hanged Man (`major-12`)
```
a peaceful chibi figure hanging upside-down by one foot from a wooden T-shaped tree, a gentle smile and a golden halo around the head, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 死神 · Death (`major-13`)
```
a cute non-scary chibi skeleton knight in armor riding a white pony, holding a black flag with a white rose, a soft sunrise behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 节制 · Temperance (`major-14`)
```
a chibi angel gently pouring shimmering water between two golden cups, one foot on land and one in a pool, a path leading to mountains, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 恶魔 · The Devil (`major-15`)
```
a small comical chibi devil perched on a block above two cute little imps loosely chained, holding a torch, playful not frightening, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 高塔 · The Tower (`major-16`)
```
a tall stone tower struck by a lightning bolt, its crown blasted off, two tiny chibi figures tumbling out, small flames, dark stormy sky, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星星 · The Star (`major-17`)
```
a hopeful chibi girl kneeling by a calm pool, pouring water from two jugs, one big bright star and seven small stars in the night sky, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 月亮 · The Moon (`major-18`)
```
a big gentle crescent-moon face in the night sky, a chibi dog and wolf howling upward, a little crayfish in a pool, two towers in the distance, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 太阳 · The Sun (`major-19`)
```
a joyful chibi child riding a white pony under a big smiling golden sun, tall sunflowers, a red banner waving, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 审判 · Judgement (`major-20`)
```
a chibi angel blowing a golden trumpet in the clouds, little chibi figures rising with arms open from below, mountains behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 世界 · The World (`major-21`)
```
a happy dancing chibi figure inside a green laurel wreath, holding two wands, a tiny angel, eagle, bull and lion in the four corners, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖王牌 · Ace of Wands (`wands-01`)
```
a chibi hand emerging from a cloud grasping a sprouting wooden wand with fresh green leaves, a distant castle on a hill, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖二 · Two of Wands (`wands-02`)
```
a chibi figure standing on a castle terrace holding a small globe, gazing into the distance, two wands beside, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖三 · Three of Wands (`wands-03`)
```
a chibi figure standing on a cliff watching little ships sail across the sea, three wands planted in the ground, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖四 · Four of Wands (`wands-04`)
```
four upright wands forming a flower-garland gateway, two tiny chibi figures celebrating with bouquets, a castle behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖五 · Five of Wands (`wands-05`)
```
five cute chibi youths playfully clashing wooden wands together in a friendly mock battle, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖六 · Six of Wands (`wands-06`)
```
a proud chibi rider on a horse wearing a laurel wreath, holding a wand topped with a wreath, a little cheering crowd, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖七 · Seven of Wands (`wands-07`)
```
a brave chibi figure on higher ground defending with a wand against six wands rising from below, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖八 · Eight of Wands (`wands-08`)
```
eight wands flying like arrows through a clear sky over rolling green hills and a river, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖九 · Nine of Wands (`wands-09`)
```
a weary but ready chibi guard leaning on a wand with a bandaged head, eight wands standing like a fence behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖十 · Ten of Wands (`wands-10`)
```
a chibi figure bundling and carrying ten heavy wands with both arms toward a distant little house, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖侍从 · Page of Wands (`wands-page`)
```
a curious chibi youth in a desert admiring a single tall wand, salamander pattern on the tunic, small pyramids behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖骑士 · Knight of Wands (`wands-knight`)
```
an eager chibi knight in orange armor on a rearing horse holding a wand, desert dunes and pyramids behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖皇后 · Queen of Wands (`wands-queen`)
```
a warm chibi queen on a throne decorated with sunflowers, a little black cat at her feet, holding a wand and a sunflower, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 权杖国王 · King of Wands (`wands-king`)
```
a confident chibi king on a throne carved with lions and salamanders, holding a flowering wand, a small live salamander nearby, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯王牌 · Ace of Cups (`cups-01`)
```
a chibi hand from a cloud holding an overflowing golden cup, a little white dove dipping toward it, five streams of water, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯二 · Two of Cups (`cups-02`)
```
two shy chibi lovers gently exchanging golden cups, a winged caduceus with a small lion head floating above, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯三 · Three of Cups (`cups-03`)
```
three cheerful chibi friends dancing in a circle raising their cups in a toast, fruits and grapevines around, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯四 · Four of Cups (`cups-04`)
```
a bored chibi youth sitting cross-armed under a tree ignoring a cup offered by a cloud-hand, three cups on the grass, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯五 · Five of Cups (`cups-05`)
```
a cloaked chibi figure looking down sadly at three spilled cups, two upright cups still standing behind, a bridge and castle, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯六 · Six of Cups (`cups-06`)
```
a sweet chibi child handing a cup full of white flowers to a smaller child in a sunny village courtyard, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯七 · Seven of Cups (`cups-07`)
```
a chibi figure gazing up at seven glowing cups floating in clouds, each holding a wonder — a castle, jewels, a tiny dragon, a wreath, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯八 · Eight of Cups (`cups-08`)
```
a lonely chibi figure with a staff walking away toward mountains at night, eight cups left behind, a crescent moon, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯九 · Nine of Cups (`cups-09`)
```
a very satisfied chibi figure sitting with crossed arms and a big grin, nine golden cups arced on a curved shelf behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯十 · Ten of Cups (`cups-10`)
```
a happy chibi family with two dancing children under a rainbow arc of ten cups, a cozy little house and river, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯侍从 · Page of Cups (`cups-page`)
```
a playful chibi youth in blue holding up a cup with a tiny fish popping its head out, a wavy sea behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯骑士 · Knight of Cups (`cups-knight`)
```
a gentle chibi knight on a calm white horse offering a golden cup forward, a winding river and cliffs, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯皇后 · Queen of Cups (`cups-queen`)
```
a dreamy chibi queen on a seashell throne by the sea, cradling a closed ornate golden cup, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 圣杯国王 · King of Cups (`cups-king`)
```
a composed chibi king on a throne floating on a choppy blue sea, holding a cup steadily, a little fish and ship nearby, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑王牌 · Ace of Swords (`swords-01`)
```
a chibi hand from a cloud grasping an upright sword crowned with a golden crown and laurel, jagged mountains below, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑二 · Two of Swords (`swords-02`)
```
a blindfolded chibi figure seated holding two crossed swords over the chest, a calm sea and crescent moon behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑三 · Three of Swords (`swords-03`)
```
a big cute red heart pierced by three crossing swords, grey rain clouds and gentle rain, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑四 · Four of Swords (`swords-04`)
```
a chibi knight lying peacefully in rest atop a tomb, hands together in prayer, three swords on the wall and one below, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑五 · Five of Swords (`swords-05`)
```
a smug little chibi figure gathering three swords with a grin, two dejected tiny figures walking away, windy cloudy sky, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑六 · Six of Swords (`swords-06`)
```
a chibi ferryman poling a small boat carrying a cloaked figure and a child, six swords standing in the boat, calm water ahead, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑七 · Seven of Swords (`swords-07`)
```
a sneaky chibi figure tiptoeing away carrying five swords and glancing back, two swords left stuck in the ground, tents behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑八 · Eight of Swords (`swords-08`)
```
a lightly bound and blindfolded chibi figure surrounded by eight swords stuck upright in the ground, a castle on a cliff behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑九 · Nine of Swords (`swords-09`)
```
a chibi figure sitting up in bed at night covering the face in worry, nine swords mounted on the dark wall, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑十 · Ten of Swords (`swords-10`)
```
a cartoonish chibi figure lying face-down with ten swords in the back (gentle and non-gory), a bright dawn breaking on the horizon, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑侍从 · Page of Swords (`swords-page`)
```
an alert chibi youth brandishing a sword with hair blowing, standing on a windy hilltop with birds and churning clouds, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑骑士 · Knight of Swords (`swords-knight`)
```
a fierce chibi knight charging on a galloping horse with sword raised high, strong wind and stormy clouds, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑皇后 · Queen of Swords (`swords-queen`)
```
a stern but fair chibi queen on a throne holding an upright sword, one hand extended, clouds and a single bird, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 宝剑国王 · King of Swords (`swords-king`)
```
an authoritative chibi king on a throne holding an upright sword, butterflies and birds carved on the throne, clear blue sky, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币王牌 · Ace of Pentacles (`pentacles-01`)
```
a chibi hand from a cloud holding a large golden pentacle coin, a flowering garden archway and green path below, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币二 · Two of Pentacles (`pentacles-02`)
```
a cheerful chibi juggler balancing two golden pentacles linked by an infinity ribbon, two little ships on rolling waves, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币三 · Three of Pentacles (`pentacles-03`)
```
a little chibi mason on scaffolding carving pentacles in a cathedral, two robed advisors looking on, three pentacles, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币四 · Four of Pentacles (`pentacles-04`)
```
a chibi figure hugging one pentacle to the chest, one balanced on the head, two under the feet, a city skyline behind (a cute miser), cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币五 · Five of Pentacles (`pentacles-05`)
```
two ragged little chibi figures trudging through snow past a glowing stained-glass church window with five pentacles, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币六 · Six of Pentacles (`pentacles-06`)
```
a kind chibi merchant holding golden scales, dropping coins to two small kneeling figures, six pentacles floating above, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币七 · Seven of Pentacles (`pentacles-07`)
```
a chibi farmer leaning on a hoe gazing thoughtfully at a leafy bush growing seven golden pentacles, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币八 · Eight of Pentacles (`pentacles-08`)
```
a diligent chibi craftsman at a workbench carving pentacles, finished ones hung on the wall, eight pentacles total, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币九 · Nine of Pentacles (`pentacles-09`)
```
an elegant chibi lady in a lush vineyard garden with a little falcon perched on her gloved hand, nine pentacles among the vines, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币十 · Ten of Pentacles (`pentacles-10`)
```
a cozy chibi elder with family and two little dogs under an archway of ten pentacles, a castle courtyard and home, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币侍从 · Page of Pentacles (`pentacles-page`)
```
a wonder-struck chibi youth in a green flowering field holding up a single golden pentacle with both hands, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币骑士 · Knight of Pentacles (`pentacles-knight`)
```
a patient chibi knight on a sturdy still workhorse holding a pentacle, freshly plowed fields behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币皇后 · Queen of Pentacles (`pentacles-queen`)
```
a nurturing chibi queen on a throne in a rose garden cradling a golden pentacle, a little rabbit hopping nearby, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```

### 星币国王 · King of Pentacles (`pentacles-king`)
```
a prosperous chibi king on a throne wrapped in grapevines with a small bull, holding a pentacle, a castle behind, cute chibi Q-version style, kawaii, big expressive eyes, soft cel shading, rounded shapes, clean bold outlines, tarot card illustration, single centered subject, portrait vertical 5:8 composition, deep indigo-purple night-sky background with subtle golden stars, gold (#d6ac57) decorative accents, mystical dreamy cohesive tarot deck art, soft glow, no text, no lettering, no border frame, high detail
```
