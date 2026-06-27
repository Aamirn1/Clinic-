"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { business } from "@/lib/data";

export function FloatingButtons() {
  const [showTop, setShowTop] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 left-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-lg backdrop-blur-md transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={business.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-green-500/40 opacity-60" />
        <MessageCircle className="relative h-6 w-6" />
        <span className="pointer-events-none absolute left-16 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:block">
          Chat with us!
        </span>
      </a>
    </div>
  );
}
