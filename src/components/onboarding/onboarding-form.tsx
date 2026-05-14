"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, Loader2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm, type FieldPath } from "react-hook-form";

import { saveOnboardingProfile } from "@/app/onboarding/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  goalOptions,
  levelOptions,
  onboardingSchema,
  type OnboardingValues,
} from "@/lib/onboarding/profile-schema";
import { cn } from "@/lib/utils";

const steps = [
  {
    fields: ["name", "age", "weightKg", "heightCm"],
    kicker: "Etapa 1",
    title: "Sobre você",
  },
  {
    fields: ["goal"],
    kicker: "Etapa 2",
    title: "Seu objetivo",
  },
  {
    fields: ["level", "trainingDaysPerWeek"],
    kicker: "Etapa 3",
    title: "Nível e frequência",
  },
] satisfies {
  fields: FieldPath<OnboardingValues>[];
  kicker: string;
  title: string;
}[];

type OnboardingFormProps = {
  initialName?: string;
};

export function OnboardingForm({ initialName = "" }: OnboardingFormProps) {
  const [step, setStep] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<OnboardingValues>({
    defaultValues: {
      age: undefined,
      goal: undefined,
      heightCm: undefined,
      level: undefined,
      name: initialName,
      trainingDaysPerWeek: 3,
      weightKg: undefined,
    },
    mode: "onTouched",
    resolver: zodResolver(onboardingSchema),
  });

  const activeStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  async function goNext() {
    const isValid = await form.trigger(activeStep.fields, {
      shouldFocus: true,
    });

    if (isValid) {
      setFormError(null);
      setStep((current) => Math.min(current + 1, steps.length - 1));
    }
  }

  function goBack() {
    setFormError(null);
    setStep((current) => Math.max(current - 1, 0));
  }

  function onSubmit(values: OnboardingValues) {
    setFormError(null);

    startTransition(async () => {
      const result = await saveOnboardingProfile(values);

      if (result?.error) {
        setFormError(result.error);
      }
    });
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">FitAI</p>
            <h1 className="text-2xl font-semibold">Monte seu perfil</h1>
          </div>
          <ThemeToggle />
        </div>

        <Card className="rounded-xl">
          <CardHeader className="gap-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardDescription>{activeStep.kicker}</CardDescription>
                <CardTitle className="text-xl">{activeStep.title}</CardTitle>
              </div>
              <span className="text-sm text-muted-foreground">
                {step + 1}/{steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="min-h-[360px] transition-all duration-300 ease-out">
                {step === 0 ? (
                  <div className="grid gap-4 animate-in fade-in-0 slide-in-from-right-2 duration-300 md:grid-cols-2">
                    <FieldError error={form.formState.errors.name?.message}>
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        autoComplete="name"
                        aria-invalid={Boolean(form.formState.errors.name)}
                        {...form.register("name")}
                      />
                    </FieldError>
                    <FieldError error={form.formState.errors.age?.message}>
                      <Label htmlFor="age">Idade</Label>
                      <Input
                        id="age"
                        type="number"
                        inputMode="numeric"
                        min={13}
                        max={100}
                        aria-invalid={Boolean(form.formState.errors.age)}
                        {...form.register("age", { valueAsNumber: true })}
                      />
                    </FieldError>
                    <FieldError error={form.formState.errors.weightKg?.message}>
                      <Label htmlFor="weightKg">Peso (kg)</Label>
                      <Input
                        id="weightKg"
                        type="number"
                        inputMode="decimal"
                        min={30}
                        max={300}
                        step="0.1"
                        aria-invalid={Boolean(form.formState.errors.weightKg)}
                        {...form.register("weightKg", { valueAsNumber: true })}
                      />
                    </FieldError>
                    <FieldError error={form.formState.errors.heightCm?.message}>
                      <Label htmlFor="heightCm">Altura (cm)</Label>
                      <Input
                        id="heightCm"
                        type="number"
                        inputMode="numeric"
                        min={100}
                        max={250}
                        aria-invalid={Boolean(form.formState.errors.heightCm)}
                        {...form.register("heightCm", { valueAsNumber: true })}
                      />
                    </FieldError>
                  </div>
                ) : null}

                {step === 1 ? (
                  <ChoiceGrid
                    error={form.formState.errors.goal?.message}
                    name="goal"
                    options={goalOptions}
                    value={form.watch("goal")}
                    onChange={(value) => {
                      form.setValue("goal", value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      });
                    }}
                  />
                ) : null}

                {step === 2 ? (
                  <div className="flex flex-col gap-5 animate-in fade-in-0 slide-in-from-right-2 duration-300">
                    <ChoiceGrid
                      error={form.formState.errors.level?.message}
                      name="level"
                      options={levelOptions}
                      value={form.watch("level")}
                      onChange={(value) => {
                        form.setValue("level", value, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                      }}
                    />
                    <FieldError error={form.formState.errors.trainingDaysPerWeek?.message}>
                      <div className="flex items-center justify-between gap-4">
                        <Label htmlFor="trainingDaysPerWeek">
                          Dias por semana
                        </Label>
                        <span className="rounded-lg border px-2 py-1 text-sm text-muted-foreground">
                          {form.watch("trainingDaysPerWeek")} dias
                        </span>
                      </div>
                      <Input
                        id="trainingDaysPerWeek"
                        type="range"
                        min={2}
                        max={6}
                        step={1}
                        className="h-8 cursor-pointer px-0 accent-violet-500"
                        aria-invalid={Boolean(
                          form.formState.errors.trainingDaysPerWeek
                        )}
                        {...form.register("trainingDaysPerWeek", {
                          valueAsNumber: true,
                        })}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        {[2, 3, 4, 5, 6].map((day) => (
                          <span key={day}>{day}</span>
                        ))}
                      </div>
                    </FieldError>
                  </div>
                ) : null}
              </div>

              {formError ? (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {formError}
                </p>
              ) : null}

              <div className="flex items-center justify-between gap-3 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  disabled={step === 0 || isPending}
                >
                  <ArrowLeftIcon aria-hidden="true" data-icon="inline-start" />
                  Voltar
                </Button>
                {step < steps.length - 1 ? (
                  <Button type="button" onClick={goNext}>
                    Próximo
                    <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isPending}>
                    {isPending ? (
                      <Loader2Icon
                        aria-hidden="true"
                        className="animate-spin"
                        data-icon="inline-start"
                      />
                    ) : (
                      <CheckIcon aria-hidden="true" data-icon="inline-start" />
                    )}
                    Começar
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function FieldError({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

function ChoiceGrid<TValue extends string>({
  error,
  name,
  onChange,
  options,
  value,
}: {
  error?: string;
  name: string;
  onChange: (value: TValue) => void;
  options: readonly {
    description: string;
    icon: string;
    label: string;
    value: TValue;
  }[];
  value?: TValue;
}) {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in-0 slide-in-from-right-2 duration-300">
      <div className="grid gap-3 md:grid-cols-3">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "flex min-h-36 flex-col gap-3 rounded-xl border bg-card p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-500/5 hover:shadow-lg hover:shadow-violet-500/10 focus-visible:border-violet-500 focus-visible:ring-3 focus-visible:ring-violet-500/25 focus-visible:outline-none",
                selected &&
                  "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10 ring-2 ring-violet-500/20"
              )}
              key={option.value}
              name={name}
              type="button"
              onClick={() => onChange(option.value)}
            >
              <span className="text-2xl" aria-hidden="true">
                {option.icon}
              </span>
              <span className="font-medium">{option.label}</span>
              <span className="text-sm leading-5 text-muted-foreground">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
