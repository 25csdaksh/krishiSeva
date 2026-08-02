import { a as numberType, c as unionType, i as literalType, n as booleanType, o as objectType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weather.functions-B88m8tBJ.js
/** Public: fetch basic weather + 7-day forecast by coordinates */
var getWeatherByCoords_createServerFn_handler = createServerRpc({
	id: "e7113b46eeba9c39b4fc73c2fba784769d48e4a2f78effc9d72f62f31e1f5d02",
	name: "getWeatherByCoords",
	filename: "src/lib/weather.functions.ts"
}, (opts) => getWeatherByCoords.__executeServer(opts));
var getWeatherByCoords = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	lat: numberType(),
	lon: numberType()
}).parse(input)).handler(getWeatherByCoords_createServerFn_handler, async ({ data }) => {
	const { fetchWeather } = await import("./weather.server-CaslpeJY.mjs");
	return fetchWeather(data.lat, data.lon);
});
var reverseGeocodeCoords_createServerFn_handler = createServerRpc({
	id: "000a2ed966cbc68c916c7d3d51be3d4fc0697713b5a4f4ec7d9791ebd86fa5d8",
	name: "reverseGeocodeCoords",
	filename: "src/lib/weather.functions.ts"
}, (opts) => reverseGeocodeCoords.__executeServer(opts));
var reverseGeocodeCoords = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	lat: numberType(),
	lon: numberType()
}).parse(input)).handler(reverseGeocodeCoords_createServerFn_handler, async ({ data }) => {
	const { reverseGeocode } = await import("./weather.server-CaslpeJY.mjs");
	return reverseGeocode(data.lat, data.lon);
});
var getFullWeather_createServerFn_handler = createServerRpc({
	id: "8d0977c48113e6f3255ca1f352b7f9249716ac9f59a875eb3384a5ce1c132ca8",
	name: "getFullWeather",
	filename: "src/lib/weather.functions.ts"
}, (opts) => getFullWeather.__executeServer(opts));
var getFullWeather = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ forecastDays: numberType().min(7).max(16).optional().default(16) }).parse(input ?? {})).handler(getFullWeather_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: profile, error: profileError } = await supabase.from("farmer_profiles").select("latitude, longitude").eq("user_id", userId).maybeSingle();
	if (profileError) throw new Error(profileError.message);
	if (!profile?.latitude || !profile?.longitude) throw new Error("LOCATION_NOT_SET");
	const lat = Number(profile.latitude);
	const lon = Number(profile.longitude);
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const fd = Math.max(7, Math.min(16, data.forecastDays));
	const cacheType = fd <= 7 ? "current" : `forecast_${fd}`;
	const ttlMs = fd <= 7 ? 18e5 : 216e5;
	const { data: cached } = await supabase.from("weather_cache").select("payload, expires_at").eq("farmer_id", userId).eq("cache_type", cacheType).eq("forecast_date", today).gt("expires_at", (/* @__PURE__ */ new Date()).toISOString()).maybeSingle();
	if (cached?.payload) return cached.payload;
	const { fetchFullWeather } = await import("./weather.server-CaslpeJY.mjs");
	const weatherData = await fetchFullWeather(lat, lon, fd);
	await supabase.from("weather_cache").upsert({
		farmer_id: userId,
		latitude: lat,
		longitude: lon,
		forecast_date: today,
		cache_type: cacheType,
		payload: weatherData,
		expires_at: new Date(Date.now() + ttlMs).toISOString()
	}, { onConflict: "farmer_id,cache_type,forecast_date" });
	return weatherData;
});
var getHistoricalWeather_createServerFn_handler = createServerRpc({
	id: "31bdfbf86eb01eec949572a7a420bafac1ac437ae8cdddd8bd6c8eba15500cb5",
	name: "getHistoricalWeather",
	filename: "src/lib/weather.functions.ts"
}, (opts) => getHistoricalWeather.__executeServer(opts));
var getHistoricalWeather = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ days: unionType([
	literalType(1),
	literalType(7),
	literalType(15),
	literalType(30)
]) }).parse(input)).handler(getHistoricalWeather_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: profile } = await supabase.from("farmer_profiles").select("latitude, longitude").eq("user_id", userId).maybeSingle();
	if (!profile?.latitude || !profile?.longitude) throw new Error("LOCATION_NOT_SET");
	const endDate = /* @__PURE__ */ new Date();
	endDate.setDate(endDate.getDate() - 1);
	const startDate = new Date(endDate);
	startDate.setDate(startDate.getDate() - (data.days - 1));
	const startDateStr = startDate.toISOString().split("T")[0];
	const endDateStr = endDate.toISOString().split("T")[0];
	const cacheType = `historical_${data.days}d`;
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const { data: cached } = await supabase.from("weather_cache").select("payload").eq("farmer_id", userId).eq("cache_type", cacheType).eq("forecast_date", today).gt("expires_at", (/* @__PURE__ */ new Date()).toISOString()).maybeSingle();
	if (cached?.payload) return cached.payload;
	const { fetchHistoricalWeather } = await import("./weather.server-CaslpeJY.mjs");
	const historical = await fetchHistoricalWeather(Number(profile.latitude), Number(profile.longitude), startDateStr, endDateStr);
	await supabase.from("weather_cache").upsert({
		farmer_id: userId,
		latitude: Number(profile.latitude),
		longitude: Number(profile.longitude),
		forecast_date: today,
		cache_type: cacheType,
		payload: historical,
		expires_at: new Date(Date.now() + 864e5).toISOString()
	}, { onConflict: "farmer_id,cache_type,forecast_date" });
	return historical;
});
var getWeatherAiAnalysis_createServerFn_handler = createServerRpc({
	id: "0a3ee4d26936db7951655d0ff7ff10594ab4b6b04d7988a83579fa8023b2da2f",
	name: "getWeatherAiAnalysis",
	filename: "src/lib/weather.functions.ts"
}, (opts) => getWeatherAiAnalysis.__executeServer(opts));
var getWeatherAiAnalysis = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ force: booleanType().optional().default(false) }).parse(input ?? {})).handler(getWeatherAiAnalysis_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	if (!data.force) {
		const { data: cached } = await supabase.from("weather_ai_analysis").select("farming_score, recommendations, risk_analysis, crop_recommendations, action_plan, summary").eq("farmer_id", userId).eq("analysis_type", "today").eq("analysis_date", today).gt("updated_at", (/* @__PURE__ */ new Date(Date.now() - 108e5)).toISOString()).maybeSingle();
		if (cached) return {
			farmingScore: cached.farming_score,
			...cached.recommendations,
			risks: cached.risk_analysis,
			cropRecommendations: cached.crop_recommendations,
			actionPlan: cached.action_plan
		};
	}
	const { data: profile } = await supabase.from("farmer_profiles").select("*").eq("user_id", userId).maybeSingle();
	if (!profile?.latitude || !profile?.longitude) throw new Error("LOCATION_NOT_SET");
	const { fetchFullWeather } = await import("./weather.server-CaslpeJY.mjs");
	const weatherData = await fetchFullWeather(Number(profile.latitude), Number(profile.longitude), 7);
	const { analyzeWeatherForFarming } = await import("./weather.ai.server-CwDWl6XE.mjs");
	const analysis = await analyzeWeatherForFarming(weatherData, profile);
	await supabase.from("weather_ai_analysis").upsert({
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
			harvestRecommendation: analysis.harvestRecommendation
		},
		risk_analysis: analysis.risks,
		crop_recommendations: analysis.cropRecommendations,
		action_plan: analysis.actionPlan,
		weather_snapshot: weatherData.current
	}, { onConflict: "farmer_id,analysis_type,analysis_date" });
	return analysis;
});
var getHistoricalAiSummary_createServerFn_handler = createServerRpc({
	id: "4d3025c0a14ec6e14465b6fa54693fd71e5680d62dbfdeed29f8b18e08339160",
	name: "getHistoricalAiSummary",
	filename: "src/lib/weather.functions.ts"
}, (opts) => getHistoricalAiSummary.__executeServer(opts));
var getHistoricalAiSummary = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ days: unionType([
	literalType(1),
	literalType(7),
	literalType(15),
	literalType(30)
]) }).parse(input)).handler(getHistoricalAiSummary_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: profile } = await supabase.from("farmer_profiles").select("latitude, longitude, primary_crops").eq("user_id", userId).maybeSingle();
	if (!profile?.latitude) throw new Error("LOCATION_NOT_SET");
	const endDate = /* @__PURE__ */ new Date();
	endDate.setDate(endDate.getDate() - 1);
	const startDate = new Date(endDate);
	startDate.setDate(startDate.getDate() - (data.days - 1));
	const { fetchHistoricalWeather } = await import("./weather.server-CaslpeJY.mjs");
	const historical = await fetchHistoricalWeather(Number(profile.latitude), Number(profile.longitude), startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0]);
	const { generateHistoricalSummary } = await import("./weather.ai.server-CwDWl6XE.mjs");
	return generateHistoricalSummary(historical, data.days === 1 ? "yesterday" : `last ${data.days} days`, profile.primary_crops?.join(", ") ?? "");
});
var getMonthlyOutlook_createServerFn_handler = createServerRpc({
	id: "937bbaaf8f717ece028e53cbe17f4ba1d945418c05447a9b6191af4664f7423b",
	name: "getMonthlyOutlook",
	filename: "src/lib/weather.functions.ts"
}, (opts) => getMonthlyOutlook.__executeServer(opts));
var getMonthlyOutlook = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMonthlyOutlook_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const { data: cached } = await supabase.from("weather_ai_analysis").select("recommendations").eq("farmer_id", userId).eq("analysis_type", "monthly").eq("analysis_date", today).maybeSingle();
	if (cached?.recommendations) return cached.recommendations;
	const { data: profile } = await supabase.from("farmer_profiles").select("latitude, longitude, primary_crops, current_season, district, state").eq("user_id", userId).maybeSingle();
	if (!profile?.latitude) throw new Error("LOCATION_NOT_SET");
	const { fetchFullWeather } = await import("./weather.server-CaslpeJY.mjs");
	const wd = await fetchFullWeather(Number(profile.latitude), Number(profile.longitude), 16);
	const { generateMonthlyOutlook } = await import("./weather.ai.server-CwDWl6XE.mjs");
	const outlook = await generateMonthlyOutlook(wd.forecast, profile);
	await supabase.from("weather_ai_analysis").upsert({
		farmer_id: userId,
		analysis_date: today,
		analysis_type: "monthly",
		farming_score: null,
		recommendations: outlook
	}, { onConflict: "farmer_id,analysis_type,analysis_date" });
	return outlook;
});
//#endregion
export { getFullWeather_createServerFn_handler, getHistoricalAiSummary_createServerFn_handler, getHistoricalWeather_createServerFn_handler, getMonthlyOutlook_createServerFn_handler, getWeatherAiAnalysis_createServerFn_handler, getWeatherByCoords_createServerFn_handler, reverseGeocodeCoords_createServerFn_handler };
