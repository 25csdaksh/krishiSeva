// data.gov.in Agmarknet daily mandi prices. Server-only.
// Resource: 9ef84268-d588-465a-a308-a864a43d0070

export interface MandiPriceRow {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  arrivalDate: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
}

interface FetchOpts {
  commodity?: string;
  state?: string;
  district?: string;
  limit?: number;
}

export async function fetchMandiPrices(opts: FetchOpts = {}): Promise<MandiPriceRow[]> {
  const key = process.env.DATA_GOV_IN_API_KEY;
  if (!key) throw new Error("DATA_GOV_IN_API_KEY is not configured");
  const params = new URLSearchParams({
    "api-key": key,
    format: "json",
    limit: String(opts.limit ?? 50),
  });
  if (opts.commodity) params.set("filters[commodity]", opts.commodity);
  if (opts.state) params.set("filters[state]", opts.state);
  if (opts.district) params.set("filters[district]", opts.district);
  const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`data.gov.in error ${res.status}`);
  const j: any = await res.json();
  return (j.records ?? []).map((r: any) => ({
    state: r.state ?? "",
    district: r.district ?? "",
    market: r.market ?? "",
    commodity: r.commodity ?? "",
    variety: r.variety ?? "",
    arrivalDate: r.arrival_date ?? "",
    minPrice: Number(r.min_price ?? 0),
    maxPrice: Number(r.max_price ?? 0),
    modalPrice: Number(r.modal_price ?? 0),
  }));
}