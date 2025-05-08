import { cn } from "@/shared/utils/utils";

interface DetailItemProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export default function DetailItem({
  label,
  value,
  className,
}: DetailItemProps) {
  return (
    <div className={cn("py-2 px-4", className)}>
      <div className="text-sm font-medium text-zinc-950">{label}</div>
      <div className="text-sm text-zinc-800">{value}</div>
    </div>
  );
}
