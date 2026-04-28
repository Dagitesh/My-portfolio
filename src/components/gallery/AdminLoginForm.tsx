"use client";

import { useState } from "react";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("email", email.trim());
      form.set("password", password);
      const resp = await fetch("/api/auth/login", { method: "POST", body: form });
      const json = (await resp.json()) as { ok: boolean; error?: string };
      if (!resp.ok || !json.ok) {
        setError(json.error ?? "Login failed.");
        return;
      }
      window.location.reload();
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-[var(--border-subtle)] bg-white p-8 shadow-[var(--shadow-soft)]"
    >
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-2xl border border-[var(--border-subtle)] bg-white px-4 text-sm text-foreground outline-none ring-gold/40 focus:ring-2"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="h-11 rounded-2xl border border-[var(--border-subtle)] bg-white px-4 text-sm text-foreground outline-none ring-gold/40 focus:ring-2"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </label>

        {error ? <p className="text-sm text-pink">{error}</p> : null}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-xs font-semibold uppercase tracking-wide text-background shadow-[var(--shadow-soft)] transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </div>
    </form>
  );
}

