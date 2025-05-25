import { Slider } from "@/shared/components/ui/slider";

interface OpacityControlProps {
  opacity: number;
  onOpacityChange: (value: number[]) => void;
}

export const OpacityControl = ({
  opacity,
  onOpacityChange,
}: OpacityControlProps) => {
  return (
    <div>
      <label className="block text-sm text-zinc-700 mb-1">
        Opacity: {Math.round(opacity * 100)}%
      </label>
      <Slider
        value={[opacity]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={onOpacityChange}
      />
    </div>
  );
};
