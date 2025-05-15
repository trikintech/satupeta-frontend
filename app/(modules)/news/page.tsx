"use client";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/shared/types/api-response";
import { News } from "@/shared/types/news";
import newsApi from "@/shared/services/news";
import DOMPurify from "isomorphic-dompurify";
import { getFileUrl } from "@/shared/utils/file";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const limit = 10;
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const { data, isLoading, isError } = useQuery<PaginatedResponse<News[]>>({
    queryKey: ["news", page, debouncedSearchTerm, filter],
    queryFn: () =>
      newsApi.getNewsList({
        search: debouncedSearchTerm,
        filter: filter,
        limit: limit,
        offset: (page - 1) * limit,
      }),
  });

  // Debounce search input
  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); // Reset to first page when search term changes
    }, 500); // 500ms delay after typing stops

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Immediately trigger search on form submit
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setDebouncedSearchTerm(searchTerm);
    setPage(1);
  };

  if (isError) {
    return (
      <div className="h-full w-screen flex items-center justify-center">
        Error loading news
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-6">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl text-slate-700 mb-10">Berita dan Pengumuman</h2>

        <p className="text-slate-500 text-xl mb-6 max-w-3xl">
          Temukan informasi yang bersifat faktual dengan sumber data terpercaya
          yang disajikan dalam bentuk teks.
        </p>

        <div>
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4 mb-4"
          >
            <div className="flex-1">
              <input
                type="text"
                id="search"
                placeholder="Cari Berita dan Pengumuman..."
                className="w-full p-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="self-end">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Cari
              </button>
            </div>
          </form>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <p className="text-slate-500">
            {data?.total || 0} Berita dan Pengumuman ditemukan
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-4">
              {data?.items.map((newsItem) => (
                <Link href={`/news/${newsItem.id}`} key={newsItem.id}>
                  <div className="p-6 flex gap-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                    {newsItem.thumbnail && (
                      <div className="flex-shrink-0 w-24 h-24">
                        <Image
                          src={getFileUrl(newsItem.thumbnail)}
                          alt={newsItem.name}
                          className="w-full h-full object-cover rounded-md"
                          width={300}
                          height={300}
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 truncate">
                        {newsItem.name}
                      </h3>
                      <div
                        className="text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(newsItem.description),
                        }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {data?.total && data.total > limit && (
              <div className="flex justify-center mt-8">
                <nav className="inline-flex rounded-md shadow">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-l-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from(
                    { length: Math.ceil(data.total / limit) },
                    (_, i) => i + 1
                  ).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-4 py-2 border-t border-b border-gray-300 ${
                        page === pageNum
                          ? "bg-blue-50 text-blue-600 border-blue-500"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setPage((p) =>
                        Math.min(Math.ceil(data.total / limit), p + 1)
                      )
                    }
                    disabled={page === Math.ceil(data.total / limit)}
                    className="px-4 py-2 border border-gray-300 rounded-r-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
