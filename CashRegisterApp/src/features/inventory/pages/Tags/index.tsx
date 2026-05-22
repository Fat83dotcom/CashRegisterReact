import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { TagSearch } from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import { TagForm } from "../../components/TagForm";

export function TagsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const view = location.pathname.includes("/create") ? "create" : "search";

  const toggleView = () => {
    if (view === "search") {
      navigate("/inventory/tags/create");
    } else {
      navigate("/inventory/tags");
    }
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Gestão de Tags</Title>
        <Button
          leftSection={view === "search" ? <IconPlus size={18} /> : null}
          onClick={toggleView}
          variant="light"
          color="brainstorm.6"
        >
          {view === "search" ? "Nova Tag" : "Voltar para Busca"}
        </Button>
      </Group>

      {view === "search" ? <TagSearch /> : <TagForm />}
    </Stack>
  );
}
