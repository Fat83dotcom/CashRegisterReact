import { Title, Stack } from "@mantine/core";
import { CategorySearch } from "./Search";
import { InventoryService } from "../../api/inventoryService";
import { createSearchLoader } from "../../../../utils/routeLoaders";

export const categoriesLoader = createSearchLoader(InventoryService.searchCategories);

export function CategoriesPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Categorias de Produto</Title>
      <CategorySearch />
    </Stack>
  );
}
