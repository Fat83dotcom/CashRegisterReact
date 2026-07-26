import { Title, Stack } from "@mantine/core";
import { UnitSearch } from "./Search";
import { InventoryService } from "../../api/inventoryService";
import { createSearchLoader } from "../../../../utils/routeLoaders";

export const unitsLoader = createSearchLoader(InventoryService.searchUnits);

export function UnitsPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Unidades de Medida</Title>
      <UnitSearch />
    </Stack>
  );
}
