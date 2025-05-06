// app/(dashboard)/manajemen-peta/components/manajemen-peta-client.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { EmptyState } from "./components/empty-state";
import { Button } from "@/shared/components/ui/button";
import { SearchInput } from "./components/search-input";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column";
import { FilterDrawer } from "./components/filter-drawer";
import mapsetApi from "@/shared/services/mapset";
import Link from "next/link";

export default function MapsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  // Dapatkan parameter dari URL dengan nilai default
  const limit = Number(searchParams.get("limit") || "10");
  // Pastikan offset adalah kelipatan dari limit atau 0
  const offset = Number(searchParams.get("offset") || "0");

  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";

  // Initialize searchValue from URL
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  // Update the debounced value after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  // Membuat fungsi updateSearchParams yang memoized dengan useCallback
  const updateSearchParams = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });

      router.push(`?${newParams.toString()}`);
    },
    [router, searchParams]
  );

  // Trigger the search when the debounced value changes
  useEffect(() => {
    updateSearchParams({ search: debouncedSearchValue, offset: "0" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  // Buat parameter query dengan limit dan offset
  const queryParams = {
    limit,
    offset,
    search: search || undefined,
    filter: filter || undefined,
  };

  // Query untuk mengambil data dengan optimasi React Query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["mapsets", limit, offset, search, filter],
    queryFn: () => mapsetApi.getMapsets(queryParams),
    staleTime: 30000,
    retry: 1,
  });

  // Prefetch halaman selanjutnya untuk UX yang lebih baik
  useEffect(() => {
    if (data?.has_more) {
      const nextOffset = offset + limit;
      queryClient.prefetchQuery({
        queryKey: ["mapsets", limit, nextOffset, search, filter],
        queryFn: () =>
          mapsetApi.getMapsets({
            ...queryParams,
            offset: nextOffset,
          }),
        staleTime: 30000,
      });
    }
  }, [data, limit, offset, search, filter, queryClient, queryParams]);

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Menghitung pageIndex dan pageCount dari limit dan offset dengan benar
  const pageIndex = Math.floor(offset / limit);
  const totalRows = data?.total || 0;
  const pageCount = Math.ceil(totalRows / limit);

  // Handle pagination change dengan useCallback untuk mencegah re-render berlebihan
  const handlePaginationChange = useCallback(
    ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
      // Hitung offset yang benar berdasarkan pageIndex dan pageSize
      const newOffset = pageIndex * pageSize;

      // Update limit hanya jika berubah, dan pastikan offset selalu valid
      if (pageSize !== limit) {
        // updateSearchParams({
        //   offset: "0", // Reset ke awal saat limit berubah
        //   limit: pageSize.toString(),
        // });
      } else {
        updateSearchParams({
          offset: newOffset.toString(),
          limit: pageSize.toString(),
        });
      }
    },
    [updateSearchParams, limit]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        icon={<RefreshCwIcon className="h-10 w-10 text-gray-400" />}
        title="Error memuat data"
        description="Terjadi kesalahan saat memuat data. Silakan coba lagi."
        action={<Button onClick={() => refetch()}>Coba Lagi</Button>}
      />
    );
  }

  const mapsets = data?.items || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SearchInput
          placeholder="Masukkan kata kunci"
          value={searchValue}
          onChange={handleSearchInputChange}
          className="w-full max-w-sm"
        />

        <div className="flex items-center gap-2">
          <Link href="/admin/maps/add">
            <Button size="sm">
              <PlusIcon className="h-4 w-4 mr-2" />
              Tambah Mapset
            </Button>
          </Link>
        </div>
      </div>

      {mapsets.length === 0 ? (
        <EmptyState
          icon={
            <div className="h-16 w-16 text-gray-400 mx-auto mb-4">
              <img src="/empty-box.png" alt="Dataset tidak ditemukan" />
            </div>
          }
          title="Dataset tidak ditemukan"
          description=""
        />
      ) : (
        <DataTable
          data={mapsets}
          columns={columns}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageSize={limit}
          onPaginationChange={handlePaginationChange}
          manualPagination
          rowCount={totalRows}
        />
      )}

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilter={(filterParams) => {
          updateSearchParams({
            ...filterParams,
            offset: "0",
          });
          setIsFilterOpen(false);
        }}
        currentFilters={{
          filter: filter,
        }}
      />
    </div>
  );
}
