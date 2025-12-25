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
    category: "",
    subcategory: "",
    brand: "",
    geography: "",
    region: "",
    zone: "",
    city: "",
    inventoryState: "",
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

  const FilterSelect = ({ 
    label, 
    value, 
    onValueChange, 
    options, 
    placeholder, 
    disabled = false,
    width = "w-[120px]"
  }: { 
    label: string;
    value: string; 
    onValueChange: (v: string) => void; 
    options: { value: string; label: string }[];
    placeholder: string;
    disabled?: boolean;
    width?: string;
  }) => (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={`h-8 ${width} text-xs`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide border-b mb-1">
          {label}
        </div>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <div className="flex items-center gap-1 text-muted-foreground mr-2">
        <Filter className="w-4 h-4" />
        <span className="text-xs font-medium">Filters</span>
      </div>

      {/* Category */}
      <FilterSelect
        label="Category"
        value={filters.category}
        onValueChange={(v) => updateFilter("category", v)}
        options={categories}
        placeholder="Category"
        width="w-[110px]"
      />

      {/* Subcategory */}
      <FilterSelect
        label="Subcategory"
        value={filters.subcategory}
        onValueChange={(v) => updateFilter("subcategory", v)}
        options={currentSubcategories}
        placeholder="Subcategory"
        disabled={!filters.category}
        width="w-[130px]"
      />

      {/* Brand */}
      <FilterSelect
        label="Brand"
        value={filters.brand}
        onValueChange={(v) => updateFilter("brand", v)}
        options={currentBrands}
        placeholder="Brand"
        disabled={!filters.subcategory}
        width="w-[110px]"
      />

      {/* Geography */}
      <FilterSelect
        label="Geography"
        value={filters.geography}
        onValueChange={(v) => updateFilter("geography", v)}
        options={geographies}
        placeholder="Geography"
        width="w-[120px]"
      />

      {/* Region */}
      <FilterSelect
        label="Region"
        value={filters.region}
        onValueChange={(v) => updateFilter("region", v)}
        options={currentRegions}
        placeholder="Region"
        disabled={!filters.geography}
        width="w-[100px]"
      />

      {/* Zone */}
      <FilterSelect
        label="Zone"
        value={filters.zone}
        onValueChange={(v) => updateFilter("zone", v)}
        options={[{ value: "all", label: "All Zones" }, ...currentZones]}
        placeholder="Zone"
        disabled={!filters.region}
        width="w-[120px]"
      />

      {/* City */}
      <FilterSelect
        label="City"
        value={filters.city}
        onValueChange={(v) => updateFilter("city", v)}
        options={[{ value: "all", label: "All Cities" }, ...currentCities]}
        placeholder="City"
        disabled={currentCities.length === 0}
        width="w-[100px]"
      />

      {/* Inventory State */}
      <FilterSelect
        label="Inventory State"
        value={filters.inventoryState}
        onValueChange={(v) => updateFilter("inventoryState", v)}
        options={inventoryStates}
        placeholder="Inventory"
        width="w-[130px]"
      />

      {/* Time Frame */}
      <FilterSelect
        label="Time Frame"
        value={filters.timeFrame}
        onValueChange={(v) => updateFilter("timeFrame", v)}
        options={timeFrames}
        placeholder="Time Frame"
        width="w-[130px]"
      />

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
          <div className="px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide border-b">
            Date Range
          </div>
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