import { Textarea as MantineTextarea, type TextareaProps as MantineTextareaProps } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

export interface TextareaProps extends Omit<MantineTextareaProps, 'name'> {
  name: string;
}

export function Textarea({ name, ...props }: TextareaProps) {
  const { register, formState: { errors } } = useFormContext();

  const getErrorMsg = (errs: any, path: string) => {
    const err = path.split('.').reduce((acc, part) => acc && acc[part], errs);
    return err?.message?.toString();
  };

  return (
    <MantineTextarea
      {...register(name)}
      error={getErrorMsg(errors, name)}
      {...props}
    />
  );
}
