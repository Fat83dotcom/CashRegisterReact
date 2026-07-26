import { Title, Stack } from "@mantine/core";
import { ConversionSearch } from "./Search";
import { InventoryService } from "../../api/inventoryService";
import { createSearchLoader } from "../../../../utils/routeLoaders";

export const conversionsLoader = createSearchLoader(InventoryService.searchConversions);

export function ConversionsPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Regras de Conversão</Title>
      <ConversionSearch />
    </Stack>
  );
}
