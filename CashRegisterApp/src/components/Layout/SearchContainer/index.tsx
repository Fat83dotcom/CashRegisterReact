import { Button, Grid, Paper, Text, Stack } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ReactNode } from "react";

interface SearchContainerProps {
  children: ReactNode;
  onSearch?: () => void;
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
        {/* REMOVIDO: Tag <form> aninhada que causava o reload da página */}
        <Grid align="flex-end" gutter="md">
          <Grid.Col span={{ base: 12, md: 10 }}>
            <Grid gutter="md">{children}</Grid>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 2 }}>
            <Button
              fullWidth
              radius="xl"
              type="submit" // Mantém como submit para disparar o Form pai
              variant="gradient"
              gradient={{ from: 'brainstorm.6', to: 'brainstorm.4', deg: 45 }}
              loading={loading}
              onClick={() => {
                // Se não houver um formulário pai gerenciando, 
                // ele chama o onSearch manualmente.
                if (onSearch) onSearch();
              }}
              leftSection={<IconSearch size={18} />}
            >
              Buscar
            </Button>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}
