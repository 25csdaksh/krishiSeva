import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Leaf } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

const searchSchema = z.object({
  mode: z.enum(["signin", "signup"]).optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in to Krishi Seva" },
      {
        name: "description",
        content:
          "Sign in or create your free Krishi Seva account to access weather, crop advice, mandi prices and the farmer marketplace.",
      },
      { property: "og:title", content: "Sign in to Krishi Seva" },
      { property: "og:description", content: "Access your farm dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">(search.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Account created");
        navigate({ to: "/onboarding", replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard", replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">{t("brand.name")}</span>
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="rounded-3xl border border-border/60 bg-card/80 p-6 soft-shadow sm:p-8">
          <h1 className="text-2xl font-bold">
            {mode === "signup" ? t("auth.signupTitle") : t("auth.signinTitle")}
          </h1>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <Button type="submit" className="w-full rounded-full" disabled={busy}>
              {busy ? t("common.loading") : mode === "signup" ? t("auth.signup") : t("auth.signin")}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="mt-5 w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            {mode === "signup" ? t("auth.toSignin") : t("auth.toSignup")}
          </button>
        </div>
      </div>
    </div>
  );
}
