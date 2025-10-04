import { getVersionString } from "@/lib/utils/server/version";
import Link from "next/link";

export default async function Footer() {
  const version = await getVersionString();
  return (
    <footer className="">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
          <span className="flex items-center gap-2">Designed and built with ❤️ by Evan Yu</span>
          <span aria-hidden="true">•</span>
          <Link href="https://github.com/Badbird5907/portfolio-v3" target="_blank" rel="noopener noreferrer">GitHub</Link>
          <span aria-hidden="true">•</span>
          <Link href={version.url} target="_blank" rel="noopener noreferrer">{version.version}</Link>
        </p>
      </div>
    </footer>
  );
}