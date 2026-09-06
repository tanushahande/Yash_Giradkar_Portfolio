"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { leadership } from "@/constants";
import { fadeInUp, staggerContainer } from "@/animations/variants";

const badgeColors: Record<string, string> = {
  Placement: "from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30",
  Leadership: "from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/30",
  Coordinator: "from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/30",
};

export function Leadership() {
  return (
    <section id="leadership" className="section-padding" aria-label="Leadership">
      <div className="container-custom mx-auto">
        <SectionHeading
          label="Leadership"
          title="Leadership & Community"
          description="Driving initiatives that connect talent with opportunity"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/30 to-transparent hidden md:block" />

          <div className="space-y-8">
            {leadership.map((item) => (
              <motion.div
                key={item.role}
                variants={fadeInUp}
                className="relative md:pl-20"
              >
                <div className="hidden md:flex absolute left-8 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 ring-4 ring-[#050816]" />

                <div className="glass rounded-2xl p-6 hover:glow-blue transition-all duration-300 group">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border bg-gradient-to-r ${badgeColors[item.badge] || badgeColors.Leadership}`}
                      >
                        <Award className="w-3 h-3" />
                        {item.badge}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-3 font-[family-name:var(--font-space-grotesk)] group-hover:text-gradient transition-all">
                        {item.role}
                      </h3>
                      <p className="text-blue-400 text-sm font-medium mt-1">{item.organization}</p>
                      <p className="text-slate-500 text-xs mt-1">{item.period}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mt-4 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
