"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { AboutDashboard } from "@/components/dashboard/AboutDashboard";
import { useSectionActive } from "@/hooks/useSectionActive";
import { aboutContent, education } from "@/constants";
import { fadeInUp, staggerContainer } from "@/animations/variants";

export function About() {
  const { ref, isActive, session } = useSectionActive({ threshold: 0.2 });

  return (
    <section id="about" className="section-padding" aria-label="About">
      <div className="container-custom mx-auto">
        <SectionHeading
          label="About Me"
          title="Bridging Data & Strategy"
          description="Turning analytics into actionable business outcomes"
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              {aboutContent.intro}
            </p>

            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.degree} className="glass rounded-xl p-4 hover:border-slate-600/30 transition-colors">
                  <h4 className="font-semibold text-white text-sm">{edu.degree}</h4>
                  <p className="text-slate-400 text-xs mt-1">{edu.institution}</p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {edu.period} · {edu.location}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div ref={ref} className="w-full min-h-[360px]">
            <AboutDashboard session={session} isActive={isActive} />
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-3xl mx-auto"
        >
          <h3 className="text-lg font-semibold text-slate-300 mb-8 text-center font-[family-name:var(--font-space-grotesk)]">
            Career Journey
          </h3>
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-12 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent" />
          <div className="space-y-8">
            {aboutContent.journey.map((item, i) => (
              <motion.div
                key={item.year}
                variants={fadeInUp}
                className={`relative pl-10 sm:pl-0 sm:w-1/2 ${i % 2 === 0 ? "sm:mr-auto sm:pr-10 sm:text-right" : "sm:ml-auto sm:pl-10 sm:ml-[50%]"}`}
              >
                <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-1 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 ring-4 ring-[#050816]" />
                <span className="text-blue-400 text-sm font-medium">{item.year}</span>
                <h3 className="text-lg font-semibold text-white mt-1 font-[family-name:var(--font-space-grotesk)]">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
