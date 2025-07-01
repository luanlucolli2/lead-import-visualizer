
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import catarinenselogo from "../../public/catainenseLogo.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validar credenciais
    if (formData.email === "admin@catarinense.com" && formData.password === "123456") {
      // Login bem-sucedido
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login realizado com sucesso!");
      navigate("/");
    } else {
      // Login com falha
      toast.error("Email ou senha inválidos.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#333] flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#333] via-[#2a2a2a] to-[#1a1a1a] opacity-90"></div>
      
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 relative z-10">
        <CardHeader className="space-y-6 pb-8 pt-8">
          {/* Logo Area */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <img
                src={catarinenselogo}
                alt="Logo Catarinense"
                className="h-16 object-contain"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Sistema de Leads</h1>
              <p className="text-sm text-gray-600">Acesse sua conta para continuar</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-12 pr-12 border-gray-300 focus:border-green-500 focus:ring-green-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Credenciais de teste */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 text-center font-medium mb-2">
              Credenciais de teste:
            </p>
            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>Email: admin@catarinense.com</p>
              <p>Senha: 123456</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2024 Catarinense Soluções Financeiras
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
