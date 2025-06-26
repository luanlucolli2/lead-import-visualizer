
import { Search, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  cpfMassFilter: string;
  onCpfMassFilterChange: (value: string) => void;
  onApplyCpfMassFilter: () => void;
  availableMotivos: string[];
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
  cpfMassFilter,
  onCpfMassFilterChange,
  onApplyCpfMassFilter,
  availableMotivos,
}: HeaderProps) => {
  const [showCpfFilter, setShowCpfFilter] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="space-y-4">
        {/* First Row - Search, Action Buttons */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Pesquisar leads..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full lg:w-80"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 w-full lg:w-auto">
            <Button 
              onClick={() => setShowCpfFilter(!showCpfFilter)} 
              variant="outline" 
              className="flex-1 lg:flex-none border-gray-300 hover:bg-gray-50"
            >
              Filtro CPF
            </Button>
            <Button 
              onClick={onExportClick} 
              variant="outline" 
              className="flex-1 lg:flex-none border-gray-300 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button 
              onClick={onImportClick} 
              className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
          </div>
        </div>

        {/* Second Row - Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Eligibility Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Elegibilidade</label>
            <Select value={eligibleFilter} onValueChange={onEligibleFilterChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecionar..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="elegiveis">Elegíveis</SelectItem>
                <SelectItem value="nao-elegiveis">Inelegíveis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contracts Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Contratos</label>
            <Select value={contractsFilter} onValueChange={onContractsFilterChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecionar..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="mais">Mais contratos (3+)</SelectItem>
                <SelectItem value="menos">Menos contratos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Motivos Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Motivos</label>
            <MultiSelect
              options={availableMotivos}
              selected={motivosFilter}
              onChange={onMotivosFilterChange}
              placeholder="Selecionar motivos..."
              className="w-full"
            />
          </div>
        </div>

        {/* CPF Mass Filter (Collapsible) */}
        {showCpfFilter && (
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Filtro em Massa por CPF
              </label>
              <Textarea
                placeholder="Cole aqui uma lista de CPFs separados por vírgula, ponto-e-vírgula ou quebra de linha..."
                value={cpfMassFilter}
                onChange={(e) => onCpfMassFilterChange(e.target.value)}
                rows={4}
                className="w-full"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={onApplyCpfMassFilter}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Aplicar filtro em massa
                </Button>
                <Button 
                  onClick={() => {
                    onCpfMassFilterChange("");
                    onApplyCpfMassFilter();
                  }}
                  variant="outline"
                >
                  Limpar filtro
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
