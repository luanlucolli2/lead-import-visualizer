
import { Home, FileText, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import catarinenselogo from "../../public/catainenseLogo.png";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      name: "Dashboard", 
      icon: Home, 
      path: "/",
      active: location.pathname === "/"
    },
    { 
      name: "Histórico de Importações", 
      icon: FileText, 
      path: "/importacoes/historico",
      active: location.pathname === "/importacoes/historico"
    },
    { 
      name: "Sair", 
      icon: LogOut, 
      path: null,
      active: false 
    },
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.name === "Sair") {
      console.log("Logout clicked");
    }
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <SidebarTrigger className="lg:hidden" />
          <img
            src={catarinenselogo}
            alt="Logo Catarinense"
            className="h-8 object-contain"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu className="p-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                onClick={() => handleMenuClick(item)}
                isActive={item.active}
                className="w-full justify-start"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
