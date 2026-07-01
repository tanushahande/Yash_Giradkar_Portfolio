"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { notifyScroll } from "@/lib/scroll-events";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", notifyScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.addEventListener("scroll", notifyScroll, { passive: true });
    window.addEventListener("resize", notifyScroll, { passive: true });

    return () => {
      lenis.off("scroll", notifyScroll);
      window.removeEventListener("scroll", notifyScroll);
      window.removeEventListener("resize", notifyScroll);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
