import {
  Badge,
  Button,
  Group,
  Modal,
  Pagination,
  Select,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleMinus, IconX } from "@tabler/icons-react";
import { useState } from "react";

export interface ColumnConfig<T> {
  key: keyof T | "actions";
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  selectedId?: string | number | null;
  withPagination: boolean;
  onRowSelect?: (id: string | number) => void;
  keyExtractor: (item: T) => string | number;
  onDeactivate?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
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
}: DynamicTableProps<T>) {
  const ths = columns.map((col) => (
    <Table.Th key={col.key as string}>{col.label}</Table.Th>
  ));
  const [opened, { open, close }] = useDisclosure(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState<string>("10");

  const limit = parseInt(recordsPerPage, 10);
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / limit);

  const currentData = withPagination
    ? data.slice((currentPage - 1) * limit, currentPage * limit)
    : data;

  if (withPagination && currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  const rows = currentData.map((item) => {
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
                onDeactivate(selectedId); // Chama a função do pai
              }
              close(); // Fecha o modal após confirmar
            }}
          >
            Confirmar Desativação
          </Button>
        </Group>
      </Modal>
      <Stack gap="md">
        <Table
          highlightOnHover
          withTableBorder
          withColumnBorders
          verticalSpacing="sm"
        >
          <Table.Thead>
            <Table.Tr>{ths}</Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columns.length}>
                  <Badge ta="center" c="dimmed" py="sm" color="gray">
                    Nenhum registo encontrado.
                  </Badge>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>

        {/* 4. Rodapé da Tabela: Select de Limite e Componente de Paginação */}
        {withPagination && totalRecords > 0 && (
          <Group justify="space-between" align="center">
            <Group gap="xs" align="center">
              <Text size="sm" c="dimmed">
                Linhas por página:
              </Text>
              <Select
                value={recordsPerPage}
                onChange={(val) => {
                  setRecordsPerPage(val || "10");
                  setCurrentPage(1); // Volta para a página 1 ao mudar o limite para evitar ecrãs em branco
                }}
                data={["5", "10", "20", "50", "100"]}
                w={80} // Largura fixa pequena
              />
            </Group>

            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              color="blue"
              radius="md"
              withEdges // Adiciona os botões de "Ir para a primeira" e "Ir para a última"
            />
            <Group gap="xs" align="center">
              <Button
                disabled={!selectedId}
                onClick={open}
                color="yellow"
                leftSection={<IconCircleMinus size={18} />}
              >
                Desativar
              </Button>
              <Button
                disabled={!selectedId}
                onClick={() => onDelete && selectedId && onDelete(selectedId)}
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
