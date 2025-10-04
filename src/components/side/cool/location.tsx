import { MapPin } from "lucide-react";

interface SideLocationProps {
  isMobile?: boolean;
}

export default function SideLocation({ isMobile = false }: SideLocationProps) {
  return (
    <div
      className="font-mono text-sm text-muted-foreground tracking-widest uppercase flex items-center gap-2"
      style={isMobile ? {} : {
        writingMode: "vertical-rl",
        textOrientation: "mixed",
      }}
    >
      <MapPin className={isMobile ? "scale-60" : "rotate-90 scale-60"} /> Toronto, ON, Canada
    </div>
  );
}