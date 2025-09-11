import { winstonConfiguration } from "@configuration";
import { environment, environmentSchema, EnvironmentSchema } from "@environment";

import {
  ClassSerializerInterceptor,
  HttpStatus,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
  ValidationPipe
} from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import * as Joi from "joi";

import { Request } from "express";
import { nanoid } from "nanoid";
import { ClsModule } from "nestjs-cls";
import { WinstonModule } from "nest-winston";

import { InvalidEnvironmentException } from "./exceptions";
import {
  CompressionMiddleware,
  HelmetMiddleware,
  MorganMiddleware,
  RequestResponseDetailMiddleware,
  ResponseTime
} from "./middlewares";
import { ResponseWrapperModule } from "./modules";
import { CorsPolicyService } from "./services";

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
    }),
    ResponseWrapperModule
  ],
  providers: [
    CorsPolicyService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        disableErrorMessages: false,
        enableDebugMessages: false,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        skipMissingProperties: false,
        skipNullProperties: false,
        skipUndefinedProperties: false,
        stopAtFirstError: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
          excludeExtraneousValues: true
        },
        validateCustomDecorators: true,
        whitelist: true
      })
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
    consumer
      .apply(
        HelmetMiddleware,
        CompressionMiddleware,
        ResponseTime,
        ...(environment.profile === "development" ? [RequestResponseDetailMiddleware] : []),
        MorganMiddleware
      )
      .forRoutes({ method: RequestMethod.ALL, path: "*" });
  }

  public onModuleInit(): void {
    this.validEnvironment();
  }
}
