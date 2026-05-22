import {
  MultiSelect as MantineMultiSelect,
  Loader,
  ActionIcon,
  Group,
  Box,
} from "@mantine/core";
import type { MultiSelectProps as MantineMultiSelectProps } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useFormContext, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";

export interface MultiSelectAsyncProps<T> extends Omit<
  MantineMultiSelectProps,
  "name" | "data"
> {
  name: string;
  fetcher: (query: string) => Promise<T[]>;
  getLabel: (item: T) => string;
  getValue: (item: T) => string;
  debounceTime?: number;
  onAdd?: () => void;
}

export function MultiSelectAsync<T>({
  name,
  fetcher,
  getLabel,
  getValue,
  debounceTime = 500,
  onAdd,
  ...props
}: MultiSelectAsyncProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, debounceTime);

  const getErrorMsg = (errs: any, path: string) => {
    const err = path
      .split(".")
      .reduce((acc: any, part: string) => acc && acc[part], errs);
    return err?.message?.toString();
  };

  const handle = (active: boolean) => {
    setLoading(true);

    fetcher(debouncedSearch || "")
      .then((res) => {
        if (active) setData(res);
      })
      .catch((err) => {
        console.error("Error fetching data for MultiSelectAsync:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
  };

  useEffect(() => {
    let active = true;

    handle(active);

    return () => {
      active = false;
    };
  }, [debouncedSearch, fetcher]);

  const selectData = data.map((item) => ({
    value: getValue(item),
    label: getLabel(item),
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MantineMultiSelect
          {...field}
          data={selectData}
          searchable
          clearable
          onSearchChange={setSearchValue}
          searchValue={searchValue}
          rightSection={
            <Group
              gap={1}
              style={{
                pointerEvents: "auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
            >
              {loading ? <Loader size={16} /> : null}
              {onAdd && (
                <Box
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAdd();
                  }}
                >
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    style={{
                      pointerEvents: "auto",
                      zIndex: 10,
                      marginRight: 15,
                    }}
                  >
                    <IconPlus size={16} />
                  </ActionIcon>
                </Box>
              )}
            </Group>
          }
          error={getErrorMsg(errors, name)}
          filter={({ options }) => options}
          {...props}
        />
      )}
    />
  );
}
