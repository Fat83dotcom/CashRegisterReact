import {
  Button,
  Center,
  Paper,
  Title,
  Stack,
  LoadingOverlay,
} from "@mantine/core";
import { Form } from "../../../components/Form";
import { tagSchema, type TagFormData } from "../schemas/tagSchema";
import { InventoryService } from "../api/inventoryService";
import type { IUpdateTagRequest, IGetTagByIdResponse } from "../interfaces";
import { useState, useEffect } from "react";
import { TagFormFields } from "./TagFormFields";

export interface UpdateTagFormProps {
  tagId: number;
  onSuccess: () => void;
}

export function UpdateTagForm({ tagId, onSuccess }: UpdateTagFormProps) {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<IGetTagByIdResponse | null>(
    null,
  );

  useEffect(() => {
    InventoryService.getTagById(tagId)
      .then((data) => {
        setInitialData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [tagId]);

  const handleSubmit = async (values: TagFormData) => {
    setLoading(true);
    const request: IUpdateTagRequest = {
      name: values.name,
      colorHex: values.colorHex,
      isActive: values.isActive === "true",
    };

    try {
      await InventoryService.updateTag(tagId, request).then((response) => {
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

  const defaultValues: TagFormData = {
    name: initialData?.name || "",
    colorHex: initialData?.colorHex || "#228be6",
    isActive: String(initialData?.isActive ?? true),
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Editar Tag
      </Title>
      {initialData && (
        <Form
          schema={tagSchema}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        >
          {() => {
            return (
              <Stack gap="md">
                <TagFormFields isUpdate />

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
            );
          }}
        </Form>
      )}
    </Paper>
  );
}
