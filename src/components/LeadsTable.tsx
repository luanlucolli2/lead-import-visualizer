
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
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Classe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Saldo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Libera
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atualização
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contratos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Origem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {lead.cpf}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {lead.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                    {lead.telefone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
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
                      <span className="text-xs text-gray-500">• {lead.motivo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {formatCurrency(lead.saldo)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {formatCurrency(lead.libera)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.dataAtualizacao}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {lead.contratos}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                      {lead.origem}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      onClick={() => handleViewLead(lead)}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden space-y-4 p-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{lead.nome}</h3>
                  <p className="text-sm font-mono text-gray-600">{lead.cpf}</p>
                  <p className="text-sm font-mono text-gray-600">{lead.telefone}</p>
                </div>
                <Button
                  onClick={() => handleViewLead(lead)}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver</span>
                </Button>
              </div>

              {/* Status and Class */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
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
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    {lead.origem}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{lead.contratos} contratos</span>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Saldo:</span>
                  <p className="font-semibold">{formatCurrency(lead.saldo)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Libera:</span>
                  <p className="font-semibold">{formatCurrency(lead.libera)}</p>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
                <span>Atualizado: {lead.dataAtualizacao}</span>
                <span>{lead.motivo}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 lg:px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex items-center space-x-2">
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
