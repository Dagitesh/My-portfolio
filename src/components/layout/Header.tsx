"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-[var(--border-subtle)] bg-white/90 shadow-[0_8px_30px_rgba(10,10,10,0.04)] backdrop-blur-md"
          : "border-transparent bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-foreground transition-colors hover:text-gold"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name.split(" ")[0]}
          <span className="text-muted">.</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-cursor="hover"
              className="relative transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:text-foreground hover:after:scale-x-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            data-cursor="hover"
            className="hidden rounded-full border border-foreground/10 bg-foreground px-4 py-2 text-xs font-semibold uppercase tracking-wide text-background shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 hover:border-foreground/20 sm:inline-flex"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-foreground transition-colors hover:border-gold/40 hover:text-gold md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-1 block h-px w-5 origin-center bg-current transition ${
                  open ? "translate-y-[7px] rotate-45" : "translate-y-[5px]"
                }`}
              />
              <span
                className={`absolute left-0 top-1 block h-px w-5 origin-center bg-current transition ${
                  open ? "translate-y-[7px] -rotate-45" : "translate-y-[11px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
            className="border-t border-[var(--border-subtle)] bg-white/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  data-cursor="hover"
                  className="rounded-xl px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-[#fafafa] hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                data-cursor="hover"
                className="mt-2 rounded-full bg-foreground px-4 py-3 text-center text-sm font-semibold text-background"
                onClick={() => setOpen(false)}
              >
                Let&apos;s talk
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
