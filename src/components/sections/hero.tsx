import ScrollArrow from "@/components/scroll-arrow";
import AboutTypewriter from "@/components/typrwriter";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-5xl w-full">
        <div className="space-y-6 animate-fade-in-up">
          <p className="text-primary font-mono text-sm md:text-base">Hi! I'm</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground">
            Evan Yu 👋
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-muted-foreground">
            <AboutTypewriter />
          </h2>
        </div>
      </div>
      <ScrollArrow />
    </section>
  );
}
