import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { a as useI18n } from "./button-D1j92SdV.mjs";
import { A as Droplets, E as IndianRupee, L as CalendarDays, b as MapPin, j as CloudSun, l as Store, m as Ruler, n as Wind, o as Thermometer, p as ScanLine, u as Sprout } from "../_libs/lucide-react.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-YdTQi2j-.mjs";
import { n as CardContent, r as FarmPageHero, t as Card } from "./card-L3kts-Bi.mjs";
import { n as getMyProfile } from "./profile.functions-B-mYm4Wt.mjs";
import { t as Skeleton } from "./skeleton-CmmtW04I.mjs";
import { t as getWeatherByCoords } from "./weather.functions-p4uIAZZm.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-D-kEyKX-.js
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
		enabled: hasCoords,
		queryFn: () => getWeatherByCoords({ data: {
			lat: Number(profile.latitude),
			lon: Number(profile.longitude)
		} })
	});
	const chartData = weather?.forecast.map((day) => ({
		day: new Date(day.date).toLocaleDateString(void 0, { weekday: "short" }),
		max: day.max,
		min: day.min,
		rain: day.precipitation
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
			to: "/market",
			icon: IndianRupee,
			key: "nav.market"
		}
	];
	const location = [profile?.district, profile?.state].filter(Boolean).join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmPageHero, {
				eyebrow: t("dashboard.hello"),
				title: profileLoading ? "Your farm" : profile?.full_name ?? "Your farm",
				description: location || "Build your profile to unlock local weather and tailored guidance.",
				image: "fields",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/profile",
					className: "inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-accent" }),
						" ",
						t("nav.profile")
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: Ruler,
						value: profile?.land_size_hectares ?? "-",
						label: "Hectares managed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: Sprout,
						value: profile?.primary_crops?.length ?? "-",
						label: "Crops on your profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: CalendarDays,
						value: profile?.current_season ?? "Not set",
						label: "Current growing season"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: Sprout,
						value: profile?.soil_type ?? "Not set",
						label: "Soil type"
					})
				]
			}),
			!hasCoords && !profileLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mt-6 border-border/60 bg-card/85 soft-shadow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-wrap items-center justify-between gap-4 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Weather is waiting for your location"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: t("dashboard.noLocation")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/profile",
						className: "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
						children: "Update profile"
					})]
				})
			}),
			hasCoords && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/60 bg-card/85 lift-shadow lg:col-span-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm font-medium text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className: "h-4 w-4 text-accent" }),
									" ",
									t("dashboard.weatherNow")
								]
							}), weatherLoading || !weather ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-4 h-40 rounded-2xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-5 font-display text-6xl font-bold",
									children: [Math.round(weather.current.temperature), "°"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: weather.current.condition
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-6 grid grid-cols-3 gap-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherDetail, {
											icon: Droplets,
											label: t("dashboard.humidity"),
											value: `${Math.round(weather.current.humidity)}%`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherDetail, {
											icon: Wind,
											label: t("dashboard.wind"),
											value: String(Math.round(weather.current.windSpeed))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherDetail, {
											icon: Thermometer,
											label: t("dashboard.feels"),
											value: `${Math.round(weather.current.apparentTemperature)}°`
										})
									]
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: t("dashboard.tempTrend"),
						className: "lg:col-span-2",
						children: chartData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: chartData,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "temperature",
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "max",
										stroke: "var(--color-chart-1)",
										fill: "url(#temperature)",
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
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full rounded-xl" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: t("dashboard.rainTrend"),
						className: "lg:col-span-3",
						short: true,
						children: chartData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
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
										contentStyle: tooltipStyle
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
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full rounded-xl" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: "Keep your farm moving"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-sm text-muted-foreground",
						children: t("dashboard.quick")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: actions.map(({ to, icon: Icon, key }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to,
							className: "flex items-center gap-3 rounded-2xl border border-border/60 bg-card/85 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:lift-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 truncate text-sm font-medium",
								children: t(key)
							})]
						}, to))
					})
				]
			})
		]
	}) });
}
function Metric({ icon: Icon, value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "border-border/60 bg-card/85",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-accent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 truncate text-lg font-bold capitalize",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: label
				})
			]
		})
	});
}
function WeatherDetail({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-secondary/70 p-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
			className: "flex items-center gap-1 text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }),
				" ",
				label
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 text-sm font-semibold",
			children: value
		})]
	});
}
function ChartCard({ title, className, short, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: `border-border/60 bg-card/85 ${className ?? ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium text-muted-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-4 w-full ${short ? "h-48" : "h-56"}`,
				children
			})]
		})
	});
}
var tooltipStyle = {
	background: "var(--color-popover)",
	border: "1px solid var(--color-border)",
	borderRadius: 12,
	color: "var(--color-popover-foreground)"
};
//#endregion
export { Dashboard as component };
