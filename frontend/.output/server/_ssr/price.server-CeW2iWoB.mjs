import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/price.server-CeW2iWoB.js
var RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
var FALLBACK_KEY = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";
async function fetchMandiPrices(params) {
	const key = processModule.env.DATA_GOV_API_KEY || FALLBACK_KEY;
	const url = new URL(`https://api.data.gov.in/resource/${RESOURCE_ID}`);
	url.searchParams.set("api-key", key);
	url.searchParams.set("format", "json");
	url.searchParams.set("limit", String(params.limit ?? 100));
	if (params.commodity) url.searchParams.set("filters[commodity]", params.commodity);
	if (params.state) url.searchParams.set("filters[state]", params.state);
	if (params.district) url.searchParams.set("filters[district]", params.district);
	try {
		const res = await fetch(url.toString());
		if (!res.ok) return {
			records: [],
			error: "Mandi price service unavailable"
		};
		return {
			records: ((await res.json()).records ?? []).map((r) => ({
				commodity: r.commodity ?? "",
				variety: r.variety ?? "",
				market: r.market ?? "",
				district: r.district ?? "",
				state: r.state ?? "",
				arrival_date: r.arrival_date ?? "",
				min_price: Number(r.min_price ?? 0),
				max_price: Number(r.max_price ?? 0),
				modal_price: Number(r.modal_price ?? 0)
			})),
			error: null
		};
	} catch {
		return {
			records: [],
			error: "Mandi price service unavailable"
		};
	}
}
//#endregion
export { fetchMandiPrices };
