"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      // initial scroll location
      const scrolled = window.scrollY > window.innerHeight * 0.6;
      setIsVisible(!scrolled); // hide if scrolled down
    };

    checkScroll();

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToNext = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="scroll-arrow"
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 1 },
          }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          onClick={scrollToNext}
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-1.5">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 bg-primary/70 rounded-full"
              />
            </div>
            <ChevronDown className="w-6 h-6 text-primary/50" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
