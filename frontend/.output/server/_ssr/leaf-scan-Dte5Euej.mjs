import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { r as useI18n } from "./i18n-DP5zaQcX.mjs";
import { t as supabase } from "./client-BF5CVcoE.mjs";
import { A as LoaderCircle, P as ImagePlus, y as ScanLine } from "../_libs/lucide-react.mjs";
import { t as Button } from "./LanguageSwitcher-LOwzDG0-.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-BAg5rNwI.mjs";
import { n as Label, t as Input } from "./label-D9W3zZzn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CardContent, t as Card } from "./card-C8hSOhLa.mjs";
import { t as Progress } from "./progress-CTdgI9v6.mjs";
import { r as listMyLeafScans, t as analyzeLeafDisease } from "./ml.functions-B9WsJhI3.mjs";
import { t as createUploadUrl } from "./upload.functions-D-cTzGL1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaf-scan-Dte5Euej.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LeafScan() {
	const { t } = useI18n();
	const queryClient = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [file, setFile] = (0, import_react.useState)(null);
	const [crop, setCrop] = (0, import_react.useState)("");
	const { data: history } = useQuery({
		queryKey: ["leaf-scans"],
		queryFn: () => listMyLeafScans()
	});
	const analyze = useMutation({
		mutationFn: async () => {
			if (!file) throw new Error("Please choose a photo first");
			const { path, token } = await createUploadUrl({ data: {
				kind: "leaf",
				filename: file.name
			} });
			const { error } = await supabase.storage.from("krishi-uploads").uploadToSignedUrl(path, token, file);
			if (error) throw new Error(error.message);
			return analyzeLeafDisease({ data: {
				image_url: path,
				crop_name: crop || void 0
			} });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["leaf-scans"] });
			toast.success(t("leaf.result"));
		},
		onError: (e) => toast.error(e.message)
	});
	const result = analyze.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: t("leaf.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: t("leaf.p")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mt-6 border-border/60 bg-card/70",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => fileRef.current?.click(),
							className: "grid w-full place-items-center rounded-2xl border border-dashed border-border bg-surface/40 p-8 text-center transition-colors hover:border-primary/60",
							children: preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: preview,
								alt: "Selected leaf",
								className: "max-h-64 rounded-xl object-contain"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-8 w-8 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 text-sm text-muted-foreground",
								children: t("leaf.choose")
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/*",
							capture: "environment",
							className: "hidden",
							onChange: (e) => {
								const f = e.target.files?.[0] ?? null;
								setFile(f);
								setPreview(f ? URL.createObjectURL(f) : null);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "crop",
								children: t("leaf.crop")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "crop",
								value: crop,
								onChange: (e) => setCrop(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full rounded-full",
							disabled: !file || analyze.isPending,
							onClick: () => analyze.mutate(),
							children: analyze.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
								" ",
								t("leaf.analyzing")
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "mr-2 h-4 w-4" }),
								" ",
								t("leaf.analyze")
							] })
						})
					]
				})
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mt-6 border-primary/40 bg-primary/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-muted-foreground",
							children: t("leaf.result")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-2xl font-bold",
							children: result.detected_disease
						}),
						result.confidence != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("leaf.confidence") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round(Number(result.confidence) * 100), "%"] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: Number(result.confidence) * 100,
								className: "mt-2"
							})]
						}),
						result.remedy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold",
								children: t("leaf.remedy")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 whitespace-pre-line text-sm text-muted-foreground",
								children: result.remedy
							})]
						})
					]
				})
			}),
			(history?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted-foreground",
					children: t("leaf.history")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2",
					children: history.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/60 bg-surface/50 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: h.detected_disease
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									h.crop_name ?? "—",
									" ·",
									" ",
									new Date(h.created_at).toLocaleDateString()
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs text-muted-foreground",
							children: h.confidence != null ? `${Math.round(Number(h.confidence) * 100)}%` : ""
						})]
					}, h.id))
				})]
			})
		]
	}) });
}
//#endregion
export { LeafScan as component };
