import ParticleBackground from "@/components/particles";
import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import Work from "@/components/sections/work";
import SideRight from "@/components/side/right";
import SideSocial from "@/components/side/social";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />

      {/* Desktop: Fixed side panels */}
      <SideSocial />
      <SideRight />

      <Hero />
      <About />
      <Work />
      {/* <Skills /> */}

      {/* Mobile: Side components above footer */}
      <div className="lg:hidden max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
          <SideSocial isMobile />
          <SideRight isMobile />
        </div>
      </div>
    </main>
  );
}
