import { Skeleton } from "@/components/ui/skeleton"

// Loading skeleton
export function TableSkeleton() {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[200px] bg-gray-800" />
          <Skeleton className="h-10 w-[200px] bg-gray-800" />
        </div>
        <div className="rounded-md border border-gray-800">
          <div className="bg-gray-900 p-4">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-[150px] bg-gray-800" />
              <Skeleton className="h-6 w-[150px] bg-gray-800" />
              <Skeleton className="h-6 w-[100px] bg-gray-800" />
              <Skeleton className="h-6 w-[100px] bg-gray-800" />
              <Skeleton className="h-6 w-[100px] bg-gray-800" />
              <Skeleton className="h-6 w-[100px] bg-gray-800" />
            </div>
          </div>
          <div className="p-4 space-y-4">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-6 w-[150px] bg-gray-800" />
                  <Skeleton className="h-6 w-[150px] bg-gray-800" />
                  <Skeleton className="h-6 w-[100px] bg-gray-800" />
                  <Skeleton className="h-6 w-[100px] bg-gray-800" />
                  <Skeleton className="h-6 w-[100px] bg-gray-800" />
                  <Skeleton className="h-6 w-[100px] bg-gray-800" />
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }