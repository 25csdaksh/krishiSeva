import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { listSchemes } from "@/lib/schemes.functions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/schemes/")({
  head: () => ({
    meta: [
      { title: "Government Agriculture Schemes for Farmers | Krishi Seva" },
      {
        name: "description",
        content:
          "Browse central and state government agriculture schemes, check eligibility and benefits, and find where to apply.",
      },
      { property: "og:title", content: "Government Schemes — Krishi Seva" },
      {
        property: "og:description",
        content: "Find agriculture schemes you may be eligible for.",
      },
    ],
  }),
  component: SchemesPage,
});

function SchemesPage() {
  const { t } = useI18n();
  const { data, isLoading } = useQuery({
    queryKey: ["schemes", "public"],
    queryFn: () => listSchemes({ data: {} }),
  });

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-4xl font-bold sm:text-5xl">{t("schemesInfo.title")}</h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground">{t("schemesInfo.p")}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {isLoading &&
            [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-44 rounded-2xl" />)}

          {!isLoading && (data?.length ?? 0) === 0 && (
            <p className="text-sm text-muted-foreground">{t("schemes.empty")}</p>
          )}

          {data?.map((s) => (
            <article
              key={s.id}
              className="flex flex-col rounded-2xl border border-border/60 bg-surface/50 p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                {s.state ? (
                  <Badge variant="secondary">{s.state}</Badge>
                ) : (
                  <Badge variant="secondary">Central</Badge>
                )}
                {s.category && <Badge variant="outline">{s.category}</Badge>}
              </div>
              <h2 className="mt-3 text-lg font-semibold">{s.title}</h2>
              {s.description && (
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{s.description}</p>
              )}
              {s.ministry && (
                <p className="mt-3 text-xs text-muted-foreground">{s.ministry}</p>
              )}
              <Link
                to="/schemes/$slug"
                params={{ slug: s.slug }}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t("schemes.apply")} <ExternalLink className="h-3.5 w-3.5" />
              </Link>

            </article>
          ))}
        </div>

        <Button asChild size="lg" className="mt-10 rounded-full">
          <Link to="/auth" search={{ mode: "signup" }}>
            {t("schemesInfo.cta")}
          </Link>
        </Button>
      </section>
    </PageShell>
  );
}
