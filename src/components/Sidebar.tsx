
import { Home, Database, Users, Settings, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  { name: "Dashboard", icon: Home, active: true },
  { name: "Leads", icon: Users, active: false },
  { name: "Importações", icon: Database, active: false },
  { name: "Relatórios", icon: BarChart3, active: false },
  { name: "Configurações", icon: Settings, active: false },
];

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("w-60 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-30", className)}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">LeadsManager</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-200",
              item.active 
                ? "bg-blue-50 text-blue-700 border border-blue-200" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className={cn("w-5 h-5", item.active ? "text-blue-600" : "text-gray-500")} />
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
