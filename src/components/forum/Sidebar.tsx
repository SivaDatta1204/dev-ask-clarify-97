import { 
  LayoutDashboard, 
  Database, 
  Target, 
  Users, 
  BarChart, 
  FileText, 
  Activity, 
  Settings,
  MessageSquare,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { label: "PD", icon: LayoutDashboard, active: false },
  { label: "DD", icon: Database, active: false },
  { label: "AD", icon: Target, active: false },
  { label: "UM", icon: Users, active: false },
  { label: "TD", icon: BarChart, active: false },
  { label: "AD", icon: FileText, active: false },
  { label: "LD", icon: Activity, active: false },
  { label: "D", icon: MessageSquare, active: true },
  { label: "UG", icon: Settings, active: false },
  { label: "DC", icon: HelpCircle, active: false },
];

export function Sidebar() {
  return (
    <div className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">T</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "w-full h-12 flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
              item.active && "bg-sidebar-accent border-r-2 border-primary"
            )}
          >
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
          <span className="text-xs font-medium">S</span>
        </div>
      </div>
    </div>
  );
}