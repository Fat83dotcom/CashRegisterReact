import { Button, Center, Paper, Title, Stack } from "@mantine/core";
import { Form } from "../../../components/Form";
import { productSchema, type ProductFormData } from "../schemas/productSchema";
import { InventoryService } from "../api/inventoryService";
import type { ICreateProductRequest } from "../interfaces";
import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { TagForm } from "./TagForm";

import { useGenericModal } from "../../../hooks/useGenericModal";
import { ProductFormFields } from "./base/ProductFormFields";
import { CreateUnitForm } from "./CreateUnitForm";

export interface ProductFormProps {
  onSuccess?: () => void;
}

export function CreateProductForm({ onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const openModal = useGenericModal();

  const handleSubmit = async (values: ProductFormData) => {
    setLoading(true);
    const request: ICreateProductRequest = {
      name: values.name,
      sku: values.sku,
      description: values.description,
      ncmCode: values.ncmCode,
      categoryId: Number(values.categoryId),
      baseUomId: Number(values.baseUomId),
      tagIds: values.tagIds.map(Number),
      isActive: values.isActive === "true",
    };

    try {
      await InventoryService.createProduct(request, () => {
        if (onSuccess) onSuccess();
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={800} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Novo Produto
      </Title>
      <Form
        schema={productSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          name: "",
          sku: "",
          description: null,
          ncmCode: null,
          categoryId: "",
          baseUomId: "",
          tagIds: [],
          isActive: "true",
        }}
      >
        {() => {
          return (
            <Stack gap="md">
              <ProductFormFields
                onAddCategory={() =>
                  openModal({ title: "Nova Categoria", Form: CategoryForm })
                }
                onAddUnit={() =>
                  openModal({
                    title: "Unidade de Medida",
                    Form: CreateUnitForm,
                  })
                }
                onAddTag={() => openModal({ title: "Nova Tag", Form: TagForm })}
              />

              <Center mt="xl">
                <Button
                  type="submit"
                  fullWidth
                  size="md"
                  color="brainstorm.6"
                  variant="light"
                  loading={loading}
                >
                  Salvar Produto
                </Button>
              </Center>
            </Stack>
          );
        }}
      </Form>
    </Paper>
  );
}
