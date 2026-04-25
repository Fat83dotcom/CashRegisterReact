import { useForm, FormProvider, type UseFormReturn, type SubmitHandler, type DefaultValues, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';
import type { ReactNode } from 'react';

export interface FormProps<T extends FieldValues> {
  schema: ZodType<any, any, any>;
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  children: (methods: UseFormReturn<T>) => ReactNode;
}

export function Form<T extends FieldValues>({ schema, onSubmit, defaultValues, children }: FormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema) as any,
    defaultValues,
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: '100%' }}>
        {children(methods)}
      </form>
    </FormProvider>
  );
}
