import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { a as useI18n, t as Button } from "./button-D1j92SdV.mjs";
import { B as ArrowLeft, k as ExternalLink } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-YdTQi2j-.mjs";
import { t as Skeleton } from "./skeleton-CmmtW04I.mjs";
import { t as Badge } from "./badge-BleEwmi5.mjs";
import { t as Route } from "./schemes._slug-BZI5aWjk.mjs";
import { t as getSchemeBySlug } from "./schemes.functions-CPgPXP6k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schemes._slug-BEXxH4SR.js
var import_jsx_runtime = require_jsx_runtime();
function SchemeDetail() {
	const { slug } = Route.useParams();
	const { t } = useI18n();
	const { data, isLoading } = useQuery({
		queryKey: ["scheme", slug],
		queryFn: () => getSchemeBySlug({ data: { slug } })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/schemes",
				className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }),
					" ",
					t("schemes.title")
				]
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-64 rounded-2xl" }),
			!isLoading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: t("schemes.empty")
			}),
			data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						children: data.state ?? "Central"
					}), data.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: data.category
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-3xl font-bold sm:text-4xl",
					children: data.title
				}),
				data.ministry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: data.ministry
				}),
				data.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-base text-muted-foreground",
					children: data.description
				}),
				data.eligibility && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8 rounded-2xl border border-border/60 bg-surface/50 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: t("schemes.eligibility")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-line text-sm text-muted-foreground",
						children: data.eligibility
					})]
				}),
				data.benefits && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-4 rounded-2xl border border-border/60 bg-surface/50 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: t("schemes.benefits")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-line text-sm text-muted-foreground",
						children: data.benefits
					})]
				}),
				data.application_link && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-8 rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: data.application_link,
						target: "_blank",
						rel: "noreferrer",
						children: [
							t("schemes.apply"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-1 h-4 w-4" })
						]
					})
				})
			] })
		]
	}) });
}
//#endregion
export { SchemeDetail as component };
