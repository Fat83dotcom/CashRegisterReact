import { Button, Center, Paper, Title, Stack } from "@mantine/core";
import { Form } from "../../../components/Form";
import { productSchema, type ProductFormData } from "../schemas/productSchema";
import { InventoryService } from "../api/inventoryService";
import type { ICreateProductRequest } from "../interfaces";
import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { TagForm } from "./TagForm";
import { UnitForm } from "./UnitForm";
import { useGenericModal } from "../../../hooks/useGenericModal";
import { ProductFormFields } from "./base/ProductFormFields";

export interface ProductFormProps {
  onSuccess?: () => void;
}

export function CreateProductForm({ onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const openModal = useGenericModal();

  const handleSubmit = async (values: ProductFormData, methods: any) => {
    setLoading(true);
    const request: ICreateProductRequest = {
      ...values,
      tagIds: values.tagIds?.map(Number),
    };

    try {
      await InventoryService.createProduct(request, () => {
        methods.reset();
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
        onSubmit={(values, methods) => handleSubmit(values, methods)}
        defaultValues={{
          name: "",
          sku: "",
          description: "",
          ncmCode: "",
          categoryId: undefined as any,
          baseUomId: undefined as any,
          tagIds: [],
          isActive: "true" as any,
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
                  openModal({ title: "Unidade de Medida", Form: UnitForm })
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
