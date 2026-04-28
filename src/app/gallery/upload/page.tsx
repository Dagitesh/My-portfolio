import Link from "next/link";
import { AdminLoginForm } from "@/components/gallery/AdminLoginForm";
import { GalleryUploadClient } from "@/components/gallery/GalleryUploadClient";
import { getAdminSession, isAuthConfigured } from "@/lib/auth.server";

export default async function GalleryUploadPage() {
  const session = await getAdminSession();
  const configured = isAuthConfigured();
  return (
    <main className="flex-1 bg-[var(--paper)] px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Gallery</p>
          <h1 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl">Upload designs</h1>
          <p className="text-sm leading-relaxed text-muted">
            This uploader saves files into <span className="font-mono text-foreground">public/gallery</span>. Only you
            can access it after signing in.
          </p>
          <Link href="/gallery" className="text-sm text-muted underline-offset-4 hover:text-gold hover:underline">
            ← Back to gallery
          </Link>
        </div>

        {!configured ? (
          <div className="rounded-3xl border border-gold/35 bg-gold/10 p-6 text-sm text-foreground">
            Set <span className="font-mono">ADMIN_EMAIL</span>, <span className="font-mono">ADMIN_PASSWORD</span>, and{" "}
            <span className="font-mono">AUTH_SECRET</span> in your environment to enable admin login.
          </div>
        ) : session ? (
          <GalleryUploadClient />
        ) : (
          <AdminLoginForm />
        )}
      </div>
    </main>
  );
}

