import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, ActionIcon, Stack, Text, Divider, Box, Grid, Group } from "@mantine/core";
import { IconTrash, IconPlus, IconArrowDownBar, IconX } from "@tabler/icons-react";
import type { CreateInventoryTransactionFormData } from "../../schemas/inventoryTransactionSchema";
import { InventoryService } from "../../api/inventoryService";
import { Select, TextInput, Textarea, AsyncSelect } from "../../../../components/Form";
import type { IProductResponse, IWarehouseResponse } from "../../interfaces";

const fetchProducts = async (query: string) => {
  const response = await InventoryService.searchProducts({
    searchTerm: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

function AvailableBalanceIndicator({ 
  productId, 
  warehouseId,
  onChangeQuantity
}: { 
  productId?: number; 
  warehouseId?: number;
  onChangeQuantity?: (value: number | string) => void;
}) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!productId) {
      setBalance(null);
      return;
    }
    InventoryService.getAvailableBalance(productId, warehouseId)
      .then(setBalance)
      .catch(() => setBalance(null));
  }, [productId, warehouseId]);

  if (balance === null || typeof balance !== "number") return null;

  return (
    <Group gap="xs" mt={4}>
      <Text size="xs" c={balance > 0 ? "green" : "red"} fw={500}>
        Saldo Disponível: {balance}
      </Text>
      {balance > 0 && onChangeQuantity && (
        <>
          <Button 
            size="compact-xs" 
            variant="light" 
            color="brainstorm.6" 
            onClick={() => onChangeQuantity(balance)}
            leftSection={<IconArrowDownBar size={12} />}
          >
            Usar Máximo
          </Button>
          <Button 
            size="compact-xs" 
            variant="light" 
            color="yellow" 
            onClick={() => onChangeQuantity("")}
            leftSection={<IconX size={12} />}
          >
            Zerar
          </Button>
        </>
      )}
    </Group>
  );
}

const fetchWarehouses = async (query: string) => {
  const response = await InventoryService.searchWarehouses({
    searchTerm: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

export function InventoryTransactionFormFields() {
  const { formState: { errors }, watch, setValue } = useFormContext<CreateInventoryTransactionFormData>();

  const transactionType = watch("transactionType");
  const globalSourceWarehouseId = watch("globalSourceWarehouseId");
  const items = watch("items") || [];

  const handleAddItem = () => {
    setValue("items", [
      ...items,
      {
        productId: 0,
        uomId: 1, // Fixado provisoriamente em 1 (UN) para não falhar na validação
        transactionQuantity: 1,
        baseQuantity: 1,
      }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setValue("items", newItems);
  };

  // Simplificação: Sincronizar baseQuantity com transactionQuantity
  const handleQuantityChange = (index: number, val: string | number) => {
    const num = Number(val);
    setValue(`items.${index}.transactionQuantity`, num);
    setValue(`items.${index}.baseQuantity`, num);
  };

  return (
    <Stack gap="md">
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Select
            name="transactionType"
            label="Tipo de Movimentação"
            placeholder="Selecione o tipo"
            data={[
              { value: "PurchaseEntry", label: "Entrada (Compra)" },
              { value: "RequisitionExit", label: "Saída (Requisição)" },
              { value: "Transfer", label: "Transferência" },
            ]}
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            name="name"
            label="Nome (Opcional)"
            placeholder="Ex: Reforço de Estoque"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            name="referenceDocument"
            label="Documento de Referência"
            placeholder="Ex: NF-12345"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 12 }}>
          <Textarea
            name="description"
            label="Descrição (Opcional)"
            placeholder="Detalhes adicionais da movimentação..."
          />
        </Grid.Col>

        {(transactionType === "RequisitionExit" || transactionType === "Transfer") && (
           <Grid.Col span={{ base: 12, md: transactionType === "Transfer" ? 6 : 12 }}>
             <AsyncSelect<IWarehouseResponse>
              name="globalSourceWarehouseId"
              label="Almoxarifado de Origem"
              placeholder="Selecione a origem..."
              fetcher={fetchWarehouses}
              getLabel={(w) => w.name}
              getValue={(w) => w.id?.toString() || ""}
             />
           </Grid.Col>
        )}

        {(transactionType === "PurchaseEntry" || transactionType === "Transfer") && (
           <Grid.Col span={{ base: 12, md: transactionType === "Transfer" ? 6 : 12 }}>
             <AsyncSelect<IWarehouseResponse>
              name="globalDestinationWarehouseId"
              label="Almoxarifado de Destino"
              placeholder="Selecione o destino..."
              fetcher={fetchWarehouses}
              getLabel={(w) => w.name}
              getValue={(w) => w.id?.toString() || ""}
             />
           </Grid.Col>
        )}
      </Grid>

      <Divider my="sm" label="Itens da Movimentação" labelPosition="center" />

      {items.map((_, index) => (
        <Box key={index} p="sm" style={{ border: '1px solid #eee', borderRadius: 8 }}>
          <Grid gutter="xs" align="flex-end">
            <Grid.Col span={{ base: 12, md: 9 }}>
              <AsyncSelect<IProductResponse>
                name={`items.${index}.productId`}
                label="Produto"
                placeholder="Selecione..."
                fetcher={fetchProducts}
                getLabel={(p) => `${p.sku} - ${p.name}`}
                getValue={(p) => p.id?.toString() || ""}
              />
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 2 }}>
              <TextInput
                name={`items.${index}.transactionQuantity`}
                label="Qtd."
                type="number"
                onChange={(e) => handleQuantityChange(index, e.target.value)}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 1 }}>
              <ActionIcon color="red" onClick={() => handleRemoveItem(index)} variant="light" size="lg" mb={4}>
                <IconTrash size={20} />
              </ActionIcon>
            </Grid.Col>
          </Grid>

          {(transactionType === "RequisitionExit" || transactionType === "Transfer") && Number(items[index]?.productId) > 0 && (
            <Box mt="xs">
              <AvailableBalanceIndicator 
                 productId={Number(items[index].productId)} 
                 warehouseId={globalSourceWarehouseId ? Number(globalSourceWarehouseId) : undefined} 
                 onChangeQuantity={(val) => handleQuantityChange(index, val)}
              />
            </Box>
          )}
        </Box>
      ))}

      {errors.items?.root?.message && (
        <Text c="red" size="sm">{errors.items.root.message}</Text>
      )}

      <Button variant="outline" onClick={handleAddItem} leftSection={<IconPlus size={16}/>}>
        Adicionar Produto
      </Button>
    </Stack>
  );
}
