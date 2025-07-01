
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail, Building2 } from "lucide-react";

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
        description: "Redirecionando para o sistema..."
      });
      navigate("/");
    } else {
      // Login com falha
      toast.error("Credenciais inválidas", {
        description: "Verifique seu email e senha e tente novamente."
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-sidebar-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-sidebar-background via-sidebar-background to-sidebar-accent/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm border-sidebar-border shadow-2xl shadow-black/10">
        <CardHeader className="space-y-6 pb-8 text-center">
          {/* Logo e Branding */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-sidebar-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-sidebar-primary-foreground" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-sidebar-foreground tracking-tight">
                Catarinense
              </h1>
              <p className="text-sm text-sidebar-foreground/70 font-medium">
                Soluções Financeiras
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-sidebar-foreground">
              Acesse sua conta
            </h2>
            <p className="text-sm text-sidebar-foreground/60">
              Entre com suas credenciais para continuar
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sidebar-foreground font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sidebar-foreground/50" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10 h-12 bg-sidebar-background/50 border-sidebar-border focus:border-sidebar-primary focus:ring-sidebar-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sidebar-foreground font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sidebar-foreground/50" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pl-10 pr-10 h-12 bg-sidebar-background/50 border-sidebar-border focus:border-sidebar-primary focus:ring-sidebar-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-sidebar-primary-foreground/30 border-t-sidebar-primary-foreground rounded-full animate-spin" />
                  Entrando...
                </div>
              ) : (
                "Entrar no Sistema"
              )}
            </Button>
          </form>

          {/* Credenciais de teste */}
          <div className="mt-8 p-4 bg-sidebar-accent/30 rounded-xl border border-sidebar-border/50">
            <div className="text-center space-y-2">
              <p className="text-xs font-semibold text-sidebar-foreground/80 uppercase tracking-wide">
                Credenciais de Demonstração
              </p>
              <div className="text-xs text-sidebar-foreground/70 space-y-1">
                <p><span className="font-medium">Email:</span> admin@catarinense.com</p>
                <p><span className="font-medium">Senha:</span> 123456</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
