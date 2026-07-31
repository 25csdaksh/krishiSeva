import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMandiPrices = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        commodity: z.string().optional(),
        state: z.string().optional(),
        district: z.string().optional(),
        limit: z.number().optional(),
      })
      .default({})
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    const { fetchMandiPrices } = await import("./price.server");
    return fetchMandiPrices(data);
  });
