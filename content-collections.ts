import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";
import readingTime from "reading-time";

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    // readingTime: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [[rehypePrettyCode, {
        theme: "github-dark",
      }]]
    });
    const readingTimeResult = readingTime(document.content);
    if (document._meta.directory !== document._meta.fileName.substring(0, document._meta.fileName.length - 4)) { // strip .mdx
      throw new Error(`Path ${document._meta.path} does not match file name ${document._meta.fileName} (rename to ${document._meta.path}.mdx)`);
    }
    return {
      ...document,
      mdx,
      readingTime: readingTimeResult.text,
    } as const;
  },
});

export default defineConfig({
  collections: [posts],
});
