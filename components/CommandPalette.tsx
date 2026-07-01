"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  FolderOpen,
  Wrench,
  Trophy,
  Users,
  Mail,
  Download,
  Home,
} from "lucide-react";
import { navLinks, contactInfo } from "@/constants";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const commands = [
  { label: "Home", href: "#", icon: Home },
  ...navLinks.map((link) => ({
    label: link.label,
    href: link.href,
    icon: getIcon(link.label),
  })),
  { label: "Download Resume", href: contactInfo.resumePath, icon: Download },
  { label: "Email", href: `mailto:${contactInfo.email}`, icon: Mail },
];

function getIcon(label: string) {
  const icons: Record<string, typeof User> = {
    About: User,
    Experience: Briefcase,
    Projects: FolderOpen,
    Skills: Wrench,
    Achievements: Trophy,
    Leadership: Users,
    Contact: Mail,
  };
  return icons[label] || User;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState("");

  const handleSelect = useCallback(
    (href: string) => {
      onOpenChange(false);
      setSearch("");
      if (href.startsWith("#")) {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else if (href.startsWith("mailto:")) {
        window.location.href = href;
      } else {
        window.open(href, "_blank");
      }
    },
    [onOpenChange]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[20%] z-[81] w-full max-w-lg -translate-x-1/2"
          >
            <Command
              className="glass-strong rounded-2xl overflow-hidden shadow-2xl border border-slate-700/30"
              label="Command palette"
            >
              <div className="flex items-center gap-2 px-4 border-b border-slate-700/30">
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search sections, actions..."
                  className="flex-1 h-12 bg-transparent text-white placeholder:text-slate-500 outline-none text-sm"
                />
                <kbd className="hidden sm:inline-flex px-2 py-1 text-xs text-slate-500 bg-slate-800 rounded-md">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-72 overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-slate-500">
                  No results found.
                </Command.Empty>
                <Command.Group heading="Navigation" className="text-xs text-slate-500 px-2 py-1.5">
                  {commands.map((cmd) => (
                    <Command.Item
                      key={cmd.label}
                      value={cmd.label}
                      onSelect={() => handleSelect(cmd.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 cursor-pointer data-[selected=true]:bg-white/10 data-[selected=true]:text-white transition-colors"
                    >
                      <cmd.icon className="w-4 h-4 text-blue-400" />
                      {cmd.label}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
