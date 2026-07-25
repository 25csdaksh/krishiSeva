import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getSchemeBySlug } from "@/lib/schemes.functions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/schemes/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Government scheme | Krishi Seva` },
      {
        name: "description",
        content:
          "Eligibility, benefits and application details for this government agriculture scheme.",
      },
      { property: "og:title", content: "Government scheme details — Krishi Seva" },
      {
        property: "og:description",
        content: "Check eligibility, benefits and how to apply.",
      },
    ],
  }),
  component: SchemeDetail,
  errorComponent: ({ error }) => (
    <PageShell>
      <p className="mx-auto max-w-3xl px-4 py-16 text-sm text-destructive" role="alert">
        {error.message}
      </p>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <p className="mx-auto max-w-3xl px-4 py-16 text-sm text-muted-foreground">Scheme not found.</p>
    </PageShell>
  ),
});

function SchemeDetail() {
  const { slug } = Route.useParams();
  const { t } = useI18n();
  const { data, isLoading } = useQuery({
    queryKey: ["scheme", slug],
    queryFn: () => getSchemeBySlug({ data: { slug } }),
  });

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Link
          to="/schemes"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {t("schemes.title")}
        </Link>

        {isLoading && <Skeleton className="mt-6 h-64 rounded-2xl" />}

        {!isLoading && !data && (
          <p className="mt-6 text-sm text-muted-foreground">{t("schemes.empty")}</p>
        )}

        {data && (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{data.state ?? "Central"}</Badge>
              {data.category && <Badge variant="outline">{data.category}</Badge>}
            </div>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{data.title}</h1>
            {data.ministry && (
              <p className="mt-2 text-sm text-muted-foreground">{data.ministry}</p>
            )}
            {data.description && (
              <p className="mt-6 text-base text-muted-foreground">{data.description}</p>
            )}

            {data.eligibility && (
              <section className="mt-8 rounded-2xl border border-border/60 bg-surface/50 p-6">
                <h2 className="text-lg font-semibold">{t("schemes.eligibility")}</h2>
                <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                  {data.eligibility}
                </p>
              </section>
            )}

            {data.benefits && (
              <section className="mt-4 rounded-2xl border border-border/60 bg-surface/50 p-6">
                <h2 className="text-lg font-semibold">{t("schemes.benefits")}</h2>
                <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                  {data.benefits}
                </p>
              </section>
            )}

            {data.application_link && (
              <Button asChild className="mt-8 rounded-full">
                <a href={data.application_link} target="_blank" rel="noreferrer">
                  {t("schemes.apply")} <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </Button>
            )}
          </>
        )}
      </article>
    </PageShell>
  );
}
