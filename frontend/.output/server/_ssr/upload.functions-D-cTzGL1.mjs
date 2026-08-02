import { a as numberType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { t as createSsrRpc } from "./createSsrRpc-86qWDgp9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload.functions-D-cTzGL1.js
var createUploadUrl = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	kind: enumType([
		"leaf",
		"product",
		"profile"
	]),
	filename: stringType().min(1)
}).parse(input)).handler(createSsrRpc("d5ebf9288da2928e756c5304fbbf0160c275e3f4622a068a1ff8e9613e707e3e"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	path: stringType(),
	expiresIn: numberType().optional()
}).parse(input)).handler(createSsrRpc("bab43f377381f85bc380afe3f5d609a7316608f1db4e6bfd44d256b0761db7fd"));
//#endregion
export { createUploadUrl as t };
