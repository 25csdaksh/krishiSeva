import { a as objectType, i as numberType, o as stringType, r as enumType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-Dtv05Lq2.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CfvihdB8.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CcrbWvHf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload.functions-DeFvyzbJ.js
var createUploadUrl = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	kind: enumType([
		"leaf",
		"product",
		"profile"
	]),
	filename: stringType().min(1)
}).parse(input)).handler(createSsrRpc("d5ebf9288da2928e756c5304fbbf0160c275e3f4622a068a1ff8e9613e707e3e"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	path: stringType(),
	expiresIn: numberType().optional()
}).parse(input)).handler(createSsrRpc("bab43f377381f85bc380afe3f5d609a7316608f1db4e6bfd44d256b0761db7fd"));
//#endregion
export { createUploadUrl as t };
