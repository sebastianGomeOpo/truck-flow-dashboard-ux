
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Skeleton } from "./ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({ rows = 6, columns = 8 }: TableSkeletonProps) {
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            {Array(columns).fill(0).map((_, i) => (
              <TableHead key={`header-${i}`}>
                <Skeleton className="h-4 w-[80px]" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(rows).fill(0).map((_, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              {Array(columns).fill(0).map((_, colIndex) => (
                <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                  <Skeleton 
                    className={`h-4 w-[${Math.floor(Math.random() * 60) + 40}%]`} 
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
