export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T | null;
  meta?: Record<string, any>;
}
