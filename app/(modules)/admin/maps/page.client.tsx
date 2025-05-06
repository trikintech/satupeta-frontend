// app/(dashboard)/manajemen-peta/components/manajemen-peta-client.tsx
"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  // Dapatkan parameter dari URL
  const page = Number(searchParams.get("page") || "1");
  const perPage = Number(searchParams.get("per_page") || "10");
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
    }, 500); // Adjust the delay as needed

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [searchValue]);

  // Trigger the search when the debounced value changes
  useEffect(() => {
    updateSearchParams({ search: debouncedSearchValue, page: "1" });
  }, [debouncedSearchValue]);

  // Buat parameter query
  const queryParams = {
    limit: perPage,
    search: search || undefined,
    filter: filter || undefined,
  };

  // Query untuk mengambil data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["mapsets", page, perPage, search, filter],
    queryFn: () => mapsetApi.getMapsets(queryParams),
    staleTime: 5000,
  });

  // Fungsi untuk update parameter URL
  const updateSearchParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    router.push(`?${newParams.toString()}`);
  };

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value); // Update the local state immediately
  };

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
  const totalRows = data?.total || 0;

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
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(true)}
          >
            <FilterIcon className="h-4 w-4 mr-2" />
            Filter
          </Button>

          <Button variant="outline" size="sm">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Non-aktif Mapset
          </Button> */}

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
          pageCount={Math.ceil(totalRows / perPage)}
          pageIndex={page - 1}
          pageSize={perPage}
          onPaginationChange={({ pageIndex, pageSize }) => {
            updateSearchParams({
              page: (pageIndex + 1).toString(),
              per_page: pageSize.toString(),
            });
          }}
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
            page: "1",
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
