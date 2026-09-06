"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionReveal({ children, className, id }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.15, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      id={id}
      animate={{
        opacity: isInView ? 1 : 0.55,
        filter: isInView ? "blur(0px)" : "blur(6px)",
        y: isInView ? 0 : 24,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn("will-change-[transform,opacity,filter]", className)}
    >
      {children}
    </motion.div>
  );
}
