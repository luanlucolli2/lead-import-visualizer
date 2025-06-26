
import { Home, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import catarinenselogo from "../../public/catainenseLogo.png";

interface SidebarProps {
  className?: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { name: "Dashboard", icon: Home, active: true },
  { name: "Sair", icon: LogOut, active: false },
];

export const Sidebar = ({ className, isCollapsed, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-30 h-screen bg-[#333] transition-all duration-300 ease-in-out",
        isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "translate-x-0 w-60",
        className
      )}>
        {/* Header with Hamburger and Logo */}
        <div className="p-4 border-b border-gray-600 flex items-center justify-between min-h-[73px]">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-gray-700 p-2 flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </Button>
          {!isCollapsed && (
            <div className="flex-1 flex justify-center ml-2">
              <img
                src={catarinenselogo}
                alt="Logo Catarinense"
                className="h-10 object-contain"
              />
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={cn(
                "w-full flex items-center px-3 py-3 rounded-lg text-left transition-colors duration-200",
                isCollapsed ? "justify-center" : "space-x-3",
                item.active
                  ? "bg-green-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0", 
                item.active ? "text-white" : "text-gray-400"
              )} />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.name}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};
