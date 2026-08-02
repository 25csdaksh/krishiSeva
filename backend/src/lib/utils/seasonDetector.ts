// Detect Indian agricultural season from a date. Kharif (Jun-Oct), Rabi (Nov-Mar), Zaid (Apr-May).

export type Season = "kharif" | "rabi" | "zaid";

export function detectSeason(date: Date = new Date()): Season {
  const m = date.getMonth() + 1; // 1..12
  if (m >= 6 && m <= 10) return "kharif";
  if (m === 11 || m === 12 || m <= 3) return "rabi";
  return "zaid";
}

export function seasonLabel(s: Season): string {
  return { kharif: "Kharif (Monsoon)", rabi: "Rabi (Winter)", zaid: "Zaid (Summer)" }[s];
}