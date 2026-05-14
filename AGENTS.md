# AGENTS.md

## Stack

- Next.js 15 com App Router.
- TypeScript em tudo.
- Supabase para banco, auth e storage.
- OpenAI API com `gpt-5-mini` como modelo padrao bom e barato.
- Tailwind CSS v4 com shadcn/ui.
- Tema dark como padrao.

## Regras de Implementacao

- Use Server Components por padrao.
- Adicione `"use client"` somente quando houver interatividade real, hooks de React, browser APIs ou eventos no client.
- Nunca use `any`. Modele dados com tipos, interfaces, generics ou schemas.
- Formularios devem usar `react-hook-form` com validacao `zod`.
- Nunca exponha chaves de API no client-side.
- Variaveis sensiveis ficam em `.env.local`, nunca hardcoded.
- Nao deixe `console.log` no codigo final.
- Prefira imports diretos e componentes pequenos.

## Supabase

- Clientes Supabase privilegiados devem viver apenas no servidor.
- Ative RLS para tabelas expostas.
- Nao use `service_role` em componentes client-side.
- Valide entradas antes de escrever no banco.

## OpenAI

- Use o helper server-only em `src/lib/ai/openai.ts`.
- O modelo padrao fica em `OPENAI_MODEL` e cai para `gpt-5-mini`.
- Nunca envie prompts ou respostas sensiveis para logs.

## Design

- Mobile-first.
- Visual moderno com pegada de academia e IA.
- Dark mode por padrao.
- Cards com borda sutil.
- Use tokens semanticos do shadcn/ui em vez de cores soltas.
- Mantenha interfaces densas, claras e prontas para evoluir para dashboard.
