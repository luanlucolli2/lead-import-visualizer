import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, AlertTriangle, CheckCircle, Search, Upload, Download, Filter } from "lucide-react";
import { LeadsTable } from "@/components/LeadsTable";
import { ImportModal } from "@/components/ImportModal";
import { ExportModal } from "@/components/ExportModal";
import { FiltersModal } from "@/components/FiltersModal";
import { LeadDetailsModal } from "@/components/LeadDetailsModal";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [eligibleFilter, setEligibleFilter] = useState("todos");
  const [contractDateFromFilter, setContractDateFromFilter] = useState("");
  const [contractDateToFilter, setContractDateToFilter] = useState("");
  const [motivosFilter, setMotivosFilter] = useState([]);
  const [origemFilter, setOrigemFilter] = useState([]);
  const [cpfMassFilter, setCpfMassFilter] = useState("");
  const [namesMassFilter, setNamesMassFilter] = useState("");
  const [phonesMassFilter, setPhonesMassFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [availableMotivos, setAvailableMotivos] = useState([]);
  const [availableOrigens, setAvailableOrigens] = useState([]);

  useEffect(() => {
    // Mock data - substituir por chamada real da API
    const mockLeads = [
      {
        id: 1,
        name: "João Silva",
        cpf: "123.456.789-00",
        phone: "(11) 99999-9999",
        email: "joao@email.com",
        eligible: true,
        contractDate: "2024-01-15",
        motivo: ["Documentação em ordem"],
        origem: "Site",
        createdAt: "2024-01-10"
      },
      {
        id: 2,
        name: "Maria Santos",
        cpf: "987.654.321-00", 
        phone: "(11) 88888-8888",
        email: "maria@email.com",
        eligible: false,
        contractDate: "2024-01-20",
        motivo: ["Renda insuficiente", "Score baixo"],
        origem: "Telefone",
        createdAt: "2024-01-12"
      },
      {
        id: 3,
        name: "Pedro Costa",
        cpf: "456.789.123-00",
        phone: "(11) 77777-7777", 
        email: "pedro@email.com",
        eligible: true,
        contractDate: "2024-01-25",
        motivo: ["Aprovado"],
        origem: "Indicação",
        createdAt: "2024-01-15"
      }
    ];

    setLeads(mockLeads);
    setFilteredLeads(mockLeads);
    
    // Extract unique motivos and origens for filters
    const motivos = [...new Set(mockLeads.flatMap(lead => lead.motivo))];
    const origens = [...new Set(mockLeads.map(lead => lead.origem))];
    setAvailableMotivos(motivos);
    setAvailableOrigens(origens);
  }, []);

  const applyFilters = () => {
    let filtered = [...leads];

    // Search filter
    if (searchValue.trim()) {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(search) ||
        lead.cpf.includes(search) ||
        lead.phone.includes(search) ||
        lead.email.toLowerCase().includes(search)
      );
    }

    // Eligible filter
    if (eligibleFilter !== "todos") {
      const isEligible = eligibleFilter === "elegiveis";
      filtered = filtered.filter(lead => lead.eligible === isEligible);
    }

    // Contract date filter
    if (contractDateFromFilter) {
      filtered = filtered.filter(lead => new Date(lead.contractDate) >= new Date(contractDateFromFilter));
    }
    if (contractDateToFilter) {
      filtered = filtered.filter(lead => new Date(lead.contractDate) <= new Date(contractDateToFilter));
    }

    // Motivos filter
    if (motivosFilter.length > 0) {
      filtered = filtered.filter(lead => 
        lead.motivo.some(motivo => motivosFilter.includes(motivo))
      );
    }

    // Origem filter
    if (origemFilter.length > 0) {
      filtered = filtered.filter(lead => origemFilter.includes(lead.origem));
    }

    // CPF mass filter
    if (cpfMassFilter.trim()) {
      const cpfs = cpfMassFilter.split('\n').map(cpf => cpf.trim()).filter(cpf => cpf);
      filtered = filtered.filter(lead => cpfs.includes(lead.cpf));
    }

    // Names mass filter
    if (namesMassFilter.trim()) {
      const names = namesMassFilter.split('\n').map(name => name.trim().toLowerCase()).filter(name => name);
      filtered = filtered.filter(lead => names.includes(lead.name.toLowerCase()));
    }

    // Phones mass filter
    if (phonesMassFilter.trim()) {
      const phones = phonesMassFilter.split('\n').map(phone => phone.trim()).filter(phone => phone);
      filtered = filtered.filter(lead => phones.includes(lead.phone));
    }

    // Date range filter
    if (dateFromFilter) {
      filtered = filtered.filter(lead => new Date(lead.createdAt) >= new Date(dateFromFilter));
    }
    if (dateToFilter) {
      filtered = filtered.filter(lead => new Date(lead.createdAt) <= new Date(dateToFilter));
    }

    setFilteredLeads(filtered);
  };

  const clearFilters = () => {
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
    setFilteredLeads(leads);
  };

  const hasActiveFilters = searchValue || eligibleFilter !== "todos" || contractDateFromFilter || 
    contractDateToFilter || motivosFilter.length > 0 || origemFilter.length > 0 || 
    cpfMassFilter || namesMassFilter || phonesMassFilter || dateFromFilter || dateToFilter;

  const eligibleLeads = leads.filter(lead => lead.eligible);
  const nonEligibleLeads = leads.filter(lead => !lead.eligible);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 w-full">
        <div className="px-3 sm:px-4 lg:px-6 py-4">
          <div className="space-y-3 sm:space-y-4">
            {/* Main Row - Sidebar Toggle, Search and Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
              {/* Sidebar Toggle Button (visible on mobile/tablet) */}
              <SidebarTrigger className="lg:hidden flex items-center justify-center px-2 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm flex-shrink-0 self-start" />

              {/* Search Field */}
              <div className="relative flex-1 min-w-0 max-w-full sm:max-w-xs lg:max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="Pesquisar leads..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 w-full min-w-0"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
                <Button 
                  onClick={() => setIsFiltersModalOpen(true)} 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    "flex items-center justify-center min-w-0 px-2 sm:px-3 border-gray-300 hover:bg-gray-50 relative text-xs sm:text-sm flex-shrink-0",
                    hasActiveFilters && "border-blue-500 bg-blue-50 text-blue-700"
                  )}
                >
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="ml-1 sm:ml-2 hidden xs:inline whitespace-nowrap">Filtros</span>
                  {hasActiveFilters && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  )}
                </Button>
                
                <Button 
                  onClick={() => setIsExportModalOpen(true)} 
                  variant="outline" 
                  size="sm"
                  className="flex items-center justify-center min-w-0 px-2 sm:px-3 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm flex-shrink-0"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="ml-1 sm:ml-2 hidden xs:inline whitespace-nowrap">Exportar</span>
                </Button>
                
                <Button 
                  onClick={() => setIsImportModalOpen(true)} 
                  size="sm"
                  className="flex items-center justify-center min-w-0 px-2 sm:px-3 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm flex-shrink-0"
                >
                  <Upload className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="ml-1 sm:ml-2 hidden xs:inline whitespace-nowrap">Importar</span>
                </Button>
              </div>
            </div>

            {/* Active Filters Indicator */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-full min-w-0">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <Filter className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-blue-800 font-medium truncate">Filtros ativos aplicados</span>
                </div>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100 flex-shrink-0 ml-2 whitespace-nowrap"
                >
                  Limpar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
              <p className="text-xs text-muted-foreground">
                Total de leads no sistema
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Elegíveis</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{eligibleLeads.length}</div>
              <p className="text-xs text-muted-foreground">
                Leads aprovados para contrato
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Não Elegíveis</CardTitle>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{nonEligibleLeads.length}</div>
              <p className="text-xs text-muted-foreground">
                Leads que não atendem critérios
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {leads.length > 0 ? Math.round((eligibleLeads.length / leads.length) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Porcentagem de leads elegíveis
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Leads</CardTitle>
            <CardDescription>
              Gerencie e visualize todos os leads do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadsTable 
              leads={filteredLeads} 
              onLeadClick={setSelectedLead}
              onApplyFilters={applyFilters}
            />
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ImportModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />
      
      <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
      />

      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
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
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
        availableMotivos={availableMotivos}
        availableOrigens={availableOrigens}
      />

      <LeadDetailsModal 
        lead={selectedLead} 
        isOpen={!!selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />
    </div>
  );
};

export default Dashboard;
