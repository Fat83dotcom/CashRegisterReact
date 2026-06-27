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
        const parseDate = (d: any) => {
          if (!d) return null;
          if (d instanceof Date) return d;
          // Se d chegou como string (ex: "2026-06-27T00:00:00.000Z"),
          // forçamos para ser meia-noite no fuso local adicionando o offset.
          const date = new Date(d);
          if (typeof d === "string" && d.includes("T00:00:00.000Z")) {
             date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
          }
          return date;
        };

        const value: [Date | null, Date | null] = Array.isArray(field.value)
          ? [parseDate(field.value[0]), parseDate(field.value[1])]
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
