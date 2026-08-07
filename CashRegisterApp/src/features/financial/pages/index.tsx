import { IconReportMoney, IconFileReport, IconClipboardList } from "@tabler/icons-react";
import { ModuleDashboardTemplate } from "../../../components/Layout/ModuleDashboardTemplate";

export function FinancialHome() {
  const cards = [
    { subtitle: "Visão", title: "Fluxo de Caixa", icon: IconReportMoney, link: "/financial/cashFlow", color: "green" },
    { subtitle: "Operação", title: "Requisições", icon: IconClipboardList, link: "/financial/operations/requisitions", color: "blue" },
    { subtitle: "Gestão", title: "Relatórios", icon: IconFileReport, link: "/financial/reports", color: "violet" },
  ];

  return (
    <ModuleDashboardTemplate
      title="Painel Financeiro"
      description="Bem-vindo ao módulo financeiro. Aqui você poderá acompanhar o fluxo de caixa, as requisições de compra e os relatórios financeiros do sistema."
      cards={cards}
    />
  );
}
