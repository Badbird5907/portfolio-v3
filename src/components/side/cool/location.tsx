import { MapPin } from "lucide-react";

export default function SideLocation() {
  return (
    <div
      className="font-mono text-sm text-muted-foreground tracking-widest uppercase flex items-center gap-2"
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
      }}
    >
      <MapPin className="rotate-90 scale-60" /> Toronto, ON, Canada
    </div>
  );
}