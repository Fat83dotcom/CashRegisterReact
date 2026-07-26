import { Title, Stack } from "@mantine/core";
import { ProductSearch } from "./Search";
import { InventoryService } from "../../api/inventoryService";
import { createSearchLoader } from "../../../../utils/routeLoaders";

export const productsLoader = createSearchLoader(InventoryService.searchProducts);

export function ProductsPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Gestão de Produtos</Title>
      <ProductSearch />
    </Stack>
  );
}
