import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    registered?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/dashboard";

  return (
    <AuthShell
      title="Entrar na conta"
      subtitle="Acesse seus planos, check-ins e evolucao com IA."
    >
      <LoginForm nextPath={nextPath} registered={params.registered === "1"} />
    </AuthShell>
  );
}
