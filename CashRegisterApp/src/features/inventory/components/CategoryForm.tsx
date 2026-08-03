import { Button, Center, Grid, Paper, Title, Stack } from "@mantine/core";
import { Form, TextInput, AsyncSelect } from "../../../components/Form";
import {
  categorySchema,
  type CategoryFormData,
} from "../schemas/categorySchema";
import { InventoryService } from "../api/inventoryService";
import type { ICategoryRequest, ICategoryResponse } from "../interfaces";
import { useState } from "react";

const fetchCategories = async (query: string) => {
  const response = await InventoryService.searchCategories({
    name: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

export interface CategoryFormProps {
  onSuccess?: () => void;
}

export function CategoryForm({ onSuccess }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CategoryFormData) => {
    setLoading(true);
    const request = values as ICategoryRequest;

    try {
      await InventoryService.createCategory(request);
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Nova Categoria de Produto
      </Title>
      <Form
        schema={categorySchema}
        onSubmit={handleSubmit}
        defaultValues={{
          name: "",
          parentCategoryId: "",
        }}
      >
        {() => (
            <Stack gap="md">
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
                      `${item.parentCategoryName ?? ""} - ${item.name}`
                    }
                    getValue={(item) => item.id?.toString() || ""}
                  />
                </Grid.Col>
              </Grid>

              <Center mt="xl">
                <Button
                  type="submit"
                  fullWidth
                  size="md"
                  color="brainstorm.6"
                  variant="light"
                  loading={loading}
                >
                  Salvar Categoria
                </Button>
              </Center>
            </Stack>
        )}
      </Form>
    </Paper>
  );
}
