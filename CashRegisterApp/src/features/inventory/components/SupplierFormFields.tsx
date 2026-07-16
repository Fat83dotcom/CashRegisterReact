import { Grid } from "@mantine/core";
import { PersonForm } from "../../person/components/PersonForm";

export function SupplierFormFields({ isUpdate = false }: { isUpdate?: boolean }) {
  return (
    <Grid grow gutter={{ base: 5, xs: "md", md: "xl" }}>
      <Grid.Col span={12}>
        <PersonForm />
      </Grid.Col>
    </Grid>
  );
}
