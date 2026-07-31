import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listActiveMarketListings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        crop: z.string().optional(),
        state: z.string().optional(),
        limit: z.number().optional(),
      })
      .default({})
      .parse(input ?? {}),
  )
  .handler(async ({ data, context }) => {
    let query = context.supabase
      .from("market_listings")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(data.limit ?? 50);
    if (data.crop) query = query.ilike("crop_name", `%${data.crop}%`);
    if (data.state) query = query.eq("state", data.state);
    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);
    return rows;
  });

export const listMyMarketListings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("market_listings")
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createMarketListing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        crop_name: z.string().min(1),
        variety: z.string().optional(),
        quantity: z.number().positive(),
        unit: z.string().min(1),
        price_per_unit: z.number().nonnegative(),
        description: z.string().optional(),
        image_url: z.string().optional(),
        district: z.string().optional(),
        state: z.string().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("market_listings")
      .insert({ ...data, user_id: context.userId })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateMarketListing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        id: z.string(),
        crop_name: z.string().optional(),
        variety: z.string().nullable().optional(),
        quantity: z.number().optional(),
        unit: z.string().optional(),
        price_per_unit: z.number().optional(),
        description: z.string().nullable().optional(),
        image_url: z.string().nullable().optional(),
        district: z.string().nullable().optional(),
        state: z.string().nullable().optional(),
        status: z.enum(["active", "sold", "expired"]).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { id, ...changes } = data;
    const { data: row, error } = await context.supabase
      .from("market_listings")
      .update(changes)
      .eq("id", id)
      .eq("user_id", context.userId)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteMarketListing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("market_listings")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
