import { useState } from "react";
import { Button, Center, Paper, Stack, Title } from "@mantine/core";
import { Form } from "../../../components/Form";
import { tagSchema, type TagFormData } from "../schemas/tagSchema";
import { InventoryService } from "../api/inventoryService";
import type { ICreateTagRequest } from "../interfaces";
import { TagFormFields } from "./base/TagFormFields";

export interface CreateTagFormProps {
  onSuccess?: () => void;
}

export function CreateTagForm({ onSuccess }: CreateTagFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: TagFormData) => {
    setLoading(true);
    const request: ICreateTagRequest = {
      name: values.name,
      colorHex: values.colorHex,
    };

    try {
      await InventoryService.createTag(request);
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  const defaultValues: TagFormData = {
    name: "",
    colorHex: "#228be6",
    isActive: "true",
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={500} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Nova Tag
      </Title>

      <Form
        schema={tagSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <TagFormFields />

            <Center mt="xl">
              <Button
                type="submit"
                fullWidth
                size="md"
                color="brainstorm.6"
                variant="light"
                loading={loading}
              >
                Salvar Tag
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
