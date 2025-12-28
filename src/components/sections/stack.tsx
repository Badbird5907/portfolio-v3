"use client";

import { motion } from "motion/react";
import { useState } from "react";
import AWSIcon from "@/components/icons/stack/aws";
import DockerIcon from "@/components/icons/stack/docker";
import DrizzleIcon from "@/components/icons/stack/drizzle";
import JavaIcon from "@/components/icons/stack/java";
import NextjsIcon from "@/components/icons/stack/nextjs";
import PostgresIcon from "@/components/icons/stack/postgres";
import Mongo from "@/components/icons/stack/mongo";
import PythonIcon from "@/components/icons/stack/python";
import ReactIcon from "@/components/icons/stack/react";
import RedisIcon from "@/components/icons/stack/redis";
import TrpcIcon from "@/components/icons/stack/trpc";
import VercelIcon from "@/components/icons/stack/vercel";

const technologies = {
  primary: {
    name: "Primary Stack",
    header: "The stack I prefer to build with every day",
    footer: (
      <a
        href="https://turbo-kit.badbird.dev/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-mono text-muted-foreground/70 hover:text-primary transition-colors"
      >
        <span>→</span>
        <span>Try it in action with Turbo Kit</span>
      </a>
    ),
    items: [
      {
        name: "React",
        Icon: ReactIcon,
        category: "Frontend",
        href: "https://react.dev/",
      },
      {
        name: "Next.js",
        Icon: NextjsIcon,
        category: "Framework",
        href: "https://nextjs.org/",
      },
      {
        name: "TypeScript",
        Icon: TrpcIcon,
        category: "Language",
        href: "https://www.typescriptlang.org/",
      },
      {
        name: "PostgreSQL",
        Icon: PostgresIcon,
        category: "Database",
        href: "https://www.postgresql.org/",
      },
      {
        name: "Redis",
        Icon: RedisIcon,
        category: "Caching",
        href: "https://redis.io/",
      },
      {
        name: "Drizzle",
        Icon: DrizzleIcon,
        category: "ORM",
        href: "https://orm.drizzle.team/",
      },
      {
        name: "Docker",
        Icon: DockerIcon,
        category: "DevOps",
        href: "https://www.docker.com/",
      },
    ],
  },
  other: {
    name: "Other Technologies",
    header: "Other technologies I'm comfortable working with",
    footer: undefined,
    items: [
      {
        name: "Java",
        Icon: JavaIcon,
        category: "Language",
        href: "https://www.java.com/",
      },
      {
        name: "Python",
        Icon: PythonIcon,
        category: "Language",
        href: "https://www.python.org/",
      },
      {
        name: "AWS",
        Icon: AWSIcon,
        category: "Cloud",
        href: "https://aws.amazon.com/",
      },
      {
        name: "Vercel",
        Icon: VercelIcon,
        category: "Platform",
        href: "https://vercel.com/",
      },
      {
        name: "MongoDB",
        Icon: Mongo,
        category: "Database",
        href: "https://www.mongodb.com/",
      },
    ],
  },
};

export default function Stack() {
  const [activeTab, setActiveTab] = useState<"primary" | "other">("primary");
  const currentStack = technologies[activeTab];

  return (
    <section
      id="stack"
      className="relative flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl w-full">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Tech Stack
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              {currentStack.header}
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4"
          >
            <button
              onClick={() => setActiveTab("primary")}
              className={`relative px-4 py-2 font-mono text-sm md:text-base transition-colors ${
                activeTab === "primary"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {activeTab === "primary" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              {technologies.primary.name}
            </button>
            <button
              onClick={() => setActiveTab("other")}
              className={`relative px-4 py-2 font-mono text-sm md:text-base transition-colors ${
                activeTab === "other"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {activeTab === "other" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              {technologies.other.name}
            </button>
          </motion.div>

          {/* Tech Grid */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {currentStack.items.map((tech, index) => (
              <motion.a
                href={tech.href}
                target="_blank"
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative flex flex-col items-center justify-center p-6 rounded-lg border-2 border-border bg-card hover:border-primary transition-all duration-300 cursor-pointer w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)]"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <tech.Icon className="w-full h-full" />
                </div>
                <h3 className="text-foreground font-semibold text-sm md:text-base text-center mb-1">
                  {tech.name}
                </h3>
                <p className="text-muted-foreground text-xs text-center font-mono">
                  {tech.category}
                </p>
              </motion.a>
            ))}
            <br/> {/* this is here to fix a weird bug on brave with different domains?????? */}
            {currentStack.footer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentStack.footer}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
