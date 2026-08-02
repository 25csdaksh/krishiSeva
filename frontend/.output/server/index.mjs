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
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ce-Rh0aQC8PZ5n9H83+LTZ6XZTKEEg\"",
		"mtime": "2026-08-02T17:27:31.809Z",
		"size": 206,
		"path": "../public/robots.txt"
	},
	"/assets/auth-CQyzdYBd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b88-8AYMKSUTdTghTtzt6tHtggH01Qk\"",
		"mtime": "2026-08-02T17:41:23.686Z",
		"size": 2952,
		"path": "../public/assets/auth-CQyzdYBd.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-02T17:27:31.808Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/about-QQZk3xvU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"423-u2XEg+4vMkdcGVKFFprWYe9/wzw\"",
		"mtime": "2026-08-02T17:41:23.685Z",
		"size": 1059,
		"path": "../public/assets/about-QQZk3xvU.js"
	},
	"/assets/auth-middleware-1MccCxzG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-Yrrh6kE+NhR56hIsyNi7fb2F828\"",
		"mtime": "2026-08-02T17:41:23.686Z",
		"size": 77,
		"path": "../public/assets/auth-middleware-1MccCxzG.js"
	},
	"/assets/badge-DEdzz8Si.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"312-eA9eGODfPQoyr55igni8GUsfjWQ\"",
		"mtime": "2026-08-02T17:41:23.687Z",
		"size": 786,
		"path": "../public/assets/badge-DEdzz8Si.js"
	},
	"/assets/card-C5GTP8bD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"417-6P5REdDABqF65kNFTuZivEn6O0U\"",
		"mtime": "2026-08-02T17:41:23.688Z",
		"size": 1047,
		"path": "../public/assets/card-C5GTP8bD.js"
	},
	"/assets/AreaChart-D_MbLY7l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c8ac-ogm+u6IByTrI37GsM28TYbszaYQ\"",
		"mtime": "2026-08-02T17:41:23.681Z",
		"size": 379052,
		"path": "../public/assets/AreaChart-D_MbLY7l.js"
	},
	"/assets/contact-DzC2u0cN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bae-vGHe+4w7YaiF8y+GUFdH3jeZccY\"",
		"mtime": "2026-08-02T17:41:23.691Z",
		"size": 2990,
		"path": "../public/assets/contact-DzC2u0cN.js"
	},
	"/assets/cloud-sun-D7aGxa7M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187-/Azg2xV0FtfqlGEg1HGur4C/OLc\"",
		"mtime": "2026-08-02T17:41:23.690Z",
		"size": 391,
		"path": "../public/assets/cloud-sun-D7aGxa7M.js"
	},
	"/assets/createServerFn-BrDU27je.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1142-4SvzcoqrFhiQvcL2syfoKoSX8ds\"",
		"mtime": "2026-08-02T17:41:23.693Z",
		"size": 4418,
		"path": "../public/assets/createServerFn-BrDU27je.js"
	},
	"/assets/crop-analysis-B3521BjU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ace-DvNLx7iNXhL1O9DTC5OPxlN/w50\"",
		"mtime": "2026-08-02T17:41:23.694Z",
		"size": 6862,
		"path": "../public/assets/crop-analysis-B3521BjU.js"
	},
	"/assets/dashboard-tAHqeyR9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b25-1OQt4BSiKbjZEyfpfltfNrLZsjA\"",
		"mtime": "2026-08-02T17:41:23.695Z",
		"size": 6949,
		"path": "../public/assets/dashboard-tAHqeyR9.js"
	},
	"/assets/client-DIK-rfKJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34019-rY6fcbOxdmRdhIiKXWFz3EeLmLs\"",
		"mtime": "2026-08-02T17:41:23.690Z",
		"size": 213017,
		"path": "../public/assets/client-DIK-rfKJ.js"
	},
	"/assets/i18n-5KzTrLfD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b6a-X1TJsLAsYPC/tc9zDurE25EVUC0\"",
		"mtime": "2026-08-02T17:41:23.697Z",
		"size": 39786,
		"path": "../public/assets/i18n-5KzTrLfD.js"
	},
	"/assets/hero-farmer-DagyZTHV.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e6e9-iolUuqTJh90o+t7ST6/8hqDF3d0\"",
		"mtime": "2026-08-02T17:41:23.737Z",
		"size": 124649,
		"path": "../public/assets/hero-farmer-DagyZTHV.jpg"
	},
	"/assets/leaf-B5J6-7dP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-qHsxMTZxOk0f5l5FLR1XW2kPNxw\"",
		"mtime": "2026-08-02T17:41:23.699Z",
		"size": 265,
		"path": "../public/assets/leaf-B5J6-7dP.js"
	},
	"/assets/label-DNjdyjdz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"486-irDdY9d7RFEU0UKU0j2DBL2U2S0\"",
		"mtime": "2026-08-02T17:41:23.698Z",
		"size": 1158,
		"path": "../public/assets/label-DNjdyjdz.js"
	},
	"/assets/leaf-scan-Cto9sNly.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131e-vdbb3IDyao54EtEK6rycmoT21Lk\"",
		"mtime": "2026-08-02T17:41:23.701Z",
		"size": 4894,
		"path": "../public/assets/leaf-scan-Cto9sNly.js"
	},
	"/assets/mandi-prices-BkWn2Ujo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c8-HnWU1nbz1yKsckOxjanCuT3MEzg\"",
		"mtime": "2026-08-02T17:41:23.702Z",
		"size": 5064,
		"path": "../public/assets/mandi-prices-BkWn2Ujo.js"
	},
	"/assets/loader-circle-CpFbOa68.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"955-EtwXcw3JufrkE7zAGLz4JbbuNrw\"",
		"mtime": "2026-08-02T17:41:23.702Z",
		"size": 2389,
		"path": "../public/assets/loader-circle-CpFbOa68.js"
	},
	"/assets/LanguageSwitcher-Bnq_hbop.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d971-Bm4ftTMBxlcb7RBQoWePoFGzdZg\"",
		"mtime": "2026-08-02T17:41:23.683Z",
		"size": 121201,
		"path": "../public/assets/LanguageSwitcher-Bnq_hbop.js"
	},
	"/assets/fields-aerial-BhVvSmcw.jpg": {
		"type": "image/jpeg",
		"etag": "\"4eaa5-xgLIIuzvoCHXJL8D2Y/ZteyqWbQ\"",
		"mtime": "2026-08-02T17:41:23.736Z",
		"size": 322213,
		"path": "../public/assets/fields-aerial-BhVvSmcw.jpg"
	},
	"/assets/index-DBAmdMTL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6493b-ZAZumDOFOi8WnrNmhEG7SK/pHvA\"",
		"mtime": "2026-08-02T17:41:23.680Z",
		"size": 411963,
		"path": "../public/assets/index-DBAmdMTL.js"
	},
	"/assets/map-pin-BKqPY4j2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-evrnwNSG4yEmp+8mdcepiR/9f1E\"",
		"mtime": "2026-08-02T17:41:23.703Z",
		"size": 259,
		"path": "../public/assets/map-pin-BKqPY4j2.js"
	},
	"/assets/market-BkCr1_T1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"839-XWIl/KOrrW+N2uhhN53NwwAx+J0\"",
		"mtime": "2026-08-02T17:41:23.704Z",
		"size": 2105,
		"path": "../public/assets/market-BkCr1_T1.js"
	},
	"/assets/matchContext-BhL48mLO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0-f1VOeIxVkrajeG1tojORCq0Zxng\"",
		"mtime": "2026-08-02T17:41:23.705Z",
		"size": 160,
		"path": "../public/assets/matchContext-BhL48mLO.js"
	},
	"/assets/marketplace-CipFZU8O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a4d-7qFg13bCRmnUhnZo4RceiSYZlUE\"",
		"mtime": "2026-08-02T17:41:23.705Z",
		"size": 14925,
		"path": "../public/assets/marketplace-CipFZU8O.js"
	},
	"/assets/ml.functions-D_7RkXbf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-eCT56/i3lkRsa58bseN6szUeMhc\"",
		"mtime": "2026-08-02T17:41:23.706Z",
		"size": 636,
		"path": "../public/assets/ml.functions-D_7RkXbf.js"
	},
	"/assets/onboarding-X0GbccuJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"218a-TUWFqUmR5vJPmDudY7UcruurNHg\"",
		"mtime": "2026-08-02T17:41:23.708Z",
		"size": 8586,
		"path": "../public/assets/onboarding-X0GbccuJ.js"
	},
	"/assets/PageShell-CPfaufiC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b1e-jlL0olcy046vgH78K6UCEvxiWdQ\"",
		"mtime": "2026-08-02T17:41:23.684Z",
		"size": 6942,
		"path": "../public/assets/PageShell-CPfaufiC.js"
	},
	"/assets/profile-D-L00cFd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1533-OlYrKaLTmbvvrzy0rTA80YCqUBQ\"",
		"mtime": "2026-08-02T17:41:23.709Z",
		"size": 5427,
		"path": "../public/assets/profile-D-L00cFd.js"
	},
	"/assets/profile.functions-BsWOTuHY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"207-aQgPyjJLdWu17KUalnq6jSlKHnA\"",
		"mtime": "2026-08-02T17:41:23.710Z",
		"size": 519,
		"path": "../public/assets/profile.functions-BsWOTuHY.js"
	},
	"/assets/progress-B3EJDrzf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b9-sexheGTZcmnYAwTixPxa7Wg7nuc\"",
		"mtime": "2026-08-02T17:41:23.711Z",
		"size": 2233,
		"path": "../public/assets/progress-B3EJDrzf.js"
	},
	"/assets/qss-Bqk2G4CH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc-2N+JPG3965eWSB0QcbrDwgkqrgU\"",
		"mtime": "2026-08-02T17:41:23.712Z",
		"size": 444,
		"path": "../public/assets/qss-Bqk2G4CH.js"
	},
	"/assets/redirect-Dhm19zUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-ePZWCXP5uehkmkGMkMl5xDch+/Y\"",
		"mtime": "2026-08-02T17:41:23.713Z",
		"size": 500,
		"path": "../public/assets/redirect-Dhm19zUi.js"
	},
	"/assets/scan-line-CpXBHAr0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14b-HvRf0LP+CZuagUCZ+FhxMS0JlOg\"",
		"mtime": "2026-08-02T17:41:23.716Z",
		"size": 331,
		"path": "../public/assets/scan-line-CpXBHAr0.js"
	},
	"/assets/routes-CoM2p9SO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fdc-c12qAkVIayDWtvLH9dupNCa//Fg\"",
		"mtime": "2026-08-02T17:41:23.716Z",
		"size": 8156,
		"path": "../public/assets/routes-CoM2p9SO.js"
	},
	"/assets/schemes.functions-BYPoeMHm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"228-LxIuVijWu2DQTrY0NCC473UjHYU\"",
		"mtime": "2026-08-02T17:41:23.721Z",
		"size": 552,
		"path": "../public/assets/schemes.functions-BYPoeMHm.js"
	},
	"/assets/route-BFRW0xxK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-cwIS9zMoHBt6wlkEAtYta49chiw\"",
		"mtime": "2026-08-02T17:41:23.714Z",
		"size": 139,
		"path": "../public/assets/route-BFRW0xxK.js"
	},
	"/assets/schemes.index-D9PFLRnn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86a-LX4S1C58rwbARyOg9Ky151Dih+k\"",
		"mtime": "2026-08-02T17:41:23.722Z",
		"size": 2154,
		"path": "../public/assets/schemes.index-D9PFLRnn.js"
	},
	"/assets/schemes._slug-Civ9AyqS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f-njfXdQgjArk4mA8mU0GPLe/faKo\"",
		"mtime": "2026-08-02T17:41:23.718Z",
		"size": 271,
		"path": "../public/assets/schemes._slug-Civ9AyqS.js"
	},
	"/assets/schemes._slug-DpjCPRbk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f5-pS5t8sdzU6eC8RwIwjwfD1xLbag\"",
		"mtime": "2026-08-02T17:41:23.719Z",
		"size": 2549,
		"path": "../public/assets/schemes._slug-DpjCPRbk.js"
	},
	"/assets/seasonDetector-hVcnLys1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-8FJHXMui5gAw+eczhdJ4WVp+okI\"",
		"mtime": "2026-08-02T17:41:23.723Z",
		"size": 169,
		"path": "../public/assets/seasonDetector-hVcnLys1.js"
	},
	"/assets/schemes._slug-s7Ta-emK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"113-IBK1M23dRYNugMDuHrSbJM8xz5o\"",
		"mtime": "2026-08-02T17:41:23.720Z",
		"size": 275,
		"path": "../public/assets/schemes._slug-s7Ta-emK.js"
	},
	"/assets/skeleton-Bfa1KlV_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed-U236h7PQy8VRm+YETueYqlxsTdM\"",
		"mtime": "2026-08-02T17:41:23.724Z",
		"size": 237,
		"path": "../public/assets/skeleton-Bfa1KlV_.js"
	},
	"/assets/select-CIJPkL5D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5747-Kg6GQZmeViZNpKSgqhfWXlzDk08\"",
		"mtime": "2026-08-02T17:41:23.723Z",
		"size": 22343,
		"path": "../public/assets/select-CIJPkL5D.js"
	},
	"/assets/store-BgJX5z23.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e0-EiMDK6bu3TNWn10S8/0avK/H5/c\"",
		"mtime": "2026-08-02T17:41:23.726Z",
		"size": 736,
		"path": "../public/assets/store-BgJX5z23.js"
	},
	"/assets/tabs-CQiTWGec.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d89-s0qHSZjHJg9jnOxAbxE1TXeO4js\"",
		"mtime": "2026-08-02T17:41:23.727Z",
		"size": 3465,
		"path": "../public/assets/tabs-CQiTWGec.js"
	},
	"/assets/styles-b4tnIE8y.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1690a-QA4I52gGoR3XijzZfEmUtAAb+rI\"",
		"mtime": "2026-08-02T17:41:23.739Z",
		"size": 92426,
		"path": "../public/assets/styles-b4tnIE8y.css"
	},
	"/assets/upload.functions-B2eEsroX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184-hm8C7XM/NWLX52M44RbkiXo9jqY\"",
		"mtime": "2026-08-02T17:41:23.729Z",
		"size": 388,
		"path": "../public/assets/upload.functions-B2eEsroX.js"
	},
	"/assets/useQuery-Dxrjxz8O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2248-SZSJdc20PcBQrrtCAvjo/y2DC4Y\"",
		"mtime": "2026-08-02T17:41:23.731Z",
		"size": 8776,
		"path": "../public/assets/useQuery-Dxrjxz8O.js"
	},
	"/assets/useStore-CU4PVQ0Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a6e-WRhdVF4vhf3xpk4NxfEin44d4YI\"",
		"mtime": "2026-08-02T17:41:23.733Z",
		"size": 19054,
		"path": "../public/assets/useStore-CU4PVQ0Y.js"
	},
	"/assets/useRouter-BzYNxvEH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f1-GaZ14unIDzStES5r8nMGI+9WE4M\"",
		"mtime": "2026-08-02T17:41:23.732Z",
		"size": 8689,
		"path": "../public/assets/useRouter-BzYNxvEH.js"
	},
	"/assets/weather-Pw0Kpp_I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cbcc-qtlqtD+DcOiIbtSy1FJp07uXxxM\"",
		"mtime": "2026-08-02T17:41:23.734Z",
		"size": 52172,
		"path": "../public/assets/weather-Pw0Kpp_I.js"
	},
	"/assets/textarea-DfUBe8pr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"210-978DDiz44tHLZo1FsUeBM9ztGTo\"",
		"mtime": "2026-08-02T17:41:23.728Z",
		"size": 528,
		"path": "../public/assets/textarea-DfUBe8pr.js"
	},
	"/assets/weather.functions-BF9w1y1Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3cd-1hQuwxzjjpINyjdyUKkQLvXeoE4\"",
		"mtime": "2026-08-02T17:41:23.735Z",
		"size": 973,
		"path": "../public/assets/weather.functions-BF9w1y1Y.js"
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
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
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
var _lazy_hnhCko = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_hnhCko
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
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
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
//#region node_modules/nitro/dist/runtime/internal/app.mjs
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
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
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
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
