import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ProductSearch } from "./Search";
import { CreateProductForm } from "../../components/CreateProductForm";
import { useGenericModal } from "../../../../hooks/useGenericModal";

export function ProductsPage() {
  const view = location.pathname.includes("/create") ? "create" : "search";

  const openModal = useGenericModal();

  const handleOpenCreateModal = () => {
    openModal({
      title: "Cadastrar Novo Produto",
      Form: CreateProductForm,
    });
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Gestão de Produtos</Title>
        <Button
          leftSection={view === "search" ? <IconPlus size={18} /> : null}
          onClick={handleOpenCreateModal}
          variant="light"
          color="brainstorm.6"
        >
          Novo Produto
        </Button>
      </Group>
      <ProductSearch />
    </Stack>
  );
}
