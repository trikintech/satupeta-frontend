import dynamic from "next/dynamic";

const PreviewMap = dynamic(() => import("./PreviewMap"), { ssr: false });

export default function MainDialog() {
  return (
    <div className="py-12 px-4 flex flex-col gap-4">
      <PreviewMap />
      <h3 className="font-bold text-2xl">Peta Dasar Majalengka</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit
        amet lacus diam. Praesent facilisis, tortor vel placerat eleifend, quam
        massa varius urna, id malesuada nisi ipsum quis nisl. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Aenean est felis, varius nec consequat vitae, ornare quis diam. Nam
        massa dui, pretium nec molestie nec, cursus sed velit. Nunc elementum
        mollis nulla in interdum. Mauris convallis nisl et orci imperdiet, et
        ultricies risus commodo. Proin molestie dui maximus eleifend feugiat.
        Morbi porta pulvinar lacinia.
      </p>
    </div>
  );
}
