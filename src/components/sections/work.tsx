"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { work } from "@/lib/work";

const Work = () => {
  // hi ethan :]
  return (
    <section
      id="work"
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-4xl w-full">
        <div className="space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Work Experience
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              My professional journey building impactful products and leading
              teams
            </p>
          </motion.div>

          {/* Timeline */}
          <ol className="relative space-y-8">
            {/* Timeline spine */}
            <div
              aria-hidden
              className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
            />

            {work.map((item, index) => {
              const isCurrent = item.end === "Present";
              return (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative pl-10 md:pl-12"
                >
                  {/* Timeline dot */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-7 flex size-[15px] items-center justify-center"
                  >
                    {isCurrent && (
                      <span className="absolute inline-flex size-full rounded-full bg-primary/50 animate-ping" />
                    )}
                    <span
                      className={`relative inline-flex size-[9px] rounded-full ${
                        isCurrent
                          ? "bg-primary"
                          : "bg-muted-foreground/60 ring-4 ring-background"
                      }`}
                    />
                  </span>

                  <div className="group rounded-lg border-2 border-border bg-card/40 backdrop-blur-sm p-6 transition-colors hover:border-primary/50">
                    {/* Header */}
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between mb-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-mono font-bold">
                          {item.url ? (
                            <Link
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <span className="text-foreground">{item.name}</span>
                          )}
                        </h3>
                        {item.title && (
                          <p className="text-primary font-mono">{item.title}</p>
                        )}
                      </div>
                      <p className="shrink-0 text-sm text-muted-foreground font-mono sm:text-right">
                        {item.start} —{" "}
                        {isCurrent ? (
                          <span className="text-primary">Present</span>
                        ) : (
                          item.end
                        )}
                      </p>
                    </div>

                    {/* Points */}
                    <ul className="space-y-2 mb-5">
                      {item.points.map((point, pointIndex) => (
                        <li
                          key={`${item.name}-point-${pointIndex}`}
                          className="flex items-start"
                        >
                          <span className="text-primary mr-2">▸</span>
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 border border-border bg-secondary/30 hover:border-primary/60 hover:text-foreground transition-colors text-muted-foreground rounded-full text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Work;
