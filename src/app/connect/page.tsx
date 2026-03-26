import { allPosts } from "content-collections";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { hackathons } from "@/app/hackathons/data";
import BlogPostCard from "@/components/blog/blog-post-card";
import { Button } from "@/components/ui/button";
import { work } from "@/lib/work";

export const metadata: Metadata = {
  title: "Connect | Evan Yu",
  description:
    "Quick intro and links — scan to connect after we meet in person.",
};

function hackathonStats() {
  const total = hackathons.length;
  const wonCount = hackathons.filter((h) => h.award).length;
  const mostRecent = [...hackathons].sort(
    (a, b) => b.fullDate.getTime() - a.fullDate.getTime(),
  )[0];
  return { total, wonCount, mostRecent };
}

export default async function ConnectPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const { total, wonCount, mostRecent } = hackathonStats();
  const latestPost = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0];

  const fromLabel =
    from && from.trim().length > 0
      ? decodeURIComponent(from.trim()).replace(/\+/g, " ")
      : null;

  return (
    <main className="relative px-6 py-16 md:py-24 pt-24">
      <div className="mx-auto flex max-w-lg flex-col gap-10">
        <header className="space-y-5 text-center">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Hi, I&apos;m Evan Yu!
            </h1>
            {fromLabel ? (
              <p className="text-center text-xl text-muted-foreground md:text-2xl">
                Nice meeting you at{" "}
                <span className="font-medium text-foreground">{fromLabel}</span>
                !
              </p>
            ) : null}
          </div>
          <div className="space-y-4 text-pretty text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p>
              I'm a first-year math student at the{" "}
              <span className="font-medium text-foreground">
                University of Toronto
              </span>
              . Currently a{" "}
              <span className="font-medium text-foreground">
                Founding Software Engineer
              </span>{" "}
              at{" "}
              <a
                href={work[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                ConnectAlum
              </a>
              . I&apos;m passionate about startups and building software that
              actually matters.
            </p>
            <p>
              I'm obsessed with hackathons. I've currently won{" "}
              <span className="font-medium text-foreground">
                {wonCount}/{total}
              </span>{" "}
              hackathons attended, most recently{" "}
              <span className="font-medium text-foreground">
                {mostRecent.name}
              </span>
              {mostRecent.location && ` at ${mostRecent.location}`}.{" "}
              <Link
                href="/hackathons"
                target="_blank"
                className="text-primary hover:underline"
              >
                All hackathons
              </Link>
              .
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/" target="_blank">
              View my portfolio
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="https://github.com/Badbird5907" target="_blank">
              <Github className="size-4" />
              GitHub
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link
              href="https://linkedin.com/in/ev-yu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </Link>
          </Button>
        </div>

        {latestPost ? (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-center">
              Here's my most recent blog post!
            </h2>
            <BlogPostCard post={latestPost} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
