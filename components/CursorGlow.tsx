"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.body.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        animate={{ x: position.x - 200, y: position.y - 200 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        aria-hidden="true"
      >
        <div className="w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl" />
      </motion.div>
      <motion.div
        className="fixed pointer-events-none z-[9998] w-4 h-4 rounded-full border border-blue-400/30 -translate-x-1/2 -translate-y-1/2"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", damping: 40, stiffness: 500, mass: 0.2 }}
        aria-hidden="true"
      />
    </>
  );
}
