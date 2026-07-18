import { Title, Stack } from "@mantine/core";
import { CategorySearch } from "./Search";
import { InventoryService } from "../../api/inventoryService";
import type { LoaderFunctionArgs } from "react-router-dom";

export async function categoriesLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  
  const page = Number(url.searchParams.get("page") || 1);
  const pageSize = Number(url.searchParams.get("pageSize") || 10);
  const name = url.searchParams.get("name") || "";

  // Busca na API e retorna a promessa. O React Router resolve pra gente.
  return await InventoryService.searchCategories({ page, pageSize, name });
}

export function CategoriesPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Categorias de Produto</Title>
      <CategorySearch />
    </Stack>
  );
}
