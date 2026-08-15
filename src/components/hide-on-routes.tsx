"use client";

import { usePathname } from "next/navigation";

export default function HideOnRoutes({
  prefix,
  children,
}: {
  prefix: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith(prefix)) return null;
  return <>{children}</>;
}
