
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

const AppLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Estados dos filtros (mantidos no layout para persistir entre páginas)
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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleImportClick = () => {
    console.log("Import clicked");
  };

  const handleExportClick = () => {
    console.log("Export clicked");
  };

  const handleApplyFilters = () => {
    console.log("Filters applied");
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
  };

  const hasActiveFilters = !!(
    searchValue ||
    eligibleFilter !== "todos" ||
    contractDateFromFilter ||
    contractDateToFilter ||
    motivosFilter.length > 0 ||
    origemFilter.length > 0 ||
    cpfMassFilter ||
    namesMassFilter ||
    phonesMassFilter ||
    dateFromFilter ||
    dateToFilter
  );

  const availableMotivos = ["Motivo 1", "Motivo 2", "Motivo 3"];
  const availableOrigens = ["Origem 1", "Origem 2", "Origem 3"];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? "lg:ml-16" : "lg:ml-60"
      }`}>
        <Header
          onImportClick={handleImportClick}
          onExportClick={handleExportClick}
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
          onToggleSidebar={toggleSidebar}
        />
        
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
