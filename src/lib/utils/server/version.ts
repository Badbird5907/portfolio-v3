let cachedVersionString: string | null = null;
let cachedUrl: string | null = null;

export async function getVersionString(): Promise<{
  url: string;
  version: string;
}> {
  if (cachedVersionString && cachedUrl) {
    return {
      version: cachedVersionString,
      url: cachedUrl,
    };
  }
  const environment = process.env.NODE_ENV;
  const cloudflare =
    process.env.DEPLOYMENT_PLATFORM === "cloudflare" ||
    process.env.WORKERS_CI === "1";
  const {
    GIT_REPO_OWNER = "Badbird5907",
    GIT_REPO_SLUG = "portfolio-v3",
    WORKERS_CI_COMMIT_SHA,
    WORKERS_CI_BRANCH,
  } = process.env;
  let infoString = "";
  if (environment === "production") {
    infoString = "prod";
  } else if (environment === "development") {
    infoString = "dev";
  } else if (environment === "test") {
    infoString = "preview";
  } else {
    infoString = environment ?? "unknown";
  }

  if (cloudflare) {
    infoString += ":cloudflare";
  }

  let url = `https://github.com/${GIT_REPO_OWNER}/${GIT_REPO_SLUG}`;
  if (WORKERS_CI_COMMIT_SHA && WORKERS_CI_BRANCH) {
    url += `/commit/${WORKERS_CI_COMMIT_SHA}`;
    const shortCommit = WORKERS_CI_COMMIT_SHA.slice(0, 7);
    infoString += `:github:${WORKERS_CI_BRANCH}/${shortCommit}`;
  } else if (!cloudflare) {
    // run command: git rev-parse HEAD to get the short commit
    // run command: git rev-parse --abbrev-ref HEAD to get the branch name
    let shortCommit = "";
    let branchName = "";
    try {
      const execSync = await import("node:child_process").then(
        (mod) => mod.execSync,
      );
      shortCommit = execSync("git rev-parse HEAD").toString().trim();
      branchName = execSync("git rev-parse --abbrev-ref HEAD")
        .toString()
        .trim();
      const remoteUrl = execSync("git config --get remote.origin.url");
      if (remoteUrl) {
        // check if github
        const match = /github\.com\/([^/]+)\/([^/]+)(\.git)?.*/.exec(
          remoteUrl.toString().trim(),
        );
        let cleanUrl = remoteUrl.toString().trim();
        if (cleanUrl.endsWith("/")) {
          cleanUrl = cleanUrl.slice(0, -1);
        }
        if (cleanUrl.endsWith(".git")) {
          cleanUrl = cleanUrl.slice(0, -4);
        }
        if (match) {
          // make a new url but with /commit/shortCommit
          url = `${cleanUrl}/commit/${shortCommit}`;
        }
      }
      shortCommit = shortCommit.slice(0, 7);
    } catch (e) {
      console.error(e);
    }
    infoString += `:git:${branchName}/${shortCommit}:local`;
  }
  cachedVersionString = infoString;
  cachedUrl = url;
  return { version: infoString, url };
}
