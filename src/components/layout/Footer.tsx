import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-[var(--border-subtle)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,79,163,0.18)_0%,rgba(200,140,23,0.16)_35%,rgba(255,122,0,0.14)_65%,rgba(182,255,108,0.18)_100%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-serif text-xl text-foreground sm:text-2xl">{siteConfig.name}</p>
            <p className="mt-1 text-sm text-muted">{siteConfig.title}</p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted">
              <Link href="/#work" className="transition-colors hover:text-foreground">
                Work
              </Link>
              <Link href="/#about" className="transition-colors hover:text-foreground">
                About
              </Link>
              <Link href="/#contact" className="transition-colors hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>

          <div className="grid w-full max-w-xl gap-3 sm:grid-cols-3">
            <a
              data-cursor="hover"
              href={`mailto:${siteConfig.email}`}
              className="flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-white/80 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-sm transition hover:border-gold/40"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">Email</span>
              <span className="mt-1 break-all text-xs font-medium text-foreground">{siteConfig.email}</span>
            </a>
            <a
              data-cursor="hover"
              href={`tel:${siteConfig.phoneTel}`}
              className="flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-white/80 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-sm transition hover:border-pink/35"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">Phone</span>
              <span className="mt-1 text-xs font-medium text-foreground">{siteConfig.phone}</span>
            </a>
            <Link
              data-cursor="hover"
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-white/80 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-sm transition hover:border-orange/40"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">GitHub</span>
              <span className="mt-1 text-xs font-medium text-foreground">Open profile ↗</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-8 text-center text-xs text-muted sm:flex-row sm:justify-between sm:text-left">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <span>Next.js · Tailwind · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
