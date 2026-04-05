import { Button, Grid, Paper, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ReactNode } from "react";

interface SearchContainerProps {
  children: ReactNode;
  onSearch: () => void;
  loading?: boolean;
  title?: string;
}

export function SearchContainer({
  children,
  onSearch,
  loading,
  title,
}: SearchContainerProps) {
  return (
    <Paper p={30} shadow="md" radius={"lg"} withBorder>
      {title && (
        <Text size="lg" fw={700} mb="md">
          {title}
        </Text>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <Grid align="flex-end">
          <Grid.Col span={{ base: 12, md: 10 }}>
            <Grid>{children}</Grid>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 2 }}>
            <Button
              fullWidth
              radius="xl"
              type="submit"
              variant="light"
              loading={loading}
              leftSection={<IconSearch size={16} />}
            >
              Buscar
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  );
}
