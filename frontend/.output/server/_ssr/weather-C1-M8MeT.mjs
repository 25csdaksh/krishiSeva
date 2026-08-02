import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { $ as ChartNoAxesColumn, B as Droplets, E as Minus, G as CloudFog, H as CloudSun, I as Gauge, J as CircleCheck, L as Flame, O as MapPin, R as Eye, U as CloudSnow, V as Cloud, W as CloudRain, X as ChevronRight, b as RefreshCw, c as TrendingUp, d as Thermometer, et as CalendarDays, g as Sprout, h as Star, i as Waves, j as Leaf, l as TrendingDown, nt as ArrowUp, o as Umbrella, ot as ArrowDown, p as Sun, q as CircleX, r as Wind, s as TriangleAlert, st as Activity, t as Zap, tt as Bug, w as Navigation } from "../_libs/lucide-react.mjs";
import { t as Button } from "./LanguageSwitcher-LOwzDG0-.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-BAg5rNwI.mjs";
import { n as CardContent, t as Card } from "./card-C8hSOhLa.mjs";
import { n as getMyProfile } from "./profile.functions-B4uF9Zip.mjs";
import { t as Skeleton } from "./skeleton-1BFAEXkv.mjs";
import { a as getWeatherAiAnalysis, i as getMonthlyOutlook, n as getHistoricalAiSummary, r as getHistoricalWeather, t as getFullWeather } from "./weather.functions-BuBi-imh.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, f as Legend, i as YAxis, l as Bar, n as BarChart, o as Area, r as LineChart, s as Line, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
import { t as Badge } from "./badge-BgmoU9Yq.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CGuXboAy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weather-C1-M8MeT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tooltipStyle = {
	background: "var(--color-popover)",
	border: "1px solid var(--color-border)",
	borderRadius: 12,
	color: "var(--color-popover-foreground)",
	fontSize: 12
};
function WeatherIcon({ code, className }) {
	if (code === 0 || code === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className });
	if (code === 2 || code === 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className });
	if (code >= 45 && code <= 48) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudFog, { className });
	if (code >= 51 && code <= 67) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, { className });
	if (code >= 71 && code <= 77) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSnow, { className });
	if (code >= 80 && code <= 82) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, { className });
	if (code >= 95) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className });
}
function riskColor(level) {
	if (level === "critical") return "text-red-500";
	if (level === "high") return "text-orange-500";
	if (level === "medium") return "text-amber-500";
	return "text-green-500";
}
function riskBg(level) {
	if (level === "critical") return "bg-red-500/10 border-red-500/30";
	if (level === "high") return "bg-orange-500/10 border-orange-500/30";
	if (level === "medium") return "bg-amber-500/10 border-amber-500/30";
	return "bg-green-500/10 border-green-500/30";
}
function riskBar(level) {
	if (level === "critical") return "bg-red-500";
	if (level === "high") return "bg-orange-500";
	if (level === "medium") return "bg-amber-400";
	return "bg-green-500";
}
function scoreColor(score) {
	if (score >= 80) return "#22c55e";
	if (score >= 60) return "#84cc16";
	if (score >= 40) return "#f59e0b";
	if (score >= 20) return "#f97316";
	return "#ef4444";
}
function WeatherSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 rounded-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" }, i))
		})]
	});
}
function StatCard({ icon: Icon, label, value, unit, sub, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${accent ? "border-primary/30 bg-primary/8" : "border-border/60 bg-card/85"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs font-medium text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), label]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-2xl font-bold font-display leading-none",
				children: [value, unit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-0.5 text-sm font-normal text-muted-foreground",
					children: unit
				})]
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: sub
			})
		]
	});
}
function SoilCard({ icon: Icon, label, value, unit, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border/60 bg-card/85 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs font-medium text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 text-accent" }), label]
			}),
			value != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xl font-bold font-display",
				children: [value.toFixed(value > .01 ? 1 : 3), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-0.5 text-xs font-normal text-muted-foreground",
					children: unit
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "—"
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground/70",
				children: hint
			})
		]
	});
}
function ScoreGauge({ score, label }) {
	const r = 60;
	const cx = 80;
	const cy = 80;
	const startAngle = -210;
	const endAngle = startAngle + score / 100 * 240;
	function polar(angle, radius = r) {
		const rad = angle * Math.PI / 180;
		return {
			x: cx + radius * Math.cos(rad),
			y: cy + radius * Math.sin(rad)
		};
	}
	function arcPath(start, end, radius = r) {
		const s = polar(start, radius);
		const e = polar(end, radius);
		const large = end - start > 180 ? 1 : 0;
		return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
	}
	const color = scoreColor(score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 160 140",
			className: "w-40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: arcPath(startAngle, 30),
					fill: "none",
					stroke: "var(--color-border)",
					strokeWidth: 10,
					strokeLinecap: "round"
				}),
				score > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: arcPath(startAngle, endAngle),
					fill: "none",
					stroke: color,
					strokeWidth: 10,
					strokeLinecap: "round",
					style: { transition: "all 1s ease" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: cx,
					y: 84,
					textAnchor: "middle",
					fontSize: 28,
					fontWeight: 700,
					fontFamily: "Space Grotesk",
					fill: "var(--color-foreground)",
					children: score
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: cx,
					y: 102,
					textAnchor: "middle",
					fontSize: 11,
					fill: "var(--color-muted-foreground)",
					children: "out of 100"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 rounded-full px-4 py-1 text-sm font-bold",
			style: {
				background: `${color}20`,
				color
			},
			children: label
		})]
	});
}
function RiskCard({ icon: Icon, title, risk }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-2xl border p-4 ${riskBg(risk.level)}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-2 text-sm font-semibold ${riskColor(risk.level)}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), title]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 flex-1 rounded-full bg-border/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `h-full rounded-full transition-all ${riskBar(risk.level)}`,
						style: { width: `${risk.score}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium capitalize",
					children: risk.level
				})]
			}),
			risk.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: risk.description
			})
		]
	});
}
function ActionCard({ item }) {
	const stars = item.priority === 1 ? 5 : item.priority === 2 ? 4 : item.priority === 3 ? 3 : item.priority === 4 ? 2 : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex gap-3 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${item.isAvoid ? "border-red-500/20 bg-red-500/5" : "border-border/60 bg-card/85"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mt-0.5 ${item.isAvoid ? "text-red-500" : "text-green-500"}`,
			children: item.isAvoid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-5 w-5 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 shrink-0" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `text-sm font-medium ${item.isAvoid ? "text-red-600 dark:text-red-400" : ""}`,
				children: item.action
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex flex-wrap items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-amber-500",
						children: ["★".repeat(stars), "☆".repeat(5 - stars)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "rounded-full text-xs capitalize py-0",
						children: item.timing
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "rounded-full text-xs capitalize py-0",
						children: item.category
					})
				]
			})]
		})]
	});
}
function ForecastCard({ day, compact }) {
	const d = new Date(day.date);
	const dayName = d.toLocaleDateString(void 0, { weekday: compact ? "short" : "long" });
	const dateStr = d.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card/85 p-4 text-center transition-all hover:-translate-y-0.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
				children: dayName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: dateStr
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherIcon, {
				code: day.weatherCode,
				className: "h-7 w-7 text-accent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: day.condition
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-0.5 text-sm font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3 w-3 text-orange-400" }),
						Math.round(day.max),
						"°"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-0.5 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-3 w-3 text-sky-400" }),
						Math.round(day.min),
						"°"
					]
				})]
			}),
			day.precipitation > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 text-xs text-sky-500",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-3 w-3" }),
					day.precipitation.toFixed(1),
					" mm"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-3 w-3" }),
					"UV ",
					day.uvIndexMax.toFixed(0)
				]
			})
		]
	});
}
function TodayTab({ profile, weather, weatherLoading, aiAnalysis, aiLoading, onRefreshAI }) {
	if (weatherLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherSkeleton, {});
	if (!weather) return null;
	const { current, soil, forecast } = weather;
	const ai = aiAnalysis;
	const today = /* @__PURE__ */ new Date();
	const timeStr = today.toLocaleTimeString(void 0, {
		hour: "2-digit",
		minute: "2-digit"
	});
	const dateStr = today.toLocaleDateString(void 0, {
		weekday: "long",
		month: "long",
		day: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-3xl border border-border/60 bg-card/85 p-6 lift-shadow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute right-4 top-4 opacity-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherIcon, {
						code: current.weatherCode,
						className: "h-32 w-32"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
							children: "Today's Weather"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-7xl font-bold leading-none",
							children: [Math.round(current.temperature), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-4xl",
								children: "°C"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-lg font-medium text-muted-foreground",
							children: current.condition
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"Feels like ",
								Math.round(current.apparentTemperature),
								"° · ",
								dateStr,
								" · ",
								timeStr
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 mt-1",
						children: [
							[profile?.district, profile?.state].filter(Boolean).join(", ") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "rounded-full flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), [profile?.district, profile?.state].filter(Boolean).join(", ")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "rounded-full",
								children: ["UV ", current.uvIndex.toFixed(1)]
							}),
							soil.rainProbability != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "rounded-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Umbrella, { className: "mr-1 h-3 w-3" }),
									Math.round(soil.rainProbability),
									"% rain"
								]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold mb-3",
				children: "Current Conditions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Thermometer,
						label: "Temperature",
						value: Math.round(current.temperature),
						unit: "°C"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Thermometer,
						label: "Feels Like",
						value: Math.round(current.apparentTemperature),
						unit: "°C",
						accent: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Droplets,
						label: "Humidity",
						value: Math.round(current.humidity),
						unit: "%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CloudRain,
						label: "Rain Today",
						value: current.rain.toFixed(1),
						unit: "mm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Umbrella,
						label: "Rain Probability",
						value: Math.round(soil.rainProbability ?? 0),
						unit: "%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Wind,
						label: "Wind Speed",
						value: Math.round(current.windSpeed),
						unit: "km/h"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Zap,
						label: "Wind Gusts",
						value: Math.round(current.windGusts),
						unit: "km/h"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Navigation,
						label: "Wind Direction",
						value: current.windDirectionText,
						sub: `${Math.round(current.windDirection)}°`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Eye,
						label: "Visibility",
						value: current.visibility.toFixed(1),
						unit: "km"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Cloud,
						label: "Cloud Cover",
						value: Math.round(current.cloudCover),
						unit: "%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Sun,
						label: "UV Index",
						value: current.uvIndex.toFixed(1),
						sub: current.uvIndex >= 8 ? "Very High" : current.uvIndex >= 6 ? "High" : current.uvIndex >= 3 ? "Moderate" : "Low"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Gauge,
						label: "Pressure",
						value: Math.round(current.surfacePressure),
						unit: "hPa"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold mb-3",
				children: "Soil & Evapotranspiration"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilCard, {
						icon: Thermometer,
						label: "Soil Temp (0 cm)",
						value: soil.soilTemperature0cm,
						unit: "°C",
						hint: "Surface temperature"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilCard, {
						icon: Thermometer,
						label: "Soil Temp (6 cm)",
						value: soil.soilTemperature6cm,
						unit: "°C",
						hint: "Root zone temp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilCard, {
						icon: Droplets,
						label: "Moisture (0–1 cm)",
						value: soil.soilMoisture0to1cm,
						unit: "m³/m³",
						hint: "Surface moisture"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilCard, {
						icon: Droplets,
						label: "Moisture (3–9 cm)",
						value: soil.soilMoisture3to9cm,
						unit: "m³/m³",
						hint: "Mid root zone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilCard, {
						icon: Droplets,
						label: "Moisture (9–27 cm)",
						value: soil.soilMoisture9to27cm,
						unit: "m³/m³",
						hint: "Deep root zone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilCard, {
						icon: Activity,
						label: "Reference ET₀",
						value: soil.et0,
						unit: "mm/day",
						hint: "Evapotranspiration demand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilCard, {
						icon: ChartNoAxesColumn,
						label: "Vapour Pressure Deficit",
						value: soil.vpd,
						unit: "kPa",
						hint: ">1.5 kPa = water stress"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-primary/20 bg-primary/5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-widest text-primary",
						children: "AI Farming Analysis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-bold",
						children: "Today's Intelligence Report"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "rounded-full gap-2",
						onClick: onRefreshAI,
						disabled: aiLoading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 ${aiLoading ? "animate-spin" : ""}` }), aiLoading ? "Analysing…" : "Refresh AI"]
					})]
				}), aiLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 rounded-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" })]
					})]
				}) : ai ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-6 items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreGauge, {
								score: ai.farmingScore ?? 50,
								label: ai.scoreLabel ?? "Fair"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-[200px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold mb-2",
										children: "Weather Summary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted-foreground",
										children: ai.summary
									}),
									ai.todayRecommendations?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-3 space-y-1.5",
										children: ai.todayRecommendations.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-2 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 mt-0.5 shrink-0 text-primary" }), r]
										}, i))
									}) : null
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-green-500/20 bg-green-500/5 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Suitable Activities"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-1.5",
									children: (ai.suitableActivities ?? []).map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "text-sm text-muted-foreground",
										children: ["• ", a]
									}, i))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-red-500/20 bg-red-500/5 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), " Activities to Avoid"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-1.5",
									children: (ai.activitiesToAvoid ?? []).map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "text-sm text-muted-foreground",
										children: ["• ", a]
									}, i))
								})]
							})]
						}),
						ai.risks && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold mb-3",
							children: "Risk Assessment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskCard, {
									icon: Leaf,
									title: "Disease Risk",
									risk: ai.risks.disease
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskCard, {
									icon: Bug,
									title: "Pest Risk",
									risk: ai.risks.pest
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskCard, {
									icon: Flame,
									title: "Heat Stress",
									risk: ai.risks.heatStress
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskCard, {
									icon: Waves,
									title: "Flood Risk",
									risk: ai.risks.flood
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskCard, {
									icon: Sun,
									title: "Drought Risk",
									risk: ai.risks.drought
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskCard, {
									icon: Wind,
									title: "Wind Damage",
									risk: ai.risks.windDamage
								})
							]
						})] }),
						ai.cropRecommendations?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold mb-3",
							children: "Crop Activity Recommendations"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: ai.cropRecommendations.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 rounded-2xl border border-border/60 bg-card/85 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-5 w-5 shrink-0 text-accent mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold capitalize",
											children: c.crop
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: `rounded-full text-xs py-0 ${c.priority === "high" ? "border-orange-500/40 text-orange-500" : c.priority === "low" ? "border-green-500/40 text-green-500" : ""}`,
											children: c.priority
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-primary",
										children: c.activity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: c.reason
									})
								] })]
							}, i))
						})] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								{
									icon: Droplets,
									title: "Water Requirement",
									text: ai.waterRequirement
								},
								{
									icon: Waves,
									title: "Irrigation Advice",
									text: ai.irrigationAdvice
								},
								{
									icon: Leaf,
									title: "Fertilizer Advice",
									text: ai.fertilizerAdvice
								},
								{
									icon: Umbrella,
									title: "Pesticide Spraying",
									text: ai.pesticideAdvice
								},
								{
									icon: Sun,
									title: "Harvest",
									text: ai.harvestRecommendation
								}
							].filter((a) => a.text).map(({ icon: Icon, title, text }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border/60 bg-card/85 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), title]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm",
									children: text
								})]
							}, i))
						}),
						ai.actionPlan?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold mb-3",
							children: "Today's Action Plan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: [...ai.actionPlan].sort((a, b) => a.priority - b.priority).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, { item }, i))
						})] }) : null
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col items-center gap-3 py-8 text-center text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-10 w-10 opacity-30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: "AI analysis unavailable right now."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "rounded-full",
							onClick: onRefreshAI,
							children: "Try Again"
						})
					]
				})]
			})
		]
	});
}
function PastTab({ profile }) {
	const [days, setDays] = (0, import_react.useState)(7);
	const { data: historical, isLoading } = useQuery({
		queryKey: ["historical-weather", days],
		queryFn: () => getHistoricalWeather({ data: { days } }),
		enabled: !!profile?.latitude,
		staleTime: 864e5
	});
	const { data: aiSummary, isLoading: summaryLoading } = useQuery({
		queryKey: ["historical-ai-summary", days],
		queryFn: () => getHistoricalAiSummary({ data: { days } }),
		enabled: !!profile?.latitude && !!historical,
		staleTime: 864e5
	});
	const stats = (0, import_react.useMemo)(() => {
		if (!historical?.length) return null;
		const h = historical;
		return {
			maxTemp: Math.max(...h.map((d) => d.maxTemp)),
			minTemp: Math.min(...h.map((d) => d.minTemp)),
			totalRain: h.reduce((s, d) => s + d.precipitation, 0),
			avgHumidity: h.reduce((s, d) => s + d.avgHumidity, 0) / h.length,
			avgMaxTemp: h.reduce((s, d) => s + d.maxTemp, 0) / h.length,
			avgMinTemp: h.reduce((s, d) => s + d.minTemp, 0) / h.length,
			avgWind: h.reduce((s, d) => s + d.windSpeedMax, 0) / h.length,
			rainyDays: h.filter((d) => d.precipitation > 1).length
		};
	}, [historical]);
	const chartData = (0, import_react.useMemo)(() => {
		if (!historical?.length) return [];
		return historical.map((d) => ({
			date: new Date(d.date).toLocaleDateString(void 0, {
				month: "short",
				day: "numeric"
			}),
			max: Math.round(d.maxTemp),
			min: Math.round(d.minTemp),
			rain: parseFloat(d.precipitation.toFixed(1)),
			humidity: Math.round(d.avgHumidity),
			wind: Math.round(d.windSpeedMax)
		}));
	}, [historical]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				{
					label: "Yesterday",
					value: 1
				},
				{
					label: "Last 7 Days",
					value: 7
				},
				{
					label: "Last 15 Days",
					value: 15
				},
				{
					label: "Last 30 Days",
					value: 30
				}
			].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setDays(p.value),
				className: `rounded-full px-4 py-1.5 text-sm font-medium transition-all ${days === p.value ? "bg-ink text-ink-foreground" : "bg-secondary/60 text-muted-foreground hover:bg-secondary"}`,
				children: p.label
			}, p.value))
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherSkeleton, {}) : !historical ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			stats && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: ArrowUp,
						label: "Highest Temp",
						value: Math.round(stats.maxTemp),
						unit: "°C"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: ArrowDown,
						label: "Lowest Temp",
						value: Math.round(stats.minTemp),
						unit: "°C"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CloudRain,
						label: "Total Rainfall",
						value: stats.totalRain.toFixed(1),
						unit: "mm",
						sub: `${stats.rainyDays} rainy days`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Droplets,
						label: "Avg Humidity",
						value: Math.round(stats.avgHumidity),
						unit: "%"
					})
				]
			}),
			summaryLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-2xl" }) : aiSummary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-primary/20 bg-primary/5 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wide text-primary mb-2",
					children: "AI Period Summary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed",
					children: aiSummary
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border/60 bg-card/85",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted-foreground mb-4",
						children: "Temperature Trend (°C)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-52",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: chartData,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "gradMax",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--color-chart-1)",
											stopOpacity: .4
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
										dataKey: "date",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tick: { fontSize: 11 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										width: 28
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "max",
										name: "Max °C",
										stroke: "var(--color-chart-1)",
										fill: "url(#gradMax)",
										strokeWidth: 2
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "min",
										name: "Min °C",
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
				className: "border-border/60 bg-card/85",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted-foreground mb-4",
						children: "Rainfall (mm)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
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
										dataKey: "date",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										width: 28
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										cursor: { fill: "var(--color-secondary)" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "rain",
										name: "Rain (mm)",
										fill: "var(--color-chart-2)",
										radius: [
											4,
											4,
											0,
											0
										]
									})
								]
							})
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/60 bg-card/85",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted-foreground mb-4",
							children: "Avg Humidity (%)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
									data: chartData,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "var(--color-border)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "date",
											stroke: "var(--color-muted-foreground)",
											fontSize: 10
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "var(--color-muted-foreground)",
											fontSize: 10,
											width: 24,
											domain: [0, 100]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											type: "monotone",
											dataKey: "humidity",
											name: "Humidity %",
											stroke: "var(--color-chart-1)",
											strokeWidth: 2,
											dot: false
										})
									]
								})
							})
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/60 bg-card/85",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted-foreground mb-4",
							children: "Max Wind Speed (km/h)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
									data: chartData,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "var(--color-border)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "date",
											stroke: "var(--color-muted-foreground)",
											fontSize: 10
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "var(--color-muted-foreground)",
											fontSize: 10,
											width: 24
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											type: "monotone",
											dataKey: "wind",
											name: "Wind km/h",
											stroke: "var(--color-chart-2)",
											strokeWidth: 2,
											dot: false
										})
									]
								})
							})
						})]
					})
				})]
			})
		] })]
	});
}
function ForecastTab({ profile, weather, weatherLoading }) {
	const [fDays, setFDays] = (0, import_react.useState)(7);
	const [outlookExpanded, setOutlookExpanded] = (0, import_react.useState)(false);
	const { data: outlook, isLoading: outlookLoading } = useQuery({
		queryKey: ["monthly-outlook"],
		queryFn: () => getMonthlyOutlook(),
		enabled: !!profile?.latitude,
		staleTime: 864e5
	});
	const displayForecast = (0, import_react.useMemo)(() => {
		if (!weather?.forecast) return [];
		return weather.forecast.slice(0, fDays);
	}, [weather, fDays]);
	const chartData = (0, import_react.useMemo)(() => displayForecast.map((d) => ({
		date: new Date(d.date).toLocaleDateString(void 0, {
			month: "short",
			day: "numeric"
		}),
		max: Math.round(d.max),
		min: Math.round(d.min),
		rain: parseFloat(d.precipitation.toFixed(1)),
		et0: parseFloat(d.et0.toFixed(1))
	})), [displayForecast]);
	const ol = outlook;
	const trendIcon = (trend) => trend === "above-normal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-orange-500" }) : trend === "below-normal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-4 w-4 text-sky-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4 text-green-500" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					7,
					10,
					16
				].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setFDays(d),
					className: `rounded-full px-4 py-1.5 text-sm font-medium transition-all ${fDays === d ? "bg-ink text-ink-foreground" : "bg-secondary/60 text-muted-foreground hover:bg-secondary"}`,
					children: [
						"Next ",
						d,
						" Days"
					]
				}, d))
			}),
			weatherLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-44 rounded-2xl" }, i))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
					children: displayForecast.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForecastCard, { day }, day.date))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/60 bg-card/85",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted-foreground mb-4",
							children: "Temperature Forecast (°C)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-52",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
									data: chartData,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "gradForecast",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "var(--color-chart-1)",
												stopOpacity: .35
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
											dataKey: "date",
											stroke: "var(--color-muted-foreground)",
											fontSize: 11
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "var(--color-muted-foreground)",
											fontSize: 11,
											width: 28
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											type: "monotone",
											dataKey: "max",
											name: "Max °C",
											stroke: "var(--color-chart-1)",
											fill: "url(#gradForecast)",
											strokeWidth: 2
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											type: "monotone",
											dataKey: "min",
											name: "Min °C",
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/60 bg-card/85",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-muted-foreground mb-4",
								children: "Rainfall Forecast (mm)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
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
												dataKey: "date",
												stroke: "var(--color-muted-foreground)",
												fontSize: 10
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												stroke: "var(--color-muted-foreground)",
												fontSize: 10,
												width: 24
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
												contentStyle: tooltipStyle,
												cursor: { fill: "var(--color-secondary)" }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "rain",
												name: "Rain (mm)",
												fill: "var(--color-chart-2)",
												radius: [
													4,
													4,
													0,
													0
												]
											})
										]
									})
								})
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/60 bg-card/85",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-muted-foreground mb-4",
								children: "Reference ET₀ (mm/day)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
										data: chartData,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "var(--color-border)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "date",
												stroke: "var(--color-muted-foreground)",
												fontSize: 10
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												stroke: "var(--color-muted-foreground)",
												fontSize: 10,
												width: 24
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
												type: "monotone",
												dataKey: "et0",
												name: "ET₀ mm/d",
												stroke: "var(--color-chart-1)",
												strokeWidth: 2,
												dot: false
											})
										]
									})
								})
							})]
						})
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-primary/20 bg-primary/5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wide text-primary",
						children: "Monthly Outlook"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-lg font-bold",
						children: "AI-Generated Extended Forecast"
					})] }), ol?.confidence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "rounded-full",
						children: ["Confidence: ", ol.confidence]
					})]
				}), outlookLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-2xl" }, i))
					})]
				}) : ol ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border/60 bg-card/85 p-3 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-center",
										children: trendIcon(ol.rainfallTrend)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs font-medium",
										children: "Rainfall Trend"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground capitalize",
										children: ol.rainfallTrend?.replace("-", " ")
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border/60 bg-card/85 p-3 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-center",
										children: trendIcon(ol.temperatureTrend)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs font-medium",
										children: "Temp Trend"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground capitalize",
										children: ol.temperatureTrend?.replace("-", " ")
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed",
							children: ol.outlook
						}),
						ol.keyPoints?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold mb-2 uppercase tracking-wide text-muted-foreground",
							children: "Key Points"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1.5",
							children: ol.keyPoints.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 shrink-0 mt-0.5 text-amber-400 fill-amber-400" }), p]
							}, i))
						})] }) : null,
						(ol.farmingOutlook || ol.diseaseOutlook || ol.waterOutlook) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOutlookExpanded((v) => !v),
							className: "text-sm text-primary font-medium hover:underline",
							children: outlookExpanded ? "↑ Show less" : "↓ Show farming details"
						}), outlookExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								ol.farmingOutlook && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-card/85 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2",
										children: "Farming"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: ol.farmingOutlook
									})]
								}),
								ol.diseaseOutlook && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-card/85 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2",
										children: "Disease Outlook"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: ol.diseaseOutlook
									})]
								}),
								ol.waterOutlook && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-card/85 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2",
										children: "Water/Irrigation"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: ol.waterOutlook
									})]
								})
							]
						})] }),
						ol.suggestedActivities?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2",
							children: "Suggested Activities"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: ol.suggestedActivities.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "rounded-full",
								children: a
							}, i))
						})] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground/60 italic",
							children: "⚠ Monthly outlooks are based on 16-day model data and carry inherent uncertainty. Always verify with local forecasts before major farm decisions."
						})
					]
				}) : null]
			})
		]
	});
}
function WeatherPage() {
	const [forceRefresh, setForceRefresh] = (0, import_react.useState)(false);
	const { data: profile, isLoading: profileLoading } = useQuery({
		queryKey: ["profile"],
		queryFn: () => getMyProfile(),
		retry: 0
	});
	const hasLocation = profile?.latitude != null && profile?.longitude != null;
	const isLoggedIn = profile !== void 0 && profile !== null;
	const { data: weather, isLoading: weatherLoading } = useQuery({
		queryKey: ["full-weather"],
		queryFn: () => getFullWeather({ data: { forecastDays: 16 } }),
		enabled: hasLocation,
		staleTime: 18e5
	});
	const { data: aiAnalysis, isLoading: aiLoading, refetch: refetchAI } = useQuery({
		queryKey: ["weather-ai-analysis", forceRefresh],
		queryFn: () => getWeatherAiAnalysis({ data: { force: forceRefresh } }),
		enabled: hasLocation,
		staleTime: 108e5,
		retry: 1
	});
	const handleRefreshAI = () => {
		setForceRefresh(true);
		setTimeout(() => setForceRefresh(false), 3e3);
		refetchAI();
	};
	if (profileLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherSkeleton, {})
	}) });
	if (!isLoggedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className: "h-10 w-10" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold font-display",
				children: "Weather Intelligence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground",
				children: "Get AI-powered farming analysis, soil data, 16-day forecasts, and personalised crop recommendations — all based on your exact farm location."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					className: "rounded-full px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						search: { mode: "signup" },
						children: "Get started"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "lg",
					className: "rounded-full px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						children: "Sign in"
					})
				})]
			})
		]
	}) });
	if (!hasLocation) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
				children: "Weather Intelligence"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-bold font-display",
				children: "Your Farm's Weather Hub"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-border/60 bg-card/85 p-8 text-center lift-shadow",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mx-auto h-12 w-12 text-primary/60 mb-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Set Your Farm Location"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground max-w-md mx-auto",
					children: "Weather Intelligence uses your farm's GPS coordinates to fetch hyper-local weather data, soil conditions, and AI farming analysis. Set your location once in your profile."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6 rounded-full px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/_authenticated/profile",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mr-2 h-4 w-4" }), "Set Farm Location"]
					})
				})
			]
		})]
	}) });
	const location = [profile.district, profile.state].filter(Boolean).join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
					children: "Weather Intelligence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-bold font-display sm:text-3xl",
					children: location ? `${location}` : "Your Farm"
				}),
				location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 flex items-center gap-1.5 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-accent" }),
						profile.latitude?.toFixed(4),
						", ",
						profile.longitude?.toFixed(4)
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: profile.primary_crops?.slice(0, 3).map((crop) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "secondary",
					className: "rounded-full capitalize",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "mr-1 h-3 w-3" }), crop]
				}, crop))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "today",
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "w-full rounded-full bg-ink p-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "today",
							className: "flex-1 rounded-full text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "mr-1.5 h-3.5 w-3.5" }), "Today"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "past",
							className: "flex-1 rounded-full text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { className: "mr-1.5 h-3.5 w-3.5" }), "Past Weather"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "forecast",
							className: "flex-1 rounded-full text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "mr-1.5 h-3.5 w-3.5" }), "Forecast"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "today",
					className: "mt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayTab, {
						profile,
						weather,
						weatherLoading,
						aiAnalysis,
						aiLoading,
						onRefreshAI: handleRefreshAI
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "past",
					className: "mt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PastTab, { profile })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "forecast",
					className: "mt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForecastTab, {
						profile,
						weather,
						weatherLoading
					})
				})
			]
		})]
	}) });
}
//#endregion
export { WeatherPage as component };
