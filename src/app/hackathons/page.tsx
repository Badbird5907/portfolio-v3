"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, MapPin, Trophy, Award } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

interface Hackathon {
  name: string;
  url: string;
  date: string;
  fullDate: Date;
  award?: string;
  location?: string;
  links?: { label: string; url: string }[];
  description: string;
}

type SortOption = "recency" | "oldest" | "wins" | "name";

const hackathons: Hackathon[] = [
  {
    name: "SEEKJR 2024",
    url: "https://github.com/Badbird5907/seek-2024-android-tensorflow",
    date: "Nov 2024",
    fullDate: new Date("2024-11-18"),
    award: "Honourable Mention",
    location: "University of Toronto",
    description:
      "Private hackathon for high school students hosted by UofT RSX. Ran TensorFlow on Android to detect patterns.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Badbird5907/seek-2024-android-tensorflow"
      }
    ]
  },
  {
    name: "Hack the Ridge 2024",
    url: "https://www.hacktheridge.ca/",
    date: "Dec 2024",
    fullDate: new Date("2024-12-14"),
    award: "🏆 2nd Place",
    location: "Iroquois Ridge High School",
    links: [
      { label: "Devpost", url: "https://devpost.com/software/neo-alert" },
      {
        label: "GitHub",
        url: "https://github.com/Badbird5907/htr-2024"
      }
    ],
    description:
      "High school hackathon. Trained a classifier to detect bradycardia in ICU neonatal infants.",
  },
  {
    name: "UTRAHacks 2025",
    url: "https://hackathon.utra.ca/",
    date: "Feb 2025",
    fullDate: new Date("2025-02-02"),
    award: "🏆 Best Use of GenAI",
    location: "University of Toronto",
    links: [
      { label: "Devpost", url: "https://devpost.com/software/baylee" },
      {
        label: "GitHub",
        url: "https://github.com/Badbird5907/utrahacks-2025"
      }
    ],
    description:
      "Hosted by UofT UTRA. Built a mental health support robot using multiple locally hosted models.",
  },
  {
    name: "Scrapyard Toronto",
    url: "https://scrapyard.hackclub.com/toronto",
    date: "Mar 2025",
    fullDate: new Date("2025-03-18"),
    award: "🏆 2nd Place",
    location: "Toronto, ON",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Badbird5907/scrapyard-2025"
      }
    ],
    description:
      "Hosted by Hack Club. Built a robot + taser controlled via Twitch chat.",
  },
  {
    name: "Undercity",
    url: "https://undercity.hackclub.com/",
    date: "Jul 2025",
    fullDate: new Date("2025-07-14"),
    location: "Github HQ, San Francisco, CA (Invite-only)",
    links: [
      { label: "GitHub", url: "https://github.com/RunTheBot/undercity" },
    ],
    description:
      "Spent 3 days compiling Linux drivers for Intel RealSense on Raspberry Pi.",
  },
  {
    name: "CalHacks 12.0",
    url: "https://calhacks.io/",
    date: "Oct 2025",
    fullDate: new Date("2025-10-24"),
    location: "Palace of Fine Arts, San Francisco, CA (UC Berkeley)",
    links: [
      {
        label: "Devpost",
        url: "https://devpost.com/software/igotrejectedfrominternshipsbcicantleetcodesoimadethisplatfor",
      },
      {
        label: "GitHub",
        url: "https://github.com/ngethan/vibecheck"
      }
    ],
    description:
      "Built an AI-powered coding assessment platform focused on real-world engineering skills (not algorithm puzzles).",
  },
  {
    name: "DeltaHacks 12",
    url: "https://www.deltahacks.com/",
    date: "Jan 2026",
    fullDate: new Date("2026-01-10"),
    location: "McMaster University",
    links: [
      { label: "Devpost", url: "https://devpost.com/software/big-city" },
      {
        label: "GitHub",
        url: "https://github.com/akashngb/big-city"
      }
    ],
    description:
      'Trained an ML model on Toronto Police data to "predict" crime, fires, accidents, and more.',
  },
  {
    name: "UofTHacks 13",
    url: "https://uofthacks.com/",
    date: "Jan 2026",
    fullDate: new Date("2026-01-17"),
    award: "🏆 Best Use of Vultr",
    location: "University of Toronto",
    links: [
      {
        label: "Devpost",
        url: "https://devpost.com/software/wavelength-5iacbt",
      },
      {
        label: "GitHub",
        url: "https://github.com/Badbird5907/uofthacks-2026"
      }
    ],
    description:
      "Built an AI-powered recruiting platform with a live OA using Gemini Live. Deployed on Vultr (Object Storage, Container Registry, Compute, Managed Postgres).",
  },
  {
    name: "UTRAHacks (2026)",
    url: "https://hackathon.utra.ca/",
    date: "Jan-Feb 2026",
    fullDate: new Date("2026-02-01"),
    award: "🏆 Best Use of Snowflake API",
    location: "University of Toronto",
    links: [
      {
        label: "Devpost",
        url: "https://devpost.com/software/the-third-leg",
      }
    ],
    description:
      'Built "Mission Control / The Trident" - Completely rebuilt the arduino IDE in the browser complete with LSP, compiling/uploading, and an ai agent. Won best use of Snowflake API.',
  },
];

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
