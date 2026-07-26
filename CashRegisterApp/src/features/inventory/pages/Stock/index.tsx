import { Title, Stack } from "@mantine/core";
import { StockSearch } from "./Search";

import { InventoryService } from "../../api/inventoryService";
import { createSearchLoader } from "../../../../utils/routeLoaders";

export const stockLoader = createSearchLoader(InventoryService.searchTransactions);

export function StockPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Movimentações de Estoque</Title>
      <StockSearch />
    </Stack>
  );
}
