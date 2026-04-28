"use client";

import { useMemo, useState } from "react";

type UploadResult =
  | { ok: true; filename: string; src: string }
  | { ok: false; error: string };

export function GalleryUploadClient() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<Array<{ name: string; res: UploadResult }>>([]);

  const canSubmit = useMemo(() => {
    return !!files && files.length > 0 && !busy;
  }, [files, busy]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!files || files.length === 0) return;

    setBusy(true);
    setResults([]);

    try {
      const uploaded: Array<{ name: string; res: UploadResult }> = [];

      for (const file of Array.from(files)) {
        const form = new FormData();
        form.set("title", title.trim());
        form.set("file", file, file.name);

        const resp = await fetch("/api/gallery/upload", { method: "POST", body: form });
        const json = (await resp.json()) as UploadResult;
        uploaded.push({ name: file.name, res: json });
      }

      setResults(uploaded);
      setTitle("");
      setFiles(null);
      const input = document.getElementById("gallery-files") as HTMLInputElement | null;
      if (input) input.value = "";
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">You’re signed in as admin.</p>
        <button
          type="button"
          onClick={logout}
          className="text-xs font-semibold uppercase tracking-wide text-gold underline-offset-4 hover:underline"
        >
          Sign out
        </button>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-3xl border border-[var(--border-subtle)] bg-white p-8 shadow-[var(--shadow-soft)]"
      >
        <div className="grid gap-5">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Optional title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-2xl border border-[var(--border-subtle)] bg-white px-4 text-sm text-foreground outline-none ring-gold/40 focus:ring-2"
              placeholder="e.g. Landing page concept"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Files</span>
            <input
              id="gallery-files"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="block w-full cursor-pointer rounded-2xl border border-[var(--border-subtle)] bg-white px-4 py-3 text-sm text-foreground file:mr-4 file:rounded-full file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-background"
            />
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-xs font-semibold uppercase tracking-wide text-background shadow-[var(--shadow-soft)] transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Uploading…" : "Upload"}
          </button>
        </div>
      </form>

      {results.length > 0 ? (
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-soft)]">
          <h2 className="font-serif text-xl text-foreground">Results</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {results.map((r) => (
              <li key={r.name} className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-muted">{r.name}</span>
                {"ok" in r.res && r.res.ok ? (
                  <a
                    className="font-semibold text-gold underline-offset-4 hover:underline"
                    href={r.res.src}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open ↗
                  </a>
                ) : (
                  <span className="text-pink">{(r.res as { ok: false; error: string }).error}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

