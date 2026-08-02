import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Krishi Seva — Why we built it" },
      {
        name: "description",
        content:
          "Krishi Seva brings weather, crop guidance, plant health, market rates and government schemes together for small and medium Indian farmers.",
      },
      { property: "og:title", content: "About Krishi Seva" },
      {
        property: "og:description",
        content: "A simple digital companion for Indian farmers, in three languages.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold sm:text-5xl">{t("about.title")}</h1>
        <p className="mt-6 text-base text-muted-foreground">{t("about.p1")}</p>

        <div className="mt-10 space-y-6">
          <div className="rounded-2xl border border-border/60 bg-surface/50 p-6">
            <h2 className="text-xl font-semibold">{t("about.who")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("about.whod")}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-surface/50 p-6">
            <h2 className="text-xl font-semibold">{t("about.problem")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("about.problemd")}</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
