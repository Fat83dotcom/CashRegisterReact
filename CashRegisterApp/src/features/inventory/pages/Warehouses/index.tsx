import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { WarehouseSearch } from "./Search";
import { WarehouseForm } from "../../components/WarehouseForm";
import { useGenericModal } from "../../../../hooks/useGenericModal";

export function WarehousesPage() {
  const openModal = useGenericModal();

  const handleOpenCreateModal = () => {
    openModal({
      title: "Cadastrar Novo Almoxarifado",
      Form: WarehouseForm,
    });
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Almoxarifados</Title>
        <Button 
          leftSection={<IconPlus size={18} />}
          onClick={handleOpenCreateModal}
          color="brainstorm.6"
          variant="light"
        >
          Novo Almoxarifado
        </Button>
      </Group>

      <WarehouseSearch />
    </Stack>
  );
}
