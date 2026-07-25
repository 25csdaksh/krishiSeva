// Python ML microservice (leaf disease + crop recommendation). Server-only.
// The Python service is hosted separately (e.g. Render/Railway/HF Spaces).
// Expected endpoints:
//   POST {ML_SERVICE_URL}/predict/leaf-disease  body: { image_url } -> { disease, confidence, remedy }
//   POST {ML_SERVICE_URL}/predict/crop           body: { N, P, K, temperature, humidity, ph, rainfall, ... }

export interface LeafDiseaseResult {
  disease: string;
  confidence: number;
  remedy: string;
  raw: unknown;
}

export interface CropRecommendationResult {
  recommended: Array<{ crop: string; score: number; reason?: string }>;
  raw: unknown;
}

function baseUrl(): string {
  const url = process.env.ML_SERVICE_URL;
  if (!url) throw new Error("ML_SERVICE_URL is not configured");
  return url.replace(/\/$/, "");
}

function authHeaders(): Record<string, string> {
  const token = process.env.ML_SERVICE_TOKEN;
  const h: Record<string, string> = { "content-type": "application/json" };
  if (token) h["authorization"] = `Bearer ${token}`;
  return h;
}

export async function predictLeafDisease(imageUrl: string): Promise<LeafDiseaseResult> {
  const res = await fetch(`${baseUrl()}/predict/leaf-disease`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ image_url: imageUrl }),
  });
  if (!res.ok) throw new Error(`ML service error ${res.status}`);
  const j: any = await res.json();
  return {
    disease: j.disease ?? j.class ?? "Unknown",
    confidence: Number(j.confidence ?? 0),
    remedy: j.remedy ?? j.treatment ?? "",
    raw: j,
  };
}

export interface CropInput {
  N?: number;
  P?: number;
  K?: number;
  temperature?: number;
  humidity?: number;
  ph?: number;
  rainfall?: number;
  soil_type?: string;
  season?: string;
  state?: string;
  district?: string;
  land_size_hectares?: number;
}

export async function recommendCrop(input: CropInput): Promise<CropRecommendationResult> {
  const res = await fetch(`${baseUrl()}/predict/crop`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`ML service error ${res.status}`);
  const j: any = await res.json();
  const recommended = Array.isArray(j.recommended)
    ? j.recommended
    : Array.isArray(j.crops)
      ? j.crops.map((c: any) => (typeof c === "string" ? { crop: c, score: 1 } : c))
      : j.crop
        ? [{ crop: j.crop, score: Number(j.confidence ?? 1) }]
        : [];
  return { recommended, raw: j };
}