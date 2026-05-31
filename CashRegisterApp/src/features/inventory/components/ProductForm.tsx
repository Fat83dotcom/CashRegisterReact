import { Button, Center, Grid, Paper, Title, Stack } from "@mantine/core";
import {
  Form,
  TextInput,
  AsyncSelect,
  MultiSelectAsync,
} from "../../../components/Form";
import { productSchema, type ProductFormData } from "../schemas/productSchema";
import { InventoryService } from "../api/inventoryService";
import type {
  ICreateProductRequest,
  ICategoryResponse,
  IUnitResponse,
  ITagResponse,
} from "../interfaces";
import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { TagForm } from "./TagForm";
import { UnitForm } from "./UnitForm";
import { useGenericModal } from "../../../hooks/useGenericModal";

const fetchCategories = async (query: string) => {
  const response = await InventoryService.searchCategories({
    name: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

const fetchUnits = async (query: string) => {
  const response = await InventoryService.searchUnits({
    searchTerm: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

const fetchTags = async (query: string) => {
  const response = await InventoryService.searchTags({
    searchTerm: query,
    page: 1,
    pageSize: 50,
  });
  return response.items || [];
};

export interface ProductFormProps {
  onSuccess?: () => void;
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  let resetForm: (() => void) | undefined;

  const openModal = useGenericModal();

  const handleOpenCategoryModal = () => {
    openModal({ title: "Nova Categoria", Form: CategoryForm });
  };

  const handleOpenUnitModal = () => {
    openModal({ title: "Unidade de Medida", Form: UnitForm });
  };

  const handleOpenTagModal = () => {
    openModal({ title: "Nova Tag", Form: TagForm });
  };

  const handleSubmit = async (values: ProductFormData) => {
    setLoading(true);
    const request: ICreateProductRequest = {
      ...values,
      tagIds: values.tagIds?.map(Number),
    };

    try {
      await InventoryService.createProduct(request, () => {
        if (resetForm) {
          resetForm();
        }
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
          description: "",
          ncmCode: "",
          categoryId: undefined as any,
          baseUomId: undefined as any,
          tagIds: [],
        }}
      >
        {(methods) => {
          resetForm = methods.reset;
          return (
            <Stack gap="md">
              <Grid gutter="md">
                <Grid.Col span={{ base: 12, md: 8 }}>
                  <TextInput
                    name="name"
                    label="Nome do Produto"
                    placeholder="Ex: Teclado Mecânico"
                    withAsterisk
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    name="sku"
                    label="SKU (Código)"
                    placeholder="Ex: TEC-001"
                    withAsterisk
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <AsyncSelect<ICategoryResponse>
                    name="categoryId"
                    label="Categoria"
                    placeholder="Selecione uma categoria"
                    fetcher={fetchCategories}
                    onAdd={handleOpenCategoryModal}
                    getLabel={(item) =>
                      item.parentCategoryName
                        ? `${item.parentCategoryName} - ${item.name}`
                        : item.name || ""
                    }
                    getValue={(item) => item.id?.toString() || ""}
                    withAsterisk
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <AsyncSelect<IUnitResponse>
                    name="baseUomId"
                    label="Unidade de Medida Base"
                    placeholder="Selecione a unidade"
                    fetcher={fetchUnits}
                    onAdd={handleOpenUnitModal}
                    getLabel={(item) => `${item.name} (${item.code})`}
                    getValue={(item) => item.id?.toString() || ""}
                    withAsterisk
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <MultiSelectAsync<ITagResponse>
                    name="tagIds"
                    label="Tags"
                    placeholder="Selecione as tags"
                    fetcher={fetchTags}
                    onAdd={handleOpenTagModal}
                    getLabel={(item) => item.name}
                    getValue={(item) => item.id?.toString() || ""}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <TextInput
                    name="description"
                    label="Descrição"
                    placeholder="Descrição detalhada do produto"
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    name="ncmCode"
                    label="Código NCM"
                    placeholder="Ex: 84716052"
                    maxLength={8}
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
