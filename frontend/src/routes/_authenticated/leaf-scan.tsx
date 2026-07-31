import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, ScanLine } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { FarmPageHero } from "@/components/FarmPageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { createUploadUrl } from "@/lib/upload.functions";
import { analyzeLeafDisease, listMyLeafScans } from "@/lib/ml.functions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/leaf-scan")({
  head: () => ({
    meta: [
      { title: "Leaf Disease Detection — Krishi Seva" },
      {
        name: "description",
        content: "Photograph an affected leaf and get a likely diagnosis with a practical remedy.",
      },
      { property: "og:title", content: "Leaf Disease Detection — Krishi Seva" },
      { property: "og:description", content: "AI plant health checks for your crops." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LeafScan,
});

function LeafScan() {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [crop, setCrop] = useState("");

  const { data: history } = useQuery({
    queryKey: ["leaf-scans"],
    queryFn: () => listMyLeafScans(),
  });

  const analyze = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Please choose a photo first");
      const { path, token } = await createUploadUrl({
        data: { kind: "leaf", filename: file.name },
      });
      const { error } = await supabase.storage
        .from("krishi-uploads")
        .uploadToSignedUrl(path, token, file);
      if (error) throw new Error(error.message);
      return analyzeLeafDisease({
        data: { image_url: path, crop_name: crop || undefined },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaf-scans"] });
      toast.success(t("leaf.result"));
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const result = analyze.data;

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <FarmPageHero
          eyebrow="Plant health check"
          title={t("leaf.title")}
          description={t("leaf.p")}
          image="farmer"
        />

        <Card className="mt-6 border-border/60 bg-card/85 soft-shadow">
          <CardContent className="space-y-4 p-6">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="grid min-h-64 w-full place-items-center rounded-2xl border border-dashed border-border bg-secondary/35 p-8 text-center transition-colors hover:border-primary/60"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Selected leaf"
                  className="max-h-64 rounded-xl object-contain"
                />
              ) : (
                <>
                  <ImagePlus className="h-8 w-8 text-primary" />
                  <span className="mt-3 text-sm text-muted-foreground">{t("leaf.choose")}</span>
                </>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
                setPreview(f ? URL.createObjectURL(f) : null);
              }}
            />

            <div className="space-y-2">
              <Label htmlFor="crop">{t("leaf.crop")}</Label>
              <Input id="crop" value={crop} onChange={(e) => setCrop(e.target.value)} />
            </div>

            <Button
              className="w-full rounded-full"
              disabled={!file || analyze.isPending}
              onClick={() => analyze.mutate()}
            >
              {analyze.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("leaf.analyzing")}
                </>
              ) : (
                <>
                  <ScanLine className="mr-2 h-4 w-4" /> {t("leaf.analyze")}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="mt-6 border-primary/40 bg-primary/5">
            <CardContent className="p-6">
              <h2 className="text-sm font-medium text-muted-foreground">{t("leaf.result")}</h2>
              <p className="mt-2 text-2xl font-bold">{result.detected_disease}</p>
              {result.confidence != null && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{t("leaf.confidence")}</span>
                    <span>{Math.round(Number(result.confidence) * 100)}%</span>
                  </div>
                  <Progress value={Number(result.confidence) * 100} className="mt-2" />
                </div>
              )}
              {result.remedy && (
                <div className="mt-5">
                  <h3 className="text-sm font-semibold">{t("leaf.remedy")}</h3>
                  <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                    {result.remedy}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {(history?.length ?? 0) > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-medium text-muted-foreground">{t("leaf.history")}</h2>
            <ul className="mt-4 space-y-2">
              {history!.map((h) => (
                <li
                  key={h.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/60 bg-surface/50 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{h.detected_disease}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {h.crop_name ?? "—"} ·{" "}
                      {new Date(h.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {h.confidence != null ? `${Math.round(Number(h.confidence) * 100)}%` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </PageShell>
  );
}
