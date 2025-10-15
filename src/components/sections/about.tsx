"use client";

import { motion } from "motion/react";
import Image from "next/image";
import UofTLogo from "@/components/icons/utoronto";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                About Me
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Description */}
              <p className="text-muted-foreground text-lg md:text-xl">
                As a full-stack software engineer, I’m passionate about building
                impactful and meaningful projects that make a difference. I
                actively seek out new learning experiences and enjoy competing
                in hackathons—having won three out of the five I’ve participated
                in. Beyond software, I have a strong interest in designing and
                building hardware, from PCBs to robotics systems.
              </p>

              {/* Education */}
              <h3 className="text-2xl font-bold text-primary font-mono mb-4">
                Education
              </h3>
              <div className="flex flex-row items-center">
                <UofTLogo className="size-15" />
                <div>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      University of Toronto
                    </span>
                    <br />
                    Mathematics Major
                  </p>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary font-mono">
                  Interests
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span className="text-muted-foreground">
                      Building impactful software projects
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span className="text-muted-foreground">
                      Hackathons & competitive programming
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span className="text-muted-foreground">
                      Robotics & hardware design
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right: Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Image - Top Left */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-lg overflow-hidden border-2 border-border bg-muted"
              >
                <Image
                  src="/img/about/me.png"
                  alt="Evan Yu"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* UofT Image - Top Right */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-lg overflow-hidden border-2 border-border bg-muted"
              >
                <Image
                  src="/img/about/uoft.png"
                  alt="University of Toronto"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Image - Bottom Left */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-lg overflow-hidden border-2 border-border bg-muted"
              >
                <Image
                  src="/img/about/two.png"
                  alt="Photo"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Toronto Image - Bottom Right */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-lg overflow-hidden border-2 border-border bg-muted"
              >
                <Image
                  src="/img/about/toronto.png"
                  alt="Toronto"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
