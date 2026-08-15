"use client";

import { useEffect, useState } from "react";

type Day = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

const GITHUB_USER = "Badbird5907";

const LEVELS = [
  "bg-white/10",
  "bg-white/30",
  "bg-white/50",
  "bg-white/70",
  "bg-white/95",
];

const ContributionGraph = () => {
  const [days, setDays] = useState<Day[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { contributions: Day[] }) => setDays(data.contributions))
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return (
      <p className="border-t border-white/15 pt-3 font-mono text-[11px] leading-relaxed tracking-wide text-white/50">
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-[3px]"
        >
          github.com/{GITHUB_USER} ↗
        </a>
      </p>
    );
  }

  const total = days?.reduce((sum, day) => sum + day.count, 0) ?? 0;

  // Align the first week column to the weekday of the first day
  const cells: (Day | null)[] = days
    ? [...Array(new Date(days[0].date).getUTCDay()).fill(null), ...days]
    : [];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <div className="border-t border-white/15 pt-3">
      <div className="flex w-full gap-[3px]">
        {days
          ? weeks.map((week, weekIndex) => (
              <div
                key={week[0]?.date ?? `pad-${weekIndex}`}
                className="flex min-w-0 flex-1 flex-col gap-[3px]"
              >
                {week.map((day, dayIndex) =>
                  day ? (
                    <div
                      key={day.date}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} — ${day.date}`}
                      className={`aspect-square w-full rounded-[2px] ${LEVELS[day.level]}`}
                    />
                  ) : (
                    <div
                      key={`empty-${weekIndex}-${
                        // biome-ignore lint/suspicious/noArrayIndexKey: padding cells have no identity
                        dayIndex
                      }`}
                      className="aspect-square w-full"
                    />
                  ),
                )}
              </div>
            ))
          : Array.from({ length: 53 }, (_, weekIndex) => (
              <div
                key={`skeleton-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton cells have no identity
                  weekIndex
                }`}
                className="flex min-w-0 flex-1 animate-pulse flex-col gap-[3px]"
              >
                {Array.from({ length: 7 }, (_, dayIndex) => (
                  <div
                    key={`skeleton-${weekIndex}-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton cells have no identity
                      dayIndex
                    }`}
                    className="aspect-square w-full rounded-[2px] bg-white/10"
                  />
                ))}
              </div>
            ))}
      </div>
      <p className="mt-3 font-mono text-[11px] tracking-wide text-white/50">
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-[3px]"
        >
          {days
            ? `${total.toLocaleString()} contributions in the last year`
            : "github"}{" "}
          ↗
        </a>
      </p>
    </div>
  );
};

export default ContributionGraph;
