"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { slideInLeft } from "@/lib/motion";

const items = [
  {
    period: "Mentor Knowledge Solutions",
    role: "Software Engineer / Designer",
    org: "Mentor Knowledge Solutions",
    detail:
      "Built modern web experiences with a focus on UI quality, performance, and maintainable component systems.",
  },
  {
    period: "Duo Creation",
    role: "UI/UX Designer",
    org: "Duo Creation",
    detail:
      "Designed product flows, prototypes, and branded UI kits with clear hierarchy and consistent interaction patterns.",
  },
  {
    period: "Rhino Trading PLC",
    role: "Web & Brand Designer",
    org: "Rhino Trading PLC",
    detail:
      "Created brand-led layouts and marketing assets, translating business goals into clean, conversion-ready pages.",
  },
  {
    period: "Cvotech",
    role: "Frontend Developer",
    org: "Cvotech",
    detail:
      "Implemented responsive interfaces and motion details, collaborating with stakeholders to ship polished deliverables.",
  },
  {
    period: "Js Mall & Real Estate",
    role: "Software Developer & UI/UX Designer",
    org: "Js Mall & Real Estate",
    detail:
      "Built their internal system and created their real estate brochures from scratch—covering UI design, flows, and production-ready assets.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-28 px-6 py-24 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-14">
        <SectionHeading
          eyebrow="Experience"
          title="A vertical path—design, code, and ownership."
          description="Selected milestones from a practice focused on craft, collaboration, and measurable outcomes."
        />
        <div className="relative mx-auto max-w-3xl pl-8 sm:pl-10">
          <div
            aria-hidden
            className="absolute bottom-4 left-[0.35rem] top-2 w-px bg-gradient-to-b from-gold/70 via-foreground/12 to-transparent sm:left-[0.45rem]"
          />
          <ol className="space-y-12">
            {items.map((item, index) => (
              <motion.li
                key={item.period}
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[1.15rem] top-2 h-3 w-3 rounded-full border border-gold/70 bg-white shadow-[0_0_0_6px_rgba(200,140,23,0.12)] sm:-left-[1.35rem]" />
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-soft)]">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold">{item.period}</p>
                  <h3 className="mt-2 font-serif text-xl text-foreground">{item.role}</h3>
                  <p className="mt-1 text-sm font-medium text-muted">{item.org}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{item.detail}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
