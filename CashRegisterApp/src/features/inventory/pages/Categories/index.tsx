import { Stack, Title, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { CategorySearch } from "./Search";
import { useState } from "react";
import { CategoryForm } from "../../components/CategoryForm";

export function CategoriesPage() {
  const [view, setView] = useState<"search" | "create">("search");

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Categorias de Produto</Title>
        <Button 
          leftSection={view === "search" ? <IconPlus size={18} /> : null}
          onClick={() => setView(view === "search" ? "create" : "search")}
        >
          {view === "search" ? "Nova Categoria" : "Voltar para Busca"}
        </Button>
      </Group>

      {view === "search" ? <CategorySearch /> : <CategoryForm />}
    </Stack>
  );
}
