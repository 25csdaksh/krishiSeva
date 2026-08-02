//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-WzseGPdl.js
var manifest = {
	"000a2ed966cbc68c916c7d3d51be3d4fc0697713b5a4f4ec7d9791ebd86fa5d8": {
		functionName: "reverseGeocodeCoords_createServerFn_handler",
		importer: () => import("./_ssr/weather.functions-CmWhPvJ7.mjs")
	},
	"0124ccd92828d61935c10446ae1b39f499a65361be0e187f476008b4ca24586b": {
		functionName: "updateMarketListing_createServerFn_handler",
		importer: () => import("./_ssr/market.functions-CtO33n_9.mjs")
	},
	"2eebeb51bc92223e1b6abdc9de2d7b287bbd928f2267f91782425393ab99fe7d": {
		functionName: "listMyCropRecommendations_createServerFn_handler",
		importer: () => import("./_ssr/ml.functions-B6any2qj.mjs")
	},
	"5dbf46616266e7bfe81c82694a91090a42de6200b3efc1b9d156faf41ac3a479": {
		functionName: "getMyProfile_createServerFn_handler",
		importer: () => import("./_ssr/profile.functions-rqxTnFI9.mjs")
	},
	"5f2578acf18cc45b132429f0fe803b37c2248d4013e99746260153ce267c4533": {
		functionName: "recommendCropForProfile_createServerFn_handler",
		importer: () => import("./_ssr/ml.functions-B6any2qj.mjs")
	},
	"777e28c58b5dfe8929ff33023f08a7c10f0b9d15dce9c419e50ab673316071de": {
		functionName: "deleteMarketListing_createServerFn_handler",
		importer: () => import("./_ssr/market.functions-CtO33n_9.mjs")
	},
	"920b470ecd47f881c9cd7373edf375310bb85ac51f804b7ae5b2154e89e7de51": {
		functionName: "analyzeLeafDisease_createServerFn_handler",
		importer: () => import("./_ssr/ml.functions-B6any2qj.mjs")
	},
	"95c192446f33383986a9fb9c3e87aa74d7286e207dc00fe47c6957c1e3be1dbe": {
		functionName: "getMandiPrices_createServerFn_handler",
		importer: () => import("./_ssr/price.functions-6cC_USiG.mjs")
	},
	"a2a2645e18c997685097edf441143d2a8d4a6f3cba9cb0213a62001120b3254e": {
		functionName: "completeOnboarding_createServerFn_handler",
		importer: () => import("./_ssr/profile.functions-rqxTnFI9.mjs")
	},
	"af00eb763dce352dc2f42ef901ef426a138feb40fdc7f79166552837a77fae5f": {
		functionName: "updateMyProfile_createServerFn_handler",
		importer: () => import("./_ssr/profile.functions-rqxTnFI9.mjs")
	},
	"b269f6c197a7ed5c607eb298e816906c37dcf5f84c1e2880ce85664308d3b662": {
		functionName: "createMarketListing_createServerFn_handler",
		importer: () => import("./_ssr/market.functions-CtO33n_9.mjs")
	},
	"bab43f377381f85bc380afe3f5d609a7316608f1db4e6bfd44d256b0761db7fd": {
		functionName: "createDownloadUrl_createServerFn_handler",
		importer: () => import("./_ssr/upload.functions-voW6-KbT.mjs")
	},
	"be03a7a132db23b9e4b100ef212dac3539b0398bdb0c2119e65221371fad0854": {
		functionName: "getSchemeBySlug_createServerFn_handler",
		importer: () => import("./_ssr/schemes.functions-BMJryA7W.mjs")
	},
	"c7f62d6b3e92a1e151c3df5612fbfd92abf583ff3af3cd24dd367f3ceb09bb85": {
		functionName: "listMyMarketListings_createServerFn_handler",
		importer: () => import("./_ssr/market.functions-CtO33n_9.mjs")
	},
	"d5ebf9288da2928e756c5304fbbf0160c275e3f4622a068a1ff8e9613e707e3e": {
		functionName: "createUploadUrl_createServerFn_handler",
		importer: () => import("./_ssr/upload.functions-voW6-KbT.mjs")
	},
	"df5665d6c4ef03a002522838b50e8892b627177267cd022ea02c489004475761": {
		functionName: "listMyLeafScans_createServerFn_handler",
		importer: () => import("./_ssr/ml.functions-B6any2qj.mjs")
	},
	"e29ae6ebd414ee72b6f8c176c694d36d885f73af9a8c58137c5771e2e2021540": {
		functionName: "listSchemes_createServerFn_handler",
		importer: () => import("./_ssr/schemes.functions-BMJryA7W.mjs")
	},
	"e7113b46eeba9c39b4fc73c2fba784769d48e4a2f78effc9d72f62f31e1f5d02": {
		functionName: "getWeatherByCoords_createServerFn_handler",
		importer: () => import("./_ssr/weather.functions-CmWhPvJ7.mjs")
	},
	"ede4388f198aa3e0accfe4d1925c295e64822dadfc805bd5305ccbe02aace611": {
		functionName: "listActiveMarketListings_createServerFn_handler",
		importer: () => import("./_ssr/market.functions-CtO33n_9.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
