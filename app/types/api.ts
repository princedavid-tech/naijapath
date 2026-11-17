/** Every backend endpoint answers with this envelope (ARCHITECTURE.md §8.1). */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  /** `false` = the operation failed — read `message`. Arrives on HTTP 200. */
  status: boolean;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}
