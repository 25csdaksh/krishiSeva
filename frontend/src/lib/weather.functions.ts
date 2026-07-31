import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getWeatherByCoords = createServerFn({ method: "GET" })
  .validator((input: unknown) =>
    z.object({ lat: z.number(), lon: z.number() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { fetchWeather } = await import("./weather.server");
    return fetchWeather(data.lat, data.lon);
  });

export const reverseGeocodeCoords = createServerFn({ method: "GET" })
  .validator((input: unknown) =>
    z.object({ lat: z.number(), lon: z.number() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { reverseGeocode } = await import("./weather.server");
    return reverseGeocode(data.lat, data.lon);
  });
