import { useState } from "react";
import { ChevronDown, X, Filter, Calendar } from "lucide-react";
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface DashboardFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  category: string;
  subcategory: string;
  brand: string;
  geography: string;
  region: string;
  zone: string;
  city: string;
  inventoryState: string;
  timeFrame: string;
  dateRange: { from: Date | undefined; to: Date | undefined };
}

const categories = [
  { value: "beverages", label: "Beverages" },
  { value: "snacks", label: "Snacks" },
  { value: "dairy", label: "Dairy" },
  { value: "frozen", label: "Frozen" },
  { value: "confectionery", label: "Confectionery" },
];

const subcategories: Record<string, { value: string; label: string }[]> = {
  beverages: [
    { value: "energy-drinks", label: "Energy Drinks" },
    { value: "soft-drinks", label: "Soft Drinks" },
    { value: "water", label: "Water" },
    { value: "juice", label: "Juice" },
    { value: "sports-drinks", label: "Sports Drinks" },
  ],
  snacks: [
    { value: "crisps", label: "Crisps" },
    { value: "nuts", label: "Nuts" },
    { value: "popcorn", label: "Popcorn" },
  ],
  dairy: [
    { value: "milk", label: "Milk" },
    { value: "cheese", label: "Cheese" },
    { value: "yogurt", label: "Yogurt" },
  ],
  frozen: [
    { value: "ice-cream", label: "Ice Cream" },
    { value: "frozen-meals", label: "Frozen Meals" },
    { value: "frozen-veg", label: "Frozen Vegetables" },
  ],
  confectionery: [
    { value: "chocolate", label: "Chocolate" },
    { value: "sweets", label: "Sweets" },
  ],
};

const brands: Record<string, { value: string; label: string }[]> = {
  "energy-drinks": [
    { value: "red-bull", label: "Red Bull" },
    { value: "monster", label: "Monster" },
    { value: "lucozade", label: "Lucozade" },
    { value: "boost", label: "Boost" },
  ],
  "soft-drinks": [
    { value: "coca-cola", label: "Coca-Cola" },
    { value: "pepsi", label: "Pepsi" },
    { value: "fanta", label: "Fanta" },
  ],
  default: [
    { value: "all", label: "All Brands" },
    { value: "brand-a", label: "Brand A" },
    { value: "brand-b", label: "Brand B" },
  ],
};

const geographies = [
  { value: "uk", label: "United Kingdom" },
  { value: "ireland", label: "Ireland" },
  { value: "france", label: "France" },
];

const regions: Record<string, { value: string; label: string }[]> = {
  uk: [
    { value: "north", label: "North" },
    { value: "south", label: "South" },
    { value: "midlands", label: "Midlands" },
    { value: "london", label: "London" },
    { value: "scotland", label: "Scotland" },
    { value: "wales", label: "Wales" },
  ],
  ireland: [
    { value: "dublin", label: "Dublin" },
    { value: "cork", label: "Cork" },
  ],
  france: [
    { value: "paris", label: "Paris" },
    { value: "lyon", label: "Lyon" },
  ],
};

const zones: Record<string, { value: string; label: string }[]> = {
  london: [
    { value: "north-london", label: "North London" },
    { value: "south-london", label: "South London" },
    { value: "east-london", label: "East London" },
    { value: "west-london", label: "West London" },
    { value: "central-london", label: "Central London" },
  ],
  north: [
    { value: "north-east", label: "North East" },
    { value: "north-west", label: "North West" },
    { value: "yorkshire", label: "Yorkshire" },
  ],
  south: [
    { value: "south-east", label: "South East" },
    { value: "south-west", label: "South West" },
  ],
  midlands: [
    { value: "west-midlands", label: "West Midlands" },
    { value: "east-midlands", label: "East Midlands" },
  ],
};

const cities: Record<string, { value: string; label: string }[]> = {
  "north-london": [
    { value: "islington", label: "Islington" },
    { value: "camden", label: "Camden" },
    { value: "haringey", label: "Haringey" },
  ],
  "south-london": [
    { value: "lambeth", label: "Lambeth" },
    { value: "southwark", label: "Southwark" },
    { value: "lewisham", label: "Lewisham" },
  ],
  yorkshire: [
    { value: "leeds", label: "Leeds" },
    { value: "sheffield", label: "Sheffield" },
    { value: "york", label: "York" },
  ],
};

const inventoryStates = [
  { value: "all", label: "All States" },
  { value: "in-stock", label: "In Stock" },
  { value: "low-stock", label: "Low Stock (≤2 wks)" },
  { value: "overstock", label: "Overstock (>8 wks)" },
  { value: "oos", label: "Out of Stock" },
];

const timeFrames = [
  { value: "7d", label: "Last 7 Days" },
  { value: "mtd", label: "Month to Date" },
  { value: "qtd", label: "Quarter to Date" },
  { value: "ytd", label: "Year to Date" },
  { value: "13w", label: "Last 13 Weeks" },
  { value: "52w", label: "Rolling 52 Weeks" },
];

export function DashboardFilters({ onFilterChange }: DashboardFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: "beverages",
    subcategory: "energy-drinks",
    brand: "all",
    geography: "uk",
    region: "london",
    zone: "all",
    city: "all",
    inventoryState: "all",
    timeFrame: "mtd",
    dateRange: { from: undefined, to: undefined },
  });

  const [dateOpen, setDateOpen] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    
    // Reset dependent filters
    if (key === "category") {
      newFilters.subcategory = "";
      newFilters.brand = "all";
    }
    if (key === "subcategory") {
      newFilters.brand = "all";
    }
    if (key === "geography") {
      newFilters.region = "";
      newFilters.zone = "all";
      newFilters.city = "all";
    }
    if (key === "region") {
      newFilters.zone = "all";
      newFilters.city = "all";
    }
    if (key === "zone") {
      newFilters.city = "all";
    }
    
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const activeFiltersCount = Object.entries(filters).filter(
    ([key, value]) => value && value !== "all" && key !== "dateRange"
  ).length;

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      category: "",
      subcategory: "",
      brand: "all",
      geography: "",
      region: "",
      zone: "all",
      city: "all",
      inventoryState: "all",
      timeFrame: "mtd",
      dateRange: { from: undefined, to: undefined },
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const currentSubcategories = filters.category ? subcategories[filters.category] || [] : [];
  const currentBrands = filters.subcategory ? brands[filters.subcategory] || brands.default : brands.default;
  const currentRegions = filters.geography ? regions[filters.geography] || [] : [];
  const currentZones = filters.region ? zones[filters.region] || [] : [];
  const currentCities = filters.zone && filters.zone !== "all" ? cities[filters.zone] || [] : [];

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <div className="flex items-center gap-1 text-muted-foreground mr-2">
        <Filter className="w-4 h-4" />
        <span className="text-xs font-medium">Filters</span>
      </div>

      {/* Category */}
      <Select value={filters.category} onValueChange={(v) => updateFilter("category", v)}>
        <SelectTrigger className="h-8 w-[110px] text-xs">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Subcategory */}
      <Select 
        value={filters.subcategory} 
        onValueChange={(v) => updateFilter("subcategory", v)}
        disabled={!filters.category}
      >
        <SelectTrigger className="h-8 w-[130px] text-xs">
          <SelectValue placeholder="Subcategory" />
        </SelectTrigger>
        <SelectContent>
          {currentSubcategories.map((sub) => (
            <SelectItem key={sub.value} value={sub.value}>{sub.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Brand */}
      <Select value={filters.brand} onValueChange={(v) => updateFilter("brand", v)}>
        <SelectTrigger className="h-8 w-[110px] text-xs">
          <SelectValue placeholder="Brand" />
        </SelectTrigger>
        <SelectContent>
          {currentBrands.map((brand) => (
            <SelectItem key={brand.value} value={brand.value}>{brand.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Geography */}
      <Select value={filters.geography} onValueChange={(v) => updateFilter("geography", v)}>
        <SelectTrigger className="h-8 w-[120px] text-xs">
          <SelectValue placeholder="Geography" />
        </SelectTrigger>
        <SelectContent>
          {geographies.map((geo) => (
            <SelectItem key={geo.value} value={geo.value}>{geo.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Region */}
      <Select 
        value={filters.region} 
        onValueChange={(v) => updateFilter("region", v)}
        disabled={!filters.geography}
      >
        <SelectTrigger className="h-8 w-[100px] text-xs">
          <SelectValue placeholder="Region" />
        </SelectTrigger>
        <SelectContent>
          {currentRegions.map((reg) => (
            <SelectItem key={reg.value} value={reg.value}>{reg.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Zone */}
      <Select 
        value={filters.zone} 
        onValueChange={(v) => updateFilter("zone", v)}
        disabled={!filters.region}
      >
        <SelectTrigger className="h-8 w-[120px] text-xs">
          <SelectValue placeholder="Zone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Zones</SelectItem>
          {currentZones.map((zone) => (
            <SelectItem key={zone.value} value={zone.value}>{zone.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* City */}
      <Select 
        value={filters.city} 
        onValueChange={(v) => updateFilter("city", v)}
        disabled={currentCities.length === 0}
      >
        <SelectTrigger className="h-8 w-[100px] text-xs">
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cities</SelectItem>
          {currentCities.map((city) => (
            <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Inventory State */}
      <Select value={filters.inventoryState} onValueChange={(v) => updateFilter("inventoryState", v)}>
        <SelectTrigger className="h-8 w-[130px] text-xs">
          <SelectValue placeholder="Inventory" />
        </SelectTrigger>
        <SelectContent>
          {inventoryStates.map((state) => (
            <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Time Frame */}
      <Select value={filters.timeFrame} onValueChange={(v) => updateFilter("timeFrame", v)}>
        <SelectTrigger className="h-8 w-[130px] text-xs">
          <SelectValue placeholder="Time Frame" />
        </SelectTrigger>
        <SelectContent>
          {timeFrames.map((tf) => (
            <SelectItem key={tf.value} value={tf.value}>{tf.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date Range */}
      <Popover open={dateOpen} onOpenChange={setDateOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Calendar className="w-3 h-3" />
            {filters.dateRange.from ? (
              filters.dateRange.to ? (
                <>
                  {format(filters.dateRange.from, "dd MMM")} - {format(filters.dateRange.to, "dd MMM")}
                </>
              ) : (
                format(filters.dateRange.from, "dd MMM yyyy")
              )
            ) : (
              "Date Range"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <CalendarComponent
            mode="range"
            selected={{ from: filters.dateRange.from, to: filters.dateRange.to }}
            onSelect={(range) => {
              setFilters({ ...filters, dateRange: { from: range?.from, to: range?.to } });
              if (range?.to) setDateOpen(false);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* Active Filters Badge & Clear */}
      {activeFiltersCount > 0 && (
        <Badge variant="secondary" className="text-xs gap-1 cursor-pointer" onClick={clearFilters}>
          {activeFiltersCount} active
          <X className="w-3 h-3 hover:text-destructive" />
        </Badge>
      )}
    </div>
  );
}