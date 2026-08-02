//#region node_modules/.nitro/vite/services/ssr/assets/weather.server-CFMkb-Xm.js
var WEATHER_CODES = {
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
	99: "Severe thunderstorm"
};
function describeWeather(code) {
	return WEATHER_CODES[code] ?? "Unknown";
}
async function fetchWeather(lat, lon) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&forecast_days=7&timezone=auto`;
	const res = await fetch(url);
	if (!res.ok) throw new Error("Weather service unavailable");
	const json = await res.json();
	const c = json.current;
	const current = {
		temperature: Number(c.temperature_2m),
		apparentTemperature: Number(c.apparent_temperature),
		humidity: Number(c.relative_humidity_2m),
		windSpeed: Number(c.wind_speed_10m),
		precipitation: Number(c.precipitation),
		weatherCode: Number(c.weather_code),
		condition: describeWeather(Number(c.weather_code)),
		time: String(c.time)
	};
	const d = json.daily;
	return {
		current,
		forecast: d.time.map((date, i) => ({
			date,
			max: Number(d.temperature_2m_max[i]),
			min: Number(d.temperature_2m_min[i]),
			precipitation: Number(d.precipitation_sum[i]),
			weatherCode: Number(d.weather_code[i]),
			condition: describeWeather(Number(d.weather_code[i]))
		}))
	};
}
async function reverseGeocode(lat, lon) {
	const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
	if (!res.ok) throw new Error("Geocoding service unavailable");
	const j = await res.json();
	const district = j.localityInfo?.administrative?.find((a) => a.adminLevel === 5)?.name || j.city || j.locality || "";
	const state = j.principalSubdivision ?? "";
	return {
		formattedAddress: [
			j.locality,
			district,
			state,
			j.countryName
		].filter(Boolean).join(", "),
		district,
		state,
		country: j.countryName ?? "",
		pincode: j.postcode ?? ""
	};
}
//#endregion
export { fetchWeather, reverseGeocode };
