import { Title, Stack } from "@mantine/core";
import { CategorySearch } from "./Search";

export function CategoriesPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Categorias de Produto</Title>
      <CategorySearch />
    </Stack>
  );
}
