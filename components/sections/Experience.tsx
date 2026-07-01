"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ChevronDown, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { experiences } from "@/constants";
import { cn } from "@/lib/utils";

export function Experience() {
  const [expanded, setExpanded] = useState<string | null>("recordent");

  return (
    <section id="experience" className="section-padding" aria-label="Experience">
      <div className="container-custom mx-auto">
        <SectionHeading
          label="Career"
          title="Professional Experience"
          description="Building analytics solutions across product and engineering domains"
        />

        <div className="relative max-w-4xl">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-8 md:pl-20"
              >
                <div
                  className={cn(
                    "absolute left-0 md:left-8 -translate-x-1/2 top-6 w-4 h-4 rounded-full ring-4 ring-[#050816]",
                    exp.current
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
                      : "bg-slate-600"
                  )}
                />

                <div
                  className={cn(
                    "glass rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer",
                    expanded === exp.id && "glow-blue",
                    exp.current && "border-blue-500/20"
                  )}
                  onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setExpanded(expanded === exp.id ? null : exp.id);
                    }
                  }}
                  aria-expanded={expanded === exp.id}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {exp.current && (
                          <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-md mb-2">
                            Current
                          </span>
                        )}
                        <h3 className="text-xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                          {exp.role}
                        </h3>
                        <p className="text-blue-400 font-medium mt-1">{exp.company}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-slate-500 transition-transform shrink-0 mt-1",
                          expanded === exp.id && "rotate-180"
                        )}
                      />
                    </div>
                    <p className="text-slate-400 text-sm mt-3">{exp.description}</p>
                  </div>

                  <AnimatePresence>
                    {expanded === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-5 border-t border-slate-800/50 pt-5">
                          <div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-3">
                              Responsibilities
                            </h4>
                            <ul className="space-y-2">
                              {exp.responsibilities.map((r) => (
                                <li key={r} className="flex gap-2 text-sm text-slate-400">
                                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-3">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 text-xs rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700/30"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-3">
                              Achievements
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((a) => (
                                <li key={a} className="flex gap-2 text-sm text-slate-400">
                                  <span className="text-purple-400">→</span>
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
