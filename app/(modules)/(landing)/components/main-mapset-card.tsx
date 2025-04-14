import { Card, CardProps } from "@/shared/components/ds/card";

export function MainMapsetCard({
  href,
  image,
  tag,
  title,
  description,
  ...props
}: Readonly<CardProps>) {
  return (
    <Card
      href={href}
      image={image}
      tag={tag}
      title={title}
      description={description}
      className="h-full"
      {...props}
    />
  );
}
