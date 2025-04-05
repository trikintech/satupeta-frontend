import { Map } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex justify-center h-full items-center flex-col">
      <Map size={80} className="mb-4" />
      <div>Select a dataset to see a preview</div>
    </div>
  );
}
