import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { r as useI18n } from "./i18n-DP5zaQcX.mjs";
import { H as CloudSun, M as Landmark, N as IndianRupee, g as Sprout, it as ArrowRight, m as Store, rt as ArrowUpRight, y as ScanLine } from "../_libs/lucide-react.mjs";
import { r as cn, t as Button } from "./LanguageSwitcher-LOwzDG0-.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageShell } from "./PageShell-BAg5rNwI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BNlWU7BJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fields_aerial_default = "/assets/fields-aerial-BhVvSmcw.jpg";
var hero_farmer_default = "/assets/hero-farmer-DagyZTHV.jpg";
/**
* Infinite scrolling carousel. Content is duplicated so the loop is seamless.
* Motion pauses whenever the cursor rests on the track (or on keyboard focus).
*/
function Marquee({ children, direction = "left", speed = 45, className }) {
	const [paused, setPaused] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("marquee-mask group relative overflow-hidden", className),
		onMouseEnter: () => setPaused(true),
		onMouseLeave: () => setPaused(false),
		onFocusCapture: () => setPaused(true),
		onBlurCapture: () => setPaused(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex w-max gap-4 pr-4", direction === "left" ? "marquee-left" : "marquee-right", paused && "marquee-paused"),
			style: { ["--marquee-duration"]: `${speed}s` },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0 gap-4 pr-4",
				children
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0 gap-4 pr-4",
				"aria-hidden": "true",
				children
			})]
		})
	});
}
function Star$1({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className,
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" })
	});
}
function Index() {
	const { t } = useI18n();
	const features = [
		{
			icon: CloudSun,
			title: "home.f1",
			desc: "home.f1d"
		},
		{
			icon: ScanLine,
			title: "home.f2",
			desc: "home.f2d"
		},
		{
			icon: Sprout,
			title: "home.f3",
			desc: "home.f3d"
		},
		{
			icon: Store,
			title: "home.f4",
			desc: "home.f4d"
		},
		{
			icon: IndianRupee,
			title: "home.f5",
			desc: "home.f5d"
		},
		{
			icon: Landmark,
			title: "home.f6",
			desc: "home.f6d"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star$1, { className: "pointer-events-none absolute left-[8%] top-16 h-5 w-5 text-foreground/70 sm:h-7 sm:w-7" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star$1, { className: "pointer-events-none absolute left-[18%] top-48 hidden h-4 w-4 text-foreground/50 sm:block" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star$1, { className: "pointer-events-none absolute right-[10%] top-24 h-5 w-5 text-foreground/70 sm:h-7 sm:w-7" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star$1, { className: "pointer-events-none absolute right-[22%] top-56 hidden h-3.5 w-3.5 text-foreground/40 sm:block" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-3xl px-4 pb-12 pt-10 text-center sm:pt-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-accent" }), t("home.badge")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 text-[2.5rem] font-bold leading-[1.02] sm:text-6xl lg:text-7xl",
							children: t("home.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base",
							children: t("home.subtitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "rounded-full px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/auth",
									search: { mode: "signup" },
									children: [
										t("home.cta"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "rounded-full px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#features",
									children: t("home.cta2")
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-3 sm:px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: fields_aerial_default,
						alt: "Aerial view of green Indian farmland divided into crop fields",
						width: 1920,
						height: 912,
						loading: "eager",
						className: "h-[42vw] max-h-[520px] min-h-[220px] w-full rounded-3xl object-cover"
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto mt-10 max-w-7xl px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid grid-cols-2 divide-border border-y border-border sm:grid-cols-4 sm:divide-x",
				children: [
					["3", "home.stat1"],
					["7", "home.stat2"],
					["8", "home.stat3"],
					["100%", "home.stat4"]
				].map(([value, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-2 py-7 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-display text-2xl font-bold sm:text-3xl",
						children: value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-xs text-muted-foreground",
						children: t(key)
					})]
				}, key))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-[1fr_1.4fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: (/* @__PURE__ */ new Date()).getFullYear()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground",
					children: [
						"Organic Farming",
						"Precision Agriculture",
						"Sustainable Practices"
					].map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tag }, tag))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl leading-snug sm:text-2xl lg:text-3xl",
					children: t("home.statement")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold sm:text-3xl",
						children: t("home.partnerTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm text-muted-foreground",
						children: t("home.partnerDesc")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6 rounded-full px-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							children: [
								t("home.partnerCta"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-1 h-4 w-4" })
							]
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_farmer_default,
						alt: "Farmer checking crops with a smartphone",
						loading: "lazy",
						className: "aspect-[4/3] w-full rounded-2xl object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: fields_aerial_default,
						alt: "Green farmland from above",
						loading: "lazy",
						className: "aspect-[4/3] w-full rounded-2xl object-cover"
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "features",
			className: "py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mb-8 max-w-7xl px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold sm:text-4xl",
						children: t("home.featuresTitle")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: t("home.carouselHint")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {
					speed: 48,
					children: features.map(({ icon: Icon, title, desc }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lift-shadow w-[280px] shrink-0 rounded-3xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1 sm:w-[320px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-11 w-11 place-items-center rounded-2xl bg-accent/12 text-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 text-lg font-semibold",
								children: t(title)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: t(desc)
							})
						]
					}, title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {
					direction: "right",
					speed: 40,
					className: "mt-4",
					children: [
						["home.step1", "home.step1d"],
						["home.step2", "home.step2d"],
						["home.step3", "home.step3d"],
						["home.step4", "home.step4d"]
					].map(([title, desc], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "w-[260px] shrink-0 rounded-3xl border border-border bg-surface p-6 transition-transform duration-300 hover:-translate-y-1 sm:w-[300px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-sm font-bold text-accent",
								children: ["0", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-semibold",
								children: t(title)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: t(desc)
							})
						]
					}, title))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[2rem] bg-ink px-6 py-14 text-center text-ink-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mx-auto max-w-2xl text-2xl font-bold sm:text-4xl",
						children: t("home.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-sm text-ink-foreground/70",
						children: t("home.subtitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						variant: "secondary",
						className: "mt-8 rounded-full px-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/auth",
							search: { mode: "signup" },
							children: [
								t("home.cta"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })
							]
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { Index as component };
