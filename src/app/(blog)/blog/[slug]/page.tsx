import { allPosts } from "content-collections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blog/blog-content";
import BlogFooter from "@/components/blog/blog-footer";
import BlogHeader from "@/components/blog/blog-header";
import ReadingProgress from "@/components/blog/reading-progress";
import TableOfContents from "@/components/blog/table-of-contents";
import Calhacks12Post from "../../../../../content/posts/calhacks-12/calhacks-12.mdx";
import ReverseEngineeringTtcPost from "../../../../../content/posts/reverse-engineering-ttc/reverse-engineering-ttc.mdx";
import Treehacks2026Post from "../../../../../content/posts/treehacks-2026/treehacks-2026.mdx";
import { createBlogMdxComponents } from "./content";

const blogPostComponents = {
  "calhacks-12": Calhacks12Post,
  "reverse-engineering-ttc": ReverseEngineeringTtcPost,
  "treehacks-2026": Treehacks2026Post,
} as const;

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.fileName.substring(0, post._meta.fileName.length - 4),
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((post) => {
    const { fileName } = post._meta;
    return fileName.substring(0, fileName.length - 4) === slug;
  });

  if (!post) {
    return notFound();
  }

  const ogImage = post.banner
    ? {
        images: [
          {
            url: `/blog/${slug}/${post.banner}`,
            alt: post.title,
          },
        ],
      }
    : {};

  return {
    title: `${post.title} | Evan Yu`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date.toISOString(),
      authors: [post.author],
      ...ogImage,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post) => {
    const { fileName } = post._meta;
    return fileName.substring(0, fileName.length - 4) === slug;
  });
  if (!post) {
    notFound();
  }
  const PostContent =
    blogPostComponents[slug as keyof typeof blogPostComponents];
  if (!PostContent) {
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
              banner={post.banner}
              bannerCenter={post.bannerCenter}
              slug={post._meta.directory}
            />

            <BlogContent>
              <PostContent
                components={createBlogMdxComponents(post._meta.directory)}
              />
            </BlogContent>

            <BlogFooter slug={post._meta.path} />
          </div>
        </div>
      </article>
    </>
  );
}
