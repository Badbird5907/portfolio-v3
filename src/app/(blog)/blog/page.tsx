import { allPosts } from "content-collections";
import Link from "next/link";

const description = "Thoughts, stories, and experiences from my journey in tech" as const;
export const metadata = {
  title: "Blog | Evan Yu",
  description: description,
};

export default function BlogPage() {
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="relative min-h-screen py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-foreground/60">
            {description}
          </p>
        </div>

        <div className="space-y-8">
          {sortedPosts.map((post) => (
            <article
              key={post._meta.path}
              className="group relative border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <Link href={`/blog/${post._meta.path}`} className="block">
                <div className="flex flex-col gap-2">
                  <time className="text-sm text-foreground/60">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-foreground/70 mt-2">{post.summary}</p>
                  <div className="flex items-center gap-2 mt-4 text-sm text-foreground/60">
                    <span>{post.author}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

