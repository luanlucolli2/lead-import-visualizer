
import { Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onImportClick: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  eligibleFilter: boolean;
  onEligibleFilterChange: (value: boolean) => void;
  moreContractsFilter: boolean;
  onMoreContractsFilterChange: (value: boolean) => void;
}

export const Header = ({
  onImportClick,
  searchValue,
  onSearchChange,
  eligibleFilter,
  onEligibleFilterChange,
  moreContractsFilter,
  onMoreContractsFilterChange,
}: HeaderProps) => {
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
              onClick={() => onEligibleFilterChange(!eligibleFilter)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border",
                eligibleFilter
                  ? "bg-green-100 text-green-800 border-green-300"
                  : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
              )}
            >
              Elegíveis
            </button>
            
            <button
              onClick={() => onMoreContractsFilterChange(!moreContractsFilter)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border",
                moreContractsFilter
                  ? "bg-blue-100 text-blue-800 border-blue-300"
                  : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
              )}
            >
              Mais contratos
            </button>
          </div>
        </div>

        {/* Import Button */}
        <Button onClick={onImportClick} className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Importar Leads
        </Button>
      </div>
    </div>
  );
};
