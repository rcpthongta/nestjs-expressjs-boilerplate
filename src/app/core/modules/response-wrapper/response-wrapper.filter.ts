import { I18nService, TranslateException } from "@common";
import { WrapperResponseErrorDto, WrapperResponseStatusDto } from "@dto";

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";

import { Response } from "express";

import { ErrorResponseException } from "./exceptions";
import { ErrorResult, ErrorResponseExceptionResponseMessageOptions as ResponseMessage } from "./interfaces";

@Catch(ErrorResponseException)
export class ResponseWrapperFilter implements ExceptionFilter<ErrorResponseException> {
  private readonly i18n: I18nService;

  private getErrorResult(exception: ErrorResponseException): ErrorResult {
    const { key, args, language }: ResponseMessage = exception.getResponseMessage();

    try {
      return {
        success: exception.getSuccess(),
        data: exception.getResponse(),
        statusCode: exception.getStatus(),
        message: this.i18n.translate(key!, {
          args: args,
          language: language
        })
      };
    } catch (error: unknown) {
      return {
        success: false,
        data: (error as TranslateException).message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: this.i18n.translate("response.error.are000001", {
          language: "en"
        })
      };
    }
  }

  public constructor(i18n: I18nService) {
    this.i18n = i18n;
  }

  public catch(exception: ErrorResponseException, host: ArgumentsHost): void {
    const response: Response = host.switchToHttp().getResponse();
    const errorResult: ErrorResult = this.getErrorResult(exception);

    response.status(errorResult.statusCode).json(
      new WrapperResponseErrorDto({
        success: errorResult.success,
        status: new WrapperResponseStatusDto({
          code: errorResult.statusCode,
          message: HttpStatus[errorResult.statusCode]
        }),
        message: errorResult.message,
        error: errorResult.data
      })
    );
  }
}
