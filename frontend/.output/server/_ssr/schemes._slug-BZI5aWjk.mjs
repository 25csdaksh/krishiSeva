import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schemes._slug-BZI5aWjk.js
var $$splitNotFoundComponentImporter = () => import("./schemes._slug-DbaO_Mtb.mjs");
var $$splitErrorComponentImporter = () => import("./schemes._slug-DwcVRSq2.mjs");
var $$splitComponentImporter = () => import("./schemes._slug-BEXxH4SR.mjs");
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
