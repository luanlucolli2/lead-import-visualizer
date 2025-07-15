
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User className="h-6 w-6" />
            Detalhes do Lead
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="dados" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dados" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Dados Básicos
            </TabsTrigger>
            <TabsTrigger value="telefones" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Telefones
            </TabsTrigger>
            <TabsTrigger value="contratos" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Contratos
            </TabsTrigger>
            <TabsTrigger value="historico" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Histórico
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            <TabsContent value="dados" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informações Pessoais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                      <p className="text-base font-semibold">{lead.nome}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">CPF</label>
                      <p className="text-base font-mono">{formatCPF(lead.cpf)}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Data de Nascimento</label>
                      <p className="text-base">{lead.dataNascimento}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Status e Classificação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={lead.status === "Elegível" ? "default" : "secondary"}
                          className={cn(
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
                      <label className="text-sm font-medium text-muted-foreground">Tipo de Consulta</label>
                      <p className="text-base">{lead.tipoConsulta}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Classe</label>
                      <Badge
                        variant="outline"
                        className={cn(
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
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Informações Financeiras
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-blue-700">Saldo Total</label>
                      <p className="text-2xl font-bold text-blue-900">{formatCurrency(lead.saldo)}</p>
                      <p className="text-xs text-blue-600 mt-1">Valor total de FGTS retornado pelo robô</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-green-700">Valor Liberado</label>
                      <p className="text-2xl font-bold text-green-900">{formatCurrency(lead.libera)}</p>
                      <p className="text-xs text-green-600 mt-1">Valor disponível para liberação</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="telefones" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Telefones de Contato
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {lead.telefones && lead.telefones.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lead.telefones.slice(0, 4).map((telefone, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-mono text-base">{formatPhone(telefone.numero)}</p>
                            <p className="text-sm text-muted-foreground">Telefone {index + 1}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
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
                    <p className="text-muted-foreground text-center py-8">Nenhum telefone cadastrado</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contratos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Contratos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {lead.contratos && lead.contratos.length > 0 ? (
                    <div className="space-y-4">
                      {lead.contratos.map((contrato, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Calendar className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">Contrato #{index + 1}</p>
                              <p className="text-sm text-muted-foreground">Data: {contrato.dataContrato}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{contrato.vendedor}</p>
                            <p className="text-sm text-muted-foreground">Vendedor</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">Nenhum contrato encontrado</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Histórico de Importações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {lead.historicoimports && lead.historicoimports.length > 0 ? (
                    <div className="space-y-3">
                      {lead.historicoimports.map((importacao, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <History className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {importacao.tipo}
                              </Badge>
                              <span className="text-sm font-medium">{importacao.origem}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {importacao.dataImportacao}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">Nenhuma importação encontrada</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <Separator className="my-4" />
        
        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
