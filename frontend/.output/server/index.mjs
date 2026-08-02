globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-25T19:31:19.440Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ce-Rh0aQC8PZ5n9H83+LTZ6XZTKEEg\"",
		"mtime": "2026-07-25T19:31:19.441Z",
		"size": 206,
		"path": "../public/robots.txt"
	},
	"/assets/auth-DRmng3QG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b59-Lp3lI//7lHtvJZr5gQJV2ySiups\"",
		"mtime": "2026-08-02T16:45:13.362Z",
		"size": 2905,
		"path": "../public/assets/auth-DRmng3QG.js"
	},
	"/assets/auth-middleware-JDjVgB0Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14c-E5N3ct+04FLjw+DnBCmxYLSbRrU\"",
		"mtime": "2026-08-02T16:45:13.363Z",
		"size": 332,
		"path": "../public/assets/auth-middleware-JDjVgB0Q.js"
	},
	"/assets/badge-BOtH26fL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"306-EDIo8dGFC2rWsW457o83n8fJsnw\"",
		"mtime": "2026-08-02T16:45:13.365Z",
		"size": 774,
		"path": "../public/assets/badge-BOtH26fL.js"
	},
	"/assets/crop-analysis-DnRNOpu3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b12-RGhPBQ4GjpMst4N/Hjfv5C66dxk\"",
		"mtime": "2026-08-02T16:45:13.369Z",
		"size": 6930,
		"path": "../public/assets/crop-analysis-DnRNOpu3.js"
	},
	"/assets/contact-CSVC82zj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b66-D1djU/y6S/aVJf2nViMwA3cdPVE\"",
		"mtime": "2026-08-02T16:45:13.367Z",
		"size": 2918,
		"path": "../public/assets/contact-CSVC82zj.js"
	},
	"/assets/client-B7qN-9UG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33653-L2Du4V86MBw+Q27e32SUTPo5UyA\"",
		"mtime": "2026-08-02T16:45:13.366Z",
		"size": 210515,
		"path": "../public/assets/client-B7qN-9UG.js"
	},
	"/assets/hero-farmer-CHEmlmKK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61-NjM74PQiRSNro5CptP6Msik6wtk\"",
		"mtime": "2026-08-02T16:45:13.374Z",
		"size": 97,
		"path": "../public/assets/hero-farmer-CHEmlmKK.js"
	},
	"/assets/dist-9qF7KJYU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12033-zb5HlSwI96XqyhDeCrdJmpxLFD4\"",
		"mtime": "2026-08-02T16:45:13.372Z",
		"size": 73779,
		"path": "../public/assets/dist-9qF7KJYU.js"
	},
	"/assets/hero-farmer-DagyZTHV.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e6e9-iolUuqTJh90o+t7ST6/8hqDF3d0\"",
		"mtime": "2026-08-02T16:45:13.433Z",
		"size": 124649,
		"path": "../public/assets/hero-farmer-DagyZTHV.jpg"
	},
	"/assets/dashboard-LNqVAHoe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e753-AstbWm9iKM1xLtTvItUu0mHReDk\"",
		"mtime": "2026-08-02T16:45:13.371Z",
		"size": 386899,
		"path": "../public/assets/dashboard-LNqVAHoe.js"
	},
	"/assets/LanguageSwitcher-DGR4tlXD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1564a-9VE4o0Aem/GFHH01pbnmpHtZ7sY\"",
		"mtime": "2026-08-02T16:45:13.357Z",
		"size": 87626,
		"path": "../public/assets/LanguageSwitcher-DGR4tlXD.js"
	},
	"/assets/leaf-scan-DJ_TVpBh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127a-+zQ+5HjYlW+2MBc3bHQ9GIai0Gw\"",
		"mtime": "2026-08-02T16:45:13.377Z",
		"size": 4730,
		"path": "../public/assets/leaf-scan-DJ_TVpBh.js"
	},
	"/assets/fields-aerial-BhVvSmcw.jpg": {
		"type": "image/jpeg",
		"etag": "\"4eaa5-xgLIIuzvoCHXJL8D2Y/ZteyqWbQ\"",
		"mtime": "2026-08-02T16:45:13.430Z",
		"size": 322213,
		"path": "../public/assets/fields-aerial-BhVvSmcw.jpg"
	},
	"/assets/mandi-prices-s08SDL_P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d64-b9mfO6S+UWkUfQEX2+L6U/7jz0M\"",
		"mtime": "2026-08-02T16:45:13.381Z",
		"size": 3428,
		"path": "../public/assets/mandi-prices-s08SDL_P.js"
	},
	"/assets/loader-circle-jQ8a4gcF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"969-atqW951ilSzPoupJ4iWcKcB9kBM\"",
		"mtime": "2026-08-02T16:45:13.379Z",
		"size": 2409,
		"path": "../public/assets/loader-circle-jQ8a4gcF.js"
	},
	"/assets/index-Qvi4FESl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5eac1-jnAtmyAmpB+kxBVEKpsDVBgYbRc\"",
		"mtime": "2026-08-02T16:45:13.355Z",
		"size": 387777,
		"path": "../public/assets/index-Qvi4FESl.js"
	},
	"/assets/about-BEu2hNxB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"423-SNB/37a3csmxuQsATbP40MS8GWI\"",
		"mtime": "2026-08-02T16:45:13.361Z",
		"size": 1059,
		"path": "../public/assets/about-BEu2hNxB.js"
	},
	"/assets/leaf-BmIU_N9S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-/RybRg+6m3Rw9mzukNH044GT2tg\"",
		"mtime": "2026-08-02T16:45:13.375Z",
		"size": 253,
		"path": "../public/assets/leaf-BmIU_N9S.js"
	},
	"/assets/marketplace-DJvpH238.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c87-t+9mIYwKr6Kyt9KwyYRt7c3rxbk\"",
		"mtime": "2026-08-02T16:45:13.385Z",
		"size": 15495,
		"path": "../public/assets/marketplace-DJvpH238.js"
	},
	"/assets/map-pin-CR5M--Ud.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7-RrOsAKvbL1l7c0pfawzs9Jsb2QU\"",
		"mtime": "2026-08-02T16:45:13.383Z",
		"size": 247,
		"path": "../public/assets/map-pin-CR5M--Ud.js"
	},
	"/assets/market-Dt_PUF_U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86e-GVGQXiJmS12hTvLDHTInMgJ3ID4\"",
		"mtime": "2026-08-02T16:45:13.383Z",
		"size": 2158,
		"path": "../public/assets/market-Dt_PUF_U.js"
	},
	"/assets/matchContext-BQDTO9l1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0-69S7XTXqko4uu7/dhmhH/jdCgmc\"",
		"mtime": "2026-08-02T16:45:13.386Z",
		"size": 160,
		"path": "../public/assets/matchContext-BQDTO9l1.js"
	},
	"/assets/ml.functions-C0xLK-MN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"256-U1958AaiVuMkdZJG3knJj9wBXqs\"",
		"mtime": "2026-08-02T16:45:13.388Z",
		"size": 598,
		"path": "../public/assets/ml.functions-C0xLK-MN.js"
	},
	"/assets/PageShell-BezmMuT4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b13-AE9AUS5d2fz6mAqUaWVADmrRQdI\"",
		"mtime": "2026-08-02T16:45:13.360Z",
		"size": 6931,
		"path": "../public/assets/PageShell-BezmMuT4.js"
	},
	"/assets/profile.functions-DQK04fZF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e1-xvlw4y8jz0v1ic+3k7jppfEAvw8\"",
		"mtime": "2026-08-02T16:45:13.391Z",
		"size": 481,
		"path": "../public/assets/profile.functions-DQK04fZF.js"
	},
	"/assets/profile-C66ylyIr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c34-KUH1F9OMQkbUwpgao/WmTMJwEQ8\"",
		"mtime": "2026-08-02T16:45:13.390Z",
		"size": 11316,
		"path": "../public/assets/profile-C66ylyIr.js"
	},
	"/assets/onboarding-l4ZqQmai.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"215f-oA73j1WfsoiIanYy729m29S0NEk\"",
		"mtime": "2026-08-02T16:45:13.389Z",
		"size": 8543,
		"path": "../public/assets/onboarding-l4ZqQmai.js"
	},
	"/assets/progress-BZ8jydgl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d9-YXlBo/DCHxNCN5X82I6TUH1h0Vk\"",
		"mtime": "2026-08-02T16:45:13.393Z",
		"size": 2265,
		"path": "../public/assets/progress-BZ8jydgl.js"
	},
	"/assets/qss-Bqk2G4CH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc-2N+JPG3965eWSB0QcbrDwgkqrgU\"",
		"mtime": "2026-08-02T16:45:13.395Z",
		"size": 444,
		"path": "../public/assets/qss-Bqk2G4CH.js"
	},
	"/assets/redirect-Dhm19zUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-ePZWCXP5uehkmkGMkMl5xDch+/Y\"",
		"mtime": "2026-08-02T16:45:13.396Z",
		"size": 500,
		"path": "../public/assets/redirect-Dhm19zUi.js"
	},
	"/assets/removable-DCeU5-3W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8d1-Lu360GLV/1MpfcQWiiHam/kfj6U\"",
		"mtime": "2026-08-02T16:45:13.398Z",
		"size": 43217,
		"path": "../public/assets/removable-DCeU5-3W.js"
	},
	"/assets/route-DlKLNXNk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-UvBeRbhUWs12RH9RIuZ9QrgeLtY\"",
		"mtime": "2026-08-02T16:45:13.399Z",
		"size": 139,
		"path": "../public/assets/route-DlKLNXNk.js"
	},
	"/assets/ruler-DBFTbksW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"182-0q1/ebc7b1UcHSjQmSTuY+AX9Rc\"",
		"mtime": "2026-08-02T16:45:13.402Z",
		"size": 386,
		"path": "../public/assets/ruler-DBFTbksW.js"
	},
	"/assets/routes-CKvkv5hh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f79-T+JlvSKzvdq6ikgRmFKyuqsPdEU\"",
		"mtime": "2026-08-02T16:45:13.400Z",
		"size": 8057,
		"path": "../public/assets/routes-CKvkv5hh.js"
	},
	"/assets/scan-line-B39t8YUx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-VRVj6FlbAAj25atodNRzvqe2gSY\"",
		"mtime": "2026-08-02T16:45:13.403Z",
		"size": 319,
		"path": "../public/assets/scan-line-B39t8YUx.js"
	},
	"/assets/schemes.functions-BPV_ts7Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f6-JOHt/9i4zuc9GNf2nK48xMIb1ks\"",
		"mtime": "2026-08-02T16:45:13.409Z",
		"size": 502,
		"path": "../public/assets/schemes.functions-BPV_ts7Q.js"
	},
	"/assets/schemes._slug-BeZL-QSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"113-L7VhbbOZ5AxRMJAErDhPYSFICxo\"",
		"mtime": "2026-08-02T16:45:13.406Z",
		"size": 275,
		"path": "../public/assets/schemes._slug-BeZL-QSj.js"
	},
	"/assets/schemes._slug-C5jfHSg2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f-+gmACGcmPyp2FIyZn5aODLuiJlM\"",
		"mtime": "2026-08-02T16:45:13.408Z",
		"size": 271,
		"path": "../public/assets/schemes._slug-C5jfHSg2.js"
	},
	"/assets/schemes.index-B9N6wKXD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"812-CPIiUhFuhTWpQbYMW/u7NjIfyfk\"",
		"mtime": "2026-08-02T16:45:13.411Z",
		"size": 2066,
		"path": "../public/assets/schemes.index-B9N6wKXD.js"
	},
	"/assets/schemes._slug-BPtwxjnZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"977-IY0jQ70lig1XCLHevRyrNzhoDdw\"",
		"mtime": "2026-08-02T16:45:13.404Z",
		"size": 2423,
		"path": "../public/assets/schemes._slug-BPtwxjnZ.js"
	},
	"/assets/seasonDetector-hVcnLys1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-8FJHXMui5gAw+eczhdJ4WVp+okI\"",
		"mtime": "2026-08-02T16:45:13.412Z",
		"size": 169,
		"path": "../public/assets/seasonDetector-hVcnLys1.js"
	},
	"/assets/select-B5sjTzHD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"572b-lVeCYqBFuQCrY8mZmnONqAJOO2Q\"",
		"mtime": "2026-08-02T16:45:13.413Z",
		"size": 22315,
		"path": "../public/assets/select-B5sjTzHD.js"
	},
	"/assets/tabs-DVDlpxRp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da9-8MxMq9fSUEbdCOfoAG89AT7JGLc\"",
		"mtime": "2026-08-02T16:45:13.417Z",
		"size": 3497,
		"path": "../public/assets/tabs-DVDlpxRp.js"
	},
	"/assets/store-ZSsVSXAd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41c-zu4svd2354zIL9/qpsBM5hmQEJY\"",
		"mtime": "2026-08-02T16:45:13.415Z",
		"size": 1052,
		"path": "../public/assets/store-ZSsVSXAd.js"
	},
	"/assets/styles-BwM71euR.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1657d-WC21ZSYgjCm3VvrFqVCxUksqbwQ\"",
		"mtime": "2026-08-02T16:45:13.434Z",
		"size": 91517,
		"path": "../public/assets/styles-BwM71euR.css"
	},
	"/assets/textarea-KthY52Tf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"204-5DsqAZ0+pCx519BbJXzy3dMlyaA\"",
		"mtime": "2026-08-02T16:45:13.418Z",
		"size": 516,
		"path": "../public/assets/textarea-KthY52Tf.js"
	},
	"/assets/tslib.es6-Tae09705.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42d-qJHuGuq51+EbLaebsBAkbj1JLbk\"",
		"mtime": "2026-08-02T16:45:13.420Z",
		"size": 1069,
		"path": "../public/assets/tslib.es6-Tae09705.js"
	},
	"/assets/upload.functions-DyW7H_DF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e-0AqaYXV/tBujgnTLYe3m7Igj88s\"",
		"mtime": "2026-08-02T16:45:13.421Z",
		"size": 350,
		"path": "../public/assets/upload.functions-DyW7H_DF.js"
	},
	"/assets/useStore-gOS1MpFc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a6e-x+zz0BJb5L9Tt+e2IYN5J20Hk+M\"",
		"mtime": "2026-08-02T16:45:13.425Z",
		"size": 19054,
		"path": "../public/assets/useStore-gOS1MpFc.js"
	},
	"/assets/useRouter-CUzk5ziF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21db-xIbc2pvxA/BoU4UA8XZR4E7p90o\"",
		"mtime": "2026-08-02T16:45:13.423Z",
		"size": 8667,
		"path": "../public/assets/useRouter-CUzk5ziF.js"
	},
	"/assets/weather.functions-CiZyH2cx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"113-vx9btcAL3Xmh8oISNUxvdzYMTL4\"",
		"mtime": "2026-08-02T16:45:13.427Z",
		"size": 275,
		"path": "../public/assets/weather.functions-CiZyH2cx.js"
	},
	"/assets/weather-D3f4y7zn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c3b-7WzhHYU5lvP5im27yfchVELFZsU\"",
		"mtime": "2026-08-02T16:45:13.426Z",
		"size": 3131,
		"path": "../public/assets/weather-D3f4y7zn.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region ../node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_pgCncg = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_pgCncg
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region ../node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region ../node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region ../node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region ../node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
