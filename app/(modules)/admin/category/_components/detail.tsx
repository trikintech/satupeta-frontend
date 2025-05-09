"use client";
import categoryApi from "@/shared/services/category";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import DetailItem from "../../_components/detail-item";
import { getFileThumbnailUrl } from "@/shared/utils/file";

export default function CategoryDetail({ id }: { id: string }) {
  const { data: category } = useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryApi.getCategoryById(id),
  });

  return (
    <div>
      <div className="mx-6 p-2 border rounded-[6px] border-zinc-200">
        <div className="py-2 px-4">
          <span className="text-lg font-semibold text-zinc-950">
            Informasi Kategori
          </span>
        </div>

        <DetailItem label="Nama" value={category?.name} />
        <DetailItem label="Deskripsi" value={category?.description} />
        <DetailItem
          label="Status"
          value={category?.is_active ? "Aktif" : "Tidak Aktif"}
        />
        <DetailItem
          label="Thumbnail"
          value={
            category?.thumbnail ? (
              <Image
                src={getFileThumbnailUrl(category.thumbnail)}
                alt="Thumbnail Kategori"
                className="w-32 h-32 object-cover rounded"
                width={128}
                height={128}
              />
            ) : (
              "Tidak ada thumbnail"
            )
          }
        />
      </div>
    </div>
  );
}
