import { Title, Stack } from "@mantine/core";
import { ConversionSearch } from "./Search";

export function ConversionsPage() {
  return (
    <Stack gap="lg">
      <Title order={1}>Regras de Conversão</Title>
      <ConversionSearch />
    </Stack>
  );
}
