import { IconShoppingCart, IconHistory } from "@tabler/icons-react";
import { ModuleDashboardTemplate } from "../../../components/Layout/ModuleDashboardTemplate";

export function SalesHome() {
  const cards = [
    { subtitle: "Operação", title: "Nova Venda", icon: IconShoppingCart, link: "/sales/new", color: "teal" },
    { subtitle: "Consulta", title: "Histórico", icon: IconHistory, link: "/sales/history", color: "gray" },
  ];

  return (
    <ModuleDashboardTemplate
      title="Painel de Vendas"
      description="Bem-vindo ao módulo de vendas. Utilize o painel para realizar novas vendas via PDV ou consultar o histórico de transações."
      cards={cards}
    />
  );
}
