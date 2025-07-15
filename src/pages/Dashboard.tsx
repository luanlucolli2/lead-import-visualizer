import { useState } from "react";
import { LeadsTable } from "@/components/LeadsTable";
import { LeadsControls } from "@/components/LeadsControls";
import { ImportModal } from "@/components/ImportModal";
import { ExportModal } from "@/components/ExportModal";
import { useToast } from "@/hooks/use-toast";
import { Lead } from "@/types/lead";

// Mock data com origem e motivos padronizados
const mockLeads: Lead[] = [
  { 
    id: "1", 
    cpf: "123.456.789-01", 
    nome: "Ana Silva Santos", 
    telefone: "(11) 99999-1234", 
    classe: "Quente" as const, 
    status: "Elegível" as const, 
    contratos: [
      { dataContrato: "15/10/2024", vendedor: "João Silva" },
      { dataContrato: "20/11/2024", vendedor: "Maria Costa" },
      { dataContrato: "05/12/2024", vendedor: "Pedro Oliveira" }
    ],
    saldo: 25000.50,
    libera: 18000.30,
    dataAtualizacao: "15/12/2024",
    motivo: "Aprovado",
    origem: "Sistema Interno",
    dataNascimento: "15/03/1985",
    telefones: [
      { numero: "(11) 99999-1234", classe: "Quente" },
      { numero: "(11) 98888-5678", classe: "Frio" }
    ],
    tipoConsulta: "FGTS",
    historicoimports: [
      { tipo: "Cadastrais", origem: "Sistema Interno", dataImportacao: "10/12/2024" },
      { tipo: "Higienização", origem: "API Externa", dataImportacao: "12/12/2024" }
    ]
  },
  { 
    id: "2", 
    cpf: "987.654.321-02", 
    nome: "Carlos Eduardo Lima", 
    telefone: "(21) 98888-5678", 
    classe: "Frio" as const, 
    status: "Inelegível" as const, 
    contratos: [
      { dataContrato: "20/11/2024", vendedor: "Ana Santos" }
    ],
    saldo: 8500.00,
    libera: 0.00,
    dataAtualizacao: "14/12/2024",
    motivo: "Não autorizado",
    origem: "Planilha Excel",
    dataNascimento: "22/07/1978",
    telefones: [
      { numero: "(21) 98888-5678", classe: "Frio" }
    ],
    tipoConsulta: "FGTS",
    historicoimports: [
      { tipo: "Cadastrais", origem: "Planilha Excel", dataImportacao: "09/12/2024" }
    ]
  },
  { 
    id: "3", 
    cpf: "456.789.123-03", 
    nome: "Maria Fernanda Costa", 
    telefone: "(11) 97777-9012", 
    classe: "Quente" as const, 
    status: "Elegível" as const, 
    contratos: [
      { dataContrato: "01/10/2024", vendedor: "Carlos Silva" },
      { dataContrato: "15/10/2024", vendedor: "Ana Santos" },
      { dataContrato: "25/11/2024", vendedor: "Pedro Lima" },
      { dataContrato: "05/12/2024", vendedor: "Maria Costa" },
      { dataContrato: "10/12/2024", vendedor: "João Oliveira" }
    ],
    saldo: 42000.75,
    libera: 35000.00,
    dataAtualizacao: "16/12/2024",
    motivo: "Aprovado",
    origem: "API Externa",
    dataNascimento: "10/05/1990",
    telefones: [
      { numero: "(11) 97777-9012", classe: "Quente" },
      { numero: "(11) 96666-8901", classe: "Quente" }
    ],
    tipoConsulta: "FGTS",
    historicoimports: [
      { tipo: "Cadastrais", origem: "API Externa", dataImportacao: "08/12/2024" },
      { tipo: "Higienização", origem: "Sistema Interno", dataImportacao: "11/12/2024" }
    ]
  },
  { 
    id: "4", 
    cpf: "789.123.456-04", 
    nome: "João Pedro Oliveira", 
    telefone: "(85) 96666-3456", 
    classe: "Frio" as const, 
    status: "Elegível" as const, 
    contratos: [
      { dataContrato: "10/11/2024", vendedor: "Maria Santos" },
      { dataContrato: "25/11/2024", vendedor: "Carlos Lima" }
    ],
    saldo: 15200.80,
    libera: 12000.00,
    dataAtualizacao: "13/12/2024",
    motivo: "Aprovado",
    origem: "Sistema Interno",
    dataNascimento: "08/12/1982",
    telefones: [
      { numero: "(85) 96666-3456", classe: "Frio" },
      { numero: "(85) 95555-2345", classe: "Frio" }
    ],
    tipoConsulta: "FGTS",
    historicoimports: [
      { tipo: "Cadastrais", origem: "Sistema Interno", dataImportacao: "07/12/2024" }
    ]
  },
  { 
    id: "5", 
    cpf: "321.654.987-05", 
    nome: "Isabela Rodrigues", 
    telefone: "(11) 95555-7890", 
    classe: "Quente" as const, 
    status: "Inelegível" as const, 
    contratos: [
      { dataContrato: "30/11/2024", vendedor: "Pedro Costa" }
    ],
    saldo: 5000.00,
    libera: 0.00,
    dataAtualizacao: "12/12/2024",
    motivo: "Saldo insuficiente",
    origem: "Planilha Excel",
    dataNascimento: "25/09/1987",
    telefones: [
      { numero: "(11) 95555-7890", classe: "Quente" }
    ],
    tipoConsulta: "FGTS",
    historicoimports: [
      { tipo: "Cadastrais", origem: "Planilha Excel", dataImportacao: "06/12/2024" }
    ]
  },
  { 
    id: "6", 
    cpf: "654.321.987-06", 
    nome: "Rafael Mendes Silva", 
    telefone: "(21) 94444-2345", 
    classe: "Frio" as const, 
    status: "Elegível" as const, 
    contratos: [
      { dataContrato: "05/10/2024", vendedor: "Ana Lima" },
      { dataContrato: "20/10/2024", vendedor: "Carlos Santos" },
      { dataContrato: "15/11/2024", vendedor: "Maria Silva" },
      { dataContrato: "28/11/2024", vendedor: "João Costa" }
    ],
    saldo: 31500.25,
    libera: 28000.50,
    dataAtualizacao: "16/12/2024",
    motivo: "Aprovado",
    origem: "API Externa",
    dataNascimento: "14/01/1980",
    telefones: [
      { numero: "(21) 94444-2345", classe: "Frio" },
      { numero: "(21) 93333-1234", classe: "Frio" }
    ],
    tipoConsulta: "FGTS",
    historicoimports: [
      { tipo: "Cadastrais", origem: "API Externa", dataImportacao: "05/12/2024" },
      { tipo: "Higienização", origem: "Sistema Interno", dataImportacao: "10/12/2024" }
    ]
  },
  { 
    id: "7", 
    cpf: "147.258.369-07", 
    nome: "Camila Santos Pereira", 
    telefone: "(11) 93333-6789", 
    classe: "Quente" as const, 
    status: "Elegível" as const, 
    contratos: [
      { dataContrato: "12/10/2024", vendedor: "Pedro Silva" },
      { dataContrato: "18/11/2024", vendedor: "Maria Lima" },
      { dataContrato: "02/12/2024", vendedor: "Carlos Costa" }
    ],
    saldo: 22000.40,
    libera: 19500.00,
    dataAtualizacao: "15/12/2024",
    motivo: "Aprovado",
    origem: "Sistema Interno",
    dataNascimento: "30/06/1992",
    telefones: [
      { numero: "(11) 93333-6789", classe: "Quente" },
      { numero: "(11) 92222-5678", classe: "Frio" }
    ],
    tipoConsulta: "FGTS",
    historicoimports: [
      { tipo: "Cadastrais", origem: "Sistema Interno", dataImportacao: "04/12/2024" }
    ]
  },
  { 
    id: "8", 
    cpf: "258.369.147-08", 
    nome: "Gustavo Ferreira", 
    telefone: "(85) 92222-0123", 
    classe: "Frio" as const, 
    status: "Inelegível" as const, 
    contratos: [
      { dataContrato: "25/11/2024", vendedor: "Ana Costa" }
    ],
    saldo: 3200.00,
    libera: 0.00,
    dataAtualizacao: "11/12/2024",
    motivo: "Não autorizado",
    origem: "Planilha Excel",
    dataNascimento: "18/04/1975",
    telefones: [
      { numero: "(85) 92222-0123", classe: "Frio" }
    ],
    tipoConsulta: "FGTS",
    historicoimports: [
      { tipo: "Cadastrais", origem: "Planilha Excel", dataImportacao: "03/12/2024" }
    ]
  },
  { 
    id: "9", 
    cpf: "369.147.258-09", 
    nome: "Larissa Almeida", 
    telefone: "(21) 91111-4567", 
    classe: "Quente" as const, 
    status: "Elegível" as const, 
    contratos: [
      { dataContrato: "08/10/2024", vendedor: "João Silva" },
      { dataContrato: "22/10/2024", vendedor: "Maria Santos" },
      { dataContrato: "05/11/2024", vendedor: "Carlos Lima" },
      { dataContrato: "20/11/2024", vendedor: "Ana Costa" },
      { dataContrato: "01/12/2024", vendedor: "Pedro Silva" },
      { dataContrato: "08/12/2024", vendedor: "Maria Lima" }
    ],
    saldo: 58000.90,
    libera: 52000.00,
    dataAtualizacao: "17/12/2024",
    motivo: "Aprovado",
    origem: "API Externa",
    dataNascimento: "12/11/1988",
    telefones: [
      { numero: "(21) 91111-4567", classe: "Quente" },
      { numero: "(21) 90000-3456", classe: "Quente" },
      { numero: "(21) 89999-2345", classe: "Frio" }
    ],
    tipoConsulta: "FGTS",
    historicoimports: [
      { tipo: "Cadastrais", origem: "API Externa", dataImportacao: "02/12/2024" },
      { tipo: "Higienização", origem: "Sistema Interno", dataImportacao: "08/12/2024" }
    ]
  },
  { 
    id: "10", 
    cpf: "159.753.486-10", 
    nome: "Bruno Costa Lima", 
    telefone: "(11) 90000-8901", 
    classe: "Frio" as const, 
    status: "Inelegível" as const, 
    contratos: [
      { dataContrato: "15/11/2024", vendedor: "Carlos Santos" },
      { dataContrato: "28/11/2024", vendedor: "Maria Costa" }
    ],
    saldo: 13800.60,
    libera: 11000.20,
    dataAtualizacao: "14/12/2024",
    motivo: "Saldo insuficiente",
    origem: "Sistema Interno",
    dataNascimento: "05/02/1983",
    telefones: [
      { numero: "(11) 90000-8901", classe: "Frio" },
      { numero: "(11) 89999-7890", classe: "Frio" }
    ],
    tipoConsulta: "FGTS",
    historicoimports: [
      { tipo: "Cadastrais", origem: "Sistema Interno", dataImportacao: "01/12/2024" }
    ]
  },
];

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [eligibleFilter, setEligibleFilter] = useState<"todos" | "elegiveis" | "nao-elegiveis">("todos");
  const [contractDateFromFilter, setContractDateFromFilter] = useState("");
  const [contractDateToFilter, setContractDateToFilter] = useState("");
  const [motivosFilter, setMotivosFilter] = useState<string[]>([]);
  const [origemFilter, setOrigemFilter] = useState<string[]>([]);
  const [cpfMassFilter, setCpfMassFilter] = useState("");
  const [namesMassFilter, setNamesMassFilter] = useState("");
  const [phonesMassFilter, setPhonesMassFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [appliedCpfList, setAppliedCpfList] = useState<string[]>([]);
  const [appliedNamesList, setAppliedNamesList] = useState<string[]>([]);
  const [appliedPhonesList, setAppliedPhonesList] = useState<string[]>([]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();

  const leadsPerPage = 8;

  // Get unique motivos and origens for the filters
  const availableMotivos = Array.from(new Set(mockLeads.map(lead => lead.motivo))).sort();
  const availableOrigens = Array.from(new Set(mockLeads.map(lead => lead.origem))).sort();

  // Parse text list (CPF, names, phones)
  const parseTextList = (text: string, type: 'cpf' | 'name' | 'phone'): string[] => {
    if (!text.trim()) return [];
    
    return text
      .split(/[,;\n\r]+/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .map(item => {
        if (type === 'cpf') {
          // Normalize CPF format
          const cleanCpf = item.replace(/[^\d]/g, '');
          if (cleanCpf.length >= 11) {
            return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
          }
          return item;
        }
        return item;
      })
      .filter(item => item.length > 0);
  };

  // Convert date string to comparable format (YYYY-MM-DD to DD/MM/YYYY comparison)
  const isDateInRange = (dateStr: string, fromDate: string, toDate: string): boolean => {
    if (!fromDate && !toDate) return true;
    
    // Convert DD/MM/YYYY to YYYY-MM-DD for comparison
    const [day, month, year] = dateStr.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    
    if (fromDate && formattedDate < fromDate) return false;
    if (toDate && formattedDate > toDate) return false;
    
    return true;
  };

  // Check if contract date is in range
  const isContractDateInRange = (contratos: Array<{dataContrato: string; vendedor: string}>, fromDate: string, toDate: string): boolean => {
    if (!fromDate && !toDate) return true;
    
    // Check if any contract date is in range
    return contratos.some(contrato => {
      const [day, month, year] = contrato.dataContrato.split('/');
      const contractDateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      
      if (fromDate && contractDateStr < fromDate) return false;
      if (toDate && contractDateStr > toDate) return false;
      
      return true;
    });
  };

  const handleApplyFilters = () => {
    // Apply CPF filter
    if (cpfMassFilter.trim()) {
      const cpfList = parseTextList(cpfMassFilter, 'cpf');
      setAppliedCpfList(cpfList);
    } else {
      setAppliedCpfList([]);
    }

    // Apply Names filter
    if (namesMassFilter.trim()) {
      const namesList = parseTextList(namesMassFilter, 'name');
      setAppliedNamesList(namesList.map(name => name.toLowerCase()));
    } else {
      setAppliedNamesList([]);
    }

    // Apply Phones filter
    if (phonesMassFilter.trim()) {
      const phonesList = parseTextList(phonesMassFilter, 'phone');
      setAppliedPhonesList(phonesList);
    } else {
      setAppliedPhonesList([]);
    }

    setCurrentPage(1);
    
    toast({
      title: "Filtros aplicados",
      description: "Os filtros foram aplicados com sucesso",
    });
  };

  const handleClearFilters = () => {
    setSearchValue("");
    setEligibleFilter("todos");
    setContractDateFromFilter("");
    setContractDateToFilter("");
    setMotivosFilter([]);
    setOrigemFilter([]);
    setCpfMassFilter("");
    setNamesMassFilter("");
    setPhonesMassFilter("");
    setDateFromFilter("");
    setDateToFilter("");
    setAppliedCpfList([]);
    setAppliedNamesList([]);
    setAppliedPhonesList([]);
    setCurrentPage(1);
    
    toast({
      title: "Filtros limpos",
      description: "Todos os filtros foram removidos",
    });
  };

  // Check if any filters are active
  const hasActiveFilters = 
    searchValue !== "" ||
    eligibleFilter !== "todos" ||
    contractDateFromFilter !== "" ||
    contractDateToFilter !== "" ||
    motivosFilter.length > 0 ||
    origemFilter.length > 0 ||
    appliedCpfList.length > 0 ||
    appliedNamesList.length > 0 ||
    appliedPhonesList.length > 0 ||
    dateFromFilter !== "" ||
    dateToFilter !== "";

  // Filter leads based on all filters
  const filteredLeads = mockLeads.filter(lead => {
    // Search filter
    const matchesSearch = lead.nome.toLowerCase().includes(searchValue.toLowerCase()) ||
                         lead.cpf.includes(searchValue) ||
                         lead.telefone.includes(searchValue);
    
    // Eligibility filter
    let matchesEligible = true;
    if (eligibleFilter === "elegiveis") {
      matchesEligible = lead.status === "Elegível";
    } else if (eligibleFilter === "nao-elegiveis") {
      matchesEligible = lead.status === "Inelegível";
    }

    // Motivos filter
    const matchesMotivos = motivosFilter.length === 0 || motivosFilter.includes(lead.motivo);

    // Origem filter
    const matchesOrigem = origemFilter.length === 0 || origemFilter.includes(lead.origem);

    // CPF mass filter
    const matchesCpfMass = appliedCpfList.length === 0 || appliedCpfList.includes(lead.cpf);

    // Names mass filter
    const matchesNamesMass = appliedNamesList.length === 0 || 
      appliedNamesList.some(name => lead.nome.toLowerCase().includes(name));

    // Phones mass filter
    const matchesPhonesMass = appliedPhonesList.length === 0 || 
      appliedPhonesList.some(phone => lead.telefone.includes(phone.replace(/[^\d]/g, '')));

    // Date range filter
    const matchesDateRange = isDateInRange(lead.dataAtualizacao, dateFromFilter, dateToFilter);

    // Contract date range filter
    const matchesContractDateRange = isContractDateInRange(lead.contratos, contractDateFromFilter, contractDateToFilter);

    return matchesSearch && matchesEligible && matchesContractDateRange && matchesMotivos && 
           matchesOrigem && matchesCpfMass && matchesNamesMass && matchesPhonesMass && matchesDateRange;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  const handleImport = (type: string, file: File, origin?: string) => {
    console.log(`Importing ${type} from file:`, file.name, origin ? `with origin: ${origin}` : '');
    toast({
      title: "Importação iniciada",
      description: `Processando arquivo ${file.name} para ${type === 'cadastrais' ? 'Dados Cadastrais' : 'Dados de Higienização'}${origin ? ` (Origem: ${origin})` : ''}`,
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
    <div className="p-4 lg:p-6 max-w-full min-w-0">
      <div className="mb-6 max-w-full">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Gerencie e visualize seus leads importados ({filteredLeads.length} leads encontrados)
        </p>
      </div>

      <LeadsControls
        onImportClick={() => setIsImportModalOpen(true)}
        onExportClick={() => setIsExportModalOpen(true)}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        eligibleFilter={eligibleFilter}
        onEligibleFilterChange={setEligibleFilter}
        contractDateFromFilter={contractDateFromFilter}
        onContractDateFromFilterChange={setContractDateFromFilter}
        contractDateToFilter={contractDateToFilter}
        onContractDateToFilterChange={setContractDateToFilter}
        motivosFilter={motivosFilter}
        onMotivosFilterChange={setMotivosFilter}
        origemFilter={origemFilter}
        onOrigemFilterChange={setOrigemFilter}
        cpfMassFilter={cpfMassFilter}
        onCpfMassFilterChange={setCpfMassFilter}
        namesMassFilter={namesMassFilter}
        onNamesMassFilterChange={setNamesMassFilter}
        phonesMassFilter={phonesMassFilter}
        onPhonesMassFilterChange={setPhonesMassFilter}
        dateFromFilter={dateFromFilter}
        onDateFromFilterChange={setDateFromFilter}
        dateToFilter={dateToFilter}
        onDateToFilterChange={setDateToFilter}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        availableMotivos={availableMotivos}
        availableOrigens={availableOrigens}
        hasActiveFilters={hasActiveFilters}
      />

      <LeadsTable
        leads={paginatedLeads}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

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
