
import { Search, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onImportClick: () => void;
  onExportClick: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  eligibleFilter: "todos" | "elegiveis" | "nao-elegiveis";
  onEligibleFilterChange: (value: "todos" | "elegiveis" | "nao-elegiveis") => void;
  contractsFilter: "todos" | "mais" | "menos";
  onContractsFilterChange: (value: "todos" | "mais" | "menos") => void;
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
}: HeaderProps) => {
  const getNextEligibleFilter = () => {
    switch (eligibleFilter) {
      case "todos": return "elegiveis";
      case "elegiveis": return "nao-elegiveis";
      case "nao-elegiveis": return "todos";
      default: return "todos";
    }
  };

  const getNextContractsFilter = () => {
    switch (contractsFilter) {
      case "todos": return "mais";
      case "mais": return "menos";
      case "menos": return "todos";
      default: return "todos";
    }
  };

  const getEligibleFilterLabel = () => {
    switch (eligibleFilter) {
      case "todos": return "Todos";
      case "elegiveis": return "Elegíveis";
      case "nao-elegiveis": return "Não Elegíveis";
      default: return "Todos";
    }
  };

  const getContractsFilterLabel = () => {
    switch (contractsFilter) {
      case "todos": return "Todos";
      case "mais": return "Mais contratos (3+)";
      case "menos": return "Menos contratos";
      default: return "Todos";
    }
  };

  const getEligibleFilterStyle = () => {
    switch (eligibleFilter) {
      case "elegiveis": return "bg-green-100 text-green-800 border-green-300";
      case "nao-elegiveis": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200";
    }
  };

  const getContractsFilterStyle = () => {
    switch (contractsFilter) {
      case "mais": return "bg-blue-100 text-blue-800 border-blue-300";
      case "menos": return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200";
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          {/* Search Field */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Pesquisar leads..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-80"
            />
          </div>

          {/* Toggle Filters */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onEligibleFilterChange(getNextEligibleFilter())}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border",
                getEligibleFilterStyle()
              )}
            >
              {getEligibleFilterLabel()}
            </button>
            
            <button
              onClick={() => onContractsFilterChange(getNextContractsFilter())}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border",
                getContractsFilterStyle()
              )}
            >
              {getContractsFilterLabel()}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button onClick={onExportClick} variant="outline" className="border-gray-300 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={onImportClick} className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Importar Leads
          </Button>
        </div>
      </div>
    </div>
  );
};
