import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { createUploadUrl } from "@/lib/upload.functions";
import {
  createMarketListing,
  deleteMarketListing,
  listActiveMarketListings,
  listMyMarketListings,
  updateMarketListing,
} from "@/lib/market.functions";
import { getMyProfile } from "@/lib/profile.functions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Sell and browse produce | Krishi Seva" },
      {
        name: "description",
        content: "List your produce, set your price and browse listings from other farmers.",
      },
      { property: "og:title", content: "Marketplace — Krishi Seva" },
      { property: "og:description", content: "Sell your produce directly." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Marketplace,
});

const UNITS = ["kg", "quintal", "tonne", "bag", "dozen", "piece"];

type FormState = {
  id?: string;
  crop_name: string;
  variety: string;
  quantity: string;
  unit: string;
  price_per_unit: string;
  description: string;
  image_url: string;
};

const EMPTY: FormState = {
  crop_name: "",
  variety: "",
  quantity: "",
  unit: "kg",
  price_per_unit: "",
  description: "",
  image_url: "",
};

function Marketplace() {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [file, setFile] = useState<File | null>(null);

  const { data: profile } = useQuery({ queryKey: ["profile"], queryFn: () => getMyProfile() });
  const { data: mine } = useQuery({
    queryKey: ["listings", "mine"],
    queryFn: () => listMyMarketListings(),
  });
  const { data: all } = useQuery({
    queryKey: ["listings", "all"],
    queryFn: () => listActiveMarketListings({ data: {} }),
  });

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["listings"] });
  }

  const save = useMutation({
    mutationFn: async () => {
      let imagePath = form.image_url || undefined;
      if (file) {
        const { path, token } = await createUploadUrl({
          data: { kind: "product", filename: file.name },
        });
        const { error } = await supabase.storage
          .from("krishi-uploads")
          .uploadToSignedUrl(path, token, file);
        if (error) throw new Error(error.message);
        imagePath = path;
      }

      const base = {
        crop_name: form.crop_name,
        variety: form.variety || undefined,
        quantity: Number(form.quantity),
        unit: form.unit,
        price_per_unit: Number(form.price_per_unit),
        description: form.description || undefined,
        image_url: imagePath,
        district: profile?.district ?? undefined,
        state: profile?.state ?? undefined,
      };

      return form.id
        ? updateMarketListing({ data: { id: form.id, ...base } })
        : createMarketListing({ data: base });
    },
    onSuccess: () => {
      invalidate();
      setOpen(false);
      setForm(EMPTY);
      setFile(null);
      toast.success(t("common.save"));
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteMarketListing({ data: { id } }),
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  const markSold = useMutation({
    mutationFn: (id: string) => updateMarketListing({ data: { id, status: "sold" } }),
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <h1 className="truncate text-3xl font-bold">{t("market.title")}</h1>
          <Button
            className="shrink-0 rounded-full"
            onClick={() => {
              setForm(EMPTY);
              setFile(null);
              setOpen(true);
            }}
          >
            <Plus className="mr-1 h-4 w-4" /> {t("market.add")}
          </Button>
        </header>

        <Tabs defaultValue="mine" className="mt-6">
          <TabsList>
            <TabsTrigger value="mine">{t("market.mine")}</TabsTrigger>
            <TabsTrigger value="all">{t("market.browse")}</TabsTrigger>
          </TabsList>

          <TabsContent value="mine" className="mt-4">
            {(mine?.length ?? 0) === 0 ? (
              <p className="text-sm text-muted-foreground">{t("market.empty")}</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {mine!.map((l) => (
                  <Card key={l.id} className="border-border/60 bg-card/70">
                    <CardContent className="p-5">
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                        <div className="min-w-0">
                          <h2 className="truncate text-lg font-semibold">{l.crop_name}</h2>
                          <p className="truncate text-xs text-muted-foreground">
                            {l.variety ?? ""}
                          </p>
                        </div>
                        <Badge variant={l.status === "active" ? "default" : "secondary"}>
                          {l.status}
                        </Badge>
                      </div>
                      <p className="mt-3 text-sm">
                        ₹{l.price_per_unit} / {l.unit} · {l.quantity} {l.unit}
                      </p>
                      {l.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {l.description}
                        </p>
                      )}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                          onClick={() => {
                            setForm({
                              id: l.id,
                              crop_name: l.crop_name,
                              variety: l.variety ?? "",
                              quantity: String(l.quantity),
                              unit: l.unit,
                              price_per_unit: String(l.price_per_unit),
                              description: l.description ?? "",
                              image_url: l.image_url ?? "",
                            });
                            setFile(null);
                            setOpen(true);
                          }}
                        >
                          <Pencil className="mr-1 h-3.5 w-3.5" /> {t("common.edit")}
                        </Button>
                        {l.status === "active" && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-full"
                            onClick={() => markSold.mutate(l.id)}
                          >
                            Sold
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-full text-destructive"
                          onClick={() => {
                            if (window.confirm(t("market.deleteConfirm"))) remove.mutate(l.id);
                          }}
                        >
                          <Trash2 className="mr-1 h-3.5 w-3.5" /> {t("common.delete")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="mt-4">
            {(all?.length ?? 0) === 0 ? (
              <p className="text-sm text-muted-foreground">{t("market.emptyAll")}</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {all!.map((l) => (
                  <Card key={l.id} className="border-border/60 bg-card/70">
                    <CardContent className="p-5">
                      <h2 className="truncate text-lg font-semibold">{l.crop_name}</h2>
                      <p className="mt-1 text-sm text-primary">
                        ₹{l.price_per_unit} / {l.unit}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {l.quantity} {l.unit}
                        {l.district ? ` · ${l.district}` : ""}
                      </p>
                      {l.description && (
                        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                          {l.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? t("market.editTitle") : t("market.add")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crop_name">{t("market.crop")}</Label>
              <Input
                id="crop_name"
                value={form.crop_name}
                onChange={(e) => setForm({ ...form, crop_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variety">{t("market.variety")}</Label>
              <Input
                id="variety"
                value={form.variety}
                onChange={(e) => setForm({ ...form, variety: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="quantity">{t("market.quantity")}</Label>
                <Input
                  id="quantity"
                  inputMode="decimal"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("market.unit")}</Label>
                <Select value={form.unit} onValueChange={(v) => setForm({ ...form, unit: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {UNITS.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">{t("market.price")}</Label>
              <Input
                id="price"
                inputMode="decimal"
                value={form.price_per_unit}
                onChange={(e) => setForm({ ...form, price_per_unit: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">{t("market.description")}</Label>
              <Textarea
                id="desc"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">{t("market.photo")}</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() => setOpen(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button
                className="flex-1 rounded-full"
                disabled={save.isPending || !form.crop_name}
                onClick={() => save.mutate()}
              >
                {save.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("common.saving")}
                  </>
                ) : (
                  t("common.save")
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
