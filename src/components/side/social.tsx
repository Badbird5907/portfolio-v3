import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

interface SideSocialProps {
  isMobile?: boolean;
}

export default function SideSocial({ isMobile = false }: SideSocialProps) {
  const socials = [
    { icon: Github, href: "https://github.com/Badbird5907", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/ev-yu",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/Badbird_5907",
      label: "Twitter",
    },
    { icon: Mail, href: "mailto:contact@evanyu.dev", label: "Email" },
  ];

  return (
    <div
      className={
        isMobile
          ? "flex flex-col items-center gap-6"
          : "fixed left-6 bottom-0 hidden lg:flex flex-col items-center gap-6 z-10"
      }
    >
      <ul
        className={
          isMobile
            ? "flex flex-row items-center gap-6"
            : "flex flex-col items-center gap-5"
        }
      >
        {socials.map((social) => (
          <li key={social.label}>
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </Link>
          </li>
        ))}
      </ul>
      {!isMobile && <div className="w-[1px] h-24 bg-muted-foreground/30" />}
    </div>
  );
}
