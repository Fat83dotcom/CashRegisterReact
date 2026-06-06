import { Grid } from "@mantine/core";
import { TextInput, AsyncSelect } from "../../../../components/Form";
import { InventoryService } from "../../api/inventoryService";
import type { ICategoryResponse } from "../../interfaces";

const fetchCategories = async (query: string) => {
  const response = await InventoryService.searchCategories({
    name: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

export function CategoryFormFields() {
  return (
    <Grid gutter="md">
      <Grid.Col span={12}>
        <TextInput
          name="name"
          label="Nome da Categoria"
          placeholder="Ex: Eletrônicos, Alimentos"
          withAsterisk
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <AsyncSelect<ICategoryResponse>
          name="parentCategoryId"
          label="Sub Categoria de"
          placeholder="Selecione uma categoria pai (opcional)"
          fetcher={fetchCategories}
          getLabel={(item) =>
            item.parentCategoryName
              ? `${item.parentCategoryName} - ${item.name}`
              : item.name || ""
          }
          getValue={(item) => item.id?.toString() || ""}
          clearable
        />
      </Grid.Col>
    </Grid>
  );
}
