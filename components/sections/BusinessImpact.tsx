"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, LineChart, Brain, Database, BarChart3 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { businessImpact } from "@/constants";
import { fadeInUp, staggerContainer } from "@/animations/variants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  revenue: TrendingUp,
  forecast: LineChart,
  decision: Brain,
  warehouse: Database,
  kpi: BarChart3,
};

export function BusinessImpact() {
  return (
    <section id="impact" className="section-padding" aria-label="Business Impact">
      <div className="container-custom mx-auto">
        <SectionHeading
          label="Impact"
          title="Business Impact"
          description="Driving measurable outcomes through data-driven decision making"
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {businessImpact.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group glass rounded-2xl p-6 hover:glow-blue transition-all duration-300 cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    {Icon && <Icon className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gradient font-[family-name:var(--font-space-grotesk)]">
                      {item.metric}
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">{item.metricLabel}</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
