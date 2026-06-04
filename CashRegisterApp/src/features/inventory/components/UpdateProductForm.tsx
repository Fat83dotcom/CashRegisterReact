import {
  Button,
  Center,
  Paper,
  Title,
  Stack,
  LoadingOverlay,
} from "@mantine/core";
import { Form } from "../../../components/Form";
import { productSchema, type ProductFormData } from "../schemas/productSchema";
import { InventoryService } from "../api/inventoryService";
import type {
  IUpdateProductRequest,
  IGetProductByIdResponse,
} from "../interfaces";
import { useState, useEffect } from "react";
import { CategoryForm } from "./CategoryForm";

import { useGenericModal } from "../../../hooks/useGenericModal";
import { ProductFormFields } from "./base/ProductFormFields";
import { CreateUnitForm } from "./CreateUnitForm";
import { CreateTagForm } from "./CreateTagForm";

export interface UpdateProductFormProps {
  productId: number;
  onSuccess: () => void;
}

export function UpdateProductForm({
  productId,
  onSuccess,
}: UpdateProductFormProps) {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] =
    useState<IGetProductByIdResponse | null>(null);
  const modal = useGenericModal();

  useEffect(() => {
    InventoryService.getProductById(productId)
      .then((data) => {
        setInitialData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [productId]);

  const handleSubmit = async (values: ProductFormData) => {
    setLoading(true);
    const request: IUpdateProductRequest = {
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
      await InventoryService.updateProduct(productId, request).then(
        (response) => {
          if (response && response.id > 0) onSuccess();
        },
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) {
    return (
      <Paper p="xl" pos="relative" h={400}>
        <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
      </Paper>
    );
  }

  const defaultValues: ProductFormData = {
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    description: initialData?.description || null,
    ncmCode: initialData?.ncmCode || null,
    categoryId: initialData?.categoryId.toString() || "",
    baseUomId: initialData?.baseUomId.toString() || "",
    tagIds: initialData?.tagIds.map(String) || [],
    isActive: String(initialData?.isActive ?? true),
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={800} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="blue.6">
        Editar Produto
      </Title>
      <Form
        schema={productSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => {
          return (
            <Stack gap="md">
              <ProductFormFields
                onAddCategory={() =>
                  modal({ title: "Nova Categoria", Form: CategoryForm })
                }
                onAddUnit={() =>
                  modal({ title: "Unidade de Medida", Form: CreateUnitForm })
                }
                onAddTag={() =>
                  modal({ title: "Nova Tag", Form: CreateTagForm })
                }
              />

              <Center mt="xl">
                <Button
                  type="submit"
                  fullWidth
                  size="md"
                  color="blue.6"
                  variant="light"
                  loading={loading}
                >
                  Atualizar Produto
                </Button>
              </Center>
            </Stack>
          );
        }}
      </Form>
    </Paper>
  );
}
