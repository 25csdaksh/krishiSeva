import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { r as useI18n } from "./i18n-DP5zaQcX.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as supabase } from "./client-BF5CVcoE.mjs";
import { A as LoaderCircle, C as Pencil, n as X, u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { r as cn, t as Button } from "./LanguageSwitcher-LOwzDG0-.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-BAg5rNwI.mjs";
import { a as numberType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { n as Label, t as Input } from "./label-D9W3zZzn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-DjlJAUX2.mjs";
import { n as CardContent, t as Card } from "./card-C8hSOhLa.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { t as createSsrRpc } from "./createSsrRpc-86qWDgp9.mjs";
import { n as getMyProfile } from "./profile.functions-B4uF9Zip.mjs";
import { t as createUploadUrl } from "./upload.functions-D-cTzGL1.mjs";
import { t as Badge } from "./badge-BgmoU9Yq.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CGuXboAy.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Vp3UcoJD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace-xsDdQQEA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var listActiveMarketListings = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	crop: stringType().optional(),
	state: stringType().optional(),
	limit: numberType().optional()
}).default({}).parse(input ?? {})).handler(createSsrRpc("ede4388f198aa3e0accfe4d1925c295e64822dadfc805bd5305ccbe02aace611"));
var listMyMarketListings = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("c7f62d6b3e92a1e151c3df5612fbfd92abf583ff3af3cd24dd367f3ceb09bb85"));
var createMarketListing = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	crop_name: stringType().min(1),
	variety: stringType().optional(),
	quantity: numberType().positive(),
	unit: stringType().min(1),
	price_per_unit: numberType().nonnegative(),
	description: stringType().optional(),
	image_url: stringType().optional(),
	district: stringType().optional(),
	state: stringType().optional()
}).parse(input)).handler(createSsrRpc("b269f6c197a7ed5c607eb298e816906c37dcf5f84c1e2880ce85664308d3b662"));
var updateMarketListing = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType(),
	crop_name: stringType().optional(),
	variety: stringType().nullable().optional(),
	quantity: numberType().optional(),
	unit: stringType().optional(),
	price_per_unit: numberType().optional(),
	description: stringType().nullable().optional(),
	image_url: stringType().nullable().optional(),
	district: stringType().nullable().optional(),
	state: stringType().nullable().optional(),
	status: enumType([
		"active",
		"sold",
		"expired"
	]).optional()
}).parse(input)).handler(createSsrRpc("0124ccd92828d61935c10446ae1b39f499a65361be0e187f476008b4ca24586b"));
var deleteMarketListing = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("777e28c58b5dfe8929ff33023f08a7c10f0b9d15dce9c419e50ab673316071de"));
var UNITS = [
	"kg",
	"quintal",
	"tonne",
	"bag",
	"dozen",
	"piece"
];
var EMPTY = {
	crop_name: "",
	variety: "",
	quantity: "",
	unit: "kg",
	price_per_unit: "",
	description: "",
	image_url: ""
};
function Marketplace() {
	const { t } = useI18n();
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const [file, setFile] = (0, import_react.useState)(null);
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: () => getMyProfile()
	});
	const { data: mine } = useQuery({
		queryKey: ["listings", "mine"],
		queryFn: () => listMyMarketListings()
	});
	const { data: all } = useQuery({
		queryKey: ["listings", "all"],
		queryFn: () => listActiveMarketListings({ data: {} })
	});
	function invalidate() {
		queryClient.invalidateQueries({ queryKey: ["listings"] });
	}
	const save = useMutation({
		mutationFn: async () => {
			let imagePath = form.image_url || void 0;
			if (file) {
				const { path, token } = await createUploadUrl({ data: {
					kind: "product",
					filename: file.name
				} });
				const { error } = await supabase.storage.from("krishi-uploads").uploadToSignedUrl(path, token, file);
				if (error) throw new Error(error.message);
				imagePath = path;
			}
			const base = {
				crop_name: form.crop_name,
				variety: form.variety || void 0,
				quantity: Number(form.quantity),
				unit: form.unit,
				price_per_unit: Number(form.price_per_unit),
				description: form.description || void 0,
				image_url: imagePath,
				district: profile?.district ?? void 0,
				state: profile?.state ?? void 0
			};
			return form.id ? updateMarketListing({ data: {
				id: form.id,
				...base
			} }) : createMarketListing({ data: base });
		},
		onSuccess: () => {
			invalidate();
			setOpen(false);
			setForm(EMPTY);
			setFile(null);
			toast.success(t("common.save"));
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: (id) => deleteMarketListing({ data: { id } }),
		onSuccess: invalidate,
		onError: (e) => toast.error(e.message)
	});
	const markSold = useMutation({
		mutationFn: (id) => updateMarketListing({ data: {
			id,
			status: "sold"
		} }),
		onSuccess: invalidate,
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "truncate text-3xl font-bold",
				children: t("market.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "shrink-0 rounded-full",
				onClick: () => {
					setForm(EMPTY);
					setFile(null);
					setOpen(true);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }),
					" ",
					t("market.add")
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "mine",
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "mine",
					children: t("market.mine")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "all",
					children: t("market.browse")
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "mine",
					className: "mt-4",
					children: (mine?.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("market.empty")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: mine.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-border/60 bg-card/70",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "truncate text-lg font-semibold",
												children: l.crop_name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-xs text-muted-foreground",
												children: l.variety ?? ""
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: l.status === "active" ? "default" : "secondary",
											children: l.status
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 text-sm",
										children: [
											"₹",
											l.price_per_unit,
											" / ",
											l.unit,
											" · ",
											l.quantity,
											" ",
											l.unit
										]
									}),
									l.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 line-clamp-2 text-sm text-muted-foreground",
										children: l.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex flex-wrap gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "outline",
												className: "rounded-full",
												onClick: () => {
													setForm({
														id: l.id,
														crop_name: l.crop_name,
														variety: l.variety ?? "",
														quantity: String(l.quantity),
														unit: l.unit,
														price_per_unit: String(l.price_per_unit),
														description: l.description ?? "",
														image_url: l.image_url ?? ""
													});
													setFile(null);
													setOpen(true);
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-1 h-3.5 w-3.5" }),
													" ",
													t("common.edit")
												]
											}),
											l.status === "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "secondary",
												className: "rounded-full",
												onClick: () => markSold.mutate(l.id),
												children: "Sold"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "ghost",
												className: "rounded-full text-destructive",
												onClick: () => {
													if (window.confirm(t("market.deleteConfirm"))) remove.mutate(l.id);
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1 h-3.5 w-3.5" }),
													" ",
													t("common.delete")
												]
											})
										]
									})
								]
							})
						}, l.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "all",
					className: "mt-4",
					children: (all?.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("market.emptyAll")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: all.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-border/60 bg-card/70",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "truncate text-lg font-semibold",
										children: l.crop_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-primary",
										children: [
											"₹",
											l.price_per_unit,
											" / ",
											l.unit
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											l.quantity,
											" ",
											l.unit,
											l.district ? ` · ${l.district}` : ""
										]
									}),
									l.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 line-clamp-3 text-sm text-muted-foreground",
										children: l.description
									})
								]
							})
						}, l.id))
					})
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: form.id ? t("market.editTitle") : t("market.add") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "crop_name",
							children: t("market.crop")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "crop_name",
							value: form.crop_name,
							onChange: (e) => setForm({
								...form,
								crop_name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "variety",
							children: t("market.variety")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "variety",
							value: form.variety,
							onChange: (e) => setForm({
								...form,
								variety: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "quantity",
								children: t("market.quantity")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "quantity",
								inputMode: "decimal",
								value: form.quantity,
								onChange: (e) => setForm({
									...form,
									quantity: e.target.value
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("market.unit") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.unit,
								onValueChange: (v) => setForm({
									...form,
									unit: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: UNITS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: u,
									children: u
								}, u)) })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "price",
							children: t("market.price")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "price",
							inputMode: "decimal",
							value: form.price_per_unit,
							onChange: (e) => setForm({
								...form,
								price_per_unit: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "desc",
							children: t("market.description")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "desc",
							rows: 3,
							value: form.description,
							onChange: (e) => setForm({
								...form,
								description: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "photo",
							children: t("market.photo")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "photo",
							type: "file",
							accept: "image/*",
							onChange: (e) => setFile(e.target.files?.[0] ?? null)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "flex-1 rounded-full",
							onClick: () => setOpen(false),
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "flex-1 rounded-full",
							disabled: save.isPending || !form.crop_name,
							onClick: () => save.mutate(),
							children: save.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
								" ",
								t("common.saving")
							] }) : t("common.save")
						})]
					})
				]
			})]
		})
	})] });
}
//#endregion
export { Marketplace as component };
