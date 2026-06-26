import { Title, Stack } from "@mantine/core";
import { StockBalanceSearch } from "./Search";

export function StockBalancesPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Saldos de Estoque</Title>
      <StockBalanceSearch />
    </Stack>
  );
}
