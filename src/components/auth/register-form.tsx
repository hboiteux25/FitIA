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

const registerSchema = z
  .object({
    nome: z.string().min(2, "Digite seu nome."),
    email: z.string().email("Digite um email valido."),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
    confirmPassword: z.string().min(6, "Confirme sua senha."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas precisam ser iguais.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      nome: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(values: RegisterFormValues) {
    setFormError(null);

    startTransition(async () => {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            nome: values.nome,
          },
          emailRedirectTo: `${window.location.origin}/onboarding`,
        },
      });

      if (error) {
        setFormError("Nao foi possivel criar sua conta agora.");
        return;
      }

      router.replace("/onboarding");
      router.refresh();
    });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(form.formState.errors.nome)}
          {...form.register("nome")}
        />
        {form.formState.errors.nome ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.nome.message}
          </p>
        ) : null}
      </div>
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
          autoComplete="new-password"
          aria-invalid={Boolean(form.formState.errors.password)}
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(form.formState.errors.confirmPassword)}
          {...form.register("confirmPassword")}
        />
        {form.formState.errors.confirmPassword ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.confirmPassword.message}
          </p>
        ) : null}
      </div>
      {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? <Loader2Icon aria-hidden="true" data-icon="inline-start" /> : null}
        Criar conta
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Ja tem conta?{" "}
        <Link className="font-medium text-primary hover:underline" href="/login">
          Entrar
        </Link>
      </p>
    </form>
  );
}
