import { a as objectType, i as numberType, o as stringType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-Dtv05Lq2.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CfvihdB8.mjs";
import { t as createServerRpc } from "./createServerRpc-DhxHs-Tq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ml.functions-B6any2qj.js
var analyzeLeafDisease_createServerFn_handler = createServerRpc({
	id: "920b470ecd47f881c9cd7373edf375310bb85ac51f804b7ae5b2154e89e7de51",
	name: "analyzeLeafDisease",
	filename: "src/lib/ml.functions.ts"
}, (opts) => analyzeLeafDisease.__executeServer(opts));
var analyzeLeafDisease = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	image_url: stringType().min(1),
	crop_name: stringType().optional()
}).parse(input)).handler(analyzeLeafDisease_createServerFn_handler, async ({ data, context }) => {
	const { analyzeLeaf } = await import("./ml.server-B7N2_2Sr.mjs");
	let viewUrl = data.image_url;
	if (!/^https?:\/\//.test(data.image_url)) {
		const { data: signed, error } = await context.supabase.storage.from("krishi-uploads").createSignedUrl(data.image_url, 600);
		if (error) throw new Error(error.message);
		viewUrl = signed.signedUrl;
	}
	const result = await analyzeLeaf(viewUrl, data.crop_name);
	const { data: row, error } = await context.supabase.from("leaf_disease_scans").insert({
		user_id: context.userId,
		image_url: data.image_url,
		crop_name: result.crop ?? data.crop_name ?? null,
		detected_disease: result.disease,
		confidence: result.confidence,
		remedy: result.remedy,
		raw_response: JSON.parse(JSON.stringify(result))
	}).select("*").single();
	if (error) throw new Error(error.message);
	return row;
});
var recommendCropForProfile_createServerFn_handler = createServerRpc({
	id: "5f2578acf18cc45b132429f0fe803b37c2248d4013e99746260153ce267c4533",
	name: "recommendCropForProfile",
	filename: "src/lib/ml.functions.ts"
}, (opts) => recommendCropForProfile.__executeServer(opts));
var recommendCropForProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	N: numberType().optional(),
	P: numberType().optional(),
	K: numberType().optional(),
	temperature: numberType().optional(),
	humidity: numberType().optional(),
	ph: numberType().optional(),
	rainfall: numberType().optional()
}).default({}).parse(input ?? {})).handler(recommendCropForProfile_createServerFn_handler, async ({ data, context }) => {
	const { recommendCrops } = await import("./ml.server-B7N2_2Sr.mjs");
	const { data: profile } = await context.supabase.from("farmer_profiles").select("*").eq("user_id", context.userId).maybeSingle();
	const snapshot = {
		...data,
		soil_type: profile?.soil_type ?? "unknown",
		season: profile?.current_season ?? null,
		district: profile?.district ?? null,
		state: profile?.state ?? null,
		land_size_hectares: profile?.land_size_hectares ?? null
	};
	const result = await recommendCrops(snapshot);
	const { data: row, error } = await context.supabase.from("crop_recommendations").insert({
		user_id: context.userId,
		input_snapshot: JSON.parse(JSON.stringify(snapshot)),
		recommended_crops: JSON.parse(JSON.stringify(result.crops)),
		raw_response: { text: result.raw }
	}).select("*").single();
	if (error) throw new Error(error.message);
	return row;
});
var listMyLeafScans_createServerFn_handler = createServerRpc({
	id: "df5665d6c4ef03a002522838b50e8892b627177267cd022ea02c489004475761",
	name: "listMyLeafScans",
	filename: "src/lib/ml.functions.ts"
}, (opts) => listMyLeafScans.__executeServer(opts));
var listMyLeafScans = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyLeafScans_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("leaf_disease_scans").select("*").eq("user_id", context.userId).order("created_at", { ascending: false }).limit(20);
	if (error) throw new Error(error.message);
	return data;
});
var listMyCropRecommendations_createServerFn_handler = createServerRpc({
	id: "2eebeb51bc92223e1b6abdc9de2d7b287bbd928f2267f91782425393ab99fe7d",
	name: "listMyCropRecommendations",
	filename: "src/lib/ml.functions.ts"
}, (opts) => listMyCropRecommendations.__executeServer(opts));
var listMyCropRecommendations = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyCropRecommendations_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("crop_recommendations").select("*").eq("user_id", context.userId).order("created_at", { ascending: false }).limit(20);
	if (error) throw new Error(error.message);
	return data;
});
//#endregion
export { analyzeLeafDisease_createServerFn_handler, listMyCropRecommendations_createServerFn_handler, listMyLeafScans_createServerFn_handler, recommendCropForProfile_createServerFn_handler };
