import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-ink-foreground">
              <Sprout className="h-4 w-4" />
            </span>
            <span className="font-display text-base font-bold">{t("brand.name")}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("footer.tagline")}
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
          <Link to="/about" className="text-muted-foreground hover:text-foreground">
            {t("nav.about")}
          </Link>
          <Link to="/market" className="text-muted-foreground hover:text-foreground">
            {t("nav.market")}
          </Link>
          <Link to="/schemes" className="text-muted-foreground hover:text-foreground">
            {t("nav.schemes")}
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground">
            {t("nav.contact")}
          </Link>
        </nav>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}
      </div>
    </footer>
  );
}
