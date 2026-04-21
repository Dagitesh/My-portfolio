import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function SelectedWork() {
  return (
    <section
      id="work"
      className="scroll-mt-28 border-t border-[var(--border-subtle)] bg-[var(--paper)] px-6 py-24 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-14">
        <div className="relative">
          <p
            aria-hidden
            className="pointer-events-none absolute -top-10 left-0 select-none font-serif text-6xl tracking-tight text-foreground/5 sm:text-7xl md:text-8xl"
          >
            Work
          </p>
          <SectionHeading
            eyebrow="Selected work"
            title="Editorial craft—designed to be remembered."
            description="A curated selection across product UI, brand systems, and web experiences."
          />
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
