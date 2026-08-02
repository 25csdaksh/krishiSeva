import { a as objectType, i as numberType, o as stringType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-Dtv05Lq2.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CfvihdB8.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CcrbWvHf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/price.functions-DrT8pe6f.js
var getMandiPrices = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	commodity: stringType().optional(),
	state: stringType().optional(),
	district: stringType().optional(),
	limit: numberType().optional()
}).default({}).parse(input ?? {})).handler(createSsrRpc("95c192446f33383986a9fb9c3e87aa74d7286e207dc00fe47c6957c1e3be1dbe"));
//#endregion
export { getMandiPrices as t };
