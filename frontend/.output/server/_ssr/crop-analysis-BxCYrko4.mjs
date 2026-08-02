import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { a as useI18n, t as Button } from "./button-D1j92SdV.mjs";
import { S as LoaderCircle, u as Sprout } from "../_libs/lucide-react.mjs";
import { n as CollapsibleTrigger$1, r as Root, t as CollapsibleContent$1 } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-YdTQi2j-.mjs";
import { n as Label, t as Input } from "./label-CO-aav1W.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CardContent, r as FarmPageHero, t as Card } from "./card-L3kts-Bi.mjs";
import { t as Progress } from "./progress-BRnQDZ4W.mjs";
import { n as getMyProfile } from "./profile.functions-B-mYm4Wt.mjs";
import { i as recommendCropForProfile, n as listMyCropRecommendations } from "./ml.functions-DtfNEcW8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crop-analysis-BxCYrko4.js
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmPageHero, {
				eyebrow: "Plan with confidence",
				title: t("crop.title"),
				description: "Recommendations use the farm details you have saved. Add optional soil readings when you have them for a more specific result.",
				image: "farmer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mt-6 border-border/60 bg-card/85 soft-shadow",
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
						className: "rounded-2xl border border-border/60 bg-card/85 p-5 lift-shadow",
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
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-border/60 bg-surface/50 p-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: (h.recommended_crops ?? []).map((c) => c.crop).join(", ") || "—"
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
