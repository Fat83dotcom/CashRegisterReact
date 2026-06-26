import { useState } from "react";
import { Button, Center, Paper, Stack, Text, Select, NumberInput, TextInput, Title } from "@mantine/core";
import { Form } from "../../../components/Form";
import { adjustStockSchema, type AdjustStockFormData } from "../schemas/adjustStockSchema";
import { InventoryService } from "../api/inventoryService";
import type { ICreateInventoryTransactionRequest } from "../interfaces";
import { notifications } from "@mantine/notifications";
import { useFormContext } from "react-hook-form";

interface AdjustStockFormProps {
  productId: number;
  productName: string;
  warehouseId: number;
  warehouseName: string;
  currentQuantity: number;
  onSuccess?: () => void;
}

function AdjustStockFormFields({ currentQuantity }: { currentQuantity: number }) {
  const { formState: { errors }, watch, setValue, register } = useFormContext<AdjustStockFormData>();
  const adjustmentType = watch("adjustmentType");
  const quantity = watch("quantity") || 0;

  // Calculo apenas visual
  const newBalance = adjustmentType === "InventoryAdjustmentEntry" 
    ? currentQuantity + quantity 
    : currentQuantity - quantity;

  return (
    <Stack gap="md">
      <Select
        label="Tipo de Ajuste"
        placeholder="Selecione o tipo"
        data={[
          { value: "InventoryAdjustmentEntry", label: "Entrada (Sobra de Contagem, Doação, etc.)" },
          { value: "InventoryAdjustmentExit", label: "Saída (Perda, Avaria, Roubo, etc.)" },
        ]}
        value={adjustmentType}
        onChange={(val) => setValue("adjustmentType", val as any)}
        error={errors.adjustmentType?.message}
        withAsterisk
      />

      <NumberInput
        label="Quantidade a Ajustar"
        placeholder="Ex: 5"
        min={1}
        value={quantity || ""}
        onChange={(val) => setValue("quantity", Number(val))}
        error={errors.quantity?.message}
        withAsterisk
      />

      <TextInput
        label="Motivo / Justificativa"
        placeholder="Ex: Acerto de inventário rotativo"
        {...register("reason")}
        error={errors.reason?.message}
        withAsterisk
      />

      {quantity > 0 && adjustmentType && (
        <Paper withBorder p="sm">
          <Text size="sm" c="dimmed">Saldo Atual: {currentQuantity}</Text>
          <Text size="md" fw={700} c={newBalance < 0 ? "red" : "brainstorm.6"}>
            Novo Saldo Previsto: {newBalance}
          </Text>
        </Paper>
      )}
    </Stack>
  );
}

export function AdjustStockForm({ 
  productId, 
  productName, 
  warehouseId, 
  warehouseName, 
  currentQuantity, 
  onSuccess 
}: AdjustStockFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: AdjustStockFormData) => {
    setLoading(true);
    
    try {
      const product = await InventoryService.getProductById(productId);

      const request: ICreateInventoryTransactionRequest = {
        transactionType: values.adjustmentType,
        referenceDocument: `AJUSTE: ${values.reason}`,
        items: [
          {
            productId: productId,
            uomId: product.baseUomId || 1,
            transactionQuantity: values.quantity,
            baseQuantity: values.quantity,
            sourceWarehouseId: values.adjustmentType === "InventoryAdjustmentExit" ? warehouseId : undefined,
            destinationWarehouseId: values.adjustmentType === "InventoryAdjustmentEntry" ? warehouseId : undefined,
          }
        ],
      };

      const response = await InventoryService.createTransaction(request);
      
      if (response && response.id > 0) {
        notifications.show({
            title: "Sucesso",
            message: "Estoque ajustado com sucesso!",
            color: "green",
        });
        if (onSuccess) onSuccess();
      }
    } catch (error) {
       // Erros tratados pelo interceptor
    } finally {
      setLoading(false);
    }
  };

  const defaultValues: AdjustStockFormData = {
    adjustmentType: "InventoryAdjustmentEntry",
    quantity: 0,
    reason: "",
  };

  return (
    <Paper p="sm">
      <Title order={3} ta="center" mb="xl" c="brainstorm.6">
        Ajuste de Estoque
      </Title>

      <Paper withBorder p="md" mb="xl" radius="md">
        <Stack gap="xs">
          <Text size="sm" c="dimmed" fw={500}>Informações do Saldo</Text>
          <Text size="lg" fw={700} c="brainstorm.6">{productName}</Text>
          <Text size="sm" fw={500}>Almoxarifado: <Text span fw={700} c="brainstorm.6">{warehouseName}</Text></Text>
        </Stack>
      </Paper>

      <Form
        schema={adjustStockSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <AdjustStockFormFields currentQuantity={currentQuantity} />

            <Center mt="xl">
              <Button
                type="submit"
                fullWidth
                size="md"
                color="brainstorm.6"
                variant="light"
                loading={loading}
              >
                Confirmar Ajuste
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
