
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import catarinenselogo from "../../public/catainenseLogo.png";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full max-w-full overflow-x-hidden">
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`flex-1 transition-all duration-300 min-w-0 max-w-full ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        {/* Global Header */}
        <div className="bg-white border-b border-gray-200 w-full">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                variant="outline"
                size="sm"
                className="lg:hidden flex items-center justify-center px-2 border-gray-300 hover:bg-gray-50"
              >
                <Menu className="w-4 h-4" />
                <span className="ml-2">Menu</span>
              </Button>
              
              <div className="flex items-center gap-2">
                <img
                  src={catarinenselogo}
                  alt="Logo Catarinense"
                  className="h-8 object-contain"
                />
                <h1 className="text-lg font-semibold text-gray-900">Sistema de Leads</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="min-h-[calc(100vh-73px)]">
          {children}
        </div>
      </div>
    </div>
  );
};
