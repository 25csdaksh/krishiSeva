// OpenWeatherMap current weather + 5-day forecast wrapper. Server-only.

export interface WeatherSnapshot {
  location: string;
  tempC: number;
  feelsLikeC: number;
  humidity: number;
  windKph: number;
  condition: string;
  icon: string;
  observedAt: string;
}

export interface ForecastEntry {
  date: string;
  minC: number;
  maxC: number;
  condition: string;
  icon: string;
  precipMm: number;
}

function requireKey(): string {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) throw new Error("OPENWEATHER_API_KEY is not configured");
  return key;
}

export async function fetchCurrentWeather(lat: number, lon: number): Promise<WeatherSnapshot> {
  const key = requireKey();
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenWeatherMap error ${res.status}`);
  const j: any = await res.json();
  return {
    location: `${j.name ?? ""}${j.sys?.country ? ", " + j.sys.country : ""}`,
    tempC: j.main?.temp,
    feelsLikeC: j.main?.feels_like,
    humidity: j.main?.humidity,
    windKph: Math.round((j.wind?.speed ?? 0) * 3.6 * 10) / 10,
    condition: j.weather?.[0]?.description ?? "",
    icon: j.weather?.[0]?.icon ?? "",
    observedAt: new Date((j.dt ?? Date.now() / 1000) * 1000).toISOString(),
  };
}

export async function fetchForecast(lat: number, lon: number): Promise<ForecastEntry[]> {
  const key = requireKey();
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenWeatherMap forecast error ${res.status}`);
  const j: any = await res.json();
  const buckets = new Map<string, any[]>();
  for (const item of j.list ?? []) {
    const date = item.dt_txt?.slice(0, 10);
    if (!date) continue;
    if (!buckets.has(date)) buckets.set(date, []);
    buckets.get(date)!.push(item);
  }
  return Array.from(buckets.entries()).slice(0, 5).map(([date, items]) => {
    const temps = items.map((i) => i.main?.temp).filter((x) => typeof x === "number");
    const mid = items[Math.floor(items.length / 2)];
    const precip = items.reduce((s, i) => s + (i.rain?.["3h"] ?? 0), 0);
    return {
      date,
      minC: Math.min(...temps),
      maxC: Math.max(...temps),
      condition: mid.weather?.[0]?.description ?? "",
      icon: mid.weather?.[0]?.icon ?? "",
      precipMm: Math.round(precip * 10) / 10,
    };
  });
}