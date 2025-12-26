"use client";

import { Calendar, Clock, Dot, User } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { BlogImage } from "./mdx-image";

interface BlogHeaderProps {
  title: string;
  date: Date;
  author: string;
  summary: string;
  readingTime: string;
  banner?: string;
  slug?: string;
}

export default function BlogHeader({
  title,
  date,
  author,
  summary,
  readingTime,
  banner,
  slug,
}: BlogHeaderProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 md:mb-16"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent pb-2"
        style={{ lineHeight: '1.3' }}
      >
        {title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-6"
      >
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{author}</span>
        </div>

        <Dot className="h-4 w-4 text-border" />

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={date.toISOString()}>{formattedDate}</time>
        </div>

        <Dot className="h-4 w-4 text-border" />

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{readingTime}</span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: banner ? 0.4 : 0.3 }}
        className="text-lg md:text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-6 py-2"
      >
        {summary}
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: banner ? 0.5 : 0.4 }}
        className="mt-8 h-px bg-gradient-to-r from-transparent via-border to-transparent origin-left"
      />

      {banner && slug && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="my-2 relative w-full aspect-[2/1] rounded-lg overflow-hidden"
        >
          <BlogImage
            src={`/api/blog/images/${slug}/${banner}`}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      )}
    </motion.header>
  );
}

