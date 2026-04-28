import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGalleryItems } from "@/lib/gallery.server";
import { getAdminSession } from "@/lib/auth.server";

export default async function GalleryPage() {
  const items = await getGalleryItems();
  const session = await getAdminSession();

  return (
    <main className="flex-1">
      <section className="border-b border-[var(--border-subtle)] bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <SectionHeading
            eyebrow="Gallery"
            title="Designs, visuals, and experiments."
          />
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <Link href="/#work" className="underline-offset-4 transition-colors hover:text-gold hover:underline">
              ← Back to work
            </Link>
            {session ? (
              <>
                <span aria-hidden className="text-muted/40">
                  ·
                </span>
                <Link
                  href="/gallery/upload"
                  className="underline-offset-4 transition-colors hover:text-gold hover:underline"
                >
                  Upload
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-white p-10 text-muted shadow-[var(--shadow-soft)]">
              <p className="font-medium text-foreground">No gallery images yet.</p>
              <p className="mt-2 text-sm leading-relaxed">
                Add files to <span className="font-mono text-foreground">public/gallery</span> (jpg, png, webp, avif,
                gif) and refresh this page.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <figure
                  key={item.filename}
                  className="group relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-95" />
                  </div>
                  <figcaption className="flex items-center justify-between gap-4 px-6 py-5">
                    <span className="truncate text-sm font-medium text-foreground">{item.alt}</span>
                    <a
                      href={item.src}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold uppercase tracking-wide text-gold underline-offset-4 hover:underline"
                    >
                      Open ↗
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

