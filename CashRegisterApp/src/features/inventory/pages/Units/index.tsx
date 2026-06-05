import { Title, Stack } from "@mantine/core";
import { UnitSearch } from "./Search";

export function UnitsPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Unidades de Medida</Title>
      <UnitSearch />
    </Stack>
  );
}
