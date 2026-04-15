# CashRegisterReact - Frontend

## Visão Geral
Este diretório contém o frontend da aplicação Cash Register, desenvolvido com **React 19** e **Vite**.

## Tecnologias Principais
- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **UI Library:** [Mantine UI v8](https://mantine.dev/)
- **Routing:** React Router DOM v6 (Data APIs)
- **State Management:** React Context API (ex: `AuthContext`)
- **HTTP Client:** Fetch API (encapsulada em services)

## Estrutura de Pastas
- `CashRegisterApp/`: O código fonte principal da aplicação.

## Mandatos para o Gemini
1. **Logging:** Registrar todas as alterações técnicas e decisões no arquivo `../FRONTEND_LOG.txt`.
2. **Componentes Funcionais:** Use sempre componentes funcionais com hooks.
2. **Tipagem:** Mantenha a tipagem rigorosa com TypeScript. Defina interfaces para todas as respostas de API e propriedades de componentes.
3. **Mantine UI:** Utilize componentes do Mantine para manter a consistência visual. Prefira os hooks do Mantine (`@mantine/hooks`, `@mantine/form`) para lógica de UI.
4. **Services:** Toda comunicação com o backend deve ser isolada na pasta `services/`.
5. **Estilização:** Utilize o sistema de temas do Mantine e CSS Modules ou Vanilla CSS quando necessário.
6. **Padrões React 19:** Sempre consulte as documentações oficiais recentes e utilize recursos nativos e atuais do React 19+. APIs depreciadas como `forwardRef` devem ser evitadas. Em caso de dúvida, pesquise antes de gerar código. Componentes que expõem funções devem receber `ref` como uma `prop` comum.

## Status Atual / Próximos Passos
- **Implementado:** Criação dos novos módulos de ERP (Estoque, Vendas, Financeiro) com rotas e componentes base.
- **Implementado:** Funcionalidade de alteração de senha segura integrada com o backend.
- **Implementado:** Proteção de rotas (`ProtectedRoute`) com validação de perfis (`Admin`, etc.).
- **Implementado:** Menu lateral (Navbar) responsivo e integrado com o Layout Principal.
- **Próximos Passos:** Implementar os formulários e tabelas detalhados para os novos módulos do ERP.
- **Próximos Passos:** Definir o alinhamento e centralização (`Center` / `Container`) para os formulários dentro do `MainLayout`.

# Padrão Global de Formulários - ERP Frontend

Atue como um Desenvolvedor Frontend Sênior especialista em React, TypeScript, React Hook Form, Zod e Mantine UI.
Seu objetivo é gerar formulários estritamente alinhados à "Arquitetura de 4 Camadas" do nosso projeto.

## Regras Absolutas de Arquitetura:
1. **Zod First:** Todo formulário DEVE ter um schema Zod exportado em um arquivo separado. Infira o tipo TypeScript a partir desse schema (`z.infer`).
2. **Uso do Wrapper:** NUNCA chame `useForm` ou `zodResolver` diretamente no componente visual da feature. SEMPRE utilize o componente global `<Form>` importado de `@/components/Form`.
3. **Componentes Base:** NUNCA utilize componentes puros do `@mantine/core` para inputs dentro da feature. SEMPRE utilize os nossos wrappers inteligentes importados de `@/components/Form` (ex: `<TextInput name="...">`, `<Select name="...">`).
4. **Sem Prop Drilling:** NUNCA passe a propriedade `register` ou `control` para os componentes base. Eles extraem isso via `useFormContext`.
5. **Layout:** Utilize os componentes do Mantine (`Stack`, `Grid`, `Group`) para estruturar a tela.

---

## CONTEXTO DE INFRAESTRUTURA (ASSUMA QUE ESTES ARQUIVOS JÁ EXISTEM)
*Não gere estes códigos na sua resposta, use-os apenas como referência para saber como importar e usar.*

**1. O Wrapper Global (`@/components/Form/Form.tsx`):**
```tsx
import { useForm, FormProvider, UseFormReturn, SubmitHandler, DefaultValues, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

export interface FormProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
}
// Exporta o componente <Form>
```

**2. Componente Simples (`@/components/Form/TextInput.tsx`):**
```tsx
import { TextInput as MantineTextInput, TextInputProps as MantineTextInputProps } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

export interface TextInputProps extends Omit<MantineTextInputProps, 'name'> { name: string; }
// Exporta o componente <TextInput> que já injeta o error e register automaticamente.
```

**3. Componente Complexo (`@/components/Form/Select.tsx`):**
```tsx
import { Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core';
import { useFormContext, Controller } from 'react-hook-form';

export interface SelectProps extends Omit<MantineSelectProps, 'name'> { name: string; }
// Exporta o componente <Select> que já usa o Controller internamente.
```

## ESTRUTURA ESPERADA DE SAÍDA:
Sempre que solicitado para criar um "Formulário de [Entidade]", você deve me retornar APENAS 2 blocos de código:

**Arquivo 1: Schema (`features/[entidade]/schemas/[entidade]Schema.ts`)**
- Importe o Zod.
- Defina as validações com mensagens de erro em PT-BR.
- Exporte o schema e o `type [Entidade]FormData = z.infer<typeof schema>`.

**Arquivo 2: Componente Form (`features/[entidade]/components/Novo[Entidade]Form.tsx`)**
- Importe o `<Form>` global, os inputs base (`TextInput`, `Select`, etc.) de `@/components/Form` e o schema criado.
- Defina a função de handleSubmit (deixe um `console.log` simulando a chamada de API).
- Retorne o componente `<Form>` tipado e com as `defaultValues` preenchidas.
- Construa o layout visual limpo e responsivo usando Mantine.
- Não adicione comentários óbvios, foque em código de produção.