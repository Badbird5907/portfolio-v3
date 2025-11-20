"use client";
import { MDXContent } from "@content-collections/mdx/react";
import { createMDXImageComponent } from "@/components/blog/mdx-image";

export interface BlogContentProps {
  code: string;
  slug: string;
}
export default function BlogMDXContent({ code, slug }: BlogContentProps) {
  return (
    <MDXContent 
      code={code} 
      components={{
        img: createMDXImageComponent(slug),
        a: ({ children, ...props }) => <a target="_blank" {...props}>{children}</a>,
        h1: ({ children, ...props }) => <h1 className="border-b border-border/50 pb-2" {...props}>{children}</h1>,
        h2: ({ children, ...props }) => <h2 className="border-b border-border/50 pb-2" {...props}>{children}</h2>,
      }}
    />
  )
}