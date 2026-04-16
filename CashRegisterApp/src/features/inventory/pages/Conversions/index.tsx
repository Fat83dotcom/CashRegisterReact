import { Stack, Title, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ConversionSearch } from "./Search";
import { useState } from "react";
import { ConversionForm } from "../../components/ConversionForm";

export function ConversionsPage() {
  const [view, setView] = useState<"search" | "create">("search");

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Regras de Conversão</Title>
        <Button 
          leftSection={view === "search" ? <IconPlus size={18} /> : null}
          onClick={() => setView(view === "search" ? "create" : "search")}
        >
          {view === "search" ? "Nova Regra" : "Voltar para Busca"}
        </Button>
      </Group>

      {view === "search" ? <ConversionSearch /> : <ConversionForm />}
    </Stack>
  );
}
