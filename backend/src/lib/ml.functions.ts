// Leaf disease + crop recommendation via Python ML microservice.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const analyzeLeafDisease = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i: unknown) =>
    z
      .object({
        image_url: z.string().url(),
        crop_name: z.string().max(80).optional(),
      })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    const { predictLeafDisease } = await import("./services/ml.server");
    const result = await predictLeafDisease(data.image_url);
    const { data: row, error } = await context.supabase
      .from("leaf_disease_scans")
      .insert({
        user_id: context.userId,
        image_url: data.image_url,
        crop_name: data.crop_name ?? null,
        detected_disease: result.disease,
        confidence: result.confidence,
        remedy: result.remedy,
        raw_response: result.raw as any,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const recommendCropForProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i: unknown) =>
    z
      .object({
        N: z.number().optional(),
        P: z.number().optional(),
        K: z.number().optional(),
        temperature: z.number().optional(),
        humidity: z.number().optional(),
        ph: z.number().optional(),
        rainfall: z.number().optional(),
      })
      .parse(i ?? {}),
  )
  .handler(async ({ data, context }) => {
    const { recommendCrop } = await import("./services/ml.server");
    const { data: profile } = await context.supabase
      .from("farmer_profiles")
      .select("soil_type, current_season, state, district, land_size_hectares")
      .eq("user_id", context.userId)
      .maybeSingle();
    const input = {
      ...data,
      soil_type: profile?.soil_type ?? undefined,
      season: profile?.current_season ?? undefined,
      state: profile?.state ?? undefined,
      district: profile?.district ?? undefined,
      land_size_hectares: profile?.land_size_hectares ?? undefined,
    };
    const result = await recommendCrop(input);
    const { data: row, error } = await context.supabase
      .from("crop_recommendations")
      .insert({
        user_id: context.userId,
        input_snapshot: input as any,
        recommended_crops: result.recommended as any,
        raw_response: result.raw as any,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const listMyLeafScans = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("leaf_disease_scans")
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    return data;
  });

export const listMyCropRecommendations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("crop_recommendations")
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    return data;
  });
