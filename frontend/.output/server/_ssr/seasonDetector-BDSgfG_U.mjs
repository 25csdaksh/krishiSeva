//#region node_modules/.nitro/vite/services/ssr/assets/seasonDetector-BDSgfG_U.js
var SEASONS = [
	"kharif",
	"rabi",
	"zaid",
	"summer",
	"winter"
];
/**
* Indian cropping-season heuristic based on the current month.
* Kharif: Jun-Oct, Rabi: Nov-Mar, Zaid: Apr-May
*/
function detectSeason(date = /* @__PURE__ */ new Date()) {
	const m = date.getMonth() + 1;
	if (m >= 6 && m <= 10) return "kharif";
	if (m >= 11 || m <= 3) return "rabi";
	return "zaid";
}
//#endregion
export { detectSeason as n, SEASONS as t };
