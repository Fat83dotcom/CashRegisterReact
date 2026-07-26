import { Title, Stack } from "@mantine/core";
import { TagSearch } from "./Search";
import { InventoryService } from "../../api/inventoryService";
import { createSearchLoader } from "../../../../utils/routeLoaders";

export const tagsLoader = createSearchLoader(InventoryService.searchTags);

export function TagsPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Gestão de Tags</Title>
      <TagSearch />
    </Stack>
  );
}
