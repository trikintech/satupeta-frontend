export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="p-6 pb-2">
      <div className="text-2xl font-bold">{title}</div>
      <div className="text-zinc-500 text-[16px]">{description}</div>
    </div>
  );
}
