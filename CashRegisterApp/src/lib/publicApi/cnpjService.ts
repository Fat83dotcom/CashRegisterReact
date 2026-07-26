export interface CnpjResponse {
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  situacaoCadastral: string;
  telefone: string;
  inscricaoEstadual: string;
  dataAbertura: string;
}

export const CnpjService = {
  consultar: async (cnpj: string): Promise<CnpjResponse> => {
    // Alfanumérico permitindo letras e números, removendo máscaras
    const cleanCnpj = cnpj.replace(/[^A-Z0-9]/gi, "");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos para tentar ambas as APIs

    try {
      // Usando a API publica.cnpj.ws como primária pois ela retorna Inscrição Estadual
      const response = await fetch(`https://publica.cnpj.ws/cnpj/${cleanCnpj}`, { signal: controller.signal });
      if (!response.ok) throw new Error("API primária falhou");
      
      const data = await response.json();
      const ie = data.estabelecimento?.inscricoes_estaduais?.[0]?.inscricao_estadual ?? "";
      const ddd = data.estabelecimento?.ddd1 ?? "";
      const tel = data.estabelecimento?.telefone1 ?? "";
      const telefoneCompleto = ddd && tel ? `${ddd}${tel}` : "";

      return {
        razaoSocial: data.razao_social ?? "",
        nomeFantasia: data.estabelecimento?.nome_fantasia || data.razao_social || "",
        email: data.estabelecimento?.email ?? "",
        situacaoCadastral: data.estabelecimento?.situacao_cadastral ?? "",
        telefone: telefoneCompleto,
        inscricaoEstadual: ie,
        dataAbertura: data.estabelecimento?.data_inicio_atividade ?? "",
      };
    } catch (error) {
      return await CnpjService.consultarFallback(cleanCnpj, controller.signal);
    } finally {
      clearTimeout(timeoutId);
    }
  },

  consultarFallback: async (cleanCnpj: string, signal: AbortSignal): Promise<CnpjResponse> => {
    // Fallback para a Brasil API (que tem menos rate limits, mas não retorna IE)
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`, { signal });
    if (!response.ok) throw new Error("Todas as APIs de consulta falharam ou CNPJ não encontrado.");

    const data = await response.json();
    return {
      razaoSocial: data.razao_social ?? "",
      nomeFantasia: data.nome_fantasia || data.razao_social || "",
      email: data.email ?? "",
      situacaoCadastral: data.descricao_situacao_cadastral ?? "",
      telefone: data.ddd_telefone_1 ?? "",
      inscricaoEstadual: "", // Brasil API não retorna IE publicamente
      dataAbertura: data.data_inicio_atividade ?? "",
    };
  }
};
