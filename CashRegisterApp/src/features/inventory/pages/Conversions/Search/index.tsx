import { Button, Grid } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { ActionConfirmContent } from "../../../../../components/Layout/ActionConfirmContent";
import {
  conversionSearchSchema,
  type ConversionSearchFormData,
} from "../../../schemas/conversionSearchSchema";
import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import { InventoryService } from "../../../api/inventoryService";
import type { IConversionResponse } from "../../../interfaces";
import { TextInput } from "../../../../../components/Form/TextInput";
import { useGenericModal } from "../../../../../hooks/useGenericModal";
import { UpdateConversionForm } from "../../../components/UpdateConversionForm";
import { CreateConversionForm } from "../../../components/CreateConversionForm";

export function ConversionSearch() {
  const initialFilters: ConversionSearchFormData = {
    searchTerm: "",
  };

  const modal = useGenericModal();

  const handleOpenCreateModal = () => {
    modal({
      title: "Cadastrar Nova Regra",
      Form: (props) => (
        <CreateConversionForm
          onSuccess={() => {
            props.onSuccess();
            handleSearch(initialFilters, pagedData.page, pagedData.pageSize);
          }}
        />
      ),
    });
  };

  const {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
    currentFilters,
    handleDeactivate,
  } = useSearch<IConversionResponse, ConversionSearchFormData>(
    InventoryService.searchConversions,
    initialFilters,
    {
      action: InventoryService.deactivateConversion,
      renderContent: (conversion) => {
        const from =
          `${conversion.fromUnitName || ""} (${conversion.fromUnitSymbol || ""})`.trim();
        const to =
          `${conversion.toUnitName || ""} (${conversion.toUnitSymbol || ""})`.trim();

        return (
          <ActionConfirmContent
            description="Esta regra de conversão será desativada e o sistema não a utilizará mais nos cálculos de movimentação de estoque."
            itemDetails={`Regra: 1 ${from} = ${conversion.multiplier} ${to}`}
            warningMessage={
              conversion.productName
                ? `Esta regra é específica para o produto: ${conversion.productName}.`
                : "Atenção: Esta é uma regra GERAL. Desativá-la pode impactar todos os produtos que utilizam estas unidades."
            }
          />
        );
      },
    },
  );

  const columns: ColumnConfig<IConversionResponse>[] = [
    {
      key: "fromUnitName",
      label: "Origem",
      render: (item) =>
        `${item.fromUnitName || ""} (${item.fromUnitSymbol || ""})`.trim(),
    },
    { key: "multiplier", label: "Multiplicador" },
    {
      key: "toUnitName",
      label: "Destino",
      render: (item) =>
        `${item.toUnitName || ""} (${item.toUnitSymbol || ""})`.trim(),
    },
    {
      key: "productName",
      label: "Produto",
      render: (item) => item.productName || "Geral",
    },
    {
      key: "isActive",
      label: "Status",
      render: (item) => (item.isActive ? "Ativo" : "Inativo"),
    },
  ];

  const handleEditTrigger = (id: string | number) => {
    modal({
      title: "Editar Regra de Conversão",
      Form: (props) => (
        <UpdateConversionForm
          conversionId={Number(id)}
          onSuccess={() => {
            props.onSuccess();
            handleSearch(initialFilters, pagedData.page, pagedData.pageSize);
          }}
        />
      ),
    });
  };

  return (
    <>
      <Grid>
        <Grid.Col span={12} ta="right">
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={handleOpenCreateModal}
            color="brainstorm.6"
            variant="light"
          >
            Nova Regra
          </Button>
        </Grid.Col>
        <Grid.Col>
          <SearchPageTemplate
            title="Consulta de Regras de Conversão"
            schema={conversionSearchSchema}
            defaultValues={initialFilters}
            currentFilters={currentFilters}
            columns={columns}
            pagedData={pagedData}
            loading={loading}
            onSearch={handleSearch}
            selectedId={selectedId}
            onRowSelect={(id) =>
              setSelectedId((prev) => (prev === id ? null : id))
            }
            onRowDoubleClick={handleEditTrigger}
            onDeactivate={handleDeactivate}
          >
            <Grid.Col span={12}>
              <TextInput
                name="searchTerm"
                label="Pesquisar"
                placeholder="Qualquer coisa"
                leftSection={<IconSearch size={18} stroke={1.5} />}
              />
            </Grid.Col>
          </SearchPageTemplate>
        </Grid.Col>
      </Grid>
    </>
  );
}
