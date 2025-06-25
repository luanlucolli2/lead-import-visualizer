
import { useState } from "react";
import { X, Upload, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (type: string, file: File) => void;
}

export const ImportModal = ({ isOpen, onClose, onImport }: ImportModalProps) => {
  const [importType, setImportType] = useState("cadastrais");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simular validação de template
      if (file.name.includes("invalid")) {
        setErrors([
          "Coluna 'Email' não encontrada",
          "Coluna 'Data_Nascimento' fora da ordem esperada",
          "Formato de arquivo deve ser .xlsx"
        ]);
      } else {
        setErrors([]);
      }
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      onImport(importType, selectedFile);
      onClose();
      setSelectedFile(null);
      setErrors([]);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedFile(null);
    setErrors([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Importar Planilha</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Import Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Importação
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="importType"
                  value="cadastrais"
                  checked={importType === "cadastrais"}
                  onChange={(e) => setImportType(e.target.value)}
                  className="mr-3 text-blue-600"
                />
                <span className="text-sm text-gray-700">Dados Cadastrais</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="importType"
                  value="higienizacao"
                  checked={importType === "higienizacao"}
                  onChange={(e) => setImportType(e.target.value)}
                  className="mr-3 text-blue-600"
                />
                <span className="text-sm text-gray-700">Dados de Higienização</span>
              </label>
            </div>
          </div>

          {/* File Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecione o arquivo (template)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors duration-200">
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {selectedFile ? selectedFile.name : "Clique para selecionar arquivo .xlsx"}
                </span>
              </label>
            </div>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-red-800 mb-2">
                    Problemas encontrados no template:
                  </h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleClose}
            className="text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleImport}
            disabled={!selectedFile || errors.length > 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Iniciar Importação
          </Button>
        </div>
      </div>
    </div>
  );
};
