export class AppError extends Error {
    public code?: string;
    public status?: number;
    public cause?: unknown;
  
    constructor(message: string, options?: { code?: string; status?: number; cause?: unknown }) {
      super(message);
      this.name = "AppError";
      this.code = options?.code;
      this.status = options?.status;
      this.cause = options?.cause;
    }
  
    static Network(message = "Network connection problem") {
      return new AppError(message, { code: "NETWORK_ERROR" });
    }
  
    static NotFound(message = "Requested resource not found") {
      return new AppError(message, { code: "NOT_FOUND", status: 404 });
    }
  
    static Api(message = "Unexpected API response") {
      return new AppError(message, { code: "API_ERROR" });
    }
  
    static Unknown(message = "Unknown error occurred") {
      return new AppError(message, { code: "UNKNOWN_ERROR" });
    }
  }
  