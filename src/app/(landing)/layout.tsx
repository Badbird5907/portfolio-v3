import SideSocial from "@/components/side/social";
import SideRight from "@/components/side/right";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideSocial />
      <SideRight />
      {children}
      {/* Mobile: Side components above footer */}
      <div className="lg:hidden max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
          <SideSocial isMobile />
          <SideRight isMobile />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <a href='https://uoftwebring.com/redirect?nav=prev&id=25'>←</a>
        <a href='https://uoftwebring.com' target='_blank'>
            <img
                src='https://uoftwebring.com/ring_logo.svg'
                alt='UofT Webring'
                className="w-6 h-auto"
            />
        </a>
        <a href='https://uoftwebring.com/redirect?nav=next&id=25'>→</a>
      </div>
    </>
  );
}

