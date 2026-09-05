"use client";
import { motion, useReducedMotion } from "framer-motion";
import { CardBack, CardFace, cardGlyph } from "./TarotCard";
import type { Card } from "@/types/tarot";

export interface FlipCardProps {
  card?: Card | null;
  reversed?: boolean;
  revealed: boolean;
  positionLabel?: string;
  size?: number;
  onReveal?: () => void;
}

/** 3D 翻牌：背面 → 正面。尊重「减少动态效果」偏好。 */
export function FlipCard({
  card,
  reversed = false,
  revealed,
  positionLabel,
  size = 104,
  onReveal,
}: FlipCardProps) {
  const reduce = useReducedMotion();
  const height = Math.round(size * 1.6);
  const interactive = !revealed && !!onReveal;

  return (
    <figure className="flex flex-col items-center gap-2">
      {positionLabel && (
        <figcaption className="text-xs text-fg-muted">{positionLabel}</figcaption>
      )}
      <button
        type="button"
        onClick={interactive ? onReveal : undefined}
        disabled={!interactive}
        style={{ width: size, height, perspective: 1000 }}
        className={`relative rounded-xl ${interactive ? "glow-gold cursor-pointer" : "cursor-default"}`}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          initial={false}
          animate={{ rotateY: revealed ? 0 : 180 }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
          }
        >
          {/* 正面（描边由 CardFace 自己按图/程序化模式决定） */}
          <div
            className="absolute inset-0 overflow-hidden rounded-xl"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <CardFace card={card} reversed={reversed} glyph={cardGlyph(card)} />
          </div>
          {/* 背面 */}
          <div
            className="absolute inset-0 overflow-hidden rounded-xl"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <CardBack />
          </div>
        </motion.div>
      </button>
    </figure>
  );
}
