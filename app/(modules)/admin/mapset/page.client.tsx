"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { SearchInput } from "./components/list/search-input";
import { DataTable } from "./components/list/data-table";
import { useMapsetColumns } from "./components/list/column";
import { TabNavigation } from "./components/list/tab-navigation";
import { useTabState } from "../hooks/use-tab";
import mapsetApi from "@/shared/services/mapset";
import Link from "next/link";
import Image from "next/image";
import { SortingState } from "@tanstack/react-table";
import { EmptyState } from "./components/list/empty-state";

export default function MapsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { currentTab } = useTabState();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false }, // Default sorting by "name" in ascending order
  ]);

  const columns = useMapsetColumns();

  const limit = Number(searchParams.get("limit") || "10");
  const offset = Number(searchParams.get("offset") || "0");
  const search = searchParams.get("search") || "";

  const sortBy = searchParams.get("sortBy") || "name"; // Default to "name"
  const sortOrder = searchParams.get("sortOrder") || "asc"; // Default to "asc"

  const filterParams = useMemo(() => {
    const params: string[] = [];
    searchParams.getAll("filter").forEach((filter) => {
      if (filter) params.push(filter);
    });
    return params;
  }, [searchParams]);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

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

  const updateSortingParams = useCallback(
    (sorting: SortingState) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (sorting.length === 0) {
        newParams.delete("sortBy");
        newParams.delete("sortOrder");
      } else {
        newParams.set("sortBy", sorting[0].id);
        newParams.set("sortOrder", sorting[0].desc ? "desc" : "asc");
      }

      router.push(`?${newParams.toString()}`);
    },
    [router, searchParams]
  );

  const queryParams = useMemo(
    () => ({
      limit,
      offset,
      search: debouncedSearchValue || undefined, // Use debounced search value
      filter: filterParams.length > 0 ? filterParams : undefined,
      sort: `${sortBy}:${sortOrder}`,
    }),
    [limit, offset, debouncedSearchValue, filterParams, sortBy, sortOrder]
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "mapsets",
      limit,
      offset,
      debouncedSearchValue, // Include debounced search value in query key
      filterParams.join("|"),
      sortBy,
      sortOrder,
    ],
    queryFn: () => mapsetApi.getMapsets(queryParams),
    staleTime: 30000,
    retry: 1,
  });

  useEffect(() => {
    if (data?.has_more) {
      const nextOffset = offset + limit;
      queryClient.prefetchQuery({
        queryKey: [
          "mapsets",
          limit,
          nextOffset,
          debouncedSearchValue,
          filterParams.join("|"),
          sortBy,
          sortOrder,
        ],
        queryFn: () =>
          mapsetApi.getMapsets({
            ...queryParams,
            offset: nextOffset,
          }),
        staleTime: 30000,
      });
    }
  }, [
    data,
    limit,
    offset,
    debouncedSearchValue,
    filterParams,
    queryClient,
    queryParams,
    sortBy,
    sortOrder,
  ]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const pageIndex = Math.floor(offset / limit);
  const totalRows = data?.total || 0;
  const pageCount = Math.ceil(totalRows / limit);

  const handlePaginationChange = useCallback(
    ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
      const newOffset = pageIndex * pageSize;

      if (pageSize !== limit) {
        updateSearchParams({
          offset: "0", // Reset to beginning when limit changes
          limit: pageSize.toString(),
        });
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
      <TabNavigation activeTab={currentTab} />

      <div className="flex items-center justify-between">
        <SearchInput
          placeholder="Masukkan kata kunci"
          value={searchValue}
          onChange={handleSearchInputChange}
          className="w-full max-w-sm"
        />

        <div className="flex items-center gap-2">
          <Link href="/admin/mapset/add">
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
            <div className="text-gray-400 mx-auto mb-4">
              <Image
                src="/empty-box.png"
                alt="Dataset tidak ditemukan"
                width={64}
                height={64}
              />
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
          sorting={sorting}
          onSortingChange={(newSorting) => {
            setSorting(newSorting); // Update local state
            updateSortingParams(newSorting); // Update query params
          }}
        />
      )}
    </div>
  );
}
