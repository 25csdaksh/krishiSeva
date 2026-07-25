// Farmer profile server functions.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const profileUpdateSchema = z.object({
  full_name: z.string().min(1).max(120).optional(),
  phone: z.string().min(6).max(20).optional(),
  district: z.string().max(120).optional(),
  state: z.string().max(120).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  land_size_hectares: z.number().min(0).max(100000).optional(),
  current_season: z.enum(["kharif", "rabi", "zaid", "summer", "winter"]).optional(),
  soil_type: z
    .enum(["alluvial", "black", "red", "laterite", "desert", "mountain", "peaty", "saline", "unknown"])
    .optional(),
  primary_crops: z.array(z.string().max(60)).max(20).optional(),
  preferred_language: z.string().max(10).optional(),
  onboarding_completed: z.boolean().optional(),
});

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("farmer_profiles")
      .select("*")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => profileUpdateSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("farmer_profiles")
      .update(data)
      .eq("user_id", context.userId)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const completeOnboarding = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => profileUpdateSchema.parse(input))
  .handler(async ({ data, context }) => {
    const payload = { ...data, onboarding_completed: true };
    const { data: row, error } = await context.supabase
      .from("farmer_profiles")
      .update(payload)
      .eq("user_id", context.userId)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });