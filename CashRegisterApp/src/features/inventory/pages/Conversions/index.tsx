import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ConversionSearch } from "./Search";
import { ConversionForm } from "../../components/ConversionForm";
import { useGenericModal } from "../../../../hooks/useGenericModal";

export function ConversionsPage() {
  const openModal = useGenericModal();

  const handleOpenCreateModal = () => {
    openModal({
      title: "Cadastrar Nova Regra",
      Form: ConversionForm,
    });
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Regras de Conversão</Title>
        <Button 
          leftSection={<IconPlus size={18} />}
          onClick={handleOpenCreateModal}
          color="brainstorm.6"
          variant="light"
        >
          Nova Regra
        </Button>
      </Group>

      <ConversionSearch />
    </Stack>
  );
}
