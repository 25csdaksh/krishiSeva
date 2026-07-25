// Mandi / commodity prices.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMandiPrices = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) =>
    z
      .object({
        commodity: z.string().max(80).optional(),
        state: z.string().max(120).optional(),
        district: z.string().max(120).optional(),
        limit: z.number().int().min(1).max(200).default(50),
      })
      .parse(i ?? {}),
  )
  .handler(async ({ data }) => {
    const { fetchMandiPrices } = await import("./services/mandiPrice.server");
    return fetchMandiPrices(data);
  });