"use client";

import {
  Dithering,
  ImageDithering,
  MeshGradient,
} from "@paper-design/shaders-react";
import { motion } from "motion/react";
import { Newsreader } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ContributionGraph from "@/components/redesigns/contribution-graph";
import CornerMeta from "@/components/redesigns/corner-meta";
import WritingList, { type PostRef } from "@/components/redesigns/writing-list";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

const IVORY = "#f1eee7";

const workRows = [
  {
    years: "2026–Present",
    org: "The Relationship Company",
    role: "Product Engineer",
    url: "https://relationship.co/",
  },
  {
    years: "2024–26",
    org: "Connect",
    role: "Founding Software Engineer",
    url: "https://connectalum.com/",
  },
  {
    years: "2022–25",
    org: "Freelancing",
    role: "Software & infrastructure for clients",
  },
];

const links = [
  ["GitHub", "https://github.com/Badbird5907"],
  ["LinkedIn", "https://linkedin.com/in/ev-yu"],
  ["Email", "mailto:contact@evanyu.dev"],
  ["Blog", "/blog"],
  ["Hackathons", "/hackathons"],
];

const underline =
  "underline underline-offset-[3px] decoration-white/30 transition-colors hover:decoration-white";

// Background dither resolves from coarse to fine on load
const LOADIN_STEPS = [18, 12, 8, 5, 3];

const MiniLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/45">
    {children}
  </h2>
);

const Flicker = ({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0.25, 1] }}
    transition={{
      duration: 0.5,
      times: [0, 0.4, 0.6, 1],
      delay,
      ease: "linear",
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Photo reveal: a true ordered dither (8x8 Bayer) that refines in discrete
// steps — pixel size and color quantization jump, no continuous scaling —
// then crossfades into the real image
const REVEAL_STEPS = [
  { size: 6, colorSteps: 1 },
  { size: 4, colorSteps: 2 },
  { size: 4, colorSteps: 3 },
  { size: 2, colorSteps: 4 },
  { size: 2, colorSteps: 6 },
];
const STEP_MS = 100;

const DitherPolaroid = ({
  src,
  alt,
  caption,
  rotate,
  float = 0,
  revealDelay = 0,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  rotate: number;
  float?: number;
  revealDelay?: number;
  className?: string;
}) => {
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let fadeTimeout: ReturnType<typeof setTimeout> | undefined;
    const timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        if (i >= REVEAL_STEPS.length) {
          clearInterval(interval);
          setRevealed(true);
          fadeTimeout = setTimeout(() => setGone(true), 400);
          return;
        }
        setStep(i);
      }, STEP_MS);
    }, revealDelay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
      if (fadeTimeout) clearTimeout(fadeTimeout);
    };
  }, [revealDelay]);

  const { size, colorSteps } = REVEAL_STEPS[step];

  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{
        duration: 6 + float,
        delay: float,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      <motion.figure
        animate={{ rotate }}
        whileHover={{ rotate: 0, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="relative w-40 bg-[#f4f1ea] p-2 pb-8 shadow-2xl shadow-black/50 md:w-48"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* Real photo underneath */}
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 160px, 192px"
            className="object-cover"
          />
          {/* Dither overlay refines in discrete steps, then crossfades away */}
          {!gone && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
              style={{ opacity: revealed ? 0 : 1 }}
            >
              <ImageDithering
                image={src}
                originalColors
                colorSteps={colorSteps}
                type="8x8"
                size={size}
                fit="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </div>
        <figcaption className="absolute bottom-2.5 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600">
          {caption}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
};

const Badge = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 32, ease: "linear", repeat: Infinity }}
    className="relative size-24 md:size-28"
  >
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
      <title>rotating badge</title>
      <defs>
        <path
          id="chroma-badge-circle"
          d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
        />
      </defs>
      <text className="fill-white/40 font-mono text-[7.5px] uppercase">
        <textPath
          href="#chroma-badge-circle"
          textLength={237}
          lengthAdjust="spacingAndGlyphs"
        >
          Evan Yu · Toronto · Software Engineer ·
        </textPath>
      </text>
    </svg>
    <span
      className={`${newsreader.className} absolute inset-0 flex items-center justify-center text-xl italic text-white/50`}
    >
      ey
    </span>
  </motion.div>
);

const RedesignChroma = ({ posts = [] }: { posts?: PostRef[] }) => {
  const [ditherSize, setDitherSize] = useState(LOADIN_STEPS[0]);

  // Step the background dither from coarse to fine, like an image resolving
  useEffect(() => {
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      if (step >= LOADIN_STEPS.length) {
        clearInterval(id);
        return;
      }
      setDitherSize(LOADIN_STEPS[step]);
    }, 200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="redesign relative min-h-screen overflow-x-clip font-sans [--primary:#f1eee7]"
      style={{ backgroundColor: "#050507", color: "rgba(241,238,231,0.78)" }}
    >
      {/* Fixed background: vivid mesh gradient with a dither field layered on top */}
      <div className="fixed inset-0">
        <MeshGradient
          colors={[
            "#050509",
            "#0e1e40",
            "#0e352f",
            "#221845",
            "#3c2136",
            "#050509",
          ]}
          distortion={0.8}
          swirl={0.5}
          speed={0.18}
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <Dithering
            colorBack="#00000000"
            colorFront="#ffffff"
            shape="warp"
            type="4x4"
            size={ditherSize}
            speed={0.25}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1700px] flex-col p-6 md:p-10">
        {/* Top row */}
        <Flicker className="flex items-start justify-between">
          <div>
            <h1
              className={`${newsreader.className} mb-1 text-3xl md:text-4xl`}
              style={{ color: IVORY }}
            >
              Evan Yu
            </h1>
            <p className="text-[15px] text-white/50">
              Software engineer in Toronto
            </p>
          </div>
          <CornerMeta />
        </Flicker>

        {/* Spread */}
        <div className="grid flex-1 content-center gap-x-10 gap-y-14 py-12 lg:grid-cols-12">
          {/* Prose + stack */}
          <div className="space-y-12 lg:col-span-5">
            <Flicker
              delay={0.2}
              className="space-y-5 text-[15px] leading-[1.8] md:text-base"
            >
              <p>
                As a full-stack software engineer, I'm passionate about building
                impactful and meaningful products. I'm currently doing that at{" "}
                <a
                  href="https://relationship.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={underline}
                  style={{ color: IVORY }}
                >
                  The Relationship Company
                </a>
                , working on a consumer mobile app and an AI messaging agent.
                Before that I was the founding engineer at{" "}
                <a
                  href="https://connectalum.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={underline}
                  style={{ color: IVORY }}
                >
                  Connect
                </a>
                , growing an alumni platform past 9,000 monthly users.
              </p>
              <p>
                I study mathematics at the University of Toronto, actively seek
                out new learning experiences, and enjoy competing in{" "}
                <Link
                  href="/hackathons"
                  className={underline}
                  style={{ color: IVORY }}
                >
                  hackathons
                </Link>
                <sup>*</sup> — I've won six of the ten I've entered. I also
                write the occasional{" "}
                <Link
                  href="/blog"
                  className={underline}
                  style={{ color: IVORY }}
                >
                  blog post
                </Link>
                .
              </p>
              <p className="pt-1 font-mono text-[11px] leading-relaxed tracking-wide text-white/45">
                * most recently TreeHacks 2026 @ Stanford, where I built
                Minerva, an AI video tutor that won both 1st in the Education
                track and Best Creation with HeyGen API.
              </p>
            </Flicker>

            <Flicker delay={0.35}>
              <MiniLabel>GitHub</MiniLabel>
              <ContributionGraph />
            </Flicker>
          </div>

          {/* Work + education + contact */}
          <div className="space-y-12 lg:col-span-3 lg:col-start-6">
            <Flicker delay={0.3}>
              <MiniLabel>Work</MiniLabel>
              <ul>
                {workRows.map((row, i) => (
                  <motion.li
                    key={row.org}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.25, 1] }}
                    transition={{
                      duration: 0.45,
                      times: [0, 0.4, 0.6, 1],
                      delay: 0.4 + i * 0.12,
                      ease: "linear",
                    }}
                    whileHover={{ x: 4 }}
                    className="flex items-baseline justify-between gap-4 border-t border-white/15 py-2.5"
                  >
                    <div className="min-w-0">
                      <p
                        className="truncate text-[14px]"
                        style={{ color: IVORY }}
                      >
                        {row.url ? (
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-[3px]"
                          >
                            {row.org}
                          </a>
                        ) : (
                          row.org
                        )}
                      </p>
                      <p className="text-[12px] text-white/50">{row.role}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] tabular-nums text-white/50">
                      {row.years}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </Flicker>

            {posts.length > 0 && (
              <Flicker delay={0.55}>
                <MiniLabel>Writing</MiniLabel>
                <WritingList posts={posts} />
              </Flicker>
            )}

            <Flicker delay={0.65}>
              <MiniLabel>Contact</MiniLabel>
              <p className="border-t border-white/15 pt-3">
                <a
                  href="mailto:contact@evanyu.dev"
                  className={`text-lg ${underline}`}
                  style={{ color: IVORY }}
                >
                  contact@evanyu.dev
                </a>
              </p>
            </Flicker>
          </div>

          {/* Photos + badge */}
          <Flicker
            delay={0.5}
            className="flex flex-wrap items-center gap-6 lg:col-span-3 lg:col-start-10 lg:block"
          >
            <DitherPolaroid
              src="/img/about/me.png"
              alt="Evan Yu"
              caption="fig. 01 — me"
              rotate={3}
              revealDelay={300}
              className="relative z-10"
            />
            <DitherPolaroid
              src="/img/about/toronto.png"
              alt="Toronto skyline"
              caption="fig. 02 — home"
              rotate={-4}
              float={1}
              revealDelay={450}
              className="lg:-mt-10 lg:ml-20"
            />
            <div className="lg:-mt-2 lg:ml-2">
              <Badge />
            </div>
          </Flicker>
        </div>

        {/* Bottom row */}
        <Flicker
          delay={0.7}
          className="flex flex-wrap items-baseline justify-between gap-4 border-t border-white/15 pt-6 text-[13px] text-white/50"
        >
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("/") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-white/50! hover:text-white! hover:underline underline-offset-[3px] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <span className={`${newsreader.className} italic`}>Toronto</span>
        </Flicker>
      </div>
    </div>
  );
};

export default RedesignChroma;
