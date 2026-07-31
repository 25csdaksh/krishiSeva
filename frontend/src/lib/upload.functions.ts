import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const createUploadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        kind: z.enum(["leaf", "product", "profile"]),
        filename: z.string().min(1),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const safeName = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${context.userId}/${data.kind}/${Date.now()}-${safeName}`;
    const { data: signed, error } = await context.supabase.storage
      .from("krishi-uploads")
      .createSignedUploadUrl(path);
    if (error) throw new Error(error.message);
    return { path, token: signed.token, signedUrl: signed.signedUrl };
  });

export const createDownloadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z.object({ path: z.string(), expiresIn: z.number().optional() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: signed, error } = await context.supabase.storage
      .from("krishi-uploads")
      .createSignedUrl(data.path, data.expiresIn ?? 3600);
    if (error) throw new Error(error.message);
    return { url: signed.signedUrl };
  });
