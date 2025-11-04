"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { allPosts } from "content-collections";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Giscus from "@giscus/react";
import { env } from "@/env";

interface BlogFooterProps {
  slug: string;
}

export default function BlogFooter({ slug }: BlogFooterProps) {
  const currentIndex = allPosts.findIndex((post) => post._meta.path === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <motion.footer
      data-blog-footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-16 pt-8 border-t border-border"
    >
      {/* <nav className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost._meta.path}`}
            className="group block p-6 rounded-lg border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
          >
            <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous Post
            </div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {prevPost.title}
            </h3>
          </Link>
        ) : (
          <div className="block p-6 rounded-lg border border-border opacity-50 cursor-not-allowed">
            <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous Post
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">
              No previous post
            </h3>
          </div>
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost._meta.path}`}
            className="group block p-6 rounded-lg border border-border hover:border-primary transition-all duration-300 hover:shadow-lg md:text-right"
          >
            <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2 md:justify-end">
              Next Post
              <ArrowRight className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {nextPost.title}
            </h3>
          </Link>
        ) : (
          <div className="block p-6 rounded-lg border border-border opacity-50 cursor-not-allowed md:text-right">
            <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2 md:justify-end">
              Next Post
              <ArrowRight className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">
              No next post
            </h3>
          </div>
        )}
      </nav> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-12"
      >
        {env.NEXT_PUBLIC_GISCUS_REPO && (
          <Giscus
            repo={env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
            repoId={env.NEXT_PUBLIC_GISCUS_REPO_ID ?? ""}
            category="General"
            categoryId={env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? ""}
            mapping="title"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="transparent_dark"
            lang="en"
            loading="lazy"
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="text-center"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>
      </motion.div>
    </motion.footer>
  );
}

