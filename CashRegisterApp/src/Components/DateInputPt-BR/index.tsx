import { DateInput, type DateValue } from "@mantine/dates";

export function DateInputBr(props: DateInputProps) {
  return (
    <DateInput
      size="xl"
      label={props.label}
      locale="pt-br"
      placeholder={props.placeholder}
      value={props.value}
      valueFormat="DD/MM/YYYY"
      {...props.getInputProps}
    />
  );
}

export interface DateInputProps {
  label: string;
  placeholder: string;
  value: DateValue | undefined;
  getInputProps: {};
}
