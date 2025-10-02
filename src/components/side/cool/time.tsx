"use client";

import { useEffect, useState } from "react";

export default function SideTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const time = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Toronto",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());

      setTime(`YYZ ${time}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return null; // Time will be set immediately on mount

  return (
    <div
      className="font-mono text-sm text-muted-foreground tracking-widest uppercase"
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed"
      }}
    >
      {time}
    </div>
  );
}

