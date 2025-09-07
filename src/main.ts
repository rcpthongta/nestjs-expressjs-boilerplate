import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app/app.module";

class Bootstrap {
  private static readonly logger: Logger = new Logger(Bootstrap.name);

  public static async start(): Promise<void> {
    try {
      const application: NestExpressApplication = await NestFactory.create(AppModule, new ExpressAdapter());

      await application.listen(3000);

      this.logger.log(`Listening on port ${await application.getUrl()}`);
      this.logger.log("Application started successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(error.message, error.stack);
      } else {
        this.logger.error(error);
      }

      this.logger.error("Application failed to start");
    }
  }
}

void Bootstrap.start();
