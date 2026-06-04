import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { TagSearch } from "./Search";
import { CreateTagForm } from "../../components/CreateTagForm";
import { useGenericModal } from "../../../../hooks/useGenericModal";

export function TagsPage() {
  const openModal = useGenericModal();

  const handleOpenCreateModal = () => {
    openModal({
      title: "Cadastrar Nova Tag",
      Form: CreateTagForm,
    });
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Gestão de Tags</Title>
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={handleOpenCreateModal}
          variant="light"
          color="brainstorm.6"
        >
          Nova Tag
        </Button>
      </Group>

      <TagSearch />
    </Stack>
  );
}
