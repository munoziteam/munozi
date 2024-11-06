import { cn } from "@/lib/utils";

export default function CircleCount({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-gordita scale-75 flex items-center justify-center rounded-full bg-red-600  text-white p-1 min-w-[2rem] min-h-[2rem]",
        className
      )}
      style={{ aspectRatio: "1 / 1" }}
    >
      {count}
    </div>
  );
}
