import { Stack, Title, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { UnitSearch } from "./Search";
import { useState } from "react";
import { UnitForm } from "../../components/UnitForm";

export function UnitsPage() {
  const [view, setView] = useState<"search" | "create">("search");

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Unidades de Medida</Title>
        <Button 
          leftSection={view === "search" ? <IconPlus size={18} /> : null}
          onClick={() => setView(view === "search" ? "create" : "search")}
        >
          {view === "search" ? "Nova Unidade" : "Voltar para Busca"}
        </Button>
      </Group>

      {view === "search" ? <UnitSearch /> : <UnitForm />}
    </Stack>
  );
}
