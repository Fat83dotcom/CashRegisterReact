import {
  IconBox,
  IconCategory,
  IconBuildingWarehouse,
  IconRulerMeasure,
  IconTags,
  IconArrowsExchange,
  IconClipboardList,
  IconListDetails,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { ModuleDashboardTemplate } from "../../../components/Layout/ModuleDashboardTemplate";

export function InventoryHome() {
  const stats = [
    {
      subtitle: "Operação",
      title: "Saldos",
      icon: IconListDetails,
      link: "/inventory/balances",
      color: "indigo",
    },
    {
      subtitle: "Operação",
      title: "Movimentações",
      icon: IconClipboardList,
      link: "/inventory/stock",
      color: "pink",
    },
    {
      subtitle: "Cadastro",
      title: "Produtos",
      icon: IconBox,
      link: "/inventory/products",
      color: "blue",
    },
    {
      subtitle: "Cadastro",
      title: "Almoxarifados",
      icon: IconBuildingWarehouse,
      link: "/inventory/warehouses",
      color: "cyan",
    },
    {
      subtitle: "Cadastro",
      title: "Categorias",
      icon: IconCategory,
      link: "/inventory/categories",
      color: "grape",
    },
    { subtitle: "Cadastro", title: "Tags", icon: IconTags, link: "/inventory/tags", color: "orange" },
    {
      subtitle: "Cadastro",
      title: "Unidades",
      icon: IconRulerMeasure,
      link: "/inventory/units",
      color: "teal",
    },
    {
      subtitle: "Cadastro",
      title: "Conversões",
      icon: IconArrowsExchange,
      link: "/inventory/conversions",
      color: "yellow",
    },
    {
      subtitle: "Cadastro",
      title: "Fornecedores",
      icon: IconTruckDelivery,
      link: "/inventory/suppliers",
      color: "red",
    },
  ];

  return (
    <ModuleDashboardTemplate
      title="Painel de Estoque"
      description="O módulo de estoque permite o controle completo de produtos, almoxarifados e movimentações. Utilize o menu lateral para acessar as funcionalidades detalhadas."
      cards={stats}
    />
  );
}
