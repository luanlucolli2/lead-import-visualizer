
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
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
      toast.success("Login realizado com sucesso!", {
        style: {
          background: "#10b981",
          color: "#ffffff",
          border: "1px solid #059669"
        }
      });
      navigate("/");
    } else {
      // Login com falha
      toast.error("Email ou senha inválidos.", {
        style: {
          background: "#ef4444",
          color: "#ffffff",
          border: "1px solid #dc2626"
        }
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#333] to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto mb-4 shadow-xl">
            <img
              src={catarinenselogo}
              alt="Logo Catarinense"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Catarinense</h1>
          <p className="text-gray-300 text-sm">Soluções Financeiras</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900">Bem-vindo</h2>
              <p className="text-gray-600 text-sm mt-1">Acesse sua conta para continuar</p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite seu email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10 h-12 border-gray-200 focus:border-[#333] focus:ring-[#333] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#333] focus:ring-[#333] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-[#333] hover:bg-gray-800 text-white transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Entrando...
                  </div>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            {/* Credenciais de teste */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <p className="text-xs text-gray-600 font-medium mb-2">
                  Credenciais de teste:
                </p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Email:</span> admin@catarinense.com
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Senha:</span> 123456
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-xs">
            © 2024 Catarinense. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
