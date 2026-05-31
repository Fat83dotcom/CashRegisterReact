import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { UnitSearch } from "./Search";
import { UnitForm } from "../../components/UnitForm";
import { useGenericModal } from "../../../../hooks/useGenericModal";

export function UnitsPage() {
  const openModal = useGenericModal();

  const handleOpenCreateModal = () => {
    openModal({
      title: "Cadastrar Nova Unidade",
      Form: UnitForm,
    });
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Unidades de Medida</Title>
        <Button 
          leftSection={<IconPlus size={18} />}
          onClick={handleOpenCreateModal}
          color="brainstorm.6"
          variant="light"
        >
          Nova Unidade
        </Button>
      </Group>

      <UnitSearch />
    </Stack>
  );
}
