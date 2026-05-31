import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { CategorySearch } from "./Search";
import { CategoryForm } from "../../components/CategoryForm";
import { useGenericModal } from "../../../../hooks/useGenericModal";

export function CategoriesPage() {
  const openModal = useGenericModal();

  const handleOpenCreateModal = () => {
    openModal({
      title: "Cadastrar Nova Categoria",
      Form: CategoryForm,
    });
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Categorias de Produto</Title>
        <Button 
          leftSection={<IconPlus size={18} />}
          onClick={handleOpenCreateModal}
          color="brainstorm.6"
          variant="light"
        >
          Nova Categoria
        </Button>
      </Group>

      <CategorySearch />
    </Stack>
  );
}
