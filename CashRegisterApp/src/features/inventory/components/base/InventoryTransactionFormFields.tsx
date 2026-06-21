import { useFormContext } from "react-hook-form";
import { Select, TextInput, NumberInput, Button, Group, ActionIcon, Stack, Text, Divider, Box } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { CreateInventoryTransactionFormData } from "../../schemas/inventoryTransactionSchema";

export function InventoryTransactionFormFields() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<CreateInventoryTransactionFormData>();

  const transactionType = watch("transactionType");
  const items = watch("items") || [];

  const handleAddItem = () => {
    setValue("items", [
      ...items,
      {
        productId: 0,
        uomId: 0,
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
      <Select
        label="Tipo de Movimentação"
        placeholder="Selecione o tipo"
        data={[
          { value: "PurchaseEntry", label: "Entrada (Compra)" },
          { value: "RequisitionExit", label: "Saída (Requisição)" },
          { value: "Transfer", label: "Transferência" },
        ]}
        value={transactionType}
        onChange={(val) => setValue("transactionType", val as any)}
        error={errors.transactionType?.message}
        withAsterisk
      />

      <TextInput
        label="Documento de Referência"
        placeholder="Ex: NF-12345"
        {...register("referenceDocument")}
        error={errors.referenceDocument?.message}
      />

      <Divider my="sm" label="Itens da Movimentação" labelPosition="center" />

      {items.map((item, index) => (
        <Box key={index} p="sm" style={{ border: '1px solid #eee', borderRadius: 8 }}>
          <Group align="flex-end" mb="sm">
            <NumberInput
              label="ID Produto (Temporário)"
              value={item.productId || ""}
              onChange={(val) => setValue(`items.${index}.productId`, Number(val))}
              error={errors.items?.[index]?.productId?.message}
            />
            
            <NumberInput
              label="Qtd."
              value={item.transactionQuantity}
              onChange={(val) => {
                setValue(`items.${index}.transactionQuantity`, Number(val));
                setValue(`items.${index}.baseQuantity`, Number(val)); // simplificação provisória
              }}
              error={errors.items?.[index]?.transactionQuantity?.message}
            />

            {(transactionType === "RequisitionExit" || transactionType === "Transfer") && (
               <NumberInput
                label="Almoxarifado Origem ID"
                value={item.sourceWarehouseId || ""}
                onChange={(val) => setValue(`items.${index}.sourceWarehouseId`, Number(val))}
                error={errors.items?.[index]?.sourceWarehouseId?.message}
               />
            )}

            {(transactionType === "PurchaseEntry" || transactionType === "Transfer") && (
               <NumberInput
                label="Almoxarifado Destino ID"
                value={item.destinationWarehouseId || ""}
                onChange={(val) => setValue(`items.${index}.destinationWarehouseId`, Number(val))}
                error={errors.items?.[index]?.destinationWarehouseId?.message}
               />
            )}

            <ActionIcon color="red" onClick={() => handleRemoveItem(index)} variant="light" size="lg">
              <IconTrash size={20} />
            </ActionIcon>
          </Group>
        </Box>
      ))}

      {errors.items?.root?.message && (
        <Text c="red" size="sm">{errors.items.root.message}</Text>
      )}

      <Button variant="outline" onClick={handleAddItem}>
        + Adicionar Produto
      </Button>
    </Stack>
  );
}
