import { fileURLToPath } from "node:url";
import { withContentCollections } from "@content-collections/next";
import createJiti from "jiti";
import type { NextConfig } from "next";

// Import env here to validate during build. Using jiti we can import .ts files
const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./src/env");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default withContentCollections(nextConfig);
