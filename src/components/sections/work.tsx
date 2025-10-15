"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Work = {
  name: string;
  title?: string;
  url?: string;
  start: string;
  end: string;
  points: string[];
  tags: string[];
};

const work: Work[] = [
  {
    name: "Connect",
    title: "Founding Software Engineer",
    url: "https://connectalum.com/",
    start: "January 2024",
    end: "Present",
    points: [
      "Led development of a multi-tenant platform, serving 9,000+ monthly active users, using React, NextJS, PostgreSQL, and Drizzle ORM, ensuring seamless scalability and UX",
      "Developed and launched a LinkedIn-like social platform with features such as real-time chat, connection-building, and posts with recommendations based on the user’s preferences",
      "Applied knowledge of algorithms (e.g. BFS/DFS) and data structures (e.g., graphs) to enhance the scalability and optimize API endpoint performance.",
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
const Work = () => {
  // hi ethan :]
  const [selectedCompany, setSelectedCompany] = useState(work[0].name);
  const selectedWork = useMemo(() => {
    return work.find((item) => item.name === selectedCompany);
  }, [selectedCompany]);

  return (
    <section
      id="work"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-6xl w-full">
        <div className="space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Work Experience
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              My professional journey building impactful products and leading
              teams
            </p>
          </motion.div>

          <div className="grid md:grid-cols-[200px_1fr] gap-8">
            <div className="space-y-4">
              {work.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedCompany(item.name)}
                  className={`text-lg font-mono transition-colors cursor-pointer relative pl-4 ${
                    selectedCompany === item.name
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {selectedCompany === item.name && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 w-1 h-full bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {item.name}
                </motion.div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedWork && (
                <motion.div
                  key={selectedWork.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-2xl min-h-[400px]"
                >
                  <div className="mb-2">
                    <h3 className="text-xl font-mono font-bold">
                      {selectedWork.title && (
                        <span className="text-primary">
                          {selectedWork.title} @{" "}
                        </span>
                      )}
                      {selectedWork.url ? (
                        <Link
                          href={selectedWork.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedWork.name}
                        </Link>
                      ) : (
                        selectedWork.name
                      )}
                    </h3>
                    <p className="text-muted-foreground font-mono">
                      {selectedWork.start} - {selectedWork.end}
                    </p>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {selectedWork.points.map((point, pointIndex) => (
                      <motion.li
                        key={`${selectedWork.name}-point-${pointIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: pointIndex * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="text-primary mr-2">▸</span>
                        <span className="text-muted-foreground">{point}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {selectedWork.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: tagIndex * 0.05 }}
                        className="px-3 py-1 border-2 hover:border-primary transition-all text-muted-foreground rounded-full text-sm font-mono"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
