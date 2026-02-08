"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, MapPin, Trophy, Award } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { hackathons, type Hackathon } from "./data";

type SortOption = "recency" | "oldest" | "wins" | "name";

const sortOptions: {
  value: SortOption;
  label: string;
  fn: (a: Hackathon, b: Hackathon) => number;
}[] = [
  {
    value: "recency",
    label: "Most Recent",
    fn: (a, b) => b.fullDate.getTime() - a.fullDate.getTime(),
  },
  {
    value: "oldest",
    label: "Oldest",
    fn: (a, b) => a.fullDate.getTime() - b.fullDate.getTime(),
  },
  {
    value: "wins",
    label: "Awards",
    fn: (a, b) => {
      const aHasAward = a.award ? 1 : 0;
      const bHasAward = b.award ? 1 : 0;
      if (bHasAward !== aHasAward) return bHasAward - aHasAward;
      return b.fullDate.getTime() - a.fullDate.getTime();
    },
  },
  {
    value: "name",
    label: "Name",
    fn: (a, b) => a.name.localeCompare(b.name),
  },
];

export default function HackathonsPage() {
  const [sortBy, setSortBy] = useState<SortOption>("recency");

  const sortedHackathons = useMemo(() => {
    const sortFn = sortOptions.find((opt) => opt.value === sortBy)?.fn;
    return sortFn ? [...hackathons].sort(sortFn) : hackathons;
  }, [sortBy]);

  return (
    <main className="relative min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Hackathons
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            This is a complete list of all hackathons i've attended over the last few years.
          </p>
        </motion.div>

        {/* Sort Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex gap-2 flex-wrap">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                variant={sortBy === option.value ? "default" : "outline"}
                size="sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Hackathons List */}
        <div className="space-y-6">
          {sortedHackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-2 border-border rounded-lg p-6 bg-card hover:border-primary transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <Link
                      href={hackathon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      {hackathon.name}
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-sm text-muted-foreground font-mono">
                      {hackathon.date}
                    </span>
                    {hackathon.award && (
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        {hackathon.award.includes("🏆") ? (
                          hackathon.award
                        ) : (
                          <>
                            <Award className="w-4 h-4" />
                            {hackathon.award}
                          </>
                        )}
                      </span>
                    )}
                    {hackathon.location && (
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {hackathon.location}
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-3">
                    {hackathon.description}
                  </p>

                  {hackathon.links && hackathon.links.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {hackathon.links.map((link, i) => (
                        <Link
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          {link.label === "GitHub" && <Github className="w-4 h-4" />}
                          {link.label}
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 p-6 border-2 border-border rounded-lg bg-card"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">
                {hackathons.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Hackathons
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {
                  hackathons.filter(
                    (h) => h.award && h.award.includes("🏆")
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">Awards Won</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {
                  hackathons.filter(
                    (h) => h.award && h.award.toLowerCase().includes("place")
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">Top 3 Finishes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {new Date().getFullYear() - 2024 + 1}
              </div>
              <div className="text-sm text-muted-foreground">Years Active</div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
