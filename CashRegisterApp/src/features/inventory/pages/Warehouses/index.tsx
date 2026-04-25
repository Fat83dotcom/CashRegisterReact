import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { WarehouseSearch } from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import { WarehouseForm } from "../../components/WarehouseForm";

export function WarehousesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const view = location.pathname.includes("/create") ? "create" : "search";

  const toggleView = () => {
    if (view === "search") {
      navigate("/inventory/warehouses/create");
    } else {
      navigate("/inventory/warehouses");
    }
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Almoxarifados</Title>
        <Button 
          leftSection={view === "search" ? <IconPlus size={18} /> : null}
          onClick={toggleView}
          color="brainstorm.6"
          variant="light"
        >
          {view === "search" ? "Novo Almoxarifado" : "Voltar para Busca"}
        </Button>
      </Group>

      {view === "search" ? <WarehouseSearch /> : <WarehouseForm />}
    </Stack>
  );
}
