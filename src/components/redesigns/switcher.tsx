"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const designs = [
  { slug: "spread", label: "Spread" },
  { slug: "dither", label: "Dither" },
];

const RedesignSwitcher = () => {
  const pathname = usePathname();

  return (
    <div className="group fixed bottom-0 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center px-10 pt-8">
      <nav className="pointer-events-none mb-3 flex translate-y-2 items-center gap-1 rounded-full border border-white/15 bg-zinc-950/85 px-2 py-1.5 font-mono text-sm opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {designs.map((design) => {
          const active = pathname === `/redesigns/${design.slug}`;
          return (
            <Link
              key={design.slug}
              href={`/redesigns/${design.slug}`}
              className={`shrink-0 rounded-full px-3 py-1 transition-colors ${
                active
                  ? "bg-white text-black!"
                  : "text-zinc-400! hover:text-white!"
              }`}
            >
              {design.label}
            </Link>
          );
        })}
      </nav>
      {/* Grab handle — hover to reveal the switcher */}
      <div className="mb-2 h-1 w-10 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-white/50" />
    </div>
  );
};

export default RedesignSwitcher;
