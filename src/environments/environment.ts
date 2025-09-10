import { Environment } from "./interfaces";

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
