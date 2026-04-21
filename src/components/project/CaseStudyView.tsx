"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";

type CaseStudyViewProps = {
  project: Project;
};

export function CaseStudyView({ project }: CaseStudyViewProps) {
  return (
    <article className="flex flex-1 flex-col pb-24">
      <div className="border-b border-[var(--border-subtle)] bg-white px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <Link
            href="/#work"
            className="text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            ← Back to work
          </Link>
          {project.upcoming ? (
            <p className="rounded-2xl border border-gold/35 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-foreground">
              <span className="font-semibold text-gold">Upcoming work.</span> This case study is a live preview—scope,
              visuals, and launch details will evolve as the system ships.
            </p>
          ) : null}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.p variants={fadeSlideUp} className="text-xs uppercase tracking-[0.24em] text-gold">
              {project.upcoming ? `Upcoming · ${project.year}` : `Case study · ${project.year}`}
            </motion.p>
            <motion.h1
              variants={fadeSlideUp}
              className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl"
            >
              {project.title}
            </motion.h1>
            <motion.p variants={fadeSlideUp} className="max-w-2xl text-lg text-muted">
              {project.description}
            </motion.p>
            <motion.ul variants={fadeSlideUp} className="flex flex-wrap gap-2 pt-2">
              {project.services.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-[var(--border-subtle)] bg-white px-3 py-1 text-xs font-medium text-foreground"
                >
                  {s}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        className="mx-auto w-full max-w-6xl px-6 pt-12 lg:px-8"
      >
        <div className="relative aspect-[21/9] overflow-hidden rounded-3xl border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </motion.div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="space-y-6"
        >
          <h2 className="font-serif text-2xl text-foreground">Overview</h2>
          <p className="leading-relaxed text-muted">{project.overview}</p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="rounded-3xl border border-[var(--border-subtle)] bg-white p-8 shadow-[var(--shadow-soft)]"
        >
          <h2 className="font-serif text-2xl text-foreground">Challenge</h2>
          <p className="mt-4 leading-relaxed text-muted">{project.challenge}</p>
        </motion.section>
      </div>

      <div className="mx-auto max-w-6xl space-y-6 px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl border border-[var(--border-subtle)] bg-white p-8 sm:p-10"
        >
          <h2 className="font-serif text-2xl text-foreground">Solution</h2>
          <p className="mt-4 leading-relaxed text-muted">{project.solution}</p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl border border-[var(--border-subtle)] bg-white p-8 sm:p-10 shadow-[var(--shadow-soft)]"
        >
          <h2 className="font-serif text-2xl text-foreground">Outcomes</h2>
          <ul className="mt-6 space-y-4">
            {project.outcomes.map((o) => (
              <li key={o} className="flex gap-3 text-muted">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-gold" aria-hidden />
                <span className="leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      <div className="mx-auto mt-16 max-w-6xl space-y-8 px-6 lg:px-8">
        <h2 className="font-serif text-2xl text-foreground">Gallery</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {project.gallery.map((g) => (
            <motion.div
              key={g.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]"
            >
              <Image src={g.src} alt={g.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
            </motion.div>
          ))}
        </div>
      </div>
    </article>
  );
}
