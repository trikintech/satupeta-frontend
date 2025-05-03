export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  error: unknown;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  per_page: number;
  total_page: number;
  total_data: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PaginatedResponse<T> {
  items: T;
  total: number;
  limit: number;
  has_more: boolean;
}
