import { environment } from "@environment";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

import { AppModule } from "./app/app.module";

import { Swagger } from "./swagger";

class Bootstrap {
  private static readonly logger: Logger = new Logger(Bootstrap.name);

  public static async start(): Promise<void> {
    try {
      const application: NestExpressApplication = await NestFactory.create(AppModule, new ExpressAdapter(), {
        bufferLogs: true
      });

      application.useLogger(application.get(WINSTON_MODULE_NEST_PROVIDER));

      if (environment.swagger.enabled) {
        new Swagger(application).run();
      }

      await application.listen(environment.server.port);

      this.logger.log(`Running in ${environment.profile} mode`);
      this.logger.log(`Listening on port ${await application.getUrl()}`);
      this.logger.log("Application started successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.localInstance.fatal?.(error.message, error.stack, Bootstrap.name);
      }

      this.logger.localInstance.fatal?.("Application failed to start", null, Bootstrap.name);
    }
  }
}

void Bootstrap.start();
