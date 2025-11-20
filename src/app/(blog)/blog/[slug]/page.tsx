import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogHeader from "@/components/blog/blog-header";
import BlogContent from "@/components/blog/blog-content";
import BlogFooter from "@/components/blog/blog-footer";
import ReadingProgress from "@/components/blog/reading-progress";
import TableOfContents from "@/components/blog/table-of-contents";
import BlogMDXContent from "./content";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((post) => {
    const { fileName } = post._meta;
    return fileName.substring(0, fileName.length - 4) === slug
  })

  if (!post) {
    return notFound();
  }

  return {
    title: `${post.title} | Evan Yu`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date.toISOString(),
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post) => {
    const { fileName } = post._meta;
    return fileName.substring(0, fileName.length - 4) === slug
  })
  if (!post) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <TableOfContents />
      <article className="relative min-h-screen py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-4xl xl:mr-80">
            <BlogHeader
              readingTime={post.readingTime}
              title={post.title}
              date={post.date}
              author={post.author}
              summary={post.summary}
            />

            <BlogContent>
              <BlogMDXContent
                code={post.mdx}
                slug={post._meta.directory}
              />
            </BlogContent>

            <BlogFooter slug={post._meta.path} />
          </div>
        </div>
      </article>
    </>
  );
}

