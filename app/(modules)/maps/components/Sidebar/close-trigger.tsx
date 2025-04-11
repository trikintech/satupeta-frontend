import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

type CloseTriggerProps = {
  onClose: () => void;
};

export default function CloseTrigger({ onClose }: Readonly<CloseTriggerProps>) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClose}
      className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
    >
      <ChevronLeft className="h-5 w-5 text-gray-700" />
    </Button>
  );
}
