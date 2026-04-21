import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-28 border-t border-[var(--border-subtle)] bg-white px-6 py-24 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">About</p>
            <h2 className="font-[var(--font-accent)] text-4xl font-extrabold leading-[0.98] tracking-tight text-foreground sm:text-6xl">
              I BUILD
              <br />
              PREMIUM
              <br />
              DIGITAL
              <br />
              EXPERIENCES.
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              I’m {siteConfig.name}. A creative software developer and UI/UX designer who ships clean systems, brand-led
              interfaces, and motion details that feel intentional.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-gold/35 bg-white/60 px-3 py-1 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)]">
                Software Engineering
              </span>
              <span className="rounded-full border border-pink/35 bg-white/60 px-3 py-1 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)]">
                UI/UX
              </span>
              <span className="rounded-full border border-orange/35 bg-white/60 px-3 py-1 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)]">
                Branding
              </span>
             
            </div>
          </div>

          <div className="w-full min-w-0 lg:pt-2">
            <Image
              src="/images/profile.png"
              alt="Dagmawit Teshale — portfolio illustration"
              width={633}
              height={430}
              priority
              sizes="(min-width: 1024px) 42rem, 100vw"
              className="h-auto w-full max-w-full rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-soft)]"
            />
          </div>
        </div>

        <div className="grid gap-8 border-t border-[var(--border-subtle)] pt-10 lg:grid-cols-[0.55fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Follow</p>
            <div className="space-y-2 text-sm">
              <a
                data-cursor="hover"
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-white/70 px-4 py-3 text-foreground shadow-[var(--shadow-soft)] transition-colors hover:text-pink"
              >
                GitHub <span className="text-muted">↗</span>
              </a>
              <a
                data-cursor="hover"
                href={`mailto:${siteConfig.email}`}
                className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-white/70 px-4 py-3 text-foreground shadow-[var(--shadow-soft)] transition-colors hover:text-gold"
              >
                Email <span className="text-muted">↗</span>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">What I deliver</p>
            <p className="text-sm leading-relaxed text-muted">
              Design systems, product UI, brand identities, and polished web builds—crafted for clarity, speed, and
              conversion.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Approach</p>
            <p className="text-sm leading-relaxed text-muted">
              Start with narrative, then build structure: grids, components, and motion rules that scale without losing
              personality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
