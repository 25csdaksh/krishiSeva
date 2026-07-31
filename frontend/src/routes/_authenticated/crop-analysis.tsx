import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, Sprout } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { FarmPageHero } from "@/components/FarmPageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getMyProfile } from "@/lib/profile.functions";
import { recommendCropForProfile, listMyCropRecommendations } from "@/lib/ml.functions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/crop-analysis")({
  head: () => ({
    meta: [
      { title: "Smart Crop Analysis — Krishi Seva" },
      {
        name: "description",
        content: "Get crop recommendations based on your soil, season and location.",
      },
      { property: "og:title", content: "Smart Crop Analysis — Krishi Seva" },
      { property: "og:description", content: "Know what to sow next." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CropAnalysis,
});

type Suggestion = { crop: string; score: number; reason: string };

const NUM_FIELDS = [
  ["N", "Nitrogen (N)"],
  ["P", "Phosphorus (P)"],
  ["K", "Potassium (K)"],
  ["ph", "Soil pH"],
  ["temperature", "Temperature (°C)"],
  ["humidity", "Humidity (%)"],
  ["rainfall", "Rainfall (mm)"],
] as const;

function CropAnalysis() {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});

  const { data: profile } = useQuery({ queryKey: ["profile"], queryFn: () => getMyProfile() });
  const { data: history } = useQuery({
    queryKey: ["crop-recs"],
    queryFn: () => listMyCropRecommendations(),
  });

  const run = useMutation({
    mutationFn: () => {
      const payload: Record<string, number> = {};
      for (const [key] of NUM_FIELDS) {
        const raw = values[key];
        if (raw !== undefined && raw !== "" && Number.isFinite(Number(raw))) {
          payload[key] = Number(raw);
        }
      }
      return recommendCropForProfile({ data: payload });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["crop-recs"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const crops = (run.data?.recommended_crops as unknown as Suggestion[] | undefined) ?? [];

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <FarmPageHero
          eyebrow="Plan with confidence"
          title={t("crop.title")}
          description="Recommendations use the farm details you have saved. Add optional soil readings when you have them for a more specific result."
          image="farmer"
        />

        <Card className="mt-6 border-border/60 bg-card/85 soft-shadow">
          <CardContent className="p-6">
            <h2 className="text-sm font-medium text-muted-foreground">{t("crop.context")}</h2>
            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-secondary/60 p-3">
                <dt className="text-xs text-muted-foreground">{t("crop.soil")}</dt>
                <dd className="mt-1 text-sm font-semibold capitalize">
                  {profile?.soil_type ?? t("common.none")}
                </dd>
              </div>
              <div className="rounded-xl bg-secondary/60 p-3">
                <dt className="text-xs text-muted-foreground">{t("crop.season")}</dt>
                <dd className="mt-1 text-sm font-semibold capitalize">
                  {profile?.current_season ?? t("common.none")}
                </dd>
              </div>
              <div className="min-w-0 rounded-xl bg-secondary/60 p-3">
                <dt className="text-xs text-muted-foreground">{t("crop.location")}</dt>
                <dd className="mt-1 truncate text-sm font-semibold">
                  {[profile?.district, profile?.state].filter(Boolean).join(", ") ||
                    t("common.none")}
                </dd>
              </div>
            </dl>

            <Collapsible className="mt-6">
              <CollapsibleTrigger className="text-sm font-medium text-primary hover:underline">
                {t("crop.advanced")}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 grid gap-3 sm:grid-cols-2">
                {NUM_FIELDS.map(([key, label]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      inputMode="decimal"
                      value={values[key] ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Button
              className="mt-6 w-full rounded-full"
              disabled={run.isPending}
              onClick={() => run.mutate()}
            >
              {run.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("crop.running")}
                </>
              ) : (
                <>
                  <Sprout className="mr-2 h-4 w-4" /> {t("crop.run")}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {crops.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-medium text-muted-foreground">{t("crop.results")}</h2>
            <div className="mt-4 space-y-3">
              {crops.map((c) => (
                <div
                  key={c.crop}
                  className="rounded-2xl border border-border/60 bg-card/85 p-5 lift-shadow"
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <h3 className="truncate text-lg font-semibold">{c.crop}</h3>
                    <span className="shrink-0 text-sm font-semibold text-primary">
                      {Math.round(c.score)}%
                    </span>
                  </div>
                  <Progress value={c.score} className="mt-3" />
                  <p className="mt-3 text-sm text-muted-foreground">{c.reason}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(history?.length ?? 0) > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-medium text-muted-foreground">{t("crop.history")}</h2>
            <ul className="mt-4 space-y-2">
              {history!.map((h) => {
                const list = (h.recommended_crops as unknown as Suggestion[]) ?? [];
                return (
                  <li
                    key={h.id}
                    className="rounded-xl border border-border/60 bg-surface/50 p-4 text-sm"
                  >
                    <p className="truncate font-medium">
                      {list.map((c) => c.crop).join(", ") || "—"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(h.created_at).toLocaleString()}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </PageShell>
  );
}
