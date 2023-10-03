import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex space-x-2">
      <Skeleton className="w-[10px] h-[10px] rounded-full bg-foreground delay-400" />
      <Skeleton className="w-[10px] h-[10px] rounded-full bg-foreground delay-500" />
      <Skeleton className="w-[10px] h-[10px] rounded-full bg-foreground delay-700" />
    </div>
  );
}
