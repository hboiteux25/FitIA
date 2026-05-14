"use server";

import { redirect } from "next/navigation";

import { onboardingSchema, type OnboardingValues } from "@/lib/onboarding/profile-schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type SaveProfileState = {
  error?: string;
};

export async function saveOnboardingProfile(
  values: OnboardingValues
): Promise<SaveProfileState> {
  const parsed = onboardingSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Revise os dados do perfil.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/onboarding");
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      age: parsed.data.age,
      fitness_level: parsed.data.level,
      full_name: parsed.data.name,
      goal: parsed.data.goal,
      height_cm: parsed.data.heightCm,
      id: user.id,
      training_days_per_week: parsed.data.trainingDaysPerWeek,
      updated_at: new Date().toISOString(),
      weight_kg: parsed.data.weightKg,
    },
    {
      onConflict: "id",
    }
  );

  if (error) {
    return {
      error: "Nao foi possivel salvar seu perfil agora.",
    };
  }

  redirect("/dashboard");
}
