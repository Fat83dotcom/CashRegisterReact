import {
  Button,
  Center,
  Grid,
  Paper,
  Title,
  Stack,
  Alert,
  Divider,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { Form, TextInput, AsyncSelect } from "../../../components/Form";
import {
  conversionSchema,
  type ConversionFormData,
} from "../schemas/conversionSchema";
import { InventoryService } from "../api/inventoryService";
import type {
  IUnitResponse,
  IProductResponse,
  ICreateConversionRequest,
} from "../interfaces";
import { useState } from "react";
import { UnitForm } from "./UnitForm";
import { ProductForm } from "./ProductForm";
import { useGenericModal } from "../../../hooks/useGenericModal";

// Extração dos fetchers para fora do componente para evitar recriação (Problema de Identidade de Referência)
const fetchUnits = async (query: string) => {
  const res = await InventoryService.searchUnits({
    searchTerm: query,
    page: 1,
    pageSize: 20,
  });
  return res.items || [];
};

const fetchProducts = async (query: string) => {
  const res = await InventoryService.searchProducts({
    searchTerm: query,
    page: 1,
    pageSize: 20,
  });
  return res.items || [];
};

export interface ConversionFormProps {
  onSuccess?: () => void;
}

export function ConversionForm({ onSuccess }: ConversionFormProps) {
  const [loading, setLoading] = useState(false);
  const openModal = useGenericModal();
  let resetForm: (() => void) | undefined;

  const handleOpenUnitModal = () => {
    openModal({ title: "Nova Unidade", Form: UnitForm });
  };

  const handleOpenProductModal = () => {
    openModal({ title: "Novo Produto", Form: ProductForm });
  };

  const handleSubmit = async (values: ConversionFormData) => {
    setLoading(true);
    const request = values as ICreateConversionRequest;

    try {
      await InventoryService.createConversion(request, () => {
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
      <Title order={2} ta="center" mb="md" c="brainstorm.6">
        Regra de Conversão
      </Title>

      <Alert
        variant="light"
        color="blue"
        title="Como funciona?"
        icon={<IconInfoCircle />}
        mb="xl"
      >
        Define o multiplicador entre unidades. Exemplo de leitura:
        <strong> 1 [Caixa] = 12 [Unidades]</strong>.
      </Alert>

      <Form
        schema={conversionSchema}
        onSubmit={handleSubmit}
        defaultValues={{ multiplier: 1, productId: null }}
      >
        {(methods) => {
          resetForm = methods.reset;
          return (
            <Stack gap="md">
              <Grid gutter="md" align="flex-end">
                <Grid.Col span={{ base: 12, md: 5 }}>
                  <AsyncSelect<IUnitResponse>
                    name="fromUomId"
                    label="1 (Uma) Unidade Origem"
                    placeholder="Ex: Caixa (CX)"
                    withAsterisk
                    onAdd={handleOpenUnitModal}
                    fetcher={fetchUnits}
                    getLabel={(item) => `${item.name} (${item.code})`}
                    getValue={(item) => item.id?.toString() || ""}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                  <TextInput
                    name="multiplier"
                    label="Equivale a (Qtd)"
                    placeholder="Ex: 12"
                    withAsterisk
                    type="number"
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 5 }}>
                  <AsyncSelect<IUnitResponse>
                    name="toUomId"
                    label="Unidade de Destino"
                    placeholder="Ex: Unidade (UN)"
                    withAsterisk
                    onAdd={handleOpenUnitModal}
                    fetcher={fetchUnits}
                    getLabel={(item) => `${item.name} (${item.code})`}
                    getValue={(item) => item.id?.toString() || ""}
                  />
                </Grid.Col>
              </Grid>

              <Divider my="sm" variant="dashed" />

              <Grid gutter="md">
                <Grid.Col span={12}>
                  <AsyncSelect<IProductResponse>
                    name="productId"
                    label="Vincular a um Produto Específico (Opcional)"
                    placeholder="Se vazio, a regra será geral para todas as movimentações destas unidades"
                    clearable
                    onAdd={handleOpenProductModal}
                    fetcher={fetchProducts}
                    getLabel={(item) =>
                      `${item.sku || ""} - ${item.name || ""}`
                    }
                    getValue={(item) => item.id?.toString() || ""}
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
                  Salvar Regra de Conversão
                </Button>
              </Center>
            </Stack>
          );
        }}
      </Form>
    </Paper>
  );
}
