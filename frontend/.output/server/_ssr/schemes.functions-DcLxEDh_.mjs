import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-86qWDgp9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schemes.functions-DcLxEDh_.js
var listSchemes = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	state: stringType().optional(),
	category: stringType().optional()
}).default({}).parse(input ?? {})).handler(createSsrRpc("e29ae6ebd414ee72b6f8c176c694d36d885f73af9a8c58137c5771e2e2021540"));
var getSchemeBySlug = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ slug: stringType() }).parse(input)).handler(createSsrRpc("be03a7a132db23b9e4b100ef212dac3539b0398bdb0c2119e65221371fad0854"));
//#endregion
export { listSchemes as n, getSchemeBySlug as t };
