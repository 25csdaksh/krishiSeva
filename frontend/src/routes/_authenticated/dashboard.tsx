import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CalendarDays,
  CloudSun,
  Droplets,
  IndianRupee,
  MapPin,
  Ruler,
  ScanLine,
  Sprout,
  Store,
  Thermometer,
  Wind,
} from "lucide-react";
import { FarmPageHero } from "@/components/FarmPageHero";
import { PageShell } from "@/components/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyProfile } from "@/lib/profile.functions";
import { getWeatherByCoords } from "@/lib/weather.functions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Farm Dashboard - Krishi Seva" },
      { name: "description", content: "Live weather, forecast and quick actions for your farm." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
  });

  useEffect(() => {
    if (profile && !profile.onboarding_completed) {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [profile, navigate]);

  const hasCoords = profile?.latitude != null && profile?.longitude != null;
  const { data: weather, isLoading: weatherLoading } = useQuery({
    queryKey: ["weather", profile?.latitude, profile?.longitude],
    enabled: hasCoords,
    queryFn: () =>
      getWeatherByCoords({
        data: { lat: Number(profile!.latitude), lon: Number(profile!.longitude) },
      }),
  });

  const chartData =
    weather?.forecast.map((day) => ({
      day: new Date(day.date).toLocaleDateString(undefined, { weekday: "short" }),
      max: day.max,
      min: day.min,
      rain: day.precipitation,
    })) ?? [];
  const actions = [
    { to: "/leaf-scan", icon: ScanLine, key: "nav.leaf" },
    { to: "/crop-analysis", icon: Sprout, key: "nav.crop" },
    { to: "/marketplace", icon: Store, key: "nav.market" },
    { to: "/market", icon: IndianRupee, key: "nav.market" },
  ] as const;
  const location = [profile?.district, profile?.state].filter(Boolean).join(", ");

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <FarmPageHero
          eyebrow={t("dashboard.hello")}
          title={profileLoading ? "Your farm" : (profile?.full_name ?? "Your farm")}
          description={location || "Build your profile to unlock local weather and tailored guidance."}
          image="fields"
          action={
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              <MapPin className="h-4 w-4 text-accent" /> {t("nav.profile")}
            </Link>
          }
        />

        <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Metric icon={Ruler} value={profile?.land_size_hectares ?? "-"} label="Hectares managed" />
          <Metric icon={Sprout} value={profile?.primary_crops?.length ?? "-"} label="Crops on your profile" />
          <Metric icon={CalendarDays} value={profile?.current_season ?? "Not set"} label="Current growing season" />
          <Metric icon={Sprout} value={profile?.soil_type ?? "Not set"} label="Soil type" />
        </section>

        {!hasCoords && !profileLoading && (
          <Card className="mt-6 border-border/60 bg-card/85 soft-shadow">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <p className="font-semibold">Weather is waiting for your location</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("dashboard.noLocation")}</p>
              </div>
              <Link
                to="/profile"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Update profile
              </Link>
            </CardContent>
          </Card>
        )}

        {hasCoords && (
          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            <Card className="border-border/60 bg-card/85 lift-shadow lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <CloudSun className="h-4 w-4 text-accent" /> {t("dashboard.weatherNow")}
                </div>
                {weatherLoading || !weather ? (
                  <Skeleton className="mt-4 h-40 rounded-2xl" />
                ) : (
                  <>
                    <p className="mt-5 font-display text-6xl font-bold">
                      {Math.round(weather.current.temperature)}°
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{weather.current.condition}</p>
                    <dl className="mt-6 grid grid-cols-3 gap-2 text-xs">
                      <WeatherDetail icon={Droplets} label={t("dashboard.humidity")} value={`${Math.round(weather.current.humidity)}%`} />
                      <WeatherDetail icon={Wind} label={t("dashboard.wind")} value={String(Math.round(weather.current.windSpeed))} />
                      <WeatherDetail icon={Thermometer} label={t("dashboard.feels")} value={`${Math.round(weather.current.apparentTemperature)}°`} />
                    </dl>
                  </>
                )}
              </CardContent>
            </Card>

            <ChartCard title={t("dashboard.tempTrend")} className="lg:col-span-2">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="temperature" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} width={30} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="max" stroke="var(--color-chart-1)" fill="url(#temperature)" strokeWidth={2} />
                    <Area type="monotone" dataKey="min" stroke="var(--color-chart-2)" fill="transparent" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : <Skeleton className="h-full w-full rounded-xl" />}
            </ChartCard>

            <ChartCard title={t("dashboard.rainTrend")} className="lg:col-span-3" short>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} width={30} />
                    <Tooltip cursor={{ fill: "var(--color-secondary)" }} contentStyle={tooltipStyle} />
                    <Bar dataKey="rain" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : <Skeleton className="h-full w-full rounded-xl" />}
            </ChartCard>
          </section>
        )}

        <section className="mt-8">
          <p className="text-sm font-semibold">Keep your farm moving</p>
          <h2 className="mt-1 text-sm text-muted-foreground">{t("dashboard.quick")}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map(({ to, icon: Icon, key }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/85 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:lift-shadow"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 truncate text-sm font-medium">{t(key)}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function Metric({ icon: Icon, value, label }: { icon: typeof Sprout; value: string | number; label: string }) {
  return (
    <Card className="border-border/60 bg-card/85">
      <CardContent className="p-4">
        <Icon className="h-4 w-4 text-accent" />
        <p className="mt-3 truncate text-lg font-bold capitalize">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

function WeatherDetail({ icon: Icon, label, value }: { icon: typeof Wind; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/70 p-2.5">
      <dt className="flex items-center gap-1 text-muted-foreground"><Icon className="h-3 w-3" /> {label}</dt>
      <dd className="mt-1 text-sm font-semibold">{value}</dd>
    </div>
  );
}

function ChartCard({ title, className, short, children }: { title: string; className?: string; short?: boolean; children: React.ReactNode }) {
  return (
    <Card className={`border-border/60 bg-card/85 ${className ?? ""}`}>
      <CardContent className="p-6">
        <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
        <div className={`mt-4 w-full ${short ? "h-48" : "h-56"}`}>{children}</div>
      </CardContent>
    </Card>
  );
}

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  color: "var(--color-popover-foreground)",
};
