"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";

type SendState = "idle" | "loading" | "success" | "error";

/** Web3Forms must be called from the browser on the free plan (server-side needs paid + IP allowlist). */
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

function web3formsErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") return "Could not send your message.";
  const o = data as { message?: unknown; body?: { message?: unknown } };
  const fromBody = o.body?.message;
  if (typeof fromBody === "string" && fromBody.trim()) return fromBody;
  if (typeof o.message === "string" && o.message.trim()) return o.message;
  return "Could not send your message.";
}

export function Contact() {
  const [sendState, setSendState] = useState<SendState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      setSendState("error");
      setErrorMessage(
        "Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to .env.local (from web3forms.com), then restart npm run dev.",
      );
      return;
    }

    setSendState("loading");
    setErrorMessage("");

    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio contact from ${name}`,
          from_name: name,
          email,
          message,
        }),
      });

      let data: unknown;
      try {
        data = await res.json();
      } catch {
        setSendState("error");
        setErrorMessage("Invalid response from the email service. Try again.");
        return;
      }

      const ok =
        res.ok &&
        typeof data === "object" &&
        data !== null &&
        (data as { success?: boolean }).success === true;

      if (!ok) {
        setSendState("error");
        setErrorMessage(web3formsErrorMessage(data));
        return;
      }

      setSendState("success");
      form.reset();
      window.setTimeout(() => setSendState("idle"), 5000);
    } catch {
      setSendState("error");
      setErrorMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-28 px-6 py-24 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8"
        >
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something impactful together."
            description="Share a brief note about your project, timeline, and goals. I typically reply within two business days."
          />
          <motion.div variants={fadeSlideUp} className="space-y-4 text-sm text-muted">
            <a
              data-cursor="hover"
              href={`mailto:${siteConfig.email}`}
              className="block font-medium text-foreground underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              {siteConfig.email}
            </a>
            <a
              data-cursor="hover"
              href={`tel:${siteConfig.phoneTel}`}
              className="block font-medium text-foreground underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              {siteConfig.phone}
            </a>
            <a
              data-cursor="hover"
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-medium text-foreground underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              GitHub profile
            </a>
          </motion.div>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          aria-busy={sendState === "loading"}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
          className="space-y-5 rounded-3xl border border-[var(--border-subtle)] bg-white p-8 shadow-[var(--shadow-card)]"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-muted">Name</span>
              <input
                name="name"
                required
                disabled={sendState === "loading"}
                className="w-full rounded-xl border border-[var(--border-subtle)] bg-[#fafafa] px-4 py-3 text-sm text-foreground outline-none ring-gold/40 transition-shadow focus:ring-2 disabled:opacity-60"
                placeholder="Your name"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Email</span>
              <input
                name="email"
                type="email"
                required
                disabled={sendState === "loading"}
                className="w-full rounded-xl border border-[var(--border-subtle)] bg-[#fafafa] px-4 py-3 text-sm text-foreground outline-none ring-gold/40 transition-shadow focus:ring-2 disabled:opacity-60"
                placeholder="you@company.com"
              />
            </label>
          </div>
          <label className="block space-y-2 text-sm">
            <span className="text-muted">Message</span>
            <textarea
              name="message"
              required
              rows={4}
              disabled={sendState === "loading"}
              className="w-full resize-none rounded-xl border border-[var(--border-subtle)] bg-[#fafafa] px-4 py-3 text-sm text-foreground outline-none ring-gold/40 transition-shadow focus:ring-2 disabled:opacity-60"
              placeholder="Tell me about your project..."
            />
          </label>
          <motion.button
            type="submit"
            disabled={sendState === "loading"}
            whileHover={sendState === "loading" ? undefined : { y: -2 }}
            whileTap={sendState === "loading" ? undefined : { scale: 0.98 }}
            data-cursor="hover"
            className="relative w-full overflow-hidden rounded-full bg-foreground py-3 text-sm font-semibold text-background shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-card)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255,79,163,0.35), transparent 55%), radial-gradient(circle at 80% 60%, rgba(200,140,23,0.28), transparent 58%)",
              }}
            />
            <span className="relative">
              {sendState === "loading"
                ? "Sending…"
                : sendState === "success"
                  ? "Sent — thank you!"
                  : "Send message"}
            </span>
          </motion.button>
          {sendState === "error" ? (
            <p className="text-xs text-[var(--orange)]" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
