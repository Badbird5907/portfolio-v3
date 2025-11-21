import { allPosts } from "content-collections";
import BlogList from "@/components/blog/blog-list";

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
      <BlogList posts={sortedPosts} />
    </main>
  );
}

