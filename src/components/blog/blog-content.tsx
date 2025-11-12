"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BlogContentProps {
  children: React.ReactNode;
}

export default function BlogContent({ children }: BlogContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      id="blog-content"
      className={cn(
        "prose prose-lg prose-invert max-w-none",
        // Headings
        "prose-headings:font-bold prose-headings:tracking-tight",
        "prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:first:mt-0",
        "prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mb-4 prose-h2:mt-8",
        "prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:mb-3 prose-h3:mt-6",
        // Paragraphs
        "prose-p:mb-4 prose-p:leading-relaxed prose-p:text-foreground/90",
        // Links
        "prose-a:text-foreground prose-a:no-underline hover:prose-a:underline prose-a:transition-all",
        // Text formatting
        "prose-strong:text-foreground prose-strong:font-bold",
        // Code
        "prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none",
        // Code blocks
        "prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4",
        // Blockquotes
        "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground",
        // Lists
        "prose-ul:list-disc prose-ul:mb-4 prose-ul:space-y-2",
        "prose-ol:list-decimal prose-ol:mb-4 prose-ol:space-y-2",
        "prose-li:ml-4 prose-li:text-foreground/90",
        // Images
        "prose-img:rounded-lg prose-img:my-8 prose-img:shadow-lg",
        // Horizontal rules
        "prose-hr:my-8 prose-hr:border-border"
      )}
    >
      {children}
    </motion.div>
  );
}

