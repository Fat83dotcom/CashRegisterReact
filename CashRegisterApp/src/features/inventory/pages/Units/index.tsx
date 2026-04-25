import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { UnitSearch } from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import { UnitForm } from "../../components/UnitForm";

export function UnitsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const view = location.pathname.includes("/create") ? "create" : "search";

  const toggleView = () => {
    if (view === "search") {
      navigate("/inventory/units/create");
    } else {
      navigate("/inventory/units");
    }
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Unidades de Medida</Title>
        <Button 
          leftSection={view === "search" ? <IconPlus size={18} /> : null}
          onClick={toggleView}
          color="brainstorm.6"
          variant="light"
        >
          {view === "search" ? "Nova Unidade" : "Voltar para Busca"}
        </Button>
      </Group>

      {view === "search" ? <UnitSearch /> : <UnitForm />}
    </Stack>
  );
}
