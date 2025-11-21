"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export type NavItem = {
  name: string;
  href: string;
  alt?: boolean;
};

const landingNavItems = [
  { name: "Home", href: "/#hero" },
  { name: "About", href: "/#about" },
  { name: "Work", href: "/#work" },
  { name: "Blog", href: "/blog", alt: true },
] as NavItem[];

const blogNavItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog", alt: true },
] as NavItem[];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.25)"],
  );

  // Determine which nav items to show based on current route
  const isBlogPost = pathname.startsWith("/blog/"); // specifically match for /blog/slug
  const isBlogSection = pathname.startsWith("/blog"); // specifically match for /blog
  const navItems = isBlogSection ? blogNavItems as NavItem[] : landingNavItems as NavItem[];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Only apply scroll-based hide/show on blog routes
      if (isBlogPost) {
        // Show navbar when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY.current) {
          // Scrolling up
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down and past threshold
          setIsVisible(false);
        }
        
        // Always show navbar at the top
        if (currentScrollY < 10) {
          setIsVisible(true);
        }
      } else {
        // Always visible on landing page
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems, isBlogPost]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -100 }}
      animate={{ 
        opacity: 1, 
        y: isBlogPost && !isMobileMenuOpen ? (isVisible ? 0 : -100) : 0
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeInOut" 
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        style={{ backgroundColor: navBackground }}
        className={`backdrop-blur-md transition-shadow duration-300 ${
          isScrolled || isMobileMenuOpen ? "shadow-lg border-b border-border/50" : ""
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

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex items-center gap-1 md:gap-2"
            >
              {navItems.map((item, index) => {
                // Check if this is a hash link (landing page sections) or path link (blog)
                const isHashLink = item.href.startsWith("/#");
                let isActive = false;
                
                if (isHashLink) {
                  // For hash links, check if section is in view
                  isActive = activeSection === item.href.replace("/#", "");
                } else {
                  // For path links, check if pathname matches
                  if (item.href === "/") {
                    isActive = pathname === "/";
                  } else {
                    isActive = pathname.startsWith(item.href);
                  }
                }
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1, delay: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-4 py-2 text-sm md:text-base font-medium transition-colors duration-300 rounded-lg group",
                        isActive
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground",
                        item.alt ? "border border-secondary" : ""
                      )}
                      onClick={(e) => {
                        // Only handle smooth scrolling for hash links
                        if (isHashLink) {
                          const selector = item.href.replace("/#", "#");
                          const target = document.querySelector(selector);
                          if (target) {
                            e.preventDefault();
                            target.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                      }}
                    >
                      <span className="relative z-10">{item.name}</span>

                      <span className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {isActive && (
                        <motion.span
                          layoutId={`activeSection-${isBlogPost ? 'blog' : 'landing'}`}
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

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-t border-border/50"
            >
              <div className="px-6 py-4 space-y-4">
                {/* Horizontal Links (Home, About, Work) */}
                <div className="flex items-center justify-center gap-4">
                  {navItems
                    .filter((item) => !item.alt)
                    .map((item) => {
                      const isHashLink = item.href.startsWith("/#");
                      let isActive = false;
                      if (isHashLink) {
                        isActive = activeSection === item.href.replace("/#", "");
                      } else {
                        if (item.href === "/") {
                          isActive = pathname === "/";
                        } else {
                          isActive = pathname.startsWith(item.href);
                        }
                      }

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "text-base font-medium transition-colors duration-300",
                            isActive
                              ? "text-primary"
                              : "text-foreground/70 hover:text-foreground"
                          )}
                          onClick={async (e) => {
                            setIsMobileMenuOpen(false);
                            if (isHashLink) {
                              const sectionId = item.href.replace("/#", "");
                              const element = document.getElementById(sectionId);
                              
                              if (element) {
                                e.preventDefault();
                                await new Promise(resolve => setTimeout(resolve, 100));
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                            }
                          }}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                </div>

                {/* Separate Line Items (Blog) */}
                <div className="flex flex-col space-y-2">
                  {navItems
                    .filter((item) => item.alt)
                    .map((item) => {
                       // Logic duplicated for now, can be refactored if complex
                       const isActive = pathname.startsWith(item.href);
                       
                       return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "block px-4 py-3 text-base font-medium transition-colors duration-300 rounded-lg text-center border border-secondary",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-foreground/70 hover:text-foreground hover:bg-primary/5"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                       );
                    })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
}
