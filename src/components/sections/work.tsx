"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Work = {
  name: string;
  title?: string;
  start: string;
  end: string;
  points: string[];
  tags: string[];
};

const work: Work[] = [
  {
    name: "Connect",
    title: "Founding Software Engineer",
    start: "January 2024",
    end: "Present",
    points: [
      "Engineered an edTech platform leveraging React, NextJS, Supabase, TailwindCSS, and Drizzle, empowering students in their post-grad journey.",
      "Adopted by 4 organizations, with a growing user base of 6,000 active users."
    ],
    tags: ["React", "NextJS", "Supabase", "TailwicndCSS", "Drizzle", "PostgreSQL"],
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
    end: "Present",
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
const Work = () => { // hi ethan :]
  const [selectedCompany, setSelectedCompany] = useState(work[0].name)
  const selectedWork = useMemo(() => {
    return work.find((item) => item.name === selectedCompany)
  }, [selectedCompany])


  return (
    <section id="work" className="relative min-h-screen flex items-center justify-center px-6">
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
              My professional journey building impactful products and leading teams
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
                  selectedCompany === item.name ? "text-primary" : "text-muted-foreground hover:text-primary"
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
                    {selectedWork.title && <span className="text-primary">{selectedWork.title} @ </span>}
                    {selectedWork.name}
                  </h3>
                  <p className="text-muted-foreground font-mono">
                    {selectedWork.start} - {selectedWork.end}
                  </p>
                </div>

                <ul className="space-y-2 mb-4">
                  {selectedWork.points.map((point, pointIndex) => (
                    <motion.li
                      key={pointIndex}
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
  )
};

export default Work;