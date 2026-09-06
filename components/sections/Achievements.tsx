"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, BarChart2, Users, FolderKanban } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { achievements } from "@/constants";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { fadeInUp, staggerContainer } from "@/animations/variants";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Projects: FolderKanban,
  Experience: BarChart2,
  Leadership: Users,
  Research: BookOpen,
};

export function Achievements() {
  return (
    <section id="achievements" className="section-padding" aria-label="Achievements">
      <div className="container-custom mx-auto">
        <SectionHeading
          label="Milestones"
          title="Achievements"
          description="Continuous growth across research, analytics, and leadership"
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievements.map((item) => {
            const Icon = categoryIcons[item.category];
            return (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 text-center hover:glow-blue transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/10">
                    {Icon && <Icon className="w-5 h-5 text-purple-400" />}
                  </div>
                </div>
                <AnimatedCounter
                  value={item.value}
                  suffix={item.suffix}
                  label={item.title}
                />
                <p className="text-slate-500 text-xs mt-3">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
