// Government schemes (public read via publishable key).
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listSchemes = createServerFn({ method: "POST" })
  .validator((i: unknown) =>
    z
      .object({
        state: z.string().max(120).optional(),
        category: z.string().max(80).optional(),
      })
      .parse(i ?? {}),
  )
  .handler(async ({ data }) => {
    let q = publicClient()
      .from("schemes")
      .select("id, title, slug, description, category, eligibility, benefits, application_link, ministry, state")
      .eq("is_active", true)
      .order("title");
    if (data.state) q = q.or(`state.is.null,state.eq.${data.state}`);
    if (data.category) q = q.eq("category", data.category);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const getSchemeBySlug = createServerFn({ method: "POST" })
  .validator((i: unknown) => z.object({ slug: z.string().min(1).max(120) }).parse(i))
  .handler(async ({ data }) => {
    const { data: row, error } = await publicClient()
      .from("schemes")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_active", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });
