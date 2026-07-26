import { Stack, Title } from "@mantine/core";
import { WarehouseSearch } from "./Search";
import { InventoryService } from "../../api/inventoryService";
import { createSearchLoader } from "../../../../utils/routeLoaders";

export const warehousesLoader = createSearchLoader(InventoryService.searchWarehouses);

export function WarehousesPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Gestão de Almoxarifados</Title>
      <WarehouseSearch />
    </Stack>
  );
}
