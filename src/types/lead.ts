
export interface Lead {
  id: string;
  cpf: string;
  nome: string;
  telefone: string;
  classe: "Quente" | "Frio";
  status: "Elegível" | "Inelegível";
  contratos: Array<{
    dataContrato: string;
    vendedor: string;
  }>;
  saldo: number;
  libera: number;
  dataAtualizacao: string;
  motivo: string;
  origem: string;
  dataNascimento: string;
  telefones: Array<{
    numero: string;
    classe: "Quente" | "Frio";
  }>;
  tipoConsulta: string;
  historicoimports: Array<{
    tipo: string;
    origem: string;
    dataImportacao: string;
  }>;
}
