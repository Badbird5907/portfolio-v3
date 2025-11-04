import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import { fileURLToPath } from "node:url";
import createJiti from "jiti";

// Import env here to validate during build. Using jiti we can import .ts files
const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./src/env");

const nextConfig: NextConfig = {
};

export default withContentCollections(nextConfig);
