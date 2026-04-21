"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { StickerLayer } from "@/components/effects/StickerLayer";

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return { first: full, last: "" };
  return { first: parts[0]!, last: parts.slice(1).join(" ") };
}

export function Hero() {
  const { first, last } = splitName(siteConfig.name);

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-0 sm:pb-32 lg:px-8">
      <StickerLayer />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-5xl flex-col gap-10 text-center sm:gap-12"
      >
        <motion.p variants={fadeSlideUp} className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
          Portfolio
        </motion.p>
        <motion.h1
          variants={fadeSlideUp}
          className="font-serif text-4xl leading-[1.03] tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          <span className="flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-5">
            <span className="relative inline-block">
              {first}
              <span
                aria-hidden
                className="absolute -bottom-2 left-1/2 h-[10px] w-[88%] max-w-[9rem] -translate-x-1/2 rounded-full opacity-70 blur-[0.5px] sm:max-w-[11rem]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(200,140,23,0.65), rgba(255,79,163,0.55), rgba(182,255,108,0.55))",
                }}
              />
            </span>
            {last ? <span className="inline-block text-foreground">{last}</span> : null}
          </span>
        </motion.h1>
        <motion.div variants={fadeSlideUp} className="mx-auto max-w-3xl">
          <p className="text-lg text-muted sm:text-xl md:text-2xl">
            <span className="font-[var(--font-accent)] font-bold text-foreground">Creative Software Developer</span>{" "}
            <span className="text-muted">and</span>{" "}
            <span className="font-[var(--font-accent)] font-bold text-foreground">UI/UX Designer</span>
          </p>
          <div className="mx-auto mt-5 h-px w-28 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </motion.div>
        <motion.p variants={fadeSlideUp} className="mx-auto max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          I design systems, brands, and digital experiences that stand out.
        </motion.p>
        <motion.div variants={fadeSlideUp} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/#work"
              data-cursor="hover"
              className="group relative inline-flex min-w-[11rem] items-center justify-center overflow-hidden rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background shadow-[var(--shadow-card)] transition-shadow hover:shadow-[0_20px_60px_rgba(10,10,10,0.12)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(255,79,163,0.32), transparent 55%), radial-gradient(circle at 80% 60%, rgba(200,140,23,0.26), transparent 58%)",
                }}
              />
              <span className="relative">View Work</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/#contact"
              data-cursor="hover"
              className="inline-flex min-w-[11rem] items-center justify-center rounded-full border border-foreground/15 bg-white/70 px-8 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] backdrop-blur-sm transition-colors hover:border-pink/40 hover:text-pink"
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
        <motion.p variants={fadeSlideUp} className="text-xs text-muted">
          Based in Ethiopia · Open to remote collaborations
        </motion.p>
      </motion.div>
    </section>
  );
}
