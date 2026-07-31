import type { ReactNode } from "react";
import fieldsAerial from "@/assets/fields-aerial.jpg";
import heroFarmer from "@/assets/hero-farmer.jpg";
import { cn } from "@/lib/utils";

type FarmPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: "fields" | "farmer";
  action?: ReactNode;
  className?: string;
};

export function FarmPageHero({
  eyebrow,
  title,
  description,
  image = "fields",
  action,
  className,
}: FarmPageHeroProps) {
  const source = image === "farmer" ? heroFarmer : fieldsAerial;

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl bg-ink px-6 py-8 text-ink-foreground soft-shadow sm:px-8 sm:py-10",
        className,
      )}
    >
      <img
        src={source}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/35" />
      <div className="relative max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-foreground/65">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-ink-foreground/75 sm:text-base">
          {description}
        </p>
        {action && <div className="mt-6">{action}</div>}
      </div>
    </section>
  );
}
