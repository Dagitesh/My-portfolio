"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
      className="group relative"
    >
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="hover"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-card)]">
          {project.upcoming ? (
            <span className="absolute right-4 top-4 z-20 rounded-full border border-gold/40 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold shadow-[var(--shadow-soft)] backdrop-blur-sm">
              Upcoming
            </span>
          ) : null}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(255,79,163,0.22), transparent 55%), radial-gradient(circle at 70% 75%, rgba(200,140,23,0.18), transparent 58%), radial-gradient(circle at 40% 90%, rgba(182,255,108,0.20), transparent 60%)",
            }}
          />
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative aspect-[4/3] w-full origin-center"
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-55 transition-opacity duration-500 group-hover:opacity-95" />
            <div className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {project.upcoming ? "Preview →" : "View case study →"}
              </span>
            </div>
          </motion.div>
          <div className="space-y-2 px-6 py-6">
            <h3 className="font-serif text-xl tracking-tight text-foreground transition-colors group-hover:text-gold">
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">{project.description}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
