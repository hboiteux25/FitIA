import "server-only";

import { z } from "zod";

import { DEFAULT_OPENAI_MODEL } from "@/lib/ai/config";

const supabaseEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
});

const openAIEnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_MODEL: z.string().min(1).default(DEFAULT_OPENAI_MODEL),
});

export type OpenAIEnv = z.infer<typeof openAIEnvSchema>;
export type SupabaseEnv = z.infer<typeof supabaseEnvSchema>;

export function getSupabaseEnv(): SupabaseEnv {
  return supabaseEnvSchema.parse(process.env);
}

export function getOpenAIEnv(): OpenAIEnv {
  return openAIEnvSchema.parse(process.env);
}
