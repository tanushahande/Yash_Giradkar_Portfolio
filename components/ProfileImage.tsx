"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  className?: string;
  priority?: boolean;
}

export function ProfileImage({ className, priority = true }: ProfileImageProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full rounded-[20px] overflow-hidden",
        "bg-gradient-to-br from-[#0a1020] via-[#0f172a] to-[#0a1020]",
        className
      )}
    >
      <Image
        src="/profile.webp"
        alt="Yash Giradkar - Business Analyst, Product Analyst, Data Analyst"
        fill
        className="object-contain object-center scale-[1.02] drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
        priority={priority}
        sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
        quality={92}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 85%, rgba(5,8,22,0.55) 0%, transparent 55%), linear-gradient(to top, rgba(5,8,22,0.35) 0%, transparent 35%)",
        }}
      />
      <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/5 pointer-events-none" />
    </div>
  );
}
