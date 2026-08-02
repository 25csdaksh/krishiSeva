import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { a as useI18n, t as Button } from "./button-D1j92SdV.mjs";
import { C as Leaf, S as LoaderCircle, b as MapPin } from "../_libs/lucide-react.mjs";
import { t as LanguageSwitcher } from "./LanguageSwitcher-CrE8-gxm.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as Label, t as Input } from "./label-CO-aav1W.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Progress } from "./progress-BRnQDZ4W.mjs";
import { t as completeOnboarding } from "./profile.functions-B-mYm4Wt.mjs";
import { n as reverseGeocodeCoords, t as getWeatherByCoords } from "./weather.functions-p4uIAZZm.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-C7tUlu9i.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BlwzUzwc.mjs";
import { n as detectSeason, t as SEASONS } from "./seasonDetector-BDSgfG_U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-CMQCTqN2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AREA_UNITS = [
	{
		value: "hectare",
		label: "Hectare"
	},
	{
		value: "acre",
		label: "Acre"
	},
	{
		value: "sqft",
		label: "Square feet"
	},
	{
		value: "sqyard",
		label: "Square yard"
	}
];
/** Multiplier: 1 unit === X hectares */
var TO_HECTARE = {
	hectare: 1,
	acre: .404686,
	sqft: 92903e-10,
	sqyard: 83613e-9
};
function toHectares(value, unit) {
	if (!Number.isFinite(value) || value <= 0) return 0;
	return Number((value * TO_HECTARE[unit]).toFixed(6));
}
var SOILS = [
	"alluvial",
	"black",
	"red",
	"laterite",
	"desert",
	"mountain",
	"peaty",
	"saline",
	"unknown"
];
var TOTAL = 5;
function Onboarding() {
	const { t, lang } = useI18n();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [step, setStep] = (0, import_react.useState)(1);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [lat, setLat] = (0, import_react.useState)("");
	const [lon, setLon] = (0, import_react.useState)("");
	const [district, setDistrict] = (0, import_react.useState)("");
	const [state, setState] = (0, import_react.useState)("");
	const [locating, setLocating] = (0, import_react.useState)(false);
	const [weatherLabel, setWeatherLabel] = (0, import_react.useState)(null);
	const [unit, setUnit] = (0, import_react.useState)("acre");
	const [mode, setMode] = (0, import_react.useState)("direct");
	const [area, setArea] = (0, import_react.useState)("");
	const [length, setLength] = (0, import_react.useState)("");
	const [breadth, setBreadth] = (0, import_react.useState)("");
	const [season, setSeason] = (0, import_react.useState)(detectSeason());
	const [soil, setSoil] = (0, import_react.useState)("unknown");
	const hectares = toHectares(mode === "direct" ? Number(area) || 0 : (Number(length) || 0) * (Number(breadth) || 0), unit);
	const save = useMutation({
		mutationFn: () => completeOnboarding({ data: {
			full_name: fullName || null,
			district: district || null,
			state: state || null,
			latitude: lat ? Number(lat) : null,
			longitude: lon ? Number(lon) : null,
			land_size_hectares: hectares || null,
			current_season: season,
			soil_type: soil,
			preferred_language: lang
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			toast.success(t("profile.updated"));
			navigate({
				to: "/dashboard",
				replace: true
			});
		},
		onError: (e) => toast.error(e.message)
	});
	async function useMyLocation() {
		if (!("geolocation" in navigator)) {
			toast.error("Location is not available on this device");
			return;
		}
		setLocating(true);
		navigator.geolocation.getCurrentPosition(async (pos) => {
			const la = Number(pos.coords.latitude.toFixed(5));
			const lo = Number(pos.coords.longitude.toFixed(5));
			setLat(String(la));
			setLon(String(lo));
			try {
				const place = await reverseGeocodeCoords({ data: {
					lat: la,
					lon: lo
				} });
				setDistrict(place.district);
				setState(place.state);
				const w = await getWeatherByCoords({ data: {
					lat: la,
					lon: lo
				} });
				setWeatherLabel(`${Math.round(w.current.temperature)}° · ${w.current.condition}`);
			} catch {
				toast.error("Could not load location details");
			} finally {
				setLocating(false);
			}
		}, () => {
			setLocating(false);
			toast.error("Please allow location access or enter coordinates manually");
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-glow pointer-events-none absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold",
						children: t("brand.name")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border/60 bg-card/80 p-6 soft-shadow sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							t("onboarding.step"),
							" ",
							step,
							" ",
							t("onboarding.of"),
							" ",
							TOTAL
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: step / TOTAL * 100,
						className: "mt-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 text-2xl font-bold",
						children: t("onboarding.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4",
						children: [
							step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: t("onboarding.name")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									value: fullName,
									placeholder: t("onboarding.namePlaceholder"),
									onChange: (e) => setFullName(e.target.value)
								})]
							}),
							step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("onboarding.location") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										className: "w-full rounded-full",
										onClick: useMyLocation,
										disabled: locating,
										children: locating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
											" ",
											t("onboarding.locating")
										] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mr-2 h-4 w-4" }),
											" ",
											t("onboarding.useLocation")
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: t("onboarding.locationHelp")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "lat",
													children: "Latitude"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "lat",
													value: lat,
													onChange: (e) => setLat(e.target.value)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "lon",
													children: "Longitude"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "lon",
													value: lon,
													onChange: (e) => setLon(e.target.value)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "district",
													children: t("profile.district")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "district",
													value: district,
													onChange: (e) => setDistrict(e.target.value)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "state",
													children: t("profile.state")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "state",
													value: state,
													onChange: (e) => setState(e.target.value)
												})]
											})
										]
									}),
									weatherLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl bg-secondary/60 p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: [t("onboarding.weather"), ": "]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: weatherLabel
										})]
									})
								]
							}),
							step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("onboarding.land") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-muted-foreground",
											children: t("onboarding.unit")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: unit,
											onValueChange: (v) => setUnit(v),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: AREA_UNITS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: u.value,
												children: u.label
											}, u.value)) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
										value: mode,
										onValueChange: (v) => setMode(v),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
											className: "w-full",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
												value: "direct",
												className: "flex-1",
												children: t("onboarding.direct")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
												value: "dimensions",
												className: "flex-1",
												children: t("onboarding.dimensions")
											})]
										})
									}),
									mode === "direct" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "area",
											children: t("onboarding.area")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "area",
											inputMode: "decimal",
											value: area,
											onChange: (e) => setArea(e.target.value)
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "len",
												children: t("onboarding.length")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "len",
												inputMode: "decimal",
												value: length,
												onChange: (e) => setLength(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "bre",
												children: t("onboarding.breadth")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "bre",
												inputMode: "decimal",
												value: breadth,
												onChange: (e) => setBreadth(e.target.value)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl bg-secondary/60 p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: [t("onboarding.area"), ": "]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [hectares, " ha"]
										})]
									})
								]
							}),
							step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("onboarding.season") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2",
										children: SEASONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSeason(s),
											className: `rounded-xl border p-3 text-sm capitalize transition-colors ${season === s ? "border-primary bg-primary/12 text-primary" : "border-border bg-surface/50 text-muted-foreground hover:text-foreground"}`,
											children: s
										}, s))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											t("onboarding.seasonSuggest"),
											": ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "capitalize",
												children: detectSeason()
											})
										]
									})
								]
							}),
							step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("onboarding.soil") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2",
									children: SOILS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSoil(s),
										className: `rounded-xl border p-3 text-sm capitalize transition-colors ${soil === s ? "border-primary bg-primary/12 text-primary" : "border-border bg-surface/50 text-muted-foreground hover:text-foreground"}`,
										children: s
									}, s))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex gap-3",
						children: [step > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "flex-1 rounded-full",
							onClick: () => setStep((s) => s - 1),
							children: t("common.back")
						}), step < TOTAL ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							className: "flex-1 rounded-full",
							onClick: () => setStep((s) => s + 1),
							children: t("common.next")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							className: "flex-1 rounded-full",
							disabled: save.isPending,
							onClick: () => save.mutate(),
							children: save.isPending ? t("common.saving") : t("onboarding.done")
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { Onboarding as component };
