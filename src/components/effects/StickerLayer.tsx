"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Sticker = {
  id: string;
  label: string;
  tone: "gold" | "pink" | "orange" | "green";
  x: string;
  y: string;
  rotate: number;
  size: "sm" | "md";
};

const stickers: Sticker[] = [
  { id: "s1", label: "UI/UX", tone: "pink", x: "8%", y: "18%", rotate: -8, size: "sm" },
  { id: "s2", label: "Branding", tone: "orange", x: "82%", y: "22%", rotate: 10, size: "sm" },
  { id: "s3", label: "Systems", tone: "gold", x: "14%", y: "72%", rotate: 7, size: "md" },
  { id: "s4", label: "Frontend", tone: "green", x: "78%", y: "70%", rotate: -6, size: "md" },
];

function toneClass(tone: Sticker["tone"]) {
  switch (tone) {
    case "pink":
      return "bg-pink/15 border-pink/30 text-foreground";
    case "orange":
      return "bg-orange/15 border-orange/30 text-foreground";
    case "green":
      return "bg-green/20 border-green/35 text-foreground";
    default:
      return "bg-gold/12 border-gold/30 text-foreground";
  }
}

export function StickerLayer() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const floatY = useTransform(scrollY, [0, 700], [0, -24]);
  const floatY2 = useTransform(scrollY, [0, 700], [0, 18]);

  const [mouse, setMouse] = useState({ x: 0.5, y: 0.4 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      setMouse({ x: e.clientX / w, y: e.clientY / h });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  const parallax = useMemo(() => {
    const dx = (mouse.x - 0.5) * 22;
    const dy = (mouse.y - 0.5) * 18;
    return { dx, dy };
  }, [mouse]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: floatY }}
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,79,163,0.18),transparent_60%)] blur-2xl"
      />
      <motion.div
        style={{ y: floatY2 }}
        className="absolute -right-28 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(182,255,108,0.18),transparent_62%)] blur-2xl"
      />
      <motion.div
        style={{ y: floatY }}
        className="absolute left-1/2 top-[65%] h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(200,140,23,0.14),transparent_64%)] blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 14, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
        style={{
          left: "6%",
          top: "48%",
          transform: `translate3d(${parallax.dx * -0.6}px, ${parallax.dy * -0.5}px, 0)`,
        }}
        className="absolute hidden md:block"
      >
        <div className="w-44 rounded-2xl border border-foreground/10 bg-white/80 p-3 shadow-[0_28px_80px_rgba(10,10,10,0.10)] backdrop-blur-sm">
          <div className="h-24 rounded-xl border border-foreground/10 bg-[radial-gradient(circle_at_30%_25%,rgba(255,122,0,0.26),transparent_55%),radial-gradient(circle_at_80%_75%,rgba(255,79,163,0.22),transparent_60%)]" />
          <div className="mt-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            <span>Exhibit</span>
            <span className="text-gold">#25</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16, rotate: 8 }}
        animate={{ opacity: 1, y: 0, rotate: 8 }}
        transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] as const }}
        style={{
          left: "84%",
          top: "52%",
          transform: `translate3d(${parallax.dx * 0.6}px, ${parallax.dy * 0.55}px, 0)`,
        }}
        className="absolute hidden lg:block"
      >
        <div className="w-48 rounded-2xl border border-foreground/10 bg-white/80 p-3 shadow-[0_28px_80px_rgba(10,10,10,0.10)] backdrop-blur-sm">
          <div className="h-24 rounded-xl border border-foreground/10 bg-[radial-gradient(circle_at_40%_30%,rgba(182,255,108,0.26),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(200,140,23,0.22),transparent_60%)]" />
          <div className="mt-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            <span>Studio</span>
            <span className="text-pink">Live</span>
          </div>
        </div>
      </motion.div>

      <motion.svg
        className="pointer-events-none absolute bottom-[4%] left-[-2%] hidden h-24 w-64 opacity-35 sm:block md:bottom-[8%] md:left-[1%] md:h-28 md:w-72 md:opacity-40"
        viewBox="0 0 220 120"
        fill="none"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <motion.path
          d="M10 70 C 40 20, 90 110, 130 55 C 160 15, 190 85, 210 35"
          stroke="rgba(10,10,10,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      {stickers.map((s, idx) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 12, rotate: s.rotate - 6 }}
          animate={{ opacity: 1, y: 0, rotate: s.rotate }}
          transition={{ duration: 0.7, delay: 0.15 + idx * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
          style={{
            left: s.x,
            top: s.y,
            transform: `translate3d(${parallax.dx * (idx % 2 ? 1 : -0.7)}px, ${
              parallax.dy * (idx % 2 ? 1 : -0.7)
            }px, 0)`,
          }}
          className="absolute"
        >
          <div
            className={[
              "select-none rounded-2xl border px-4 py-2 shadow-[0_18px_60px_rgba(10,10,10,0.08)]",
              "backdrop-blur-sm",
              "font-[var(--font-accent)] text-xs tracking-wide",
              s.size === "md" ? "sm:text-sm" : "",
              toneClass(s.tone),
            ].join(" ")}
          >
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
