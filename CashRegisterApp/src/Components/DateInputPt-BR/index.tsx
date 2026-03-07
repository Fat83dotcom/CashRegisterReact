import { DateInput, type DateValue } from "@mantine/dates";

export function DateInputBr(props: DateInputProps) {
  return (
    <DateInput
      label={props.label}
      locale="pt-br"
      value={props.value}
      valueFormat="DD/MM/YYYY"
      {...props.getInputProps}
    />
  );
}

export interface DateInputProps {
  label: string;
  value: DateValue | undefined;
  getInputProps: {};
}
