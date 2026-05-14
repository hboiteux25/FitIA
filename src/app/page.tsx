import {
  ActivityIcon,
  ArrowUpRightIcon,
  BrainCircuitIcon,
  DumbbellIcon,
  FlameIcon,
  GaugeIcon,
  SparklesIcon,
  TargetIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_OPENAI_MODEL } from "@/lib/ai/config";

type Metric = {
  label: string;
  value: string;
  detail: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type WorkoutBlock = {
  title: string;
  focus: string;
  load: string;
  progress: number;
};

const metrics: Metric[] = [
  {
    label: "Readiness",
    value: "87%",
    detail: "sono e recuperacao em alta",
    icon: GaugeIcon,
  },
  {
    label: "Volume",
    value: "12.4k kg",
    detail: "semana atual",
    icon: DumbbellIcon,
  },
  {
    label: "Streak",
    value: "18 dias",
    detail: "consistencia ativa",
    icon: FlameIcon,
  },
];

const workoutBlocks: WorkoutBlock[] = [
  {
    title: "Lower strength",
    focus: "Agachamento, posterior e core",
    load: "Pesado",
    progress: 76,
  },
  {
    title: "Zone 2 engine",
    focus: "Bike com respiracao controlada",
    load: "Base",
    progress: 58,
  },
  {
    title: "AI mobility reset",
    focus: "Quadril, tornozelo e coluna toracica",
    load: "Recuperacao",
    progress: 42,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg border bg-card">
              <BrainCircuitIcon aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">FitAI command</p>
              <h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">
                Treino guiado por dados
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild>
              <a href="#plan">
                Gerar plano
                <SparklesIcon aria-hidden="true" data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <Card className="min-h-[420px] justify-between border-primary/20 bg-card/80">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Next.js 15</Badge>
                <Badge variant="outline">Supabase</Badge>
                <Badge variant="outline">{DEFAULT_OPENAI_MODEL}</Badge>
              </div>
              <CardTitle className="max-w-2xl text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                Inteligencia artificial para transformar treino em resultado.
              </CardTitle>
              <CardDescription className="max-w-2xl text-base">
                A plataforma que une academia, dados e tecnologia para criar
                planos personalizados, acompanhar evolucao e acelerar cada meta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                {metrics.map((metric) => {
                  const Icon = metric.icon;

                  return (
                    <Card key={metric.label} size="sm" className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon aria-hidden="true" />
                          {metric.label}
                        </CardTitle>
                        <CardDescription>{metric.detail}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-semibold">{metric.value}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="justify-between gap-3">
              <span className="text-sm text-muted-foreground">
                Mobile-first, dark mode e cards com borda sutil.
              </span>
              <ArrowUpRightIcon aria-hidden="true" />
            </CardFooter>
          </Card>

          <Card id="plan">
            <CardHeader>
              <CardTitle>Plano de hoje</CardTitle>
              <CardDescription>
                Blocos montados para carga, energia e recuperacao.
              </CardDescription>
              <CardAction>
                <Badge>AI ready</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {workoutBlocks.map((block) => (
                <div key={block.title} className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{block.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {block.focus}
                      </p>
                    </div>
                    <Badge variant="secondary">{block.load}</Badge>
                  </div>
                  <Progress value={block.progress} aria-label={block.title} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon aria-hidden="true" />
                Objetivo
              </CardTitle>
              <CardDescription>
                Recomposicao corporal com progresso mensuravel.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivityIcon aria-hidden="true" />
                Biofeedback
              </CardTitle>
              <CardDescription>
                Rotina pronta para conectar check-ins e metricas do Supabase.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuitIcon aria-hidden="true" />
                Coach IA
              </CardTitle>
              <CardDescription>
                Modelo padrao barato e competente para fluxos do produto.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Separator />
      </section>
    </main>
  );
}
