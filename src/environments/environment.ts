import { Environment } from "./interfaces";

export const environment: Environment = {
  profile: process.env.NESTJS_PROFILE ?? "development",
  application: {
    version: process.env.APPLICATION_VERSION ?? "1.0.0",
    name: process.env.APPLICATION_NAME ?? "ExampleName"
  },
  server: {
    port: Number.parseInt(process.env.SERVER_PORT ?? "8000", 10)
  }
};
