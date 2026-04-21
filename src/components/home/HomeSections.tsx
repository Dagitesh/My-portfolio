import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { Contact } from "@/components/sections/Contact";

export function HomeSections() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <SelectedWork />
      <About />
      <Experience />
      <SkillsSection />
      <Contact />
    </main>
  );
}
