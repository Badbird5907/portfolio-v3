"use client";

import { allPosts } from "content-collections";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";

type Post = typeof allPosts[number];

interface BlogListProps {
  posts: Array<Post>;
}

const description = "Thoughts, stories, and experiences from my journey in tech";

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent pb-2">
          Blog
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {description}
        </p>
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </motion.div>

      <div className="space-y-8 md:space-y-12">
        {posts.map((post, index) => {
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(post.date));

          return (
            <motion.article
              key={post._meta.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${post._meta.directory}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  {post.banner && (
                    <div className="relative w-full aspect-[2/1] overflow-hidden bg-muted">
                      <Image
                        src={`/blog/${post._meta.directory}/${post.banner}`}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all duration-300">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {post.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>

                      <span className="text-border">•</span>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={new Date(post.date).toISOString()}>
                          {formattedDate}
                        </time>
                      </div>

                      <span className="text-border">•</span>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>

      {posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-muted-foreground text-lg">No posts yet. Check back soon!</p>
        </motion.div>
      )}
    </div>
  )
}
