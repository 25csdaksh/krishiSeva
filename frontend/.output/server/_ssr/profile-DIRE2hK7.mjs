import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime, n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { a as useI18n, i as cn, r as LANGUAGES, t as Button } from "./button-D1j92SdV.mjs";
import { S as LoaderCircle, b as MapPin, i as UserRound, m as Ruler, u as Sprout, w as Languages } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-YdTQi2j-.mjs";
import { n as Label, t as Input } from "./label-CO-aav1W.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CardContent, r as FarmPageHero, t as Card } from "./card-L3kts-Bi.mjs";
import { n as getMyProfile, r as updateMyProfile } from "./profile.functions-B-mYm4Wt.mjs";
import { n as reverseGeocodeCoords } from "./weather.functions-p4uIAZZm.mjs";
import { t as Badge } from "./badge-BleEwmi5.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BlwzUzwc.mjs";
import { t as SEASONS } from "./seasonDetector-BDSgfG_U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-DIRE2hK7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
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
function ProfilePage() {
	const { t, setLang } = useI18n();
	const queryClient = useQueryClient();
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: () => getMyProfile()
	});
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		phone: "",
		district: "",
		state: "",
		land: "",
		crops: "",
		season: "kharif",
		soil: "unknown",
		language: "en",
		latitude: "",
		longitude: ""
	});
	const [locating, setLocating] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!profile) return;
		setForm({
			full_name: profile.full_name ?? "",
			phone: profile.phone ?? "",
			district: profile.district ?? "",
			state: profile.state ?? "",
			land: profile.land_size_hectares != null ? String(profile.land_size_hectares) : "",
			crops: (profile.primary_crops ?? []).join(", "),
			season: profile.current_season ?? "kharif",
			soil: profile.soil_type ?? "unknown",
			language: profile.preferred_language ?? "en",
			latitude: profile.latitude != null ? String(profile.latitude) : "",
			longitude: profile.longitude != null ? String(profile.longitude) : ""
		});
	}, [profile]);
	const save = useMutation({
		mutationFn: () => updateMyProfile({ data: {
			full_name: form.full_name || null,
			phone: form.phone || null,
			district: form.district || null,
			state: form.state || null,
			land_size_hectares: form.land ? Number(form.land) : null,
			primary_crops: form.crops ? form.crops.split(",").map((c) => c.trim()).filter(Boolean) : [],
			current_season: form.season,
			soil_type: form.soil,
			preferred_language: form.language,
			latitude: form.latitude ? Number(form.latitude) : null,
			longitude: form.longitude ? Number(form.longitude) : null
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			setLang(form.language);
			toast.success(t("profile.updated"));
		},
		onError: (e) => toast.error(e.message)
	});
	function refreshLocation() {
		if (!("geolocation" in navigator)) return;
		setLocating(true);
		navigator.geolocation.getCurrentPosition(async (pos) => {
			const lat = Number(pos.coords.latitude.toFixed(5));
			const lon = Number(pos.coords.longitude.toFixed(5));
			try {
				const place = await reverseGeocodeCoords({ data: {
					lat,
					lon
				} });
				setForm((f) => ({
					...f,
					latitude: String(lat),
					longitude: String(lon),
					district: place.district || f.district,
					state: place.state || f.state
				}));
			} finally {
				setLocating(false);
			}
		}, () => {
			setLocating(false);
			toast.error("Please allow location access");
		});
	}
	const displayName = profile?.full_name || form.full_name || "Your farm";
	const initials = displayName.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
	const location = [profile?.district, profile?.state].filter(Boolean).join(", ");
	const crops = profile?.primary_crops ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmPageHero, {
			eyebrow: "Farm identity",
			title: t("profile.title"),
			description: "Keep your farm details current so weather, recommendations, and market tools work around your real context.",
			image: "farmer"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "overflow-hidden border-border/60 bg-card/90 lift-shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 bg-linear-to-r from-primary via-primary/85 to-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "relative p-6 pt-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								className: "-mt-10 h-20 w-20 border-4 border-card bg-primary text-xl font-bold text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									className: "bg-primary text-primary-foreground",
									children: initials || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-8 w-8" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-xl font-bold",
								children: displayName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex items-center gap-1.5 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-accent" }), location || "Add your location"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-secondary/70 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { className: "h-4 w-4 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-lg font-bold",
											children: profile?.land_size_hectares ?? "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Hectares"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-secondary/70 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-4 w-4 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-lg font-bold",
											children: crops.length || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Crops"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
									children: "Growing now"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: crops.length ? crops.map((crop) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "rounded-full capitalize",
										children: crop
									}, crop)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: "No crops added yet"
									})
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/60 bg-secondary/35",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-4 w-4 text-primary" }), " Personalisation"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-muted-foreground",
							children: "Your language, soil, season, and location make every recommendation more useful."
						})]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border/60 bg-card/90 lift-shadow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-6 p-5 sm:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Farm details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Edit the information shown on your farm card and used across Krishi Seva."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "full_name",
									children: t("profile.name")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "full_name",
									value: form.full_name,
									onChange: (e) => setForm({
										...form,
										full_name: e.target.value
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "phone",
									children: t("profile.phone")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "phone",
									value: form.phone,
									onChange: (e) => setForm({
										...form,
										phone: e.target.value
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "district",
									children: t("profile.district")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "district",
									value: form.district,
									onChange: (e) => setForm({
										...form,
										district: e.target.value
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "state",
									children: t("profile.state")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "state",
									value: form.state,
									onChange: (e) => setForm({
										...form,
										state: e.target.value
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							className: "w-full rounded-full sm:w-auto",
							onClick: refreshLocation,
							disabled: locating,
							children: [locating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mr-2 h-4 w-4" }), t("profile.refreshLocation")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "land",
									children: t("profile.land")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "land",
									inputMode: "decimal",
									value: form.land,
									onChange: (e) => setForm({
										...form,
										land: e.target.value
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crops",
									children: t("profile.crops")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crops",
									value: form.crops,
									onChange: (e) => setForm({
										...form,
										crops: e.target.value
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("crop.season") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.season,
									onValueChange: (v) => setForm({
										...form,
										season: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SEASONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: s,
										className: "capitalize",
										children: s
									}, s)) })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("crop.soil") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.soil,
									onValueChange: (v) => setForm({
										...form,
										soil: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SOILS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: s,
										className: "capitalize",
										children: s
									}, s)) })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("profile.language") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.language,
								onValueChange: (v) => setForm({
									...form,
									language: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: l.code,
									children: l.label
								}, l.code)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full rounded-full sm:w-auto sm:px-8",
							disabled: save.isPending,
							onClick: () => save.mutate(),
							children: save.isPending ? t("common.saving") : t("common.save")
						})
					]
				})
			})]
		})]
	}) });
}
//#endregion
export { ProfilePage as component };
