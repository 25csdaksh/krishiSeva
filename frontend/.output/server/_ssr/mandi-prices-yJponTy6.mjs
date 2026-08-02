import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { a as useI18n, t as Button } from "./button-D1j92SdV.mjs";
import { f as Search } from "../_libs/lucide-react.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as Label, t as Input } from "./label-CO-aav1W.mjs";
import { n as CardContent, r as FarmPageHero, t as Card } from "./card-L3kts-Bi.mjs";
import { t as Skeleton } from "./skeleton-CmmtW04I.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CJLPUZCk.mjs";
import { t as getMandiPrices } from "./price.functions-DrT8pe6f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mandi-prices-yJponTy6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RedirectToMarket() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		navigate({
			to: "/market",
			replace: true
		});
	}, [navigate]);
	return null;
}
function MandiPricesSection() {
	const { t } = useI18n();
	const [filters, setFilters] = (0, import_react.useState)({
		commodity: "",
		state: "",
		district: ""
	});
	const [applied, setApplied] = (0, import_react.useState)(filters);
	const { data, isLoading } = useQuery({
		queryKey: ["mandi", applied],
		queryFn: () => getMandiPrices({ data: {
			commodity: applied.commodity || void 0,
			state: applied.state || void 0,
			district: applied.district || void 0,
			limit: 60
		} })
	});
	const records = data?.records ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmPageHero, {
				eyebrow: "Market intelligence",
				title: t("prices.title"),
				description: "Search current mandi records by crop and place so you can compare the rate before you sell.",
				image: "fields"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mt-6 border-border/60 bg-card/85 soft-shadow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "grid gap-3 p-5 sm:grid-cols-4 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "commodity",
								children: t("prices.commodity")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "commodity",
								value: filters.commodity,
								onChange: (e) => setFilters({
									...filters,
									commodity: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "state",
								children: t("prices.state")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "state",
								value: filters.state,
								onChange: (e) => setFilters({
									...filters,
									state: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "district",
								children: t("prices.district")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "district",
								value: filters.district,
								onChange: (e) => setFilters({
									...filters,
									district: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "w-full rounded-full",
								onClick: () => setApplied(filters),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mr-1 h-4 w-4" }),
									" ",
									t("common.search")
								]
							})
						})
					]
				})
			}),
			data?.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-destructive",
				children: data.error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 overflow-x-auto rounded-2xl border border-border/60 bg-card/85 soft-shadow",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full" }) : records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 text-sm text-muted-foreground",
					children: t("prices.empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("prices.commodity") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("prices.market") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: t("prices.min")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: t("prices.max")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: t("prices.modal")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("prices.date") })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: records.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "font-medium",
						children: [r.commodity, r.variety ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted-foreground",
							children: r.variety
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-sm text-muted-foreground",
						children: [r.market, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs",
							children: [r.district, r.state].filter(Boolean).join(", ")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-right",
						children: ["₹", r.min_price]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-right",
						children: ["₹", r.max_price]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-right font-semibold text-primary",
						children: ["₹", r.modal_price]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-xs text-muted-foreground",
						children: r.arrival_date
					})
				] }, `${r.market}-${r.commodity}-${i}`)) })] })
			})
		]
	});
}
//#endregion
export { MandiPricesSection, RedirectToMarket as component };
