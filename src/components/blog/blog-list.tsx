"use client";

import type { allPosts } from "content-collections";
import { motion } from "motion/react";
import BlogPostCard from "@/components/blog/blog-post-card";

type Post = (typeof allPosts)[number];

interface BlogListProps {
  posts: Array<Post>;
}

const description =
  "Thoughts, stories, and experiences from my journey in tech";

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
        {posts.map((post, index) => (
          <motion.article
            key={post._meta.path}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogPostCard post={post} />
          </motion.article>
        ))}
      </div>

      {posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-muted-foreground text-lg">
            No posts yet. Check back soon!
          </p>
        </motion.div>
      )}
    </div>
  );
}
