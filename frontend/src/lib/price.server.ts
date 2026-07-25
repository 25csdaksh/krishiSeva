export type MandiPrice = {
  commodity: string;
  variety: string;
  market: string;
  district: string;
  state: string;
  arrival_date: string;
  min_price: number;
  max_price: number;
  modal_price: number;
};

const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
// Public sample key published by data.gov.in for open datasets.
const FALLBACK_KEY = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";

export async function fetchMandiPrices(params: {
  commodity?: string;
  state?: string;
  district?: string;
  limit?: number;
}): Promise<{ records: MandiPrice[]; error: string | null }> {
  const key = process.env.DATA_GOV_API_KEY || FALLBACK_KEY;
  const url = new URL(`https://api.data.gov.in/resource/${RESOURCE_ID}`);
  url.searchParams.set("api-key", key);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", String(params.limit ?? 100));
  if (params.commodity) url.searchParams.set("filters[commodity]", params.commodity);
  if (params.state) url.searchParams.set("filters[state]", params.state);
  if (params.district) url.searchParams.set("filters[district]", params.district);

  try {
    const res = await fetch(url.toString());
    if (!res.ok) return { records: [], error: "Mandi price service unavailable" };
    const json = (await res.json()) as { records?: Record<string, string>[] };
    const records = (json.records ?? []).map((r) => ({
      commodity: r.commodity ?? "",
      variety: r.variety ?? "",
      market: r.market ?? "",
      district: r.district ?? "",
      state: r.state ?? "",
      arrival_date: r.arrival_date ?? "",
      min_price: Number(r.min_price ?? 0),
      max_price: Number(r.max_price ?? 0),
      modal_price: Number(r.modal_price ?? 0),
    }));
    return { records, error: null };
  } catch {
    return { records: [], error: "Mandi price service unavailable" };
  }
}
