import { useState, useEffect } from "react";
import {
  Button,
  Center,
  Paper,
  Stack,
  Text,
  Select,
  NumberInput,
  TextInput,
  Title,
} from "@mantine/core";
import { Form } from "../../../components/Form";
import {
  adjustStockSchema,
  type AdjustStockFormData,
} from "../schemas/adjustStockSchema";
import { InventoryService } from "../api/inventoryService";
import type {
  ICreateInventoryTransactionRequest,
  IProductConversionItemResponse,
} from "../interfaces";
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

function AdjustStockFormFields({
  currentQuantity,
  productId,
}: {
  currentQuantity: number;
  productId: number;
}) {
  const {
    formState: { errors },
    watch,
    setValue,
    register,
  } = useFormContext<AdjustStockFormData>();
  const adjustmentType = watch("adjustmentType");
  const quantity = watch("quantity") || 0;
  const uomId = watch("uomId");
  const baseQuantity = watch("baseQuantity") || 0;

  const [conversions, setConversions] = useState<
    IProductConversionItemResponse[]
  >([]);

  useEffect(() => {
    InventoryService.getProductConversions(productId).then((res) => {
      setConversions(res);
      const baseRule = res.find((c) => c.ruleType === "Base");
      if (baseRule && !uomId) {
        setValue("uomId", baseRule.uomId.toString());
      }
    });
  }, [productId, uomId, setValue]);

  useEffect(() => {
    if (!uomId || !quantity || conversions.length === 0) {
      setValue("baseQuantity", 0);
      return;
    }
    const selectedConversion = conversions.find((c) => {
      const key =
        c.ruleType === "Base" ? c.uomId.toString() : `${c.uomId}_${c.ruleType}`;
      return key === uomId;
    });
    if (selectedConversion) {
      setValue("baseQuantity", quantity * selectedConversion.multiplier);
    }
  }, [quantity, uomId, conversions, setValue]);

  // Calculo apenas visual (utilizando a quantidade base convertida)
  const newBalance =
    adjustmentType === "InventoryAdjustmentEntry"
      ? currentQuantity + baseQuantity
      : currentQuantity - baseQuantity;

  return (
    <Stack gap="md">
      <Select
        label="Tipo de Ajuste"
        placeholder="Selecione o tipo"
        data={[
          { value: "InventoryAdjustmentEntry", label: "Entrada (+)" },
          { value: "InventoryAdjustmentExit", label: "Saída (-)" },
        ]}
        value={adjustmentType}
        onChange={(val) => setValue("adjustmentType", val as any)}
        error={errors.adjustmentType?.message}
        withAsterisk
      />

      <Select
        label="Conversão de Unidade"
        placeholder="Selecione a unidade"
        value={uomId || null}
        onChange={(val) => setValue("uomId", val || "")}
        error={errors.uomId?.message}
        data={conversions.map((c) => ({
          value:
            c.ruleType === "Base"
              ? c.uomId.toString()
              : `${c.uomId}_${c.ruleType}`,
          label: `[${c.ruleType === "ProductSpecific" ? "Produto" : c.ruleType}] ${c.uomSymbol} (Fator: ${c.multiplier})`,
        }))}
        withAsterisk
      />

      <NumberInput
        label="Quantidade a Ajustar (na Unidade Selecionada)"
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

      {baseQuantity > 0 && adjustmentType && (
        <Paper withBorder p="sm">
          <Text size="sm" c="dimmed">
            Saldo Atual: {currentQuantity} (Base)
          </Text>
          <Text size="sm" c="dimmed">
            Ajuste de: {baseQuantity} (Base)
          </Text>
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
  onSuccess,
}: AdjustStockFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: AdjustStockFormData) => {
    setLoading(true);

    try {
      const request: ICreateInventoryTransactionRequest = {
        transactionType: values.adjustmentType,
        referenceDocument: `AJUSTE: ${values.reason}`,
        items: [
          {
            productId: productId,
            uomId: Number(values.uomId.split("_")[0]), // Extrai o ID numérico da chave composta
            transactionQuantity: values.quantity,
            baseQuantity: values.baseQuantity,
            sourceWarehouseId:
              values.adjustmentType === "InventoryAdjustmentExit"
                ? warehouseId
                : undefined,
            destinationWarehouseId:
              values.adjustmentType === "InventoryAdjustmentEntry"
                ? warehouseId
                : undefined,
          },
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
    baseQuantity: 0,
    uomId: "",
    reason: "",
  };

  return (
    <Paper p="sm">
      <Title order={3} ta="center" mb="xl" c="brainstorm.6">
        Ajuste de Estoque
      </Title>

      <Paper withBorder p="md" mb="xl" radius="md">
        <Stack gap="xs">
          <Text size="sm" c="dimmed" fw={500}>
            Informações do Saldo
          </Text>
          <Text size="lg" fw={700} c="brainstorm.6">
            {productName}
          </Text>
          <Text size="sm" fw={500}>
            Almoxarifado:{" "}
            <Text span fw={700} c="brainstorm.6">
              {warehouseName}
            </Text>
          </Text>
        </Stack>
      </Paper>

      <Form
        schema={adjustStockSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <AdjustStockFormFields
              currentQuantity={currentQuantity}
              productId={productId}
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
                Confirmar Ajuste
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
