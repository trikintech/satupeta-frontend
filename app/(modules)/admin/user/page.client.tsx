"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "../components/data-table";
import { useUserColumns } from "./components/list/column";
import userApi from "@/shared/services/user";
import Link from "next/link";
import Image from "next/image";
import { SortingState } from "@tanstack/react-table";
import { EmptyState } from "../components/empty-state";
import { SearchInput } from "../components/search-input";

// Constants
const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;
const DEFAULT_SORT = { id: "name", desc: false };

// Types
interface QueryParams {
  limit: number;
  offset: number;
  search?: string;
  filter?: string[];
  sort: string;
}

export default function UserPageClient() {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // State
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([DEFAULT_SORT]);

  // Derived values from URL params
  const { limit, offset, search, sortBy, sortOrder, filterParams } =
    useMemo(() => {
      return {
        limit: Number(searchParams.get("limit") || DEFAULT_LIMIT),
        offset: Number(searchParams.get("offset") || DEFAULT_OFFSET),
        search: searchParams.get("search") || "",
        sortBy: searchParams.get("sortBy") || DEFAULT_SORT.id,
        sortOrder:
          searchParams.get("sortOrder") || (DEFAULT_SORT.desc ? "desc" : "asc"),
        filterParams: searchParams.getAll("filter").filter(Boolean),
      };
    }, [searchParams]);

  // Columns for the data table
  const columns = useUserColumns();

  // Effects
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue]);

  // Memoized query parameters
  const queryParams = useMemo<QueryParams>(
    () => ({
      limit,
      offset,
      search: debouncedSearchValue || undefined,
      filter: filterParams.length > 0 ? filterParams : undefined,
      sort: `${sortBy}:${sortOrder}`,
    }),
    [limit, offset, debouncedSearchValue, filterParams, sortBy, sortOrder]
  );

  // Data fetching
  const {
    data: { items: users = [], total = 0, has_more = false } = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "users",
      limit,
      offset,
      debouncedSearchValue,
      filterParams.join("|"),
      sortBy,
      sortOrder,
    ],
    queryFn: () => userApi.getUsers(queryParams),
    staleTime: 30000,
    retry: 1,
  });

  // Prefetch next page
  useEffect(() => {
    if (has_more) {
      const nextOffset = offset + limit;
      queryClient.prefetchQuery({
        queryKey: [
          "users",
          limit,
          nextOffset,
          debouncedSearchValue,
          filterParams.join("|"),
          sortBy,
          sortOrder,
        ],
        queryFn: () =>
          userApi.getUsers({
            ...queryParams,
            offset: nextOffset,
          }),
        staleTime: 30000,
      });
    }
  }, [
    has_more,
    limit,
    offset,
    debouncedSearchValue,
    filterParams,
    queryClient,
    queryParams,
    sortBy,
    sortOrder,
  ]);

  // Handlers
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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handlePaginationChange = useCallback(
    ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
      const newOffset = pageIndex * pageSize;
      const params = {
        offset: pageSize !== limit ? "0" : newOffset.toString(),
        limit: pageSize.toString(),
      };
      updateSearchParams(params);
    },
    [updateSearchParams, limit]
  );

  // Derived pagination values
  const pageIndex = Math.floor(offset / limit);
  const pageCount = Math.ceil(total / limit);

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Error state
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

  // Empty state
  if (users.length === 0) {
    return (
      <div className="space-y-4">
        <SearchAndActionBar
          searchValue={searchValue}
          onChange={handleSearchInputChange}
        />
        <EmptyState
          icon={
            <div className="text-gray-400 mx-auto mb-4">
              <Image
                src="/empty-box.png"
                alt="User tidak ditemukan"
                width={64}
                height={64}
              />
            </div>
          }
          title="User tidak ditemukan"
          description=""
        />
      </div>
    );
  }

  // Main render
  return (
    <div className="space-y-4">
      <SearchAndActionBar
        searchValue={searchValue}
        onChange={handleSearchInputChange}
      />

      <DataTable
        data={users}
        columns={columns}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={limit}
        onPaginationChange={handlePaginationChange}
        manualPagination
        rowCount={total}
        sorting={sorting}
        onSortingChange={(newSorting) => {
          setSorting(newSorting);
          updateSortingParams(newSorting);
        }}
      />
    </div>
  );
}

// Extracted components for better readability
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

interface SearchAndActionBarProps {
  searchValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchAndActionBar = ({
  searchValue,
  onChange,
}: SearchAndActionBarProps) => (
  <div className="flex items-center justify-between">
    <SearchInput
      placeholder="Masukkan kata kunci"
      value={searchValue}
      onChange={onChange}
      className="w-full max-w-sm"
    />

    <div className="flex items-center gap-2">
      <Link href="/admin/user/add">
        <Button size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          Tambah User
        </Button>
      </Link>
    </div>
  </div>
);
