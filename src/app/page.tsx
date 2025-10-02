import Hero from "@/components/sections/hero";
import ParticleBackground from "@/components/particles";
import SideSocial from "@/components/side/social";
import SideRight from "@/components/side/right";
import Work from "@/components/sections/work";
import About from "@/components/sections/about";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <SideSocial />
      <SideRight />

      <Hero />
      <About />
      <Work />
      {/* <Skills /> */}
    </main>
  );
}
