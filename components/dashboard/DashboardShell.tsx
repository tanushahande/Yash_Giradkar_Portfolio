"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  title: string;
  subtitle?: string;
  session: number;
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-slate-800/60" />
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="h-36 rounded-xl bg-slate-800/50" />
        <div className="h-36 rounded-xl bg-slate-800/50" />
      </div>
    </div>
  );
}

export function DashboardShell({
  title,
  subtitle,
  session,
  isActive,
  children,
  className,
}: DashboardShellProps) {
  const hasActivated = session > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={
        isActive
          ? { opacity: 1, y: 0, scale: 1 }
          : hasActivated
            ? { opacity: 0.7, y: 8, scale: 0.99 }
            : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-2xl border border-slate-700/40 overflow-hidden shadow-2xl shadow-black/30 bg-[#0c1222]",
        className
      )}
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800/80 bg-[#080d1a]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-medium text-slate-400 ml-2">{title}</span>
        </div>
        <div
          className={cn(
            "flex items-center gap-1.5 transition-colors",
            isActive ? "text-emerald-400" : "text-slate-500"
          )}
        >
          <Activity className={cn("w-3 h-3", isActive && "animate-pulse")} />
          <span className="text-[10px] uppercase tracking-wider font-medium">
            {isActive ? "Live" : hasActivated ? "Paused" : "Standby"}
          </span>
        </div>
      </div>
      {subtitle && <p className="px-5 pt-3 text-xs text-slate-500">{subtitle}</p>}
      <div className="p-5">
        {hasActivated && isActive ? (
          <motion.div
            key={`dash-content-${session}`}
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        ) : hasActivated ? (
          <div className="opacity-40 pointer-events-none saturate-50">{children}</div>
        ) : (
          <DashboardSkeleton />
        )}
      </div>
    </motion.div>
  );
}
