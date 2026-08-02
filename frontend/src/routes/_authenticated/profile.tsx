import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-bold">{t("profile.title")}</h1>

        <Card className="mt-6 border-border/60 bg-card/70">
          <CardContent className="space-y-4 p-6">
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

            <div className="grid grid-cols-2 gap-3">
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
              className="w-full rounded-full"
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

            <div className="grid grid-cols-2 gap-3">
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
              className="w-full rounded-full"
              disabled={save.isPending}
              onClick={() => save.mutate()}
            >
              {save.isPending ? t("common.saving") : t("common.save")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
