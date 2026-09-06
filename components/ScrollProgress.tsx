"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left transition-transform duration-150 ease-out"
        style={{
          transform: `scaleX(${progress / 100})`,
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
        }}
      />
    </div>
  );
}
