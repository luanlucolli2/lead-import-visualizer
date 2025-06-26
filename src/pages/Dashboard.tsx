import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { LeadsTable } from "@/components/LeadsTable";
import { ImportModal } from "@/components/ImportModal";
import { ExportModal } from "@/components/ExportModal";
import { useToast } from "@/hooks/use-toast";

// Mock data com novos campos
const mockLeads = [
  { 
    id: "1", 
    cpf: "123.456.789-01", 
    nome: "Ana Silva Santos", 
    telefone: "(11) 99999-1234", 
    classe: "Quente" as const, 
    status: "Elegível" as const, 
    contratos: 3,
    saldo: 25000.50,
    libera: 18000.30,
    dataAtualizacao: "15/12/2024",
    motivo: "Documentação completa"
  },
  { 
    id: "2", 
    cpf: "987.654.321-02", 
    nome: "Carlos Eduardo Lima", 
    telefone: "(21) 98888-5678", 
    classe: "Frio" as const, 
    status: "Inelegível" as const, 
    contratos: 1,
    saldo: 8500.00,
    libera: 0.00,
    dataAtualizacao: "14/12/2024",
    motivo: "Pendência documental"
  },
  { 
    id: "3", 
    cpf: "456.789.123-03", 
    nome: "Maria Fernanda Costa", 
    telefone: "(11) 97777-9012", 
    classe: "Quente" as const, 
    status: "Elegível" as const, 
    contratos: 5,
    saldo: 42000.75,
    libera: 35000.00,
    dataAtualizacao: "16/12/2024",
    motivo: "Aprovado sistema"
  },
  { 
    id: "4", 
    cpf: "789.123.456-04", 
    nome: "João Pedro Oliveira", 
    telefone: "(85) 96666-3456", 
    classe: "Frio" as const, 
    status: "Elegível" as const, 
    contratos: 2,
    saldo: 15200.80,
    libera: 12000.00,
    dataAtualizacao: "13/12/2024",
    motivo: "Análise aprovada"
  },
  { 
    id: "5", 
    cpf: "321.654.987-05", 
    nome: "Isabela Rodrigues", 
    telefone: "(11) 95555-7890", 
    classe: "Quente" as const, 
    status: "Inelegível" as const, 
    contratos: 1,
    saldo: 5000.00,
    libera: 0.00,
    dataAtualizacao: "12/12/2024",
    motivo: "Restrição CPF"
  },
  { 
    id: "6", 
    cpf: "654.321.987-06", 
    nome: "Rafael Mendes Silva", 
    telefone: "(21) 94444-2345", 
    classe: "Frio" as const, 
    status: "Elegível" as const, 
    contratos: 4,
    saldo: 31500.25,
    libera: 28000.50,
    dataAtualizacao: "16/12/2024",
    motivo: "Processamento ok"
  },
  { 
    id: "7", 
    cpf: "147.258.369-07", 
    nome: "Camila Santos Pereira", 
    telefone: "(11) 93333-6789", 
    classe: "Quente" as const, 
    status: "Elegível" as const, 
    contratos: 3,
    saldo: 22000.40,
    libera: 19500.00,
    dataAtualizacao: "15/12/2024",
    motivo: "Validação concluída"
  },
  { 
    id: "8", 
    cpf: "258.369.147-08", 
    nome: "Gustavo Ferreira", 
    telefone: "(85) 92222-0123", 
    classe: "Frio" as const, 
    status: "Inelegível" as const, 
    contratos: 1,
    saldo: 3200.00,
    libera: 0.00,
    dataAtualizacao: "11/12/2024",
    motivo: "Score baixo"
  },
  { 
    id: "9", 
    cpf: "369.147.258-09", 
    nome: "Larissa Almeida", 
    telefone: "(21) 91111-4567", 
    classe: "Quente" as const, 
    status: "Elegível" as const, 
    contratos: 6,
    saldo: 58000.90,
    libera: 52000.00,
    dataAtualizacao: "17/12/2024",
    motivo: "Alto potencial"
  },
  { 
    id: "10", 
    cpf: "159.753.486-10", 
    nome: "Bruno Costa Lima", 
    telefone: "(11) 90000-8901", 
    classe: "Frio" as const, 
    status: "Elegível" as const, 
    contratos: 2,
    saldo: 13800.60,
    libera: 11000.20,
    dataAtualizacao: "14/12/2024",
    motivo: "Dados conferidos"
  },
];

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [eligibleFilter, setEligibleFilter] = useState<"todos" | "elegiveis" | "nao-elegiveis">("todos");
  const [contractsFilter, setContractsFilter] = useState<"todos" | "mais" | "menos">("todos");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const leadsPerPage = 8;

  // Filter leads based on search and filters
  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.nome.toLowerCase().includes(searchValue.toLowerCase()) ||
                         lead.cpf.includes(searchValue) ||
                         lead.telefone.includes(searchValue);
    
    let matchesEligible = true;
    if (eligibleFilter === "elegiveis") {
      matchesEligible = lead.status === "Elegível";
    } else if (eligibleFilter === "nao-elegiveis") {
      matchesEligible = lead.status === "Inelegível";
    }

    let matchesContracts = true;
    if (contractsFilter === "mais") {
      matchesContracts = lead.contratos >= 3;
    } else if (contractsFilter === "menos") {
      matchesContracts = lead.contratos < 3;
    }

    return matchesSearch && matchesEligible && matchesContracts;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  const handleImport = (type: string, file: File) => {
    console.log(`Importing ${type} from file:`, file.name);
    toast({
      title: "Importação iniciada",
      description: `Processando arquivo ${file.name} para ${type === 'cadastrais' ? 'Dados Cadastrais' : 'Dados de Higienização'}`,
    });
  };

  const handleExport = (columns: string[]) => {
    console.log("Exporting columns:", columns);
    toast({
      title: "Exportação iniciada",
      description: `Gerando arquivo Excel com ${columns.length} colunas selecionadas`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-60">
        <Header
          onImportClick={() => setIsImportModalOpen(true)}
          onExportClick={() => setIsExportModalOpen(true)}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          eligibleFilter={eligibleFilter}
          onEligibleFilterChange={setEligibleFilter}
          contractsFilter={contractsFilter}
          onContractsFilterChange={setContractsFilter}
        />
        
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Gerencie e visualize seus leads importados
            </p>
          </div>

          <LeadsTable
            leads={paginatedLeads}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default Dashboard;
