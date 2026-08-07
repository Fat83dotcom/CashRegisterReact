import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus, IconUsers, IconUserPlus } from "@tabler/icons-react";
import { UserSearch } from "./Search";
import { CreateUser } from "./Create";
import { useLocation, useNavigate } from "react-router-dom";
import { ModuleDashboardTemplate } from "../../../components/Layout/ModuleDashboardTemplate";

import { UserService } from "../api/userService";
import { createSearchLoader } from "../../../utils/routeLoaders";

export const usersLoader = createSearchLoader(UserService.search);

export function UserHome() {
  const location = useLocation();
  const navigate = useNavigate();

  const view = location.pathname.includes("/create") ? "create" : location.pathname.includes("/search") ? "search" : "home";

  const toggleView = () => {
    if (view === "search") {
      navigate("/user/create");
    } else {
      navigate("/user/search");
    }
  };

  if (view === "home") {
    const cards = [
      { subtitle: "Consulta", title: "Usuários", icon: IconUsers, link: "/user/search", color: "blue" },
      { subtitle: "Operação", title: "Novo Usuário", icon: IconUserPlus, link: "/user/create", color: "green" },
    ];
    return (
      <ModuleDashboardTemplate
        title="Gestão de Acessos"
        description="Painel de controle de usuários. Gerencie permissões, adicione novos membros ou consulte o histórico de acessos."
        cards={cards}
      />
    );
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Gestão de Usuários</Title>
        <Button
          leftSection={view === "search" ? <IconPlus size={18} /> : null}
          onClick={toggleView}
          variant="light"
          color="brainstorm.6"
        >
          {view === "search" ? "Novo Usuário" : "Voltar para Busca"}
        </Button>
      </Group>

      {view === "search" ? <UserSearch /> : <CreateUser />}
    </Stack>
  );
}
