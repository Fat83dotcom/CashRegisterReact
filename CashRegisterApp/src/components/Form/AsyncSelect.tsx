import { Select as MantineSelect, Loader } from '@mantine/core';
import type { SelectProps as MantineSelectProps } from '@mantine/core';
import { useFormContext, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

export interface AsyncSelectProps<T> extends Omit<MantineSelectProps, 'name' | 'data'> {
  name: string;
  fetcher: (query: string) => Promise<T[]>;
  getLabel: (item: T) => string;
  getValue: (item: T) => string;
  onRecordSelect?: (record: T | null) => void;
  debounceTime?: number;
}

export function AsyncSelect<T>({
  name,
  fetcher,
  getLabel,
  getValue,
  onRecordSelect,
  debounceTime = 500,
  ...props
}: AsyncSelectProps<T>) {
  const { control, formState: { errors } } = useFormContext();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchValue, debounceTime);

  const getErrorMsg = (errs: any, path: string) => {
    const err = path.split('.').reduce((acc: any, part: string) => acc && acc[part], errs);
    return err?.message?.toString();
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    
    fetcher(debouncedSearch || '')
      .then((res) => {
        if (active) {
          setData(res);
        }
      })
      .catch((err) => {
        console.error('Error fetching data for AsyncSelect:', err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
      
    return () => {
      active = false;
    };
  }, [debouncedSearch, fetcher]);

  const selectData = data.map(item => ({
    value: getValue(item),
    label: getLabel(item),
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MantineSelect
          {...field}
          value={field.value?.toString() || null}
          onChange={(val) => {
            field.onChange(val);
            if (onRecordSelect) {
              const record = data.find(item => getValue(item) === val) || null;
              onRecordSelect(record);
            }
          }}
          onSearchChange={setSearchValue}
          searchValue={searchValue}
          data={selectData}
          searchable
          clearable
          rightSection={loading ? <Loader size={16} /> : props.rightSection}
          error={getErrorMsg(errors, name)}
          filter={({ options }) => options} // Filtro é feito do lado da API
          {...props}
        />
      )}
    />
  );
}
