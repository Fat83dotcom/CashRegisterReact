import { Grid, Divider, Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { TextInput, AsyncSelect, Select } from "../../../../components/Form";
import { InventoryService } from "../../api/inventoryService";
import type { IUnitResponse, IProductResponse } from "../../interfaces";

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
  const res = await InventoryService.searchSharedProducts({
    page: 1,
    pageSize: 50,
    searchTerm: query,
  });
  return res.items || [];
};

interface ConversionFormFieldsProps {
  onAddUnit: () => void;
  onAddProduct: () => void;
  isEdit?: boolean;
}

export function ConversionFormFields({
  onAddUnit,
  onAddProduct,
  isEdit = false,
}: ConversionFormFieldsProps) {
  return (
    <>
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

      <Grid gutter="md" align="flex-end">
        <Grid.Col span={{ base: 12, md: 5 }}>
          <AsyncSelect<IUnitResponse>
            name="fromUomId"
            label="1 (Uma) Unidade Origem"
            placeholder="Ex: Caixa (CX)"
            withAsterisk
            onAdd={onAddUnit}
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
            onAdd={onAddUnit}
            fetcher={fetchUnits}
            getLabel={(item) => `${item.name} (${item.code})`}
            getValue={(item) => item.id?.toString() || ""}
          />
        </Grid.Col>
      </Grid>

      <Divider my="sm" variant="dashed" />

      <Grid gutter="md">
        <Grid.Col span={isEdit ? 8 : 12}>
          <AsyncSelect<IProductResponse>
            name="productId"
            label="Vincular a um Produto Específico (Opcional)"
            placeholder="Se vazio, a regra será geral"
            clearable
            onAdd={onAddProduct}
            fetcher={fetchProducts}
            getLabel={(item) => `${item.sku || ""} - ${item.name || ""}`}
            getValue={(item) => item.id?.toString() || ""}
          />
        </Grid.Col>
        {isEdit && (
          <Grid.Col span={4}>
            <Select
              name="isActive"
              label="Status"
              placeholder="Selecione"
              data={[
                { value: "true", label: "Ativo" },
                { value: "false", label: "Inativo" },
              ]}
              withAsterisk
            />
          </Grid.Col>
        )}
      </Grid>
    </>
  );
}
