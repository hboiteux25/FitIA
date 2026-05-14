import "server-only";

import OpenAI from "openai";

import { getOpenAIEnv } from "@/lib/env";

export function createOpenAIClient() {
  const { OPENAI_API_KEY } = getOpenAIEnv();

  return new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
}
