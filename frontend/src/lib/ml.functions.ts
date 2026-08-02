import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const analyzeLeafDisease = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ image_url: z.string().min(1), crop_name: z.string().optional() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { analyzeLeaf } = await import("./ml.server");

    let viewUrl = data.image_url;
    if (!/^https?:\/\//.test(data.image_url)) {
      const { data: signed, error } = await context.supabase.storage
        .from("krishi-uploads")
        .createSignedUrl(data.image_url, 600);
      if (error) throw new Error(error.message);
      viewUrl = signed.signedUrl;
    }

    const result = await analyzeLeaf(viewUrl, data.crop_name);

    const { data: row, error } = await context.supabase
      .from("leaf_disease_scans")
      .insert({
        user_id: context.userId,
        image_url: data.image_url,
        crop_name: result.crop ?? data.crop_name ?? null,
        detected_disease: result.disease,
        confidence: result.confidence,
        remedy: result.remedy,
        raw_response: JSON.parse(JSON.stringify(result)),
      })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const recommendCropForProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
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
      .default({})
      .parse(input ?? {}),
  )
  .handler(async ({ data, context }) => {
    const { recommendCrops } = await import("./ml.server");

    const { data: profile } = await context.supabase
      .from("farmer_profiles")
      .select("*")
      .eq("user_id", context.userId)
      .maybeSingle();

    const snapshot = {
      ...data,
      soil_type: profile?.soil_type ?? "unknown",
      season: profile?.current_season ?? null,
      district: profile?.district ?? null,
      state: profile?.state ?? null,
      land_size_hectares: profile?.land_size_hectares ?? null,
    };

    const result = await recommendCrops(snapshot);

    const { data: row, error } = await context.supabase
      .from("crop_recommendations")
      .insert({
        user_id: context.userId,
        input_snapshot: JSON.parse(JSON.stringify(snapshot)),
        recommended_crops: JSON.parse(JSON.stringify(result.crops)),
        raw_response: { text: result.raw },
      })
      .select("*")
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
      .limit(20);
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
      .limit(20);
    if (error) throw new Error(error.message);
    return data;
  });
