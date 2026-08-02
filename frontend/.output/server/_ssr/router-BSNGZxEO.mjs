import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { t as I18nProvider } from "./i18n-DP5zaQcX.mjs";
import { t as ThemeProvider } from "./theme-DioYQOuF.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as supabase } from "./client-BF5CVcoE.mjs";
import { A as redirect, _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Route$16 } from "./auth-BGrTT5Pz.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$17 } from "./schemes._slug-CheB-neh.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BSNGZxEO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-b4tnIE8y.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Krishi Seva — Smart farming companion" },
			{
				name: "description",
				content: "Weather, crop advice, leaf disease detection, mandi prices and a farmer marketplace in English, Hindi and Gujarati."
			},
			{
				property: "og:title",
				content: "Krishi Seva — Smart farming companion"
			},
			{
				property: "og:description",
				content: "Farm intelligence for Indian farmers, in your language."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Space+Grotesk:wght@500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(I18nProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})] }) })
	});
}
var $$splitComponentImporter$13 = () => import("./routes-BNlWU7BJ.mjs");
var Route$14 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Krishi Seva — Smart farming companion for Indian farmers" },
		{
			name: "description",
			content: "Live weather, AI leaf disease detection, crop recommendations, mandi prices and a direct farmer marketplace — in English, Hindi and Gujarati."
		},
		{
			property: "og:title",
			content: "Krishi Seva — Smart farming companion"
		},
		{
			property: "og:description",
			content: "Everything your farm needs, in one simple app, in your language."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./route-Di7iQBCH.mjs");
var Route$13 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./about-BcA3eTNe.mjs");
var Route$12 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Krishi Seva — Why we built it" },
		{
			name: "description",
			content: "Krishi Seva brings weather, crop guidance, plant health, market rates and government schemes together for small and medium Indian farmers."
		},
		{
			property: "og:title",
			content: "About Krishi Seva"
		},
		{
			property: "og:description",
			content: "A simple digital companion for Indian farmers, in three languages."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./contact-s6Ty0ERt.mjs");
var Route$11 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact Krishi Seva — Support for farmers" },
		{
			name: "description",
			content: "Questions, feedback or trouble using Krishi Seva? Send us a message and our team will get back to you."
		},
		{
			property: "og:title",
			content: "Contact Krishi Seva"
		},
		{
			property: "og:description",
			content: "Get support with the Krishi Seva app."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./market-D0AeSYZl.mjs");
var Route$10 = createFileRoute("/market")({
	head: () => ({ meta: [
		{ title: "Farmer Marketplace — Sell your produce directly | Krishi Seva" },
		{
			name: "description",
			content: "List your crops, set your own price and reach buyers directly through the Krishi Seva farmer marketplace."
		},
		{
			property: "og:title",
			content: "Farmer Marketplace — Krishi Seva"
		},
		{
			property: "og:description",
			content: "Sell your produce directly, without a middleman."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var BASE_URL = "";
var Route$9 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const entries = [
		{
			path: "/",
			changefreq: "weekly",
			priority: "1.0"
		},
		{
			path: "/about",
			changefreq: "monthly",
			priority: "0.7"
		},
		{
			path: "/market",
			changefreq: "monthly",
			priority: "0.7"
		},
		{
			path: "/schemes",
			changefreq: "weekly",
			priority: "0.8"
		},
		{
			path: "/contact",
			changefreq: "yearly",
			priority: "0.5"
		}
	];
	try {
		const { data } = await createClient(processModule.env.SUPABASE_URL, processModule.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		} }).from("schemes").select("slug").eq("is_active", true).limit(500);
		for (const row of data ?? []) entries.push({
			path: `/schemes/${row.slug}`,
			changefreq: "monthly",
			priority: "0.6"
		});
	} catch {}
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...entries.map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$8 = () => import("./weather-C1-M8MeT.mjs");
var Route$8 = createFileRoute("/weather")({
	head: () => ({ meta: [{ title: "Weather Intelligence — Krishi Seva" }, {
		name: "description",
		content: "AI-powered weather intelligence, soil data, farming analysis and 16-day forecast for your farm."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./crop-analysis-BDwuF-E_.mjs");
var Route$7 = createFileRoute("/_authenticated/crop-analysis")({
	head: () => ({ meta: [
		{ title: "Smart Crop Analysis — Krishi Seva" },
		{
			name: "description",
			content: "Get crop recommendations based on your soil, season and location."
		},
		{
			property: "og:title",
			content: "Smart Crop Analysis — Krishi Seva"
		},
		{
			property: "og:description",
			content: "Know what to sow next."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./dashboard-Bp0sfuVo.mjs");
var Route$6 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "Farm Dashboard — Krishi Seva" },
		{
			name: "description",
			content: "Live weather, forecast and quick actions for your farm."
		},
		{
			property: "og:title",
			content: "Farm Dashboard — Krishi Seva"
		},
		{
			property: "og:description",
			content: "Your farm at a glance."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./leaf-scan-Dte5Euej.mjs");
var Route$5 = createFileRoute("/_authenticated/leaf-scan")({
	head: () => ({ meta: [
		{ title: "Leaf Disease Detection — Krishi Seva" },
		{
			name: "description",
			content: "Photograph an affected leaf and get a likely diagnosis with a practical remedy."
		},
		{
			property: "og:title",
			content: "Leaf Disease Detection — Krishi Seva"
		},
		{
			property: "og:description",
			content: "AI plant health checks for your crops."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./mandi-prices-B52jh9CW.mjs");
var Route$4 = createFileRoute("/_authenticated/mandi-prices")({
	head: () => ({ meta: [
		{ title: "Live Mandi Prices — Krishi Seva" },
		{
			name: "description",
			content: "Track commodity prices across Indian markets, states and districts."
		},
		{
			property: "og:title",
			content: "Live Mandi Prices — Krishi Seva"
		},
		{
			property: "og:description",
			content: "Know the rate before you sell."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./marketplace-xsDdQQEA.mjs");
var Route$3 = createFileRoute("/_authenticated/marketplace")({
	head: () => ({ meta: [
		{ title: "Marketplace — Sell and browse produce | Krishi Seva" },
		{
			name: "description",
			content: "List your produce, set your price and browse listings from other farmers."
		},
		{
			property: "og:title",
			content: "Marketplace — Krishi Seva"
		},
		{
			property: "og:description",
			content: "Sell your produce directly."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./onboarding-CuB_Th4m.mjs");
var Route$2 = createFileRoute("/_authenticated/onboarding")({
	head: () => ({ meta: [
		{ title: "Set up your farm — Krishi Seva" },
		{
			name: "description",
			content: "Tell us about your farm to get personalised guidance."
		},
		{
			property: "og:title",
			content: "Set up your farm — Krishi Seva"
		},
		{
			property: "og:description",
			content: "A one-minute setup for personalised advice."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./profile-7YmD98S_.mjs");
var Route$1 = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [
		{ title: "Your Profile — Krishi Seva" },
		{
			name: "description",
			content: "Update your farm details, location and language."
		},
		{
			property: "og:title",
			content: "Your Profile — Krishi Seva"
		},
		{
			property: "og:description",
			content: "Manage your farm details."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./schemes.index-HJfQgvZX.mjs");
var Route = createFileRoute("/schemes/")({
	head: () => ({ meta: [
		{ title: "Government Agriculture Schemes for Farmers | Krishi Seva" },
		{
			name: "description",
			content: "Browse central and state government agriculture schemes, check eligibility and benefits, and find where to apply."
		},
		{
			property: "og:title",
			content: "Government Schemes — Krishi Seva"
		},
		{
			property: "og:description",
			content: "Find agriculture schemes you may be eligible for."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var AuthenticatedRouteRoute = Route$13.update({
	id: "/_authenticated",
	getParentRoute: () => Route$15
});
var AboutRoute = Route$12.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$15
});
var AuthRoute = Route$16.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$15
});
var ContactRoute = Route$11.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$15
});
var MarketRoute = Route$10.update({
	id: "/market",
	path: "/market",
	getParentRoute: () => Route$15
});
var SitemapDotxmlRoute = Route$9.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$15
});
var WeatherRoute = Route$8.update({
	id: "/weather",
	path: "/weather",
	getParentRoute: () => Route$15
});
var AuthenticatedCropAnalysisRoute = Route$7.update({
	id: "/crop-analysis",
	path: "/crop-analysis",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLeafScanRoute = Route$5.update({
	id: "/leaf-scan",
	path: "/leaf-scan",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMandiPricesRoute = Route$4.update({
	id: "/mandi-prices",
	path: "/mandi-prices",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMarketplaceRoute = Route$3.update({
	id: "/marketplace",
	path: "/marketplace",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOnboardingRoute = Route$2.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$1.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var SchemesIndexRoute = Route.update({
	id: "/schemes/",
	path: "/schemes/",
	getParentRoute: () => Route$15
});
var SchemesSlugRoute = Route$17.update({
	id: "/schemes/$slug",
	path: "/schemes/$slug",
	getParentRoute: () => Route$15
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedCropAnalysisRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedLeafScanRoute,
	AuthenticatedMandiPricesRoute,
	AuthenticatedMarketplaceRoute,
	AuthenticatedOnboardingRoute,
	AuthenticatedProfileRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	AuthRoute,
	ContactRoute,
	MarketRoute,
	SitemapDotxmlRoute,
	WeatherRoute,
	SchemesSlugRoute,
	SchemesIndexRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
