import { cn } from "@/shared/utils/utils";
import DOMPurify from "isomorphic-dompurify";

interface DetailItemProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  renderAsHtml?: boolean;
}

export default function DetailItem({
  label,
  value,
  className,
  renderAsHtml = false,
}: DetailItemProps) {
  const content =
    renderAsHtml && typeof value === "string" ? (
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
    ) : (
      value
    );

  return (
    <div className={cn("py-2 px-4", className)}>
      <div className="text-sm font-medium text-zinc-950">{label}</div>
      <div className="text-sm text-zinc-800">{content}</div>
    </div>
  );
}
