// Weather + reverse geocoding.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const coordsSchema = z.object({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
});

export const getWeatherByCoords = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => coordsSchema.parse(i))
  .handler(async ({ data }) => {
    const { fetchCurrentWeather, fetchForecast } = await import("./services/weather.server");
    const [current, forecast] = await Promise.all([
      fetchCurrentWeather(data.lat, data.lon),
      fetchForecast(data.lat, data.lon),
    ]);
    return { current, forecast };
  });

export const reverseGeocodeCoords = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => coordsSchema.parse(i))
  .handler(async ({ data }) => {
    const { reverseGeocode } = await import("./services/maps.server");
    return reverseGeocode(data.lat, data.lon);
  });