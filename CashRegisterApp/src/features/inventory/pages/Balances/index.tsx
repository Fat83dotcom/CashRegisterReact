import { Title, Stack } from "@mantine/core";
import { StockBalanceSearch } from "./Search";

import { InventoryService } from "../../api/inventoryService";
import { createSearchLoader } from "../../../../utils/routeLoaders";

export const balancesLoader = createSearchLoader(InventoryService.searchStockBalances);

export function StockBalancesPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Saldos de Estoque</Title>
      <StockBalanceSearch />
    </Stack>
  );
}
