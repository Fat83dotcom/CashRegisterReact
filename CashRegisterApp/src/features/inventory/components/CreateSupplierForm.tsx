import { useState } from "react";
import { Button, Center, Paper, Stack, Title } from "@mantine/core";
import { Form } from "../../../components/Form";
import {
  supplierSchema,
  type SupplierFormData,
} from "../schemas/supplierSchema";
import { InventoryService } from "../api/inventoryService";
import type { ICreateSupplierRequest } from "../interfaces";
import { SupplierFormFields } from "./SupplierFormFields";

export interface CreateSupplierFormProps {
  onSuccess?: () => void;
}

export function CreateSupplierForm({ onSuccess }: CreateSupplierFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SupplierFormData) => {
    setLoading(true);
    const request: ICreateSupplierRequest = {
      personId: values.personId,
      person: values.personId ? undefined : {
        personType: values.person?.personType,
        firstName: values.person?.firstName ?? "",
        lastName: values.person?.lastName ?? "",
        taxId: values.person?.taxId,
        birthdate: values.person?.birthdate ? values.person.birthdate.toISOString() : undefined,
        email: values.person?.email,
      },
    };

    try {
      await InventoryService.createSupplier(request);
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  const defaultValues: SupplierFormData = {
    person: {
      personType: 1,
      firstName: "",
      lastName: "",
      taxId: "",
      birthdate: new Date(),
      email: "",
    },
    isActive: "true",
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Novo Fornecedor
      </Title>

      <Form
        schema={supplierSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <SupplierFormFields />

            <Center mt="xl">
              <Button
                type="submit"
                fullWidth
                size="md"
                color="brainstorm.6"
                variant="light"
                loading={loading}
              >
                Salvar Fornecedor
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
