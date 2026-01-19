import { ApiResponse } from "@buildora/shared";
import { AuthService } from "./authService";

/**
 * Base URL for the API server.
 * Uses Vite env config when provided; falls back to local dev server.
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
/**
 * Versioned API base path used by every request.
 */
const API_BASE = `${API_BASE_URL}/api`;

/**
 * Options for `apiRequest`/`apiRequestOrThrow`.
 * - method: HTTP verb to use (defaults to GET).
 * - body: Request payload (JSON serialized when provided).
 * - headers: Extra headers to merge with defaults.
 * - withAuth: When true, attaches the bearer token if available.
 */
type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  withAuth?: boolean;
};

/**
 * Perform a JSON API request and return the raw API response envelope.
 * Used by: service layer methods that want to handle `success`/`error` manually.
 * Endpoint: `${API_BASE}${path}` (e.g., `/api/profile/me`).
 * Inputs: path + ApiRequestOptions.
 * Output: ApiResponse<T> (success flag, data, error).
 * @param path API route starting with `/`.
 * @param options Request options (method, body, headers, withAuth).
 * @returns Promise resolving to ApiResponse<T>.
 */
export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> {
  const { method = "GET", body, headers = {}, withAuth = true } = options;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (withAuth) {
    const token = AuthService.getToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    return (await response.json()) as ApiResponse<T>;
  } catch (error) {
    return {
      success: false,
      error: "Failed to reach Buildora servers.",
    };
  }
}

/**
 * Error wrapper thrown by `apiRequestOrThrow`.
 * Carries the original API response envelope when available.
 */
export class ApiRequestError extends Error {
  response?: ApiResponse<unknown>;

  constructor(message: string, response?: ApiResponse<unknown>) {
    super(message);
    this.name = "ApiRequestError";
    this.response = response;
  }
}

/**
 * Perform a JSON API request and throw on error responses.
 * Used by: service layer methods that expect a successful payload.
 * Inputs: path + ApiRequestOptions.
 * Output: The `data` payload of ApiResponse<T>.
 * @param path API route starting with `/`.
 * @param options Request options (method, body, headers, withAuth).
 * @returns Promise resolving to the response data.
 * @throws ApiRequestError when `success` is false.
 */
export async function apiRequestOrThrow<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const result = await apiRequest<T>(path, options);

  if (!result.success) {
    throw new ApiRequestError(result.error || "Request failed.", result);
  }

  return result.data as T;
}
