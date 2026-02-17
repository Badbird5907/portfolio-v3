export interface Hackathon {
  name: string;
  slug: string;
  url: string;
  date: string;
  fullDate: Date;
  award?: string;
  location?: string;
  links?: { label: string; url: string }[];
  description: string;
}

export const hackathons: Hackathon[] = [
  {
    name: "SEEKJR 2024",
    slug: "seekjr-2024",
    url: "https://github.com/Badbird5907/seek-2024-android-tensorflow",
    date: "Nov 2024",
    fullDate: new Date("2024-11-18"),
    award: "Honourable Mention",
    location: "University of Toronto",
    description:
      "Private hackathon for high school students hosted by UofT RSX. Ran TensorFlow on Android to detect patterns.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Badbird5907/seek-2024-android-tensorflow"
      }
    ]
  },
  {
    name: "Hack the Ridge 2024",
    slug: "hack-the-ridge-2024",
    url: "https://www.hacktheridge.ca/",
    date: "Dec 2024",
    fullDate: new Date("2024-12-14"),
    award: "🏆 2nd Place",
    location: "Iroquois Ridge High School",
    links: [
      { label: "Devpost", url: "https://devpost.com/software/neo-alert" },
      {
        label: "GitHub",
        url: "https://github.com/Badbird5907/htr-2024"
      }
    ],
    description:
      "High school hackathon. Trained a classifier to detect bradycardia in ICU neonatal infants.",
  },
  {
    name: "UTRAHacks 2025",
    slug: "utrahacks-2025",
    url: "https://hackathon.utra.ca/",
    date: "Feb 2025",
    fullDate: new Date("2025-02-02"),
    award: "🏆 Best Use of GenAI",
    location: "University of Toronto",
    links: [
      { label: "Devpost", url: "https://devpost.com/software/baylee" },
      {
        label: "GitHub",
        url: "https://github.com/Badbird5907/utrahacks-2025"
      }
    ],
    description:
      "Hosted by UofT UTRA. Built a mental health support robot using multiple locally hosted models.",
  },
  {
    name: "Scrapyard Toronto",
    slug: "scrapyard-toronto",
    url: "https://scrapyard.hackclub.com/toronto",
    date: "Mar 2025",
    fullDate: new Date("2025-03-18"),
    award: "🏆 2nd Place",
    location: "Toronto, ON",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Badbird5907/scrapyard-2025"
      }
    ],
    description:
      "Hosted by Hack Club. Built a robot + taser controlled via Twitch chat.",
  },
  {
    name: "Undercity",
    slug: "undercity",
    url: "https://undercity.hackclub.com/",
    date: "Jul 2025",
    fullDate: new Date("2025-07-14"),
    location: "Github HQ, San Francisco, CA (Invite-only)",
    links: [
      { label: "GitHub", url: "https://github.com/RunTheBot/undercity" },
    ],
    description:
      "Spent 3 days compiling Linux drivers for Intel RealSense on Raspberry Pi.",
  },
  {
    name: "CalHacks 12.0",
    slug: "calhacks-12",
    url: "https://calhacks.io/",
    date: "Oct 2025",
    fullDate: new Date("2025-10-24"),
    location: "Palace of Fine Arts, San Francisco, CA (UC Berkeley)",
    links: [
      {
        label: "Devpost",
        url: "https://devpost.com/software/igotrejectedfrominternshipsbcicantleetcodesoimadethisplatfor",
      },
      {
        label: "GitHub",
        url: "https://github.com/ngethan/vibecheck"
      }
    ],
    description:
      "Built an AI-powered coding assessment platform focused on real-world engineering skills (not algorithm puzzles).",
  },
  {
    name: "DeltaHacks 12",
    slug: "deltahacks-12",
    url: "https://www.deltahacks.com/",
    date: "Jan 2026",
    fullDate: new Date("2026-01-10"),
    location: "McMaster University",
    links: [
      { label: "Devpost", url: "https://devpost.com/software/big-city" },
      {
        label: "GitHub",
        url: "https://github.com/akashngb/big-city"
      }
    ],
    description:
      'Trained an ML model on Toronto Police data to "predict" crime, fires, accidents, and more.',
  },
  {
    name: "UofTHacks 13",
    slug: "uofthacks-13",
    url: "https://uofthacks.com/",
    date: "Jan 2026",
    fullDate: new Date("2026-01-17"),
    award: "🏆 Best Use of Vultr",
    location: "University of Toronto",
    links: [
      {
        label: "Devpost",
        url: "https://devpost.com/software/wavelength-5iacbt",
      },
      {
        label: "GitHub",
        url: "https://github.com/Badbird5907/uofthacks-2026"
      }
    ],
    description:
      "Built an AI-powered recruiting platform with a live OA using Gemini Live. Deployed on Vultr (Object Storage, Container Registry, Compute, Managed Postgres).",
  },
  {
    name: "UTRAHacks (2026)",
    slug: "utrahacks-2026",
    url: "https://hackathon.utra.ca/",
    date: "Jan-Feb 2026",
    fullDate: new Date("2026-02-01"),
    award: "🏆 Best Use of Snowflake API",
    location: "University of Toronto",
    links: [
      {
        label: "Devpost",
        url: "https://devpost.com/software/the-third-leg",
      }
    ],
    description:
      'Built "Mission Control / The Trident" - Completely rebuilt the arduino IDE in the browser complete with LSP, compiling/uploading, and an ai agent. Won best use of Snowflake API.',
  },
  {
    name: "TreeHacks 2026",
    slug: "treehacks-2026",
    url: "https://devpost.com/software/minerva-3sj6z0",
    date: "Feb 2026",
    fullDate: new Date("2026-02-14"),
    award: "🏆 1st Place - Education Track (Zoom) | Best Creation with HeyGen Avatar API",
    location: "Stanford University",
    links: [
      { label: "Devpost", url: "https://devpost.com/software/minerva-3sj6z0" },
      {
        label: "GitHub",
        url: "https://github.com/anton-3/minerva"
      }
    ],
    description:
      "Built an accessible AI tutor platform that teaches any topic over video calls in a non-judgmental environment. Generates MANIM animations for math concepts and integrates with Desmos for interactive teaching.",
  },
];
