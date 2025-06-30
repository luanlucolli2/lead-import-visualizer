
import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LeadDetailsModal } from "./LeadDetailsModal";

interface Lead {
  id: string;
  cpf: string;
  nome: string;
  telefone: string;
  classe: "Quente" | "Frio";
  status: "Elegível" | "Inelegível";
  contratos: number;
  saldo: number;
  libera: number;
  dataAtualizacao: string;
  motivo: string;
  origem: string;
}

interface LeadsTableProps {
  leads: Lead[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const LeadsTable = ({ leads, currentPage, totalPages, onPageChange }: LeadsTableProps) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full max-w-full">
        {/* Desktop Table */}
        <div className="hidden lg:block w-full max-w-full">
          <div className="overflow-x-auto max-w-full">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[110px]">
                    CPF
                  </th>
                  <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">
                    Nome
                  </th>
                  <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Telefone
                  </th>
                  <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    Classe
                  </th>
                  <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Status
                  </th>
                  <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    Saldo
                  </th>
                  <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    Libera
                  </th>
                  <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    Atualização
                  </th>
                  <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    Contratos
                  </th>
                  <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    Origem
                  </th>
                  <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {lead.cpf}
                    </td>
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium max-w-[200px] truncate">
                      {lead.nome}
                    </td>
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {lead.telefone}
                    </td>
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                          lead.classe === "Quente"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        )}
                      >
                        {lead.classe}
                      </span>
                    </td>
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span
                          className={cn(
                            "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                            lead.status === "Elegível"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          )}
                        >
                          {lead.status}
                        </span>
                        <span className="text-xs text-gray-500 truncate max-w-[100px]">{lead.motivo}</span>
                      </div>
                    </td>
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {formatCurrency(lead.saldo)}
                    </td>
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {formatCurrency(lead.libera)}
                    </td>
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.dataAtualizacao}
                    </td>
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {lead.contratos}
                    </td>
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full max-w-[100px] truncate">
                        {lead.origem}
                      </span>
                    </td>
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap">
                      <Button
                        onClick={() => handleViewLead(lead)}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden xl:inline">Ver</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden space-y-4 p-4 max-w-full">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 max-w-full">
              {/* Header */}
              <div className="flex justify-between items-start min-w-0">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 truncate">{lead.nome}</h3>
                  <p className="text-sm font-mono text-gray-600 truncate">{lead.cpf}</p>
                  <p className="text-sm font-mono text-gray-600 truncate">{lead.telefone}</p>
                </div>
                <Button
                  onClick={() => handleViewLead(lead)}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1 flex-shrink-0 ml-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver</span>
                </Button>
              </div>

              {/* Status and Class */}
              <div className="flex items-center justify-between flex-wrap gap-2 min-w-0">
                <div className="flex items-center space-x-2 flex-wrap min-w-0">
                  <span
                    className={cn(
                      "inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0",
                      lead.classe === "Quente"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    )}
                  >
                    {lead.classe}
                  </span>
                  <span
                    className={cn(
                      "inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0",
                      lead.status === "Elegível"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    )}
                  >
                    {lead.status}
                  </span>
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full flex-shrink-0 max-w-[120px] truncate">
                    {lead.origem}
                  </span>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">{lead.contratos} contratos</span>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="min-w-0">
                  <span className="text-gray-500">Saldo:</span>
                  <p className="font-semibold truncate">{formatCurrency(lead.saldo)}</p>
                </div>
                <div className="min-w-0">
                  <span className="text-gray-500">Libera:</span>
                  <p className="font-semibold truncate">{formatCurrency(lead.libera)}</p>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t min-w-0">
                <span className="flex-shrink-0">Atualizado: {lead.dataAtualizacao}</span>
                <span className="truncate ml-2 min-w-0">{lead.motivo}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 lg:px-6 py-3 border-t border-gray-200 flex items-center justify-between max-w-full">
          <div className="text-sm text-gray-500 flex-shrink-0">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <LeadDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        lead={selectedLead}
      />
    </>
  );
};
