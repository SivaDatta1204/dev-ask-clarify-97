import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center gap-4">
        <div className="text-primary font-bold text-xl">TEKION</div>
        <div className="text-foreground font-medium">Developer Forum</div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search questions, tags, or users..." 
            className="pl-10"
          />
        </div>
      </div>

      {/* User section */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">AC</span>
          </div>
          <span className="text-sm font-medium">APC Control Center</span>
        </div>
      </div>
    </header>
  );
}