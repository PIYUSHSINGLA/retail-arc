import { Bell, HelpCircle } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const profiles = [
  {
    name: "Piyush",
    role: "Category Manager",
    initials: "PM",
    email: "piyush@company.com",
    color: "bg-primary",
  },
  {
    name: "Manish",
    role: "CxO",
    initials: "MK",
    email: "manish@company.com",
    color: "bg-secondary",
  },
];

export function Header() {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 gap-4">
      {/* Left: Data Timestamp */}
      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="text-xs">
          Data as of {currentDate}, 09:00 GMT
        </Badge>
      </div>

      {/* Right: Actions & Profiles */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Two Profile Avatars */}
        <div className="flex items-center gap-2">
          {profiles.map((profile) => (
            <DropdownMenu key={profile.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className={`${profile.color} text-primary-foreground text-xs`}>
                          {profile.initials}
                        </AvatarFallback>
                      </Avatar>
                      {profile.role === "CxO" && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-warning rounded-full border-2 border-card" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{profile.name}</p>
                  <p className="text-xs text-muted-foreground">{profile.role}</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{profile.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {profile.email}
                    </span>
                    <Badge variant="outline" className="w-fit mt-1 text-[10px]">
                      {profile.role}
                    </Badge>
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
          ))}
        </div>
      </div>
    </header>
  );
}