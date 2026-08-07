import { Container, Title, Text, SimpleGrid, Paper, Group, Stack } from "@mantine/core";
import { NavLink } from "react-router-dom";
import type { ElementType } from "react";

export interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon: ElementType;
  link: string;
  color: string;
}

interface ModuleDashboardTemplateProps {
  title: string;
  description: string;
  cards: DashboardCardProps[];
}

export function ModuleDashboardTemplate({ title, description, cards }: ModuleDashboardTemplateProps) {
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        {title}
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Paper
              key={card.title}
              withBorder
              p="md"
              radius="md"
              component={NavLink}
              to={card.link}
              style={{ textDecoration: "none", color: "inherit" }}
              shadow="sm"
            >
              <Group justify="space-between">
                <Stack gap={0}>
                  <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                    {card.subtitle || "Gerenciar"}
                  </Text>
                  <Text fw={700} size="xl">
                    {card.title}
                  </Text>
                </Stack>
                <Icon
                  size={32}
                  stroke={1.5}
                  color={`var(--mantine-color-${card.color}-6)`}
                />
              </Group>
            </Paper>
          );
        })}
      </SimpleGrid>

      <Paper withBorder p="xl" radius="md" mt="xl" shadow="sm">
        <Title order={3} mb="md">
          Visão Geral
        </Title>
        <Text c="dimmed">
          {description}
        </Text>
      </Paper>
    </Container>
  );
}
