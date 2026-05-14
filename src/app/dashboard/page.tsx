import { DumbbellIcon } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg border bg-card">
            <DumbbellIcon aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">FitAI</p>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao seu centro de treino</CardTitle>
            <CardDescription>
              Logado como {user?.email ?? "usuario autenticado"}.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </main>
  );
}
