import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CloudSun,
  ScanLine,
  Sprout,
  Store,
  IndianRupee,
  Landmark,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import fieldsImage from "@/assets/fields-aerial.jpg";
import farmerImage from "@/assets/hero-farmer.jpg";
import { PageShell } from "@/components/PageShell";
import { Marquee } from "@/components/Marquee";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Krishi Seva — Smart farming companion for Indian farmers" },
      {
        name: "description",
        content:
          "Live weather, AI leaf disease detection, crop recommendations, mandi prices and a direct farmer marketplace — in English, Hindi and Gujarati.",
      },
      { property: "og:title", content: "Krishi Seva — Smart farming companion" },
      {
        property: "og:description",
        content: "Everything your farm needs, in one simple app, in your language.",
      },
    ],
  }),
  component: Index,
});

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

function Index() {
  const { t } = useI18n();

  const features = [
    { icon: CloudSun, title: "home.f1", desc: "home.f1d" },
    { icon: ScanLine, title: "home.f2", desc: "home.f2d" },
    { icon: Sprout, title: "home.f3", desc: "home.f3d" },
    { icon: Store, title: "home.f4", desc: "home.f4d" },
    { icon: IndianRupee, title: "home.f5", desc: "home.f5d" },
    { icon: Landmark, title: "home.f6", desc: "home.f6d" },
  ];

  const steps = [
    ["home.step1", "home.step1d"],
    ["home.step2", "home.step2d"],
    ["home.step3", "home.step3d"],
    ["home.step4", "home.step4d"],
  ];

  const stats = [
    ["3", "home.stat1"],
    ["7", "home.stat2"],
    ["8", "home.stat3"],
    ["100%", "home.stat4"],
  ];

  const tags = ["Organic Farming", "Precision Agriculture", "Sustainable Practices"];

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Star className="pointer-events-none absolute left-[8%] top-16 h-5 w-5 text-foreground/70 sm:h-7 sm:w-7" />
        <Star className="pointer-events-none absolute left-[18%] top-48 hidden h-4 w-4 text-foreground/50 sm:block" />
        <Star className="pointer-events-none absolute right-[10%] top-24 h-5 w-5 text-foreground/70 sm:h-7 sm:w-7" />
        <Star className="pointer-events-none absolute right-[22%] top-56 hidden h-3.5 w-3.5 text-foreground/40 sm:block" />

        <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-10 text-center sm:pt-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t("home.badge")}
          </span>
          <h1 className="mt-5 text-[2.5rem] font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
            {t("home.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("home.subtitle")}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/auth" search={{ mode: "signup" }}>
                {t("home.cta")} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <a href="#features">{t("home.cta2")}</a>
            </Button>
          </div>
        </div>

        <div className="px-3 sm:px-4">
          <img
            src={fieldsImage}
            alt="Aerial view of green Indian farmland divided into crop fields"
            width={1920}
            height={912}
            loading="eager"
            className="h-[42vw] max-h-[520px] min-h-[220px] w-full rounded-3xl object-cover"
          />
        </div>
      </section>

      {/* Stats strip */}
      <section className="mx-auto mt-10 max-w-7xl px-4">
        <dl className="grid grid-cols-2 divide-border border-y border-border sm:grid-cols-4 sm:divide-x">
          {stats.map(([value, key]) => (
            <div key={key} className="px-2 py-7 sm:px-6">
              <dt className="font-display text-2xl font-bold sm:text-3xl">{value}</dt>
              <dd className="mt-1 text-xs text-muted-foreground">{t(key)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Editorial statement */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-display text-lg font-semibold">{new Date().getFullYear()}</p>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          <p className="font-display text-xl leading-snug sm:text-2xl lg:text-3xl">
            {t("home.statement")}
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{t("home.partnerTitle")}</h2>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {t("home.partnerDesc")}
            </p>
            <Button asChild className="mt-6 rounded-full px-5">
              <Link to="/contact">
                {t("home.partnerCta")} <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={farmerImage}
              alt="Farmer checking crops with a smartphone"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <img
              src={fieldsImage}
              alt="Green farmland from above"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Feature carousel */}
      <section id="features" className="py-6">
        <div className="mx-auto mb-8 max-w-7xl px-4">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("home.featuresTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("home.carouselHint")}</p>
        </div>

        <Marquee speed={48}>
          {features.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="lift-shadow w-[280px] shrink-0 rounded-3xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1 sm:w-[320px]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/12 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{t(title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(desc)}</p>
            </article>
          ))}
        </Marquee>

        <Marquee direction="right" speed={40} className="mt-4">
          {steps.map(([title, desc], i) => (
            <article
              key={title}
              className="w-[260px] shrink-0 rounded-3xl border border-border bg-surface p-6 transition-transform duration-300 hover:-translate-y-1 sm:w-[300px]"
            >
              <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-semibold">{t(title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(desc)}</p>
            </article>
          ))}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-[2rem] bg-ink px-6 py-14 text-center text-ink-foreground">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold sm:text-4xl">
            {t("home.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-foreground/70">
            {t("home.subtitle")}
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 rounded-full px-6">
            <Link to="/auth" search={{ mode: "signup" }}>
              {t("home.cta")} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
