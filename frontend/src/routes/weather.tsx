// src/routes/weather.tsx
// Weather Intelligence Module — premium 3-tab dashboard
// Route: /weather  (public — profile/AI features require login)

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  Thermometer, Droplets, Wind, Eye, Cloud, Gauge,
  Navigation, Sun, CloudRain, Zap, Leaf,
  Bug, Flame, Waves, AlertTriangle,
  CheckCircle2, XCircle, CalendarDays, TrendingUp,
  TrendingDown, Minus, RefreshCw, MapPin, Sprout,
  CloudSun, Umbrella, CloudSnow, CloudFog, ArrowUp,
  ArrowDown, BarChart2, Activity, Star,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { PageShell } from "@/components/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyProfile } from "@/lib/profile.functions";
import {
  getFullWeather,
  getHistoricalWeather,
  getWeatherAiAnalysis,
  getHistoricalAiSummary,
  getMonthlyOutlook,
} from "@/lib/weather.functions";

// ---------------------------------------------------------------------------
// Route definition
// ---------------------------------------------------------------------------

export const Route = createFileRoute('/weather')({
  head: () => ({
    meta: [
      { title: 'Weather Intelligence — Krishi Seva' },
      {
        name: 'description',
        content:
          'AI-powered weather intelligence, soil data, farming analysis and 16-day forecast for your farm.',
      },
    ],
  }),
  component: WeatherPage,
});

// ---------------------------------------------------------------------------
// Design tokens (match existing app)
// ---------------------------------------------------------------------------

const tooltipStyle = {
  background: 'var(--color-popover)',
  border: '1px solid var(--color-border)',
  borderRadius: 12,
  color: 'var(--color-popover-foreground)',
  fontSize: 12,
};

// ---------------------------------------------------------------------------
// Weather code → icon component
// ---------------------------------------------------------------------------

function WeatherIcon({ code, className }: { code: number; className?: string }) {
  if (code === 0 || code === 1) return <Sun className={className} />;
  if (code === 2 || code === 3) return <CloudSun className={className} />;
  if (code >= 45 && code <= 48) return <CloudFog className={className} />;
  if (code >= 51 && code <= 67) return <CloudRain className={className} />;
  if (code >= 71 && code <= 77) return <CloudSnow className={className} />;
  if (code >= 80 && code <= 82) return <CloudRain className={className} />;
  if (code >= 95) return <Zap className={className} />;
  return <CloudSun className={className} />;
}

// ---------------------------------------------------------------------------
// Risk level → color
// ---------------------------------------------------------------------------

function riskColor(level: string) {
  if (level === 'critical') return 'text-red-500';
  if (level === 'high') return 'text-orange-500';
  if (level === 'medium') return 'text-amber-500';
  return 'text-green-500';
}

function riskBg(level: string) {
  if (level === 'critical') return 'bg-red-500/10 border-red-500/30';
  if (level === 'high') return 'bg-orange-500/10 border-orange-500/30';
  if (level === 'medium') return 'bg-amber-500/10 border-amber-500/30';
  return 'bg-green-500/10 border-green-500/30';
}

function riskBar(level: string) {
  if (level === 'critical') return 'bg-red-500';
  if (level === 'high') return 'bg-orange-500';
  if (level === 'medium') return 'bg-amber-400';
  return 'bg-green-500';
}

function scoreColor(score: number) {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#84cc16';
  if (score >= 40) return '#f59e0b';
  if (score >= 20) return '#f97316';
  return '#ef4444';
}

// ---------------------------------------------------------------------------
// Skeleton loaders
// ---------------------------------------------------------------------------

function WeatherSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-48 rounded-3xl" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small reusable components
// ---------------------------------------------------------------------------

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  sub,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit?: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${accent ? 'border-primary/30 bg-primary/8' : 'border-border/60 bg-card/85'}`}>
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-2 text-2xl font-bold font-display leading-none">
        {value}
        {unit && <span className="ml-0.5 text-sm font-normal text-muted-foreground">{unit}</span>}
      </p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function SoilCard({
  icon: Icon,
  label,
  value,
  unit,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  value: number | null;
  unit: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/85 p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-accent" />
        {label}
      </div>
      {value != null ? (
        <p className="mt-2 text-xl font-bold font-display">
          {value.toFixed(value > 0.01 ? 1 : 3)}
          <span className="ml-0.5 text-xs font-normal text-muted-foreground">{unit}</span>
        </p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">—</p>
      )}
      {hint && <p className="mt-1 text-xs text-muted-foreground/70">{hint}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Score gauge (SVG arc)
// ---------------------------------------------------------------------------

function ScoreGauge({ score, label }: { score: number; label: string }) {
  const r = 60;
  const cx = 80;
  const cy = 80;
  const startAngle = -210;
  const totalArc = 240;
  const endAngle = startAngle + (score / 100) * totalArc;

  function polar(angle: number, radius = r) {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function arcPath(start: number, end: number, radius = r) {
    const s = polar(start, radius);
    const e = polar(end, radius);
    const large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  }

  const color = scoreColor(score);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 160 140" className="w-40">
        {/* Track */}
        <path
          d={arcPath(startAngle, startAngle + totalArc)}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={10}
          strokeLinecap="round"
        />
        {/* Value */}
        {score > 0 && (
          <path
            d={arcPath(startAngle, endAngle)}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeLinecap="round"
            style={{ transition: 'all 1s ease' }}
          />
        )}
        {/* Score text */}
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={28} fontWeight={700} fontFamily="Space Grotesk" fill="var(--color-foreground)">
          {score}
        </text>
        <text x={cx} y={cy + 22} textAnchor="middle" fontSize={11} fill="var(--color-muted-foreground)">
          out of 100
        </text>
      </svg>
      <div
        className="mt-1 rounded-full px-4 py-1 text-sm font-bold"
        style={{ background: `${color}20`, color }}
      >
        {label}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Risk indicator card
// ---------------------------------------------------------------------------

function RiskCard({
  icon: Icon,
  title,
  risk,
}: {
  icon: React.ElementType;
  title: string;
  risk: { level: string; score: number; description: string };
}) {
  return (
    <div className={`rounded-2xl border p-4 ${riskBg(risk.level)}`}>
      <div className={`flex items-center gap-2 text-sm font-semibold ${riskColor(risk.level)}`}>
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-border/60">
          <div
            className={`h-full rounded-full transition-all ${riskBar(risk.level)}`}
            style={{ width: `${risk.score}%` }}
          />
        </div>
        <span className="text-xs font-medium capitalize">{risk.level}</span>
      </div>
      {risk.description && (
        <p className="mt-2 text-xs text-muted-foreground">{risk.description}</p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Action plan item
// ---------------------------------------------------------------------------

function ActionCard({ item }: { item: { priority: number; action: string; category: string; timing: string; isAvoid: boolean } }) {
  const stars = item.priority === 1 ? 5 : item.priority === 2 ? 4 : item.priority === 3 ? 3 : item.priority === 4 ? 2 : 1;
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${item.isAvoid ? 'border-red-500/20 bg-red-500/5' : 'border-border/60 bg-card/85'}`}>
      <div className={`mt-0.5 ${item.isAvoid ? 'text-red-500' : 'text-green-500'}`}>
        {item.isAvoid
          ? <XCircle className="h-5 w-5 shrink-0" />
          : <CheckCircle2 className="h-5 w-5 shrink-0" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium ${item.isAvoid ? 'text-red-600 dark:text-red-400' : ''}`}>
          {item.action}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-amber-500">
            {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
          </span>
          <Badge variant="secondary" className="rounded-full text-xs capitalize py-0">
            {item.timing}
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs capitalize py-0">
            {item.category}
          </Badge>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Forecast day card
// ---------------------------------------------------------------------------

function ForecastCard({ day, compact }: { day: { date: string; max: number; min: number; precipitation: number; weatherCode: number; condition: string; uvIndexMax: number }; compact?: boolean }) {
  const d = new Date(day.date);
  const dayName = d.toLocaleDateString(undefined, { weekday: compact ? 'short' : 'long' });
  const dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card/85 p-4 text-center transition-all hover:-translate-y-0.5">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{dayName}</p>
      <p className="text-xs text-muted-foreground">{dateStr}</p>
      <WeatherIcon code={day.weatherCode} className="h-7 w-7 text-accent" />
      <p className="text-xs text-muted-foreground">{day.condition}</p>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-0.5 text-sm font-bold">
          <ArrowUp className="h-3 w-3 text-orange-400" />{Math.round(day.max)}°
        </span>
        <span className="flex items-center gap-0.5 text-sm text-muted-foreground">
          <ArrowDown className="h-3 w-3 text-sky-400" />{Math.round(day.min)}°
        </span>
      </div>
      {day.precipitation > 0 && (
        <div className="flex items-center gap-1 text-xs text-sky-500">
          <Droplets className="h-3 w-3" />
          {day.precipitation.toFixed(1)} mm
        </div>
      )}
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Sun className="h-3 w-3" />UV {day.uvIndexMax.toFixed(0)}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TODAY TAB
// ---------------------------------------------------------------------------

function TodayTab({
  profile,
  weather,
  weatherLoading,
  aiAnalysis,
  aiLoading,
  onRefreshAI,
}: {
  profile: { latitude?: number | null; longitude?: number | null; primary_crops?: string[] | null; district?: string | null; state?: string | null } | undefined;
  weather: { current: Record<string, number | string>; soil: Record<string, number | null>; forecast: Array<Record<string, number | string>> } | undefined;
  weatherLoading: boolean;
  aiAnalysis: Record<string, unknown> | undefined;
  aiLoading: boolean;
  onRefreshAI: () => void;
}) {
  if (weatherLoading) return <WeatherSkeleton />;
  if (!weather) return null;

  const { current, soil, forecast } = weather as {
    current: {
      temperature: number; apparentTemperature: number; humidity: number; rain: number;
      precipitation: number; weatherCode: number; condition: string; windSpeed: number;
      windGusts: number; windDirection: number; windDirectionText: string;
      visibility: number; cloudCover: number; uvIndex: number; surfacePressure: number; time: string;
    };
    soil: {
      soilTemperature0cm: number | null; soilTemperature6cm: number | null;
      soilMoisture0to1cm: number | null; soilMoisture3to9cm: number | null;
      soilMoisture9to27cm: number | null; et0: number | null; vpd: number | null;
      rainProbability: number | null;
    };
    forecast: Array<{ date: string; max: number; min: number; precipitation: number; rain: number; windSpeedMax: number; windGustsMax: number; weatherCode: number; condition: string; et0: number; uvIndexMax: number }>;
  };

  const ai = aiAnalysis as {
    farmingScore?: number; scoreLabel?: string; summary?: string;
    todayRecommendations?: string[]; suitableActivities?: string[];
    activitiesToAvoid?: string[]; cropRecommendations?: Array<{ crop: string; activity: string; reason: string; priority: string }>;
    risks?: { disease: { level: string; score: number; description: string }; pest: { level: string; score: number; description: string }; heatStress: { level: string; score: number; description: string }; flood: { level: string; score: number; description: string }; drought: { level: string; score: number; description: string }; windDamage: { level: string; score: number; description: string } };
    waterRequirement?: string; irrigationAdvice?: string; fertilizerAdvice?: string;
    pesticideAdvice?: string; harvestRecommendation?: string;
    actionPlan?: Array<{ priority: number; action: string; category: string; timing: string; isAvoid: boolean }>;
  } | undefined;

  const today = new Date();
  const timeStr = today.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  const dateStr = today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">

      {/* ── Hero weather card ── */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/85 p-6 lift-shadow">
        <div className="pointer-events-none absolute right-4 top-4 opacity-10">
          <WeatherIcon code={current.weatherCode} className="h-32 w-32" />
        </div>
        <div className="flex flex-wrap items-start gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Today's Weather</p>
            <p className="mt-1 font-display text-7xl font-bold leading-none">
              {Math.round(current.temperature)}<span className="text-4xl">°C</span>
            </p>
            <p className="mt-2 text-lg font-medium text-muted-foreground">{current.condition}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Feels like {Math.round(current.apparentTemperature)}° · {dateStr} · {timeStr}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {[profile?.district, profile?.state].filter(Boolean).join(', ') && (
              <Badge variant="secondary" className="rounded-full flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {[profile?.district, profile?.state].filter(Boolean).join(', ')}
              </Badge>
            )}
            <Badge variant="outline" className="rounded-full">
              UV {current.uvIndex.toFixed(1)}
            </Badge>
            {soil.rainProbability != null && (
              <Badge variant="outline" className="rounded-full">
                <Umbrella className="mr-1 h-3 w-3" />{Math.round(soil.rainProbability)}% rain
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* ── Current conditions grid ── */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Current Conditions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          <StatCard icon={Thermometer} label="Temperature" value={Math.round(current.temperature)} unit="°C" />
          <StatCard icon={Thermometer} label="Feels Like" value={Math.round(current.apparentTemperature)} unit="°C" accent />
          <StatCard icon={Droplets} label="Humidity" value={Math.round(current.humidity)} unit="%" />
          <StatCard icon={CloudRain} label="Rain Today" value={current.rain.toFixed(1)} unit="mm" />
          <StatCard icon={Umbrella} label="Rain Probability" value={Math.round(soil.rainProbability ?? 0)} unit="%" />
          <StatCard icon={Wind} label="Wind Speed" value={Math.round(current.windSpeed)} unit="km/h" />
          <StatCard icon={Zap} label="Wind Gusts" value={Math.round(current.windGusts)} unit="km/h" />
          <StatCard icon={Navigation} label="Wind Direction" value={current.windDirectionText} sub={`${Math.round(current.windDirection)}°`} />
          <StatCard icon={Eye} label="Visibility" value={current.visibility.toFixed(1)} unit="km" />
          <StatCard icon={Cloud} label="Cloud Cover" value={Math.round(current.cloudCover)} unit="%" />
          <StatCard icon={Sun} label="UV Index" value={current.uvIndex.toFixed(1)} sub={current.uvIndex >= 8 ? 'Very High' : current.uvIndex >= 6 ? 'High' : current.uvIndex >= 3 ? 'Moderate' : 'Low'} />
          <StatCard icon={Gauge} label="Pressure" value={Math.round(current.surfacePressure)} unit="hPa" />
        </div>
      </div>

      {/* ── Soil data ── */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Soil & Evapotranspiration</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          <SoilCard icon={Thermometer} label="Soil Temp (0 cm)" value={soil.soilTemperature0cm} unit="°C" hint="Surface temperature" />
          <SoilCard icon={Thermometer} label="Soil Temp (6 cm)" value={soil.soilTemperature6cm} unit="°C" hint="Root zone temp" />
          <SoilCard icon={Droplets} label="Moisture (0–1 cm)" value={soil.soilMoisture0to1cm} unit="m³/m³" hint="Surface moisture" />
          <SoilCard icon={Droplets} label="Moisture (3–9 cm)" value={soil.soilMoisture3to9cm} unit="m³/m³" hint="Mid root zone" />
          <SoilCard icon={Droplets} label="Moisture (9–27 cm)" value={soil.soilMoisture9to27cm} unit="m³/m³" hint="Deep root zone" />
          <SoilCard icon={Activity} label="Reference ET₀" value={soil.et0} unit="mm/day" hint="Evapotranspiration demand" />
          <SoilCard icon={BarChart2} label="Vapour Pressure Deficit" value={soil.vpd} unit="kPa" hint=">1.5 kPa = water stress" />
        </div>
      </div>

      {/* ── AI Farming Analysis ── */}
      <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">AI Farming Analysis</p>
            <h2 className="mt-1 text-xl font-bold">Today's Intelligence Report</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-2"
            onClick={onRefreshAI}
            disabled={aiLoading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${aiLoading ? 'animate-spin' : ''}`} />
            {aiLoading ? 'Analysing…' : 'Refresh AI'}
          </Button>
        </div>

        {aiLoading ? (
          <div className="mt-6 space-y-3">
            <Skeleton className="h-32 rounded-2xl" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>
          </div>
        ) : ai ? (
          <div className="mt-6 space-y-6">
            {/* Score + Summary */}
            <div className="flex flex-wrap gap-6 items-start">
              <ScoreGauge score={ai.farmingScore ?? 50} label={ai.scoreLabel ?? 'Fair'} />
              <div className="flex-1 min-w-[200px]">
                <p className="text-sm font-semibold mb-2">Weather Summary</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{ai.summary}</p>
                {ai.todayRecommendations?.length ? (
                  <ul className="mt-3 space-y-1.5">
                    {ai.todayRecommendations.map((r, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        {r}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            {/* Suitable / Avoid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" /> Suitable Activities
                </p>
                <ul className="mt-3 space-y-1.5">
                  {(ai.suitableActivities ?? []).map((a, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {a}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
                  <XCircle className="h-4 w-4" /> Activities to Avoid
                </p>
                <ul className="mt-3 space-y-1.5">
                  {(ai.activitiesToAvoid ?? []).map((a, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {a}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Risk grid */}
            {ai.risks && (
              <div>
                <p className="text-sm font-semibold mb-3">Risk Assessment</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <RiskCard icon={Leaf} title="Disease Risk" risk={ai.risks.disease} />
                  <RiskCard icon={Bug} title="Pest Risk" risk={ai.risks.pest} />
                  <RiskCard icon={Flame} title="Heat Stress" risk={ai.risks.heatStress} />
                  <RiskCard icon={Waves} title="Flood Risk" risk={ai.risks.flood} />
                  <RiskCard icon={Sun} title="Drought Risk" risk={ai.risks.drought} />
                  <RiskCard icon={Wind} title="Wind Damage" risk={ai.risks.windDamage} />
                </div>
              </div>
            )}

            {/* Crop recommendations */}
            {ai.cropRecommendations?.length ? (
              <div>
                <p className="text-sm font-semibold mb-3">Crop Activity Recommendations</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ai.cropRecommendations.map((c, i) => (
                    <div key={i} className="flex gap-3 rounded-2xl border border-border/60 bg-card/85 p-4">
                      <Sprout className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold capitalize">{c.crop}</p>
                          <Badge
                            variant="outline"
                            className={`rounded-full text-xs py-0 ${c.priority === 'high' ? 'border-orange-500/40 text-orange-500' : c.priority === 'low' ? 'border-green-500/40 text-green-500' : ''}`}
                          >
                            {c.priority}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-primary">{c.activity}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{c.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Advice cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Droplets, title: 'Water Requirement', text: ai.waterRequirement },
                { icon: Waves, title: 'Irrigation Advice', text: ai.irrigationAdvice },
                { icon: Leaf, title: 'Fertilizer Advice', text: ai.fertilizerAdvice },
                { icon: Umbrella, title: 'Pesticide Spraying', text: ai.pesticideAdvice },
                { icon: Sun, title: 'Harvest', text: ai.harvestRecommendation },
              ].filter(a => a.text).map(({ icon: Icon, title, text }, i) => (
                <div key={i} className="rounded-2xl border border-border/60 bg-card/85 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />{title}
                  </p>
                  <p className="mt-2 text-sm">{text}</p>
                </div>
              ))}
            </div>

            {/* Action plan */}
            {ai.actionPlan?.length ? (
              <div>
                <p className="text-sm font-semibold mb-3">Today's Action Plan</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[...(ai.actionPlan)].sort((a, b) => a.priority - b.priority).map((item, i) => (
                    <ActionCard key={i} item={item} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-3 py-8 text-center text-muted-foreground">
            <AlertTriangle className="h-10 w-10 opacity-30" />
            <p className="text-sm">AI analysis unavailable right now.</p>
            <Button variant="outline" size="sm" className="rounded-full" onClick={onRefreshAI}>
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PAST WEATHER TAB
// ---------------------------------------------------------------------------

type PastPeriod = 1 | 7 | 15 | 30;

function PastTab({ profile }: { profile: { latitude?: number | null; longitude?: number | null; primary_crops?: string[] | null } | undefined }) {
  const [days, setDays] = useState<PastPeriod>(7);

  const { data: historical, isLoading } = useQuery({
    queryKey: ['historical-weather', days],
    queryFn: () => getHistoricalWeather({ data: { days } }),
    enabled: !!profile?.latitude,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const { data: aiSummary, isLoading: summaryLoading } = useQuery({
    queryKey: ['historical-ai-summary', days],
    queryFn: () => getHistoricalAiSummary({ data: { days } }),
    enabled: !!profile?.latitude && !!historical,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const stats = useMemo(() => {
    if (!historical?.length) return null;
    const h = historical as Array<{ date: string; maxTemp: number; minTemp: number; precipitation: number; rain: number; windSpeedMax: number; avgHumidity: number }>;
    return {
      maxTemp: Math.max(...h.map(d => d.maxTemp)),
      minTemp: Math.min(...h.map(d => d.minTemp)),
      totalRain: h.reduce((s, d) => s + d.precipitation, 0),
      avgHumidity: h.reduce((s, d) => s + d.avgHumidity, 0) / h.length,
      avgMaxTemp: h.reduce((s, d) => s + d.maxTemp, 0) / h.length,
      avgMinTemp: h.reduce((s, d) => s + d.minTemp, 0) / h.length,
      avgWind: h.reduce((s, d) => s + d.windSpeedMax, 0) / h.length,
      rainyDays: h.filter(d => d.precipitation > 1).length,
    };
  }, [historical]);

  const chartData = useMemo(() => {
    if (!historical?.length) return [];
    return (historical as Array<{ date: string; maxTemp: number; minTemp: number; precipitation: number; avgHumidity: number; windSpeedMax: number }>).map(d => ({
      date: new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      max: Math.round(d.maxTemp),
      min: Math.round(d.minTemp),
      rain: parseFloat(d.precipitation.toFixed(1)),
      humidity: Math.round(d.avgHumidity),
      wind: Math.round(d.windSpeedMax),
    }));
  }, [historical]);

  const periods: { label: string; value: PastPeriod }[] = [
    { label: 'Yesterday', value: 1 },
    { label: 'Last 7 Days', value: 7 },
    { label: 'Last 15 Days', value: 15 },
    { label: 'Last 30 Days', value: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex flex-wrap gap-2">
        {periods.map(p => (
          <button
            key={p.value}
            onClick={() => setDays(p.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${days === p.value ? 'bg-ink text-ink-foreground' : 'bg-secondary/60 text-muted-foreground hover:bg-secondary'}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {isLoading ? <WeatherSkeleton /> : !historical ? null : (
        <>
          {/* Stats row */}
          {stats && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard icon={ArrowUp} label="Highest Temp" value={Math.round(stats.maxTemp)} unit="°C" />
              <StatCard icon={ArrowDown} label="Lowest Temp" value={Math.round(stats.minTemp)} unit="°C" />
              <StatCard icon={CloudRain} label="Total Rainfall" value={stats.totalRain.toFixed(1)} unit="mm" sub={`${stats.rainyDays} rainy days`} />
              <StatCard icon={Droplets} label="Avg Humidity" value={Math.round(stats.avgHumidity)} unit="%" />
            </div>
          )}

          {/* AI Summary */}
          {summaryLoading ? (
            <Skeleton className="h-20 rounded-2xl" />
          ) : aiSummary ? (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">AI Period Summary</p>
              <p className="text-sm leading-relaxed">{aiSummary as string}</p>
            </div>
          ) : null}

          {/* Temperature chart */}
          <Card className="border-border/60 bg-card/85">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-muted-foreground mb-4">Temperature Trend (°C)</p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="gradMax" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={11} tick={{ fontSize: 11 }} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} width={28} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area type="monotone" dataKey="max" name="Max °C" stroke="var(--color-chart-1)" fill="url(#gradMax)" strokeWidth={2} />
                    <Area type="monotone" dataKey="min" name="Min °C" stroke="var(--color-chart-2)" fill="transparent" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Rainfall chart */}
          <Card className="border-border/60 bg-card/85">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-muted-foreground mb-4">Rainfall (mm)</p>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={11} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} width={28} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--color-secondary)' }} />
                    <Bar dataKey="rain" name="Rain (mm)" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Humidity + Wind chart */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-border/60 bg-card/85">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-muted-foreground mb-4">Avg Humidity (%)</p>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={10} />
                      <YAxis stroke="var(--color-muted-foreground)" fontSize={10} width={24} domain={[0, 100]} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line type="monotone" dataKey="humidity" name="Humidity %" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60 bg-card/85">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-muted-foreground mb-4">Max Wind Speed (km/h)</p>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={10} />
                      <YAxis stroke="var(--color-muted-foreground)" fontSize={10} width={24} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line type="monotone" dataKey="wind" name="Wind km/h" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FORECAST TAB
// ---------------------------------------------------------------------------

type ForecastPeriod = 7 | 10 | 16;

function ForecastTab({
  profile,
  weather,
  weatherLoading,
}: {
  profile: { latitude?: number | null; longitude?: number | null; primary_crops?: string[] | null; current_season?: string | null; district?: string | null; state?: string | null } | undefined;
  weather: { forecast: Array<{ date: string; max: number; min: number; precipitation: number; weatherCode: number; condition: string; et0: number; uvIndexMax: number }> } | undefined;
  weatherLoading: boolean;
}) {
  const [fDays, setFDays] = useState<ForecastPeriod>(7);
  const [outlookExpanded, setOutlookExpanded] = useState(false);

  const { data: outlook, isLoading: outlookLoading } = useQuery({
    queryKey: ['monthly-outlook'],
    queryFn: () => getMonthlyOutlook(),
    enabled: !!profile?.latitude,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const displayForecast = useMemo(() => {
    if (!weather?.forecast) return [];
    return weather.forecast.slice(0, fDays);
  }, [weather, fDays]);

  const chartData = useMemo(() => displayForecast.map(d => ({
    date: new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    max: Math.round(d.max),
    min: Math.round(d.min),
    rain: parseFloat(d.precipitation.toFixed(1)),
    et0: parseFloat(d.et0.toFixed(1)),
  })), [displayForecast]);

  const ol = outlook as {
    outlook?: string; confidence?: string; keyPoints?: string[];
    rainfallTrend?: string; temperatureTrend?: string;
    farmingOutlook?: string; diseaseOutlook?: string; waterOutlook?: string;
    suggestedActivities?: string[];
  } | undefined;

  const trendIcon = (trend?: string) =>
    trend === 'above-normal' ? <TrendingUp className="h-4 w-4 text-orange-500" /> :
    trend === 'below-normal' ? <TrendingDown className="h-4 w-4 text-sky-500" /> :
    <Minus className="h-4 w-4 text-green-500" />;

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex flex-wrap gap-2">
        {([7, 10, 16] as ForecastPeriod[]).map(d => (
          <button
            key={d}
            onClick={() => setFDays(d)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${fDays === d ? 'bg-ink text-ink-foreground' : 'bg-secondary/60 text-muted-foreground hover:bg-secondary'}`}
          >
            Next {d} Days
          </button>
        ))}
      </div>

      {weatherLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-2xl" />)}
        </div>
      ) : (
        <>
          {/* Forecast cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {displayForecast.map(day => <ForecastCard key={day.date} day={day} />)}
          </div>

          {/* Forecast charts */}
          <Card className="border-border/60 bg-card/85">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-muted-foreground mb-4">Temperature Forecast (°C)</p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="gradForecast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={11} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} width={28} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area type="monotone" dataKey="max" name="Max °C" stroke="var(--color-chart-1)" fill="url(#gradForecast)" strokeWidth={2} />
                    <Area type="monotone" dataKey="min" name="Min °C" stroke="var(--color-chart-2)" fill="transparent" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-border/60 bg-card/85">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-muted-foreground mb-4">Rainfall Forecast (mm)</p>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={10} />
                      <YAxis stroke="var(--color-muted-foreground)" fontSize={10} width={24} />
                      <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--color-secondary)' }} />
                      <Bar dataKey="rain" name="Rain (mm)" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/85">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-muted-foreground mb-4">Reference ET₀ (mm/day)</p>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={10} />
                      <YAxis stroke="var(--color-muted-foreground)" fontSize={10} width={24} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line type="monotone" dataKey="et0" name="ET₀ mm/d" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Monthly Outlook */}
      <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Monthly Outlook</p>
            <h2 className="mt-1 text-lg font-bold">AI-Generated Extended Forecast</h2>
          </div>
          {ol?.confidence && (
            <Badge variant="outline" className="rounded-full">
              Confidence: {ol.confidence}
            </Badge>
          )}
        </div>

        {outlookLoading ? (
          <div className="mt-4 space-y-3">
            <Skeleton className="h-20 rounded-2xl" />
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3].map(i => <Skeleton key={i} className="h-16 rounded-2xl" />)}
            </div>
          </div>
        ) : ol ? (
          <div className="mt-4 space-y-4">
            {/* Trends */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-border/60 bg-card/85 p-3 text-center">
                <div className="flex justify-center">{trendIcon(ol.rainfallTrend)}</div>
                <p className="mt-1 text-xs font-medium">Rainfall Trend</p>
                <p className="text-xs text-muted-foreground capitalize">{ol.rainfallTrend?.replace('-', ' ')}</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/85 p-3 text-center">
                <div className="flex justify-center">{trendIcon(ol.temperatureTrend)}</div>
                <p className="mt-1 text-xs font-medium">Temp Trend</p>
                <p className="text-xs text-muted-foreground capitalize">{ol.temperatureTrend?.replace('-', ' ')}</p>
              </div>
            </div>

            {/* Outlook text */}
            <p className="text-sm leading-relaxed">{ol.outlook}</p>

            {/* Key points */}
            {ol.keyPoints?.length ? (
              <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wide text-muted-foreground">Key Points</p>
                <ul className="space-y-1.5">
                  {ol.keyPoints.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <Star className="h-4 w-4 shrink-0 mt-0.5 text-amber-400 fill-amber-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Expand for more */}
            {(ol.farmingOutlook || ol.diseaseOutlook || ol.waterOutlook) && (
              <>
                <button
                  onClick={() => setOutlookExpanded(v => !v)}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  {outlookExpanded ? '↑ Show less' : '↓ Show farming details'}
                </button>
                {outlookExpanded && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {ol.farmingOutlook && (
                      <div className="rounded-2xl border border-border/60 bg-card/85 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Farming</p>
                        <p className="text-sm">{ol.farmingOutlook}</p>
                      </div>
                    )}
                    {ol.diseaseOutlook && (
                      <div className="rounded-2xl border border-border/60 bg-card/85 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Disease Outlook</p>
                        <p className="text-sm">{ol.diseaseOutlook}</p>
                      </div>
                    )}
                    {ol.waterOutlook && (
                      <div className="rounded-2xl border border-border/60 bg-card/85 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Water/Irrigation</p>
                        <p className="text-sm">{ol.waterOutlook}</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {ol.suggestedActivities?.length ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Suggested Activities</p>
                <div className="flex flex-wrap gap-2">
                  {ol.suggestedActivities.map((a, i) => (
                    <Badge key={i} variant="secondary" className="rounded-full">{a}</Badge>
                  ))}
                </div>
              </div>
            ) : null}

            <p className="text-xs text-muted-foreground/60 italic">
              ⚠ Monthly outlooks are based on 16-day model data and carry inherent uncertainty. Always verify with local forecasts before major farm decisions.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------

function WeatherPage() {
  const [forceRefresh, setForceRefresh] = useState(false);

  // Profile (requires login; errors are silently swallowed via retry:0)
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getMyProfile(),
    retry: 0,
  });

  const hasLocation = profile?.latitude != null && profile?.longitude != null;
  const isLoggedIn = profile !== undefined && profile !== null;

  // Full weather (all variables, 16-day)
  const { data: weather, isLoading: weatherLoading } = useQuery({
    queryKey: ['full-weather'],
    queryFn: () => getFullWeather({ data: { forecastDays: 16 } }),
    enabled: hasLocation,
    staleTime: 30 * 60 * 1000,
  });

  // AI analysis
  const {
    data: aiAnalysis,
    isLoading: aiLoading,
    refetch: refetchAI,
  } = useQuery({
    queryKey: ['weather-ai-analysis', forceRefresh],
    queryFn: () => getWeatherAiAnalysis({ data: { force: forceRefresh } }),
    enabled: hasLocation,
    staleTime: 3 * 60 * 60 * 1000,
    retry: 1,
  });

  const handleRefreshAI = () => {
    setForceRefresh(true);
    setTimeout(() => setForceRefresh(false), 3000);
    refetchAI();
  };

  // Loading state
  if (profileLoading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <WeatherSkeleton />
        </div>
      </PageShell>
    );
  }

  // Not logged in
  if (!isLoggedIn) {
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-6">
            <CloudSun className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold font-display">Weather Intelligence</h1>
          <p className="mt-4 text-muted-foreground">
            Get AI-powered farming analysis, soil data, 16-day forecasts, and personalised crop recommendations — all based on your exact farm location.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/auth" search={{ mode: 'signup' }}>Get started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link to="/auth">Sign in</Link>
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  // Logged in but no location set
  if (!hasLocation) {
    return (
      <PageShell>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Weather Intelligence</p>
            <h1 className="mt-2 text-3xl font-bold font-display">Your Farm's Weather Hub</h1>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card/85 p-8 text-center lift-shadow">
            <MapPin className="mx-auto h-12 w-12 text-primary/60 mb-4" />
            <h2 className="text-xl font-bold">Set Your Farm Location</h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
              Weather Intelligence uses your farm's GPS coordinates to fetch hyper-local weather data, soil conditions, and AI farming analysis. Set your location once in your profile.
            </p>
            <Button asChild className="mt-6 rounded-full px-6">
              <Link to="/_authenticated/profile">
                <MapPin className="mr-2 h-4 w-4" />
                Set Farm Location
              </Link>
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  // Full dashboard
  const location = [profile.district, profile.state].filter(Boolean).join(', ');

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">

        {/* Page header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Weather Intelligence</p>
            <h1 className="mt-1 text-2xl font-bold font-display sm:text-3xl">
              {location ? `${location}` : 'Your Farm'}
            </h1>
            {location && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {profile.latitude?.toFixed(4)}, {profile.longitude?.toFixed(4)}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {(profile.primary_crops as string[] | null | undefined)?.slice(0, 3).map(crop => (
              <Badge key={crop} variant="secondary" className="rounded-full capitalize">
                <Sprout className="mr-1 h-3 w-3" />{crop}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="w-full rounded-full bg-ink p-1">
            <TabsTrigger value="today" className="flex-1 rounded-full text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
              <CalendarDays className="mr-1.5 h-3.5 w-3.5" />Today
            </TabsTrigger>
            <TabsTrigger value="past" className="flex-1 rounded-full text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
              <BarChart2 className="mr-1.5 h-3.5 w-3.5" />Past Weather
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex-1 rounded-full text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
              <TrendingUp className="mr-1.5 h-3.5 w-3.5" />Forecast
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-0">
            <TodayTab
              profile={profile}
              weather={weather as Parameters<typeof TodayTab>[0]['weather']}
              weatherLoading={weatherLoading}
              aiAnalysis={aiAnalysis as Record<string, unknown> | undefined}
              aiLoading={aiLoading}
              onRefreshAI={handleRefreshAI}
            />
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <PastTab profile={profile} />
          </TabsContent>

          <TabsContent value="forecast" className="mt-0">
            <ForecastTab
              profile={profile}
              weather={weather as Parameters<typeof ForecastTab>[0]['weather']}
              weatherLoading={weatherLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}
