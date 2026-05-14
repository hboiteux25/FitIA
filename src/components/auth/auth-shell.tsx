import { DumbbellIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

type AuthShellProps = {
  children: React.ReactNode;
  subtitle: string;
  title: string;
};

export function AuthShell({ children, subtitle, title }: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-8 text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.58_0.18_305_/_0.22),transparent_42%)]" />
      <Card className="relative w-full max-w-md border-primary/15 bg-card/90 shadow-2xl shadow-primary/5 backdrop-blur">
        <CardHeader className="items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-lg border bg-background">
            <DumbbellIcon aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">FitAI</p>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}
