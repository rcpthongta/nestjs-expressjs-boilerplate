import { ResponseMessageOptions } from "./response-message-options.interface";

export interface ErrorResponseExceptionResponseMessageOptions extends Omit<ResponseMessageOptions, "key"> {
  readonly key?: string;
}

export interface ErrorResponseExceptionOptions {
  readonly success?: boolean;
  readonly responseMessage?: ErrorResponseExceptionResponseMessageOptions;
}
