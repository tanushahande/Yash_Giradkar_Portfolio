"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-8 px-4">
      <div className="container-custom mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-500 text-sm"
        >
          © {new Date().getFullYear()} Yash Giradkar. All rights reserved.
        </motion.p>
        <div className="flex items-center gap-6 text-sm text-slate-500">
          <span>Built with Next.js</span>
          <span className="hidden md:inline text-slate-700">·</span>
          <span>Made by Yash Giradkar</span>
        </div>
      </div>
    </footer>
  );
}
