import {
  DateInput as MantineDateInput,
  type DateInputProps as MantineDateInputProps,
} from "@mantine/dates";
import { useFormContext, Controller } from "react-hook-form";

export interface DateInputProps extends Omit<MantineDateInputProps, "name"> {
  name: string;
}

export function DateInput({ name, ...props }: DateInputProps) {
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
      render={({ field }) => (
        <MantineDateInput
          {...field}
          value={field.value ? new Date(field.value) : null}
          onChange={(val) => field.onChange(val)}
          valueFormat="DD/MM/YYYY"
          locale="pt-br"
          clearable
          error={getErrorMsg(errors, name)}
          {...props}
        />
      )}
    />
  );
}
