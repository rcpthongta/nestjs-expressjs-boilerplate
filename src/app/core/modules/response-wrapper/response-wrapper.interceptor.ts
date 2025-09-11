import { WrapperResponseDto, WrapperResponseHeaderDto, WrapperResponseHttpDto } from "@dto";

import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { Response } from "express";
import { map, Observable } from "rxjs";

import { SKIP_RESPONSE_WRAPPER_KEY } from "./response-wrapper.constant";

@Injectable()
export class ResponseWrapperInterceptor<T> implements NestInterceptor<T, T | WrapperResponseDto<T>> {
  private readonly reflector: Reflector;

  public constructor(reflector: Reflector) {
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

        return new WrapperResponseDto({
          success: true,
          http: new WrapperResponseHttpDto({
            code: response.statusCode,
            message: HttpStatus[response.statusCode]
          }),
          header: new WrapperResponseHeaderDto({
            timestamp: new Date().toISOString()
          }),
          payload: data
        });
      })
    );
  }
}
