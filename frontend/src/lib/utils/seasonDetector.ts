export type Season = "kharif" | "rabi" | "zaid" | "summer" | "winter";

export const SEASONS: Season[] = ["kharif", "rabi", "zaid", "summer", "winter"];

/**
 * Indian cropping-season heuristic based on the current month.
 * Kharif: Jun-Oct, Rabi: Nov-Mar, Zaid: Apr-May
 */
export function detectSeason(date: Date = new Date()): Season {
  const m = date.getMonth() + 1;
  if (m >= 6 && m <= 10) return "kharif";
  if (m >= 11 || m <= 3) return "rabi";
  return "zaid";
}
