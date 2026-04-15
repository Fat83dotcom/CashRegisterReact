import { TextInput as MantineTextInput, TextInputProps as MantineTextInputProps } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

export interface TextInputProps extends Omit<MantineTextInputProps, 'name'> {
  name: string;
}

export function TextInput({ name, ...props }: TextInputProps) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <MantineTextInput
      {...register(name)}
      error={errors[name]?.message?.toString()}
      {...props}
    />
  );
}
