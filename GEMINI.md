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
1. **Componentes Funcionais:** Use sempre componentes funcionais com hooks.
2. **Tipagem:** Mantenha a tipagem rigorosa com TypeScript. Defina interfaces para todas as respostas de API e propriedades de componentes.
3. **Mantine UI:** Utilize componentes do Mantine para manter a consistência visual. Prefira os hooks do Mantine (`@mantine/hooks`, `@mantine/form`) para lógica de UI.
4. **Services:** Toda comunicação com o backend deve ser isolada na pasta `services/`.
5. **Estilização:** Utilize o sistema de temas do Mantine e CSS Modules ou Vanilla CSS quando necessário.
