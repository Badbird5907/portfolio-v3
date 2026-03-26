import type { allPosts } from "content-collections";
import { Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Post = (typeof allPosts)[number];

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date));

  return (
    <Link href={`/blog/${post._meta.directory}`} className="group block">
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
  );
}
