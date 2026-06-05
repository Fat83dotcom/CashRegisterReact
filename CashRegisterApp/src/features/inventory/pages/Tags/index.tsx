import { Title, Stack } from "@mantine/core";
import { TagSearch } from "./Search";

export function TagsPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Gestão de Tags</Title>
      <TagSearch />
    </Stack>
  );
}
