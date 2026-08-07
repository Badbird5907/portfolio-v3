import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const postsDirectory = join(projectRoot, "content", "posts");
const publicBlogDirectory = join(projectRoot, "public", "blog");

async function copyAssets(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const sourcePath = join(directory, entry.name);

      if (entry.isDirectory()) {
        await copyAssets(sourcePath);
        return;
      }

      if (!entry.isFile() || entry.name.endsWith(".mdx")) {
        return;
      }

      const destinationPath = join(
        publicBlogDirectory,
        relative(postsDirectory, sourcePath),
      );
      await mkdir(dirname(destinationPath), { recursive: true });
      await cp(sourcePath, destinationPath);
    }),
  );
}

await rm(publicBlogDirectory, { recursive: true, force: true });
await copyAssets(postsDirectory);
