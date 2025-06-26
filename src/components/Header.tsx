
import { Search, Upload, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FiltersModal } from "./FiltersModal";

interface HeaderProps {
  onImportClick: () => void;
  onExportClick: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  eligibleFilter: "todos" | "elegiveis" | "nao-elegiveis";
  onEligibleFilterChange: (value: "todos" | "elegiveis" | "nao-elegiveis") => void;
  contractsFilter: "todos" | "mais" | "menos";
  onContractsFilterChange: (value: "todos" | "mais" | "menos") => void;
  motivosFilter: string[];
  onMotivosFilterChange: (values: string[]) => void;
  origemFilter: string[];
  onOrigemFilterChange: (values: string[]) => void;
  cpfMassFilter: string;
  onCpfMassFilterChange: (value: string) => void;
  namesMassFilter: string;
  onNamesMassFilterChange: (value: string) => void;
  phonesMassFilter: string;
  onPhonesMassFilterChange: (value: string) => void;
  dateFromFilter: string;
  onDateFromFilterChange: (value: string) => void;
  dateToFilter: string;
  onDateToFilterChange: (value: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  availableMotivos: string[];
  availableOrigens: string[];
  hasActiveFilters: boolean;
}

export const Header = ({
  onImportClick,
  onExportClick,
  searchValue,
  onSearchChange,
  eligibleFilter,
  onEligibleFilterChange,
  contractsFilter,
  onContractsFilterChange,
  motivosFilter,
  onMotivosFilterChange,
  origemFilter,
  onOrigemFilterChange,
  cpfMassFilter,
  onCpfMassFilterChange,
  namesMassFilter,
  onNamesMassFilterChange,
  phonesMassFilter,
  onPhonesMassFilterChange,
  dateFromFilter,
  onDateFromFilterChange,
  dateToFilter,
  onDateToFilterChange,
  onApplyFilters,
  onClearFilters,
  availableMotivos,
  availableOrigens,
  hasActiveFilters,
}: HeaderProps) => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 px-2 sm:px-4 lg:px-6 py-4 w-full">
      <div className="space-y-4 max-w-full">
        {/* Main Row - Search and Action Buttons */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 lg:gap-4 w-full">
          {/* Search Field */}
          <div className="relative w-full lg:max-w-sm xl:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Pesquisar leads..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full lg:w-auto lg:flex-shrink-0">
            <Button 
              onClick={() => setIsFiltersModalOpen(true)} 
              variant="outline" 
              size="sm"
              className={cn(
                "flex-1 lg:flex-none border-gray-300 hover:bg-gray-50 relative text-xs sm:text-sm",
                hasActiveFilters && "border-blue-500 bg-blue-50 text-blue-700"
              )}
            >
              <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Filtros</span>
              <span className="sm:hidden">Filtrar</span>
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </Button>
            <Button 
              onClick={onExportClick} 
              variant="outline" 
              size="sm"
              className="flex-1 lg:flex-none border-gray-300 hover:bg-gray-50 text-xs sm:text-sm"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Exportar</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button 
              onClick={onImportClick} 
              size="sm"
              className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
            >
              <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Importar</span>
              <span className="sm:hidden">Import</span>
            </Button>
          </div>
        </div>

        {/* Active Filters Indicator */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3 w-full">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <Filter className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-800 font-medium truncate">Filtros ativos aplicados</span>
            </div>
            <Button
              onClick={onClearFilters}
              variant="outline"
              size="sm"
              className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100 flex-shrink-0 ml-2"
            >
              Limpar
            </Button>
          </div>
        )}
      </div>

      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        eligibleFilter={eligibleFilter}
        onEligibleFilterChange={onEligibleFilterChange}
        contractsFilter={contractsFilter}
        onContractsFilterChange={onContractsFilterChange}
        motivosFilter={motivosFilter}
        onMotivosFilterChange={onMotivosFilterChange}
        origemFilter={origemFilter}
        onOrigemFilterChange={onOrigemFilterChange}
        cpfMassFilter={cpfMassFilter}
        onCpfMassFilterChange={onCpfMassFilterChange}
        namesMassFilter={namesMassFilter}
        onNamesMassFilterChange={onNamesMassFilterChange}
        phonesMassFilter={phonesMassFilter}
        onPhonesMassFilterChange={onPhonesMassFilterChange}
        dateFromFilter={dateFromFilter}
        onDateFromFilterChange={onDateFromFilterChange}
        dateToFilter={dateToFilter}
        onDateToFilterChange={onDateToFilterChange}
        onApplyFilters={onApplyFilters}
        onClearFilters={onClearFilters}
        availableMotivos={availableMotivos}
        availableOrigens={availableOrigens}
      />
    </div>
  );
};
