import { Grid } from "@mantine/core";
import { PersonFormFields } from "../../person/components/PersonFormFields";

export function SupplierFormFields({}: { isUpdate?: boolean }) {
  return (
    <Grid grow gutter={{ base: 5, xs: "md", md: "xl" }}>
      <Grid.Col span={12}>
        <PersonFormFields />
      </Grid.Col>
    </Grid>
  );
}
