import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RelatorioErrosModal } from "@/components/modals/RelatorioErrosModal";
import { AppLayout } from "@/components/AppLayout";
import {
  mockImportJobs,
  fetchErrorsForJob,
  ImportJob,
  ImportError,
} from "@/api/mockData";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileText, Eye } from "lucide-react";

const HistoricoPage = () => {
  const [jobs, setJobs] = useState<ImportJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<ImportJob | null>(null);
  const [errors, setErrors] = useState<ImportError[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingErrors, setLoadingErrors] = useState(false);

  useEffect(() => {
    // Simula busca de dados
    setJobs(mockImportJobs);
  }, []);

  const handleViewReport = async (job: ImportJob) => {
    if (job.status === 'Em Progresso') return;

    setLoadingErrors(true);
    setSelectedJob(job);
    
    try {
      const jobErrors = await fetchErrorsForJob(job.id);
      setErrors(jobErrors);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar erros:', error);
    } finally {
      setLoadingErrors(false);
    }
  };

  const getStatusBadge = (status: ImportJob['status']) => {
    const variants = {
      'Concluído': 'default',
      'Falhou': 'destructive',
      'Em Progresso': 'secondary',
    } as const;

    const colors = {
      'Concluído': 'bg-green-100 text-green-800 hover:bg-green-100',
      'Falhou': 'bg-red-100 text-red-800 hover:bg-red-100',
      'Em Progresso': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    };

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type: ImportJob['type']) => {
    const colors = {
      'Cadastral': 'bg-purple-100 text-purple-800 hover:bg-purple-100',
      'Higienização': 'bg-orange-100 text-orange-800 hover:bg-orange-100',
    };

    return (
      <Badge variant="outline" className={colors[type]}>
        {type}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR });
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6 px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">Histórico de Importações</CardTitle>
                <CardDescription>
                  Visualize e gerencie o histórico de importações de leads
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Arquivo Importado</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Erros</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Importado por</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">
                        {job.fileName}
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(job.type)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(job.status)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            job.errorCount > 0
                              ? "text-red-600 font-bold"
                              : "text-gray-500"
                          }
                        >
                          {job.errorCount}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(job.finishedAt)}
                      </TableCell>
                      <TableCell>{job.user.name}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReport(job)}
                          disabled={job.status === 'Em Progresso' || loadingErrors}
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Ver Relatório
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {jobs.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhuma importação encontrada</p>
              </div>
            )}
          </CardContent>
        </Card>

        <RelatorioErrosModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedJob(null);
            setErrors([]);
          }}
          job={selectedJob}
          errors={errors}
        />
      </div>
    </AppLayout>
  );
};

export default HistoricoPage;
