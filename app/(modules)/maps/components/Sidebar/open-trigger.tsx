import { Button } from "@/shared/components/ui/button";
import { ChevronRight } from "lucide-react";

type OpenTriggerProps = {
  onOpen: () => void;
};

export default function OpenTrigger({ onOpen }: Readonly<OpenTriggerProps>) {
  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden transition-all hover:shadow-md">
      <Button
        variant="default"
        size="lg"
        onClick={onOpen}
        className="w-full rounded-t-none"
      >
        Show Workbench
        <ChevronRight className="h-5 w-5 shrink-0 ml-2" />
      </Button>
    </div>
  );
}
