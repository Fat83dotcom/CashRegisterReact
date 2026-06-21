import { useState } from "react";
import { Button, Center, Paper, Stack, Title } from "@mantine/core";
import { Form } from "../../../components/Form";
import {
  categorySchema,
  type CategoryFormData,
} from "../schemas/categorySchema";
import { InventoryService } from "../api/inventoryService";
import type { ICategoryRequest } from "../interfaces";
import { CategoryFormFields } from "./base/CategoryFormFields";

export interface CreateCategoryFormProps {
  onSuccess?: () => void;
}

export function CreateCategoryForm({ onSuccess }: CreateCategoryFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CategoryFormData) => {
    setLoading(true);
    const request: ICategoryRequest = {
      name: values.name,
      parentCategoryId: values.parentCategoryId ? Number(values.parentCategoryId) : null,
    };

    try {
      await InventoryService.createCategory(request);
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  const defaultValues: CategoryFormData = {
    name: "",
    parentCategoryId: null,
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Nova Categoria de Produto
      </Title>

      <Form
        schema={categorySchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <CategoryFormFields />

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
