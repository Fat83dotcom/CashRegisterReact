import { useState } from "react";
import { Button, Center, Paper, Stack, Title, ActionIcon, Table, Group, Text } from "@mantine/core";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import { Form, TextInput, Textarea } from "../../../components/Form";
import { AsyncSelect } from "../../../components/Form/AsyncSelect";
import { requisitionSchema, type RequisitionFormData } from "../schemas/requisitionSchema";
import { InventoryService } from "../../inventory/api/inventoryService";
import { showNotification } from "@mantine/notifications";
import { useFormContext, useFieldArray } from "react-hook-form";

export interface CreateRequisitionFormProps {
  onSuccess?: () => void;
}

function RequisitionFormFields() {
  const { control } = useFormContext<RequisitionFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const loadProducts = async (search: string) => {
    const response = await InventoryService.searchProducts({
      page: 1,
      pageSize: 20,
      searchTerm: search
    });
    return response.items;
  };

  return (
    <Stack gap="md">
      <Textarea
        name="notes"
        label="Observações"
        placeholder="Motivo ou detalhes da requisição"
        minRows={2}
      />
      
      <Title order={5} mt="sm">Produtos da Requisição</Title>
      
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Produto</Table.Th>
            <Table.Th w={150}>Quantidade</Table.Th>
            <Table.Th w={50}></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {fields.map((field, index) => (
            <Table.Tr key={field.id}>
              <Table.Td>
                <AsyncSelect
                  name={`items.${index}.productId`}
                  placeholder="Buscar produto..."
                  fetcher={loadProducts}
                  getLabel={(item: any) => item.name}
                  getValue={(item: any) => item.id.toString()}
                  searchable
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  name={`items.${index}.quantity`}
                  type="number"
                  placeholder="Qtd"
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    return isNaN(val) ? 0 : val;
                  }}
                />
              </Table.Td>
              <Table.Td>
                <ActionIcon color="red" variant="light" onClick={() => remove(index)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      
      {fields.length === 0 && (
        <Text c="dimmed" size="sm" ta="center">Nenhum produto adicionado.</Text>
      )}

      <Group justify="center" mt="sm">
        <Button 
          variant="outline" 
          size="xs" 
          leftSection={<IconPlus size={14} />}
          onClick={() => append({ productId: 0 as any, quantity: 1 })}
        >
          Adicionar Produto
        </Button>
      </Group>
    </Stack>
  );
}

export function CreateRequisitionForm({ onSuccess }: CreateRequisitionFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: RequisitionFormData) => {
    setLoading(true);
    
    // Parse quantity to number in case it's string from input
    const formattedItems = values.items.map(item => ({
      productId: Number(item.productId),
      quantity: Number(item.quantity)
    }));

    try {
      await InventoryService.createRequisition({
        originModule: "Financeiro",
        notes: values.notes,
        items: formattedItems
      });
      showNotification({
        title: "Sucesso",
        message: "Requisição criada com sucesso! Ela foi enviada para o Almoxarifado.",
        color: "green"
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      showNotification({
        title: "Erro",
        message: "Ocorreu um erro ao tentar criar a requisição.",
        color: "red"
      });
    } finally {
      setLoading(false);
    }
  };

  const defaultValues: RequisitionFormData = {
    notes: "",
    items: [{ productId: undefined as any, quantity: 1 }],
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={800} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Nova Requisição de Materiais
      </Title>

      <Form
        schema={requisitionSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <RequisitionFormFields />

            <Center mt="xl">
              <Button
                type="submit"
                fullWidth
                size="md"
                color="brainstorm.6"
                variant="light"
                loading={loading}
              >
                Enviar Requisição
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
