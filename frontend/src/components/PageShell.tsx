import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function PageShell({
  children,
  hideFooter = false,
}: {
  children: ReactNode;
  hideFooter?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
