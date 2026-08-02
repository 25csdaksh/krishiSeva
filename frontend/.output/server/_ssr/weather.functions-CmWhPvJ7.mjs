import { a as objectType, i as numberType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-Dtv05Lq2.mjs";
import { t as createServerRpc } from "./createServerRpc-DhxHs-Tq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weather.functions-CmWhPvJ7.js
var getWeatherByCoords_createServerFn_handler = createServerRpc({
	id: "e7113b46eeba9c39b4fc73c2fba784769d48e4a2f78effc9d72f62f31e1f5d02",
	name: "getWeatherByCoords",
	filename: "src/lib/weather.functions.ts"
}, (opts) => getWeatherByCoords.__executeServer(opts));
var getWeatherByCoords = createServerFn({ method: "GET" }).validator((input) => objectType({
	lat: numberType(),
	lon: numberType()
}).parse(input)).handler(getWeatherByCoords_createServerFn_handler, async ({ data }) => {
	const { fetchWeather } = await import("./weather.server-CFMkb-Xm.mjs");
	return fetchWeather(data.lat, data.lon);
});
var reverseGeocodeCoords_createServerFn_handler = createServerRpc({
	id: "000a2ed966cbc68c916c7d3d51be3d4fc0697713b5a4f4ec7d9791ebd86fa5d8",
	name: "reverseGeocodeCoords",
	filename: "src/lib/weather.functions.ts"
}, (opts) => reverseGeocodeCoords.__executeServer(opts));
var reverseGeocodeCoords = createServerFn({ method: "GET" }).validator((input) => objectType({
	lat: numberType(),
	lon: numberType()
}).parse(input)).handler(reverseGeocodeCoords_createServerFn_handler, async ({ data }) => {
	const { reverseGeocode } = await import("./weather.server-CFMkb-Xm.mjs");
	return reverseGeocode(data.lat, data.lon);
});
//#endregion
export { getWeatherByCoords_createServerFn_handler, reverseGeocodeCoords_createServerFn_handler };
