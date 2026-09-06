"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, FolderOpen, Mail } from "lucide-react";
import { roles, contactInfo } from "@/constants";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useTilt } from "@/hooks/useMousePosition";
import { Button } from "@/components/ui/button";
import { ProfileImage } from "@/components/ProfileImage";
import { FloatingSkillOrbit } from "@/components/FloatingSkillOrbit";
import { slideInLeft, slideInRight } from "@/animations/variants";

export function Hero() {
  const typedRole = useTypingEffect(roles);
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt(8);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center section-padding pt-28 sm:pt-32"
      aria-label="Introduction"
    >
      <div className="container-custom mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          className="space-y-6 order-2 lg:order-1"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Hello,
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-slate-400 text-lg mb-2">I&apos;m</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight leading-[0.95]">
              Yash{" "}
              <span className="text-gradient">Giradkar</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="h-10"
          >
            <p className="text-xl md:text-2xl text-slate-300 font-medium">
              <span className="text-blue-400">{typedRole}</span>
              <span className="animate-pulse text-blue-400">|</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed"
          >
            PGDM Business Analytics at N.L. Dalmia — building decision intelligence
            platforms, credit analytics research, and ML forecasting systems that
            turn data into measurable business impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Button variant="default" size="lg" magnetic asChild>
              <a
                href={contactInfo.resumePath}
                download="Yash_Giradkar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </Button>
            <Button variant="outline" size="lg" magnetic asChild>
              <a href="#projects">
                <FolderOpen className="w-4 h-4" />
                View Projects
              </a>
            </Button>
            <Button variant="ghost" size="lg" magnetic asChild>
              <a href="#contact">
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="relative flex justify-center lg:justify-end order-1 lg:order-2"
        >
          {/* Wider container for orbital skills */}
          <div
            className="relative w-full max-w-[22rem] sm:max-w-[26rem] md:max-w-[30rem] py-10 sm:py-12 flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <FloatingSkillOrbit />

            <div className="relative w-52 sm:w-60 md:w-64 aspect-[3/4] rounded-3xl gradient-border glow-border overflow-visible shadow-[0_25px_60px_-15px_rgba(59,130,246,0.25)] z-[5]">
              <div className="absolute inset-0 bg-[#0a1020] rounded-3xl p-1.5">
                <ProfileImage />
              </div>
              <motion.div
                className="absolute -inset-px rounded-3xl opacity-60 pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(59,130,246,0.15)",
                    "0 0 50px rgba(139,92,246,0.2)",
                    "0 0 30px rgba(59,130,246,0.15)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
