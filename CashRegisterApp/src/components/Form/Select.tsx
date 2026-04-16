import { Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core';
import { useFormContext, Controller } from 'react-hook-form';

export interface SelectProps extends Omit<MantineSelectProps, 'name'> {
  name: string;
}

export function Select({ name, ...props }: SelectProps) {
  const { control, formState: { errors } } = useFormContext();

  const getErrorMsg = (errs: any, path: string) => {
    const err = path.split('.').reduce((acc, part) => acc && acc[part], errs);
    return err?.message?.toString();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MantineSelect
          {...field}
          value={field.value?.toString() || null}
          onChange={(val) => field.onChange(val)}
          error={getErrorMsg(errors, name)}
          {...props}
        />
      )}
    />
  );
}
