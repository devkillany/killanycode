import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-[60vh] items-center justify-center space-y-4">
      <div className="flex items-center space-x-2">
        <div className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <div className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <div className="h-3 w-3 rounded-full bg-primary animate-bounce" />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Loading KillanyCode...</p>
    </div>
  );
}
