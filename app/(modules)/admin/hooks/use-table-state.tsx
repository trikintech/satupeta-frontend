"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SortingState } from "@tanstack/react-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface TableStateOptions<T> {
  defaultLimit?: number;
  defaultSort?: { id: string; desc: boolean };
  resourceName: string;
  fetchFunction: (params: QueryParams) => Promise<{
    items: T[];
    total: number;
    has_more: boolean;
  }>;
  staleTime?: number;
}

export interface QueryParams {
  limit: number;
  offset: number;
  search?: string;
  filter?: string[];
  sort: string;
}

export function useTableState<T>({
  defaultLimit = 10,
  defaultSort = { id: "name", desc: false },
  resourceName,
  fetchFunction,
  staleTime = 30000,
}: TableStateOptions<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([defaultSort]);

  const { limit, offset, search, sortBy, sortOrder, filterParams } = useMemo(
    () => ({
      limit: Number(searchParams.get("limit") || defaultLimit),
      offset: Number(searchParams.get("offset") || 0),
      search: searchParams.get("search") || "",
      sortBy: searchParams.get("sortBy") || defaultSort.id,
      sortOrder:
        searchParams.get("sortOrder") || (defaultSort.desc ? "desc" : "asc"),
      filterParams: searchParams.getAll("filter").filter(Boolean),
    }),
    [searchParams, defaultLimit, defaultSort.id, defaultSort.desc]
  );

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

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

  const queryKey = [
    resourceName,
    limit,
    offset,
    debouncedSearchValue,
    filterParams.join("|"),
    sortBy,
    sortOrder,
  ];

  const {
    data = { items: [], total: 0, has_more: false },
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => fetchFunction(queryParams),
    staleTime,
    retry: 1,
  });

  useEffect(() => {
    if (data.has_more) {
      const nextOffset = offset + limit;
      queryClient.prefetchQuery({
        queryKey: [
          resourceName,
          limit,
          nextOffset,
          debouncedSearchValue,
          filterParams.join("|"),
          sortBy,
          sortOrder,
        ],
        queryFn: () =>
          fetchFunction({
            ...queryParams,
            offset: nextOffset,
          }),
        staleTime,
      });
    }
  }, [
    data.has_more,
    limit,
    offset,
    debouncedSearchValue,
    filterParams,
    queryClient,
    queryParams,
    resourceName,
    sortBy,
    sortOrder,
    fetchFunction,
    staleTime,
  ]);

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

  const pageIndex = Math.floor(offset / limit);
  const pageCount = Math.ceil(data.total / limit);

  return {
    data: data.items,
    total: data.total,
    isLoading,
    isError,
    refetch,
    searchValue,
    sorting,
    handleSearchInputChange,
    handlePaginationChange,
    updateSortingParams,
    pageIndex,
    pageCount,
    limit,
    setSorting,
  };
}
