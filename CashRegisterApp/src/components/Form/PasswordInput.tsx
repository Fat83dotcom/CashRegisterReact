import { PasswordInput as MantinePasswordInput, PasswordInputProps as MantinePasswordInputProps } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

export interface PasswordInputProps extends Omit<MantinePasswordInputProps, 'name'> {
  name: string;
}

export function PasswordInput({ name, ...props }: PasswordInputProps) {
  const { register, formState: { errors } } = useFormContext();

  const getErrorMsg = (errs: any, path: string) => {
    const err = path.split('.').reduce((acc, part) => acc && acc[part], errs);
    return err?.message?.toString();
  };

  return (
    <MantinePasswordInput
      {...register(name)}
      error={getErrorMsg(errors, name)}
      {...props}
    />
  );
}
