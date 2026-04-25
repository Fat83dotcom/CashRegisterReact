import { TextInput as MantineTextInput, type TextInputProps as MantineTextInputProps } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

export interface TextInputProps extends Omit<MantineTextInputProps, 'name'> {
  name: string;
}

export function TextInput({ name, ...props }: TextInputProps) {
  const { register, formState: { errors } } = useFormContext();

  const getErrorMsg = (errs: any, path: string) => {
    const err = path.split('.').reduce((acc, part) => acc && acc[part], errs);
    return err?.message?.toString();
  };

  return (
    <MantineTextInput
      {...register(name)}
      error={getErrorMsg(errors, name)}
      {...props}
    />
  );
}
