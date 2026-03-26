
type Work = {
  name: string;
  title?: string;
  url?: string;
  start: string;
  end: string;
  points: string[];
  tags: string[];
};

export const work: Work[] = [
  {
    name: "Connect",
    title: "Founding Software Engineer",
    url: "https://connectalum.com/",
    start: "January 2024",
    end: "Present",
    points: [
      "Led development of a multi-tenant platform, serving 9,000+ monthly active users, using React, NextJS, PostgreSQL, and Drizzle ORM, ensuring seamless scalability and UX",
      "Developed and launched a LinkedIn-like social platform with features such as real-time chat, connection-building, and posts with recommendations based on the user’s preferences",
      "Applied knowledge of algorithms and data structures to enhance the scalability and optimize API endpoint performance.",
      "Optimized database with targeted indexes and Redis caching; cut query times by 40% and lowered DB CPU.",
      "Scaled serverless backend (AWS Lambda + SST) to 10k+ concurrent requests; implemented async job queues and hot-path caching to maintain 99.9% availability and reduce p95 latency by 10%.",
    ],
    tags: [
      "React",
      "NextJS",
      "Supabase",
      "TailwindCSS",
      "Drizzle",
      "PostgreSQL",
      "AWS",
      "Vercel",
    ],
  },
  {
    name: "Freelancing",
    start: "January 2022",
    end: "Present",
    points: [
      "Worked with various clients to create products including Minecraft plugins, discord bots, and websites.",
      "Worked with various clients to provide sysadmin, devops, and server management services.",
      "Used many technologies including Java, Typescript, NextJS, MongoDB, and Redis.",
    ],
    tags: ["Java", "Typescript", "React", "NextJS", "MongoDB", "Redis"],
  },
  {
    name: "Newlands",
    title: "Developer",
    start: "January 2022",
    end: "December 2023",
    points: [
      "Used Java, the Paper API, and MySQL to develop gameplay features for the game server.",
      "Developed a discord bot to manage player tickets and moderation using Java and JDA.",
    ],
    tags: ["Java", "MySQL"],
  },
  {
    name: "AetheriaMC / OctoMC",
    title: "Owner",
    start: "December 2019",
    end: "October 2025",
    points: [
      "Developed a Minecraft server network with over 1,500 unique players.",
      "Used many technologies including Java, MongoDB, Redis, Spring Boot to create a robust game server network.",
      "Managed and oversaw a team of 30+ staff members.",
      "Managed a network of linux servers and services, implementing DevOps practices to ensure efficient and reliable automated deployment, monitoring, and maintenance of infrastructure.",
    ],
    tags: [
      "Java",
      "Spring Boot",
      "MongoDB",
      "Redis",
      "Linux",
      "DevOps",
      "SysAdmin",
      "Docker",
    ],
  },
];