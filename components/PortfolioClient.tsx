"use client";

import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorGlow } from "@/components/CursorGlow";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Navbar } from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { SectionReveal } from "@/components/SectionReveal";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { BusinessImpact } from "@/components/sections/BusinessImpact";
import { Achievements } from "@/components/sections/Achievements";
import { Leadership } from "@/components/sections/Leadership";
import { Contact } from "@/components/sections/Contact";

export function PortfolioClient() {
  const [commandOpen, setCommandOpen] = useState(false);
  useLenis();

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CursorGlow />
      <BackgroundEffects />
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <main>
        <SectionReveal>
          <Hero />
        </SectionReveal>
        <SectionReveal>
          <About />
        </SectionReveal>
        <SectionReveal>
          <Experience />
        </SectionReveal>
        <SectionReveal>
          <Projects />
        </SectionReveal>
        <SectionReveal>
          <Skills />
        </SectionReveal>
        <SectionReveal>
          <BusinessImpact />
        </SectionReveal>
        <SectionReveal>
          <Achievements />
        </SectionReveal>
        <SectionReveal>
          <Leadership />
        </SectionReveal>
        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
