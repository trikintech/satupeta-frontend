import { useState } from "react";

export default function DescriptionSection({
  description,
}: Readonly<{
  description: string;
}>) {
  const [readmore, setReadmore] = useState(false);

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{
          __html: description || "",
        }}
        className={!readmore ? "line-clamp-5" : ""}
      ></p>
      {description.length > 200 &&
        (!readmore ? (
          <button
            className="cursor-pointer text-gray-500"
            onClick={() => setReadmore(true)}
          >
            Read More
          </button>
        ) : (
          <button
            className="cursor-pointer text-gray-500"
            onClick={() => setReadmore(false)}
          >
            Read Less
          </button>
        ))}
    </div>
  );
}
