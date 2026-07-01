"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Command } from "lucide-react";
import { navLinks, contactInfo } from "@/constants";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenCommand: () => void;
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const hidden = scrollDirection === "down" && scrollY > 100 && !mobileOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 lg:top-4 left-0 right-0 z-50 px-0 lg:px-4"
      >
        <nav
          className={cn(
            "mx-auto flex items-center justify-between px-4 py-3 transition-all duration-300",
            "lg:container-custom lg:rounded-2xl lg:glass",
            mobileOpen
              ? "bg-[#0a1020] border-b border-slate-800/80 lg:border-0"
              : "bg-[#0a1020]/95 backdrop-blur-xl border-b border-slate-800/60 lg:bg-transparent lg:backdrop-blur-none lg:border-0",
            scrollY > 50 && !mobileOpen && "lg:glow-blue lg:shadow-lg"
          )}
          aria-label="Main navigation"
        >
          <a
            href="#"
            className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-gradient"
            aria-label="Yash Giradkar - Home"
            onClick={() => setMobileOpen(false)}
          >
            YG
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm rounded-lg transition-all duration-200 relative group",
                  activeSection === link.href.replace("#", "")
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 rounded-full",
                    activeSection === link.href.replace("#", "") ? "w-4/5" : "w-0 group-hover:w-2/3"
                  )}
                />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={onOpenCommand}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Open command palette"
            >
              <Command className="w-4 h-4" />
            </button>
            <Button variant="default" size="sm" magnetic asChild>
              <a
                href={contactInfo.resumePath}
                download="Yash_Giradkar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-slate-300 hover:text-white cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[55] bg-[#050816]/98 backdrop-blur-md lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-[57px] bottom-0 z-[56] lg:hidden overflow-y-auto bg-[#0a1020] border-t border-slate-800/80"
            >
              <div className="flex flex-col gap-1 p-5 pb-10">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3.5 rounded-xl text-base font-medium transition-all",
                      activeSection === link.href.replace("#", "")
                        ? "bg-white/10 text-white border border-slate-700/50"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href={contactInfo.resumePath}
                  download="Yash_Giradkar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 px-4 py-3.5 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/20"
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
