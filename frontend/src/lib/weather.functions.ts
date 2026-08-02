import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// ---------------------------------------------------------------------------
// EXISTING — kept exactly as-is for backward compatibility
// ---------------------------------------------------------------------------

/** Public: fetch basic weather + 7-day forecast by coordinates */
export const getWeatherByCoords = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z.object({ lat: z.number(), lon: z.number() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { fetchWeather } = await import("./weather.server");
    return fetchWeather(data.lat, data.lon);
  });

/** Public: reverse-geocode a lat/lon to district + state */
export const reverseGeocodeCoords = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z.object({ lat: z.number(), lon: z.number() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { reverseGeocode } = await import("./weather.server");
    return reverseGeocode(data.lat, data.lon);
  });

// ---------------------------------------------------------------------------
// NEW: Full weather intelligence (all require authentication)
// ---------------------------------------------------------------------------

/** Auth: fetch full expanded weather data for farmer's saved location */
export const getFullWeather = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({ forecastDays: z.number().min(7).max(16).optional().default(16) })
      .parse(input ?? {}),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: profile, error: profileError } = await supabase
      .from("farmer_profiles")
      .select("latitude, longitude")
      .eq("user_id", userId)
      .maybeSingle();

    if (profileError) throw new Error(profileError.message);
    if (!profile?.latitude || !profile?.longitude) {
      throw new Error("LOCATION_NOT_SET");
    }

    const lat = Number(profile.latitude);
    const lon = Number(profile.longitude);
    const today = new Date().toISOString().split("T")[0];
    const fd = Math.max(7, Math.min(16, data.forecastDays));
    const cacheType = fd <= 7 ? "current" : `forecast_${fd}`;
    // TTL: 30 min for current conditions, 6 h for extended forecast
    const ttlMs = fd <= 7 ? 30 * 60_000 : 6 * 3_600_000;

    // Cache lookup
    const { data: cached } = await supabase
      .from("weather_cache")
      .select("payload, expires_at")
      .eq("farmer_id", userId)
      .eq("cache_type", cacheType)
      .eq("forecast_date", today)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (cached?.payload) return cached.payload;

    // Fresh fetch
    const { fetchFullWeather } = await import("./weather.server");
    const weatherData = await fetchFullWeather(lat, lon, fd);

    // Write cache (best-effort — don't fail on cache write error)
    await supabase.from("weather_cache").upsert(
      {
        farmer_id: userId,
        latitude: lat,
        longitude: lon,
        forecast_date: today,
        cache_type: cacheType,
        payload: weatherData,
        expires_at: new Date(Date.now() + ttlMs).toISOString(),
      },
      { onConflict: "farmer_id,cache_type,forecast_date" },
    );

    return weatherData;
  });

/** Auth: fetch historical weather (yesterday / last 7 / 15 / 30 days) */
export const getHistoricalWeather = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({ days: z.union([z.literal(1), z.literal(7), z.literal(15), z.literal(30)]) })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: profile } = await supabase
      .from("farmer_profiles")
      .select("latitude, longitude")
      .eq("user_id", userId)
      .maybeSingle();

    if (!profile?.latitude || !profile?.longitude) throw new Error("LOCATION_NOT_SET");

    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1); // yesterday
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (data.days - 1));

    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];
    const cacheType = `historical_${data.days}d`;
    const today = new Date().toISOString().split("T")[0];

    // Cache lookup (24 h TTL for historical — data doesn't change)
    const { data: cached } = await supabase
      .from("weather_cache")
      .select("payload")
      .eq("farmer_id", userId)
      .eq("cache_type", cacheType)
      .eq("forecast_date", today)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (cached?.payload) return cached.payload;

    const { fetchHistoricalWeather } = await import("./weather.server");
    const historical = await fetchHistoricalWeather(
      Number(profile.latitude),
      Number(profile.longitude),
      startDateStr,
      endDateStr,
    );

    await supabase.from("weather_cache").upsert(
      {
        farmer_id: userId,
        latitude: Number(profile.latitude),
        longitude: Number(profile.longitude),
        forecast_date: today,
        cache_type: cacheType,
        payload: historical,
        expires_at: new Date(Date.now() + 24 * 3_600_000).toISOString(),
      },
      { onConflict: "farmer_id,cache_type,forecast_date" },
    );

    return historical;
  });

/** Auth: get (or generate) AI farming analysis for today */
export const getWeatherAiAnalysis = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({ force: z.boolean().optional().default(false) })
      .parse(input ?? {}),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const today = new Date().toISOString().split("T")[0];

    // Cache lookup (3 h TTL — AI analysis for today)
    if (!data.force) {
      const { data: cached } = await supabase
        .from("weather_ai_analysis")
        .select("farming_score, recommendations, risk_analysis, crop_recommendations, action_plan, summary")
        .eq("farmer_id", userId)
        .eq("analysis_type", "today")
        .eq("analysis_date", today)
        .gt("updated_at", new Date(Date.now() - 3 * 3_600_000).toISOString())
        .maybeSingle();

      if (cached) {
        return {
          farmingScore: cached.farming_score,
          ...(cached.recommendations as object),
          risks: cached.risk_analysis,
          cropRecommendations: cached.crop_recommendations,
          actionPlan: cached.action_plan,
        };
      }
    }

    const { data: profile } = await supabase
      .from("farmer_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (!profile?.latitude || !profile?.longitude) throw new Error("LOCATION_NOT_SET");

    const { fetchFullWeather } = await import("./weather.server");
    const weatherData = await fetchFullWeather(
      Number(profile.latitude),
      Number(profile.longitude),
      7,
    );

    const { analyzeWeatherForFarming } = await import("./weather.ai.server");
    const analysis = await analyzeWeatherForFarming(weatherData, profile);

    // Persist to Supabase
    await supabase.from("weather_ai_analysis").upsert(
      {
        farmer_id: userId,
        analysis_date: today,
        analysis_type: "today",
        farming_score: analysis.farmingScore,
        summary: analysis.summary,
        recommendations: {
          scoreLabel: analysis.scoreLabel,
          summary: analysis.summary,
          todayRecommendations: analysis.todayRecommendations,
          suitableActivities: analysis.suitableActivities,
          activitiesToAvoid: analysis.activitiesToAvoid,
          waterRequirement: analysis.waterRequirement,
          irrigationAdvice: analysis.irrigationAdvice,
          fertilizerAdvice: analysis.fertilizerAdvice,
          pesticideAdvice: analysis.pesticideAdvice,
          harvestRecommendation: analysis.harvestRecommendation,
        },
        risk_analysis: analysis.risks,
        crop_recommendations: analysis.cropRecommendations,
        action_plan: analysis.actionPlan,
        weather_snapshot: weatherData.current,
      },
      { onConflict: "farmer_id,analysis_type,analysis_date" },
    );

    return analysis;
  });

/** Auth: AI summary for a historical period */
export const getHistoricalAiSummary = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({ days: z.union([z.literal(1), z.literal(7), z.literal(15), z.literal(30)]) })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: profile } = await supabase
      .from("farmer_profiles")
      .select("latitude, longitude, primary_crops")
      .eq("user_id", userId)
      .maybeSingle();

    if (!profile?.latitude) throw new Error("LOCATION_NOT_SET");

    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (data.days - 1));

    const { fetchHistoricalWeather } = await import("./weather.server");
    const historical = await fetchHistoricalWeather(
      Number(profile.latitude),
      Number(profile.longitude),
      startDate.toISOString().split("T")[0],
      endDate.toISOString().split("T")[0],
    );

    const { generateHistoricalSummary } = await import("./weather.ai.server");
    const period = data.days === 1 ? "yesterday" : `last ${data.days} days`;
    return generateHistoricalSummary(
      historical,
      period,
      (profile.primary_crops as string[] | null)?.join(", ") ?? "",
    );
  });

/** Auth: AI monthly outlook based on 16-day forecast (cached 24 h) */
export const getMonthlyOutlook = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const today = new Date().toISOString().split("T")[0];

    // Cache lookup (24 h)
    const { data: cached } = await supabase
      .from("weather_ai_analysis")
      .select("recommendations")
      .eq("farmer_id", userId)
      .eq("analysis_type", "monthly")
      .eq("analysis_date", today)
      .maybeSingle();

    if (cached?.recommendations) return cached.recommendations;

    const { data: profile } = await supabase
      .from("farmer_profiles")
      .select("latitude, longitude, primary_crops, current_season, district, state")
      .eq("user_id", userId)
      .maybeSingle();

    if (!profile?.latitude) throw new Error("LOCATION_NOT_SET");

    const { fetchFullWeather } = await import("./weather.server");
    const wd = await fetchFullWeather(Number(profile.latitude), Number(profile.longitude), 16);

    const { generateMonthlyOutlook } = await import("./weather.ai.server");
    const outlook = await generateMonthlyOutlook(wd.forecast, profile);

    await supabase.from("weather_ai_analysis").upsert(
      {
        farmer_id: userId,
        analysis_date: today,
        analysis_type: "monthly",
        farming_score: null,
        recommendations: outlook,
      },
      { onConflict: "farmer_id,analysis_type,analysis_date" },
    );

    return outlook;
  });
