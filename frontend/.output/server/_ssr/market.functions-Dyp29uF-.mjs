import { a as numberType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market.functions-Dyp29uF-.js
var listActiveMarketListings_createServerFn_handler = createServerRpc({
	id: "ede4388f198aa3e0accfe4d1925c295e64822dadfc805bd5305ccbe02aace611",
	name: "listActiveMarketListings",
	filename: "src/lib/market.functions.ts"
}, (opts) => listActiveMarketListings.__executeServer(opts));
var listActiveMarketListings = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	crop: stringType().optional(),
	state: stringType().optional(),
	limit: numberType().optional()
}).default({}).parse(input ?? {})).handler(listActiveMarketListings_createServerFn_handler, async ({ data, context }) => {
	let query = context.supabase.from("market_listings").select("*").eq("status", "active").order("created_at", { ascending: false }).limit(data.limit ?? 50);
	if (data.crop) query = query.ilike("crop_name", `%${data.crop}%`);
	if (data.state) query = query.eq("state", data.state);
	const { data: rows, error } = await query;
	if (error) throw new Error(error.message);
	return rows;
});
var listMyMarketListings_createServerFn_handler = createServerRpc({
	id: "c7f62d6b3e92a1e151c3df5612fbfd92abf583ff3af3cd24dd367f3ceb09bb85",
	name: "listMyMarketListings",
	filename: "src/lib/market.functions.ts"
}, (opts) => listMyMarketListings.__executeServer(opts));
var listMyMarketListings = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyMarketListings_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("market_listings").select("*").eq("user_id", context.userId).order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data;
});
var createMarketListing_createServerFn_handler = createServerRpc({
	id: "b269f6c197a7ed5c607eb298e816906c37dcf5f84c1e2880ce85664308d3b662",
	name: "createMarketListing",
	filename: "src/lib/market.functions.ts"
}, (opts) => createMarketListing.__executeServer(opts));
var createMarketListing = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	crop_name: stringType().min(1),
	variety: stringType().optional(),
	quantity: numberType().positive(),
	unit: stringType().min(1),
	price_per_unit: numberType().nonnegative(),
	description: stringType().optional(),
	image_url: stringType().optional(),
	district: stringType().optional(),
	state: stringType().optional()
}).parse(input)).handler(createMarketListing_createServerFn_handler, async ({ data, context }) => {
	const { data: row, error } = await context.supabase.from("market_listings").insert({
		...data,
		user_id: context.userId
	}).select("*").single();
	if (error) throw new Error(error.message);
	return row;
});
var updateMarketListing_createServerFn_handler = createServerRpc({
	id: "0124ccd92828d61935c10446ae1b39f499a65361be0e187f476008b4ca24586b",
	name: "updateMarketListing",
	filename: "src/lib/market.functions.ts"
}, (opts) => updateMarketListing.__executeServer(opts));
var updateMarketListing = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType(),
	crop_name: stringType().optional(),
	variety: stringType().nullable().optional(),
	quantity: numberType().optional(),
	unit: stringType().optional(),
	price_per_unit: numberType().optional(),
	description: stringType().nullable().optional(),
	image_url: stringType().nullable().optional(),
	district: stringType().nullable().optional(),
	state: stringType().nullable().optional(),
	status: enumType([
		"active",
		"sold",
		"expired"
	]).optional()
}).parse(input)).handler(updateMarketListing_createServerFn_handler, async ({ data, context }) => {
	const { id, ...changes } = data;
	const { data: row, error } = await context.supabase.from("market_listings").update(changes).eq("id", id).eq("user_id", context.userId).select("*").single();
	if (error) throw new Error(error.message);
	return row;
});
var deleteMarketListing_createServerFn_handler = createServerRpc({
	id: "777e28c58b5dfe8929ff33023f08a7c10f0b9d15dce9c419e50ab673316071de",
	name: "deleteMarketListing",
	filename: "src/lib/market.functions.ts"
}, (opts) => deleteMarketListing.__executeServer(opts));
var deleteMarketListing = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteMarketListing_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("market_listings").delete().eq("id", data.id).eq("user_id", context.userId);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { createMarketListing_createServerFn_handler, deleteMarketListing_createServerFn_handler, listActiveMarketListings_createServerFn_handler, listMyMarketListings_createServerFn_handler, updateMarketListing_createServerFn_handler };
