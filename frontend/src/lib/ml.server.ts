const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

type GatewayContent =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

async function callGateway(messages: { role: string; content: string | GatewayContent[] }[]) {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("AI service is not configured");

  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
    },
    body: JSON.stringify({ model: MODEL, messages }),
  });

  if (res.status === 429) throw new Error("AI is busy right now. Please try again in a minute.");
  if (res.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
  if (!res.ok) throw new Error(`AI request failed (${res.status})`);

  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return json.choices?.[0]?.message?.content ?? "";
}

function extractJson<T>(text: string): T | null {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1)) as T;
  } catch {
    return null;
  }
}

export type LeafResult = {
  disease: string;
  confidence: number;
  remedy: string;
  crop?: string;
};

export async function analyzeLeaf(imageUrl: string, cropName?: string): Promise<LeafResult> {
  const prompt =
    `You are a plant pathologist helping Indian farmers. Look at this leaf photo` +
    (cropName ? ` of a ${cropName} plant` : "") +
    `. Identify the most likely disease (or "Healthy"). Respond ONLY with JSON: ` +
    `{"disease": string, "confidence": number between 0 and 1, "remedy": string with 2-4 short practical steps including any commonly available treatment, "crop": string}`;

  const content = await callGateway([
    {
      role: "user",
      content: [
        { type: "text", text: prompt },
        { type: "image_url", image_url: { url: imageUrl } },
      ],
    },
  ]);

  const parsed = extractJson<LeafResult>(content);
  if (!parsed) throw new Error("Could not read the analysis result. Please try another photo.");
  return {
    disease: parsed.disease ?? "Unknown",
    confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0)),
    remedy: parsed.remedy ?? "",
    crop: parsed.crop ?? cropName,
  };
}

export type CropSuggestion = { crop: string; score: number; reason: string };

export async function recommendCrops(input: Record<string, unknown>): Promise<{
  crops: CropSuggestion[];
  raw: string;
}> {
  const prompt =
    `You are an agronomist advising an Indian farmer. Based on this farm context, recommend the 4 best crops to sow now.\n` +
    `Context: ${JSON.stringify(input)}\n` +
    `Respond ONLY with JSON: {"crops": [{"crop": string, "score": number 0-100, "reason": string one sentence}]}`;

  const content = await callGateway([{ role: "user", content: prompt }]);
  const parsed = extractJson<{ crops: CropSuggestion[] }>(content);
  if (!parsed?.crops?.length) throw new Error("Could not generate recommendations. Please try again.");
  return {
    crops: parsed.crops.map((c) => ({
      crop: String(c.crop),
      score: Math.max(0, Math.min(100, Number(c.score) || 0)),
      reason: String(c.reason ?? ""),
    })),
    raw: content,
  };
}
