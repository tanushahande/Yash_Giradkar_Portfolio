"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { SkillsDashboard } from "@/components/dashboard/SkillsDashboard";
import { useSectionActive } from "@/hooks/useSectionActive";

export function Skills() {
  const { ref, isActive, session } = useSectionActive({ threshold: 0.2 });

  return (
    <section id="skills" className="section-padding" aria-label="Skills">
      <div className="container-custom mx-auto">
        <SectionHeading
          label="Expertise"
          title="Skills Intelligence"
          description="Interactive toolkit & analytical capabilities"
          align="center"
        />

        <div ref={ref} className="w-full min-h-[420px]">
          <SkillsDashboard session={session} isActive={isActive} />
        </div>
      </div>
    </section>
  );
}
