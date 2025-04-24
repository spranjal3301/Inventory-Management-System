import { useState } from 'react';
import { InventoryItem } from '@/types';

export function useFiltering() {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => setFilters({});

  const getFilteredData = (data: InventoryItem[]) => {
    return data
      .map((item) => {
        const matchesParent = !filters.parentComponent ||
          item.component_name.toLowerCase().includes(filters.parentComponent.toLowerCase());

        const filteredSubcomponents = (item.subcomponents || []).filter((sub) => {
          const matchesSub =
            !filters.subComponent ||
            sub.component_name.toLowerCase().includes(filters.subComponent.toLowerCase());

          const availableQty = sub.total_quantity - (sub.damaged_quantity || 0) - (sub.discarded_quantity || 0);
          const matchesAvailableQty =
            !filters.availableQty ||
            (filters.availableQty === "0" && availableQty === 0) ||
            (filters.availableQty === "5" && availableQty < 5);

          return matchesSub && matchesAvailableQty;
        });

        if (matchesParent && (filteredSubcomponents.length > 0 || !filters.subComponent)) {
          return { ...item, subcomponents: filteredSubcomponents };
        }

        return null;
      })
      .filter(Boolean) as InventoryItem[];
  };

  return {
    filters,
    handleFilterChange,
    clearFilters,
    getFilteredData,
  };
}