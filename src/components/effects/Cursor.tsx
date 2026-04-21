"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** Tailwind `h-3 w-3` → 12px; used to center the dot on the pointer. */
const DOT_PX = 12;

function shouldEnableCursor() {
  if (typeof window === "undefined") return false;
  const fine = window.matchMedia?.("(pointer: fine)")?.matches ?? false;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  return fine && !reduce;
}

export function Cursor() {
  const [enabled, setEnabled] = useState<boolean>(() => shouldEnableCursor());

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = useMemo(() => ({ stiffness: 900, damping: 42, mass: 0.45 }), []);
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const left = useTransform(sx, (v) => `${v - DOT_PX / 2}px`);
  const top = useTransform(sy, (v) => `${v - DOT_PX / 2}px`);

  const scale = useSpring(1, { stiffness: 550, damping: 35 });

  useEffect(() => {
    document.body.dataset.cursor = enabled ? "true" : "false";
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const hover = el.closest?.("[data-cursor='hover']");
      scale.set(hover ? 1.7 : 1);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOver);
      document.body.dataset.cursor = "false";
    };
  }, [enabled, scale, x, y]);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!fine || !reduce) return;

    const onChange = () => setEnabled(shouldEnableCursor());
    fine.addEventListener?.("change", onChange);
    reduce.addEventListener?.("change", onChange);
    return () => {
      fine.removeEventListener?.("change", onChange);
      reduce.removeEventListener?.("change", onChange);
    };
  }, []);

  if (!enabled) return null;

  return createPortal(
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[2147483647] h-3 w-3 rounded-full bg-foreground/90 shadow-[0_0_0_10px_rgba(255,255,255,0.55)]"
      style={{ left, top, scale }}
    />,
    document.body,
  );
}
