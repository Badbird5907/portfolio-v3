import type { MDXComponents } from "mdx/types";
import {
  ImageCarousel,
  type ImageCarouselProps,
} from "@/components/blog/image-carousel";
import { BlogImage, type BlogImageProps } from "@/components/blog/mdx-image";
import { YouTubeEmbed } from "@/components/blog/youtube-embed";

export function createBlogMdxComponents(slug: string): MDXComponents {
  return {
    img: (props) => <BlogImage slug={slug} {...(props as BlogImageProps)} />,
    BlogImage: (props: BlogImageProps) => <BlogImage slug={slug} {...props} />,
    Carousel: (props: ImageCarouselProps) => (
      <ImageCarousel slug={slug} {...props} />
    ),
    YouTubeEmbed,
    a: ({ children, ...props }) => (
      <a target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
    h1: ({ children, ...props }) => (
      <h1 className="border-b border-border/50 pb-2" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="border-b border-border/50 pb-2" {...props}>
        {children}
      </h2>
    ),
  };
}
