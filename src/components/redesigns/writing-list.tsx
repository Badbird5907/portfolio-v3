"use client";

import Link from "next/link";

export type PostRef = {
  title: string;
  href: string;
  meta: string;
};

const WritingList = ({ posts }: { posts: PostRef[] }) => (
  <div>
    <ul>
      {posts.map((post) => (
        <li key={post.href} className="border-t border-white/15 py-2.5">
          <Link href={post.href} className="group block">
            <p className="text-[14px] text-[#f1eee7] transition-colors group-hover:underline underline-offset-[3px] decoration-white/40">
              {post.title}
            </p>
            <p className="text-[12px] text-white/50">{post.meta}</p>
          </Link>
        </li>
      ))}
    </ul>
    <p className="border-t border-white/15 pt-2.5 font-mono text-[11px] tracking-wide">
      <Link
        href="/blog"
        className="text-white/50! hover:text-white! transition-colors hover:underline underline-offset-[3px]"
      >
        All posts →
      </Link>
    </p>
  </div>
);

export default WritingList;
