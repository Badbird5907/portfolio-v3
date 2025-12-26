"use client";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _jsx_runtime from "react/jsx-runtime";
import { BlogImage } from "@/components/blog/mdx-image";
import { createImageCarouselComponent } from "@/components/blog/image-carousel";
import type { MDXContentProps } from "mdx-bundler/client";

function useMDXComponent(code: string): React.FunctionComponent<MDXContentProps> {
  return React.useMemo(() => {
    const scope = { React, ReactDOM, _jsx_runtime };
    // eslint-disable-next-line no-new-func
    const fn = new Function(...Object.keys(scope), code);
    return fn(...Object.values(scope)).default;
  }, [code]);
}

export interface BlogContentProps {
  code: string;
  slug: string;
}

export default function BlogMDXContent({ code, slug }: BlogContentProps) {
  const Component = useMDXComponent(code);
  
  return (
    <Component 
      components={{
        img: (props) => <BlogImage slug={slug} {...props} />,
        Carousel: createImageCarouselComponent(slug),
        a: ({ children, ...props }) => <a target="_blank" rel="noopener noreferrer" {...props}>{children}</a>,
        h1: ({ children, ...props }) => <h1 className="border-b border-border/50 pb-2" {...props}>{children}</h1>,
        h2: ({ children, ...props }) => <h2 className="border-b border-border/50 pb-2" {...props}>{children}</h2>,
      }}
    />
  )
}