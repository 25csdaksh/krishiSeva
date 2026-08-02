// Market listings CRUD.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const listingSchema = z.object({
  crop_name: z.string().min(1).max(80),
  variety: z.string().max(80).optional(),
  quantity: z.number().positive().max(1_000_000),
  unit: z.string().min(1).max(20).default("kg"),
  price_per_unit: z.number().min(0).max(10_000_000),
  description: z.string().max(2000).optional(),
  image_url: z.string().url().optional(),
  district: z.string().max(120).optional(),
  state: z.string().max(120).optional(),
});

export const listActiveMarketListings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        crop: z.string().max(80).optional(),
        state: z.string().max(120).optional(),
        limit: z.number().int().min(1).max(100).default(50),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data, context }) => {
    let q = context.supabase
      .from("market_listings")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(data.limit);
    if (data.crop) q = q.ilike("crop_name", `%${data.crop}%`);
    if (data.state) q = q.eq("state", data.state);
    const { data: rows, error } = await q;
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
  .inputValidator((input: unknown) => listingSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("market_listings")
      .insert({ ...data, user_id: context.userId })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateMarketListing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({ id: z.string().uuid() })
      .merge(listingSchema.partial())
      .extend({ status: z.enum(["active", "sold", "expired"]).optional() })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { id, ...patch } = data;
    const { data: row, error } = await context.supabase
      .from("market_listings")
      .update(patch)
      .eq("id", id)
      .eq("user_id", context.userId)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteMarketListing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("market_listings")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });