
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { User, Phone, FileText, History, Calendar, DollarSign } from "lucide-react";
import { Lead } from "@/types/lead";

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

export const LeadDetailsModal = ({ isOpen, onClose, lead }: LeadDetailsModalProps) => {
  if (!lead) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden w-[95vw] p-4 sm:p-6">
        <DialogHeader className="pb-2 sm:pb-4">
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
            <User className="h-5 w-5" />
            Detalhes do Lead
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="dados" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-0">
            <TabsTrigger value="dados" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Dados Básicos</span>
              <span className="sm:hidden">Dados</span>
            </TabsTrigger>
            <TabsTrigger value="telefones" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
              Telefones
            </TabsTrigger>
            <TabsTrigger value="contratos" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              Contratos
            </TabsTrigger>
            <TabsTrigger value="historico" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <History className="h-3 w-3 sm:h-4 sm:w-4" />
              Histórico
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 sm:mt-6 max-h-[calc(90vh-160px)] sm:max-h-[calc(90vh-200px)] overflow-y-auto">
            <TabsContent value="dados" className="space-y-4 sm:space-y-6 mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
                      <User className="h-4 w-4 sm:h-5 sm:w-5" />
                      Informações Pessoais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 pt-0">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600">Nome Completo</label>
                      <p className="text-sm sm:text-base font-medium text-gray-900">{lead.nome}</p>
                    </div>
                    
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600">CPF</label>
                      <p className="text-sm sm:text-base font-mono text-gray-900">{formatCPF(lead.cpf)}</p>
                    </div>
                    
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600">Data de Nascimento</label>
                      <p className="text-sm sm:text-base text-gray-900">{lead.dataNascimento}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                      Status e Classificação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 pt-0">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600">Status</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={lead.status === "Elegível" ? "default" : "secondary"}
                          className={cn(
                            "text-xs",
                            lead.status === "Elegível"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          )}
                        >
                          {lead.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600">Tipo de Consulta</label>
                      <p className="text-sm sm:text-base text-gray-900">{lead.tipoConsulta}</p>
                    </div>
                    
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600">Classe</label>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          lead.classe === "Quente"
                            ? "border-red-200 text-red-700 bg-red-50"
                            : "border-blue-200 text-blue-700 bg-blue-50"
                        )}
                      >
                        {lead.classe}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                    Informações Financeiras
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <label className="text-xs sm:text-sm font-medium text-blue-700">Saldo Total</label>
                      <p className="text-lg sm:text-2xl font-bold text-blue-900">{formatCurrency(lead.saldo)}</p>
                      <p className="text-xs text-blue-600 mt-1">Valor total de FGTS retornado pelo robô</p>
                    </div>
                    
                    <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                      <label className="text-xs sm:text-sm font-medium text-green-700">Valor Liberado</label>
                      <p className="text-lg sm:text-2xl font-bold text-green-900">{formatCurrency(lead.libera)}</p>
                      <p className="text-xs text-green-600 mt-1">Valor disponível para liberação</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="telefones" className="space-y-4 mt-0">
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                    Telefones de Contato
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {lead.telefones && lead.telefones.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      {lead.telefones.slice(0, 4).map((telefone, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="font-mono text-sm sm:text-base text-gray-900 truncate">{formatPhone(telefone.numero)}</p>
                            <p className="text-xs sm:text-sm text-gray-600">Telefone {index + 1}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs ml-2 flex-shrink-0",
                              telefone.classe === "Quente"
                                ? "border-red-200 text-red-700 bg-red-50"
                                : "border-blue-200 text-blue-700 bg-blue-50"
                            )}
                          >
                            {telefone.classe}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-6 sm:py-8 text-sm">Nenhum telefone cadastrado</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contratos" className="space-y-4 mt-0">
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                    Contratos
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {lead.contratos && lead.contratos.length > 0 ? (
                    <div className="space-y-3 sm:space-y-4">
                      {lead.contratos.map((contrato, index) => (
                        <div key={index} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm sm:text-base text-gray-900">Contrato #{index + 1}</p>
                              <p className="text-xs sm:text-sm text-gray-600 truncate">Data: {contrato.dataContrato}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-2">
                            <p className="font-medium text-sm text-gray-900 truncate max-w-[100px] sm:max-w-none">{contrato.vendedor}</p>
                            <p className="text-xs text-gray-600">Vendedor</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-6 sm:py-8 text-sm">Nenhum contrato encontrado</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico" className="space-y-4 mt-0">
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
                    <History className="h-4 w-4 sm:h-5 sm:w-5" />
                    Histórico de Importações
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {lead.historicoimports && lead.historicoimports.length > 0 ? (
                    <div className="space-y-3">
                      {lead.historicoimports.map((importacao, index) => (
                        <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 border rounded-lg">
                          <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                            <History className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                {importacao.tipo}
                              </Badge>
                              <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">{importacao.origem}</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              {importacao.dataImportacao}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-6 sm:py-8 text-sm">Nenhuma importação encontrada</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <Separator className="my-3 sm:my-4" />
        
        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline" className="text-sm">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
