import { Table, Text } from "@mantine/core";

export interface ColumnConfig<T> {
  key: keyof T | "actions";
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  keyExtractor: (item: T) => string | number;

  // NOSSAS DUAS NOVAS PROPRIEDADES (Opcionais para não quebrar outras telas)
  selectedId?: string | number | null;
  onRowSelect?: (id: string | number) => void;
}

export function DynamicTable<T>({
  data,
  columns,
  keyExtractor,
  selectedId,
  onRowSelect,
}: DynamicTableProps<T>) {
  const ths = columns.map((col) => (
    <Table.Th key={col.key as string}>{col.label}</Table.Th>
  ));

  const rows = data.map((item) => {
    // Pegamos o ID da linha atual
    const id = keyExtractor(item);
    // Verificamos se esta é a linha selecionada
    const isSelected = selectedId === id;

    return (
      <Table.Tr
        key={id}
        // MODIFICAÇÃO: Evento de clique na linha
        onClick={() => onRowSelect && onRowSelect(id)}
        // Muda o cursor para a mãozinha se a tabela for clicável
        style={{ cursor: onRowSelect ? "pointer" : "default" }}
        // Se estiver selecionado, pinta o fundo de azul claro
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
              <Text ta="center" c="dimmed" py="sm">
                Nenhum registo encontrado.
              </Text>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
}
