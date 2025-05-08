"use client";
import categoryApi from "@/shared/services/category";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getFileThumbnailUrl } from "@/shared/utils/file";

export default function CategoryDetail({ id }: { id: string }) {
  const { data: category } = useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryApi.getCategoryById(id),
  });

  return (
    <div className="mx-6 p-2 border border-zinc-200 rounded-[6px]">
      <div className="px-6 rounded-[6px] border-zinc-200">
        <div className="py-2">
          <span className="text-lg font-semibold text-zinc-950">
            Informasi Kategori
          </span>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Nama</div>
          <div className="text-sm text-zinc-800">{category?.name}</div>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Deskripsi</div>
          <div className="text-sm text-zinc-800">{category?.description}</div>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Status</div>
          <div className="text-sm text-zinc-800">
            {category?.is_active ? "Aktif" : "Tidak Aktif"}
          </div>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Thumbnail</div>
          {category?.thumbnail ? (
            <Image
              src={getFileThumbnailUrl(category.thumbnail)}
              alt="Thumbnail Kategori"
              className="w-32 h-32 object-cover rounded"
              width={128}
              height={128}
            />
          ) : (
            <div className="text-sm text-zinc-800">Tidak ada thumbnail</div>
          )}
        </div>
      </div>
    </div>
  );
}
