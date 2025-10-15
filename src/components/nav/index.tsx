"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  {
    name: "Home",
    href: "/#hero",
  },
  {
    name: "About",
    href: "/#about",
  },
  {
    name: "Work",
    href: "/#work",
  },
] as const;

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.25)"],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems
        .filter((item) => item.href.startsWith("/#"))
        .map((item) => item.href.replace("/#", ""));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    handleScroll(); // update on page load

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        style={{ backgroundColor: navBackground }}
        className={`backdrop-blur-md transition-shadow duration-300 ${
          isScrolled ? "shadow-lg border-b border-border/50" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/" className="group">
                <span className="text-2xl font-bold text-foreground hover:text-primary transition-all duration-300">
                  Evan Yu
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-1 md:gap-2"
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace("/#", "");
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 text-sm md:text-base font-medium transition-colors duration-300 rounded-lg group ${
                        isActive
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                      onClick={(e) => {
                        const selector = item.href.replace("/#", "#");
                        const target = document.querySelector(selector);
                        if (target) {
                          e.preventDefault();
                          target.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      <span className="relative z-10">{item.name}</span>

                      <span className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {isActive && (
                        <motion.span
                          layoutId="activeSection"
                          className="absolute inset-0 bg-primary/20 rounded-lg"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
