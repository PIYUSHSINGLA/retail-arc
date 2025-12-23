import { Bell, HelpCircle, Plus, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalFilters } from "@/components/filters/GlobalFilters";

export function Header() {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 gap-4">
      {/* Left: User Context */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              CM
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Category Manager</p>
            <p className="text-xs text-muted-foreground">Energy Drinks</p>
          </div>
        </div>
        <Badge variant="secondary" className="hidden lg:flex text-xs">
          Data as of {currentDate}, 09:00 GMT
        </Badge>
      </div>

      {/* Center: Global Filters */}
      <div className="flex-1 max-w-3xl hidden xl:block">
        <GlobalFilters />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden md:flex gap-2">
          <Plus className="w-4 h-4" />
          Create Scenario
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Download className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Share2 className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2 hidden md:block" />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>John Doe</span>
                <span className="text-xs font-normal text-muted-foreground">
                  john.doe@company.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
