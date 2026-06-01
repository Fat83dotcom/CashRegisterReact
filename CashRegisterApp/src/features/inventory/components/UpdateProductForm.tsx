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
  ICreateProductRequest,
  IUpdateProductResponse,
} from "../interfaces";
import { useState, useEffect } from "react";
import { CategoryForm } from "./CategoryForm";
import { TagForm } from "./TagForm";
import { UnitForm } from "./UnitForm";
import { useGenericModal } from "../../../hooks/useGenericModal";
import { ProductFormFields } from "./base/ProductFormFields";

export interface UpdateProductFormProps {
  productId: number;
  onSuccess?: () => void;
}

export function UpdateProductForm({
  productId,
  onSuccess,
}: UpdateProductFormProps) {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<IUpdateProductResponse | null>(
    null,
  );
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
    const request: ICreateProductRequest = {
      ...values,
      tagIds: values.tagIds?.map(Number),
    };

    try {
      await InventoryService.updateProduct(productId, request);
      if (onSuccess) onSuccess();
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
    description: (initialData as any)?.description || "",
    ncmCode: (initialData as any)?.ncmCode || "",
    categoryId: (initialData as any)?.categoryId,
    baseUomId: (initialData as any)?.baseUomId,
    tagIds: (initialData as any)?.tagIds?.map((t: any) => t.toString()) || [],
    isActive: String(initialData?.isActive ?? true) as any,
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
                  modal({ title: "Unidade de Medida", Form: UnitForm })
                }
                onAddTag={() => modal({ title: "Nova Tag", Form: TagForm })}
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
