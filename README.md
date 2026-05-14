# FitAI

FitAI é uma plataforma web para treinos personalizados com inteligência artificial. A proposta é transformar dados simples do usuário, como objetivo, nível, medidas e frequência semanal, em uma experiência de acompanhamento fitness mais inteligente, visual e fácil de usar.

O projeto combina autenticação, onboarding, dashboard e base para geração de planos com IA usando Next.js, Supabase e OpenAI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20Postgres-3ECF8E?style=for-the-badge&logo=supabase&logoColor=111)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=111)

## Visão Geral

FitAI nasceu como um produto para unir tecnologia, treino e evolução pessoal em uma interface moderna. O app já possui fluxo de cadastro, login, onboarding em etapas, persistência de perfil no Supabase e uma primeira experiência de dashboard.

A base foi pensada para crescer em direção a um coach fitness com IA: geração de planos, check-ins, ajustes de treino, histórico de evolução e recomendações personalizadas.

## Funcionalidades

- Autenticação com Supabase.
- Cadastro e login com validação de formulário.
- Onboarding em 3 etapas para criação do perfil:
  - dados pessoais;
  - objetivo principal;
  - nível de treino e frequência semanal.
- Redirecionamento automático:
  - usuários sem sessão vão para login;
  - usuários com perfil criado pulam o onboarding e vão para o dashboard.
- Salvamento do perfil no banco de dados.
- Dashboard inicial autenticado.
- Suporte a tema claro e escuro com `next-themes`.
- UI responsiva usando Tailwind CSS, shadcn-style components e lucide-react.
- Estrutura preparada para integração com OpenAI.

## Stack

- **Next.js 15** com App Router e Turbopack.
- **React 19**.
- **TypeScript**.
- **Tailwind CSS 4**.
- **Supabase** para autenticação, sessão SSR e Postgres.
- **OpenAI SDK** para futuras rotinas de IA.
- **React Hook Form** e **Zod** para formulários e validação.
- **Lucide React** para ícones.
- **next-themes** para dark mode.

## Estrutura do Projeto

```txt
src/
  app/
    dashboard/      # área autenticada
    login/          # entrada do usuário
    onboarding/     # formulário em etapas e server action
    register/       # criação de conta
  components/
    auth/           # formulários e layout de autenticação
    onboarding/     # formulário de perfil
    ui/             # componentes reutilizáveis
  lib/
    ai/             # configuração da OpenAI
    onboarding/     # schema do perfil
    supabase/       # clients browser/server/middleware
supabase/
  migrations/       # schema SQL do projeto
```

## Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/hboiteux25/FitIA.git
cd FitIA
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` baseado no `.env.example`:

```bash
cp .env.example .env.local
```

Preencha os valores:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5-mini
```

### 4. Prepare o banco no Supabase

Execute a migration em:

```txt
supabase/migrations/20260514000000_create_profiles.sql
```

Ela cria a tabela `profiles`, adiciona constraints, ativa RLS e configura policies para que cada usuário acesse apenas o próprio perfil.

### 5. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Abra:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev      # inicia o servidor local
npm run build    # gera build de produção
npm run start    # roda a build de produção
npm run lint     # executa o ESLint
```

## Fluxo Principal

1. O usuário cria uma conta em `/register`.
2. Após o cadastro, ele segue para `/onboarding`.
3. O onboarding coleta dados essenciais para personalização.
4. O perfil é salvo em `profiles`.
5. O usuário é redirecionado para `/dashboard`.
6. Em acessos futuros, se o perfil já existir, o onboarding é pulado automaticamente.

## Roadmap

- Geração de plano de treino com IA.
- Dashboard com métricas reais de evolução.
- Check-ins semanais.
- Histórico de treinos.
- Ajustes automáticos com base em feedback do usuário.
- Área de planos, exercícios e recomendações.
- Deploy em produção.

## Status

Projeto em desenvolvimento ativo. A fundação do produto já está pronta: autenticação, onboarding, persistência de perfil, dashboard inicial, tema claro/escuro e estrutura para IA.

## Autor

Desenvolvido por [Henrique Boiteux](https://github.com/hboiteux25).
