import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { a as useI18n } from "./button-D1j92SdV.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-YdTQi2j-.mjs";
import { n as CardContent, r as FarmPageHero, t as Card } from "./card-L3kts-Bi.mjs";
import { n as getMyProfile } from "./profile.functions-B-mYm4Wt.mjs";
import { t as Skeleton } from "./skeleton-CmmtW04I.mjs";
import { t as getWeatherByCoords } from "./weather.functions-p4uIAZZm.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CJLPUZCk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weather-DXRBMMKc.js
var import_jsx_runtime = require_jsx_runtime();
function WeatherPage() {
	const { t } = useI18n();
	const { data: profile, isLoading: profileLoading } = useQuery({
		queryKey: ["profile"],
		queryFn: () => getMyProfile()
	});
	const hasCoords = profile?.latitude != null && profile?.longitude != null;
	const { data: weather, isLoading: weatherLoading } = useQuery({
		queryKey: [
			"weather",
			profile?.latitude,
			profile?.longitude
		],
		enabled: hasCoords,
		queryFn: () => getWeatherByCoords({ data: {
			lat: Number(profile.latitude),
			lon: Number(profile.longitude)
		} })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-5xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmPageHero, {
				eyebrow: "Weather",
				title: t("weather.title"),
				description: t("weather.p"),
				image: "weather"
			}),
			!hasCoords && !profileLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mt-6 border-border/60 bg-card/85 soft-shadow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: t("weather.noLocation")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: t("weather.setLocationHelp")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/profile",
							className: "mt-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
							children: t("profile.title")
						})
					]
				})
			}),
			hasCoords && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: weatherLoading || !weather ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 rounded-2xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/60 bg-card/85 soft-shadow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-6xl font-display font-bold",
								children: [Math.round(weather.current.temperature), "°"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: weather.current.condition
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"Humidity: ",
										Math.round(weather.current.humidity),
										"%"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"Wind: ",
										Math.round(weather.current.windSpeed),
										" km/h"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"Feels like: ",
										Math.round(weather.current.apparentTemperature),
										"°"
									] })
								]
							})]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 overflow-x-auto rounded-2xl border border-border/60 bg-card/85 soft-shadow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Max"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Min"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Precipitation (mm)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Condition" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: weather.forecast.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(d.date).toLocaleDateString() }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "text-right",
							children: [Math.round(d.max), "°"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "text-right",
							children: [Math.round(d.min), "°"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: d.precipitation
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-sm text-muted-foreground",
							children: d.condition
						})
					] }, d.date)) })] })
				})] })
			})
		]
	}) });
}
//#endregion
export { WeatherPage as component };
