"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Pagination } from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchInventoryData } from "@/lib/data";
import { TableSkeleton } from "./table-skeleton";
import { TableRowGroup } from "./table-row-group";
import { SortIcon } from "./sort-icon";
import { InventoryTableHeader } from "./inventory-table-head";
import { InventoryItem } from "@/types";
import { useInventoryTableData } from "@/hooks/useInventoryTableData";

export function InventoryTable() {
  // useInventoryTableData
  // usePagination
  // useSorting
  // useFiltering

  const {
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
    totalItems,
  } = useInventoryTableData();
  

  if (loading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter by parent component"
              className="pl-8 w-full md:w-[200px] bg-[#09090b] truncate"
              value={filters.parentComponent || ""}
              onChange={(e) =>
                handleFilterChange("parentComponent", e.target.value)
              }
            />
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter by sub component"
              className="pl-8 w-full md:w-[200px] bg-[#09090b] truncate"
              value={filters.subComponent || ""}
              onChange={(e) =>
                handleFilterChange("subComponent", e.target.value)
              }
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-[#09090b]">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#09090b] border-gray-800 text-gray-400"
            >
              <DropdownMenuItem
                onClick={() => handleFilterChange("availableQty", "0")}
              >
                Out of Stock
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilterChange("availableQty", "5")}
              >
                Low Stock (&lt; 5)
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-blue-500 hover:bg-[#09090b]"
                onClick={() => clearFilters()}
              >
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table className="w-full">
          <InventoryTableHeader
            sortDirection={sortDirection}
            onSort={handleSort}
            sortField={sortField}
          />

          <TableBody>
            {currentItems.map((items,index) => (
              <TableRowGroup
                key={index}
                parent={items.component_name}
                items={items.subcomponents}
              />
            ))}

            {currentItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col-reverse gap-5 items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length}{" "}
          items
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
