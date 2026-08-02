// src/lib/weather.ai.server.ts
// AI-powered farming analysis via Lovable AI Gateway → Gemini 2.5 Flash
// Server-only — never imported on the client.

import process from 'node:process';
import type { WeatherData, HistoricalDay } from './weather.server';

// ---------------------------------------------------------------------------
// Gateway helper (mirrors existing ml.server.ts pattern)
// ---------------------------------------------------------------------------

const GATEWAY_URL = 'https://ai.gateway.lovable.dev/v1/chat/completions';
const MODEL = 'google/gemini-2.5-flash';

interface Message {
  role: 'user' | 'system';
  content: string;
}

async function callGateway(messages: Message[]): Promise<string> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error('AI service is not configured');

  const res = await fetch(GATEWAY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Lovable-API-Key': key,
    },
    body: JSON.stringify({ model: MODEL, messages }),
    signal: AbortSignal.timeout(45_000),
  });

  if (res.status === 429) throw new Error('AI is busy. Please try again in a minute.');
  if (res.status === 402) throw new Error('AI credits exhausted. Please add credits to continue.');
  if (!res.ok) throw new Error(`AI request failed (${res.status})`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((await res.json()) as any).choices?.[0]?.message?.content ?? '';
}

function extractJson(text: string): unknown {
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RiskLevel {
  level: 'low' | 'medium' | 'high' | 'critical';
  /** 0–100 */
  score: number;
  description: string;
}

export interface CropRecommendation {
  crop: string;
  activity: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ActionItem {
  /** 1 (highest) – 5 (lowest) */
  priority: number;
  action: string;
  category: 'irrigation' | 'harvest' | 'spray' | 'fertilizer' | 'soil' | 'avoid' | 'general';
  timing: string;
  isAvoid: boolean;
}

export interface WeatherAIAnalysis {
  farmingScore: number;
  scoreLabel: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Dangerous';
  summary: string;
  todayRecommendations: string[];
  suitableActivities: string[];
  activitiesToAvoid: string[];
  cropRecommendations: CropRecommendation[];
  risks: {
    disease: RiskLevel;
    pest: RiskLevel;
    heatStress: RiskLevel;
    flood: RiskLevel;
    drought: RiskLevel;
    windDamage: RiskLevel;
  };
  waterRequirement: string;
  irrigationAdvice: string;
  fertilizerAdvice: string;
  pesticideAdvice: string;
  harvestRecommendation: string;
  actionPlan: ActionItem[];
}

export interface MonthlyOutlook {
  outlook: string;
  confidence: 'high' | 'medium' | 'low';
  keyPoints: string[];
  rainfallTrend: 'above-normal' | 'normal' | 'below-normal';
  temperatureTrend: 'above-normal' | 'normal' | 'below-normal';
  farmingOutlook: string;
  diseaseOutlook: string;
  waterOutlook: string;
  suggestedActivities: string[];
}

// ---------------------------------------------------------------------------
// Helper: rule-based fallback analysis (no AI call)
// ---------------------------------------------------------------------------

function ruleBasedAnalysis(wd: WeatherData): WeatherAIAnalysis {
  const { current, soil } = wd;
  const temp = current.temperature;
  const humidity = current.humidity;
  const rain = current.rain;
  const windSpeed = current.windSpeed;
  const windGusts = current.windGusts;
  const moisture = soil.soilMoisture3to9cm ?? 0.2;
  const et0 = soil.et0 ?? 4;
  const rainProb = soil.rainProbability ?? 0;

  // Farming score (simple heuristic)
  let score = 75;
  if (temp > 40) score -= 30;
  else if (temp > 37) score -= 15;
  else if (temp < 10) score -= 20;
  if (humidity > 90) score -= 15;
  else if (humidity > 80) score -= 5;
  if (rain > 30) score -= 20;
  else if (rain > 15) score -= 10;
  if (windSpeed > 40) score -= 20;
  else if (windSpeed > 25) score -= 8;
  score = Math.max(0, Math.min(100, score));

  const scoreLabel =
    score >= 80 ? 'Excellent' :
    score >= 65 ? 'Good' :
    score >= 45 ? 'Fair' :
    score >= 25 ? 'Poor' : 'Dangerous';

  const diseaseScore = Math.round((humidity - 50) * 2.5 + (rain > 0 ? 20 : 0));
  const floodScore = Math.round(rain * 4 + rainProb * 0.3);
  const droughtScore = Math.round((0.3 - Math.min(moisture, 0.3)) / 0.3 * 80);
  const windScore = Math.min(100, Math.round(windSpeed * 2));
  const heatScore = Math.max(0, Math.round((temp - 25) * 5));

  const riskLevel = (s: number): RiskLevel['level'] =>
    s >= 75 ? 'critical' : s >= 50 ? 'high' : s >= 25 ? 'medium' : 'low';

  return {
    farmingScore: score,
    scoreLabel,
    summary: `Current temperature is ${Math.round(temp)}°C with ${current.condition.toLowerCase()}. ${humidity > 80 ? 'High humidity may increase disease pressure.' : 'Humidity levels are moderate.'} ${rain > 5 ? `${Math.round(rain)}mm of rain recorded today.` : 'No significant rainfall.'}`,
    todayRecommendations: [
      'Inspect crops for any stress or disease symptoms in the morning',
      moisture < 0.15 ? 'Soil moisture is low — consider irrigation' : 'Soil moisture adequate — monitor before next irrigation',
      windSpeed > 15 ? 'Avoid spraying operations due to wind conditions' : 'Conditions suitable for planned field operations',
    ],
    suitableActivities: [
      'Crop inspection and monitoring',
      rain < 5 && temp < 36 ? 'Weeding and inter-cultivation' : '',
      windSpeed < 10 ? 'Light pesticide/foliar spray' : '',
      temp < 35 && rain < 5 ? 'Irrigation (if soil moisture low)' : '',
    ].filter(Boolean),
    activitiesToAvoid: [
      windGusts > 20 ? 'Pesticide spraying (gusty winds)' : '',
      rain > 10 ? 'Fertilizer application (risk of runoff)' : '',
      temp > 38 ? 'Heavy physical farm work during peak hours' : '',
    ].filter(Boolean),
    cropRecommendations: [],
    risks: {
      disease: {
        level: riskLevel(Math.max(0, diseaseScore)),
        score: Math.max(0, Math.min(100, diseaseScore)),
        description: `Humidity at ${Math.round(humidity)}% — ${humidity > 80 ? 'favours fungal spread' : 'moderate disease risk'}.`,
      },
      pest: {
        level: temp > 30 && humidity > 60 ? 'medium' : 'low',
        score: temp > 30 && humidity > 60 ? 45 : 20,
        description: 'Monitor regularly, especially under warm and humid conditions.',
      },
      heatStress: {
        level: riskLevel(Math.max(0, heatScore)),
        score: Math.max(0, Math.min(100, heatScore)),
        description: `Temperature at ${Math.round(temp)}°C${temp > 38 ? ' — severe heat stress risk for crops.' : '.'}`,
      },
      flood: {
        level: riskLevel(Math.max(0, floodScore)),
        score: Math.max(0, Math.min(100, floodScore)),
        description: `${Math.round(rain)}mm rain today. ${rain > 20 ? 'Check drainage.' : 'No flood risk.'}`,
      },
      drought: {
        level: riskLevel(Math.max(0, droughtScore)),
        score: Math.max(0, Math.min(100, droughtScore)),
        description: moisture < 0.15 ? 'Soil moisture below threshold — irrigation needed.' : 'Soil moisture within acceptable range.',
      },
      windDamage: {
        level: riskLevel(Math.max(0, windScore)),
        score: Math.max(0, Math.min(100, windScore)),
        description: `Wind at ${Math.round(windSpeed)} km/h${windGusts > 30 ? `, gusting to ${Math.round(windGusts)} km/h` : ''}.`,
      },
    },
    waterRequirement: `Reference ET₀ is ${et0.toFixed(1)} mm/day. ${moisture < 0.15 ? 'Soil moisture is low — irrigation recommended.' : moisture > 0.28 ? 'Soil is saturated — hold irrigation.' : 'Soil moisture is adequate.'}`,
    irrigationAdvice: moisture < 0.15 ? `Irrigate ${(et0 * 1.2).toFixed(0)}mm today (ET₀ × 1.2 crop factor).` : moisture > 0.28 ? 'Skip irrigation — risk of waterlogging.' : 'Irrigation not urgent. Monitor tomorrow.',
    fertilizerAdvice: rain > 10 ? 'Avoid fertilizer today — runoff risk. Apply after soil drains.' : windSpeed > 20 ? 'Avoid foliar spray today. Ground application acceptable.' : 'Conditions suitable for fertilizer application.',
    pesticideAdvice: windSpeed > 15 ? `Wind is ${Math.round(windSpeed)} km/h — postpone spraying. Apply when < 10 km/h, ideally early morning.` : 'Apply in early morning (before 9am) for best adhesion and minimal drift.',
    harvestRecommendation: rain > 15 ? 'Postpone harvest — wet conditions may affect quality and machinery.' : rain > 5 ? 'Harvest possible if crop is mature, but monitor conditions.' : 'Field conditions suitable for harvest operations.',
    actionPlan: [
      { priority: 1, action: 'Morning crop inspection for disease/pest', category: 'general', timing: 'morning', isAvoid: false },
      ...(moisture < 0.15 ? [{ priority: 1, action: `Irrigate crops (ET₀: ${et0.toFixed(1)} mm/day)`, category: 'irrigation' as const, timing: 'morning', isAvoid: false }] : []),
      ...(windSpeed > 15 ? [{ priority: 2, action: 'Postpone pesticide/foliar spraying', category: 'avoid' as const, timing: 'today', isAvoid: true }] : []),
      ...(rain > 10 ? [{ priority: 2, action: 'Avoid fertilizer — runoff risk', category: 'avoid' as const, timing: 'today', isAvoid: true }] : []),
      { priority: 3, action: 'Check field drainage and bunds', category: 'soil', timing: 'morning', isAvoid: false },
    ],
  };
}

// ---------------------------------------------------------------------------
// Core AI farming analysis
// ---------------------------------------------------------------------------

export async function analyzeWeatherForFarming(
  weatherData: WeatherData,
  profile: {
    primary_crops?: string[] | null;
    soil_type?: string | null;
    current_season?: string | null;
    district?: string | null;
    state?: string | null;
  },
): Promise<WeatherAIAnalysis> {
  const { current, soil, forecast } = weatherData;
  const crops = profile.primary_crops?.length
    ? profile.primary_crops.join(', ')
    : 'general crops (cotton, wheat, rice, vegetables)';

  const tomorrow = forecast?.[1];
  const dayAfter = forecast?.[2];

  const prompt = `You are an expert agronomist and agricultural advisor for Indian farmers. Analyze the following REAL weather data and provide precise farming recommendations. 

IMPORTANT RULES:
- Base ALL recommendations strictly on the numbers provided below
- Never invent or hallucinate data
- Keep all text concise and practical
- Use Indian farming context (irrigation, soil types, monsoon patterns)

CURRENT WEATHER (actual measured values):
• Temperature: ${current.temperature.toFixed(1)}°C
• Feels Like: ${current.apparentTemperature.toFixed(1)}°C  
• Humidity: ${current.humidity.toFixed(0)}%
• Rain Today: ${current.rain.toFixed(1)} mm
• Precipitation: ${current.precipitation.toFixed(1)} mm
• Rain Probability: ${(soil.rainProbability ?? 0).toFixed(0)}%
• Wind Speed: ${current.windSpeed.toFixed(1)} km/h
• Wind Gusts: ${current.windGusts.toFixed(1)} km/h
• Wind Direction: ${current.windDirectionText} (${current.windDirection.toFixed(0)}°)
• Visibility: ${current.visibility.toFixed(1)} km
• Cloud Cover: ${current.cloudCover.toFixed(0)}%
• UV Index: ${current.uvIndex.toFixed(1)}
• Weather: ${current.condition}
• Pressure: ${current.surfacePressure.toFixed(0)} hPa

SOIL DATA (actual values):
• Soil Temp (0cm): ${soil.soilTemperature0cm != null ? soil.soilTemperature0cm.toFixed(1) + '°C' : 'N/A'}
• Soil Temp (6cm): ${soil.soilTemperature6cm != null ? soil.soilTemperature6cm.toFixed(1) + '°C' : 'N/A'}
• Soil Moisture (0-1cm): ${soil.soilMoisture0to1cm != null ? soil.soilMoisture0to1cm.toFixed(3) + ' m³/m³' : 'N/A'}
• Soil Moisture (3-9cm): ${soil.soilMoisture3to9cm != null ? soil.soilMoisture3to9cm.toFixed(3) + ' m³/m³' : 'N/A'}
• Soil Moisture (9-27cm): ${soil.soilMoisture9to27cm != null ? soil.soilMoisture9to27cm.toFixed(3) + ' m³/m³' : 'N/A'}
• Reference ET₀: ${soil.et0 != null ? soil.et0.toFixed(2) + ' mm/day' : 'N/A'}
• Vapour Pressure Deficit: ${soil.vpd != null ? soil.vpd.toFixed(2) + ' kPa' : 'N/A'}

TOMORROW FORECAST:
• Max/Min: ${tomorrow ? `${tomorrow.max.toFixed(1)}°C / ${tomorrow.min.toFixed(1)}°C` : 'N/A'}
• Precipitation: ${tomorrow ? tomorrow.precipitation.toFixed(1) + ' mm' : 'N/A'}
• Condition: ${tomorrow?.condition ?? 'N/A'}

DAY AFTER TOMORROW: Max ${dayAfter ? dayAfter.max.toFixed(1) + '°C' : 'N/A'}, Rain ${dayAfter ? dayAfter.precipitation.toFixed(1) + 'mm' : 'N/A'}

FARMER CONTEXT:
• Crops: ${crops}
• Soil Type: ${profile.soil_type ?? 'unknown'}
• Season: ${profile.current_season ?? 'unknown'}
• Location: ${[profile.district, profile.state].filter(Boolean).join(', ') || 'India'}

Respond with ONLY valid JSON (no text before or after):
{
  "farmingScore": <integer 0-100>,
  "scoreLabel": "<Excellent|Good|Fair|Poor|Dangerous>",
  "summary": "<2-3 sentences, farmer-friendly, mentions key weather facts>",
  "todayRecommendations": ["<concise recommendation>", "<concise recommendation>", "<concise recommendation>"],
  "suitableActivities": ["<activity>", "<activity>", "<activity>", "<activity>"],
  "activitiesToAvoid": ["<activity to avoid>", "<activity to avoid>"],
  "cropRecommendations": [
    {"crop": "<crop>", "activity": "<what to do today>", "reason": "<1 sentence based on data>", "priority": "<high|medium|low>"}
  ],
  "risks": {
    "disease": {"level": "<low|medium|high|critical>", "score": <0-100>, "description": "<1 sentence based on humidity/rain numbers>"},
    "pest": {"level": "<low|medium|high|critical>", "score": <0-100>, "description": "<1 sentence>"},
    "heatStress": {"level": "<low|medium|high|critical>", "score": <0-100>, "description": "<1 sentence based on temperature>"},
    "flood": {"level": "<low|medium|high|critical>", "score": <0-100>, "description": "<1 sentence based on rain mm>"},
    "drought": {"level": "<low|medium|high|critical>", "score": <0-100>, "description": "<1 sentence based on soil moisture m³/m³>"},
    "windDamage": {"level": "<low|medium|high|critical>", "score": <0-100>, "description": "<1 sentence based on wind km/h>"}
  },
  "waterRequirement": "<specific advice mentioning ET₀ value and soil moisture readings>",
  "irrigationAdvice": "<specific irrigation amount/timing advice>",
  "fertilizerAdvice": "<fertilizer application advice considering current rain/wind>",
  "pesticideAdvice": "<spraying advice based on wind speed and rain>",
  "harvestRecommendation": "<harvest advice if relevant, else 'conditions suitable / not suitable'>",
  "actionPlan": [
    {"priority": <1-5, 1=most urgent>, "action": "<specific actionable task>", "category": "<irrigation|harvest|spray|fertilizer|soil|avoid|general>", "timing": "<morning|noon|afternoon|evening|today|tomorrow>", "isAvoid": <true|false>}
  ]
}`;

  try {
    const content = await callGateway([{ role: 'user', content: prompt }]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = extractJson(content) as any;
    if (!parsed) return ruleBasedAnalysis(weatherData);

    const validLevels = ['low', 'medium', 'high', 'critical'];
    const validScoreLabels = ['Excellent', 'Good', 'Fair', 'Poor', 'Dangerous'];

    const parseRisk = (r: Record<string, unknown>): RiskLevel => ({
      level: validLevels.includes(String(r?.level)) ? (r.level as RiskLevel['level']) : 'low',
      score: Math.max(0, Math.min(100, Number(r?.score) || 0)),
      description: String(r?.description || ''),
    });

    return {
      farmingScore: Math.max(0, Math.min(100, Number(parsed.farmingScore) || 50)),
      scoreLabel: validScoreLabels.includes(parsed.scoreLabel)
        ? parsed.scoreLabel
        : 'Fair',
      summary: String(parsed.summary || ''),
      todayRecommendations: (Array.isArray(parsed.todayRecommendations)
        ? parsed.todayRecommendations.map(String).slice(0, 5)
        : []),
      suitableActivities: (Array.isArray(parsed.suitableActivities)
        ? parsed.suitableActivities.map(String).slice(0, 6)
        : []),
      activitiesToAvoid: (Array.isArray(parsed.activitiesToAvoid)
        ? parsed.activitiesToAvoid.map(String).slice(0, 4)
        : []),
      cropRecommendations: (Array.isArray(parsed.cropRecommendations)
        ? parsed.cropRecommendations.slice(0, 8).map((c: Record<string, unknown>) => ({
            crop: String(c.crop || ''),
            activity: String(c.activity || ''),
            reason: String(c.reason || ''),
            priority: ['high', 'medium', 'low'].includes(String(c.priority))
              ? (c.priority as CropRecommendation['priority'])
              : 'medium',
          }))
        : []),
      risks: {
        disease: parseRisk(parsed.risks?.disease ?? {}),
        pest: parseRisk(parsed.risks?.pest ?? {}),
        heatStress: parseRisk(parsed.risks?.heatStress ?? {}),
        flood: parseRisk(parsed.risks?.flood ?? {}),
        drought: parseRisk(parsed.risks?.drought ?? {}),
        windDamage: parseRisk(parsed.risks?.windDamage ?? {}),
      },
      waterRequirement: String(parsed.waterRequirement || ''),
      irrigationAdvice: String(parsed.irrigationAdvice || ''),
      fertilizerAdvice: String(parsed.fertilizerAdvice || ''),
      pesticideAdvice: String(parsed.pesticideAdvice || ''),
      harvestRecommendation: String(parsed.harvestRecommendation || ''),
      actionPlan: (Array.isArray(parsed.actionPlan)
        ? parsed.actionPlan.slice(0, 10).map((a: Record<string, unknown>) => ({
            priority: Math.max(1, Math.min(5, Number(a.priority) || 3)),
            action: String(a.action || ''),
            category: String(a.category || 'general') as ActionItem['category'],
            timing: String(a.timing || 'today'),
            isAvoid: Boolean(a.isAvoid),
          }))
        : []),
    };
  } catch (err) {
    console.error('[weather.ai] analyzeWeatherForFarming failed:', err);
    return ruleBasedAnalysis(weatherData);
  }
}

// ---------------------------------------------------------------------------
// Historical summary
// ---------------------------------------------------------------------------

export async function generateHistoricalSummary(
  historical: HistoricalDay[],
  periodLabel: string,
  crops: string,
): Promise<string> {
  if (!historical.length) return 'No historical data available.';

  const totalRain = historical.reduce((s, d) => s + d.precipitation, 0);
  const avgTemp = historical.reduce((s, d) => s + (d.maxTemp + d.minTemp) / 2, 0) / historical.length;
  const maxTemp = Math.max(...historical.map(d => d.maxTemp));
  const minTemp = Math.min(...historical.map(d => d.minTemp));
  const avgHumidity = historical.reduce((s, d) => s + d.avgHumidity, 0) / historical.length;
  const rainyDays = historical.filter(d => d.precipitation > 1).length;

  const prompt = `Summarize this ${periodLabel} weather for an Indian farmer in 2-3 sentences. Include farming implications.

Weather data:
- Avg temperature: ${avgTemp.toFixed(1)}°C (max ${maxTemp.toFixed(1)}°C, min ${minTemp.toFixed(1)}°C)
- Total rainfall: ${totalRain.toFixed(1)} mm
- Rainy days: ${rainyDays} of ${historical.length}
- Avg humidity: ${avgHumidity.toFixed(0)}%
- Crops: ${crops || 'general crops'}

Give ONLY the 2-3 sentence summary. Be specific and practical.`;

  try {
    const content = await callGateway([{ role: 'user', content: prompt }]);
    return content.trim() || fallbackHistoricalSummary(totalRain, avgTemp, rainyDays, historical.length);
  } catch {
    return fallbackHistoricalSummary(totalRain, avgTemp, rainyDays, historical.length);
  }
}

function fallbackHistoricalSummary(
  totalRain: number,
  avgTemp: number,
  rainyDays: number,
  totalDays: number,
): string {
  const rainDesc = totalRain > 80 ? 'above-average rainfall' : totalRain < 10 ? 'very little rainfall' : 'moderate rainfall';
  return `The past ${totalDays === 1 ? 'day' : `${totalDays} days`} recorded ${rainDesc} (${totalRain.toFixed(0)} mm total) with an average temperature of ${avgTemp.toFixed(1)}°C. ${rainyDays} out of ${totalDays} days had significant precipitation. ${totalRain > 50 ? 'Soil moisture should be adequate — delay irrigation if not urgently needed.' : totalRain < 10 ? 'Dry conditions prevailed — ensure adequate irrigation is provided.' : 'Conditions were broadly suitable for most field operations.'}`;
}

// ---------------------------------------------------------------------------
// Monthly outlook
// ---------------------------------------------------------------------------

export async function generateMonthlyOutlook(
  forecast16: WeatherData['forecast'],
  profile: {
    primary_crops?: string[] | null;
    current_season?: string | null;
    district?: string | null;
    state?: string | null;
  },
): Promise<MonthlyOutlook> {
  const crops = profile.primary_crops?.join(', ') || 'various crops';
  const totalRain = forecast16.reduce((s, d) => s + d.precipitation, 0);
  const avgMax = forecast16.reduce((s, d) => s + d.max, 0) / forecast16.length;
  const avgMin = forecast16.reduce((s, d) => s + d.min, 0) / forecast16.length;
  const rainyDays = forecast16.filter(d => d.precipitation > 1).length;
  const rainTrend = rainyDays > 10 ? 'above-normal' : rainyDays > 5 ? 'normal' : 'below-normal';
  const tempTrend = avgMax > 36 ? 'above-normal' : avgMax < 22 ? 'below-normal' : 'normal';

  const prompt = `You are an agricultural advisor. Based on a 16-day forecast (the most reliable outlook available), generate a cautious monthly farming outlook for a farmer in ${[profile.district, profile.state].filter(Boolean).join(', ') || 'India'} growing ${crops} in ${profile.current_season || 'current'} season.

16-day forecast summary:
- Total rainfall: ${totalRain.toFixed(1)} mm over 16 days
- Rainy days: ${rainyDays} of 16
- Avg max: ${avgMax.toFixed(1)}°C, Avg min: ${avgMin.toFixed(1)}°C
- Rain trend: ${rainTrend}
- Temperature trend: ${tempTrend}

IMPORTANT: Express appropriate uncertainty. This is an outlook, not a precise forecast.

Respond with ONLY valid JSON:
{
  "outlook": "<3-4 sentences about expected conditions and farming implications>",
  "confidence": "<high|medium|low>",
  "keyPoints": ["<point 1>", "<point 2>", "<point 3>"],
  "rainfallTrend": "<above-normal|normal|below-normal>",
  "temperatureTrend": "<above-normal|normal|below-normal>",
  "farmingOutlook": "<1-2 sentences on general farming suitability>",
  "diseaseOutlook": "<1 sentence on disease/pest risk for coming month>",
  "waterOutlook": "<1 sentence on irrigation/water requirement>",
  "suggestedActivities": ["<activity 1>", "<activity 2>", "<activity 3>"]
}`;

  try {
    const content = await callGateway([{ role: 'user', content: prompt }]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = extractJson(content) as any;
    if (!parsed) throw new Error('parse failed');

    return {
      outlook: String(parsed.outlook || ''),
      confidence: ['high', 'medium', 'low'].includes(parsed.confidence) ? parsed.confidence : 'medium',
      keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints.map(String).slice(0, 5) : [],
      rainfallTrend: ['above-normal', 'normal', 'below-normal'].includes(parsed.rainfallTrend) ? parsed.rainfallTrend : rainTrend,
      temperatureTrend: ['above-normal', 'normal', 'below-normal'].includes(parsed.temperatureTrend) ? parsed.temperatureTrend : tempTrend,
      farmingOutlook: String(parsed.farmingOutlook || ''),
      diseaseOutlook: String(parsed.diseaseOutlook || ''),
      waterOutlook: String(parsed.waterOutlook || ''),
      suggestedActivities: Array.isArray(parsed.suggestedActivities) ? parsed.suggestedActivities.map(String).slice(0, 5) : [],
    };
  } catch {
    return {
      outlook: `Based on the 16-day forecast, ${rainTrend === 'above-normal' ? 'above-average rainfall is expected' : rainTrend === 'below-normal' ? 'drier-than-normal conditions are likely' : 'near-normal rainfall is expected'}. Temperatures are projected to remain ${tempTrend === 'above-normal' ? 'warmer than usual' : tempTrend === 'below-normal' ? 'cooler than normal' : 'within normal range'}. Farmers should plan operations accordingly and monitor updated forecasts regularly.`,
      confidence: 'low',
      keyPoints: [
        `${rainTrend === 'above-normal' ? 'Expect above-normal rainfall' : rainTrend === 'below-normal' ? 'Below-normal rainfall likely' : 'Near-normal rainfall expected'} in coming weeks`,
        `Temperatures forecast ${tempTrend === 'above-normal' ? 'above normal — watch for heat stress' : 'within normal range'}`,
        'Check 7-day forecast regularly for operational planning',
      ],
      rainfallTrend: rainTrend as MonthlyOutlook['rainfallTrend'],
      temperatureTrend: tempTrend as MonthlyOutlook['temperatureTrend'],
      farmingOutlook: `${rainyDays > 10 ? 'Wet conditions expected — manage drainage and disease pressure.' : rainyDays < 5 ? 'Dry outlook — prioritise irrigation scheduling.' : 'Mixed conditions expected — plan field operations around rain-free windows.'}`,
      diseaseOutlook: rainTrend === 'above-normal' ? 'Elevated fungal and bacterial disease risk due to wet conditions.' : 'Moderate disease risk — maintain regular monitoring.',
      waterOutlook: rainTrend === 'below-normal' ? 'Irrigation will be critical — plan water availability in advance.' : 'Rainfall should supplement irrigation needs.',
      suggestedActivities: ['Monitor crops weekly for disease/pest', 'Plan field operations around rain-free windows', 'Ensure drainage channels are clear'],
    };
  }
}
