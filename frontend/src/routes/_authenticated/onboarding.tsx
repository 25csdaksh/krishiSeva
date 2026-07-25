import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Leaf, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { completeOnboarding } from "@/lib/profile.functions";
import { getWeatherByCoords, reverseGeocodeCoords } from "@/lib/weather.functions";
import { AREA_UNITS, toHectares, type AreaUnit } from "@/lib/utils/unitConversion";
import { detectSeason, SEASONS, type Season } from "@/lib/utils/seasonDetector";
import { useI18n } from "@/lib/i18n";

const SOILS = [
  "alluvial",
  "black",
  "red",
  "laterite",
  "desert",
  "mountain",
  "peaty",
  "saline",
  "unknown",
] as const;
type Soil = (typeof SOILS)[number];

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your farm — Krishi Seva" },
      { name: "description", content: "Tell us about your farm to get personalised guidance." },
      { property: "og:title", content: "Set up your farm — Krishi Seva" },
      { property: "og:description", content: "A one-minute setup for personalised advice." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Onboarding,
});

const TOTAL = 5;

function Onboarding() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [locating, setLocating] = useState(false);
  const [weatherLabel, setWeatherLabel] = useState<string | null>(null);

  const [unit, setUnit] = useState<AreaUnit>("acre");
  const [mode, setMode] = useState<"direct" | "dimensions">("direct");
  const [area, setArea] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");

  const [season, setSeason] = useState<Season>(detectSeason());
  const [soil, setSoil] = useState<Soil>("unknown");

  const rawArea =
    mode === "direct"
      ? Number(area) || 0
      : (Number(length) || 0) * (Number(breadth) || 0);
  const hectares = toHectares(rawArea, unit);

  const save = useMutation({
    mutationFn: () =>
      completeOnboarding({
        data: {
          full_name: fullName || null,
          district: district || null,
          state: state || null,
          latitude: lat ? Number(lat) : null,
          longitude: lon ? Number(lon) : null,
          land_size_hectares: hectares || null,
          current_season: season,
          soil_type: soil,
          preferred_language: lang,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(t("profile.updated"));
      navigate({ to: "/dashboard", replace: true });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function useMyLocation() {
    if (!("geolocation" in navigator)) {
      toast.error("Location is not available on this device");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const la = Number(pos.coords.latitude.toFixed(5));
        const lo = Number(pos.coords.longitude.toFixed(5));
        setLat(String(la));
        setLon(String(lo));
        try {
          const place = await reverseGeocodeCoords({ data: { lat: la, lon: lo } });
          setDistrict(place.district);
          setState(place.state);
          const w = await getWeatherByCoords({ data: { lat: la, lon: lo } });
          setWeatherLabel(`${Math.round(w.current.temperature)}° · ${w.current.condition}`);
        } catch {
          toast.error("Could not load location details");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        toast.error("Please allow location access or enter coordinates manually");
      },
    );
  }

  return (
    <div className="relative min-h-screen px-4 py-10">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-lg">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">{t("brand.name")}</span>
          </div>
          <LanguageSwitcher />
        </div>

        <div className="rounded-3xl border border-border/60 bg-card/80 p-6 soft-shadow sm:p-8">
          <p className="text-xs text-muted-foreground">
            {t("onboarding.step")} {step} {t("onboarding.of")} {TOTAL}
          </p>
          <Progress value={(step / TOTAL) * 100} className="mt-3" />
          <h1 className="mt-6 text-2xl font-bold">{t("onboarding.title")}</h1>

          <div className="mt-6 space-y-4">
            {step === 1 && (
              <div className="space-y-2">
                <Label htmlFor="name">{t("onboarding.name")}</Label>
                <Input
                  id="name"
                  value={fullName}
                  placeholder={t("onboarding.namePlaceholder")}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Label>{t("onboarding.location")}</Label>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full rounded-full"
                  onClick={useMyLocation}
                  disabled={locating}
                >
                  {locating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("onboarding.locating")}
                    </>
                  ) : (
                    <>
                      <MapPin className="mr-2 h-4 w-4" /> {t("onboarding.useLocation")}
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">{t("onboarding.locationHelp")}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="lat">Latitude</Label>
                    <Input id="lat" value={lat} onChange={(e) => setLat(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lon">Longitude</Label>
                    <Input id="lon" value={lon} onChange={(e) => setLon(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">{t("profile.district")}</Label>
                    <Input
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">{t("profile.state")}</Label>
                    <Input id="state" value={state} onChange={(e) => setState(e.target.value)} />
                  </div>
                </div>
                {weatherLabel && (
                  <div className="rounded-xl bg-secondary/60 p-3 text-sm">
                    <span className="text-muted-foreground">{t("onboarding.weather")}: </span>
                    <span className="font-semibold">{weatherLabel}</span>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <Label>{t("onboarding.land")}</Label>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">{t("onboarding.unit")}</Label>
                  <Select value={unit} onValueChange={(v) => setUnit(v as AreaUnit)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AREA_UNITS.map((u) => (
                        <SelectItem key={u.value} value={u.value}>
                          {u.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Tabs value={mode} onValueChange={(v) => setMode(v as "direct" | "dimensions")}>
                  <TabsList className="w-full">
                    <TabsTrigger value="direct" className="flex-1">
                      {t("onboarding.direct")}
                    </TabsTrigger>
                    <TabsTrigger value="dimensions" className="flex-1">
                      {t("onboarding.dimensions")}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {mode === "direct" ? (
                  <div className="space-y-2">
                    <Label htmlFor="area">{t("onboarding.area")}</Label>
                    <Input
                      id="area"
                      inputMode="decimal"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="len">{t("onboarding.length")}</Label>
                      <Input
                        id="len"
                        inputMode="decimal"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bre">{t("onboarding.breadth")}</Label>
                      <Input
                        id="bre"
                        inputMode="decimal"
                        value={breadth}
                        onChange={(e) => setBreadth(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="rounded-xl bg-secondary/60 p-3 text-sm">
                  <span className="text-muted-foreground">{t("onboarding.area")}: </span>
                  <span className="font-semibold">{hectares} ha</span>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                <Label>{t("onboarding.season")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {SEASONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSeason(s)}
                      className={`rounded-xl border p-3 text-sm capitalize transition-colors ${
                        season === s
                          ? "border-primary bg-primary/12 text-primary"
                          : "border-border bg-surface/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("onboarding.seasonSuggest")}: <span className="capitalize">{detectSeason()}</span>
                </p>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-3">
                <Label>{t("onboarding.soil")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {SOILS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSoil(s)}
                      className={`rounded-xl border p-3 text-sm capitalize transition-colors ${
                        soil === s
                          ? "border-primary bg-primary/12 text-primary"
                          : "border-border bg-surface/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() => setStep((s) => s - 1)}
              >
                {t("common.back")}
              </Button>
            )}
            {step < TOTAL ? (
              <Button
                type="button"
                className="flex-1 rounded-full"
                onClick={() => setStep((s) => s + 1)}
              >
                {t("common.next")}
              </Button>
            ) : (
              <Button
                type="button"
                className="flex-1 rounded-full"
                disabled={save.isPending}
                onClick={() => save.mutate()}
              >
                {save.isPending ? t("common.saving") : t("onboarding.done")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
