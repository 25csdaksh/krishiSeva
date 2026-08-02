import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { r as useI18n } from "./i18n-DP5zaQcX.mjs";
import { _ as Settings2, a as Users, f as Tag } from "../_libs/lucide-react.mjs";
import { t as Button } from "./LanguageSwitcher-LOwzDG0-.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageShell } from "./PageShell-BAg5rNwI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-D0AeSYZl.js
var import_jsx_runtime = require_jsx_runtime();
function MarketInfoPage() {
	const { t } = useI18n();
	const benefits = [
		{
			icon: Users,
			title: "marketInfo.b1",
			desc: "marketInfo.b1d"
		},
		{
			icon: Tag,
			title: "marketInfo.b2",
			desc: "marketInfo.b2d"
		},
		{
			icon: Settings2,
			title: "marketInfo.b3",
			desc: "marketInfo.b3d"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-5xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "max-w-2xl text-4xl font-bold sm:text-5xl",
				children: t("marketInfo.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-2xl text-base text-muted-foreground",
				children: t("marketInfo.p")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-3",
				children: benefits.map(({ icon: Icon, title, desc }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border/60 bg-surface/50 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-11 w-11 place-items-center rounded-2xl bg-primary/12 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-lg font-semibold",
							children: t(title)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: t(desc)
						})
					]
				}, title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "lg",
				className: "mt-10 rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					search: { mode: "signup" },
					children: t("marketInfo.cta")
				})
			})
		]
	}) });
}
//#endregion
export { MarketInfoPage as component };
