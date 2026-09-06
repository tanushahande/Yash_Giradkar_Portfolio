"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Target, Lightbulb, Layers, AlertTriangle, TrendingUp } from "lucide-react";
import { projects } from "@/constants";
import { cn } from "@/lib/utils";

type Project = (typeof projects)[0];

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
            {project.category}
          </span>
          <DialogTitle className="text-3xl text-gradient">{project.title}</DialogTitle>
          <p className="text-slate-400">{project.tagline}</p>
        </DialogHeader>

        <div
          className={cn(
            "h-40 rounded-xl bg-gradient-to-br flex items-center justify-center",
            project.gradient
          )}
        >
          <span className="text-6xl font-bold font-[family-name:var(--font-space-grotesk)] text-white/20">
            {project.title}
          </span>
        </div>

        <div className="space-y-6 mt-2">
          <Section icon={Target} title="Overview" content={project.overview} />
          <Section icon={AlertTriangle} title="Problem Statement" content={project.problem} />
          <Section icon={Lightbulb} title="Approach" content={project.approach} />
          <Section icon={Layers} title="Architecture" content={project.architecture} />

          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
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
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-purple-400" />
              Challenges
            </h4>
            <ul className="space-y-2">
              {project.challenges.map((c) => (
                <li key={c} className="text-sm text-slate-400 flex gap-2">
                  <span className="text-purple-400">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Business Impact
            </h4>
            <ul className="space-y-2">
              {project.impact.map((i) => (
                <li key={i} className="text-sm text-slate-400 flex gap-2">
                  <span className="text-cyan-400">→</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({
  icon: Icon,
  title,
  content,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
        <Icon className="w-4 h-4 text-blue-400" />
        {title}
      </h4>
      <p className="text-sm text-slate-400 leading-relaxed">{content}</p>
    </div>
  );
}
