import { Switch as MantineSwitch } from "@mantine/core";
import type { SwitchProps as MantineSwitchProps } from "@mantine/core";
import { useFormContext, Controller } from "react-hook-form";

type SwitchProps = MantineSwitchProps & {
  name: string;
};

export function Switch({ name, ...props }: SwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MantineSwitch
          {...field}
          {...props}
          checked={field.value}
          error={error?.message}
        />
      )}
    />
  );
}
