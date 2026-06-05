import { Stack, Title } from "@mantine/core";
import { WarehouseSearch } from "./Search";

export function WarehousesPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Gestão de Almoxarifados</Title>
      <WarehouseSearch />
    </Stack>
  );
}
