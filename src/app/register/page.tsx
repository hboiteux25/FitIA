import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Criar conta"
      subtitle="Comece seu plano inteligente com email e senha."
    >
      <RegisterForm />
    </AuthShell>
  );
}
