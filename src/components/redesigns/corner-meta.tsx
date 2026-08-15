"use client";

import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=43.6532&longitude=-79.3832&current=temperature_2m,weather_code,is_day&timezone=America%2FToronto";

type Weather = { temp: number; code: number; isDay: boolean };

const weatherIcon = (code: number, isDay: boolean) => {
  const cls = "size-3";
  if (code === 0)
    return isDay ? <Sun className={cls} /> : <Moon className={cls} />;
  if (code <= 3)
    return isDay ? <CloudSun className={cls} /> : <CloudMoon className={cls} />;
  if (code >= 45 && code <= 48) return <CloudFog className={cls} />;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
    return <CloudRain className={cls} />;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    return <CloudSnow className={cls} />;
  if (code >= 95) return <CloudLightning className={cls} />;
  return <Cloud className={cls} />;
};

const CornerMeta = () => {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [showWeather, setShowWeather] = useState(false);
  const hasWeather = weather !== null;

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-CA", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "America/Toronto",
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let active = true;
    const load = () =>
      fetch(WEATHER_URL)
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((data) => {
          if (!active) return;
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
            isDay: data.current.is_day === 1,
          });
        })
        .catch(() => {});
    load();
    const id = setInterval(load, 5 * 60 * 1000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  // Alternate the first line between coordinates and weather
  useEffect(() => {
    if (!hasWeather) return;
    const id = setInterval(() => setShowWeather((v) => !v), 4000);
    return () => clearInterval(id);
  }, [hasWeather]);

  return (
    <div className="hidden text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/45 md:block">
      <p className="whitespace-nowrap">43.6532° N — 79.3832° W</p>
      <p className="flex items-center justify-end gap-[0.5em] whitespace-nowrap">
        {/* "Toronto" and the weather trade places; fixed width so the clock never shifts */}
        <span className="relative inline-flex h-[15px] w-[58px] items-center">
          <AnimatePresence mode="wait">
            {showWeather && weather ? (
              <motion.span
                key="weather"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-end gap-1"
              >
                {weatherIcon(weather.code, weather.isDay)}
                {weather.temp}°C
              </motion.span>
            ) : (
              <motion.span
                key="city"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-end"
              >
                Toronto
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        {time && (
          <>
            <span className="animate-pulse">·</span>{" "}
            <span className="tabular-nums">{time}</span> EST
          </>
        )}
      </p>
    </div>
  );
};

export default CornerMeta;
