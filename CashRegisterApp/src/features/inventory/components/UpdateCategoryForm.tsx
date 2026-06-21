import { useState, useEffect } from "react";
import { Button, Center, Paper, Title, Stack, LoadingOverlay, Grid } from "@mantine/core";
import { Form, Select } from "../../../components/Form";
import {
  categorySchema,
  
} from "../schemas/categorySchema";
import { InventoryService } from "../api/inventoryService";
import type { IUpdateCategoryRequest } from "../interfaces";
import { CategoryFormFields } from "./base/CategoryFormFields";
import { z } from "zod";

export const updateCategorySchema = categorySchema.extend({
  isActive: z.string().default("true"),
});

export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;

export interface UpdateCategoryFormProps {
  id: number;
  onSuccess: () => void;
}

export function UpdateCategoryForm({ id, onSuccess }: UpdateCategoryFormProps) {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<any | null>(null);

  useEffect(() => {
    InventoryService.getCategoryByIdResponse(id)
      .then((data) => {
        setInitialData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (values: UpdateCategoryFormData) => {
    setLoading(true);
    const request: IUpdateCategoryRequest = {
      name: values.name,
      parentCategoryId: values.parentCategoryId ? Number(values.parentCategoryId) : null,
      isActive: values.isActive === "true",
    };

    try {
      await InventoryService.updateCategory(id, request).then((response) => {
        if (response && response.id > 0) onSuccess();
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) {
    return (
      <Paper p="xl" pos="relative" h={300}>
        <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
      </Paper>
    );
  }

  const defaultValues: UpdateCategoryFormData = {
    name: initialData?.name || "",
    parentCategoryId: initialData?.parentCategoryId?.toString() || null,
    isActive: String(initialData?.isActive ?? true),
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl" pos="relative">
      <LoadingOverlay visible={loading} />
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Editar Categoria
      </Title>

      <Form
        schema={updateCategorySchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <CategoryFormFields />
            
            <Grid gutter="md">
              <Grid.Col span={12}>
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

            <Center mt="xl">
              <Button 
                type="submit" 
                fullWidth 
                size="md" 
                color="brainstorm.6"
                variant="light"
                loading={loading}
              >
                Atualizar Categoria
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
