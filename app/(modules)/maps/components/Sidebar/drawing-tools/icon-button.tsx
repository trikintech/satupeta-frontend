export default function IconButton({
  icon: Icon,
  isActive,
  onClick,
  label,
}: {
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      className={`p-2 rounded-full ${isActive ? "bg-gray-300" : ""}`}
      onClick={onClick}
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-gray-700" />
    </button>
  );
}
