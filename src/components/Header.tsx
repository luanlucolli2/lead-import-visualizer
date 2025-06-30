
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import catarinenselogo from "../../public/catainenseLogo.png";

interface HeaderProps {
  onToggleSidebar: () => void;
  title?: string;
}

export const Header = ({ onToggleSidebar, title = "Sistema de Leads" }: HeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 w-full">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={onToggleSidebar}
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
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
