"use client";

import { motion } from "framer-motion";
import { Briefcase, Layers, BarChart3, Landmark } from "lucide-react";
import { heroSkillBadges } from "@/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  product: Layers,
  fintech: Landmark,
  analytics: BarChart3,
  business: Briefcase,
};

const positionClasses: Record<string, string> = {
  top: "left-1/2 -translate-x-1/2 -top-2 sm:-top-5",
  right: "-right-2 sm:-right-8 top-[38%] -translate-y-1/2",
  bottom: "left-1/2 -translate-x-1/2 -bottom-2 sm:-bottom-5",
  left: "-left-2 sm:-left-8 top-[38%] -translate-y-1/2",
};

export function FloatingSkillOrbit() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[98%] rounded-[2rem]"
          animate={{
            boxShadow: [
              "0 0 0 1px rgba(59,130,246,0.12), 0 0 40px rgba(59,130,246,0.06)",
              "0 0 0 1px rgba(139,92,246,0.18), 0 0 50px rgba(139,92,246,0.1)",
              "0 0 0 1px rgba(59,130,246,0.12), 0 0 40px rgba(59,130,246,0.06)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {heroSkillBadges.map((skill, i) => {
        const Icon = iconMap[skill.icon];

        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.75, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 280, damping: 18 }}
            className={`absolute z-20 ${positionClasses[skill.position]}`}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.25,
              }}
            >
              <div
                className="flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                style={{
                  border: `2px solid ${skill.color}`,
                  boxShadow: `0 8px 28px ${skill.color}30, 0 2px 8px rgba(0,0,0,0.12)`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}, ${skill.color}cc)`,
                  }}
                >
                  {Icon && <Icon className="w-4 h-4 text-white" />}
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}
