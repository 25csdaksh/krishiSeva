import { a as numberType, o as objectType, s as stringType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { t as createSsrRpc } from "./createSsrRpc-86qWDgp9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ml.functions-B9WsJhI3.js
var analyzeLeafDisease = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	image_url: stringType().min(1),
	crop_name: stringType().optional()
}).parse(input)).handler(createSsrRpc("920b470ecd47f881c9cd7373edf375310bb85ac51f804b7ae5b2154e89e7de51"));
var recommendCropForProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	N: numberType().optional(),
	P: numberType().optional(),
	K: numberType().optional(),
	temperature: numberType().optional(),
	humidity: numberType().optional(),
	ph: numberType().optional(),
	rainfall: numberType().optional()
}).default({}).parse(input ?? {})).handler(createSsrRpc("5f2578acf18cc45b132429f0fe803b37c2248d4013e99746260153ce267c4533"));
var listMyLeafScans = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("df5665d6c4ef03a002522838b50e8892b627177267cd022ea02c489004475761"));
var listMyCropRecommendations = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("2eebeb51bc92223e1b6abdc9de2d7b287bbd928f2267f91782425393ab99fe7d"));
//#endregion
export { recommendCropForProfile as i, listMyCropRecommendations as n, listMyLeafScans as r, analyzeLeafDisease as t };
