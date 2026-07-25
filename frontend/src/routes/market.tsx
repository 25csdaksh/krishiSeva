import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Tag, Settings2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Farmer Marketplace — Sell your produce directly | Krishi Seva" },
      {
        name: "description",
        content:
          "List your crops, set your own price and reach buyers directly through the Krishi Seva farmer marketplace.",
      },
      { property: "og:title", content: "Farmer Marketplace — Krishi Seva" },
      {
        property: "og:description",
        content: "Sell your produce directly, without a middleman.",
      },
    ],
  }),
  component: MarketInfoPage,
});

function MarketInfoPage() {
  const { t } = useI18n();
  const benefits = [
    { icon: Users, title: "marketInfo.b1", desc: "marketInfo.b1d" },
    { icon: Tag, title: "marketInfo.b2", desc: "marketInfo.b2d" },
    { icon: Settings2, title: "marketInfo.b3", desc: "marketInfo.b3d" },
  ];

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="max-w-2xl text-4xl font-bold sm:text-5xl">{t("marketInfo.title")}</h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground">{t("marketInfo.p")}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border/60 bg-surface/50 p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-semibold">{t(title)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t(desc)}</p>
            </div>
          ))}
        </div>

        <Button asChild size="lg" className="mt-10 rounded-full">
          <Link to="/auth" search={{ mode: "signup" }}>
            {t("marketInfo.cta")}
          </Link>
        </Button>
      </section>
    </PageShell>
  );
}
