import { a as objectType, i as numberType, o as stringType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-Dtv05Lq2.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CfvihdB8.mjs";
import { t as createServerRpc } from "./createServerRpc-DhxHs-Tq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/price.functions-6cC_USiG.js
var getMandiPrices_createServerFn_handler = createServerRpc({
	id: "95c192446f33383986a9fb9c3e87aa74d7286e207dc00fe47c6957c1e3be1dbe",
	name: "getMandiPrices",
	filename: "src/lib/price.functions.ts"
}, (opts) => getMandiPrices.__executeServer(opts));
var getMandiPrices = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	commodity: stringType().optional(),
	state: stringType().optional(),
	district: stringType().optional(),
	limit: numberType().optional()
}).default({}).parse(input ?? {})).handler(getMandiPrices_createServerFn_handler, async ({ data }) => {
	const { fetchMandiPrices } = await import("./price.server-CeW2iWoB.mjs");
	return fetchMandiPrices(data);
});
//#endregion
export { getMandiPrices_createServerFn_handler };
