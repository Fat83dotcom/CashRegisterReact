import { Container, Title, Text, SimpleGrid, Paper, Group, Stack } from "@mantine/core";
import { IconBox, IconCategory, IconBuildingWarehouse, IconRulerMeasure } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

export function InventoryHome() {
  const stats = [
    { title: "Produtos", icon: IconBox, link: "/inventory/products", color: "blue" },
    { title: "Almoxarifados", icon: IconBuildingWarehouse, link: "/inventory/warehouses", color: "cyan" },
    { title: "Categorias", icon: IconCategory, link: "/inventory/categories", color: "grape" },
    { title: "Unidades", icon: IconRulerMeasure, link: "/inventory/units", color: "teal" },
  ];

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">Painel de Estoque</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {stats.map((stat) => (
          <Paper 
            key={stat.title} 
            withBorder 
            p="md" 
            radius="md" 
            component={NavLink} 
            to={stat.link}
            style={{ textDecoration: 'none', color: 'inherit' }}
            shadow="sm"
          >
            <Group justify="space-between">
              <Stack gap={0}>
                <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                  Gerenciar
                </Text>
                <Text fw={700} size="xl">
                  {stat.title}
                </Text>
              </Stack>
              <stat.icon size={32} stroke={1.5} color={`var(--mantine-color-${stat.color}-6)`} />
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      <Paper withBorder p="xl" radius="md" mt="xl" shadow="sm">
        <Title order={3} mb="md">Visão Geral</Title>
        <Text c="dimmed">
          O módulo de estoque permite o controle completo de produtos, almoxarifados e movimentações. 
          Utilize o menu lateral para acessar as funcionalidades detalhadas.
        </Text>
      </Paper>
    </Container>
  );
}
