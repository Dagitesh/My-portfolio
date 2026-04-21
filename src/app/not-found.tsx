import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">404</p>
      <h1 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">This page drifts elsewhere.</h1>
      <p className="mt-3 max-w-md text-muted">
        The route you requested is not part of this portfolio. Return home to keep exploring.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </main>
  );
}
