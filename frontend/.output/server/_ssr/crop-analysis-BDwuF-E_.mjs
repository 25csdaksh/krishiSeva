import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime, n as CollapsibleTrigger$1, r as Root, t as CollapsibleContent$1 } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { r as useI18n } from "./i18n-DP5zaQcX.mjs";
import { A as LoaderCircle, g as Sprout } from "../_libs/lucide-react.mjs";
import { t as Button } from "./LanguageSwitcher-LOwzDG0-.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-BAg5rNwI.mjs";
import { n as Label, t as Input } from "./label-D9W3zZzn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CardContent, t as Card } from "./card-C8hSOhLa.mjs";
import { t as Progress } from "./progress-CTdgI9v6.mjs";
import { n as getMyProfile } from "./profile.functions-B4uF9Zip.mjs";
import { i as recommendCropForProfile, n as listMyCropRecommendations } from "./ml.functions-B9WsJhI3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crop-analysis-BDwuF-E_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Collapsible = Root;
var CollapsibleTrigger = CollapsibleTrigger$1;
var CollapsibleContent = CollapsibleContent$1;
var NUM_FIELDS = [
	["N", "Nitrogen (N)"],
	["P", "Phosphorus (P)"],
	["K", "Potassium (K)"],
	["ph", "Soil pH"],
	["temperature", "Temperature (°C)"],
	["humidity", "Humidity (%)"],
	["rainfall", "Rainfall (mm)"]
];
function CropAnalysis() {
	const { t } = useI18n();
	const queryClient = useQueryClient();
	const [values, setValues] = (0, import_react.useState)({});
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: () => getMyProfile()
	});
	const { data: history } = useQuery({
		queryKey: ["crop-recs"],
		queryFn: () => listMyCropRecommendations()
	});
	const run = useMutation({
		mutationFn: () => {
			const payload = {};
			for (const [key] of NUM_FIELDS) {
				const raw = values[key];
				if (raw !== void 0 && raw !== "" && Number.isFinite(Number(raw))) payload[key] = Number(raw);
			}
			return recommendCropForProfile({ data: payload });
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["crop-recs"] }),
		onError: (e) => toast.error(e.message)
	});
	const crops = run.data?.recommended_crops ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: t("crop.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mt-6 border-border/60 bg-card/70",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-muted-foreground",
							children: t("crop.context")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-secondary/60 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted-foreground",
										children: t("crop.soil")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 text-sm font-semibold capitalize",
										children: profile?.soil_type ?? t("common.none")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-secondary/60 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted-foreground",
										children: t("crop.season")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 text-sm font-semibold capitalize",
										children: profile?.current_season ?? t("common.none")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 rounded-xl bg-secondary/60 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted-foreground",
										children: t("crop.location")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 truncate text-sm font-semibold",
										children: [profile?.district, profile?.state].filter(Boolean).join(", ") || t("common.none")
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleTrigger, {
								className: "text-sm font-medium text-primary hover:underline",
								children: t("crop.advanced")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, {
								className: "mt-4 grid gap-3 sm:grid-cols-2",
								children: NUM_FIELDS.map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: key,
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: key,
										inputMode: "decimal",
										value: values[key] ?? "",
										onChange: (e) => setValues((v) => ({
											...v,
											[key]: e.target.value
										}))
									})]
								}, key))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6 w-full rounded-full",
							disabled: run.isPending,
							onClick: () => run.mutate(),
							children: run.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
								" ",
								t("crop.running")
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "mr-2 h-4 w-4" }),
								" ",
								t("crop.run")
							] })
						})
					]
				})
			}),
			crops.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted-foreground",
					children: t("crop.results")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-3",
					children: crops.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/60 bg-surface/50 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "truncate text-lg font-semibold",
									children: c.crop
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 text-sm font-semibold text-primary",
									children: [Math.round(c.score), "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: c.score,
								className: "mt-3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: c.reason
							})
						]
					}, c.crop))
				})]
			}),
			(history?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted-foreground",
					children: t("crop.history")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2",
					children: history.map((h) => {
						const list = h.recommended_crops ?? [];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-border/60 bg-surface/50 p-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: list.map((c) => c.crop).join(", ") || "—"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: new Date(h.created_at).toLocaleString()
							})]
						}, h.id);
					})
				})]
			})
		]
	}) });
}
//#endregion
export { CropAnalysis as component };
