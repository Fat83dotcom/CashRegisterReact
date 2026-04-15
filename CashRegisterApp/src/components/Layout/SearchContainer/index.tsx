import { Button, Grid, Paper, Text, Stack } from "@mantine/core";
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
    <Paper 
      p="xl" 
      shadow="md" 
      radius="lg" 
      withBorder 
    >
      <Stack gap="lg">
        {title && (
          <Text size="lg" fw={700} c="brainstorm.6">
            {title}
          </Text>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
        >
          <Grid align="flex-end" gutter="md">
            <Grid.Col span={{ base: 12, md: 10 }}>
              <Grid gutter="md">{children}</Grid>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 2 }}>
              <Button
                fullWidth
                radius="xl"
                type="submit"
                variant="gradient"
                gradient={{ from: 'brainstorm.6', to: 'brainstorm.4', deg: 45 }}
                loading={loading}
                leftSection={<IconSearch size={18} />}
              >
                Buscar
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Stack>
    </Paper>
  );
}
