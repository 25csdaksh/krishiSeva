import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/ml.server-B7N2_2Sr.js
var GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
var MODEL = "google/gemini-2.5-flash";
async function callGateway(messages) {
	const key = processModule.env.LOVABLE_API_KEY;
	if (!key) throw new Error("AI service is not configured");
	const res = await fetch(GATEWAY_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Lovable-API-Key": key
		},
		body: JSON.stringify({
			model: MODEL,
			messages
		})
	});
	if (res.status === 429) throw new Error("AI is busy right now. Please try again in a minute.");
	if (res.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
	if (!res.ok) throw new Error(`AI request failed (${res.status})`);
	return (await res.json()).choices?.[0]?.message?.content ?? "";
}
function extractJson(text) {
	const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
	const start = cleaned.indexOf("{");
	const end = cleaned.lastIndexOf("}");
	if (start === -1 || end === -1) return null;
	try {
		return JSON.parse(cleaned.slice(start, end + 1));
	} catch {
		return null;
	}
}
async function analyzeLeaf(imageUrl, cropName) {
	const parsed = extractJson(await callGateway([{
		role: "user",
		content: [{
			type: "text",
			text: `You are a plant pathologist helping Indian farmers. Look at this leaf photo` + (cropName ? ` of a ${cropName} plant` : "") + ". Identify the most likely disease (or \"Healthy\"). Respond ONLY with JSON: {\"disease\": string, \"confidence\": number between 0 and 1, \"remedy\": string with 2-4 short practical steps including any commonly available treatment, \"crop\": string}"
		}, {
			type: "image_url",
			image_url: { url: imageUrl }
		}]
	}]));
	if (!parsed) throw new Error("Could not read the analysis result. Please try another photo.");
	return {
		disease: parsed.disease ?? "Unknown",
		confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0)),
		remedy: parsed.remedy ?? "",
		crop: parsed.crop ?? cropName
	};
}
async function recommendCrops(input) {
	const content = await callGateway([{
		role: "user",
		content: `You are an agronomist advising an Indian farmer. Based on this farm context, recommend the 4 best crops to sow now.\nContext: ${JSON.stringify(input)}\nRespond ONLY with JSON: {"crops": [{"crop": string, "score": number 0-100, "reason": string one sentence}]}`
	}]);
	const parsed = extractJson(content);
	if (!parsed?.crops?.length) throw new Error("Could not generate recommendations. Please try again.");
	return {
		crops: parsed.crops.map((c) => ({
			crop: String(c.crop),
			score: Math.max(0, Math.min(100, Number(c.score) || 0)),
			reason: String(c.reason ?? "")
		})),
		raw: content
	};
}
//#endregion
export { analyzeLeaf, recommendCrops };
