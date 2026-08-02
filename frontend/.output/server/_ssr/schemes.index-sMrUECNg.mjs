import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { a as useI18n, t as Button } from "./button-D1j92SdV.mjs";
import { k as ExternalLink } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-YdTQi2j-.mjs";
import { t as Skeleton } from "./skeleton-CmmtW04I.mjs";
import { t as Badge } from "./badge-BleEwmi5.mjs";
import { n as listSchemes } from "./schemes.functions-CPgPXP6k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schemes.index-sMrUECNg.js
var import_jsx_runtime = require_jsx_runtime();
function SchemesPage() {
	const { t } = useI18n();
	const { data, isLoading } = useQuery({
		queryKey: ["schemes", "public"],
		queryFn: () => listSchemes({ data: {} })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-5xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-bold sm:text-5xl",
				children: t("schemesInfo.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-2xl text-base text-muted-foreground",
				children: t("schemesInfo.p")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-2",
				children: [
					isLoading && [
						0,
						1,
						2,
						3
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-44 rounded-2xl" }, i)),
					!isLoading && (data?.length ?? 0) === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("schemes.empty")
					}),
					data?.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex flex-col rounded-2xl border border-border/60 bg-surface/50 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [s.state ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: s.state
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: "Central"
								}), s.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: s.category
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-lg font-semibold",
								children: s.title
							}),
							s.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-3 text-sm text-muted-foreground",
								children: s.description
							}),
							s.ministry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: s.ministry
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/schemes/$slug",
								params: { slug: s.slug },
								className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline",
								children: [
									t("schemes.apply"),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })
								]
							})
						]
					}, s.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "lg",
				className: "mt-10 rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					search: { mode: "signup" },
					children: t("schemesInfo.cta")
				})
			})
		]
	}) });
}
//#endregion
export { SchemesPage as component };
