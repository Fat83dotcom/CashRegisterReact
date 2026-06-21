import { useState, useEffect } from "react";
import { Button, Center, Paper, Title, Stack, LoadingOverlay, Grid } from "@mantine/core";
import { Form, Select } from "../../../components/Form";
import { tagSchema } from "../schemas/tagSchema";
import { InventoryService } from "../api/inventoryService";
import type { IUpdateTagRequest } from "../interfaces";
import { TagFormFields } from "./base/TagFormFields";
import { z } from "zod";

export const updateTagSchema = tagSchema.extend({
  isActive: z.string().default("true"),
});

export type UpdateTagFormData = z.infer<typeof updateTagSchema>;

export interface UpdateTagFormProps {
  id: number;
  onSuccess: () => void;
}

export function UpdateTagForm({ id, onSuccess }: UpdateTagFormProps) {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<any | null>(null);

  useEffect(() => {
    InventoryService.getTagByIdResponse(id)
      .then((data) => {
        setInitialData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (values: UpdateTagFormData) => {
    setLoading(true);
    const request: IUpdateTagRequest = {
      name: values.name,
      colorHex: values.colorHex,
      isActive: values.isActive === "true",
    };

    try {
      await InventoryService.updateTag(id, request).then((response) => {
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

  const defaultValues: UpdateTagFormData = {
    name: initialData?.name || "",
    colorHex: initialData?.colorHex || "#228be6",
    isActive: String(initialData?.isActive ?? true),
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={500} mx="auto" mt="xl" pos="relative">
      <LoadingOverlay visible={loading} />
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Editar Tag
      </Title>

      <Form
        schema={updateTagSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <TagFormFields />
            
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
                Atualizar Tag
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
