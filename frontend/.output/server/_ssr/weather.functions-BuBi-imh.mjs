import { a as numberType, c as unionType, i as literalType, n as booleanType, o as objectType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { t as createSsrRpc } from "./createSsrRpc-86qWDgp9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weather.functions-BuBi-imh.js
/** Public: fetch basic weather + 7-day forecast by coordinates */
var getWeatherByCoords = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	lat: numberType(),
	lon: numberType()
}).parse(input)).handler(createSsrRpc("e7113b46eeba9c39b4fc73c2fba784769d48e4a2f78effc9d72f62f31e1f5d02"));
/** Public: reverse-geocode a lat/lon to district + state */
var reverseGeocodeCoords = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	lat: numberType(),
	lon: numberType()
}).parse(input)).handler(createSsrRpc("000a2ed966cbc68c916c7d3d51be3d4fc0697713b5a4f4ec7d9791ebd86fa5d8"));
/** Auth: fetch full expanded weather data for farmer's saved location */
var getFullWeather = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ forecastDays: numberType().min(7).max(16).optional().default(16) }).parse(input ?? {})).handler(createSsrRpc("8d0977c48113e6f3255ca1f352b7f9249716ac9f59a875eb3384a5ce1c132ca8"));
/** Auth: fetch historical weather (yesterday / last 7 / 15 / 30 days) */
var getHistoricalWeather = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ days: unionType([
	literalType(1),
	literalType(7),
	literalType(15),
	literalType(30)
]) }).parse(input)).handler(createSsrRpc("31bdfbf86eb01eec949572a7a420bafac1ac437ae8cdddd8bd6c8eba15500cb5"));
/** Auth: get (or generate) AI farming analysis for today */
var getWeatherAiAnalysis = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ force: booleanType().optional().default(false) }).parse(input ?? {})).handler(createSsrRpc("0a3ee4d26936db7951655d0ff7ff10594ab4b6b04d7988a83579fa8023b2da2f"));
/** Auth: AI summary for a historical period */
var getHistoricalAiSummary = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ days: unionType([
	literalType(1),
	literalType(7),
	literalType(15),
	literalType(30)
]) }).parse(input)).handler(createSsrRpc("4d3025c0a14ec6e14465b6fa54693fd71e5680d62dbfdeed29f8b18e08339160"));
/** Auth: AI monthly outlook based on 16-day forecast (cached 24 h) */
var getMonthlyOutlook = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("937bbaaf8f717ece028e53cbe17f4ba1d945418c05447a9b6191af4664f7423b"));
//#endregion
export { getWeatherAiAnalysis as a, getMonthlyOutlook as i, getHistoricalAiSummary as n, getWeatherByCoords as o, getHistoricalWeather as r, reverseGeocodeCoords as s, getFullWeather as t };
