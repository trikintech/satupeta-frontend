import { cn } from "@/shared/utils/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("p-6 pb-2", className)}>
      <div className="text-2xl font-bold">{title}</div>
      {description && (
        <div className="text-zinc-500 text-[16px]">{description}</div>
      )}
    </div>
  );
}
