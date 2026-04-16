import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { UserSearch } from "./Search";
import { CreateUser } from "./Create";
import { useLocation, useNavigate } from "react-router-dom";

export function UserHome() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Identifica a visão atual baseada na rota
  const view = location.pathname.includes("/create") ? "create" : "search";

  const toggleView = () => {
    if (view === "search") {
      navigate("/user/create");
    } else {
      navigate("/user");
    }
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Gestão de Usuários</Title>
        <Button 
          leftSection={view === "search" ? <IconPlus size={18} /> : null}
          onClick={toggleView}
        >
          {view === "search" ? "Novo Usuário" : "Voltar para Busca"}
        </Button>
      </Group>

      {view === "search" ? <UserSearch /> : <CreateUser />}
    </Stack>
  );
}
