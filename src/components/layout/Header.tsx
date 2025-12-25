import { useState } from "react";
import { Bell, HelpCircle, ChevronDown, User } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const profiles = [
  {
    id: "piyush",
    name: "Piyush Sharma",
    role: "Category Manager",
    initials: "PS",
    email: "piyush.sharma@company.com",
    color: "bg-primary",
    avatar: null,
  },
  {
    id: "manish",
    name: "Manish Patel",
    role: "CxO",
    initials: "MP",
    email: "manish.patel@company.com",
    color: "bg-secondary",
    avatar: null,
  },
];

export function Header() {
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleProfileChange = (profileId: string) => {
    const profile = profiles.find((p) => p.id === profileId);
    if (profile) {
      setSelectedProfile(profile);
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 gap-4">
      {/* Left: Data Timestamp */}
      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="text-xs">
          Data as of {currentDate}, 09:00 GMT
        </Badge>
      </div>

      {/* Right: Actions & Profile Selector */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Profile Dropdown Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className={`${selectedProfile.color} text-primary-foreground text-xs`}>
                  {selectedProfile.initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium">{selectedProfile.name}</p>
                <p className="text-[10px] text-muted-foreground">{selectedProfile.role}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-popover">
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Switch Profile
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {profiles.map((profile) => (
              <DropdownMenuItem
                key={profile.id}
                onClick={() => handleProfileChange(profile.id)}
                className={`flex items-center gap-3 cursor-pointer ${
                  selectedProfile.id === profile.id ? "bg-accent" : ""
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`${profile.color} text-primary-foreground text-xs`}>
                    {profile.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{profile.name}</p>
                  <p className="text-xs text-muted-foreground">{profile.email}</p>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {profile.role}
                </Badge>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
