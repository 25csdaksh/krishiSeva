// Signed upload URLs for the private krishi-uploads bucket.
// Files are namespaced under `<userId>/<kind>/<filename>` so per-user RLS on
// storage.objects (foldername[1] = auth.uid) applies automatically.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const kinds = ["leaf", "product", "profile"] as const;

export const createUploadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i: unknown) =>
    z
      .object({
        kind: z.enum(kinds),
        filename: z
          .string()
          .min(1)
          .max(120)
          .regex(/^[a-zA-Z0-9._-]+$/, "invalid filename"),
      })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    const path = `${context.userId}/${data.kind}/${Date.now()}-${data.filename}`;
    const { data: signed, error } = await context.supabase.storage
      .from("krishi-uploads")
      .createSignedUploadUrl(path);
    if (error) throw new Error(error.message);
    return { path, token: signed.token, signedUrl: signed.signedUrl };
  });

export const createDownloadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i: unknown) =>
    z
      .object({ path: z.string().min(1).max(500), expiresIn: z.number().int().min(30).max(3600).default(600) })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    if (!data.path.startsWith(`${context.userId}/`)) {
      throw new Error("forbidden");
    }
    const { data: signed, error } = await context.supabase.storage
      .from("krishi-uploads")
      .createSignedUrl(data.path, data.expiresIn);
    if (error) throw new Error(error.message);
    return signed;
  });
