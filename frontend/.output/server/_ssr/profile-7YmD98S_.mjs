import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { n as LANGUAGES, r as useI18n } from "./i18n-DP5zaQcX.mjs";
import { A as LoaderCircle, O as MapPin } from "../_libs/lucide-react.mjs";
import { t as Button } from "./LanguageSwitcher-LOwzDG0-.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-BAg5rNwI.mjs";
import { n as Label, t as Input } from "./label-D9W3zZzn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CardContent, t as Card } from "./card-C8hSOhLa.mjs";
import { n as getMyProfile, r as updateMyProfile } from "./profile.functions-B4uF9Zip.mjs";
import { s as reverseGeocodeCoords } from "./weather.functions-BuBi-imh.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Vp3UcoJD.mjs";
import { t as SEASONS } from "./seasonDetector-BDSgfG_U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-7YmD98S_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold",
			children: t("profile.title")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-6 border-border/60 bg-card/70",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
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
						className: "w-full rounded-full",
						onClick: refreshLocation,
						disabled: locating,
						children: [locating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mr-2 h-4 w-4" }), t("profile.refreshLocation")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
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
						className: "w-full rounded-full",
						disabled: save.isPending,
						onClick: () => save.mutate(),
						children: save.isPending ? t("common.saving") : t("common.save")
					})
				]
			})
		})]
	}) });
}
//#endregion
export { ProfilePage as component };
