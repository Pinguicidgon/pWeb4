export interface ValidationErrorDetail {
  path: string;
  message: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  details?: ValidationErrorDetail[];
}

export interface ApiResponseSuccess<T> {
  success: true;
  data: Metadata<T>;
}

export interface ApiResponseSingleSuccess<T> {
  success: true;
  data: T;
}

export interface ApiResponseError {
  success: false;
  error: ApiError;
}

export type ApiResponse<T> =
  | ApiResponseSuccess<T>
  | ApiResponseError
  | ApiResponseSingleSuccess<T>;

interface Metadata<T> {
  posts: T;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 🔧 CORREGIDO: Removido export default de tipo, solo export type

export function isApiResponseError(
  response: any,
): response is ApiResponseError {
  return response?.success === false && "error" in response;
}

export function hasValidationErrors(
  error: ApiError,
): error is ApiError & { details: ValidationErrorDetail[] } {
  return Array.isArray(error.details) && error.details.length > 0;
}
