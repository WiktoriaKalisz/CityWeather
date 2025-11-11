import { AppError } from "./AppError";

export function handleError(error: unknown): { message: string; code: string } {
  if (process.env.NODE_ENV !== "production") {
    console.error("Caught error:", error);
  }

  if (error instanceof AppError) {
    return { message: error.message, code: error.code || "APP_ERROR" };
  }

  if (error instanceof Error) {
    if (error.message.includes("fetch failed") || error.message.includes("ECONNRESET")) {
      return { message: "Network error — please check your connection.", code: "NETWORK" };
    }
    return { message: error.message, code: "GENERIC_ERROR" };
  }

  return { message: "An unexpected error occurred.", code: "UNKNOWN" };
}
