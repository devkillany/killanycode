import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container px-4 py-8 md:py-12 space-y-8 animate-pulse">
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-64 rounded-3xl border border-primary/5 bg-muted/5 p-8 flex flex-col items-center justify-between">
            <Skeleton className="h-20 w-20 rounded-2xl" />
            <div className="space-y-2 w-full flex flex-col items-center">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2 w-full">
              <Skeleton className="h-6 flex-1 rounded-full" />
              <Skeleton className="h-6 flex-1 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
