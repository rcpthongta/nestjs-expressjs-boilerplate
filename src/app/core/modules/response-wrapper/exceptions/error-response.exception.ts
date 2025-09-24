import { HttpException } from "@nestjs/common";

import {
  ErrorResponseExceptionOptions,
  ErrorResponseExceptionResponseMessageOptions as ResponseMessage
} from "../interfaces";

export class ErrorResponseException extends HttpException {
  private readonly success: boolean;
  private readonly responseMessage: ResponseMessage;

  public constructor(response: string | object, statusCode: number, options?: ErrorResponseExceptionOptions) {
    super(response, statusCode);

    this.name = new.target.name;
    this.success = options?.success ?? false;
    this.responseMessage = {
      key: options?.responseMessage?.key ?? "response.error.are000001",
      args: options?.responseMessage?.args,
      language: options?.responseMessage?.language
    };
  }

  public getSuccess(): boolean {
    return this.success;
  }

  public getResponseMessage(): ResponseMessage {
    return this.responseMessage;
  }
}
