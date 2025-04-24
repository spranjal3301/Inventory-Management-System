import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortIcon } from "./sort-icon";
import { cn } from "@/lib/utils";
import { InventoryTableHeaderData as columns } from "@/lib/data";
import { InventoryItem } from "@/types";

interface InventoryTableHeaderProps {
  sortField: keyof InventoryItem | null;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
}

export function InventoryTableHeader({
  sortField,
  sortDirection,
  onSort,
}: InventoryTableHeaderProps) {


  return (
    <TableHeader className="bg-[#09090b] text-white">
      <TableRow>
        {columns.map((column) => (
          <TableHead
            key={column.label}
            className={cn(`text-white font-bold`, column?.className)}
          >
            {column?.sortable === false ? (
              column.label
            ) : (
              <div
                className={`flex items-center cursor-pointer justify-center font-bold text-md`}
                onClick={() => onSort(column.field)}
              >
                {column.label}
                <SortIcon
                  field={column.field}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </div>
            )}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}