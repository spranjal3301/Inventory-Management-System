// import { InventoryItem } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { InventoryItem, Subcomponent } from "@/types";
import { Badge } from "./ui/badge";

// Helper component for table row groups
export function TableRowGroup({
  parent,
  items,
}: {
  parent: string;
  items: Subcomponent[];
}) {
  const renderAlertStatus = (item: Number) => {
    if (item === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (item == 1) {
      return (
        <Badge variant="warning" className="bg-amber-500 hover:bg-amber-600">
          Low Stock
        </Badge>
      );
    }
    return (
      <Badge variant="default" className="bg-green-500 hover:bg-green-600">
        In-Stock
      </Badge>
    );
  };

  return (
    <>
      {items.map((item, index) => (
        <TableRow key={item.component_id}>
          {index === 0 ? (
            <TableCell
              rowSpan={items.length}
              className="font-medium text-center border-b"
            >
              {parent}
            </TableCell>
          ) : null}
          <TableCell
            className={cn(
              "font-medium text-center ",
              items.length - 1 === index ? "border-b" : ""
            )}
          >
            {item.component_name}
          </TableCell>
          <TableCell
            className={cn(
              "font-medium text-center ",
              items.length - 1 === index ? "border-b" : ""
            )}
          >
            {item.total_quantity}
          </TableCell>
          <TableCell
            className={cn(
              "font-medium text-center ",
              items.length - 1 === index ? "border-b" : ""
            )}
          >
            {item.discarded_quantity}
          </TableCell>
          <TableCell
            className={cn(
              "font-medium text-center ",
              items.length - 1 === index ? "border-b" : ""
            )}
          >
            {item.damaged_quantity}
          </TableCell>
          {0 === index ? (
            <TableCell
              rowSpan={items.length}
              className={cn("font-medium text-center border-b")}
            >
              {renderAlertStatus(Math.round(Math.random() * 100) % 3)}
            </TableCell>
          ) : null}

          {0 === index ? (
            <TableCell rowSpan={items.length} className={cn("border-b")}>
              <Button variant={"outline"} size="sm" className="cursor-pointer">
                Raise RFQ
              </Button>
            </TableCell>
          ) : null}
        </TableRow>
      ))}
    </>
  );
}
