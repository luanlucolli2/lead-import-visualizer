
import { Home, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  { name: "Dashboard", icon: Home, active: true },
  { name: "Sair", icon: LogOut, active: false },
];

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("w-60 bg-[#333] h-screen fixed left-0 top-0 z-30", className)}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">LeadsManager</span>
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
                ? "bg-blue-600 text-white" 
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            )}
          >
            <item.icon className={cn("w-5 h-5", item.active ? "text-white" : "text-gray-400")} />
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
