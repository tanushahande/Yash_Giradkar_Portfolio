"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FileText } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectModal } from "@/components/ProjectModal";
import { projects, projectCategories } from "@/constants";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const openProject = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleModalChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      window.setTimeout(() => setSelectedProject(null), 300);
    }
  };

  return (
    <section id="projects" className="section-padding" aria-label="Projects">
      <div className="container-custom mx-auto">
        <SectionHeading
          label="Portfolio"
          title="Featured Projects"
          description="End-to-end analytics solutions with measurable business impact"
          align="center"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {projectCategories.map((cat) => {
            const count =
              cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2",
                  filter === cat
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                    : "glass text-slate-400 hover:text-white hover:bg-white/5"
                )}
                aria-pressed={filter === cat}
              >
                {cat}
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-md",
                    filter === cat ? "bg-white/20" : "bg-slate-800/60"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <LayoutGroup>
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[320px]">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onOpen={() => openProject(project)}
                  />
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500"
                >
                  <p className="text-lg">No projects in this category yet.</p>
                  <button
                    onClick={() => setFilter("All")}
                    className="mt-4 text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    View all projects
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <ProjectModal
          project={selectedProject}
          open={modalOpen}
          onOpenChange={handleModalChange}
        />
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[0];
  index: number;
  onOpen: () => void;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.92, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, scale: 0.92, filter: "blur(6px)" }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.35 },
      }}
      className="group glass rounded-2xl overflow-hidden hover:glow-blue transition-shadow duration-300"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
      <div
        className={cn(
          "relative h-48 bg-gradient-to-br",
          project.gradient,
          "flex items-center justify-center overflow-hidden"
        )}
      >
        <div className="absolute inset-0 bg-card/40" />
        <span className="relative text-4xl font-bold font-[family-name:var(--font-space-grotesk)] text-gradient opacity-80">
          {project.title.charAt(0)}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-white mt-2 font-[family-name:var(--font-space-grotesk)] group-hover:text-gradient transition-all">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mt-2">{project.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-md bg-slate-800/50 text-slate-400"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-slate-800/50 text-slate-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="mt-5">
          <button
            onClick={onOpen}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            Case Study
          </button>
        </div>
      </div>
      </div>
    </motion.article>
  );
}