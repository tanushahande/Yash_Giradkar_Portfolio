"use client";

import { useEffect, useState, useRef } from "react";

export function useTypingEffect(
  words: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000
) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting && displayText === currentWord) {
      pauseRef.current = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => {
        if (pauseRef.current) clearTimeout(pauseRef.current);
      };
    }

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          if (displayText.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          } else {
            setDisplayText(currentWord.substring(0, displayText.length - 1));
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}
