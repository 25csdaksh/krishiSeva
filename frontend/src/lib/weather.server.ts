export type CurrentWeather = {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  condition: string;
  time: string;
};

export type ForecastDay = {
  date: string;
  max: number;
  min: number;
  precipitation: number;
  weatherCode: number;
  condition: string;
};

const WEATHER_CODES: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm",
};

export function describeWeather(code: number): string {
  return WEATHER_CODES[code] ?? "Unknown";
}

export async function fetchWeather(lat: number, lon: number) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&forecast_days=7&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather service unavailable");
  const json = (await res.json()) as {
    current: Record<string, number | string>;
    daily: Record<string, (number | string)[]>;
  };

  const c = json.current;
  const current: CurrentWeather = {
    temperature: Number(c.temperature_2m),
    apparentTemperature: Number(c.apparent_temperature),
    humidity: Number(c.relative_humidity_2m),
    windSpeed: Number(c.wind_speed_10m),
    precipitation: Number(c.precipitation),
    weatherCode: Number(c.weather_code),
    condition: describeWeather(Number(c.weather_code)),
    time: String(c.time),
  };

  const d = json.daily;
  const forecast: ForecastDay[] = (d.time as string[]).map((date, i) => ({
    date,
    max: Number(d.temperature_2m_max[i]),
    min: Number(d.temperature_2m_min[i]),
    precipitation: Number(d.precipitation_sum[i]),
    weatherCode: Number(d.weather_code[i]),
    condition: describeWeather(Number(d.weather_code[i])),
  }));

  return { current, forecast };
}

export async function reverseGeocode(lat: number, lon: number) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
  );
  if (!res.ok) throw new Error("Geocoding service unavailable");
  const j = (await res.json()) as {
    locality?: string;
    city?: string;
    localityInfo?: { administrative?: { name: string; adminLevel: number }[] };
    principalSubdivision?: string;
    countryName?: string;
    postcode?: string;
  };

  const district =
    j.localityInfo?.administrative?.find((a) => a.adminLevel === 5)?.name ||
    j.city ||
    j.locality ||
    "";

  const state = j.principalSubdivision ?? "";
  const parts = [j.locality, district, state, j.countryName].filter(Boolean);

  return {
    formattedAddress: parts.join(", "),
    district,
    state,
    country: j.countryName ?? "",
    pincode: j.postcode ?? "",
  };
}
