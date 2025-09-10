import { winstonConfiguration } from "@configuration";
import { environment, environmentSchema, EnvironmentSchema } from "@environment";

import { MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import * as Joi from "joi";

import { Request } from "express";
import { nanoid } from "nanoid";
import { ClsModule } from "nestjs-cls";
import { WinstonModule } from "nest-winston";

import { InvalidEnvironmentException } from "./exceptions";
import { MorganMiddleware } from "./middlewares";

@Module({
  imports: [
    WinstonModule.forRoot({ ...winstonConfiguration }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (request: Request): string => {
          return request.header("x-request-id") ?? nanoid();
        }
      }
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: environment.security.throttler.ttl,
          limit: environment.security.throttler.limit
        }
      ]
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
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
