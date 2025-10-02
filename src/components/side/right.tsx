"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SideTime from "./cool/time";
import SideWeather, { useWeatherReady } from "./cool/weather";
import SideLocation from "./cool/location";

export default function SideRight() {
  const [currentView, setCurrentView] = useState(2);
  const weatherReady = useWeatherReady();

  const totalViews = weatherReady ? 3 : 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % totalViews);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalViews]);

  return (
    <div className="fixed right-6 bottom-0 hidden lg:flex flex-col items-center gap-6 z-10">
      <AnimatePresence mode="wait">
        {currentView === 0 && (
          <motion.div
            key="time"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-6 min-w-[24px]"
          >
            <SideTime />
          </motion.div>
        )}
        {currentView === 1 && (
          weatherReady ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6 min-w-[24px]"
            >
              <SideWeather />
            </motion.div>
          ) : (
            <motion.div
              key="location-fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6 min-w-[24px]"
            >
              <SideLocation />
            </motion.div>
          )
        )}
        {currentView === 2 && (
          <motion.div
            key="location"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-6 min-w-[24px]"
          >
            <SideLocation />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-[1px] h-24 bg-muted-foreground/30" />
    </div>
  );
}