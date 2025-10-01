import { Environment } from "./types";

export const environment: Environment = {
  profile: process.env.NESTJS_PROFILE ?? "development",
  application: {
    version: process.env.APPLICATION_VERSION ?? "1.0.0",
    name: process.env.APPLICATION_NAME ?? "ExampleName"
  },
  server: {
    port: Number.parseInt(process.env.SERVER_PORT ?? "8000", 10)
  },
  security: {
    cors: {
      origins: process.env.SECURITY_CORS_ORIGINS?.split(",")?.map((origin: string): string => {
        return origin.trim();
      }) ?? ["*"],
      methods: process.env.SECURITY_CORS_METHODS?.split(",")?.map((method: string): string => {
        return method.trim();
      }) ?? ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: process.env.SECURITY_CORS_ALLOWED_HEADERS?.split(",")?.map((header: string): string => {
        return header.trim();
      }) ?? ["*"],
      exposedHeaders: process.env.SECURITY_CORS_EXPOSED_HEADERS?.split(",")?.map((header: string): string => {
        return header.trim();
      }) ?? ["*"],
      credentials: process.env.SECURITY_CORS_CREDENTIALS === "true",
      maxAge: Number.parseInt(process.env.SECURITY_CORS_MAX_AGE ?? "86400", 10)
    },
    request: {
      jsonLimit: process.env.SECURITY_REQUEST_JSON_LIMIT ?? "",
      urlencodedLimit: process.env.SECURITY_REQUEST_URLENCODED_LIMIT ?? ""
    },
    throttler: {
      ttl: Number.parseInt(process.env.SECURITY_THROTTLER_TTL ?? "60", 10),
      limit: Number.parseInt(process.env.SECURITY_THROTTLER_LIMIT ?? "100", 10)
    }
  },
  logging: {
    level: process.env.LOGGING_LEVEL ?? "verbose"
  },
  swagger: {
    enabled: process.env.SWAGGER_ENABLED === "true"
  }
};
