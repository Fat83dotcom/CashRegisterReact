import { Select, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { apiClient } from "../../api/api";

interface PersonSelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
  error?: string | React.ReactNode;
}

interface PersonListItem {
  id: number;
  name: { firstName: string; lastName: string };
  document: string;
}

export function PersonSelect({ value, onChange, error }: PersonSelectProps) {
  const [people, setPeople] = useState<PersonListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Assumindo um endpoint que lista pessoas. Se não existir, precisaremos criar.
    apiClient.get<PersonListItem[]>("/person")
      .then(data => setPeople(data))
      .catch(() => setPeople([]))
      .finally(() => setLoading(false));
  }, []);

  const data = people.map(p => ({
    value: p.id.ToString(),
    label: `${p.name.firstName} ${p.name.lastName} (${p.document})`
  }));

  return (
    <Select
      label="Vincular Pessoa Existente"
      placeholder={loading ? "Carregando..." : "Selecione uma pessoa (opcional)"}
      data={data}
      value={value}
      onChange={onChange}
      error={error}
      searchable
      clearable
      nothingFoundMessage="Nenhuma pessoa encontrada"
      rightSection={loading ? <Loader size="xs" /> : null}
      size="md"
    />
  );
}

// Extensão rápida para consertar o ToString se necessário no JS
declare global {
    interface Number {
        ToString(): string;
    }
}
Number.prototype.ToString = function() { return this.toString(); };
