import { ChevronLeft } from "lucide-react";

type CloseTriggerProps = {
  onClose: () => void;
};

export default function CloseTrigger({ onClose }: Readonly<CloseTriggerProps>) {
  return (
    <button
      onClick={onClose}
      className="absolute top-2 right-2 w-10 py-2 rounded-full flex items-center justify-center cursor-pointer bg-white hover:bg-none "
    >
      <ChevronLeft className="h-5 w-5 text-gray-700" />
    </button>
  );
}
