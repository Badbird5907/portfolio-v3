import { allPosts } from "content-collections";
import RedesignChroma from "@/components/redesigns/chroma";

export const metadata = {
  title: "Redesign: Chroma — Evan Yu",
};

const latestPosts = [...allPosts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 2)
  .map((post) => ({
    title: post.title,
    href: `/blog/${post._meta.directory}`,
    meta: `${new Date(post.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })} · ${post.readingTime}`,
  }));

export default function ChromaPage() {
  return <RedesignChroma posts={latestPosts} />;
}
