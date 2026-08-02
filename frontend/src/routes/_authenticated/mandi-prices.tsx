import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { FarmPageHero } from "@/components/FarmPageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMandiPrices } from "@/lib/price.functions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/mandi-prices")({
  head: () => ({
    meta: [
      { title: "Live Mandi Prices — Krishi Seva" },
      {
        name: "description",
        content: "Track commodity prices across Indian markets, states and districts.",
      },
      { property: "og:title", content: "Live Mandi Prices — Krishi Seva" },
      { property: "og:description", content: "Know the rate before you sell." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RedirectToMarket,
});


function RedirectToMarket() {
  // keep the route but redirect to the consolidated market page
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/market", replace: true });
  }, [navigate]);
  return null;
}

export function MandiPricesSection() {
  const { t } = useI18n();
  const [filters, setFilters] = useState({ commodity: "", state: "", district: "" });
  const [applied, setApplied] = useState(filters);

  const { data, isLoading } = useQuery({
    queryKey: ["mandi", applied],
    queryFn: () =>
      getMandiPrices({
        data: {
          commodity: applied.commodity || undefined,
          state: applied.state || undefined,
          district: applied.district || undefined,
          limit: 60,
        },
      }),
  });

  const records = data?.records ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
        <FarmPageHero
          eyebrow="Market intelligence"
          title={t("prices.title")}
          description="Search current mandi records by crop and place so you can compare the rate before you sell."
          image="fields"
        />

        <Card className="mt-6 border-border/60 bg-card/85 soft-shadow">
          <CardContent className="grid gap-3 p-5 sm:grid-cols-4 sm:p-6">
          <div className="space-y-2">
            <Label htmlFor="commodity">{t("prices.commodity")}</Label>
            <Input
              id="commodity"
              value={filters.commodity}
              onChange={(e) => setFilters({ ...filters, commodity: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">{t("prices.state")}</Label>
            <Input
              id="state"
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">{t("prices.district")}</Label>
            <Input
              id="district"
              value={filters.district}
              onChange={(e) => setFilters({ ...filters, district: e.target.value })}
            />
          </div>
          <div className="flex items-end">
            <Button className="w-full rounded-full" onClick={() => setApplied(filters)}>
              <Search className="mr-1 h-4 w-4" /> {t("common.search")}
            </Button>
          </div>
          </CardContent>
        </Card>

        {data?.error && <p className="mt-4 text-sm text-destructive">{data.error}</p>}

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border/60 bg-card/85 soft-shadow">
          {isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : records.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">{t("prices.empty")}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("prices.commodity")}</TableHead>
                  <TableHead>{t("prices.market")}</TableHead>
                  <TableHead className="text-right">{t("prices.min")}</TableHead>
                  <TableHead className="text-right">{t("prices.max")}</TableHead>
                  <TableHead className="text-right">{t("prices.modal")}</TableHead>
                  <TableHead>{t("prices.date")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((r, i) => (
                  <TableRow key={`${r.market}-${r.commodity}-${i}`}>
                    <TableCell className="font-medium">
                      {r.commodity}
                      {r.variety ? (
                        <span className="block text-xs text-muted-foreground">{r.variety}</span>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.market}
                      <span className="block text-xs">
                        {[r.district, r.state].filter(Boolean).join(", ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">₹{r.min_price}</TableCell>
                    <TableCell className="text-right">₹{r.max_price}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      ₹{r.modal_price}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {r.arrival_date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
  );
}


