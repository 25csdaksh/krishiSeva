// Land-size conversions. All values are stored in hectares in the database.

export type LandUnit = "hectare" | "acre" | "sqft" | "sqyd" | "bigha_pucca" | "bigha_kaccha";

const HECTARES_PER: Record<LandUnit, number> = {
  hectare: 1,
  acre: 0.404686,
  sqft: 0.0000092903,
  sqyd: 0.0000836127,
  // Regional bigha values vary; using common North Indian defaults.
  bigha_pucca: 0.25293,
  bigha_kaccha: 0.1012,
};

export function toHectares(value: number, unit: LandUnit): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Number((value * HECTARES_PER[unit]).toFixed(6));
}

export function fromHectares(hectares: number, unit: LandUnit): number {
  if (!Number.isFinite(hectares) || hectares < 0) return 0;
  return Number((hectares / HECTARES_PER[unit]).toFixed(4));
}