import { Modal, Text, Group, Stack, Paper, Divider, Table } from "@mantine/core";
import React from "react";

export interface SummaryItem {
  label: string;
  value: React.ReactNode;
}

export interface DetailColumn<T> {
  label: string;
  render: (item: T) => React.ReactNode;
}

export interface EntityDetailsModalProps<TItem> {
  opened: boolean;
  onClose: () => void;
  loading?: boolean;

  // Cabeçalho do Modal
  title: React.ReactNode;
  subtitle?: React.ReactNode;

  // Bloco de Resumo (O Paper superior)
  summaryItems: SummaryItem[];
  longDescription?: { label: string; text: React.ReactNode };

  // Tabela de Itens (A parte inferior)
  itemsTitle?: string;
  items?: TItem[];
  itemColumns?: DetailColumn<TItem>[];
  keyExtractor?: (item: TItem) => string | number;
}

export function EntityDetailsModal<TItem>({
  opened,
  onClose,
  loading,
  title,
  subtitle,
  summaryItems,
  longDescription,
  itemsTitle,
  items,
  itemColumns,
  keyExtractor,
}: EntityDetailsModalProps<TItem>) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Stack gap={4}>
          <Text fw={600} size="lg">
            {title}
          </Text>
          {subtitle && (
            <Text size="sm" c="dimmed">
              {subtitle}
            </Text>
          )}
        </Stack>
      }
      size="xl"
    >
      {loading ? (
        <Text c="dimmed" ta="center" py="xl">
          Carregando...
        </Text>
      ) : (
        <Stack gap="lg">
          <Paper withBorder p="md" radius="md">
            <Group grow align="flex-start">
              {summaryItems.map((item, idx) => (
                <Stack key={idx} gap="xs">
                  <Text size="sm" c="dimmed" fw={500}>
                    {item.label}
                  </Text>
                  {typeof item.value === "string" ? (
                    <Text fw={600} size="md">
                      {item.value}
                    </Text>
                  ) : (
                    item.value
                  )}
                </Stack>
              ))}
            </Group>
            {longDescription && (
              <>
                <Divider my="sm" />
                <Stack gap="xs">
                  <Text size="sm" c="dimmed" fw={500}>
                    {longDescription.label}
                  </Text>
                  {typeof longDescription.text === "string" ? (
                    <Text size="sm">{longDescription.text}</Text>
                  ) : (
                    longDescription.text
                  )}
                </Stack>
              </>
            )}
          </Paper>

          {items && itemColumns && keyExtractor && items.length > 0 && (
            <>
              {itemsTitle && (
                <Text fw={600} size="md">
                  {itemsTitle}
                </Text>
              )}

              <Table.ScrollContainer minWidth={600}>
                <Table
                  striped
                  highlightOnHover
                  withTableBorder
                  withColumnBorders
                  verticalSpacing="md"
                >
                  <Table.Thead>
                    <Table.Tr>
                      {itemColumns.map((col, idx) => (
                        <Table.Th key={idx}>{col.label}</Table.Th>
                      ))}
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {items.map((item) => (
                      <Table.Tr key={keyExtractor(item)}>
                        {itemColumns.map((col, idx) => (
                          <Table.Td key={idx}>{col.render(item)}</Table.Td>
                        ))}
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </>
          )}
        </Stack>
      )}
    </Modal>
  );
}
