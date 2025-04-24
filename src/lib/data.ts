"use client";

import { InventoryItem } from "@/types";
import { getMockData } from "./mock-data";

export async function fetchInventoryData(): Promise<InventoryItem[]> {
  try {
    console.log("response");
    const response = await fetch("/api/inventory");

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    // If the API returns data in a different format, transform it here
    // This is a fallback in case the API structure is different
    if (!Array.isArray(data)) {
      if (data.data && Array.isArray(data.data)) {
        return data.data;
      }

      // If we can't find an array, return mock data
      return getMockData();
    }

    return data;
  } catch (error) {
    console.error("Error fetching inventory data:", error);

    // Return mock data if the API fails
    return getMockData();
  }
}

export const InventoryTableHeaderData = [
  {
    field: "component_name",
    label: "Parent Component",
    className: "w-[200px] text-center",
  },
  { field: "subcomponent_name", label: "Sub Component", className: "w-[200px]" },
  { field: "total_quantity", label: "Available Qty" },
  { field: "discarded_quantity", label: "Replaced" },
  { field: "damaged_quantity", label: "Damaged" },
  { field: "alert", label: "Alert" },
  { field: "action", label: "Action", sortable: false },
];


