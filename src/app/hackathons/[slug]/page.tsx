import { redirect, notFound } from "next/navigation";
import { hackathons } from "../page";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function HackathonRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  
  const hackathon = hackathons.find((h) => h.slug === slug);

  if (!hackathon) {
    notFound();
  }

  // Redirect to the first link if it exists, otherwise redirect to the hackathon URL
  const redirectUrl = hackathon.links?.[0]?.url || hackathon.url;
  
  redirect(redirectUrl);
}
