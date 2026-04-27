import { Stack } from "@mantine/core";
import { Form } from "../../Form";
import { SearchContainer } from "../SearchContainer";
import { DynamicTable, type ColumnConfig } from "../DynamicTable";
import { ZodType } from "zod";
import { type IPagedResponse } from "../../../hooks/useSearch";
import { type DefaultValues, type FieldValues } from "react-hook-form";

interface SearchPageTemplateProps<T, TFilters extends FieldValues> {
  title: string;
  schema: ZodType<TFilters>;
  defaultValues: DefaultValues<TFilters>;
  columns: ColumnConfig<T>[];
  pagedData: IPagedResponse<T>;
  loading: boolean;
  onSearch: (filters: TFilters, page?: number, pageSize?: number) => void;
  selectedId: string | number | null;
  onRowSelect: (id: string | number | null) => void;
  onDeactivate?: (id: string | number) => void;
  children: React.ReactNode;
}

export function SearchPageTemplate<T, TFilters extends FieldValues>({
  title,
  schema,
  defaultValues,
  columns,
  pagedData,
  loading,
  onSearch,
  selectedId,
  onRowSelect,
  onDeactivate,
  children,
}: SearchPageTemplateProps<T, TFilters>) {
  return (
    <Stack gap="xl">
      <Form
        schema={schema}
        onSubmit={(values) => onSearch(values, 1)}
        defaultValues={defaultValues}
      >
        {() => (
          <SearchContainer title={title} loading={loading}>
            {children}
          </SearchContainer>
        )}
      </Form>

      <DynamicTable<T>
        data={pagedData?.items || []}
        columns={columns}
        keyExtractor={(item: any) => item.id}
        loading={loading}
        totalCount={pagedData?.totalCount || 0}
        page={pagedData?.page || 1}
        pageSize={pagedData?.pageSize || 10}
        onPageChange={(page) => onSearch(defaultValues as TFilters, page)}
        onPageSizeChange={(size) =>
          onSearch(defaultValues as TFilters, 1, parseInt(size))
        }
        selectedId={selectedId}
        onRowSelect={onRowSelect}
        onDeactivate={onDeactivate}
      />
    </Stack>
  );
}
