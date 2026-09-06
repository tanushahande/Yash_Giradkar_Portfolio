"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { subscribeScroll } from "@/lib/scroll-events";

interface UseSectionActiveOptions {
  /** Minimum visible fraction of the target element (0–1) */
  threshold?: number;
}

function isElementVisible(el: HTMLElement, threshold: number) {
  const rect = el.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;

  if (rect.height <= 0) return false;

  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, viewHeight);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  const ratio = visibleHeight / rect.height;

  const inViewport = rect.top < viewHeight * 0.88 && rect.bottom > viewHeight * 0.12;

  return inViewport && ratio >= threshold;
}

export function useSectionActive(options: UseSectionActiveOptions = {}) {
  const { threshold = 0.2 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [session, setSession] = useState(0);
  const wasActiveRef = useRef(false);

  const checkVisibility = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const visible = isElementVisible(el, threshold);

    if (visible && !wasActiveRef.current) {
      setSession((prev) => prev + 1);
      wasActiveRef.current = true;
    } else if (!visible) {
      wasActiveRef.current = false;
    }

    setIsActive(visible);
  }, [threshold]);

  useEffect(() => {
    checkVisibility();

    const unsubscribe = subscribeScroll(checkVisibility);

    const observer = new IntersectionObserver(
      () => checkVisibility(),
      { threshold: [0, 0.1, 0.2, 0.35, 0.5], rootMargin: "0px 0px -5% 0px" }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      unsubscribe();
      observer.disconnect();
    };
  }, [checkVisibility]);

  return { ref, isActive, session };
}
