import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { r as useI18n } from "./i18n-DP5zaQcX.mjs";
import { B as Droplets, H as CloudSun, N as IndianRupee, d as Thermometer, g as Sprout, m as Store, r as Wind, y as ScanLine } from "../_libs/lucide-react.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-BAg5rNwI.mjs";
import { n as CardContent, t as Card } from "./card-C8hSOhLa.mjs";
import { n as getMyProfile } from "./profile.functions-B4uF9Zip.mjs";
import { t as Skeleton } from "./skeleton-1BFAEXkv.mjs";
import { o as getWeatherByCoords } from "./weather.functions-BuBi-imh.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, l as Bar, n as BarChart, o as Area, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Bp0sfuVo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { t } = useI18n();
	const navigate = useNavigate();
	const { data: profile, isLoading: profileLoading } = useQuery({
		queryKey: ["profile"],
		queryFn: () => getMyProfile()
	});
	(0, import_react.useEffect)(() => {
		if (profile && !profile.onboarding_completed) navigate({
			to: "/onboarding",
			replace: true
		});
	}, [profile, navigate]);
	const hasCoords = profile?.latitude != null && profile?.longitude != null;
	const { data: weather, isLoading: weatherLoading } = useQuery({
		queryKey: [
			"weather",
			profile?.latitude,
			profile?.longitude
		],
		enabled: !!hasCoords,
		queryFn: () => getWeatherByCoords({ data: {
			lat: Number(profile.latitude),
			lon: Number(profile.longitude)
		} })
	});
	const chartData = weather?.forecast.map((d) => ({
		day: new Date(d.date).toLocaleDateString(void 0, { weekday: "short" }),
		max: d.max,
		min: d.min,
		rain: d.precipitation
	})) ?? [];
	const actions = [
		{
			to: "/leaf-scan",
			icon: ScanLine,
			key: "nav.leaf"
		},
		{
			to: "/crop-analysis",
			icon: Sprout,
			key: "nav.crop"
		},
		{
			to: "/marketplace",
			icon: Store,
			key: "nav.market"
		},
		{
			to: "/mandi-prices",
			icon: IndianRupee,
			key: "nav.prices"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("dashboard.hello")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate text-2xl font-bold sm:text-3xl",
							children: profileLoading ? "…" : profile?.full_name ?? t("brand.name")
						}),
						(profile?.district || profile?.state) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 truncate text-sm text-muted-foreground",
							children: [profile?.district, profile?.state].filter(Boolean).join(", ")
						})
					]
				})
			}),
			!hasCoords && !profileLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mt-6 border-border/60 bg-card/70",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-wrap items-center justify-between gap-3 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("dashboard.noLocation")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/profile",
						className: "text-sm font-medium text-primary hover:underline",
						children: t("nav.profile")
					})]
				})
			}),
			hasCoords && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/60 bg-card/70 lg:col-span-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className: "h-4 w-4 text-primary" }),
									" ",
									t("dashboard.weatherNow")
								]
							}), weatherLoading || !weather ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-4 h-28 rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 font-display text-5xl font-bold",
									children: [Math.round(weather.current.temperature), "°"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: weather.current.condition
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-6 grid grid-cols-3 gap-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl bg-secondary/60 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
												className: "flex items-center gap-1 text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-3 w-3" }),
													" ",
													t("dashboard.humidity")
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
												className: "mt-1 text-sm font-semibold",
												children: [Math.round(weather.current.humidity), "%"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl bg-secondary/60 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
												className: "flex items-center gap-1 text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "h-3 w-3" }),
													" ",
													t("dashboard.wind")
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "mt-1 text-sm font-semibold",
												children: Math.round(weather.current.windSpeed)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl bg-secondary/60 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
												className: "flex items-center gap-1 text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "h-3 w-3" }),
													" ",
													t("dashboard.feels")
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
												className: "mt-1 text-sm font-semibold",
												children: [Math.round(weather.current.apparentTemperature), "°"]
											})]
										})
									]
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/60 bg-card/70 lg:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-medium text-muted-foreground",
								children: t("dashboard.tempTrend")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 h-56 w-full",
								children: chartData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
										data: chartData,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
												id: "tmax",
												x1: "0",
												y1: "0",
												x2: "0",
												y2: "1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "0%",
													stopColor: "var(--color-chart-1)",
													stopOpacity: .5
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "100%",
													stopColor: "var(--color-chart-1)",
													stopOpacity: 0
												})]
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "var(--color-border)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "day",
												stroke: "var(--color-muted-foreground)",
												fontSize: 12
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												stroke: "var(--color-muted-foreground)",
												fontSize: 12,
												width: 30
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
												background: "var(--color-popover)",
												border: "1px solid var(--color-border)",
												borderRadius: 12,
												color: "var(--color-popover-foreground)"
											} }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												type: "monotone",
												dataKey: "max",
												stroke: "var(--color-chart-1)",
												fill: "url(#tmax)",
												strokeWidth: 2
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												type: "monotone",
												dataKey: "min",
												stroke: "var(--color-chart-2)",
												fill: "transparent",
												strokeWidth: 2
											})
										]
									})
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/60 bg-card/70 lg:col-span-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-medium text-muted-foreground",
								children: t("dashboard.rainTrend")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 h-48 w-full",
								children: chartData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: chartData,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "var(--color-border)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "day",
												stroke: "var(--color-muted-foreground)",
												fontSize: 12
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												stroke: "var(--color-muted-foreground)",
												fontSize: 12,
												width: 30
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
												cursor: { fill: "var(--color-secondary)" },
												contentStyle: {
													background: "var(--color-popover)",
													border: "1px solid var(--color-border)",
													borderRadius: 12,
													color: "var(--color-popover-foreground)"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "rain",
												fill: "var(--color-chart-2)",
												radius: [
													6,
													6,
													0,
													0
												]
											})
										]
									})
								})
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted-foreground",
					children: t("dashboard.quick")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: actions.map(({ to, icon: Icon, key }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						className: "flex items-center gap-3 rounded-2xl border border-border/60 bg-surface/50 p-5 transition-colors hover:border-primary/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 truncate text-sm font-medium",
							children: t(key)
						})]
					}, to))
				})]
			})
		]
	}) });
}
//#endregion
export { Dashboard as component };
