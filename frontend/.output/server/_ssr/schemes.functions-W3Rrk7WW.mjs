import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/schemes.functions-W3Rrk7WW.js
var listSchemes_createServerFn_handler = createServerRpc({
	id: "e29ae6ebd414ee72b6f8c176c694d36d885f73af9a8c58137c5771e2e2021540",
	name: "listSchemes",
	filename: "src/lib/schemes.functions.ts"
}, (opts) => listSchemes.__executeServer(opts));
var listSchemes = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	state: stringType().optional(),
	category: stringType().optional()
}).default({}).parse(input ?? {})).handler(listSchemes_createServerFn_handler, async ({ data }) => {
	let query = createClient(processModule.env.SUPABASE_URL, processModule.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} }).from("schemes").select("id, slug, title, description, category, state, ministry").eq("is_active", true).order("title");
	if (data.state) query = query.or(`state.is.null,state.eq.${data.state}`);
	if (data.category) query = query.eq("category", data.category);
	const { data: rows, error } = await query;
	if (error) throw new Error(error.message);
	return rows ?? [];
});
var getSchemeBySlug_createServerFn_handler = createServerRpc({
	id: "be03a7a132db23b9e4b100ef212dac3539b0398bdb0c2119e65221371fad0854",
	name: "getSchemeBySlug",
	filename: "src/lib/schemes.functions.ts"
}, (opts) => getSchemeBySlug.__executeServer(opts));
var getSchemeBySlug = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ slug: stringType() }).parse(input)).handler(getSchemeBySlug_createServerFn_handler, async ({ data }) => {
	const { data: row, error } = await createClient(processModule.env.SUPABASE_URL, processModule.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} }).from("schemes").select("*").eq("slug", data.slug).eq("is_active", true).maybeSingle();
	if (error) throw new Error(error.message);
	return row;
});
//#endregion
export { getSchemeBySlug_createServerFn_handler, listSchemes_createServerFn_handler };
