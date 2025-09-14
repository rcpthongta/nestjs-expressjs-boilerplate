import { I18nService } from "@common";
import { WrapperResponseDto, WrapperResponseStatusDto } from "@dto";

import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { Response } from "express";
import { map, Observable } from "rxjs";

import { ResponseMessageOptions } from "./interfaces";

import { RESPONSE_MESSAGE_KEY, SKIP_RESPONSE_WRAPPER_KEY } from "./response-wrapper.constant";

@Injectable()
export class ResponseWrapperInterceptor<T> implements NestInterceptor<T, T | WrapperResponseDto<T>> {
  private readonly i18n: I18nService;
  private readonly reflector: Reflector;

  public constructor(i18n: I18nService, reflector: Reflector) {
    this.i18n = i18n;
    this.reflector = reflector;
  }

  public intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T | WrapperResponseDto<T>> {
    const skip: boolean = this.reflector.get(SKIP_RESPONSE_WRAPPER_KEY, context.getHandler());

    if (skip) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data: T): WrapperResponseDto<T> => {
        const response: Response = context.switchToHttp().getResponse();
        const translate: ResponseMessageOptions = this.reflector.get(RESPONSE_MESSAGE_KEY, context.getHandler()) ?? {
          key: "response.success.ars000001"
        };
        const message: string = this.i18n.translate(translate.key, {
          args: translate?.args,
          language: translate?.language
        });

        return new WrapperResponseDto({
          success: true,
          status: new WrapperResponseStatusDto({
            code: response.statusCode,
            message: HttpStatus[response.statusCode]
          }),
          message: message,
          payload: data
        });
      })
    );
  }
}
