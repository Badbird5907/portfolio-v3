"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from the blog content
    const content = document.getElementById("blog-content");
    if (!content) return;

    const headingElements = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headingData: Heading[] = Array.from(headingElements).map((heading) => {
      // Create an ID if it doesn't exist
      if (!heading.id) {
        const id = heading.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || "";
        heading.id = id;
      }

      return {
        id: heading.id,
        text: heading.textContent || "",
        level: Number.parseInt(heading.tagName.substring(1)),
      };
    });

    setHeadings(headingData);

    // Set up intersection observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  const minLevel = Math.min(...headings.map((h) => h.level)); // min heading level to use as the base level

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="hidden xl:block fixed right-8 top-32 w-64 max-h-[calc(100vh-200px)] overflow-y-auto z-30"
    >
      <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
        <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
          On This Page
        </h3>

        <nav>
          <ul className="space-y-2">
            {headings.map((heading) => {
              const indent = (heading.level - minLevel) * 0.75; // 0.75rem per level
              
              return (
                <li
                  key={heading.id}
                  style={{
                    paddingLeft: `${indent}rem`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleClick(heading.id)}
                    className={`
                      text-left text-sm transition-all duration-200 w-full hover:cursor-pointer
                      ${
                        activeId === heading.id
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    {heading.text}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.aside>
  );
}
