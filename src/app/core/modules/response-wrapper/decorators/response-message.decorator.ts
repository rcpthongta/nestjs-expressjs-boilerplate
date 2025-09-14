import { CustomDecorator, SetMetadata } from "@nestjs/common";

import { ResponseMessageOptions } from "../interfaces";

import { RESPONSE_MESSAGE_KEY } from "../response-wrapper.constant";

export const ResponseMessage: (options: ResponseMessageOptions) => CustomDecorator<string> = (
  options: ResponseMessageOptions
): CustomDecorator<string> => {
  return SetMetadata(RESPONSE_MESSAGE_KEY, options);
};
