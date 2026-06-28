import {
  DatePickerInput as MantineDatePickerInput,
  type DatePickerInputProps as MantineDatePickerInputProps,
} from "@mantine/dates";
import { useFormContext, Controller } from "react-hook-form";

export interface DateRangeInputProps extends Omit<MantineDatePickerInputProps<"range">, "name" | "type"> {
  name: string;
}

export function DateRangeInput({ name, ...props }: DateRangeInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const getErrorMsg = (errs: any, path: string) => {
    const err = path.split(".").reduce((acc, part) => acc && acc[part], errs);
    return err?.message?.toString();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // O Mantine já retorna e espera um array [Date | null, Date | null].
        // Repassar diretamente evita recriar a referência do array e causar loops de renderização no componente.
        const value: [Date | null, Date | null] = Array.isArray(field.value) && field.value.length >= 2 
          ? [field.value[0], field.value[1]] 
          : [null, null];

        return (
          <MantineDatePickerInput
            {...field}
            type="range"
            value={value}
            onChange={(val) => field.onChange(val)}
            valueFormat="DD/MM/YYYY"
            locale="pt-br"
            clearable
            error={getErrorMsg(errors, name)}
            {...props}
          />
        );
      }}
    />
  );
}
