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
      <MapPin className={isMobile ? "w-4 h-4 flex-shrink-0" : "rotate-90 w-4 h-4 flex-shrink-0"} /> Toronto, ON, Canada
    </div>
  );
}