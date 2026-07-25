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
import { CloudSun, Droplets, Wind, Thermometer, ScanLine, Sprout, Store, IndianRupee } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyProfile } from "@/lib/profile.functions";
import { getWeatherByCoords } from "@/lib/weather.functions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Farm Dashboard — Krishi Seva" },
      {
        name: "description",
        content: "Live weather, forecast and quick actions for your farm.",
      },
      { property: "og:title", content: "Farm Dashboard — Krishi Seva" },
      { property: "og:description", content: "Your farm at a glance." },
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
    enabled: !!hasCoords,
    queryFn: () =>
      getWeatherByCoords({
        data: { lat: Number(profile!.latitude), lon: Number(profile!.longitude) },
      }),
  });

  const chartData =
    weather?.forecast.map((d) => ({
      day: new Date(d.date).toLocaleDateString(undefined, { weekday: "short" }),
      max: d.max,
      min: d.min,
      rain: d.precipitation,
    })) ?? [];

  const actions = [
    { to: "/leaf-scan", icon: ScanLine, key: "nav.leaf" },
    { to: "/crop-analysis", icon: Sprout, key: "nav.crop" },
    { to: "/marketplace", icon: Store, key: "nav.market" },
    { to: "/mandi-prices", icon: IndianRupee, key: "nav.prices" },
  ] as const;

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{t("dashboard.hello")}</p>
            <h1 className="truncate text-2xl font-bold sm:text-3xl">
              {profileLoading ? "…" : (profile?.full_name ?? t("brand.name"))}
            </h1>
            {(profile?.district || profile?.state) && (
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {[profile?.district, profile?.state].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
        </header>

        {!hasCoords && !profileLoading && (
          <Card className="mt-6 border-border/60 bg-card/70">
            <CardContent className="flex flex-wrap items-center justify-between gap-3 p-6">
              <p className="text-sm text-muted-foreground">{t("dashboard.noLocation")}</p>
              <Link to="/profile" className="text-sm font-medium text-primary hover:underline">
                {t("nav.profile")}
              </Link>
            </CardContent>
          </Card>
        )}

        {hasCoords && (
          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            <Card className="border-border/60 bg-card/70 lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CloudSun className="h-4 w-4 text-primary" /> {t("dashboard.weatherNow")}
                </div>
                {weatherLoading || !weather ? (
                  <Skeleton className="mt-4 h-28 rounded-xl" />
                ) : (
                  <>
                    <p className="mt-4 font-display text-5xl font-bold">
                      {Math.round(weather.current.temperature)}°
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {weather.current.condition}
                    </p>
                    <dl className="mt-6 grid grid-cols-3 gap-3 text-xs">
                      <div className="rounded-xl bg-secondary/60 p-3">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <Droplets className="h-3 w-3" /> {t("dashboard.humidity")}
                        </dt>
                        <dd className="mt-1 text-sm font-semibold">
                          {Math.round(weather.current.humidity)}%
                        </dd>
                      </div>
                      <div className="rounded-xl bg-secondary/60 p-3">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <Wind className="h-3 w-3" /> {t("dashboard.wind")}
                        </dt>
                        <dd className="mt-1 text-sm font-semibold">
                          {Math.round(weather.current.windSpeed)}
                        </dd>
                      </div>
                      <div className="rounded-xl bg-secondary/60 p-3">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <Thermometer className="h-3 w-3" /> {t("dashboard.feels")}
                        </dt>
                        <dd className="mt-1 text-sm font-semibold">
                          {Math.round(weather.current.apparentTemperature)}°
                        </dd>
                      </div>
                    </dl>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/70 lg:col-span-2">
              <CardContent className="p-6">
                <h2 className="text-sm font-medium text-muted-foreground">
                  {t("dashboard.tempTrend")}
                </h2>
                <div className="mt-4 h-56 w-full">
                  {chartData.length > 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="tmax" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                            <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis stroke="var(--color-muted-foreground)" fontSize={12} width={30} />
                        <Tooltip
                          contentStyle={{
                            background: "var(--color-popover)",
                            border: "1px solid var(--color-border)",
                            borderRadius: 12,
                            color: "var(--color-popover-foreground)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="max"
                          stroke="var(--color-chart-1)"
                          fill="url(#tmax)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="min"
                          stroke="var(--color-chart-2)"
                          fill="transparent"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/70 lg:col-span-3">
              <CardContent className="p-6">
                <h2 className="text-sm font-medium text-muted-foreground">
                  {t("dashboard.rainTrend")}
                </h2>
                <div className="mt-4 h-48 w-full">
                  {chartData.length > 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis stroke="var(--color-muted-foreground)" fontSize={12} width={30} />
                        <Tooltip
                          cursor={{ fill: "var(--color-secondary)" }}
                          contentStyle={{
                            background: "var(--color-popover)",
                            border: "1px solid var(--color-border)",
                            borderRadius: 12,
                            color: "var(--color-popover-foreground)",
                          }}
                        />
                        <Bar dataKey="rain" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-sm font-medium text-muted-foreground">{t("dashboard.quick")}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map(({ to, icon: Icon, key }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface/50 p-5 transition-colors hover:border-primary/50"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
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
