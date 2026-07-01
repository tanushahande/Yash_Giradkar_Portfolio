"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiPython,
  SiMysql,
  SiOpenjdk,
  SiPostgresql,
  SiGit,
  SiStreamlit,
  SiScikitlearn,
} from "react-icons/si";
import {
  TbBrandPowershell,
  TbChartBar,
  TbBrain,
  TbDatabase,
  TbTable,
  TbChartDots3,
  TbChartLine,
  TbApi,
  TbTransfer,
  TbTargetArrow,
  TbCoin,
  TbCloud,
} from "react-icons/tb";
import { Sparkles } from "lucide-react";
import { skills, analyticalSkills } from "@/constants";
import { DashboardShell } from "./DashboardShell";
import { cn } from "@/lib/utils";

const iconComponents: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  python: SiPython,
  sql: SiMysql,
  mysql: SiMysql,
  java: SiOpenjdk,
  springboot: SiOpenjdk,
  excel: TbTable,
  powerbi: TbBrandPowershell,
  tableau: TbChartDots3,
  plotly: TbChartLine,
  visualization: TbChartBar,
  ml: TbBrain,
  forecast: TbChartLine,
  database: TbDatabase,
  sqlalchemy: TbDatabase,
  postgresql: SiPostgresql,
  neon: TbCloud,
  git: SiGit,
  streamlit: SiStreamlit,
  scikit: SiScikitlearn,
  api: TbApi,
  etl: TbTransfer,
  product: TbTargetArrow,
  strategy: TbTargetArrow,
  fintech: TbCoin,
};

const categories = Object.keys(skills);

interface SkillsDashboardProps {
  session: number;
  isActive: boolean;
}

function SkillTile({
  name,
  icon,
  color,
  delay,
  active,
}: {
  name: string;
  icon: string;
  color: string;
  delay: number;
  active: boolean;
}) {
  const Icon = iconComponents[icon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.9 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all cursor-default"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{
          backgroundColor: `${color}15`,
          border: `1px solid ${color}35`,
          boxShadow: `0 0 20px ${color}10`,
        }}
      >
        {Icon && <Icon className="w-6 h-6" style={{ color }} />}
      </div>
      <span className="text-sm font-medium text-slate-200 text-center leading-tight">{name}</span>
    </motion.div>
  );
}

export function SkillsDashboard({ session, isActive }: SkillsDashboardProps) {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const activeSkills = skills[activeTab as keyof typeof skills];

  return (
    <DashboardShell
      title="skills-intelligence.panel"
      subtitle="Tools & analytical capabilities — no ratings, pure expertise"
      session={session}
      isActive={isActive}
      className="min-h-[420px]"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-44 shrink-0 flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-3 py-2 rounded-lg text-left text-xs font-medium whitespace-nowrap transition-all cursor-pointer",
                activeTab === cat
                  ? "bg-white/10 text-white border border-slate-600/40"
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-white">{activeTab}</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {activeSkills.length} technologies in my analytics stack
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${session}`}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {activeSkills.map((skill, i) => (
                <SkillTile
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color={skill.color}
                  delay={0.06 + i * 0.05}
                  active={isActive}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800/60">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h4 className="text-sm font-semibold text-white">Analytical Skills</h4>
        </div>
        <motion.div
          key={`analytical-${session}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          className="flex flex-wrap gap-2"
        >
          {analyticalSkills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85 }}
              transition={{ delay: 0.2 + i * 0.04 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-slate-800/80 to-slate-800/40 text-slate-300 border border-slate-700/40 hover:border-purple-500/30 hover:text-white transition-all cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </DashboardShell>
  );
}
