"use client";

import { TwitterTweetEmbed } from "react-twitter-embed";

export function TweetEmbed({
  tweetId,
  options,
}: {
  tweetId: string;
  options?: Record<string, unknown>;
}) {
  return <TwitterTweetEmbed tweetId={tweetId} options={options} />;
}
