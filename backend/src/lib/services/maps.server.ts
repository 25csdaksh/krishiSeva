// Google Maps Geocoding wrapper. Server-only.

export interface ReverseGeocodeResult {
  formattedAddress: string;
  district: string | null;
  state: string | null;
  country: string | null;
  pincode: string | null;
}

export async function reverseGeocode(lat: number, lon: number): Promise<ReverseGeocodeResult> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error("GOOGLE_MAPS_API_KEY is not configured");
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Maps error ${res.status}`);
  const j: any = await res.json();
  if (j.status !== "OK" || !j.results?.length) {
    return { formattedAddress: "", district: null, state: null, country: null, pincode: null };
  }
  const top = j.results[0];
  const pick = (type: string): string | null => {
    for (const r of j.results) {
      for (const c of r.address_components ?? []) {
        if (c.types?.includes(type)) return c.long_name;
      }
    }
    return null;
  };
  return {
    formattedAddress: top.formatted_address ?? "",
    district: pick("administrative_area_level_2") ?? pick("administrative_area_level_3"),
    state: pick("administrative_area_level_1"),
    country: pick("country"),
    pincode: pick("postal_code"),
  };
}