// app/(dashboard)/manajemen-peta/components/manajemen-peta-client.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { EmptyState } from "./components/list/empty-state";
import { Button } from "@/shared/components/ui/button";
import { SearchInput } from "./components/list/search-input";
import { DataTable } from "./components/list/data-table";
import { useMapsetColumns } from "./components/list/column";
import { FilterDrawer } from "./components/list/filter-drawer";
import { TabNavigation } from "./components/list/tab-navigation";
import { useTabState } from "../hooks/use-tab";
import mapsetApi from "@/shared/services/mapset";
import Link from "next/link";
import Image from "next/image";

export default function MapsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { currentTab } = useTabState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const columns = useMapsetColumns();

  // Get parameters from URL with default values
  const limit = Number(searchParams.get("limit") || "10");
  const offset = Number(searchParams.get("offset") || "0");
  const search = searchParams.get("search") || "";

  // Get all filter parameters (can be multiple with the same name)
  const filterParams = useMemo(() => {
    const params: string[] = [];
    searchParams.getAll("filter").forEach((filter) => {
      if (filter) params.push(filter);
    });
    return params;
  }, [searchParams]);

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

  // Create a memoized updateSearchParams function with useCallback
  const updateSearchParams = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      // Handle special case for filter which might be removed
      if ("filter" in params && params.filter === "") {
        newParams.delete("filter");
      } else {
        Object.entries(params).forEach(([key, value]) => {
          if (value) {
            newParams.set(key, value);
          } else {
            newParams.delete(key);
          }
        });
      }

      router.push(`?${newParams.toString()}`);
    },
    [router, searchParams]
  );

  // Trigger the search when the debounced value changes
  useEffect(() => {
    updateSearchParams({ search: debouncedSearchValue, offset: "0" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  // Create query parameters with limit and offset
  const queryParams = useMemo(
    () => ({
      limit,
      offset,
      search: search || undefined,
      filter: filterParams.length > 0 ? filterParams : undefined,
    }),
    [limit, offset, search, filterParams]
  );

  // Query to fetch data with React Query optimizations
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["mapsets", limit, offset, search, filterParams.join("|")],
    queryFn: () => mapsetApi.getMapsets(queryParams),
    staleTime: 30000,
    retry: 1,
  });

  // Prefetch next page for better UX
  useEffect(() => {
    if (data?.has_more) {
      const nextOffset = offset + limit;
      queryClient.prefetchQuery({
        queryKey: [
          "mapsets",
          limit,
          nextOffset,
          search,
          filterParams.join("|"),
        ],
        queryFn: () =>
          mapsetApi.getMapsets({
            ...queryParams,
            offset: nextOffset,
          }),
        staleTime: 30000,
      });
    }
  }, [data, limit, offset, search, filterParams, queryClient, queryParams]);

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Calculate pageIndex and pageCount from limit and offset correctly
  const pageIndex = Math.floor(offset / limit);
  const totalRows = data?.total || 0;
  const pageCount = Math.ceil(totalRows / limit);

  // Handle pagination change with useCallback to prevent excessive re-renders
  const handlePaginationChange = useCallback(
    ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
      // Calculate correct offset based on pageIndex and pageSize
      const newOffset = pageIndex * pageSize;

      // Update limit only if changed, and ensure offset is always valid
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

  // Apply custom filters from filter drawer
  const handleFilterApply = useCallback(
    (filterParams: Record<string, string>) => {
      // Create new URLSearchParams
      const newParams = new URLSearchParams(searchParams.toString());

      // Remove all existing filter parameters
      newParams.delete("filter");

      // Reset pagination
      newParams.set("offset", "0");

      // Build the new URL with filter parameters
      let url = `?${newParams.toString()}`;

      // Add filter parameters if any
      if (filterParams.filter) {
        // Split multiple filters by &filter=
        const filters = filterParams.filter.split("&filter=");
        for (const filter of filters) {
          if (filter) {
            url += `&filter=${encodeURIComponent(filter)}`;
          }
        }
      }

      router.push(url);
      setIsFilterOpen(false);
    },
    [router, searchParams]
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
        />
      )}

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilter={handleFilterApply}
        currentFilters={{
          filter: filterParams.length > 0 ? filterParams[0] : "",
        }}
      />
    </div>
  );
}
