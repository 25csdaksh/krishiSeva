import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as objectType, r as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BGrTT5Pz.js
var $$splitComponentImporter = () => import("./auth-7MUpyNhH.mjs");
var searchSchema = objectType({ mode: enumType(["signin", "signup"]).optional() });
var Route = createFileRoute("/auth")({
	validateSearch: searchSchema,
	head: () => ({ meta: [
		{ title: "Sign in to Krishi Seva" },
		{
			name: "description",
			content: "Sign in or create your free Krishi Seva account to access weather, crop advice, mandi prices and the farmer marketplace."
		},
		{
			property: "og:title",
			content: "Sign in to Krishi Seva"
		},
		{
			property: "og:description",
			content: "Access your farm dashboard."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
