import { z } from "zod";

export const goalOptions = [
  {
    description: "Perder gordura e definir o corpo",
    icon: "🏃",
    label: "Emagrecer",
    value: "lose_weight",
  },
  {
    description: "Aumentar massa muscular e força",
    icon: "🏋️‍♂️",
    label: "Ganhar massa",
    value: "gain_muscle",
  },
  {
    description: "Melhorar resistência e saúde geral",
    icon: "🤸",
    label: "Condicionamento",
    value: "conditioning",
  },
] as const;

export const levelOptions = [
  {
    description: "Comecei a pouco tempo ou estou voltando",
    icon: "🟢",
    label: "Iniciante",
    value: "beginner",
  },
  {
    description: "Treino há alguns meses com regularidade",
    icon: "🟡",
    label: "Intermediário",
    value: "intermediate",
  },
  {
    description: "Treino há anos e quero intensificar",
    icon: "🔴",
    label: "Avançado",
    value: "advanced",
  },
] as const;

const goalValues = goalOptions.map((option) => option.value) as [
  (typeof goalOptions)[number]["value"],
  ...(typeof goalOptions)[number]["value"][],
];

const levelValues = levelOptions.map((option) => option.value) as [
  (typeof levelOptions)[number]["value"],
  ...(typeof levelOptions)[number]["value"][],
];

export const onboardingSchema = z.object({
  age: z
    .number({ error: "Digite sua idade." })
    .int("Digite uma idade valida.")
    .min(13, "A idade minima e 13 anos.")
    .max(100, "Digite uma idade valida."),
  goal: z.enum(goalValues, { error: "Escolha um objetivo." }),
  heightCm: z
    .number({ error: "Digite sua altura." })
    .int("Digite uma altura valida.")
    .min(100, "Digite sua altura em centimetros.")
    .max(250, "Digite uma altura valida."),
  level: z.enum(levelValues, { error: "Escolha seu nivel." }),
  name: z.string().trim().min(2, "Digite seu nome."),
  trainingDaysPerWeek: z
    .number({ error: "Escolha a frequencia." })
    .int("Escolha uma frequencia valida.")
    .min(2, "O minimo e 2 dias por semana.")
    .max(6, "O maximo e 6 dias por semana."),
  weightKg: z
    .number({ error: "Digite seu peso." })
    .min(30, "Digite seu peso em kg.")
    .max(300, "Digite um peso valido."),
});

export type OnboardingValues = z.infer<typeof onboardingSchema>;
