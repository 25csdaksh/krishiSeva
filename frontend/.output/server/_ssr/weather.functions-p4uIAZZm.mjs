import { a as objectType, i as numberType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-Dtv05Lq2.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CcrbWvHf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weather.functions-p4uIAZZm.js
var getWeatherByCoords = createServerFn({ method: "GET" }).validator((input) => objectType({
	lat: numberType(),
	lon: numberType()
}).parse(input)).handler(createSsrRpc("e7113b46eeba9c39b4fc73c2fba784769d48e4a2f78effc9d72f62f31e1f5d02"));
var reverseGeocodeCoords = createServerFn({ method: "GET" }).validator((input) => objectType({
	lat: numberType(),
	lon: numberType()
}).parse(input)).handler(createSsrRpc("000a2ed966cbc68c916c7d3d51be3d4fc0697713b5a4f4ec7d9791ebd86fa5d8"));
//#endregion
export { reverseGeocodeCoords as n, getWeatherByCoords as t };
