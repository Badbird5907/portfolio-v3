import Hero from "@/components/sections/hero";
import ParticleBackground from "@/components/particles";
import Skills from "@/components/sections/skills";
import SideSocial from "@/components/side/social";
import SideRight from "@/components/side/right";
import Cursor from "@/components/cursor";
import Work from "@/components/sections/work";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <SideSocial />
      <SideRight />
      <Hero />
      <Work />
      {/* <Skills /> */}
    </main>
  );
}
