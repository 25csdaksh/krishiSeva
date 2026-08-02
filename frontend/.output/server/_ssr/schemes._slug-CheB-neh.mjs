import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schemes._slug-CheB-neh.js
var $$splitNotFoundComponentImporter = () => import("./schemes._slug-B1599s3V.mjs");
var $$splitErrorComponentImporter = () => import("./schemes._slug-An6Ss-Kx.mjs");
var $$splitComponentImporter = () => import("./schemes._slug-D95WY2zl.mjs");
var Route = createFileRoute("/schemes/$slug")({
	head: ({ params }) => ({ meta: [
		{ title: `${params.slug.replace(/-/g, " ")} — Government scheme | Krishi Seva` },
		{
			name: "description",
			content: "Eligibility, benefits and application details for this government agriculture scheme."
		},
		{
			property: "og:title",
			content: "Government scheme details — Krishi Seva"
		},
		{
			property: "og:description",
			content: "Check eligibility, benefits and how to apply."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
