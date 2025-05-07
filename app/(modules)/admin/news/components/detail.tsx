"use client";
import newsApi from "@/shared/services/news";
import { useQuery } from "@tanstack/react-query";

export default function NewsDetail({ id }: { id: string }) {
  const { data: news } = useQuery({
    queryKey: ["news", id],
    queryFn: () => newsApi.getNewsById(id),
  });

  return (
    <div>
      <div className="p-2 border rounded-[6px] border-zinc-200">
        <div className="py-2 px-4">
          <span className="text-lg font-semibold text-zinc-950">
            Informasi Berita
          </span>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Judul</div>
          <div className="text-sm text-zinc-800">{news?.name}</div>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Deskripsi</div>
          <div className="text-sm text-zinc-800">{news?.description}</div>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Status</div>
          <div className="text-sm text-zinc-800">
            {news?.is_active ? "Aktif" : "Tidak Aktif"}
          </div>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Thumbnail</div>
          {news?.thumbnail ? (
            <img
              src={news.thumbnail}
              alt="Thumbnail"
              className="w-32 h-32 object-cover rounded"
            />
          ) : (
            <div className="text-sm text-zinc-800">Tidak ada thumbnail</div>
          )}
        </div>
      </div>
    </div>
  );
}
