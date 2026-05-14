"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const loginSchema = z.object({
  email: z.string().email("Digite um email valido."),
  password: z.string().min(1, "Digite sua senha."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  nextPath: string;
  registered: boolean;
};

export function LoginForm({ nextPath, registered }: LoginFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(values: LoginFormValues) {
    setFormError(null);

    startTransition(async () => {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword(values);

      if (error) {
        setFormError("Email ou senha invalidos.");
        return;
      }

      router.replace(nextPath);
      router.refresh();
    });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      {registered ? (
        <p className="rounded-lg border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
          Cadastro iniciado. Se o Supabase pedir confirmacao, valide seu email
          antes de entrar.
        </p>
      ) : null}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(form.formState.errors.email)}
          {...form.register("email")}
        />
        {form.formState.errors.email ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(form.formState.errors.password)}
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </p>
        ) : null}
      </div>
      {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? <Loader2Icon aria-hidden="true" data-icon="inline-start" /> : null}
        Entrar
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Ainda nao tem conta?{" "}
        <Link className="font-medium text-primary hover:underline" href="/register">
          Criar cadastro
        </Link>
      </p>
    </form>
  );
}
