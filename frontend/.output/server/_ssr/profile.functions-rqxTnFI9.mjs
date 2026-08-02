import { a as objectType, i as numberType, n as booleanType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-Dtv05Lq2.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CfvihdB8.mjs";
import { t as createServerRpc } from "./createServerRpc-DhxHs-Tq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.functions-rqxTnFI9.js
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "5dbf46616266e7bfe81c82694a91090a42de6200b3efc1b9d156faf41ac3a479",
	name: "getMyProfile",
	filename: "src/lib/profile.functions.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const { data, error } = await supabase.from("farmer_profiles").select("*").eq("user_id", userId).maybeSingle();
	if (error) throw new Error(error.message);
	if (data) return data;
	const { data: created, error: insertError } = await supabase.from("farmer_profiles").insert({ user_id: userId }).select("*").single();
	if (insertError) throw new Error(insertError.message);
	return created;
});
var updateMyProfile_createServerFn_handler = createServerRpc({
	id: "af00eb763dce352dc2f42ef901ef426a138feb40fdc7f79166552837a77fae5f",
	name: "updateMyProfile",
	filename: "src/lib/profile.functions.ts"
}, (opts) => updateMyProfile.__executeServer(opts));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	full_name: stringType().nullable().optional(),
	phone: stringType().nullable().optional(),
	district: stringType().nullable().optional(),
	state: stringType().nullable().optional(),
	latitude: numberType().nullable().optional(),
	longitude: numberType().nullable().optional(),
	land_size_hectares: numberType().nullable().optional(),
	current_season: enumType([
		"kharif",
		"rabi",
		"zaid",
		"summer",
		"winter"
	]).nullable().optional(),
	soil_type: enumType([
		"alluvial",
		"black",
		"red",
		"laterite",
		"desert",
		"mountain",
		"peaty",
		"saline",
		"unknown"
	]).nullable().optional(),
	primary_crops: arrayType(stringType()).nullable().optional(),
	preferred_language: stringType().nullable().optional(),
	onboarding_completed: booleanType().optional()
}).parse(input)).handler(updateMyProfile_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: updated, error } = await supabase.from("farmer_profiles").upsert({
		...data,
		user_id: userId
	}, { onConflict: "user_id" }).select("*").single();
	if (error) throw new Error(error.message);
	return updated;
});
var completeOnboarding_createServerFn_handler = createServerRpc({
	id: "a2a2645e18c997685097edf441143d2a8d4a6f3cba9cb0213a62001120b3254e",
	name: "completeOnboarding",
	filename: "src/lib/profile.functions.ts"
}, (opts) => completeOnboarding.__executeServer(opts));
var completeOnboarding = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	full_name: stringType().nullable().optional(),
	phone: stringType().nullable().optional(),
	district: stringType().nullable().optional(),
	state: stringType().nullable().optional(),
	latitude: numberType().nullable().optional(),
	longitude: numberType().nullable().optional(),
	land_size_hectares: numberType().nullable().optional(),
	current_season: enumType([
		"kharif",
		"rabi",
		"zaid",
		"summer",
		"winter"
	]).nullable().optional(),
	soil_type: enumType([
		"alluvial",
		"black",
		"red",
		"laterite",
		"desert",
		"mountain",
		"peaty",
		"saline",
		"unknown"
	]).nullable().optional(),
	primary_crops: arrayType(stringType()).nullable().optional(),
	preferred_language: stringType().nullable().optional()
}).parse(input)).handler(completeOnboarding_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: updated, error } = await supabase.from("farmer_profiles").upsert({
		...data,
		user_id: userId,
		onboarding_completed: true
	}, { onConflict: "user_id" }).select("*").single();
	if (error) throw new Error(error.message);
	return updated;
});
//#endregion
export { completeOnboarding_createServerFn_handler, getMyProfile_createServerFn_handler, updateMyProfile_createServerFn_handler };
