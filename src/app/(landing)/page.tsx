import ParticleBackground from "@/components/particles";
import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import Work from "@/components/sections/work";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />

      <Hero />
      <About />
      <Work />
      {/* <Skills /> */}
    </main>
  );
}
