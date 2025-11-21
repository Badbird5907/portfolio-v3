"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { allPosts } from "content-collections";

type Post = typeof allPosts[number];

interface BlogListProps {
  posts: Array<Post>;
}

const description = "Thoughts, stories, and experiences from my journey in tech";

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-8">
      <div className="mb-16 md:mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
        >
          Blog
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post._meta.directory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className="group relative flex flex-col h-full"
          >
            <Link href={`/blog/${post._meta.directory}`} className="block h-full">
              <div className="h-full p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col">
                
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={new Date(post.date).toISOString()}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Summary */}
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow line-clamp-3">
                  {post.summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="p-1 rounded-full bg-primary/10">
                          <User className="w-3 h-3 text-primary" />
                      </div>
                      <span>{post.author}</span>
                  </div>
                  <span className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
