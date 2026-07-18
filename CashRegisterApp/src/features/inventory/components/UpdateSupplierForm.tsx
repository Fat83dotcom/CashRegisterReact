import { useState, useEffect } from "react";
import { Button, Center, Paper, Title, Stack, LoadingOverlay, Grid } from "@mantine/core";
import { Form, Select } from "../../../components/Form";
import {
  supplierSchema,
  type SupplierFormData,
} from "../schemas/supplierSchema";
import { InventoryService } from "../api/inventoryService";
import type { IUpdateSupplierRequest } from "../interfaces";
import { SupplierFormFields } from "./SupplierFormFields";

export interface UpdateSupplierFormProps {
  id: number;
  onSuccess: () => void;
}

export function UpdateSupplierForm({ id, onSuccess }: UpdateSupplierFormProps) {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<any | null>(null);

  useEffect(() => {
    InventoryService.getSupplierById(id)
      .then((data) => {
        setInitialData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (values: SupplierFormData) => {
    setLoading(true);
    const request: IUpdateSupplierRequest = {
      isActive: values.isActive === "true",
      person: {
        personType: values.person?.personType,
        firstName: values.person?.firstName ?? "",
        lastName: values.person?.lastName ?? "",
        taxId: values.person?.taxId,
        birthdate: values.person?.birthdate ? values.person.birthdate.toISOString() : undefined,
        email: values.person?.email,
        tradeName: values.person?.tradeName,
        stateRegistration: values.person?.stateRegistration,
        municipalRegistration: values.person?.municipalRegistration,
        cellPhone: values.person?.cellPhone,
        phone: values.person?.phone,
        gender: values.person?.gender,
      }
    };

    try {
      await InventoryService.updateSupplier(id, request).then((response) => {
        if (response && response.id > 0) onSuccess();
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) {
    return (
      <Paper p="xl" pos="relative" h={300}>
        <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
      </Paper>
    );
  }

  const defaultValues: SupplierFormData = {
    personId: initialData?.personId,
    person: {
      personType: initialData?.person?.personType ?? "Legal",
      firstName: initialData?.name?.firstName ?? "",
      lastName: initialData?.name?.lastName ?? "",
      taxId: initialData?.taxId ?? "",
      birthdate: initialData?.person?.birthdate ? new Date(initialData.person.birthdate) : new Date(),
      email: initialData?.person?.email ?? "",
      tradeName: initialData?.person?.tradeName ?? "",
      stateRegistration: initialData?.person?.stateRegistration ?? "",
      municipalRegistration: initialData?.person?.municipalRegistration ?? "",
      cellPhone: initialData?.person?.cellPhone ?? "",
      phone: initialData?.person?.phone ?? "",
      gender: initialData?.person?.gender ?? "Other",
    },
    isActive: String(initialData?.isActive ?? true),
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl" pos="relative">
      <LoadingOverlay visible={loading} />
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Editar Fornecedor
      </Title>

      <Form
        schema={supplierSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <SupplierFormFields isUpdate={true} />
            
            <Grid gutter="md">
              <Grid.Col span={12}>
                <Select
                  name="isActive"
                  label="Status"
                  placeholder="Selecione o status"
                  data={[
                    { value: "true", label: "Ativo" },
                    { value: "false", label: "Inativo" },
                  ]}
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
                Atualizar Fornecedor
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
