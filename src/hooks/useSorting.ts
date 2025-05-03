import { useState } from "react";
import { InventoryItem } from "@/types";

export function useSorting() {
  const [sortField, setSortField] = useState<keyof InventoryItem | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof InventoryItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortedData = (data: InventoryItem[]) => {
    if (!sortField) return data;

    const compare = (aVal: any, bVal: any) => {
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal ?? "").toLowerCase();
      const bStr = String(bVal ?? "" ).toLowerCase();
      return sortDirection === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    };

    // Top-level component_name sort
    if (sortField === "component_name") {
      return data.sort((a, b) => compare(a.component_name, b.component_name));
    }


    

    
    const sorted = [...data].map((component) => {
      if (Array.isArray(component.subcomponents)) {
        const sortedSubs = [...component.subcomponents].sort((a, b) => {
          if (sortField === "subcomponent_name") {
            return compare(a.component_name, b.component_name);
          } else if (
            (
              [
                "total_quantity",
                "discarded_quantity",
                "damaged_quantity",
              ] as (keyof InventoryItem)[]
            ).includes(sortField)
          ) {
            //@ts-ignore
            return compare(a[sortField], b[sortField]);
          }
          return 0;
        });
        return { ...component, subcomponents: sortedSubs };
      }
      return component;
    });

  
    sorted.sort((a, b) => {
      const c = a.subcomponents.reduce((acc, ele) => acc + (ele.total_quantity || 0), 0);
      const d = b.subcomponents.reduce((acc, ele) => acc + (ele.total_quantity || 0), 0);
      return c - d;
    });
    
    
    return sorted;
  };

  return {
    sortField,
    sortDirection,
    handleSort,
    getSortedData,
  };
}
