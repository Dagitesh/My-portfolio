"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tabs = [
  {
    id: "development",
    label: "Development",
    items: [
      { label: "React", level: 88 },
      { label: "HTML/CSS", level: 92 },
      { label: "Python", level: 72 },
      { label: "Rails", level: 64 },
    ],
  },
  {
    id: "design",
    label: "Design",
    items: [
      { label: "UI/UX", level: 90 },
      { label: "Branding", level: 82 },
      { label: "Posters", level: 74 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      { label: "Figma", level: 92 },
      { label: "Git", level: 78 },
      { label: "GitHub", level: 80 },
    ],
  },
] as const;

export function SkillsSection() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("development");
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section id="skills" className="scroll-mt-28 border-t border-[var(--border-subtle)] bg-white px-6 py-24 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <SectionHeading
          eyebrow="Skills"
          title="Disciplines that compound."
          description="Tabs organize how I work—development for shipping, design for meaning, tools for velocity."
        />
        <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <div className="flex flex-wrap gap-2 rounded-full bg-[#f4f4f5] p-1">
            {tabs.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={`relative min-w-[7.5rem] flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="skillsTab"
                      className="absolute inset-0 rounded-full bg-white shadow-[var(--shadow-soft)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-8 min-h-[8rem]">
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeTab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {activeTab.items.map((skill) => (
                  <li
                    key={skill.label}
                    className="rounded-2xl border border-[var(--border-subtle)] bg-[#fafafa] p-4 shadow-[0_12px_40px_rgba(10,10,10,0.05)]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-serif text-base text-foreground">{skill.label}</p>
                      <span className="text-xs font-semibold tracking-wide text-muted">{skill.level}%</span>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(200,140,23,0.95), rgba(255,79,163,0.9), rgba(255,122,0,0.9))",
                        }}
                      />
                    </div>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
