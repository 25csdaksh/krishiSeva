import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("farmer_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (data) return data;

    const { data: created, error: insertError } = await supabase
      .from("farmer_profiles")
      .insert({ user_id: userId })
      .select("*")
      .single();
    if (insertError) throw new Error(insertError.message);
    return created;
  });

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        full_name: z.string().nullable().optional(),
        phone: z.string().nullable().optional(),
        district: z.string().nullable().optional(),
        state: z.string().nullable().optional(),
        latitude: z.number().nullable().optional(),
        longitude: z.number().nullable().optional(),
        land_size_hectares: z.number().nullable().optional(),
        current_season: z
          .enum(["kharif", "rabi", "zaid", "summer", "winter"])
          .nullable()
          .optional(),
        soil_type: z
          .enum([
            "alluvial",
            "black",
            "red",
            "laterite",
            "desert",
            "mountain",
            "peaty",
            "saline",
            "unknown",
          ])
          .nullable()
          .optional(),
        primary_crops: z.array(z.string()).nullable().optional(),
        preferred_language: z.string().nullable().optional(),
        onboarding_completed: z.boolean().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: updated, error } = await supabase
      .from("farmer_profiles")
      .upsert({ ...data, user_id: userId }, { onConflict: "user_id" })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return updated;
  });

export const completeOnboarding = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        full_name: z.string().nullable().optional(),
        phone: z.string().nullable().optional(),
        district: z.string().nullable().optional(),
        state: z.string().nullable().optional(),
        latitude: z.number().nullable().optional(),
        longitude: z.number().nullable().optional(),
        land_size_hectares: z.number().nullable().optional(),
        current_season: z
          .enum(["kharif", "rabi", "zaid", "summer", "winter"])
          .nullable()
          .optional(),
        soil_type: z
          .enum([
            "alluvial",
            "black",
            "red",
            "laterite",
            "desert",
            "mountain",
            "peaty",
            "saline",
            "unknown",
          ])
          .nullable()
          .optional(),
        primary_crops: z.array(z.string()).nullable().optional(),
        preferred_language: z.string().nullable().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: updated, error } = await supabase
      .from("farmer_profiles")
      .upsert(
        { ...data, user_id: userId, onboarding_completed: true },
        { onConflict: "user_id" },
      )
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return updated;
  });
