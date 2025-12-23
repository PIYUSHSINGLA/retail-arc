import { useState } from "react";
import { ChevronDown, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GlobalFilters() {
  const [category, setCategory] = useState("beverages");
  const [channel, setChannel] = useState("all");
  const [dateRange, setDateRange] = useState("mtd");

  const activeFiltersCount = [category, channel, dateRange].filter(
    (f) => f && f !== "all"
  ).length;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-2 py-1.5">
        <Filter className="w-4 h-4 text-muted-foreground" />
        
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-7 w-[130px] border-0 bg-transparent text-xs font-medium">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beverages">Beverages</SelectItem>
            <SelectItem value="snacks">Snacks</SelectItem>
            <SelectItem value="dairy">Dairy</SelectItem>
            <SelectItem value="frozen">Frozen</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-px h-4 bg-border" />

        <Select value={channel} onValueChange={setChannel}>
          <SelectTrigger className="h-7 w-[100px] border-0 bg-transparent text-xs font-medium">
            <SelectValue placeholder="Channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            <SelectItem value="store">Store</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="wholesale">Wholesale</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-px h-4 bg-border" />

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="h-7 w-[90px] border-0 bg-transparent text-xs font-medium">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7D</SelectItem>
            <SelectItem value="mtd">MTD</SelectItem>
            <SelectItem value="qtd">QTD</SelectItem>
            <SelectItem value="ytd">YTD</SelectItem>
            <SelectItem value="13w">Last 13W</SelectItem>
            <SelectItem value="52w">Rolling 52W</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              More
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Additional Filters</h4>
                <p className="text-xs text-muted-foreground">
                  Refine your data view with advanced filters
                </p>
              </div>
              <div className="grid gap-2">
                <Select>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Geography" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="north">North</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    <SelectItem value="brand-a">Brand A</SelectItem>
                    <SelectItem value="brand-b">Brand B</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Inventory State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="overstock">Overstock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  Save View
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  Share
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {activeFiltersCount > 0 && (
        <Badge variant="secondary" className="text-xs gap-1">
          {activeFiltersCount} active
          <X className="w-3 h-3 cursor-pointer hover:text-destructive" />
        </Badge>
      )}

      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
        vs LY
      </Button>
    </div>
  );
}
