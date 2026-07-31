import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/PageShell";
import { FarmPageHero } from "@/components/FarmPageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMyProfile } from "@/lib/profile.functions";
import { getWeatherByCoords } from "@/lib/weather.functions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/weather")({
  head: () => ({
    meta: [
      { title: "Weather — Krishi Seva" },
      { name: "description", content: "Detailed local weather analysis and 7-day forecast for your farm." },
    ],
  }),
  component: WeatherPage,
});

function WeatherPage() {
  const { t } = useI18n();
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
  });

  const hasCoords = profile?.latitude != null && profile?.longitude != null;
  const { data: weather, isLoading: weatherLoading } = useQuery({
    queryKey: ["weather", profile?.latitude, profile?.longitude],
    enabled: hasCoords,
    queryFn: () =>
      getWeatherByCoords({ data: { lat: Number(profile!.latitude), lon: Number(profile!.longitude) } }),
  });

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <FarmPageHero
          eyebrow="Weather"
          title={t("weather.title")}
          description={t("weather.p")}
          image="weather"
        />

        {!hasCoords && !profileLoading && (
          <Card className="mt-6 border-border/60 bg-card/85 soft-shadow">
            <CardContent className="p-6">
              <p className="font-semibold">{t("weather.noLocation")}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t("weather.setLocationHelp")}</p>
              <Link to="/profile" className="mt-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                {t("profile.title")}
              </Link>
            </CardContent>
          </Card>
        )}

        {hasCoords && (
          <div className="mt-6">
            {weatherLoading || !weather ? (
              <Skeleton className="h-48 rounded-2xl" />
            ) : (
              <>
                <Card className="border-border/60 bg-card/85 soft-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <p className="text-6xl font-display font-bold">{Math.round(weather.current.temperature)}°</p>
                        <p className="text-sm text-muted-foreground">{weather.current.condition}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>Humidity: {Math.round(weather.current.humidity)}%</p>
                        <p>Wind: {Math.round(weather.current.windSpeed)} km/h</p>
                        <p>Feels like: {Math.round(weather.current.apparentTemperature)}°</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6 overflow-x-auto rounded-2xl border border-border/60 bg-card/85 soft-shadow">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Max</TableHead>
                        <TableHead className="text-right">Min</TableHead>
                        <TableHead className="text-right">Precipitation (mm)</TableHead>
                        <TableHead>Condition</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {weather.forecast.map((d) => (
                        <TableRow key={d.date}>
                          <TableCell>{new Date(d.date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">{Math.round(d.max)}°</TableCell>
                          <TableCell className="text-right">{Math.round(d.min)}°</TableCell>
                          <TableCell className="text-right">{d.precipitation}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{d.condition}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </PageShell>
  );
}
