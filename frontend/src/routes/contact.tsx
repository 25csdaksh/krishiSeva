import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Krishi Seva — Support for farmers" },
      {
        name: "description",
        content:
          "Questions, feedback or trouble using Krishi Seva? Send us a message and our team will get back to you.",
      },
      { property: "og:title", content: "Contact Krishi Seva" },
      { property: "og:description", content: "Get support with the Krishi Seva app." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    toast.success(t("contact.sent"));
  }

  return (
    <PageShell>
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold sm:text-5xl">{t("contact.title")}</h1>
          <p className="mt-5 text-base text-muted-foreground">{t("contact.p")}</p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <Mail className="h-4 w-4" />
              </span>
              <span className="min-w-0 truncate text-muted-foreground">help@krishiseva.in</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <Phone className="h-4 w-4" />
              </span>
              <span className="text-muted-foreground">+91 98250 00000</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="text-muted-foreground">Ahmedabad, Gujarat, India</span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-3xl border border-border/60 bg-surface/50 p-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name">{t("contact.name")}</Label>
            <Input id="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("contact.email")}</Label>
            <Input id="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t("contact.message")}</Label>
            <Textarea id="message" rows={5} required />
          </div>
          <Button type="submit" className="w-full rounded-full" disabled={sent}>
            {sent ? t("contact.sent") : t("contact.send")}
          </Button>
        </form>
      </section>
    </PageShell>
  );
}
