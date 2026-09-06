"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const GradientMesh = dynamic(() => import("./GradientMesh"), { ssr: false });
const Particles = dynamic(() => import("./Particles"), { ssr: false });

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <Suspense fallback={null}>
        <GradientMesh />
        <Particles />
      </Suspense>
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-600/5 blur-[150px]" />
    </div>
  );
}
