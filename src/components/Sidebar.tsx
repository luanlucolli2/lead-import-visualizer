import { Home, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import catarinenselogo from "../../public/catainenseLogo.png";

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
      <div className="p-4 border-b border-gray-600 flex items-center justify-center">
        <img
          src={catarinenselogo}
          alt="Logo Catarinense"
          className="w-full h-16 object-contain"
        />
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-200",
              item.active
                ? "bg-green-700 text-white"
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
