import { useState, useEffect } from 'react';
import { InventoryItem } from '@/types';
import { fetchInventoryData } from '@/lib/data';
import { usePagination } from './usePagination';
import { useSorting } from './useSorting';
import { useFiltering } from './useFiltering';

export function useInventoryTableData() {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { filters, handleFilterChange, clearFilters, getFilteredData } = useFiltering();
  const { sortField, sortDirection, handleSort, getSortedData } = useSorting();

  const filteredData = getFilteredData(data);
  const sortedData = getSortedData(filteredData);

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    setCurrentPage,
  } = usePagination({
    totalItems: sortedData.length,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const inventoryData = await fetchInventoryData();
        setData(inventoryData);
        // console.log(inventoryData);
        
        setError(null);
      } catch (err) {
        setError("Failed to load inventory data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);



  return {
    data,
    loading,
    error,
    filters,
    sortField,
    sortDirection,
    currentPage,
    totalPages,
    currentItems,
    handleSort,
    sortedData,
    handleFilterChange,
    clearFilters,
    setCurrentPage,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems: sortedData.length,
  };
}