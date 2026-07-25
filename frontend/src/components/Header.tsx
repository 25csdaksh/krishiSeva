import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Sprout, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useI18n } from "@/lib/i18n";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

const publicLinks = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/market", key: "nav.market" },
  { to: "/schemes", key: "nav.schemes" },
  { to: "/contact", key: "nav.contact" },
] as const;

const appLinks = [
  { to: "/dashboard", key: "nav.dashboard" },
  { to: "/leaf-scan", key: "nav.leaf" },
  { to: "/crop-analysis", key: "nav.crop" },
  { to: "/marketplace", key: "nav.market" },
  { to: "/mandi-prices", key: "nav.prices" },
  { to: "/profile", key: "nav.profile" },
] as const;

export function Header() {
  const { t } = useI18n();
  const { user } = useSession();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const links = user ? appLinks : publicLinks;

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    setOpen(false);
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:grid-cols-[1fr_auto_1fr] lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink text-ink-foreground">
            <Sprout className="h-4 w-4" />
          </span>
          <span className="truncate font-display text-base font-bold tracking-tight">
            {t("brand.name")}
          </span>
        </Link>

        {/* Centered pill nav */}
        <nav className="hidden items-center rounded-full bg-ink p-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-1.5 text-xs font-medium text-ink-foreground/65 transition-colors hover:text-ink-foreground"
              activeProps={{ className: "bg-background text-foreground! shadow-sm" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1">
          <LanguageSwitcher compact />
          <ThemeToggle />

          {user ? (
            <Button
              variant="outline"
              size="sm"
              className="hidden rounded-full lg:inline-flex"
              onClick={signOut}
            >
              {t("nav.logout")}
            </Button>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link to="/auth">{t("nav.login")}</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full px-4">
                <Link to="/auth" search={{ mode: "signup" }}>
                  {t("nav.signup")}
                </Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {t(l.key)}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              {user ? (
                <Button variant="outline" className="flex-1 rounded-full" onClick={signOut}>
                  {t("nav.logout")}
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="flex-1 rounded-full">
                    <Link to="/auth" onClick={() => setOpen(false)}>
                      {t("nav.login")}
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 rounded-full">
                    <Link
                      to="/auth"
                      search={{ mode: "signup" }}
                      onClick={() => setOpen(false)}
                    >
                      {t("nav.signup")}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
