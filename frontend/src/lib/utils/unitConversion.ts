export type AreaUnit = "hectare" | "acre" | "sqft" | "sqyard";

export const AREA_UNITS: { value: AreaUnit; label: string }[] = [
  { value: "hectare", label: "Hectare" },
  { value: "acre", label: "Acre" },
  { value: "sqft", label: "Square feet" },
  { value: "sqyard", label: "Square yard" },
];

/** Multiplier: 1 unit === X hectares */
const TO_HECTARE: Record<AreaUnit, number> = {
  hectare: 1,
  acre: 0.404686,
  sqft: 0.0000092903,
  sqyard: 0.000083613,
};

export function toHectares(value: number, unit: AreaUnit): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Number((value * TO_HECTARE[unit]).toFixed(6));
}

export function fromHectares(hectares: number, unit: AreaUnit): number {
  if (!Number.isFinite(hectares) || hectares <= 0) return 0;
  return Number((hectares / TO_HECTARE[unit]).toFixed(4));
}

/** Area from length x breadth expressed in a linear unit matching the area unit. */
export function areaFromDimensions(length: number, breadth: number): number {
  if (!Number.isFinite(length) || !Number.isFinite(breadth)) return 0;
  return length * breadth;
}
