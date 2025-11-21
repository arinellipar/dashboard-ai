import { NextResponse } from "next/server";

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(error: ApiError, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error);

  if (error instanceof Error) {
    return errorResponse({ message: error.message }, 500);
  }

  return errorResponse({ message: "Internal server error" }, 500);
}
