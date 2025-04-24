// import { InventoryItem } from "@/lib/data";
import { InventoryItem } from "@/types";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

interface SortIcon {
  field: string;
  sortField: keyof InventoryItem | null;
  sortDirection: "asc" | "desc";
}

// Helper component for sort icons
export function SortIcon({ field, sortField, sortDirection }: SortIcon) {
  if (sortField !== field) {
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  }

  return sortDirection === "asc" ? (
    <ChevronUp className="ml-2 h-4 w-4" />
  ) : (
    <ChevronDown className="ml-2 h-4 w-4" />
  );
}
