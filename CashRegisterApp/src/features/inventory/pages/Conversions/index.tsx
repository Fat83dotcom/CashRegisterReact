import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ConversionSearch } from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import { ConversionForm } from "../../components/ConversionForm";

export function ConversionsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const view = location.pathname.includes("/create") ? "create" : "search";

  const toggleView = () => {
    if (view === "search") {
      navigate("/inventory/conversions/create");
    } else {
      navigate("/inventory/conversions");
    }
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Regras de Conversão</Title>
        <Button 
          leftSection={view === "search" ? <IconPlus size={18} /> : null}
          onClick={toggleView}
          color="brainstorm.6"
          variant="light"
        >
          {view === "search" ? "Nova Regra" : "Voltar para Busca"}
        </Button>
      </Group>

      {view === "search" ? <ConversionSearch /> : <ConversionForm />}
    </Stack>
  );
}
