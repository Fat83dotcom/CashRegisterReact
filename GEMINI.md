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

## Status Atual / Próximos Passos
- **Implementado:** Criação dos novos módulos de ERP (Estoque, Vendas, Financeiro) com rotas e componentes base.
- **Implementado:** Funcionalidade de alteração de senha segura integrada com o backend.
- **Implementado:** Proteção de rotas (`ProtectedRoute`) com validação de perfis (`Admin`, etc.).
- **Implementado:** Menu lateral (Navbar) responsivo e integrado com o Layout Principal.
- **Próximos Passos:** Implementar os formulários e tabelas detalhados para os novos módulos do ERP.
- **Próximos Passos:** Definir o alinhamento e centralização (`Center` / `Container`) para os formulários dentro do `MainLayout`.
