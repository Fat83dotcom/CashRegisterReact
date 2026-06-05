import { Title, Stack } from "@mantine/core";
import { ProductSearch } from "./Search";

export function ProductsPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Gestão de Produtos</Title>
      <ProductSearch />
    </Stack>
  );
}
