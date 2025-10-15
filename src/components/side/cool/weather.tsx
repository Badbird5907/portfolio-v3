"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
} from "lucide-react";
import { fetchWeatherApi } from "openmeteo";
import { useMemo } from "react";

const weatherParams = {
  // 43.642581589306644, -79.3870381843017
  latitude: [43.642581589306644],
  longitude: [-79.3870381843017],
  current: "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m",
  hourly: "temperature_2m,relative_humidity_2m",
  daily: "weather_code,temperature_2m_max,temperature_2m_min",
  timezone: "America/Toronto",
};

const url = "https://api.open-meteo.com/v1/forecast";

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

const convertToFreedomUnits = (value: number) => {
  return value * 1.8 + 32;
};

async function getWeatherData() {
  const responses = await fetchWeatherApi(url, weatherParams);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  // Fetch sunrise/sunset separately since they're ISO8601 strings, not numeric values
  const sunTimesUrl = `${url}?latitude=${weatherParams.latitude[0]}&longitude=${weatherParams.longitude[0]}&daily=sunrise,sunset&timezone=${weatherParams.timezone}`;
  const sunTimesResponse = await fetch(sunTimesUrl);
  const sunTimesData = await sunTimesResponse.json();

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature: current.variables(0)?.value(), // Current is only 1 value, therefore `.value()`
      temperatureF: convertToFreedomUnits(current.variables(0)?.value()),
      weatherCode: current.variables(1)?.value(),
      windSpeed: current.variables(2)?.value(),
      windDirection: current.variables(3)?.value(),
    },
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature: hourly.variables(0)?.valuesArray()!, // `.valuesArray()` get an array of floats
      humidity: hourly.variables(1)?.valuesArray()!,
    },
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: daily.variables(0)?.valuesArray()!,
      temperatureMax: daily.variables(1)?.valuesArray()!,
      temperatureMin: daily.variables(2)?.valuesArray()!,
      sunrise: sunTimesData.daily.sunrise as string[],
      sunset: sunTimesData.daily.sunset as string[],
    },
  };

  return weatherData;
}

export const useWeatherReady = () => {
  // Load the weather data while the other views are shown
  const { data, error } = useQuery({
    queryKey: ["weather"],
    queryFn: getWeatherData,
    refetchInterval: 5 * 60 * 1000,
  });
  return !error && !!data;
};

interface SideWeatherProps {
  isMobile?: boolean;
}

export const SideWeather = ({ isMobile = false }: SideWeatherProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["weather"],
    queryFn: getWeatherData,
    refetchInterval: 5 * 60 * 1000,
  });
  const { data: country } = useQuery({
    queryKey: ["country"],
    queryFn: () => fetch("/api/ip/country").then((res) => res.text()),
  });
  const isFreedomUnits = useMemo(() => {
    // check if the user's browser location is in the United States (literally the only fucking country that uses Fahrenheit)
    return country === "US";
  }, [country]);

  if (error) {
    return null;
  }

  const weatherIcon = useMemo(() => {
    /*
    - 0 = Clear sky
- 1–3 = Mainly clear to overcast
- 45/48 = Fog
- 51–57 = Drizzle
- 61–67 = Rain
- 71–77 = Snow
- 80–82 = Rain showers
- 85–86 = Snow showers
- 95–99 = Thunderstorms
    */
    const classes = isMobile
      ? "w-4 h-4 flex-shrink-0"
      : "rotate-90 w-4 h-4 flex-shrink-0";
    if (!data) return <CloudSun className={classes} />;

    const currentTime = data.current.time;
    const sunrise = data.daily.sunrise[0]
      ? new Date(data.daily.sunrise[0])
      : null;
    const sunset = data.daily.sunset[0] ? new Date(data.daily.sunset[0]) : null;
    const isNight =
      sunrise && sunset ? currentTime < sunrise || currentTime > sunset : false; // default to day if no sunrise/sunset data

    const code = data.current.weatherCode;
    if (code === 0)
      return isNight ? (
        <Moon className={classes} />
      ) : (
        <Sun className={classes} />
      );
    if (code <= 3)
      return isNight ? (
        <CloudMoon className={classes} />
      ) : (
        <CloudSun className={classes} />
      );
    if (code >= 45 && code <= 48) return <CloudFog className={classes} />;
    if (code >= 51 && code <= 57) return <CloudRain className={classes} />;
    if (
      (code >= 61 && code <= 67) ||
      (code >= 71 && code <= 77) ||
      (code >= 85 && code <= 86)
    )
      return <CloudSnow className={classes} />;
    if (code >= 80 && code <= 82) return <CloudRain className={classes} />;
    if (code >= 95) return <CloudLightning className={classes} />;
    return <CloudSun className={classes} />;
  }, [
    data?.current.weatherCode,
    isMobile,
    data.current.time,
    data.daily.sunrise[0],
    data,
  ]);

  if (!data) return null; // Data will load while other views are shown

  return (
    <div
      className="font-mono text-sm text-muted-foreground tracking-widest uppercase"
      style={
        isMobile
          ? {}
          : {
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }
      }
    >
      <div className="flex items-center gap-2">
        {weatherIcon}
        {`${Math.round(isFreedomUnits ? data.current.temperatureF : data.current.temperature)}°${isFreedomUnits ? "F" : "C"}`}
      </div>
    </div>
  );
};

export default SideWeather;
