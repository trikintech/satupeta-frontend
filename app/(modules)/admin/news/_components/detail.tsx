"use client";
import newsApi from "@/shared/services/news";
import { getFileThumbnailUrl } from "@/shared/utils/file";

import { useQuery } from "@tanstack/react-query";

import Image from "next/image";

import DetailItem from "../../_components/detail-item";

export default function NewsDetail({ id }: { id: string }) {
  const { data: news } = useQuery({
    queryKey: ["news", id],
    queryFn: () => newsApi.getNewsById(id),
  });

  return (
    <div>
      <div className="mx-6 p-2 border rounded-[6px] border-zinc-200">
        <div className="py-2 px-4">
          <span className="text-lg font-semibold text-zinc-950">
            Informasi Konten
          </span>
        </div>

        <DetailItem label="Judul" value={news?.name} />
        <DetailItem
          label="Isi Konten"
          value={news?.description}
          renderAsHtml={true}
        />
        <DetailItem
          label="Status"
          value={news?.is_active ? "Aktif" : "Tidak Aktif"}
        />
        <DetailItem
          label="Thumbnail"
          value={
            news?.thumbnail ? (
              <Image
                src={getFileThumbnailUrl(news.thumbnail)}
                alt="Thumbnail Konten"
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
