# CashRegisterApp - Source Code

## Arquitetura de Software
A aplicação segue uma arquitetura modular por responsabilidades dentro de `src/`.

## Estrutura de Diretórios (`src/`)
- `api/`: Configurações base de API (ex: constantes de URL).
- `Components/`: Componentes reutilizáveis (Header, Tabelas, Inputs customizados). Cada componente possui sua própria pasta.
- `contexts/`: Contextos globais (ex: Autenticação).
- `pages/`: Componentes de página, organizados por domínio (Login, Main, User).
- `services/`: Lógica de comunicação com o backend (Fetch API).
- `styles/`: Arquivos CSS globais e configurações de tema.
- `routes.tsx`: Definição centralizada de rotas usando `createBrowserRouter`.

## Mandatos Específicos
1. **Padrão de Componentes:** Cada componente reutilizável deve estar em sua própria pasta dentro de `Components/`.
2. **Navegação:** Utilize `Link` e `useNavigate` do `react-router-dom`.
3. **Formulários:** Prefira o `@mantine/form` para validação e submissão de formulários.
4. **Notificações:** Utilize o sistema de notificações do Mantine (`@mantine/notifications`) para feedback ao usuário.
5. **Contexto de Autenticação:** Toda a lógica de proteção de rotas deve ser orquestrada pelo `AuthContext` e pelo componente `ProtectedRoute`.
6. **Internacionalização:** Use `DateInputPt-BR` para campos de data com suporte a Português.
7. **Menu de Usuário:** O gerenciamento e configurações de conta ficam centralizados no `UserMenu`. Funcionalidades administrativas (como gerenciar e criar outros usuários) devem estar condicionadas ao perfil de `Admin` dentro deste menu flutuante.

## Status Atual / Próximos Passos
- **Implementado:** Novas pastas e rotas para `Inventory`, `Sales` e `Financial` em `src/pages`.
- **Implementado:** Centralização de configurações de perfil em `UserMenu`.
- **Próximos Passos:** Desenvolver componentes de tabela e formulário reutilizáveis para os novos módulos.
- **Próximos Passos:** Integrar `DateInputPt-BR` em todos os novos campos de data.
