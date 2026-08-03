import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, ActionIcon, Stack, Text, Divider, Box, Grid, Group, Paper } from "@mantine/core";
import { IconTrash, IconPlus, IconArrowDownBar, IconX } from "@tabler/icons-react";
import type { CreateInventoryTransactionFormData } from "../../schemas/inventoryTransactionSchema";
import { InventoryService } from "../../api/inventoryService";
import { Select, TextInput, Textarea, AsyncSelect } from "../../../../components/Form";
import type { IWarehouseResponse, IProductConversionItemResponse } from "../../interfaces";

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

const fetchUoms = async (query: string) => {
  const response = await InventoryService.searchUnits({
    searchTerm: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

function TransactionItemRow({ 
  index, 
  handleRemoveItem, 
  transactionType, 
  globalSourceWarehouseId 
}: { 
  index: number; 
  handleRemoveItem: (idx: number) => void;
  transactionType: string;
  globalSourceWarehouseId?: string;
}) {
  const { watch, setValue } = useFormContext<CreateInventoryTransactionFormData>();
  
  const productId = watch(`items.${index}.productId`);
  const uomId = watch(`items.${index}.uomId`);
  const transactionQuantity = watch(`items.${index}.transactionQuantity`);
  
  const [conversions, setConversions] = useState<IProductConversionItemResponse[]>([]);
  const [showNewConversion, setShowNewConversion] = useState(false);
  const [newMultiplier, setNewMultiplier] = useState<number | "">("");
  const [isSavingRule, setIsSavingRule] = useState(false);
  const [baseUomId, setBaseUomId] = useState<number | null>(null);

  // Busca as conversões quando o produto mudar
  useEffect(() => {
    if (!productId) {
      setConversions([]);
      setBaseUomId(null);
      return;
    }
    InventoryService.getProductConversions(Number(productId)).then(res => {
      setConversions(res);
      const baseRule = res.find(c => c.ruleType === "Base");
      if (baseRule) setBaseUomId(baseRule.uomId);

      // Auto-selecionar a unidade Base se uomId estiver vazio
      if (!uomId && res.length > 0) {
        setValue(`items.${index}.uomId`, res[0].uomId.toString());
      }
    });
  }, [productId]);

  // Recalcular quantidade base de forma síncrona
  useEffect(() => {
    if (!uomId || !transactionQuantity || conversions.length === 0) return;
    
    const selectedConversion = conversions.find(c => {
       const key = c.ruleType === "Base" ? c.uomId.toString() : `${c.uomId}_${c.ruleType}`;
       return key === uomId;
    });
    
    if (selectedConversion) {
      setValue(`items.${index}.baseQuantity`, Number(transactionQuantity) * selectedConversion.multiplier);
    }
  }, [transactionQuantity, uomId, conversions]);

  const handleUomChange = (val: string | null) => {
    if (val === "+new") {
      setShowNewConversion(true);
      setValue(`items.${index}.uomId`, ""); // Limpa o uomId até que ele crie a nova regra
    } else {
      setShowNewConversion(false);
      setValue(`items.${index}.uomId`, val || "");
    }
  };

  const handleSaveRule = async () => {
    const tempUomId = watch(`items.${index}.temp_uomId` as any); // Unidade temporária do Learning Card
    if (!newMultiplier || !baseUomId || !tempUomId) return;
    
    setIsSavingRule(true);
    try {
      await InventoryService.createConversion({
        fromUomId: Number(tempUomId),
        toUomId: baseUomId,
        multiplier: Number(newMultiplier),
        productId: Number(productId)
      });
      setShowNewConversion(false);
      
      // Atualiza a lista de conversões para embutir a recém-criada
      const res = await InventoryService.getProductConversions(Number(productId));
      setConversions(res);
      setValue(`items.${index}.uomId`, tempUomId.toString());
    } finally {
      setIsSavingRule(false);
    }
  };

  return (
    <Box p="sm" style={{ border: '1px solid #eee', borderRadius: 8 }}>
      <Grid gutter="xs" align="flex-end">
        <Grid.Col span={{ base: 12, md: 5 }}>
          <AsyncSelect<any>
            name={`items.${index}.productId`}
            label="Produto"
            placeholder="Selecione..."
            fetcher={fetchProducts}
            getLabel={(p) => `${p.sku} - ${p.name}`}
            getValue={(p) => p.id?.toString() || ""}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Select
            name={`items.${index}.uomId`}
            label="Conversão de Unidade"
            placeholder="Selecione..."
            disabled={!productId}
            value={showNewConversion ? "+new" : (uomId || null)}
            onChange={handleUomChange}
            data={[
              ...conversions.map(c => ({
                value: c.ruleType === "Base" ? c.uomId.toString() : `${c.uomId}_${c.ruleType}`,
                label: `[${c.ruleType === "ProductSpecific" ? "Produto" : c.ruleType}] ${c.uomSymbol} (Fator: ${c.multiplier})`
              })),
              { value: "+new", label: "+ Nova Conversão de Unidades" }
            ]}
          />
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 3 }}>
          <TextInput
            name={`items.${index}.transactionQuantity`}
            label="Qtd."
            type="number"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 1 }}>
          <ActionIcon color="red" onClick={() => handleRemoveItem(index)} variant="light" size="lg" mb={4}>
            <IconTrash size={20} />
          </ActionIcon>
        </Grid.Col>
      </Grid>

      {showNewConversion && (
        <Paper mt="sm" p="sm" withBorder radius="md">
          <Text size="sm" fw={500} c="brainstorm.6" mb="xs">
            Nova Conversão de Unidades Detectada!
          </Text>
          <Group align="flex-end">
            <Box style={{ flex: 1 }}>
              <AsyncSelect<any>
                name={`items.${index}.temp_uomId`}
                label="Selecione a Unidade"
                placeholder="Ex: Fardo, Palete..."
                fetcher={fetchUoms}
                getLabel={(u) => `${u.code} - ${u.name}`}
                getValue={(u) => u.id?.toString() || ""}
              />
            </Box>
            <TextInput
              name={`temp_multiplier_${index}`}
              label="Multiplicador (Equivale a quantas bases?)"
              type="number"
              value={newMultiplier}
              onChange={(e) => setNewMultiplier(e.target.value as unknown as number)}
              placeholder="Ex: 10"
              style={{ flex: 1 }}
            />
            <Button color="brainstorm.6" onClick={handleSaveRule} loading={isSavingRule} disabled={!newMultiplier}>
              Salvar Regra
            </Button>
          </Group>
        </Paper>
      )}

      {(transactionType === "RequisitionExit" || transactionType === "Transfer") && Number(productId) > 0 && (
        <Box mt="xs">
          <AvailableBalanceIndicator 
              productId={Number(productId)} 
              warehouseId={globalSourceWarehouseId ? Number(globalSourceWarehouseId) : undefined} 
              onChangeQuantity={(val) => setValue(`items.${index}.transactionQuantity`, val as number)}
          />
        </Box>
      )}
    </Box>
  );
}

export function InventoryTransactionFormFields() {
  const { formState: { errors }, watch, setValue } = useFormContext<CreateInventoryTransactionFormData>();

  const transactionType = watch("transactionType");
  const globalSourceWarehouseId = watch("globalSourceWarehouseId");
  const items = watch("items") || [];

  const handleAddItem = () => {
    setValue("items", [
      ...items,
      {
        productId: "",
        uomId: "",
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
         <TransactionItemRow 
           key={index}
           index={index}
           handleRemoveItem={handleRemoveItem}
           transactionType={transactionType}
           globalSourceWarehouseId={globalSourceWarehouseId}
         />
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
