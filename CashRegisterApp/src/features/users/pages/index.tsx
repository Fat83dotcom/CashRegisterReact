import { Title, Stack } from "@mantine/core";
import { UserSearch } from "./Search";

// O componente da página agora atua como um container simples,
// delegando a orquestração de Busca + Tabela para o UserSearch
export function UserHome() {
  return (
    <Stack gap="lg">
      <Title order={1}>Gestão de Usuários</Title>
      <UserSearch />
    </Stack>
  );
}

