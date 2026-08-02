import { a as objectType, i as numberType, n as booleanType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-Dtv05Lq2.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CfvihdB8.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CcrbWvHf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.functions-B-mYm4Wt.js
var getMyProfile = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("5dbf46616266e7bfe81c82694a91090a42de6200b3efc1b9d156faf41ac3a479"));
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
}).parse(input)).handler(createSsrRpc("af00eb763dce352dc2f42ef901ef426a138feb40fdc7f79166552837a77fae5f"));
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
}).parse(input)).handler(createSsrRpc("a2a2645e18c997685097edf441143d2a8d4a6f3cba9cb0213a62001120b3254e"));
//#endregion
export { getMyProfile as n, updateMyProfile as r, completeOnboarding as t };
