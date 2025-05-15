import { notFound } from "next/navigation";
import Image from "next/image";
import newsApi from "@/shared/services/news";
import { News } from "@/shared/types/news";
import { getFileUrl } from "@/shared/utils/file";
import DOMPurify from "isomorphic-dompurify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function NewsPage({ params }: { params: any }) {
  let newsItem: News | null = null;

  try {
    newsItem = await newsApi.getNewsById(params.id);
  } catch (error) {
    console.error("Gagal mengambil data berita:", error);
  }

  if (!newsItem || !newsItem.is_active) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white text-gray-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul Halaman */}
        <div className="mb-6 text-sm text-primary font-semibold uppercase tracking-wide">
          Berita dan Pengumuman
        </div>

        {/* Judul Berita */}
        <h1 className="text-4xl  text-slate-700 mb-6 border-b pb-2 border-primary/30">
          {newsItem.name}
        </h1>

        {/* Gambar Thumbnail */}
        {newsItem.thumbnail && (
          <div className="mb-8 overflow-hidden rounded-xl flex justify-center ">
            <Image
              src={getFileUrl(newsItem.thumbnail)}
              alt={newsItem.name}
              width={600}
              height={600}
              className="w-full h-auto object-cover transition-all duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Konten */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(newsItem.description),
            }}
          />
        </div>
      </div>
    </article>
  );
}
