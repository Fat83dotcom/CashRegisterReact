import { Grid } from "@mantine/core";
import {
  TextInput,
  AsyncSelect,
  MultiSelectAsync,
  Select,
} from "../../../../components/Form";
import { InventoryService } from "../../api/inventoryService";
import type {
  ICategoryResponse,
  IUnitResponse,
  ITagResponse,
} from "../../interfaces";

const fetchCategories = async (query: string) => {
  const response = await InventoryService.searchCategories({
    name: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

const fetchUnits = async (query: string) => {
  const response = await InventoryService.searchUnits({
    searchTerm: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

const fetchTags = async (query: string) => {
  const response = await InventoryService.searchTags({
    searchTerm: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

interface ProductFormFieldsProps {
  onAddCategory: () => void;
  onAddUnit: () => void;
  onAddTag: () => void;
}

export function ProductFormFields({
  onAddCategory,
  onAddUnit,
  onAddTag,
}: ProductFormFieldsProps) {
  return (
    <Grid gutter="md">
      <Grid.Col span={{ base: 12, md: 8 }}>
        <TextInput
          name="name"
          label="Nome do Produto"
          placeholder="Ex: Teclado Mecânico"
          withAsterisk
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <TextInput
          name="sku"
          label="SKU (Código)"
          placeholder="Ex: TEC-001"
          withAsterisk
        />
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6 }}>
        <AsyncSelect<ICategoryResponse>
          name="categoryId"
          label="Categoria"
          placeholder="Selecione uma categoria"
          fetcher={fetchCategories}
          onAdd={onAddCategory}
          getLabel={(item) =>
            item.parentCategoryName
              ? `${item.parentCategoryName} - ${item.name}`
              : item.name || ""
          }
          getValue={(item) => item.id?.toString() || ""}
          withAsterisk
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <AsyncSelect<IUnitResponse>
          name="baseUomId"
          label="Unidade de Medida Base"
          placeholder="Selecione a unidade"
          fetcher={fetchUnits}
          onAdd={onAddUnit}
          getLabel={(item) => `${item.name} (${item.code})`}
          getValue={(item) => item.id?.toString() || ""}
          withAsterisk
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <MultiSelectAsync<ITagResponse>
          name="tagIds"
          label="Tags"
          placeholder="Selecione as tags"
          fetcher={fetchTags}
          onAdd={onAddTag}
          getLabel={(item) => item.name}
          getValue={(item) => item.id?.toString() || ""}
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <TextInput
          name="description"
          label="Descrição"
          placeholder="Descrição detalhada do produto"
        />
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6 }}>
        <TextInput
          name="ncmCode"
          label="Código NCM"
          placeholder="Ex: 84716052"
          maxLength={8}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6 }}>
        <Select
          name="isActive"
          label="Status"
          placeholder="Selecione o status"
          data={[
            { value: "true", label: "Ativo" },
            { value: "false", label: "Inativo" },
          ]}
        />
      </Grid.Col>
    </Grid>
  );
}
