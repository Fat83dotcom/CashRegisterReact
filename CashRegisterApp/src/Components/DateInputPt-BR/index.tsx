import { DateInput } from "@mantine/dates";

export function DateInputBr({ props, getInputProps }: MyDateInputProps) {
  return (
    <DateInput
      valueFormat="DD/MM/YYYY"
      locale="pt-br"
      clearable
      {...props}
      {...getInputProps}
    />
  );
}

export interface MyDateInputProps {
  props?: Record<string, any>;
  getInputProps: Record<string, any>;
}
