"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, BarChart3, Database } from "lucide-react";
import { stats } from "@/constants";
import { DashboardShell } from "./DashboardShell";

interface AboutDashboardProps {
  session: number;
  isActive: boolean;
}

const kpiCards = [
  { label: "Data Pipeline", value: 98, icon: Database, color: "#06b6d4" },
  { label: "KPI Tracking", value: 94, icon: BarChart3, color: "#8b5cf6" },
  { label: "User Insights", value: 87, icon: Users, color: "#3b82f6" },
  { label: "Forecast Accuracy", value: 91, icon: TrendingUp, color: "#10b981" },
];

const chartData = [32, 45, 38, 52, 48, 61, 58, 72, 68, 85, 78, 92];

function AnimatedBar({
  value,
  delay,
  session,
}: {
  value: number;
  delay: number;
  session: number;
}) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
      <motion.div
        key={`bar-${session}`}
        className="w-full rounded-t-sm bg-gradient-to-t from-blue-600/80 to-cyan-400/60 min-h-[4px]"
        initial={{ height: 0 }}
        animate={{ height: `${value}%` }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function KpiRing({
  value,
  label,
  color,
  delay,
  session,
}: {
  value: number;
  label: string;
  color: string;
  delay: number;
  session: number;
}) {
  const circumference = 2 * Math.PI * 36;
  const targetOffset = circumference - (value / 100) * circumference;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    setOffset(circumference);
    const timer = setTimeout(() => setOffset(targetOffset), delay * 1000);
    return () => clearTimeout(timer);
  }, [session, value, delay, circumference, targetOffset]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="6" />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
          {value}%
        </span>
      </div>
      <span className="text-[10px] text-slate-500 text-center leading-tight max-w-[72px]">{label}</span>
    </div>
  );
}

export function AboutDashboard({ session, isActive }: AboutDashboardProps) {
  const maxChart = Math.max(...chartData);

  return (
    <DashboardShell
      title="analytics-overview.dashboard"
      subtitle="Real-time career metrics & analytics footprint"
      session={session}
      isActive={isActive}
    >
      <div key={`about-dash-${session}`} className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={`${stat.label}-${session}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="rounded-xl bg-slate-800/50 border border-slate-700/40 p-3"
            >
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                delay={0.15 + i * 0.1}
                session={session}
              />
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-xl bg-slate-800/40 border border-slate-700/30 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-slate-400">Growth Trajectory</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xs text-emerald-400"
              >
                +24.8%
              </motion.span>
            </div>
            <div className="flex items-end gap-1 h-28">
              {chartData.map((val, i) => (
                <AnimatedBar
                  key={`${i}-${session}`}
                  value={(val / maxChart) * 100}
                  delay={0.2 + i * 0.05}
                  session={session}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="rounded-xl bg-slate-800/40 border border-slate-700/30 p-4"
          >
            <span className="text-xs font-medium text-slate-400 block mb-4">Core Competencies</span>
            <div className="grid grid-cols-2 gap-4">
              {kpiCards.map((kpi, i) => (
                <KpiRing
                  key={`${kpi.label}-${session}`}
                  value={kpi.value}
                  label={kpi.label}
                  color={kpi.color}
                  delay={0.25 + i * 0.12}
                  session={session}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  );
}

function CountUp({
  target,
  suffix = "",
  delay = 0,
  session,
}: {
  target: number;
  suffix?: string;
  delay?: number;
  session: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let frame: number;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const duration = 1400;
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(target * eased));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }, delay * 1000);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [target, delay, session]);

  return (
    <span className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
      {count}
      {suffix}
    </span>
  );
}
