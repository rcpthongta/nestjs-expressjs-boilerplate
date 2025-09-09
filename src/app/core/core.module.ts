import { winstonConfiguration } from "@configuration";
import { environment, environmentSchema, EnvironmentSchema } from "@environment";

import { MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod } from "@nestjs/common";

import * as Joi from "joi";

import { WinstonModule } from "nest-winston";

import { InvalidEnvironmentException } from "./exceptions";
import { MorganMiddleware } from "./middlewares";

@Module({
  imports: [WinstonModule.forRoot({ ...winstonConfiguration })]
})
export class CoreModule implements NestModule, OnModuleInit {
  private validEnvironment(): void {
    const { error }: Joi.ValidationResult<EnvironmentSchema> = environmentSchema.validate(environment);

    if (error) {
      throw new InvalidEnvironmentException(error.message);
    }
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(MorganMiddleware).forRoutes({ method: RequestMethod.ALL, path: "*" });
  }

  public onModuleInit(): void {
    this.validEnvironment();
  }
}
