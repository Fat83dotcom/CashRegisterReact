import {
  Badge,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Pagination,
  Select,
  Stack,
  Table,
  Text,
  Box,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleMinus, IconX } from "@tabler/icons-react";

export interface ColumnConfig<T> {
  key: keyof T | "actions";
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  selectedId?: string | number | null;
  withPagination?: boolean;
  onRowSelect?: (id: string | number) => void;
  keyExtractor: (item: T) => string | number;
  onDeactivate?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;

  // Novas props para integração com Search
  loading?: boolean;
  totalCount?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: string) => void;
}

export function DynamicTable<T>({
  data,
  columns,
  keyExtractor,
  selectedId,
  onRowSelect,
  onDeactivate,
  onDelete,
  withPagination = true,
  loading = false,
  totalCount = 0,
  page = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}: DynamicTableProps<T>) {
  const ths = columns.map((col) => (
    <Table.Th key={col.key as string}>{col.label}</Table.Th>
  ));
  const [opened, { open, close }] = useDisclosure(false);

  // Se as funções de callback forem passadas, usamos paginação do servidor
  const isServerSide = !!onPageChange;

  const totalPages = isServerSide
    ? Math.ceil(totalCount / pageSize)
    : Math.ceil(data.length / pageSize);

  const rows = data.map((item) => {
    const id = keyExtractor(item);
    const isSelected = selectedId === id;

    return (
      <Table.Tr
        key={id}
        onClick={() => onRowSelect && onRowSelect(id)}
        style={{ cursor: onRowSelect ? "pointer" : "default" }}
        bg={isSelected ? "var(--mantine-color-blue-light)" : undefined}
      >
        {columns.map((col) => (
          <Table.Td key={col.key as string}>
            {col.render
              ? col.render(item)
              : (item[col.key as keyof T] as React.ReactNode)}
          </Table.Td>
        ))}
      </Table.Tr>
    );
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Confirmar Ação"
        centered
        size={"md"}
      >
        <Text size="sm">
          Tem a certeza que deseja desativar este registo? Poderá reativá-lo
          futuramente.
        </Text>
        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={close}>
            Cancelar
          </Button>
          <Button
            color="yellow"
            onClick={() => {
              if (onDeactivate && selectedId) {
                onDeactivate(selectedId);
              }
              close();
            }}
          >
            Confirmar Desativação
          </Button>
        </Group>
      </Modal>

      <Stack gap="md" pos="relative">
        <LoadingOverlay visible={loading} overlayProps={{ blur: 1 }} />

        <Paper
          withBorder
          shadow="xs"
          radius="lg"
          style={{ overflow: "hidden" }}
        >
          <Box style={{ overflowX: "auto" }}>
            <Table highlightOnHover withColumnBorders verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>{ths}</Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <Table.Tr>
                    <Table.Td
                      colSpan={columns.length}
                      style={{ textAlign: "center", padding: "40px" }}
                    >
                      <Badge size="lg" variant="light" color="gray">
                        Nenhum registro encontrado.
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </Box>
        </Paper>

        {withPagination && (totalCount > 0 || data.length > 0) && (
          <Group justify="space-between" align="center">
            <Group gap="xs" align="center">
              <Text size="sm" c="dimmed">
                Linhas por página:
              </Text>
              <Select
                value={pageSize.toString()}
                onChange={(val) =>
                  onPageSizeChange && onPageSizeChange(val || "10")
                }
                data={["5", "10", "20", "50", "100"]}
                w={80}
              />
              <Text size="sm" c="dimmed">
                Total: {totalCount || data.length}
              </Text>
            </Group>

            <Pagination
              total={totalPages}
              value={page}
              onChange={onPageChange}
              color="blue"
              radius="md"
              withEdges
            />

            <Group gap="xs" align="center">
              <Button
                disabled={!selectedId}
                onClick={open}
                variant="light"
                color="yellow"
                leftSection={<IconCircleMinus size={18} />}
              >
                Desativar
              </Button>
              <Button
                disabled={!selectedId}
                onClick={() => onDelete && selectedId && onDelete(selectedId)}
                variant="light"
                color="red"
                leftSection={<IconX size={18} />}
              >
                Excluir
              </Button>
            </Group>
          </Group>
        )}
      </Stack>
    </>
  );
}
