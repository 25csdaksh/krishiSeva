import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Languages, Loader2, MapPin, Ruler, Sprout, UserRound } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMyProfile, updateMyProfile } from "@/lib/profile.functions";
import { reverseGeocodeCoords } from "@/lib/weather.functions";
import { SEASONS, type Season } from "@/lib/utils/seasonDetector";
import { LANGUAGES, useI18n, type Lang } from "@/lib/i18n";
import { FarmPageHero } from "@/components/FarmPageHero";

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

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — Krishi Seva" },
      { name: "description", content: "Update your farm details, location and language." },
      { property: "og:title", content: "Your Profile — Krishi Seva" },
      { property: "og:description", content: "Manage your farm details." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { t, setLang } = useI18n();
  const queryClient = useQueryClient();
  const { data: profile } = useQuery({ queryKey: ["profile"], queryFn: () => getMyProfile() });

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    district: "",
    state: "",
    land: "",
    crops: "",
    season: "kharif" as Season,
    soil: "unknown" as Soil,
    language: "en" as Lang,
    latitude: "",
    longitude: "",
  });
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setForm({
      full_name: profile.full_name ?? "",
      phone: profile.phone ?? "",
      district: profile.district ?? "",
      state: profile.state ?? "",
      land: profile.land_size_hectares != null ? String(profile.land_size_hectares) : "",
      crops: (profile.primary_crops ?? []).join(", "),
      season: (profile.current_season as Season) ?? "kharif",
      soil: (profile.soil_type as Soil) ?? "unknown",
      language: (profile.preferred_language as Lang) ?? "en",
      latitude: profile.latitude != null ? String(profile.latitude) : "",
      longitude: profile.longitude != null ? String(profile.longitude) : "",
    });
  }, [profile]);

  const save = useMutation({
    mutationFn: () =>
      updateMyProfile({
        data: {
          full_name: form.full_name || null,
          phone: form.phone || null,
          district: form.district || null,
          state: form.state || null,
          land_size_hectares: form.land ? Number(form.land) : null,
          primary_crops: form.crops
            ? form.crops.split(",").map((c) => c.trim()).filter(Boolean)
            : [],
          current_season: form.season,
          soil_type: form.soil,
          preferred_language: form.language,
          latitude: form.latitude ? Number(form.latitude) : null,
          longitude: form.longitude ? Number(form.longitude) : null,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setLang(form.language);
      toast.success(t("profile.updated"));
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function refreshLocation() {
    if (!("geolocation" in navigator)) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(5));
        const lon = Number(pos.coords.longitude.toFixed(5));
        try {
          const place = await reverseGeocodeCoords({ data: { lat, lon } });
          setForm((f) => ({
            ...f,
            latitude: String(lat),
            longitude: String(lon),
            district: place.district || f.district,
            state: place.state || f.state,
          }));
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        toast.error("Please allow location access");
      },
    );
  }

  const displayName = profile?.full_name || form.full_name || "Your farm";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const location = [profile?.district, profile?.state].filter(Boolean).join(", ");
  const crops = profile?.primary_crops ?? [];

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <FarmPageHero
          eyebrow="Farm identity"
          title={t("profile.title")}
          description="Keep your farm details current so weather, recommendations, and market tools work around your real context."
          image="farmer"
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <aside className="space-y-4">
            <Card className="overflow-hidden border-border/60 bg-card/90 lift-shadow">
              <div className="h-20 bg-linear-to-r from-primary via-primary/85 to-accent" />
              <CardContent className="relative p-6 pt-0">
                <Avatar className="-mt-10 h-20 w-20 border-4 border-card bg-primary text-xl font-bold text-primary-foreground">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {initials || <UserRound className="h-8 w-8" />}
                  </AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">{displayName}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-accent" />
                  {location || "Add your location"}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-secondary/70 p-3">
                    <Ruler className="h-4 w-4 text-primary" />
                    <p className="mt-2 text-lg font-bold">
                      {profile?.land_size_hectares ?? "—"}
                    </p>
                    <p className="text-xs text-muted-foreground">Hectares</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/70 p-3">
                    <Sprout className="h-4 w-4 text-primary" />
                    <p className="mt-2 text-lg font-bold">{crops.length || "—"}</p>
                    <p className="text-xs text-muted-foreground">Crops</p>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Growing now
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {crops.length ? (
                      crops.map((crop) => (
                        <Badge key={crop} variant="secondary" className="rounded-full capitalize">
                          {crop}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No crops added yet</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-secondary/35">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Languages className="h-4 w-4 text-primary" /> Personalisation
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Your language, soil, season, and location make every recommendation more useful.
                </p>
              </CardContent>
            </Card>
          </aside>

          <Card className="border-border/60 bg-card/90 lift-shadow">
            <CardContent className="space-y-6 p-5 sm:p-7">
              <div>
                <p className="text-sm font-semibold">Farm details</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Edit the information shown on your farm card and used across Krishi Seva.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full_name">{t("profile.name")}</Label>
              <Input
                id="full_name"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("profile.phone")}</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
              </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="district">{t("profile.district")}</Label>
                <Input
                  id="district"
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">{t("profile.state")}</Label>
                <Input
                  id="state"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                />
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              className="w-full rounded-full sm:w-auto"
              onClick={refreshLocation}
              disabled={locating}
            >
              {locating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="mr-2 h-4 w-4" />
              )}
              {t("profile.refreshLocation")}
            </Button>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="land">{t("profile.land")}</Label>
                <Input
                  id="land"
                  inputMode="decimal"
                  value={form.land}
                  onChange={(e) => setForm({ ...form, land: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crops">{t("profile.crops")}</Label>
                <Input
                  id="crops"
                  value={form.crops}
                  onChange={(e) => setForm({ ...form, crops: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("crop.season")}</Label>
                <Select
                  value={form.season}
                  onValueChange={(v) => setForm({ ...form, season: v as Season })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SEASONS.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("crop.soil")}</Label>
                <Select
                  value={form.soil}
                  onValueChange={(v) => setForm({ ...form, soil: v as Soil })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SOILS.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("profile.language")}</Label>
              <Select
                value={form.language}
                onValueChange={(v) => setForm({ ...form, language: v as Lang })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.code} value={l.code}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full rounded-full sm:w-auto sm:px-8"
              disabled={save.isPending}
              onClick={() => save.mutate()}
            >
              {save.isPending ? t("common.saving") : t("common.save")}
            </Button>
          </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
