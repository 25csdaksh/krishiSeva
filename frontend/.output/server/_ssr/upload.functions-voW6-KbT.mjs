import { a as objectType, i as numberType, o as stringType, r as enumType } from "../_libs/zod.mjs";
import { c as createServerFn } from "./createServerFn-Dtv05Lq2.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CfvihdB8.mjs";
import { t as createServerRpc } from "./createServerRpc-DhxHs-Tq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload.functions-voW6-KbT.js
var createUploadUrl_createServerFn_handler = createServerRpc({
	id: "d5ebf9288da2928e756c5304fbbf0160c275e3f4622a068a1ff8e9613e707e3e",
	name: "createUploadUrl",
	filename: "src/lib/upload.functions.ts"
}, (opts) => createUploadUrl.__executeServer(opts));
var createUploadUrl = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	kind: enumType([
		"leaf",
		"product",
		"profile"
	]),
	filename: stringType().min(1)
}).parse(input)).handler(createUploadUrl_createServerFn_handler, async ({ data, context }) => {
	const safeName = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
	const path = `${context.userId}/${data.kind}/${Date.now()}-${safeName}`;
	const { data: signed, error } = await context.supabase.storage.from("krishi-uploads").createSignedUploadUrl(path);
	if (error) throw new Error(error.message);
	return {
		path,
		token: signed.token,
		signedUrl: signed.signedUrl
	};
});
var createDownloadUrl_createServerFn_handler = createServerRpc({
	id: "bab43f377381f85bc380afe3f5d609a7316608f1db4e6bfd44d256b0761db7fd",
	name: "createDownloadUrl",
	filename: "src/lib/upload.functions.ts"
}, (opts) => createDownloadUrl.__executeServer(opts));
var createDownloadUrl = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	path: stringType(),
	expiresIn: numberType().optional()
}).parse(input)).handler(createDownloadUrl_createServerFn_handler, async ({ data, context }) => {
	const { data: signed, error } = await context.supabase.storage.from("krishi-uploads").createSignedUrl(data.path, data.expiresIn ?? 3600);
	if (error) throw new Error(error.message);
	return { url: signed.signedUrl };
});
//#endregion
export { createDownloadUrl_createServerFn_handler, createUploadUrl_createServerFn_handler };
