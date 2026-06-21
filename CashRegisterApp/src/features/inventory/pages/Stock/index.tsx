import { Title, Stack } from "@mantine/core";
import { StockSearch } from "./Search";

export function StockPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Movimentações de Estoque</Title>
      <StockSearch />
    </Stack>
  );
}
