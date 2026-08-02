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

// Extended types for Weather Intelligence Module
export type FullCurrentWeather = CurrentWeather & {
  rain: number;
  windGusts: number;
  windDirection: number;
  windDirectionText: string;
  /** kilometres */
  visibility: number;
  cloudCover: number;
  uvIndex: number;
  surfacePressure: number;
};

export type SoilData = {
  soilTemperature0cm: number | null;
  soilTemperature6cm: number | null;
  /** m³/m³ */
  soilMoisture0to1cm: number | null;
  soilMoisture3to9cm: number | null;
  soilMoisture9to27cm: number | null;
  /** mm/day */
  et0: number | null;
  /** kPa */
  vpd: number | null;
  /** % */
  rainProbability: number | null;
};

export type FullForecastDay = ForecastDay & {
  rain: number;
  windSpeedMax: number;
  windGustsMax: number;
  et0: number;
  uvIndexMax: number;
};

export type FullWeatherData = {
  current: FullCurrentWeather;
  soil: SoilData;
  forecast: FullForecastDay[];
  timezone: string;
  latitude: number;
  longitude: number;
};

export type HistoricalDay = {
  date: string;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  rain: number;
  windSpeedMax: number;
  avgHumidity: number;
  soilTemp0cm: number | null;
  soilMoisture: number | null;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

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

const WIND_DIRECTIONS = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];

export function describeWeather(code: number): string {
  return WEATHER_CODES[code] ?? "Unknown";
}

export function windDirectionText(degrees: number): string {
  return WIND_DIRECTIONS[Math.round(degrees / 22.5) % 16];
}

// ---------------------------------------------------------------------------
// Original function — kept exactly as-is for backward compatibility
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// New: expanded weather fetch (soil, UV, gusts, visibility, extended forecast)
// ---------------------------------------------------------------------------

export async function fetchFullWeather(
  lat: number,
  lon: number,
  forecastDays: number = 16,
): Promise<FullWeatherData> {
  const days = Math.max(7, Math.min(16, forecastDays));

  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: [
      "temperature_2m", "relative_humidity_2m", "apparent_temperature",
      "rain", "precipitation", "weather_code", "wind_speed_10m",
      "wind_gusts_10m", "wind_direction_10m", "visibility",
      "cloud_cover", "uv_index", "surface_pressure",
    ].join(","),
    hourly: [
      "precipitation_probability", "soil_temperature_0cm", "soil_temperature_6cm",
      "soil_moisture_0_to_1cm", "soil_moisture_3_to_9cm", "soil_moisture_9_to_27cm",
      "et0_fao_evapotranspiration", "vapour_pressure_deficit",
    ].join(","),
    daily: [
      "temperature_2m_max", "temperature_2m_min", "precipitation_sum",
      "rain_sum", "wind_speed_10m_max", "wind_gusts_10m_max",
      "weather_code", "et0_fao_evapotranspiration", "uv_index_max",
    ].join(","),
    forecast_days: String(days),
    timezone: "auto",
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error("Weather service unavailable. Please try again.");

  const json = (await res.json()) as Record<string, unknown>;
  const c = (json.current ?? {}) as Record<string, unknown>;
  const h = (json.hourly ?? {}) as Record<string, unknown[]>;
  const d = (json.daily ?? {}) as Record<string, unknown[]>;

  // Find closest hourly index to current time
  const nowIso = String(c.time ?? "");
  const hourlyTimes = (h.time as string[]) ?? [];
  let idx = hourlyTimes.findIndex((t) => t >= nowIso);
  if (idx < 0) idx = Math.max(0, hourlyTimes.length - 1);

  const num = (v: unknown): number | null =>
    v !== null && v !== undefined ? Number(v) : null;

  const current: FullCurrentWeather = {
    temperature: Number(c.temperature_2m ?? 0),
    apparentTemperature: Number(c.apparent_temperature ?? 0),
    humidity: Number(c.relative_humidity_2m ?? 0),
    windSpeed: Number(c.wind_speed_10m ?? 0),
    precipitation: Number(c.precipitation ?? 0),
    weatherCode: Number(c.weather_code ?? 0),
    condition: describeWeather(Number(c.weather_code ?? 0)),
    time: String(c.time ?? ""),
    rain: Number(c.rain ?? 0),
    windGusts: Number(c.wind_gusts_10m ?? 0),
    windDirection: Number(c.wind_direction_10m ?? 0),
    windDirectionText: windDirectionText(Number(c.wind_direction_10m ?? 0)),
    visibility: Number(c.visibility ?? 0) / 1000,
    cloudCover: Number(c.cloud_cover ?? 0),
    uvIndex: Number(c.uv_index ?? 0),
    surfacePressure: Number(c.surface_pressure ?? 0),
  };

  const soil: SoilData = {
    soilTemperature0cm: num(h.soil_temperature_0cm?.[idx]),
    soilTemperature6cm: num(h.soil_temperature_6cm?.[idx]),
    soilMoisture0to1cm: num(h.soil_moisture_0_to_1cm?.[idx]),
    soilMoisture3to9cm: num(h.soil_moisture_3_to_9cm?.[idx]),
    soilMoisture9to27cm: num(h.soil_moisture_9_to_27cm?.[idx]),
    et0: num(h.et0_fao_evapotranspiration?.[idx]),
    vpd: num(h.vapour_pressure_deficit?.[idx]),
    rainProbability: num(h.precipitation_probability?.[idx]),
  };

  const forecast: FullForecastDay[] = ((d.time as string[]) ?? []).map(
    (date: string, i: number) => ({
      date,
      max: Number(d.temperature_2m_max?.[i] ?? 0),
      min: Number(d.temperature_2m_min?.[i] ?? 0),
      precipitation: Number(d.precipitation_sum?.[i] ?? 0),
      weatherCode: Number(d.weather_code?.[i] ?? 0),
      condition: describeWeather(Number(d.weather_code?.[i] ?? 0)),
      rain: Number(d.rain_sum?.[i] ?? 0),
      windSpeedMax: Number(d.wind_speed_10m_max?.[i] ?? 0),
      windGustsMax: Number(d.wind_gusts_10m_max?.[i] ?? 0),
      et0: Number(d.et0_fao_evapotranspiration?.[i] ?? 0),
      uvIndexMax: Number(d.uv_index_max?.[i] ?? 0),
    }),
  );

  return {
    current,
    soil,
    forecast,
    timezone: String(json.timezone ?? ""),
    latitude: lat,
    longitude: lon,
  };
}

// ---------------------------------------------------------------------------
// New: historical weather from Open-Meteo Archive API
// ---------------------------------------------------------------------------

export async function fetchHistoricalWeather(
  lat: number,
  lon: number,
  startDate: string, // YYYY-MM-DD
  endDate: string,   // YYYY-MM-DD
): Promise<HistoricalDay[]> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    start_date: startDate,
    end_date: endDate,
    daily: [
      "temperature_2m_max", "temperature_2m_min", "precipitation_sum",
      "rain_sum", "wind_speed_10m_max", "relative_humidity_2m_mean",
    ].join(","),
    hourly: ["soil_temperature_0cm", "soil_moisture_0_to_1cm"].join(","),
    timezone: "auto",
  });

  const res = await fetch(`https://archive-api.open-meteo.com/v1/archive?${params}`);
  if (!res.ok) throw new Error("Historical weather service unavailable.");

  const json = (await res.json()) as Record<string, unknown>;
  const d = (json.daily ?? {}) as Record<string, unknown[]>;
  const h = (json.hourly ?? {}) as Record<string, unknown[]>;
  const hourlyTimes = (h.time as string[]) ?? [];

  return ((d.time as string[]) ?? []).map((date: string, i: number) => {
    const noonIdx = hourlyTimes.findIndex(
      (t) => t.startsWith(date) && (t.includes("T12") || t.includes("T11")),
    );
    return {
      date,
      maxTemp: Number(d.temperature_2m_max?.[i] ?? 0),
      minTemp: Number(d.temperature_2m_min?.[i] ?? 0),
      precipitation: Number(d.precipitation_sum?.[i] ?? 0),
      rain: Number(d.rain_sum?.[i] ?? 0),
      windSpeedMax: Number(d.wind_speed_10m_max?.[i] ?? 0),
      avgHumidity: Number(d.relative_humidity_2m_mean?.[i] ?? 0),
      soilTemp0cm: noonIdx >= 0 && h.soil_temperature_0cm?.[noonIdx] != null
        ? Number(h.soil_temperature_0cm[noonIdx])
        : null,
      soilMoisture: noonIdx >= 0 && h.soil_moisture_0_to_1cm?.[noonIdx] != null
        ? Number(h.soil_moisture_0_to_1cm[noonIdx])
        : null,
    };
  });
}

// ---------------------------------------------------------------------------
// Original reverse geocode — kept exactly as-is
// ---------------------------------------------------------------------------

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
